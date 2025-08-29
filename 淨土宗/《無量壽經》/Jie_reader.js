// utilities
const zdigits = '〇一二三四五六七八九';
function zNumber(n) { // 0 to 999
  if (typeof n === 'string') n = parseInt(n);
  if (n == 0) return zdigits[0];
  var d100 = Math.floor(n / 100);
  var d10  = Math.floor((n-d100*100) / 10);
  var d1   = n - d100 * 100 - d10 * 10;
  var ret = (d100 > 0 ? zdigits[d100] : '') + zdigits[d10] + zdigits[d1];
  while (ret.length > 1 && ret.startsWith('〇')) ret = ret.substring(1);
  return ret;
}
function concat(lst) {
  var ret = '';
  if (lst) for (var i in lst) { var a = lst[i]; (a != null) && (ret += a) }
  return ret;
}
function w() { document.write(concat(arguments)) }
function copy() {
  var ret = {};
  for (var i in arguments) {
    var o = arguments[i];
    if (typeof o === 'object') ret = Object.assign(ret, o);
  }
  return ret;
}
function get(name) {
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
function e(id) { return document.getElementById(id) }
function isDigit(x) { return typeof x === 'number' || '9876543210'.indexOf(x) >= 0 }
function sp(n, filler) {
  if (!n) return '';
  if (!filler) filler = '　';
  var ret = '';
  for (var i=n; i>0; --i) ret += filler;
  return ret;
}

// Buffer
class Buffer {
  constructor() { this.bufList = Array.from(arguments); }

  w() {
    var ret = '';
    for (var i in arguments) ret += arguments[i];
    if (ret) this.bufList.push(ret);
    return (this.bufList.length < 1024) ? this : this.condense();
  }

  append(s) { // for performance
    this.bufList.push(s);
  }

  prepend() {
    var ret = '';
    for (var i in arguments) {
      var x = arguments[i];
      x && (ret += x);
    }
    if (ret) this.bufList.unshift(ret);
    return this;
  }

  // renders to one or more elements.
  // returns the text, and clears the internal content.
  render() {
    var ret = this.text();
    for (var i in arguments) {
      var el = e(arguments[i]);
      el && (el.innerHTML = ret);
    }
    this.bufList = [];
    return ret;
  }

  text() { 
    var s = this.bufList.join('')
    this.bufList = [ s ];
    return s;
  }

  condense() {
    if (this.bufList.length > 100)
      this.text();
    return this;
  }

} // end of Buffer.

const      KAI_TI = "'KaiTi', '楷体', STKaiti, '华文楷体'";
const FANGSONG_TI = "'FangSong', '仿宋', STFangsong, '华文仿宋'";
const     SONG_TI = "'SimSong', '宋体', STSong, '华文宋体'";
const      HEI_TI = "'SimHei', '黑体', STHeiti, '华文黑体'";
const TEXT_COLOR     = 'black';
const VOW_COLOR      = 'blue';
const VOW_BGCOLOR    = '#afa';
const TOPIC_COLOR    = 'blue';
const QUOTE_COLOR    = '#d00';
const XQUOTE_COLOR   = '#b09';
const PIN_COLOR      = '#900';
const MOTTO_COLOR    = '#009';
const ABOUT_COLOR    = '#999';
const lbgc = '#f3ebe3';
const LEFT_BG_COLOR  = lbgc + ';';
const rbg4 = ',' + lbgc + ',' + lbgc + ',' + lbgc + ',' + lbgc;
const RIGHT_BG_COLOR = 'linear-gradient(left,#ccc' + rbg4 + rbg4 + rbg4 + rbg4 + ')';
//const RIGHT_BG_COLOR = '#ece4db'; // '#efe7de;';
const BOOK_TITLE     = '佛說大乘無量壽莊嚴清淨平等覺經會集本解';
const LAST_PAGE_NUM  = 837;
const FIRST_QUOTE_PAGE_NUM = 90;
const COVER_TEXT_COLOR = '#FFD700';
const LINE_NUM_STYLE = 'writing-mode:horizontal-tb; margin-top:-30px; font-family:helvetica; font-size:10px; color:lightgray';
const DEFAULT_XG     = 'xg{background-color:lightyellow}xg1{background-color:yellow}xg2{background-color:orange}';

const VIL_START = 'ㄅ';
const VIL_END   = 'ㄆ';

var vows = {
  '國無惡道願': 229,
  '不墮惡趣願': 229,
  '身悉金色願': 236,
  '三十二相願': 236,
  '身無差別願': 236,
  '宿命通願':   239,
  '天眼通願':   239,
  '天耳通願':   239,
  '他心通願':   246,
  '神足通願':   247,
  '徧供諸佛願': 247,
  '定成正覺願': 249,
  '光明無量願': 252,
  '觸光安樂願': 252,
  '壽命無量願': 254,
  '聲聞無數願': 254,
  '諸佛稱嘆願': 258,
  '十念必生願': 259,
  '聞名發心願': 267,
  '臨終接引願': 267,
  '悔過得生願': 273,
  '國無女人願': 275,
  '厭女轉男願': 275,
  '蓮華化生願': 275,
  '天人禮敬願': 278,
  '聞名得福願': 278,
  '修殊勝行願': 278,
  '國無不善願': 280,
  '住正定聚願': 280,
  '樂如漏盡願': 280,
  '不貪計身願': 280,
  '那羅延身願': 286,
  '光明慧辯願': 286,
  '善談法要願': 286,
  '一生補處願': 290,
  '教化隨意願': 290,
  '衣食自至願': 293,
  '應念受供願': 293,
  '莊嚴無盡願': 295,
  '無量色樹願': 297,
  '樹現佛剎願': 297,
  '徹照十方願': 299,
  '寶香普薰願': 300,
  '普等三昧願': 301,
  '定中供佛願': 301,
  '獲陀羅尼願': 304,
  '聞名得忍願': 304,
  '現證不退願': 304,
};
const vowsAlias = {
  "不更惡趣願": 2,  "卅二相願":   4,  "無差別願":   5,  "遍供諸佛願": 11,
  "諸佛稱歎願": 17, "國無婦女願": 22, "女人往生願": 23, "蓮華化生願": 24,
};
const TERM_MAPPING =
`頓:頓教
漸:漸教
正定:正定聚
不定:不定聚
邪定:邪定聚
十玄:十玄門
阿字:阿字功德
彌勒所問十念:彌勒十念
夏老居士:夏蓮居居士`;

class JiePage {
  constructor(pageNum, pageName, is序) {
    this.pageNum = (typeof pageNum === 'string') ? parseInt(pageNum) : pageNum;
    is序 && (this.is序 = true);
    this.lines = [];
    this.setName(pageName);
  }

  setPrevPage(pg) {
    if (pg) {
      this.prevPage = pg;
      pg.nextPage = this;
    }
  }

  addLine() {
    for (var i in arguments) {
      var ln = arguments[i];
      if (Array.isArray(ln)) {
        for (var i in ln) {
          var l = ln[i];
          if (l.startsWith('#quot_')) l = '#quote' + l.substring(6);
          this.lines.push(l);
          this.hasQuotes |= l.startsWith('#quote:') || l.startsWith('#title:');
          this.hasXG |= (l.indexOf('xg') >= 0);
          this.hasHL |= (l.indexOf('<hl') >= 0);
        }
      } else {
        if (ln.startsWith('#quot_')) ln = '#quote' + ln.substring(6);
        this.lines.push(ln)
        this.hasQuotes |= ln.startsWith('#quote:') || ln.startsWith('#title:');
        this.hasXG |= (ln.indexOf('xg') >= 0);
        this.hasHL |= (ln.indexOf('<hl') >= 0);
      }
    }
  }

  preprocessText() {
    function getXGs(ln, lnnum, pgnum) {
      var idx=0;
      while (true) {
        var idx1 = ln.indexOf('<xg', idx);
        if (idx1 < 0) break;
        var idx2 = ln.indexOf('>', idx1+1);
        idx = idx2 + 1;
        console.log(ln.substring(idx1+1, idx2), pgnum + ':' + lnnum);
      }
    }
    function getVowTags(ln, pgnum) {
      var idx=0;
      while (true) {
        var idx1 = ln.indexOf('<vow title="', idx);
        if (idx1 < 0) break;
        var idx2 = ln.indexOf('">', idx1+12);
        var x = ln.substring(idx1+12, idx2);
        if (x.startsWith('第') && x.endsWith('願'))
          addTerm(x, pgnum);
        idx = idx2+2;
      }
    }

    var len = this.lines.length;
    for (var i=0; i<len; ++i) {
      var ln = this.lines[i], idx = -1, wholeLineTag;
      if (ln.startsWith('<!'))
        idx = ln.indexOf('>');
      if (idx > 0) {
        wholeLineTag = ln.substring(0,idx+1);
        ln = ln.substring(idx+1);
      } else {
        wholeLineTag = '';
      }
      getVowTags(ln, this.pageNum);
      //getXGs(ln, i+1, this.pageNum);

      // extract terminologies
      idx = 0;
      for (;;) {
        var idx1 = ln.indexOf('{t', idx), term, vnum;
        if (idx1 < 0) break;
        var idx2 = ln.indexOf('t}', idx1+2);
        if (idx2 < 0) {
          term = ln.substring(idx1+2).trim();
          var ln1 = this.lines[i+1];
          if (!ln1) break;
          idx2 = ln1.indexOf('t}');
          if (idx2 > 0) {
            idx1 = ln1.indexOf('{t');
            if (idx1 >= 0 && idx1 < idx2) break;
            term += ln1.substring(0, idx2).trim();
            addTerm(term, this.pageNum);
          }
          break;
        } else {
          term = ln.substring(idx1+2, idx2).trim();
          addTerm(term, this.pageNum);
          idx = idx2+2;
        }
      }

      // handle 「...願」
      for (idx=0; ; idx+=2) {
        idx = ln.indexOf('願」', idx);
        if (idx < 0) break;
        var idx1 = ln.lastIndexOf('「', idx);
        if (idx1 >= 0) {
          var v = ln.substring(idx1+1, idx+1);
          if (v.length <= 5) {
            vnum = vows[v];
            if (vnum > 0) {
              this.lines[i] = ln = ln.substring(0, idx1+1) + VIL_START + vnum + '願">' + v + VIL_END + ln.substring(idx+1);
              addTerm('第' + vnum + '願', this.pageNum);
            }
          }
        } else { // check the previous line
          var pg = this, lnNum = i-1;
          var ln1 = pg.lines[lnNum];
          if (!ln1) {
            pg = pg.prevPage;
            if (!pg) break;
            lnNum = pg.lines.length-1;
            ln1 = pg.lines[lnNum];
          }
          idx1 = ln1.lastIndexOf('「');
          if (idx1 >= 0) {
            v = ln1.substring(idx1+1) + ln.substring(0, idx+1);
            if (v.length <= 5) {
              vnum = vows[v];
              if (vnum > 0) {
                pg.lines[lnNum] = ln1.substring(0, idx1+1) + VIL_START + vnum + '願">' + ln1.substring(idx1+1);
                this.lines[i] = ln = VIL_START + vnum + '願">' + ln.substring(0, idx+1) + VIL_END + '」' + ln.substring(idx+2);
                addTerm('第' + vnum + '願', this.pageNum);
              }
            }
          }
        }
      }
      // handle 「...V」
      for (idx=0; ; idx+=2) {
        idx = ln.indexOf('V」', idx);
        if (idx < 0) break;
        var idx1 = ln.lastIndexOf('「', idx);
        if (idx1 >= 0) {
          var v = ln.substring(idx1+1, idx);
          if (v.length <= 5) {
            vnum = vows[v+'願'];
            this.lines[i] = ln = ln.substring(0, idx1+1) + VIL_START + vnum + '願">' + v + VIL_END + ln.substring(idx+1);
            addTerm('第' + vnum + '願', this.pageNum);
          }
        } else { // check the previous line
          var pg = this, lnNum = i-1;
          var ln1 = pg.lines[lnNum];
          if (!ln1) {
            pg = pg.prevPage;
            if (!pg) break;
            lnNum = pg.lines.length-1;
            ln1 = pg.lines[lnNum];
          }
          idx1 = ln1.lastIndexOf('「');
          if (idx1 >= 0) {
            v = ln1.substring(idx1+1) + ln.substring(0, idx);
            if (v.length <= 5) {
              vnum = vows[v+'願'];
              if (vnum > 0) {
                pg.lines[lnNum] = ln1.substring(0, idx1+1) + VIL_START + vnum + '願">' + ln1.substring(idx1+1);
                this.lines[i] = ln = VIL_START + vnum + '願">' + ln.substring(0, idx) + VIL_END + '」' + ln.substring(idx+2);
                addTerm('第' + vnum + '願', this.pageNum);
              }
            }
          }
        }
      }
    }
  }

  setName(name) { if (name) this.name = name }
  getNumDisp() { return (this.is序 ? '序 ' : '') + zNumber(this.pageNum) }
}

const pages = []; // 正文，of JiePage's
const 序pages = []; // 經解序，of JiePage's
const terms = {};
const TERM_MAP = {};
var   BOOKMARKS = {};

function clearBookmarks() { BOOKMARKS = {}; }

function addBookmarks(s) {
  if (!s) return;
  var a = s.trim().split('\n');
  for (var i in a) {
    var ln = a[i].trim(), idx = ln.indexOf('//');;
    if (idx >= 0) ln = ln.substring(0,idx).trim();
    if (!ln) continue;
    var xy = ln.split(':');
    var x = xy[0].trim(), y = xy[1].trim();
    if (x && y) BOOKMARKS[x] = y;
  }
}

function addTerm(term, pgnum) {
  term = TERM_MAP[term] || term;
  var info = terms[term];
  if (!info)
    terms[term] = { term, pages:[ pgnum ] };
  else if (info.pages.indexOf(pgnum) < 0)
    info.pages.push(pgnum);
}

(()=>{
  var a = Object.keys(vows);
  var obj = {};
  for (var i=0; i<a.length; ++i) {
    addTerm(`第${i+1}願`, vows[a[i]]);
    obj[a[i]] = i + 1;
    obj[i+1] = a[i]; // reverse map, from number to name.
  }
  vows = obj;
  for (var i in vowsAlias) vows[i] = vowsAlias[i];

  a = TERM_MAPPING.split('\n');
  for (var i in a) {
    var ab  = a[i].split(':');
    if (a[1]) TERM_MAP[ab[0]] = ab[1];
  }

  a = JIE_TEXT.split('\n');
  var pg, lastName;
  for (var i in a) {
    var ln = a[i];
    if (ln === '') continue;
    if (ln.startsWith('#')) {
      if (ln.startsWith('#解序')) {
        pg = new JiePage(parseInt(ln.substring(3)), '黃念祖居士大經解序', true);
        序pages.push(pg);
        continue;
      }
      else if (ln.length > 1 && isDigit(ln[1])) {
        var idx = ln.indexOf(':');
        var num;
        if (idx > 1) {
          lastName = ln.substring(idx+1);
          num  = ln.substring(1, idx);
        } else {
          num  = ln.substring(1);
        }
        pg = new JiePage(num, lastName);
        pg.setPrevPage(pages[pages.length-1]);
        pages.push(pg);
        continue;
      }
    }
    pg.addLine(ln);
  }

  // preprocess the text
  for (var i in pages) pages[i].preprocessText();
})();

function fontStyle(buf, fnt) {
  buf.w('font-weight:', fnt.isBold ? 'bold' : 'normal', ';');
  buf.w('color:',       fnt.color || TEXT_COLOR,        ';');
  buf.w('text-align:',  fnt.textAlign || 'left',        ';');
  fnt.fontFamily    && buf.w('font-family:',    fnt.fontFamily,   ';');
  fnt.letterSpacing && buf.w('letter-spacing:', fnt.letterSpacing,';');
  fnt.fontSize      && buf.w('font-size:',      fnt.fontSize,     'px;');
  fnt.lineHeight    && buf.w('line-height:',    fnt.lineHeight,   'px;');
  fnt.paddingLeft   && buf.w('padding-left:',   fnt.paddingLeft,  'px;');
  fnt.paddingRight  && buf.w('padding-right:',  fnt.paddingRight, 'px;');
  fnt.paddingTop    && buf.w('padding-top:',    fnt.paddingTop,   'px;');
  fnt.paddingBottom && buf.w('padding-bottom:', fnt.paddingBottom,'px;');
}

class ReaderStyles {
  constructor() {
    this.h1Text               = { width:60, fontSize:24, fontFamily:HEI_TI, isBold:true, paddingTop:50 };
    this.h2Text               = { width:50, fontSize:20, fontFamily:HEI_TI, isBold:true, paddingTop:60 };
    this.h3Text               = { width:40, fontSize:18, fontFamily:HEI_TI, isBold:true, paddingTop:60 };
    this.h4Text               = { width:36, fontSize:17, fontFamily:HEI_TI, isBold:true, paddingTop:36 };
    this.h5Text               = { width:30, fontSize:17, fontFamily:HEI_TI, isBold:true };
    this.smallsubtitleInline  = { fontSize:17, fontFamily:KAI_TI };
    this.smallsubtitle        = copy(this.smallsubtitleInline, { width:30, paddingTop:50, paddingLeft:20 });
    this.regularTextInline    = { fontSize:17, fontFamily:FANGSONG_TI };
    this.regularText          = copy(this.regularTextInline, { width:30 });
    this.introText            = { width:30, fontSize:18, fontFamily:FANGSONG_TI, paddingTop:25 };
    this.mottoText            = { width:50, fontSize:23, fontFamily:FANGSONG_TI, paddingTop:30, color:MOTTO_COLOR };
    this.mottoSrc             = { width:0,  fontSize:19, fontFamily:FANGSONG_TI, textAlign:'right', paddingBottom:60 };
    this.aboutText            = { width:30, fontSize:16, fontFamily:HEI_TI, color:ABOUT_COLOR };
    this.parinamanaText       = { width:30, fontSize:21, fontFamily:FANGSONG_TI, color:MOTTO_COLOR };
    this.titleText            = { width:70, fontSize:30, fontFamily:KAI_TI, color:QUOTE_COLOR, paddingTop:50 };
    this.titleTextFirst       = copy(this.titleText, { width:30, paddingLeft:15 });
    this.quoteText            = { width:32, fontSize:20, fontFamily:HEI_TI, color:QUOTE_COLOR };
    this.quoteTextStart       = copy(this.quoteText, { paddingRight:10 });
    this.quoteTextEnd         = copy(this.quoteText, { paddingLeft:10 });
    this.quoteTextStartEnd    = copy(this.quoteTextStart, { paddingLeft:10 });
    this.endTextInline        = { fontSize:14, fontFamily:KAI_TI };
    this.endTextCont          = copy(this.endTextInline, { width:30 });
    this.noteText             = this.endTextCont;
    this.endText              = copy(this.endTextCont, { textAlign:'right', paddingBottom:60 });
    this.authorTextInline     = { fontSize:16, fontFamily:KAI_TI, textAlign:'right', letterSpacing:'0.25em' };
    this.authorText           = copy(this.authorTextInline, { width:30 });
    this.vowTextInline        = copy(this.noteText, { color:VOW_COLOR, "background-color":VOW_BGCOLOR });
    this.vowText              = copy(this.vowTextInline, { width:30, paddingRight:-10, paddingLeft:10 });
    this.pageName             = { width:40, fontSize:14, fontFamily:KAI_TI, paddingTop:50 };
    this.pageNum              = copy(this.pageName, { textAlign:'right', paddingTop:0, paddingBottom:100 });
    this.regularTextWrapSize  = 13;
    this.endTextWrapSize      = 13;
  }

  // dims: { frameHeight, frameWidth, frameMarginTop, margin: { top, bottom } }
  addCSS(dims) {
    if (!dims.isXG && this._isCSSAdded) return;

    const shadow = '5px 5px #666;';
    const buf = new Buffer(
      dims.isXG,
      '.dim { opacity:0.5 }\n',
      '.qil { color:' + QUOTE_COLOR + ' }\n',
      '.xil { color:' + XQUOTE_COLOR + ' }\n',
      '.sil { font-weight:bold }\n',
      '.pil { font-weight:normal; color:' + PIN_COLOR + ' }\n',
      '.vil { color:' + VOW_COLOR + '; background-color:' + VOW_BGCOLOR + ' }\n',
      'vow  { color:' + VOW_COLOR + '; background-color:' + VOW_BGCOLOR + ' }\n',
      'red  { color:red }\n',
      'darkred  { color:darkred }\n',
      '.til { color:' + TOPIC_COLOR + ' }\n',
      'NianZu { font-size:16; font-family:' + KAI_TI + '; padding-top:1; padding-bottom:1; color:#00d; }\n',
      'NianZu::before { content:"念祖" }\n',
      'xycm { color:red; font-weight:bold }\n', // 信願持名
      'a { text-decoration:none }\n',
      'a.main { background-color:#fdd }\n\n',
      '.dualpageframe {',
        'position:',         'relative;',
        'background-color:', LEFT_BG_COLOR,
        'writing-mode:',     'vertical-rl;',
        'border:',           '1px black solid;',
        'height:',           dims.frameHeight, 'px;',
        'width:',            dims.frameWidth,  'px;', 
        'box-shadow:',       shadow,
        'margin-top:',       dims.frameMarginTop, 'px;',
      '}\n',
      '.ctlpnl {',
        'background-color:', '#CBD0D0;',
        'padding:',          '2px 5px 2px 5px;',
        'border:',           '1px black solid;',
        'width:',            dims.frameWidth-10, 'px;',
        'box-shadow:',       shadow,
      '}\n',
      '.termsframe sup { font-size:11px; }',
      '.termsframe {',
        'position: relative;',
        'background-color:', LEFT_BG_COLOR,
        'border:',           '1px black solid;',
        'height:',           dims.frameHeight, 'px;',
        'width:',            dims.frameWidth,  'px;', 
        'box-shadow:',       shadow,
        'margin-top:',       dims.frameMarginTop, 'px;',
        'overflow: auto;',
        'font-size: 14px;',
        'text-align: left;', 
      '}');

    var names = Object.keys(this);
    for (var i in names) {
      buf.w('\n\n');
      var name = names[i];
      var fnt = this[name];
      if (typeof fnt !== 'object') continue;
      var ht = dims.frameHeight - dims.margin.top - dims.margin.bottom;
      if (fnt.paddingTop)    ht -= fnt.paddingTop;
      if (fnt.paddingBottom) ht -= fnt.paddingBottom;
      buf.w('.', name, ' {');
      if (!name.endsWith('Inline'))
        buf.w('position:absolute; width:', fnt.width, 'px; line-height:', fnt.width, 'px;',
              'height:', ht, 'px; border:0px red solid;');
      fontStyle(buf, fnt);
      buf.w('}');
    }

    var sheet = document.createElement('style');
    sheet.innerHTML = buf.render();
    document.body.appendChild(sheet);
    this._isCSSAdded = true;
  }

} // end of Styles.

const css = new ReaderStyles();

class LineProc {
  constructor(lnNum, ln) {
    this.orig = ln; // for debugging

    var idx = -1;
    if (ln.startsWith('<!'))
      idx = ln.indexOf('>');
    if (idx > 0) {
      this.wholeLineTag = ln.substring(2,idx);
      this.line = ln.substring(idx+1);
      idx = this.wholeLineTag.indexOf(' ');
      if (idx > 0) {
        this.wholeLineTagExtra = this.wholeLineTag.substring(idx);
        this.wholeLineTag = this.wholeLineTag.substring(0, idx);
      }
    } else {
      this.line = ln;
    }

    this._proc();
  }

  get() { return this.line; }

  _proc() {
    var ln = this.line;
    if (ln.startsWith('{}'))
      ln = '{' + ln.substring(2) + '}';
    else if (ln.startsWith('{x}'))
      ln = '{x' + ln.substring(3) + 'x}';
    this.line = ln.replaceAll('《', '《{s').replaceAll('》', 's}》');

    this.__processSimpleTag('hl', 'hl1', 'xg', 'xg1', 'xg2');
    this.__procInLine();

    // process Vow InLine
    this.line = this.line.replace('#念祖', '<NianZu></NianZu>')
                         .replaceAll(VIL_START, '<span class="vil" title="第').replaceAll(VIL_END, '</span>')
                         .replaceAll('BJ', '<font class="sil">本經</font>')
                         .replaceAll('Bj', '<font class="sil">本</font>')
                         .replaceAll('bJ', '<font class="sil">經</font>');

    if (this.wholeLineTag)
      this.line = `<${this.wholeLineTag}${this.wholeLineTagExtra||''}>${this.line}</${this.wholeLineTag}>`;
  }

  __processSimpleTag() {
    var ln = this.line;
    for (var i in arguments) {
      var tag = arguments[i],
          startTag1 = '<' + tag + '>',
          startTag2 = '<' + tag + ' ',
          endTag   = '</' + tag + '>',
          idx1, idx;

      // handle dangling start-tag
      idx = ln.indexOf(endTag);
      if (idx >= 0) {
        idx1 = ln.indexOf(startTag1);
        if (idx1 < 0)
          idx1 = ln.indexOf(startTag2);
        if (idx1 < 0 || idx1 > idx)
          ln = startTag1 + ln;
      }
      // handle dangling end-tag
      idx = ln.lastIndexOf(startTag1);
      if (idx1 < 0)
        idx1 = ln.indexOf(startTag2);
      if (idx >= 0) {
        idx1 = ln.lastIndexOf(endTag);
        if (idx1 < 0 || idx1 < idx)
          ln += endTag;
      }
    }
    this.line = ln;
  }

  __procInLine() {
    const CUSTTAGS = 'pxst'; // Pin, eX-quote, source, term
    // parse into tokens
    var ln = this.line, i, cur = '', len = ln.length, x, a = [], braces = [];
    for (i=0; i<len; ++i) {
      var ch = ln[i];
      switch (ch) {
      case '{':
        if (cur) { a.push(cur); cur = ''; }
        ch = CUSTTAGS.indexOf(ln[i+1]);
        if (ch < 0) {
          a.push('{q');
          braces.push('{q');
        } else {
          x = '{' + CUSTTAGS[ch];
          a.push(x);
          braces.push(x);
          ++i;
        }
        break;
      case '}': 
        if (cur) { a.push(cur); cur = ''; }
        ch = CUSTTAGS.indexOf(ln[i-1]);
        if (ch < 0) {
          a.push('q}');
          braces.push('q}');
        } else {
          if (a.length > 0) {
            x = a[a.length-1];
            a[a.length-1] = x.substring(0, x.length-1);
          }
          x = CUSTTAGS[ch] + '}';
          a.push(x);
          braces.push(x);
        }
        break;
      default:  cur += ch; break;
      } 
    }
    if (cur) a.push(cur);

    // ensure dangling start/end-tags are enclosed
    for (i=0; i<braces.length; ++i) {
      var br = braces[i];
      if (!br) continue; // handled already
      if (br[0] == '{') {
        var expect = br[1] + '}'
        for (var j=i+1; j<braces.length; ++j) {
          if (braces[j] == expect) {
            braces[i] = braces[j] = null; // wipe out pairs
            break;
          }
        }
      }
    }
    // cover '?}' from head
    for (i=0; i<braces.length; ++i) {
      var br = braces[i];
      if (!br) continue; // handled already
      if (br[1] == '}') {
        braces[i] = null;
        a.unshift('{' + br[0]);
      }
    }
    // cover '{?' from tail
    for (i=braces.length-1; i>=0; --i) {
      var br = braces[i];
      if (!br) continue; // handled already
      a.push(br[1] + '}');
    }

    // turn braces into <span> tags
    var buf = new Buffer();
    for (var i=0; i<a.length; ++i) {
      var x = a[i];
      if (x.endsWith('}'))
        buf.w('</span>');
      else if (x.startsWith('{'))
        buf.w('<span class="', x[1], 'il">');
      else
        buf.w(x);
    }
    this.line = buf.render();
  }

} // LineProc.


class PageDims {
  constructor(width, height, frameMarginTop) {
    this.frameMarginTop = frameMarginTop || 10;
    this.frameWidth     = width || 1050;
    this.frameHeight    = height || 720;
    this.margin         = { top:30, bottom:10, edge:20, ridge:30 };
    this.isXG           = window['xgStyles'] || window['xgStyle'] || get('xg') && DEFAULT_XG || '';

    if (!this.keyHandlerSet) {
      document.addEventListener("keydown", keypress, false);
      this.keyHandlerSet = true;
    }
  }

  setElemId(elemId) { this.elemId = elemId }

  renderDualPages(pageId) {
    if (!this.elemId) { alert('PageDims.elemId is not set. Nothing to do.'); return; }
    css.addCSS(this);
    if (!pageId) {
      pageId = sessionStorage.getItem('lastPageId');
      console.log('Retrieved pageId from sessionStorage:', pageId);
    }
    if (!pageId) pageId = 'cover';
    switch (pageId) {
    case 'next':      pageId = this._getNextPageId(1); if (!pageId) return; break;
    case 'next5':     pageId = this._getNextPageId(5); if (!pageId) return; break;
    case 'prev':      pageId = this._getPrevPageId(1); if (!pageId) return; break;
    case 'prev5':     pageId = this._getPrevPageId(5); if (!pageId) return; break;
    case 'nextQuote': pageId = this._getNextQuotePageId(); break;
    case 'prevQuote': pageId = this._getPrevQuotePageId(); break;
    case 'nextNote':  pageId = this._getNextNotePageId(); break;
    case 'prevNote':  pageId = this._getPrevNotePageId(); break;
    }
    if (!pageId) return;
    { sessionStorage.setItem('lastPageId', pageId);
      console.log('saved pageId', pageId);
    }

    var buf = new Buffer();

    function showTerm(inf) {
      var tm;
      if (typeof inf == 'number') {
        var i = inf;
        inf = terms[`第${i}願`];
        tm = `${i}.<b>${vows[i]}</b>`;
      } else {
        tm = inf.term;
      }
      var a = [];
      for (var tj=0; tj<inf.pages.length; ++tj) {
        var pn = inf.pages[tj];
        a.push(`<a href="javascript:showPage(${pn})">${pn}</a>`);
      }
      buf.w(tm, '<sup>&nbsp;', a.join(',&nbsp;'), '</sup> &nbsp;');
    }

    if (pageId == 'terms') {
      buf.w('<div class="termsframe"><p style="padding:20px; margin-top:0px">',
            '<b style="font-size:20px">索引：</b>',
            '<darkred>【四十八願】</darkred>');
      for (var i=1; i<=48; ++i)
        showTerm(i);
      buf.w('&nbsp;<darkred>【其他條目】</darkred>');
      for (var ti in terms) {
        if (!(ti[0] == '第' && ti.endsWith('願')))
          showTerm(terms[ti]);
      }
      buf.w('</p></div>');
      buf.render(this.elemId);
      return;
    }

    buf.w('<div class="dualpageframe"');
    if (pageId === 'backcover') buf.w(' style="background-color:black"');
    buf.w('>');
    switch (pageId) {
    case 'cover':
      this._renderBookCover(buf);
      this._renderPage(buf, this._getMottoPage(), true);
      break;
    case 'backcover':
      this._renderBookBackCover(buf);
      this._renderPage(buf, this._getParinamanaPage());
      break;
    case 'about':
      buf.w(this._getAboutPage());
      break;
    case 'toc':
      buf.w(this._getTOCPage());
      break;
    default: // regular
      pageId = this._findDualPages(pageId);
      this._renderPage(buf, pageId && pageId.left, true);
      if (pageId.right == 'USAGE')
        this._renderUsageInstructions(buf);
      else
        this._renderPage(buf, pageId && pageId.right);
      var el = e('toPage');
      el && (el.value = pageId.left && pageId.left.pageNum || pageId.right && pageId.right.pageNum);
      break;
    }
    this.curDisp = pageId;
    this._addNavBtns(buf);
    buf.w('</div>');
    buf.render(this.elemId);
  }

  _findDualPages(pageId) {
    var dpdisp = {}; // keys: right, left
    if ((typeof pageId === 'string') && (pageId.startsWith('序') || pageId.startsWith('i'))) {
      switch(parseInt(pageId.substring(1))) {
      case 1: dpdisp.left = 序pages[0];  dpdisp.right = this._getAboutPage(); break;
      case 2:
      case 3: dpdisp.left = 序pages[2]; dpdisp.right = 序pages[1]; break;
      case 4: dpdisp.left = pages[0];   dpdisp.right = 序pages[3]; break;
      }
    } else {
      if (typeof pageId === 'string') pageId = parseInt(pageId);
      if (pageId === 1) {
        dpdisp.left = pages[0];
        dpdisp.right = 序pages[3];
      } else if (pageId > 1) {
        if (pageId % 2 === 0) {
          dpdisp.right = pages[pageId-1];
          dpdisp.left = pages[pageId];
        } else {
          dpdisp.right = pages[pageId-2];
          dpdisp.left = pages[pageId-1];
        }
      }
    } 
    return dpdisp;
  }

  _getNextNotePageId() {
    var pgInfo = this.curDisp && this.curDisp.left;
    var startIdx = pgInfo ? (pgInfo.pageNum+1) : 1;
    for (var i=startIdx; i<pages.length; ++i) {
      var pi = pages[i];
      if (dims.isXG) {
        if (pi.hasXG || pi.hasHL) return pi.pageNum;
      } else {
        if (pi.hasHL) return pi.pageNum;
      }
    }
    for (var i=1; i<startIdx; ++i) {
      var pi = pages[i];
      if (dims.isXG) {
        if (pi.hasXG || pi.hasHL) return pi.pageNum;
      } else {
        if (pi.hasHL) return pi.pageNum;
      }
    }
    return null;
  }

  _getPrevNotePageId() {
    var pgInfo = this.curDisp && this.curDisp.right;
    var startIdx = !pgInfo ? (pages.length-1) : (pgInfo.pageNum-2);
    for (var i=startIdx; i>1; --i) {
      var pi = pages[i];
      if (dims.isXG) {
        if (pi.hasXG || pi.hasHL) return pi.pageNum;
      } else {
        if (pi.hasHL) return pi.pageNum;
      }
    }
    for (var i=pages.length-1; i>startIdx; --i) {
      var pi = pages[i];
      if (dims.isXG) {
        if (pi.hasXG || pi.hasHL) return pi.pageNum;
      } else {
        if (pi.hasHL) return pi.pageNum;
      }
    }
    return null;
  }

  _getNextQuotePageId() {
    var pgInfo = this.curDisp && this.curDisp.left;
    if (pgInfo) {
      for (var i=pgInfo.pageNum; i<pages.length; ++i) {
        if (pages[i].hasQuotes) return pages[i].pageNum;
      }
    }
    return FIRST_QUOTE_PAGE_NUM;
  }

  _getPrevQuotePageId() {
    var pgInfo = this.curDisp && this.curDisp.right;
    var i = !pgInfo ? (pages.length-1) : (pgInfo.pageNum-2);
    for (; i>FIRST_QUOTE_PAGE_NUM; --i)
      if (pages[i].hasQuotes) return pages[i].pageNum;
    return FIRST_QUOTE_PAGE_NUM;
  }

  _getNextPageId(step) {
    if (!step) step = 1;
    if (!this.curDisp) return null;
    if (this.curDisp === 'cover') return 'toc';
    if (this.curDisp === 'backcover') return 'cover';
    if (this.curDisp === 'toc') return 'i1';
    var pgInfo = this.curDisp && this.curDisp.left;
    if (!pgInfo) pgInfo = this.curDisp && this.curDisp.right;
    if (pgInfo) {
      if (pgInfo.is序) {
        switch(pgInfo.pageNum) {
        case 1: return 'i2';
        case 3: return 'i4';
        }
      } else {
        var ret = pgInfo.pageNum + step;
        return (ret <= LAST_PAGE_NUM) ? ret : 'backcover';
      }
    }
    return null;
  }

  _getPrevPageId(step) {
    if (!step) step = 1;
    if (!this.curDisp) return null;
    if (this.curDisp === 'cover') return 'backcover';
    if (this.curDisp === 'backcover') return LAST_PAGE_NUM;
    if (this.curDisp === 'toc') return 'cover';
    if (this.curDisp === 'about') return 'toc';
    var pgInfo = this.curDisp && this.curDisp.right;
    if (!pgInfo) pgInfo = this.curDisp && this.curDisp.left;
    if (pgInfo) {
      if (pgInfo.isAbout) return 'toc';
      if (pgInfo.is序) {
        switch(pgInfo.pageNum) {
        case 1: return 'toc';
        case 2: return 'i1';
        case 4: return 'i3';
        }
      }
      else {
        var ret = pgInfo.pageNum - step;
        return (ret < 1) ? 'i4' : ret;
      }
    }
    return null;
  }

  _addNavBtns(buf) {
    this._navDiv(buf, 'bl');
    this._navDiv(buf, 'br');

    switch (this.curDisp) {
    case 'cover':
      this._navDiv(buf, 'tl');
      break;
    case 'toc':
      this._navDiv(buf, 'tr');
      break;
    case 'backcover':
    default:
      this._navDiv(buf, 'tl');
      this._navDiv(buf, 'tr');
      break;
    }
  }

  // top-bottom-left-right
  _navDiv(buf, tblr) {
    var help, dest, x = 0, y = 0, thickness = 28, H = this.frameHeight, W = this.frameWidth;
    switch (tblr) {
    case 'tl': dest = 'toc';   help = '目錄';   break;
    case 'tr': dest = 'cover'; help = '關書';   x = W/2; break;
    case 'bl': dest = 'next';  help = '後一頁'; y = H - thickness; break;
    case 'br': dest = 'prev';  help = '前一頁'; y = H - thickness; x = W/2; break;
    default:   console.log('Error: unrecognized tblr location', tblr); return;
    }
    buf.w('<div id="nav-', tblr, '" style="border:0px solid red; position:absolute; cursor:grab; left:',
          x, 'px; top:', y, 'px; height:', thickness, 'px; width:', W/2,
          'px;" onclick="showPage(\'', dest, '\')" title="', help, '"></div>');
  }

  _div(buf, cssCls, styles, x, y, ln, lnNum) {
    if (!ln) return;
    var buf1 = new Buffer('<div');
    cssCls && buf1.w(' class="', cssCls, '"');
    buf1.w(' style="left:', x, 'px; top:', y, 'px;', styles || '', '">');
    if (lnNum) buf1.w('<span style="', LINE_NUM_STYLE, '">', lnNum, '</span>');
    buf1.w(new LineProc(lnNum, ln).get(), '</div>');
    buf.w(buf1.render());
  }

  _getTOCPage() {
     var a = TOC_HTML.split('\n'), buf = new Buffer();
     for (var i in a) {
       var ln = a[i];
       while(true) {
         var idx = ln.indexOf('[');
         if (idx < 0) break;
         buf.w(ln.substring(0, idx));
         var idx1 = ln.indexOf(']', idx);
         var idx2 = ln.indexOf('|', idx);
         var isMain = idx2 > 0;
         if (!isMain) idx2 = ln.indexOf(':', idx);
         var pageId = ln.substring(idx2+1, idx1);
         if (pageId.startsWith('i')) pageId = "'" + pageId + "'";
         else if (pageId.startsWith('t')) pageId = "'terms'";
         var txt = ln.substring(idx+1, idx2);
         var note = TOC_notes[txt.trim()];
         if (note) note = ' title="' + note + '"';
         buf.w('<a', isMain && !txt.startsWith('卷') ? ' class="main"' : '',
               ' href="javascript:showPage(', pageId, ')"', note, '>', txt, '</a>');
         ln = ln.substring(idx1+1);
       }
       buf.w(ln);
     }
     return buf.render();
  }

  _getMottoPage() {
    var pgInfo = new JiePage();
    pgInfo.preferredStyle = 'mottoText';
    pgInfo.addLine(('\n' + MOTTO.trim()).split('\n'));
    pgInfo.isMotto = true;
    return pgInfo;
  }

  _getAboutPage() {
    var pgInfo = new JiePage();
    pgInfo.preferredStyle = 'aboutText';
    var a = ABOUT_THIS.trim().split('\n');
    for (var i=0; i<a.length; ++i) a[i] = '　　　' + a[i];
    pgInfo.addLine(a);
    pgInfo.isAbout = true;
    return pgInfo;
  }

  _getParinamanaPage() {
    var pgInfo = new JiePage();
    pgInfo.preferredStyle = 'parinamanaText';
    pgInfo.addLine('');
    pgInfo.addLine(PARINAMANA.trim().split('\n'));
    return pgInfo;
  }

  _getReadAreaDims(isLeft) {
    const W = this.frameWidth, W_2 = W / 2, pgnumW = css.pageNum.width;
    return { // orig is top-right corner.
      origX:    isLeft ? (W_2 - this.margin.ridge) : (W - this.margin.edge - pgnumW),
      origY:    this.margin.top,
      bodyH:    this.frameHeight - this.margin.top - this.margin.bottom,
      bodyW:    W_2 - this.margin.edge - this.margin.ridge - css.pageNum.width,
      pageNumX: isLeft ? this.margin.edge : (W - this.margin.edge - pgnumW),
      pageNumW: pgnumW,
    };
  }

  _renderPage(buf, pgInfo, isLeft) {
    if (!isLeft) this._pageBackground(buf, RIGHT_BG_COLOR);
    if (!pgInfo) return;
    var dims = this._getReadAreaDims(isLeft);
    var lines = pgInfo.lines;
    var x = dims.origX;
    var idx, len = lines.length, lnNum = 1, ln, asis = false;
    var isSpecial = pgInfo.preferredStyle;
    if (pgInfo.getHTML) {
      isSpecial = asis = true;
      ln = pgInfo.getHTML();
    } else // usual page...
    for (var i=0; i<len; ++i) {
      var showLnNum = true;
      ln = lines[i];
      var cssCls = pgInfo.is序 ? 'introText' : (pgInfo.preferredStyle || 'regularText');

      if (ln.startsWith('#')) {
        if (ln.startsWith('#!!')) {
          //console.log('[p' + pgInfo.pageNum + '] ' + ln);
          continue;
        }
        if (ln.startsWith('#title:')) {
          showLnNum = false;
          cssCls = 'titleText';
          ln = ln.substring(7);
          if (i === 0) cssCls += 'First';
        }
        else if (ln.startsWith('#quote:')) {
          cssCls = 'quoteText';
          ln = ln.substring(7);
          if ((i>0) && !lines[i-1].startsWith('#quote:')) cssCls += 'Start';
          if ((i<len-1) && !lines[i+1].startsWith('#quote:')) cssCls += 'End';
        }
        else if (ln.startsWith('#note:')) {
          cssCls = 'noteText';
          ln = ln.substring(6);
        }
        else if (ln.startsWith('#end:')) {
          showLnNum = false;
          cssCls = 'endText';
          ln = ln.substring(5);
        }
        else if (ln.startsWith('#endCont:')) {
          cssCls = 'endTextCont';
          ln = ln.substring(9);
        }
        else if (ln.startsWith('#author:')) {
          cssCls = 'authorText';
          ln = ln.substring(8);
        }
        else if (ln.startsWith('#vow:')) {
          cssCls = 'vowText';
          ln = ln.substring(5);
        }
        else if (ln.startsWith('#h') && ln[3] === ':') { // #h1, #h2, #h3, #h4, #h5
          showLnNum = ln.startsWith('#h5');
          cssCls = ln.substring(1, 3) + 'Text';
          ln = ln.substring(4);
          if (cssCls === 'h5Text') ln = '　　' + ln;
        }
        else if (ln.startsWith('#smallsubtitle:')) {
          showLnNum = false;
          cssCls = 'smallsubtitle';
          ln = ln.substring(15);
        }
        else if (ln.startsWith('#mottosrc:')) {
          cssCls = 'mottoSrc';
          ln = ln.substring(10);
        }
        else if (ln.startsWith('#p1custom')) {
          ln = '';
          x -= this._renderFirstPageTitle(buf, dims);
        }
        else if (ln.startsWith('#double:')) {
          showLnNum = false;
          ++lnNum;
          ln = this._handleWrappedText(ln.substring(8), css.regularTextWrapSize);
          asis = true;
        }
        else if (ln.startsWith('#end-double:')) {
          cssCls = 'endText';
          ln = this._handleWrappedText(ln.substring(12), css.endTextWrapSize);
          asis = true;
        }
      }

      // inline extra style
      if (!asis) {
        idx = ln.indexOf('</>'); // shortcut for #reg:
        if (idx > 0)
          ln = ln.substring(0, idx) + '<span class="regularTextInline">' + ln.substring(idx+3) + '</span>';
        idx = ln.indexOf('#');
        if (idx > 0) {
          var inline = ln.substring(idx+1);
          if (inline.startsWith('reg:'))
            inline = '<span class="regularTextInline">' + ln.substring(idx+5) + '</span>';
          else if (inline.startsWith('end:'))
            inline = '<span class="endTextInline">' + ln.substring(idx+5) + '</span>';
          else if (inline.startsWith('author:'))
            inline = '<span class="authorTextInline">' + ln.substring(idx+8) + '</span>';
          else if (inline.startsWith('vow:'))
            inline = '<span class="vowTextInline">' + ln.substring(idx+5) + '</span>';
          else if (inline.startsWith('smallsubtitle:'))
            inline = '<span class="smallsubtitleInline">' + ln.substring(idx+15) + '</span>';
          ln = ln.substring(0, idx) + inline;
        }
      }

      var fnt = css[cssCls];
      x -= fnt.width;
      if (fnt.paddingLeft)  x -= fnt.paddingLeft;
      if (fnt.paddingRight) x -= fnt.paddingRight;
      this._div(buf, cssCls, null, x, dims.origY, ln, showLnNum && ln.trim() ? lnNum++ : null);
    }
    if (isSpecial) return;

    // page number, name
    var isEven = pgInfo.pageNum % 2 === 0;
    this._div(buf, 'pageName', null, dims.pageNumX, dims.origY, isEven ? BOOK_TITLE : pgInfo.name);
    this._div(buf, 'pageNum', null, dims.pageNumX, dims.origY, pgInfo.getNumDisp());
  }

  _handleWrappedText(ln, wrapFontSize) {
      var idx = 0;
    while (true) {
      idx = ln.indexOf('[', idx);
      if (idx < 0) break;
      var idx1 = ln.indexOf(']', idx);
      if (idx1 < 0) break;
      var a = ln.substring(0, idx), b = ln.substring(idx+1, idx1), c = ln.substring(idx1+1);
      b = b.split('|');
      if (b.length === 1)
        ln = a + b[0] + c;
      else
        ln = '<table border="0" cellspacing="0" cellpadding="0"><tr><td nowrap>' + a +
             '</td><td nowrap style="line-height:' + (3+wrapFontSize) + 'px; font-size:' + wrapFontSize + '">' + b[0] + '<br>' + b[1] +
             '</td><td nowrap>' + c + '</td></tr></table>';
      idx = idx1 + 1;
    }
    return ln;
  }

  _renderFirstPageTitle(buf, dims) { // returns width
    var font1 = { fontSize:24, fontFamily:HEI_TI, isBold:true };
    var font2 = { fontSize:24, fontFamily:SONG_TI };
    var font3 = copy(this.authorTextInline, { textAlign:'left', paddingTop:260 });
    var w1 = 60, w2 = 60, w3 = 25, offset = 20;
    var me = this,
        styleBuf = new Buffer(),
        x = dims.origX,
        H = dims.bodyH;

    function _r(fnt, w, isFirst, x, t) {
      styleBuf.w('position:absolute; width:', w, 'px; height:', H, 'px;');
      if (isFirst) styleBuf.w('line-height:', w, 'px;');
      fontStyle(styleBuf, fnt);
      me._div(buf, null, styleBuf.render(), x, dims.origY, t);
    }

    _r(font1, w1, 1, x -= w1, '佛說大乘無量壽莊嚴清淨平等覺經會集本解' +
                              '　<font style="font-size:18px">簡 稱</font>');
    _r(font2, w2, 0, x -= w2, '大乘無量壽經解');
    H -= font3.paddingTop;
    _r(font3, w3, 0, (x -= w3) + offset, '菩薩戒弟子鄆城夏蓮居會集各譯敬分章次');
    _r(font3, w3, 0, (x -= w3) + offset, '金剛乘三昧耶戒弟子黃念祖　敬解');

    return w1 + w2 + w3;
  }

  _pageBackground(buf, color, isLeft) { // isLeft never works! it's always placed on the right.
    var x = isLeft ? 0 : this.frameWidth/2;
    var bg = 'background-color:' + color + ';';
    if (color.startsWith('linear-gradient'))
      bg = 'background:-moz-' + color + ';' + bg;
    buf.w('<div style="', bg, 'left:', x, 'px; top:0px; height:', this.frameHeight,
          'px; width:', this.frameWidth/2, 'px"></div>');
  }

  _renderBookCover(buf) {
    var font1 = { fontSize:46, fontFamily:KAI_TI, isBold:true, color:COVER_TEXT_COLOR, paddingTop:80 };
    var font2 = { fontSize:30, fontFamily:KAI_TI, color:COVER_TEXT_COLOR, paddingTop:85 };
    var font3 = { fontSize:22, fontFamily:KAI_TI, color:COVER_TEXT_COLOR, paddingTop:360 };
    var font4 = { fontSize:18, fontFamily:HEI_TI, color:COVER_TEXT_COLOR, paddingTop:402 };
    var w1 = 80, w2 = 30, w3 = 20, w4 = 20, titleOffset = 30, authorOffset = 90, pubOffset = 70, versionOffset = 85;
    var me = this,
        dims = this._getReadAreaDims(false),
        W = this.frameWidth,
        H = dims.bodyH,
        styleBuf = new Buffer();

    function _r(fnt, w, h, x, t) {
      styleBuf.w('position:absolute; width:', w, 'px; height:', h, 'px;');
      fontStyle(styleBuf, fnt);
      me._div(buf, null, styleBuf.render(), x, dims.origY, t);
    }

    this._pageBackground(buf, 'black');
    _r(font1, w1, H - font1.paddingTop, W - dims.bodyW/2 - w1/2 - titleOffset,
       '佛說大乘無量壽莊嚴<br>清淨平等覺經解');
    _r(font2, w2, H - font2.paddingTop, W - authorOffset, '黃念祖居士 著');
    _r(font3, w3, H - font3.paddingTop, W/2 + pubOffset, '佛陀教育基金會　印贈');
    _r(font4, w4, H - font4.paddingTop, W - versionOffset, '二〇一〇年五月修訂版');
  }

  _renderUsageInstructions(buf) {
    buf.w('<div style="writing-mode:horizontal-tb"><table border="0" width="', this.frameWidth/2,
          'px" cellpadding="48px"><tr>',
          '<td style="color:#777; font-family:', SONG_TI, ';">', ABOUT_THIS, '</td></tr></table></div>');
  }

  _renderBookBackCover(buf) {
    var font1 = { fontSize:60, fontFamily:KAI_TI, isBold:true, color:COVER_TEXT_COLOR, paddingTop:130 };
    var w1 = 80, offset = 15;
    var dims = this._getReadAreaDims(true), styleBuf = new Buffer();

    styleBuf.w('position:absolute; width:', w1, 'px; height:', dims.bodyH - font1.paddingTop, 'px;');
    fontStyle(styleBuf, font1);
    this._div(buf, null, styleBuf.render(), dims.bodyW/2 + offset, dims.origY, '南無阿彌陀佛');
  }

} // end of PageDims.


var dims = new PageDims();

function showPage(pageId) {
  dims.renderDualPages(pageId || get('p'));
}

function showCtlPanel() {
  var buf = new Buffer();
  const sp = '&nbsp;';
  const sp3 = '&nbsp;&nbsp;&nbsp;';
  const sp4 = sp3 + '&nbsp;';
  const sp6 = sp3 + sp3;
  buf.w(`<a href="../../index.html"><img src="../../images/download.svg" style="padding-top:2px" title="回主頁下載"></a>`,
        sp6,
        ` <a href="javascript:showPage('nextQuote')" title="下段經文。或按PgDn鍵">◂ </a>&nbsp;經文`,
        `&nbsp;<a href="javascript:showPage('prevQuote')" title="上段經文。或按PgUp鍵"> ▸</a> `,
        sp3, `<a href="javascript:showPage('next')" title="後一頁。或按左向鍵">⬅️ </a>`,
        sp,  `&nbsp;<a href="javascript:showPage('prev')" title="前一頁。或按右向鍵">➡️</a>`,
        sp4, `第&nbsp;<input size="2" id="toPage">&nbsp;頁`,
        sp4, `<a href="javascript:showPage('backcover')" title="或按End鍵"><img src="jie_bcover.png" width="24px" title="封底。或按End鍵"></a>`,
        sp3, `<a href="javascript:showPage('toc')"><img src="jie_toc.png" width="24px" title="目錄。或按Ctrl-0鍵"></a>`,
        sp3, `<a href="javascript:showPage('cover')" title="或按Home鍵"><img src="jie_cover.png" width="24px" title="封面。或按Home鍵"></a>`,
        sp3, `【<a href="javascript:showPage('terms')" title="或按Ctrl-+鍵">索引</a>】`,
        sp6, `<font style="color:blue" title="如何加高光筆記，請參看Jie.html的指示">`,
             ` <a href="javascript:showPage('nextNote')" title="或按Ctrl-4鍵">◂ </a>&nbsp;筆記`,
             `&nbsp;<a href="javascript:showPage('prevNote')" title="或按Ctrl-6鍵"> ▸</a> </font>`,
        sp3, `<span style="color:blue" title="如何加書籤，請參看Jie.html的指示">書籤&nbsp;`, getBookmarksSel(), `</span>`,
  );
  buf.render(`ctlpnl`);
}

function bookmarkChange(e) { var pg = e.target.value; pg && showPage(pg); }

function getBookmarksSel() {
  var buf = new Buffer('<select onchange="bookmarkChange(event)"><option value="">　　　　　　</option>');
  for (var k in BOOKMARKS) {
    var pg = BOOKMARKS[k];
    buf.w(`<option value="${pg}">${k}(${pg})</option>\n`);
  }
  return buf.w('</select>').render();
}

function keypress(event) {
  var isShift = event.shiftKey;
  var isAlt   = event.altKey;
  var isCtrl  = event.ctrlKey;

  switch (event.keyCode) {
  case 107: /* +   ⊞ */
  case  61: /* = +   */ if (isCtrl) showPage('terms'); break;
  case  96: /* 0   ⊞ */
  case  48: /* 0     */ if (isCtrl) showPage('toc'); break;
  case  37: /* left  */ showPage(isShift ? 'next5' : 'next'); break;
  case  39: /* right */ showPage(isShift ? 'prev5' : 'prev'); break;
  case  35: /* end   */ showPage('backcover'); break;
  case  36: /* home  */ showPage('cover');     break;
  case  33: /* up    */ showPage('prevQuote'); break;
  case  34: /* down  */ showPage('nextQuote'); break;
  case 102: /* > 6 ⊞ */
  case  54: /* 6     */ if (isCtrl) showPage('prevNote'); break;
  case 100: /* < 4 ⊞ */
  case  52: /* 4     */ if (isCtrl) showPage('nextNote'); break;
  case  13: /* enter */ var toPg = e('toPage').value;
                        if (toPg !== '') showPage(toPg);
                        break;
  }
}

const ABOUT_THIS = `
《大經解》專用閱讀器簡介

本閱讀器乃對佛陀教育基金會恭印的黃念祖居士著《佛說大乘無量壽莊嚴清淨
平等覺經解》之重新排版。排文求與硬拷貝雷同，悉尊原文標點、行啟、字體。
稍事調整，及予經文引用等著色，增益屏幕閱讀，不昧文字頁數索引。改進標
點、糾錯字（如人、入）。目錄特製，非書原有。

推薦使用Firefox。諸主流瀏覽器應該可以。


【信裹居士恭製　1.0.0版　二〇二二年】
`;
