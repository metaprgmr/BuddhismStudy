function hasDict() { return !!window['dict']; }

// -------- audio player ---------
class AudioList {
  constructor() {
    this.list = [];
    this.curAudioIndex = -1;
  }
  add(n) { this.list.push(n); return this; }
  nextIndex() {
    var ret = ++this.curAudioIndex;
    if (ret >= this.list.length) ret = this.curAudioIndex = -1;
    return this.list[ret];
  }
}

const HLCOLOR = '#ff9';
var lastEl, curSeg = 0;

function writePlayerUI() {
  w(`<div class="footer" id="footer" style="display:block"><center>
    <table><tr>
    <td width="600px"><audio controls id="audiop" style="width:600px; display:none"></audio></td>
    <td valign="center" style="padding-left:20px">
      <button id="btnPrev" disabled onclick="playNext(-1)">&lt;上段</button>
      <button id="btnRept" disabled onclick="playNext(0)">重聽</button>
      <button id="btnNext" onclick="playNext(1)">下段&gt;</button></td></tr>
    </table></center></div>`);
}

function playNext(dir) {
  switch (dir) {
  case 1:  if (curSeg < 200) ++curSeg; break;
  case -1: if (curSeg > 0) --curSeg; break;
  }
  playMyAudio(curSeg);
}

var audioCBSet = false, curList;

function playList(lstNum) {
  curList = readerHost.getList(lstNum);
  audioEndCB();
}

function audiofxn(lnNum) {
  var host = readerHost;
  var toAudio = (n) => { // TODO: generalize!
        var c = host.ln2chapter[n];
        //console.log(n, c, host.ln2chapter, host.chapterAudioList);
        var ret = host.getTitle(c).substring(0,4) + '.mp3';
        if (c < 10) c = '0' + c;
        ret = 'wlsj-mp3/' + (2000 + n) + '-' + c + ret;
        console.log(n, c, ret);
        return ret;
      };

  e('footer').style.display = 'block';
  var a = e('audiop');
  if (!audioCBSet) { a.addEventListener('ended', audioEndCB); audioCBSet = true; }
  a.style.display = 'block';
  a.src = toAudio(curSeg = lnNum);
  a.play();

  if (lastEl) lastEl.style.backgroundColor = null;
  var el = e('_'+lnNum);
  if (el) {
    (lastEl = el).style.backgroundColor = HLCOLOR;
    el.scrollIntoView(true);
  }
}

function audioEndCB() {
  var idx = curList ? curList.nextIndex() : -1;
  if (idx >= 0) audiofxn(idx);
  else {
    if (curList) curList.curAudioIndex = -1;
    curList = null;
  }
}

// -------- /audio player ---------


const MIN_LEN = 40;
const VERY_LONG = 120;
const MED_LONG = 110;
const LONG = 90;
var DEBUG = get('debug');

var readerHost; // singleton

function playMyAudio(x) {
  if (!readerHost || !readerHost.playAudio) {
    alert('Audio is not set up.\n' +
          'To it set up, assign an "AudioHost" object to the readerHost variable.\n' +
          'An "AudioHost" is required to have a function playAudio(x), where x is for the AudioHost object to interpret.');
    return;
  }
  curList = null;
  curSeg = x;
  readerHost.playAudio(x);
  enableEl('btnNext', x < 200);
  enableEl('btnPrev', x > 1);
  enableEl('btnRept', x > 0);
}

class GDHReader {

  constructor(title, text, titles, audioFn) {
    this.title  = title;
    this.text   = toLines(text);
    this.titles = titles || [];
    this.setAudioFxn(audioFn);

    this._tmp_ = { curLnNum: 1,
                    lastLen: 0,
                     maxLen: 0,
                   lastSegs: [],
                  lastTitle: null,
                lastChapter: null,
                    curPart: null,
                  totalText: 0,
                  totalPunc: 0,
                  totalRuby: 0
                 };
    this.partStats  = [];
    this.ln2chapter = {};
    this.chapterAudioList = []; // 1-based. Each is an [] of line numbers
    this.postRender = () => {};

    readerHost = this;
  }

  getList(n) { return this.chapterAudioList[n]; }
  setTOCBreak(n) { this.tocBreak = n; return this; }
  setTitleAnno(ta) { this.titleAnno = ta; return this; }
  setContentWidth(n) { this.contentWidth = n; return this; }

  useHrBeforeTitle() { this.hrBeforeTitle = true; return this; }
  useLineBreak() { this.useLnBk = true; return this; }

  setAudioFxn(fxn) {
    this.playAudio = fxn;
    this.hasAudio = !!fxn;
  }

  writeDoc() {
    if (this.hasAudio) {
      w('<div class="main" id="main"><center>');
      this._writeDoc();
      w('</center><p>&nbsp;<br>&nbsp;<br>&nbsp;</p></div>');
      writePlayerUI();
      w('</center></div>');
    } else {
      this._writeDoc();
    }
  }

  getTitle(n/* 1-based */) { return this.titles ? this.titles[n-1] : null; }

  _appendSeg(ln) {
    for (var i=0; i<ln.length; ++i)
      if (isHanZi(ln[i])) ++this._tmp_.lastLen;
    this._tmp_.lastSegs.push(ln);
  }
  _decoDisp(disp) {
    if (!disp) return '';
    if (hasDict()) {
      var ypln = new YPLine(disp);
      this._tmp_.totalPunc += ypln.totalPunc;
      this._tmp_.totalText += ypln.totalText;
      this._tmp_.totalRuby += ypln.totalRuby;
      disp = ypln.toText();
    }
    return disp;
  }
  _writeSegs() {
    if (!this._tmp_.lastSegs.length) return;

    this.ln2chapter[this._tmp_.curLnNum] = this._tmp_.lastChapter;
    var lst = this.chapterAudioList[this._tmp_.lastChapter];
    if (lst == null) lst = this.chapterAudioList[this._tmp_.lastChapter] = new AudioList();
    lst.add(this._tmp_.curLnNum);
    var cls = '';
    if (this._tmp_.lastLen >= LONG) {
      if (this._tmp_.lastLen >= VERY_LONG)
        cls = 'verylong';
      else if (this._tmp_.lastLen >= MED_LONG)
        cls = 'medlong';
      else
        cls = 'long';
    }
    w('<tr id="_', this._tmp_.curLnNum, '">',
      `<td class="numZis" nowrap valign="top" align="right" style="padding-top:${this._tmp_.lastTitle?10:2}px">`,
      `<span class="${cls}">&nbsp;${this._tmp_.lastLen}字&nbsp;</span></td>`,
      `<td nowrap align="right" valign="top" class="txt"><a name="s_${this._tmp_.curLnNum}">`,
      this._tmp_.lastTitle ? '<h4>　</h4>' : '',
      this.hasAudio ? '<a href="javascript:playMyAudio('+this._tmp_.curLnNum+')" title="粵語誦讀">' : '',
      `<num>${this._tmp_.curLnNum}</num>${this.hasAudio?'</a>':''}.&nbsp;</a></td>`,
      '<td valign="top" class="txt" style="width:1200px">');
    if (this._tmp_.lastTitle) {
      if (this.hrBeforeTitle) w('<hr>');
      var _n = this._tmp_.lastChapter;
      w('<h4><a name="__', _n, '"></a>');
      if (this.hasAudio)
        w(`<a href="javascript:playList(${_n})" title="整品粵語誦讀">${this._decoDisp(this._tmp_.lastTitle)}</a>`);
      else
        w(this._decoDisp(this._tmp_.lastTitle));
      w('</h4>');
      this._tmp_.lastTitle = null;
    }

    var ln, cols = 0, colsep = '|', len = this._tmp_.lastSegs.length,
        lastNoBk = false, doLnBk = false, lnNum = 0;
    for (var i=0; i<len; ++i) {
      ln = this._tmp_.lastSegs[i];
      if (ln[0] == '@') {
        if (ln == '@lnbk') {
          doLnBk = true;
        } else if (ln == '@/lnbk') {
          doLnBk = false;
          lastNoBk = false;
        } else if (ln[1] == '/') {
          cols = 0;
          w('</table>');
          lastNoBk = true;
        } else {
          colsep = ln[ln.length-1];
          if (isDigit(colsep)) {
            colsep = '|';
            cols = parseInt(ln.substring(1));
          } else {
            cols = parseInt(ln.substring(1, ln.length-1));
          }
          w('<table>');
        }
      } else if (cols > 0) {
        var a = ln.split(colsep);
        w('<tr>');
        if (a[0] == '-')
          w(`<td colspan="${cols}" style="font-size:10px">&nbsp;</td>`);
        else
        for (var j=0; j<cols; ++j) {
//          if (j > 0) w('<td width="5px">&nbsp;</td>');
          var s = a[j] || '', tdx ='', isend = false;
          switch (s[0]) {
          case '>':
            s = s.substring(1);
            tdx = ' align="right"';
            break;
          case '+':
            s = s.substring(1);
            tdx = ` colspan="${cols-j}"`;
            isend = true;
            break;
          }
          w('<td nowrap style="padding-right:10px" valign="bottom"', tdx, '>', this._decoDisp(s) || '&nbsp;', '</td>');
          ++lnNum;
          if (isend) break; // for()
        }
        w('</tr>');
      } else {
        var SPa = '', SPb = '';
        if (lastNoBk)
          lastNoBk = false;
        else if (lnNum>0)
          SPa = (this.useLnBk || doLnBk)  ? '<br>' : ' ';
        if (ln.endsWith('@')) {
          ln = ln.substring(0,ln.length-1);
          if (!this.useLnBk && !doLnBk) SPb = '<br>';
        }
        w(SPa, this._decoDisp(ln), SPb);
        ++lnNum;
      }
    }
    if (cols > 0) w('</table>'); // in case the closing is missing.
    w('</td></tr>');

    if (this._tmp_.lastLen > this._tmp_.maxLen) this._tmp_.maxLen = this._tmp_.lastLen;
    if (this._tmp_.curPart) {
      this._tmp_.curPart.cntZis += this._tmp_.lastLen;
      ++this._tmp_.curPart.cntSegs;
    }
    this._tmp_.lastSegs = [];
    this._tmp_.lastLen = 0;
    ++this._tmp_.curLnNum;
  }

  _writeDoc() {
    document.title = this.pageTitle || this.title;
    var titleAn = this.titleAnno || '';
    var buf = new Buffer();
    if (titleAn) titleAn = '<sup class="titleanno">&nbsp;' + titleAn + '</sup>';
    buf.w('<h1 align="center" style="margin-bottom:-10px">', this.title, titleAn, '</h1>');
    if (this.hasAudio) w(buf.render());
    var a = this.text;
    w(`<center><table border="${DEBUG ? 1 : 0}" cellpadding="0" cellspacing="0">`);
    for (var i=0; i<a.length; ++i) {
      var ln = a[i];
      if (ln.startsWith('//')) continue; // commented out
      if (ln.startsWith('@')) {
        this._appendSeg(ln.trim());
      }
      else if (ln.startsWith('#')) {
        if (ln.startsWith('#@')) {
          this._tmp_.curPart = { cntPins:0, cntSegs:0, cntZis:0, title:ln.substring(2).trim() };
          this.partStats.push(this._tmp_.curPart);
/*
          if (!this.hasAudio)
            w('<tr class="pagebr"><td colspan="3" align="center"><h3><a name="hui_', this.partStats.length, '">第',
              zNumber(this.partStats.length), '會 ', this._tmp_.curPart.title, '</a></h3></td></tr>');
*/
          continue;
        } else if (ln.startsWith('#=')) {
          this.titles.push(ln.substring(2).trim());
          ln = '#' + this.titles.length;
        }
        if (this._tmp_.curPart) ++this._tmp_.curPart.cntPins;
        this._writeSegs();
        if (i > 0) w('</td></tr>');
  
        var chnum = ln.indexOf(' ');
        chnum = parseInt( ((chnum < 0) ? ln.substring(1) : ln.substring(1,chnum)).trim() );
        this._tmp_.lastTitle = this.getTitle(chnum);
        this._tmp_.lastChapter = chnum;
      }
      else if (ln.length === 0)
        this._writeSegs();
      else
        this._appendSeg(ln);
    }
    this._writeSegs();
    w('</td></tr>');
    if (this.contentWidth) {
      w(`<tr><td colspan="2"></td><td nowrap style="opacity:${DEBUG ? 0.5 : 0}">`);
      for (var k=this.contentWidth; k>=0; --k) w('〇');
      w('</td></tr>');
    }
    w('</table></center><p>&nbsp;</p><hr>');

    this.postRender();

    // write header
    if (!this.hasAudio && this.titles) {
      buf.w('<center><table><tr><td valign="top" nowrap>');
      if (!this.tocBreak) {
        buf.w('<ol>');
        for (var i=0; i<this.titles.length; ++i)
          buf.w('<li><a href="#__', i+1, '">', this.titles[i], '</a></li>');
        buf.w('</ol>');
      } else {
        buf.w('<ol>');
        for (var i=0; i<this.titles.length; ++i) {
          if (i % this.tocBreak == 0) {
            if (i > 0) buf.w('</ol></td>');
            buf.w(`<td valign="top" nowrap><ol start="${i+1}">`);
          }
          buf.w('<li><a href="#__', i+1, '">', this.titles[i], '</a></li>');
        }
        buf.w('</ol>');
      }
      buf.w('</td></tr></table></center>');
      buf.render('header');
    }
  }

} // end of GDHReader.

var okFauxAmis = '品及集強設蜜禪立因像兄牛漆畢泣戀速救差習休勤哽血誦詣許疾貧鋸舉彼仁輕愁寺據樂稽塵臨';
function showZis(zis, exclude) {
  if (!zis) return;
  if (exclude === 'not available') {
    w('<p>&nbsp;</p>',
      '<table border=1 bordercolor="#dddddd" cellpadding=1 cellspacing=0><caption>', zis.length, '個字不在私人字典內</caption>',
      '<tr><td style="min-width:300px">', zis, '</td></tr></table>');
    return;
  }

  var zis1 = '', zis2 = '';
  for (var i in zis) {
    var zi = zis[i];
    if (exclude && (exclude.indexOf(zi) >= 0)) zis2 += zi;
    else zis1 += zi;
  }
  zis = [];  
  if (zis1) zis.push(zis1);
  if (zis2) zis.push(zis2);

  w('<p>&nbsp;</p>',
    '<table border=1 bordercolor="#dddddd" cellpadding=1 cellspacing=0><caption>', zis1.length, '個難字</caption>');
  for (var j in zis) {
    zis1 = zis[j];
    w('<tr><td>');
    for (var i in zis1) {
      var zinfo = dict.lookup(zis1[i]);
      var cls = 'ziDisp';
      if (zinfo.isFaultAmi()) cls += ' fa';
      w('<ruby class="', cls, '">', zinfo.zi, '<rt class=ypDisp>', zinfo.getYP(), '</rt></ruby>');
    }
    w('</td></tr>');
  }
  w('</table>');
}
