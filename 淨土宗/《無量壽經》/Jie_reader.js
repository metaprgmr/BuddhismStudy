// FEATURE: replace tag's content with variable values. E.g. <xg title="$JK033$">

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
function isDigit(x) { return typeof x === 'number' || '9876543210'.indexOf(x) >= 0 }
function sp(n, filler) {
  if (!n) return '';
  if (!filler) filler = '　';
  var ret = '';
  for (var i=n; i>0; --i) ret += filler;
  return ret;
}

class Buffer {
  constructor() { this.buf = concat(arguments) }
  w() { this.buf += concat(arguments) }
  prepend() { this.buf = concat(arguments) + this.buf }
  text() { return this.buf }

  // renders to innerHTML of a valid element.
  // returns the text.
  // clears the internal buffer.
  render(elid) {
    var ret = this.buf;
    if (elid) { var el = e(elid); el && (el.innerHTML = ret) }
    this.buf = '';
    return ret;
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

// "Quote InLine", "Pin(品名) InLine", "Vow InLine" and "Topic/Terminology InLine"  handling
// Potential vows in the text are examined for「...願」and「...V」against `vows` below.
const QIL_START = 'ㄍ'; // replaces {
const QIL_END   = 'ㄑ'; // replaces }   e.g. {如是我聞}
const QIL_LINE  = 'ㄇ'; // replaces ^{}
const XIL_LINE  = QIL_LINE + 'x'; // replaces ^{x}
const VIL_START = 'ㄅ';
const VIL_END   = 'ㄆ';
const VIL_START_NO_END = 'ㄇ';
const VIL_END_NO_START = 'ㄈ';
const TIL_START = QIL_START + 't'; // replaces {t  -- terminology
const TIL_END   = 't' + QIL_END;   // replaces t}  e.g. {t八相成道t}
const PIL_START = QIL_START + 'p'; // replaces {p  -- Quote (of this sutra) InLine
const PIL_END   = 'p' + QIL_END;   // replaces p}  e.g. {p受菩提記p}
const XIL_START = QIL_START + 'x'; // replaces {x  -- eXternal quoting InLine
const XIL_END   = 'x' + QIL_END;   // replaces x}  e.g. {x擐大甲胄，以宏誓功德而自莊嚴。x}
const SIL_START = '《'; //  -- Source name
const SIL_END   = '》'; //  e.g. 《觀經》
const TMP_START = 'ㄥ';
const TMP_END   = 'ㄦ';
const 念祖      = 'ㄙ祖';

var vows = [
  '國無惡道願', '不墮惡趣願', '身悉金色願', '三十二相願', '身無差別願',
  '宿命通願',   '天眼通願',   '天耳通願',   '他心通願',   '神足通願',
  '徧供諸佛願', '定成正覺願', '光明無量願', '觸光安樂願', '壽命無量願',
  '聲聞無數願', '諸佛稱嘆願', '十念必生願', '聞名發心願', '臨終接引願',
  '悔過得生願', '國無女人願', '厭女轉男願', '蓮華化生願', '天人禮敬願',
  '聞名得福願', '修殊勝行願', '國無不善願', '住正定聚願', '樂如漏盡願',
  '不貪計身願', '那羅延身願', '光明慧辯願', '善談法要願', '一生補處願',
  '教化隨意願', '衣食自至願', '應念受供願', '莊嚴無盡願', '無量色樹願',
  '樹現佛剎願', '徹照十方願', '寶香普薰願', '普等三昧願', '定中供佛願',
  '獲陀羅尼願', '聞名得忍願', '現證不退願',
  '不更惡趣願', '卅二相願',   '遍供諸佛願', '諸佛稱歎願', '女人往生願',
  '蓮華化生願', '國無婦女願', '無差別願',
];

(function(){
  var a = vows;
  vows = {};
  for (var i in a) vows[a[i]] = true;
})();

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
          if (!this.hasQuotes && (l.startsWith('#quote:') || l.startsWith('#title:')))
            this.hasQuotes = true;
        }
      } else {
        if (ln.startsWith('#quot_')) ln = '#quote' + ln.substring(6);
        this.lines.push(ln)
        if (!this.hasQuotes && (ln.startsWith('#quote:') || ln.startsWith('#title:')))
          this.hasQuotes = true;
      }
    }
  }

  preprocessText() {
    for (var i=0; i<this.lines.length; ++i) {
      var ln = this.lines[i], idx;

      // handle 念祖
      ln = ln.replace('#念祖', 念祖);

      // handle 經文引用
      if (ln.startsWith('{}'))
        ln = QIL_LINE + ln.substring(2);
      else if (ln.startsWith('{x}'))
        ln = XIL_LINE + ln.substring(3);
      else
        ln = ln.replaceAll('{', QIL_START).replaceAll('}', QIL_END); // also covers (TIL|PIL|XIL)_START/END
      this.lines[i] = ln;
  
      // handle 「...願」
      for (idx=0; ; idx+=2) {
        idx = ln.indexOf('願」', idx);
        if (idx < 0) break;
        var idx1 = ln.lastIndexOf('「', idx);
        if (idx1 >= 0) {
          var v = ln.substring(idx1+1, idx+1);
          if ((v.length <= 5) && vows[v])
            this.lines[i] = ln = ln.substring(0, idx1) + VIL_START + v + VIL_END + ln.substring(idx+2);
//        else console.log(v, ':', ln);
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
            if ((v.length <= 5) && vows[v]) {
              pg.lines[lnNum] = ln1.substring(0, idx1) + VIL_START_NO_END + ln1.substring(idx1+1);
              this.lines[i] = ln = ln.substring(0, idx+1) + VIL_END_NO_START + ln.substring(idx+2);
            }
//          else console.log(v, ':', ln1, ln);
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
          if ((v.length <= 5) && vows[v+'願'])
            this.lines[i] = ln = ln.substring(0, idx1) + VIL_START + v + VIL_END + ln.substring(idx+2);
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
            if ((v.length <= 5) && vows[v+'願']) {
              pg.lines[lnNum] = ln1.substring(0, idx1) + VIL_START_NO_END + ln1.substring(idx1+1);
              this.lines[i] = ln = ln.substring(0, idx) + VIL_END_NO_START + ln.substring(idx+2);
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

(function(){
  var a = JIE_TEXT.split('\n');
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
    this.parinamanaText       = { width:30, fontSize:18, fontFamily:KAI_TI, color:MOTTO_COLOR };
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
    this.regularTextWrapSize  = 15;
    this.endTextWrapSize      = 13;
  }

  // dims: { frameHeight, frameWidth, frameMarginTop, margin: { top, bottom } }
  addCSS(dims) {
    var isXG = get('xg');
    if (!isXG && this._isCSSAdded) return;

    const buf = new Buffer(
      window['xgStyle'] || isXG && 'xg { background-color:#ffd }',
      '.dim { opacity:0.5 }\n',
      '.qil { color:' + QUOTE_COLOR + ' }\n',
      '.xil { color:' + XQUOTE_COLOR + ' }\n',
      '.sil { font-weight:bold }\n',
      '.pil { font-weight:normal; color:' + PIN_COLOR + ' }\n',
      '.vil { color:' + VOW_COLOR + '; background-color:' + VOW_BGCOLOR + ' }\n',
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
        'margin-top:',       dims.frameMarginTop, 'px;',
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

class PageDims {
  constructor(width, height, frameMarginTop) {
    this.frameMarginTop = frameMarginTop || 10;
    this.frameWidth     = width || 1050;
    this.frameHeight    = height || 720;
    this.margin         = { top:30, bottom:10, edge:20, ridge:30 };

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
    }
    { sessionStorage.setItem('lastPageId', pageId);
      console.log('saved pageId', pageId);
    }

    //var buf = new Buffer('<table border="0" cellspacing="10px"><tr><td><div class="dualpageframe"');
    var buf = new Buffer('<div class="dualpageframe"');
    if (pageId === 'backcover') buf.w(' style="background-color:black"');
    buf.w('>');
    switch (pageId) {
    case 'cover':
      this._renderBookCover(buf);
      this._renderUsageInstructions(buf);
      break;
    case 'backcover':
      this._renderBookBackCover(buf);
      this._renderPage(buf, this._getParinamanaPage());
      break;
    case 'toc':
      buf.w(this._getTOCPage());
      break;
    default: // regular
      pageId = this._findDualPages(pageId);
      this._renderPage(buf, pageId && pageId.left, true);
      this._renderPage(buf, pageId && pageId.right);
      break;
    }
    this.curDisp = pageId;
    this._addNavBtns(buf);
    buf.w('</div>');
/*
    buf.w('</div></td><td valign="top" style="padding-left:20px">&nbsp;<br>',
          '<button style="line-height:14px; margin-bottom:10px">封<br>面</button><br>',
          '<button style="line-height:14px; margin-bottom:10px">目<br>錄</button><br>',
          '<button style="line-height:14px; margin-bottom:10px">釋<br>經</button><br>',
          '<button style="line-height:14px; margin-bottom:10px">封<br>底</button>',
          '</td></tr></table>>');
*/

    document.getElementById(this.elemId).innerHTML = buf.text();
  }

  _findDualPages(pageId) {
    var dpdisp = {}; // keys: right, left
    if ((typeof pageId === 'string') && (pageId.startsWith('序') || pageId.startsWith('i'))) {
      switch(parseInt(pageId.substring(1))) {
      case 1: dpdisp.left = 序pages[0]; dpdisp.right = this._getMottoPage(); break;
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
    var pgInfo = this.curDisp && this.curDisp.right;
    if (!pgInfo) pgInfo = this.curDisp && this.curDisp.left;
    if (pgInfo) {
      if (pgInfo.isMotto) return 'toc';
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
    ln = ln.replace(念祖, '<NianZu></NianZu>');

    function procInLine(startTag, endTag, cls, lineTag) { // operates upon ln
      if (lineTag && ln.startsWith(lineTag))
        return '<span class="' + cls + '">' + ln.substring(lineTag.length) + '</span>';
      var sTagRetained = '', eTagRetained = '';
      if (startTag === '《') sTagRetained = TMP_START;
      if (endTag === '》')   eTagRetained = TMP_END;
      var sTagLen = startTag.length, eTagLen = endTag.length;
      for (idx=0; ; ) {
        idx = ln.indexOf(startTag, idx);
        if (idx < 0) {
          idx = ln.indexOf(endTag, idx);
          if (idx < 0) break;
          if (ln.startsWith('<!xg>'))
            ln = '<!xg><span class="' + cls + '">' + ln.substring(5, idx) + '</span>' + ln.substring(idx+eTagLen);
          else
            ln = '<span class="' + cls + '">' + ln.substring(0, idx) + '</span>' + eTagRetained + ln.substring(idx+eTagLen);
          idx++;
          continue;
        }
        var idx1 = ln.indexOf(endTag, idx+1);
        if (idx1 > 0) {
          ln = ln.substring(0, idx) + sTagRetained + '<span class="' + cls + '">' + ln.substring(idx+sTagLen, idx1) +
               '</span>' + eTagRetained + ln.substring(idx1+eTagLen);
          idx = idx1 + 1;
        } else {
          ln = ln.substring(0, idx) + sTagRetained + '<span class="' + cls + '">' + ln.substring(idx+sTagLen) + '</span>';
          idx = 0;
        }
      }
      if (sTagRetained) ln = ln.replaceAll(TMP_START, startTag);
      if (eTagRetained) ln = ln.replaceAll(TMP_END, endTag);
      return ln;
    }

    ln = procInLine(TIL_START, TIL_END, 'til');           // process Topic/Terminology InLine
    ln = procInLine(PIL_START, PIL_END, 'pil');           // process 品名 Pin InLine
    ln = procInLine(SIL_START, SIL_END, 'sil');           // process Source title
    ln = procInLine(XIL_START, XIL_END, 'xil', XIL_LINE); // process External Quote (XQuote) InLine
    ln = procInLine(QIL_START, QIL_END, 'qil', QIL_LINE); // process Quote InLine (THIS SHOULD BE THE LAST!)

    // process <!xg> dangling <xg> and </xg>. 'xg' is '信裹'.
    ln = this.__processSimpleTag(ln, 'xg');

    // process Vow InLine
    ln = ln.replaceAll(VIL_START, '「<span class="vil">').replaceAll(VIL_END, '</span>」');
    var idx = ln.lastIndexOf(VIL_START_NO_END);
    if (idx > 0) ln = ln.substring(0, idx) + '「<span class="vil">' + ln.substring(idx+1) + '</span>';
    idx = ln.indexOf(VIL_END_NO_START);
    if (idx > 0) ln = '<span class="vil">' + ln.substring(0, idx) + '</span>」' + ln.substring(idx+1);

    var buf1 = new Buffer('<div');
    cssCls && buf1.w(' class="', cssCls, '"');
    ln = ln.replaceAll('BJ', '<font class="sil">本經</font>')
           .replaceAll('Bj', '<font class="sil">本</font>')
           .replaceAll('bJ', '<font class="sil">經</font>');
    buf1.w(' style="left:', x, 'px; top:', y, 'px;', styles || '', '">');
    if (lnNum) buf1.w('<span style="', LINE_NUM_STYLE, '">', lnNum, '</span>');
    buf1.w(ln, '</div>');
    buf.w(buf1.render());
  }

  __processSimpleTag(ln, tag) {
    var startTag1 = '<' + tag + '>',
        startTag2 = '<' + tag + ' ',
        endTag   = '</' + tag + '>';
    if (ln.startsWith('<!' + tag + '>')) // tag the whole line
      return startTag1 + ln + endTag;

    // handle dangling start-tag
    var idx, idx1;
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
    return ln;
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
    pgInfo.addLine(MOTTO.trim().split('\n'));
    pgInfo.isMotto = true;
    return pgInfo;
  }

  _getParinamanaPage() {
    var pgInfo = new JiePage();
    pgInfo.preferredStyle = 'parinamanaText';
    pgInfo.addLine('', '');
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
    var idx, len = lines.length, lnNum = 1;
    for (var i=0; i<len; ++i) {
      var asis = false, ln = lines[i], showLnNum = true;
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
    if (pgInfo.preferredStyle) return; // a special page

    // page number, name
    var isEven = pgInfo.pageNum % 2 === 0;
    this._div(buf, 'pageName', null, dims.pageNumX, dims.origY, isEven ? BOOK_TITLE : pgInfo.name);
    this._div(buf, 'pageNum', null, dims.pageNumX, dims.origY, pgInfo.getNumDisp());
  }

  _handleWrappedText(ln, wrapFontSize) {
    while (true) {
      var idx = ln.indexOf('[');
      if (idx < 0) break;
      var idx1 = ln.indexOf(']', idx);
      if (idx1 < 0) break;
      var a = ln.substring(0, idx), b = ln.substring(idx+1, idx1), c = ln.substring(idx1+1);
      b = b.split('|');
      if (b.length === 1)
        ln = a + b[0] + c;
      else
        ln = '<table border="0" cellspacing="0" cellpadding="0"><tr><td nowrap>' + a +
             '</td><td nowrap style="font-size:' + wrapFontSize + '">' + b[0] + '<br>' + b[1] +
             '</td><td nowrap>' + c + '</td></tr></table>';
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
    _r(font1, w1, H - font1.paddingTop, W - dims.bodyW/2 - w1/2 - titleOffset, '佛說大乘無量壽莊嚴<br>清淨平等覺經解');
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

function showPage(pageId) { dims.renderDualPages(pageId || get('p')); }

function keypress(event) {
  var isShift = event.shiftKey;
//  var isAlt   = event.altKey;
//  var isCtrl  = event.ctrlKey;

  switch (event.keyCode) {
  case 37: /* left  */ showPage(isShift ? 'next5' : 'next'); break;
  case 39: /* right */ showPage(isShift ? 'prev5' : 'prev'); break;
  case 35: /* end   */ showPage('backcover'); break;
  case 36: /* home  */ showPage('cover');     break;
  case 33: /* up    */ showPage('prevQuote'); break;
  case 34: /* down  */ showPage('nextQuote'); break;
  case 13: /* enter */ var toPg = document.getElementById('toPage').value;
                       if (toPg !== '') showPage(toPg);
                       break;
  }
}

const ABOUT_THIS = `
<h4>【簡介】</h4>

<blockquote>
本專用閱讀器乃對佛陀教育基金會恭印的黃念祖居士著《佛說大乘無量壽莊嚴清淨平等覺經解》之重新排版。排文求與硬拷貝雷同，悉尊原文標點、行啟、字體。稍事調整，及予經文引用等<a href="javascript:showPage(236)" title="例頁">著色</a>，增益屏幕閱讀，不昧文字頁數索引。改進標點、糾錯字（如人/入）。<a href="javascript:showPage('toc')">目錄</a>特製，非書原有。
</blockquote>

<h4>【使用操作】</h4>

<blockquote>
推薦使用Firefox。諸主流瀏覽器應該可以。
</blockquote>

<blockquote>
用鍵盤：① 按左向鍵去後一頁。<br>
　　　　② 按右向鍵去前一頁。<br>
　　　　③ 按PgDn鍵去下個經文援引。<br>
　　　　④ 按PgUp鍵去上個經文援引。<br>
　　　　⑤ 按Home鍵去封面。<br>
　　　　⑥ 按End鍵去封底。<br>
</blockquote>

<blockquote>
用鼠標：① 點擊左頁下沿去下一頁。<br>
　　　　② 點擊右頁下沿去前一頁。<br>
　　　　③ 點擊左頁上沿去目錄。<br>
　　　　④ 點擊右頁上沿去封面。<br>
</blockquote>

<blockquote>
翻到第&nbsp;<input size="1" id="toPage">&nbsp;頁
</blockquote>

<h4>【鏈接引用】</h4>
<blockquote>
在URL上加&nbsp;<u>?p＝頁數</u>&nbsp;從那一頁開始。見<a href="?p=9">例</a>。
</blockquote>

<h4 style="opacity:0.6">【信裹居士恭製　1.0.0版　二〇二二年】</h4>
`;
