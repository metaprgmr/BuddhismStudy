function js(uri) { document.write('<s' + 'cript src="' + uri + '"></s' + 'cript>') }
function e(elid) { return document.getElementById(elid) }
function enableEl(id, set) { if (set) e(id).removeAttribute('disabled'); else e(id).setAttribute('disabled', ''); }
function w() { for (var i in arguments) document.write(arguments[i]) }
function get(name) {
 if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
   return decodeURIComponent(name[1]);
}
function toInt(n) { return (typeof n === 'string') ? parseInt(n) : n; }
function toZiNumber(n) {
  n = toInt(n);
  switch(n) {
  case 1: return '一'; case 2: return '二'; case 3: return '三'; case 4: return '四'; case 5: return '五';
  case 6: return '六'; case 7: return '七'; case 8: return '八'; case 9: return '九'; case 10: return '十';
  default: return n;
  }
}
function toW(n, w) {
  n = '' + n;
  while (n.length < w) n = ' ' + n;
  return n;
}

function zhsp(n) {
  var SP = '　', ret = '';
  if (!n) n = 0;
  for (; n>0; --n) ret += SP;
  return ret;
}

function toPinyin(py) {
  const shengmu = {
    'a':'āáǎà', 'o':'ōóǒò', 'e':'ēéěè', 'i':'īíǐì', 'u':'ūúǔù', 'v':'ǖǘǚǜ', 'n':'ñńňǹ'
  };
  var i, ret = '';
  for (i=0; i<py.length-1; ++i) {
    var c = py[i];
    var sm = shengmu[c];
    if (sm) ret += sm[parseInt(py[i+1]) - 1];
    else ret += c;
  }
  return (i < py.length) ? (ret + py[i]) : ret;
}

// -------- audio player ---------
const HLCOLOR = '#ff9';
var lastEl, curSeg = 0;

function renderPlayer() {
    w(`<div class="main" id="main"><center>`);
    readerHost.writeDoc();
    w(`</center><p>&nbsp;<br>&nbsp;<br>&nbsp;</p></div>
       <div class="footer" id="footer" style="display:block"><center>
         <table><tr><td><audio controls id="audiop" style="width:600px" enabled=0></audio></td>
         <td valign="center" style="padding-left:20px">
           <button id="btnPrev" disabled onclick="playNext(-1)">&lt;上段</button>
           <button id="btnRept" disabled onclick="playNext(0)">重聽</button>
           <button id="btnNext" onclick="playNext(1)">下段&gt;</button></td></tr></table>
       </center></div>`);
}

function playNext(dir) {
  switch (dir) {
  case 1:  ++curSeg; break;
  case -1: --curSeg; break;
  }
  enableEl('btnNext', curSeg < 200);
  enableEl('btnPrev', curSeg > 0);
  enableEl('btnRept', curSeg > 0);
  e('_'+curSeg).scrollIntoView(true);
  playMyAudio(curSeg);
}

function audiofxn(lnNum) {
  var host = this;
  var toAudio = (n) => { // TODO: generalize!
        var c = host.ln2chapter[n];
        console.log(n, c, host.ln2chapter);
        var ret = host.getTitle(c).substring(0,4) + '.mp3';
        if (c < 10) c = '0' + c;
        ret = 'wlsj-mp3/' + (2000 + n) + '-' + c + ret;
        console.log(ret);
        return ret;
      };

  e('footer').style.display = 'block';
  var a = e('audiop');
  a.src = toAudio(curSeg = lnNum);
  a.play();

  if (lastEl) lastEl.style.backgroundColor = null;
  (lastEl = e('_'+lnNum)).style.backgroundColor = HLCOLOR;
}

// -------- /audio player ---------


const MIN_LEN = 40;
const VERY_LONG = 120;
const MED_LONG = 110;
const LONG = 90;

var readerHost; // singleton

function playMyAudio(x) {
  if (readerHost && readerHost.playAudio)
    readerHost.playAudio(x);
  else
    alert('Audio is not set up.\n' +
          'To it set up, assign an "AudioHost" object to the readerHost variable.\n' +
          'An "AudioHost" is required to have a function playAudio(x), where x is for the AudioHost object to interpret.');
}

class GDHReader {

  constructor(title, text, titles, audioFn) {
    this.title  = title;
    this.text   = Array.isArray(text) ? text : text.split('\n');;
    this.titles = titles || [];
    this.setAudioFxn(audioFn);

    this._tmp_ = { curLnNum: 1,
                    lastLen: 0,
                     maxLen: 0,
                   lastSegs: '',
                  lastTitle: null,
                lastChapter: null,
                    curPart: null,
                  totalText: 0,
                  totalPunc: 0,
                  totalRuby: 0
                 };
    this.partStats  = [];
    this.ln2chapter = {};
    this.postRender = () => {};

    readerHost = this;
  }

  setTitleAnno(ta) { this.titleAnno = ta; }

  useHrBeforeTitle() { this.hrBeforeTitle = true; return this; }

  setAudioFxn(fxn) {
    this.playAudio = fxn;
    this.hasAudio = !!fxn;
  }

  getTitle(n/* 1-based */) { return this.title ? this.titles[n-1] : null }

  _appendSeg(ln) {
    for (var i=0; i<ln.length; ++i) {
      var c = ln[i];
      if (c != ' ' && c != '　') ++this._tmp_.lastLen;
    }
    if (this._tmp_.lastSegs === '') this._tmp_.lastSegs = ln;
    else this._tmp_.lastSegs += '<br>' + ln;
  }

  _decoDisp(disp) {
    const NOYP = '-', DOYP = ' ', PUNC = '.';
    var cls;
    if (!this.hasAudio) {
      var x = disp.replaceAll('<br>', '');
      if (!window['dict']) {
        disp = x;
      } else {
        var y = []; // to parallel x, indicating if a zi needs YP or not.
                    // Initialized by lookup, and can be altered along the way of rendering.
        var i, zi, zinfo, yp, noyp = {};
        for (i=0; i<x.length; ++i) {
          var theZi = zi = x[i];
          if (isPunc(zi)) { y[i] = PUNC; ++this._tmp_.totalPunc; continue; }
          ++this._tmp_.totalText;
          if (y[i] == NOYP) ; // nothing to do
          else if (noyp[zi]) y[i] = NOYP; // optimize to save unnecessary future lookups
          else {
            zinfo = lookuptool.lookup(zi);
            if (!zinfo || !zinfo.isVisible) {
              noyp[zi] = true;
              y[i] = NOYP;
            } else {
              y[i] = zinfo;
              // enhance: now don't do YP for the following N zis, since it has just occurred...
              const N = 12;
              for (var cnt=N, i1=i+1; (cnt>0) && (i1<x.length); ++i1, --cnt) {
                if (y[i1] == PUNC) { ++cnt; continue; } // punctuations don't count
                if (x[i1] == theZi) y[i1] = NOYP;
              }
            }
          }
        }
        noyp = null;

        disp = '';
        for (i=0; i<x.length; ++i) {
          var zi = x[i];
          zinfo = y[i];
          if (typeof zinfo == 'object') {
            yp = zinfo.getYP();
            cls = zinfo.isFaultAmi() ? ' class="faultami"' : '';
            var ypRPad = '';
            if ((i < x.length-1) && (x[i+1] == zi)) {
              // enhance: same YP on consecutive zis
              zi += zi;
              ++i;
            }
            else if ((yp.length > 3) &&
                     (disp.length > 0) && (disp[disp.length-1] != '>') &&
                     (i < x.length-1) && (typeof y[i+1] != 'object')) {
              // enhance: check before and after, to place long YPs atop 3 zis.
              zi = disp[disp.length-1] + '<font ' + cls + '>' + zi + '</font>' + x[++i];
              disp = disp.substring(0, disp.length-1);
              cls = '';
            }
            else if ((yp.length > 3) && (i < x.length-1) && (y[i+1] == PUNC)) {
              // enhance: check if it is followed by a punctuation, to place long YPs atop the two.
              if (yp.length <= 4) ypRPad = '&nbsp;';
              zi = '<font ' + cls + '>' + zi + '</font>' + x[++i];
              cls = '';
            }
            zi = '<ruby' + cls + '>' + zi + '<rt>' + zinfo.getYP('red', 'black') + ypRPad + '</rt></ruby>';
            ++this._tmp_.totalRuby;
//        } else {
//          zi = '<span title="' + yp + '">' + zi + '</span>';
          }
          disp += zi;
        }
      }
    } else if (this._tmp_.lastLen >= LONG) {
      cls;
      if (this._tmp_.lastLen >= VERY_LONG)
        cls = 'verylong';
      else if (this._tmp_.lastLen >= MED_LONG)
        cls = 'medlong';
      else
        cls = 'long';
      disp = '<font class="' + cls + '">' + disp + '</font>';
    }
    return disp;
  }
  _writeSegs() {
    if (!this._tmp_.lastSegs) return;

    this.ln2chapter[this._tmp_.curLnNum] = this._tmp_.lastChapter;
    var cls = this.hasAudio ? '' : 'txt';
    w('<tr id="_', this._tmp_.curLnNum, '"><td class="numZis" valign="top" align="right" style="padding-top:', this._tmp_.lastTitle ? 10 : 2, 'px">',
      this._tmp_.lastTitle ? '<h4>　</h4>' : '', this.hasAudio ? (this._tmp_.lastLen + '字&nbsp;&nbsp;&nbsp;') : '', '</td>',
      '<td align="right" valign="top" class="', cls, '"><a name="s_', this._tmp_.curLnNum, '">', this._tmp_.lastTitle ? '<h4>　</h4>' : '',
      this.hasAudio ? '<a href="javascript:playMyAudio('+this._tmp_.curLnNum+')" title="粵語誦讀">' : '',
      '<num>', this._tmp_.curLnNum, '</num>', this.hasAudio ? '</a>' : '', '.&nbsp;</a></td><td valign="top" class="', cls, '">');
    if (this._tmp_.lastTitle) {
      if (this.hrBeforeTitle) w('<hr>');
      w('<h4><a name="_', this._tmp_.lastChapter, '">', this._decoDisp(this._tmp_.lastTitle), '</a></h4>');
      this._tmp_.lastTitle = null;
    }
    var txt = this.hasAudio ? this._tmp_.lastSegs : this._tmp_.lastSegs.replaceAll('　','');
    w(this._decoDisp(txt), '</td></tr>');

    if (this._tmp_.lastLen > this._tmp_.maxLen) this._tmp_.maxLen = this._tmp_.lastLen;
    if (this._tmp_.curPart) {
      this._tmp_.curPart.cntZis += this._tmp_.lastLen;
      ++this._tmp_.curPart.cntSegs;
    }
    this._tmp_.lastSegs = '';
    this._tmp_.lastLen = 0;
    ++this._tmp_.curLnNum;
  }

  writeDoc() {
    document.title = this.pageTitle || this.title;
    var a = this.text, titleAn = this.titleAnno || '';
    if (titleAn) titleAn = '<sup class="titleanno">&nbsp;' + titleAn + '</sup>';
    w('<h1 align="center">', this.title, titleAn, '</h1><table border="0" cellpadding="0" cellspacing="0">');
    for (var i=0; i<a.length; ++i) {
      var ln = a[i];
      if (ln.startsWith('//')) continue; // commented out
      if (ln.startsWith('#')) {
        if (ln.startsWith('#@')) {
          this._tmp_.curPart = { cntPins:0, cntSegs:0, cntZis:0, title:ln.substring(2).trim() };
          this.partStats.push(this._tmp_.curPart);
/*
          if (!this.hasAudio)
            w('<tr class="pagebr"><td colspan="3" align="center"><h3><a name="hui_', this.partStats.length, '">第',
              toZiNumber(this.partStats.length), '會 ', this._tmp_.curPart.title, '</a></h3></td></tr>');
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
      else if (ln.length === 0) {
        this._writeSegs();
      }
      else this._appendSeg(ln);
    }
    this._writeSegs();
    w('</td></tr></table><p>&nbsp;</p><hr>');

    this.postRender();

    console.log(this._tmp_);
  }

} // end of GDHReader.

var okFauxAmis = '品及集強設蜜禪立因像兄牛漆畢泣戀速救差習休勤哽血誦詣許疾貧鋸舉彼仁輕愁寺據樂稽塵臨';
function showZis(zis, exclude) {
  if (!zis) return;
  if (exclude === 'not available') {
    w('<p>&nbsp;</p>',
      '<table border=1 bordercolor="#dddddd" cellpadding=1 cellspacing=0><caption>', zis.length, '個字不在私人字典內</caption>',
      '<tr><td>', zis, '</td></tr></table>');
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
      w('<ruby class="', cls, '">', zinfo.zi, '<rt class=ypDisp>', zinfo.getYP(), '&nbsp;</rt></ruby>');
    }
    w('</td></tr>');
  }
  w('</table>');
}
