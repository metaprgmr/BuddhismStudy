var DEBUG = ''; // 'border:1px solid red;';
const HILITE_COLOR = '#ff8';
const KAI_TI = "'KaiTi', '楷体', STKaiti, '华文楷体'";
const READER_HELP =
  '為了用Reader，將每一行都限定在一定字數，然後設置 book.setReaderReady(true)。\n' +
  '字數與readerHeight相關，以字高約27點估算。';

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

function get(name) {
 if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
   return decodeURIComponent(name[1]);
}

function addjs(uri) { document.write('<s' + 'cript src="' + uri + '"></s' + 'cript>') }
function e(id) { return document.getElementById(id) }

function digit2(i, increment) {
  if (!i) i = 0;
  if (typeof i === 'string') i = parseInt(i);
  if (increment) ++i;
  return (i<10) ? ('0' + i) : i;
}

function digit3(i, increment) {
  if (!i) i = 0;
  if (typeof i === 'string') i = parseInt(i);
  if (increment) ++i;
  return (i<10) ? ('00' + i) : (i<100 ? ('0' + i) : i);
}

function startsWith() {
  var len = arguments.length;
  if (len > 0) {
    var host = arguments[0];
    for (var i=1; i<len; ++i)
      if (host.startsWith(arguments[i])) return true;
  }
  return false;
}

function findFirst() {
  var foundIdx = -1, len = arguments.length;
  if (len > 0) {
    var host = arguments[0];
    foundIdx = host.length + 1;
    for (var i=1; i<len; ++i) {
      var idx = host.indexOf(arguments[i]);
      if (idx >= 0 && idx < foundIdx) foundIdx = idx;
    }
  }
  return (foundIdx > host.length) ? -1 : foundIdx;
}

class Buffer {
  constructor() {
    this.buf = '';
    for (var i in arguments) { var x = arguments[i]; this.buf += x }
  }

  w() { for (var i in arguments) { var x = arguments[i]; this.buf += x } }

  prepend() {
    var pre = '';
    for (var i in arguments) { var x = arguments[i]; pre += x }
    this.buf = pre + this.buf;
  }

  // renders to an element, or render() to get the text.
  // clears the content afterwards.
  render(elid) {
    var ret = this.buf;
    if (elid) { var el = e(elid); el && (el.innerHTML = ret); }
    this.buf = '';
    return ret;
  }

  text() { return this.buf }

} // end of Buffer.

const zpuncs = '，、；：。？！';
const zpuncs1 = '「」『』《》（）—─…　';
const zpuncsAll = zpuncs + zpuncs1;
const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u20000-\u2a6df]|[\u2a700-\u2b73f]|[\u2b740-\u2b81f]|[\u2b820-\u2ceaf]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u2f800-\u2fa1f]/;
function isPunc(z) { return zpuncs.indexOf(z) >= 0; }
function isPunc1(z) { return zpuncs1.indexOf(z) >= 0; }
function isHanZi(x) { return !isASCII(x) && REGEX_CHINESE.test(x) && (zpuncsAll.indexOf(x) < 0); }
function isASCII(str) { return /^[\x00-\xFF]*$/.test(str) }

function countHanZi(txt) {
  var cnt = 0;
  const len = txt ? txt.length : 0;
  for (var i=0; i<len; ++i) {
    var c = txt[i];
    switch(c) {
    case '<': // tag
      for(++i; txt[i] != '>'; ++i);
      break;
    case '[': // annotation
      var doCnt = true;
      for(++i; (c = txt[i]) != ']'; ++i) {
        if (isASCII(c)) doCnt = false; // divider
        if (doCnt && isHanZi(c)) ++cnt;
      }
      break;
    default:
      if (isHanZi(c)) ++cnt;
      break;
    }
  }
  return cnt;
}

const PINYIN = {};
(function() {
  var c = 'āōēīūǖñáóéíúǘńǎǒěǐǔǚňàòèìùǜǹ', v = 'aoeiuvn', ptr = 0;
  for (var i=1; i<=4; ++i) for (var j=0; j<v.length; ++j) PINYIN[v[j]+i] = c[ptr++];
})();

function toPinyin(py) {
  var i, ret = '';
  for (i=0; i<py.length-1; ++i) {
    var c = py[i];
    var pyc = PINYIN[c + py[i+1]];
    if (pyc) { ret += pyc; i++ } else { ret += c }
  }
  if (i < py.length) return ret + py[i];
  return ret;
}

const INDENT = '　';
function ruby(zi, punc, cssCls) {
   // punc is added to the last zi
   var before = '', after = '';
   var idx1 = zi.indexOf('>');
   if (idx1 > 0) {
     var idx2 = zi.lastIndexOf('<');
     if (idx2 > idx1) {
       var before = zi.substring(0, idx1+1);
       var after = zi.substring(idx2);
       var txt = zi.substring(idx1+1, idx2);
       if (txt.length <= 1) { before = after = '' }
       else {
         zi = txt[txt.length-1];
         before += txt.substring(0, txt.length-1);
       }
     }
   }
   var rt = cssCls ? ('<rt class="' + cssCls + '">') : '<rt>';
   return before + '<ruby>' + zi + rt + punc + '</rt></ruby>' + after;
}

function processBookContent(id, bookInfo, chapterNum, chBaseUrl, forView) {
  var result = [], title = bookInfo.title;
  var desc  = bookInfo.desc;
  var lines = bookInfo.content;
  const noChapterTitles = chapterNum === 'none';
  if (noChapterTitles) chapterNum = null;

  var chNumS, chNumE;
  if (chapterNum) {
    var idx = chapterNum.indexOf('-');
    if (idx <= 0) {
      chNumS = chNumE = parseInt(chapterNum);
    } else {
      chNumS = parseInt(chapterNum.substring(0, idx));
      chNumE = parseInt(chapterNum.substring(idx+1));
    }
  }
  if (!Array.isArray(lines)) {
    title = lines.title;
    desc  = lines.desc;
    lines = lines.content;
  }

  document.title = title;
  var lasteol = true, verseNum = 1;

  if (forView) { // book title matter; only for view
    if (desc) result.push('<titledesc>' + desc + '</titledesc><br>');
    result.push('<h2>' + title + '</h2>');
  }

  var inSession = (chapterNum == null);
  var lastName = '_end';
  for (var i in lines) {
    var ln = lines[i];
    if ((typeof ln === 'object') && !Array.isArray(ln)) {
      if (chNumS != null) inSession = ln.chapterNum >= chNumS && ln.chapterNum <= chNumE;
//    if (ln.id != null) { txt += '<a name="' + ln.id + '"></a>'; lastName = parseInt(ln.id) + 1; }
      if (ln.tag) {
        var tag = ln.tag;
        if (noChapterTitles && tag.startsWith('chaptertitle'))
          continue;
        if (tag === 'chaptertitle')
          if (forView) tag = 'h3'; // use h3 for viewing
        else
          result.push('<p>'); // insert some space in front
        var txt = '<' + tag;
        var tooltip = '';
        if (ln.annotations) tooltip = ln.annotations.join('\n');
        if (ln.ziCount) tooltip += (tooltip === '' ? '' : '\n') + ln.ziCount + '字';
        if (tooltip != '') txt += ' title="' + tooltip + '"';
        txt += (inSession ? '>' : ' class="inlineChapter">') + processText(ln.display);
        if (!inSession) {
          if (!forView) continue;
          txt += '　<a href="' + chBaseUrl + '&c=' + ln.chapterNum + '" class="inlineChapter">……</a>';
        }
        txt += '</' + tag + '>';
        result.push(txt);
      }
    }
    else if (inSession) {
      var anno = null;
      if (Array.isArray(ln)) {
        anno = ln[1];
        ln = ln[0];
      }
      var nexteol = ln.endsWith('/');
      if (nexteol) ln = ln.substring(0, ln.length-1);
      var isGatha = ln.startsWith('#');
      if (isGatha)
        ln = ln.substring(1);
      else {
        isGatha = ln.startsWith('gatha#');
        if (isGatha) ln = ln.substring(6);
      }
      if (anno) ln = [ ln, anno ];
      processPara(result, !lasteol ? null : (verseNum++), ln, isGatha, lasteol, !nexteol, forView);
      lasteol = !nexteol;
    }
  }

//  var len = Math.min(100, result.length); for (var i=0; i<len; ++i) console.log(i+1, '---', result[i]);
  if (!forView) bookInfo.displayLines = result;
  return result;
}

function processPara(result, verseNum, ln, isGatha, lasteol, cureol, forView) {
  var anno, annoAll;
  if (Array.isArray(ln)) { anno = ln[1]; ln = ln[0] }
  var segs = ln.split('|'), start = '', startLast = '', end = '';
  if (isGatha)  start += INDENT;
  if (anno) { start += '<anno>'; startLast = '<anno title="' + anno + '">'; }
  else startLast = start;
  if (anno) end   += '</anno>';

  if (lasteol) result.push('<p>');
  for (var s=0; s<segs.length; ++s) {
    if (s === segs.length-1) {
      ln = startLast + processText(segs[s], s, verseNum) + end;
    } else {
      ln = start + processText(segs[s], s, verseNum) + end;
    }
    if (forView && s < segs.length-1) ln += '<br>';
    result.push(ln);
  }
  if (cureol) result.push('</p>');
  else if (forView) result.push('<br>');
}

function processText(seg, segNum, verseNum) {
  verseNum = null; // TODO: re-enable?
  var ret = '';

    var len = seg.length, len1 = len-1;
    for (i=0; i<len1; ++i) {
      var idelta = -1, cur = seg[i], nxt = seg[i+1];

      if (cur === '[') { // annotation for term, e.g. [普賢]               (look up)
                         //                           [普賢=samantabhadra] (verbatim)
                         //           or pinyin, e.g. [妷@zhi3]            (verbatim)
                         //                           [妷@] [妷@-]         (look up)
        var term = nxt;
        for (var p1=i+2; p1<len; ++p1) {
          nxt = seg[p1];
          if (nxt === ']') { idelta = p1 - i; nxt = seg[p1+1]; break }
          else term += nxt;
        }

        var idx1 = term.indexOf('@');
        if (idx1 > 0) { // pinyin
          var py1 = term.substring(idx1+1);
          term = term.substring(0, idx1);
          if (py1 === '' || py1 === '-')
            py1 = lookupSound(term) || ('(pronunciation not available)' + term + ')');
          else
            py1 = toPinyin(py1);
          cur = '<pinyin title="' + py1 + '">' + term + '</pinyin>';
        } else {
          var anno = null;
          idx1 = term.indexOf('=');
          if (idx1 > 0) { // annotation
            anno = term.substring(idx1+1);
            term = term.substring(0, idx1);
          } else {
            anno = lookupTerm(term) || ('(annotation not available for ' + term + ')');
          }
          cur = '<anno title="' + anno + '">' + term + '</anno>';
        }
      }

      if (i === 0 && segNum === 0 && verseNum) {
        if (isPunc(nxt)) {
          ret += ruby('　', verseNum, 'verseNum') + ruby(cur, nxt);
          ++i;
        } else {
          if (cur === '<') {
            for (; i<len1 && seg[i] !== '>'; ++i) ret += seg[i];
            ret += '>';
            cur = seg[++i];
          }
          ret += ruby(cur, verseNum, 'verseNum');
        }
      }
      else if (isPunc(nxt)) {
        ret += ruby(cur, nxt);
        ++i;
      }
      else if (isPunc1(cur))
        ret += '<punc1>' + cur + '</punc1>';
      else
        ret += cur;
/*
      if (isPunc(nxt)) {
        if (i === 0 && s === 0 && verseNum) ret += ruby('　', verseNum, 'verseNum');
        ret += ruby(cur, nxt);
        ++i;
      }
      else if (i === 0 && s === 0 && verseNum) ret += ruby(cur, verseNum, 'verseNum');
      else ret += cur;
*/
      if (idelta > 0) i += idelta;
    } // for(;;)
    if (i < len) {
      cur = seg[len1];
      if (isPunc1(cur)) cur = '<punc1>' + cur + '</punc1>';
      ret += cur;
    }
    return ret;
}

function render(id, bookInfo, chapterNum, chBaseUrl) {
  const el = e(id);
  el.innerHTML = processBookContent(id, bookInfo, chapterNum, chBaseUrl, true).join('');
  if (bookInfo.ziCount)
    el.title = '《' + bookInfo.title + '》（' + bookInfo.ziCount + '字）';
}

function renderReading(id, bookInfo, chapterNum, chBaseUrl) {
  processBookContent(id, bookInfo, chapterNum, chBaseUrl);
  bookInfo.elemId = id;
  bookInfo.renderReader();
}

//
// MyBookInfo
//

var curBook;

const KNOWN_PREFICES = {
  'gatha':      true, // shorthanded as ''
  'chapter':    true,
  'versequote': true, // TODO
  'note':       true, // TODO
};

class MyBookInfo {
  constructor(title, desc) {
    this._className = 'MyBookInfo';
    this.title = title;
    this.desc = desc;
    this.ziCount = 0;
    this.content = [];
    this.chapterNum = 0;
    this.paraPrefix = '　　';
    this.isReaderReady = false;

    // for reader rendition
    this.readerHeight = 700;  // settable by individual books
    this.chapterTitleStyle = 'chaptertitle';
    this.margin = 20;
    this.titleGap = 45;
    this.textW = 40;
    this.pW = 20;
    this.widths = {
      h1: 85,
      h2: 65,
      h3: 65,
      h4: 40,
      h5: this.textW,
      chaptertitle: 80,
      chaptertitlesmall: 50,
      booktitle: 42,
      titledesc: 28
    };
    this.chapters = [];
  }

  setReaderReady(yes) { this.isReaderReady = yes; return this }

  setTOC(attrs) {
    // TODO
    return this;
  }

  set(k,v) { this[k] = v; return this }

  addContent() {
    var lines = arguments, curChpt;

    if (arguments.length == 1) {
      const arg = arguments[0];
      if (Array.isArray(arg))
        lines = arg;
      else if (typeof arg === 'string')
        lines = this.parseContent(arg);
    }

    for (var i in lines) {
      var ln = lines[i];
      if ((typeof ln === 'string') && ln.startsWith('chapter#')) {
        curChpt = this.addedChapter(ln.substring(8).trim());
        this.content.push(curChpt);
      } else {
        var cnt;
        if (Array.isArray(ln)) {
          cnt = countHanZi(ln[0]);
          ln[0] = this.fixPrefix(ln[0]);
        } else {
          cnt = countHanZi(ln);
          ln = this.fixPrefix(ln);
        }
        this.ziCount += cnt;
        if (curChpt) curChpt.ziCount += cnt;
        this.content.push(ln);
      }
    }

    return this;
  }

  fixPrefix(ln) {
    var idx = ln.indexOf('#');
    if (idx < 0) return this.paraPrefix + ln;
    return ln;
  }

  parseContent(raw_content) {
    const lines = raw_content.split('\n');
    const ret = [];
    for (var i=0; i<lines.length; ++i) {
      const ln = lines[i].trim();
      if (ln.length > 0) ret.push(ln);
    }
    return ret;
  }

  addedChapter(txt) {
    // to display the chapter title decoratedly
    var idx = txt.indexOf('第');
    var arr = txt.split('|');
    var caption = txt = arr.shift();
    if (idx > 0)
      txt = txt.substring(0, idx) + ' <span style="color:gray">' + txt.substring(idx) + '</span> ';
    var chNum = ++this.chapterNum;
    var c = { caption, display:txt, id:chNum, chapterNum:chNum, tag:this.chapterTitleStyle, ziCount:0 };
    if (arr.length > 0) c.annotations = arr;
    this.chapters.push(c);
    return c;
  }

  printStats() {
    for (var i in this.content) {
      var c = this.content[i];
      if (c.ziCount)
        console.log(c.chapterNum, c.caption, c.ziCount);
    }
    return this;
  }

  // if buf is null, just measures the width
  _renderReadLine(buf, ln, lastTitle, lastX, H, isHilite) {
    const h = H - this.margin * 2;

    var tag = '', annoTxt = null;
    if (ln.startsWith('<')) {
      if (startsWith(ln, '</p>')) return 0;
      var idx = findFirst(ln, '>', ' ');
      if (idx > 0) tag = ln.substring(1, idx);
      else tag = ln.substring(1);
      if (tag === 'anno') {
        var idx1 = ln.indexOf('>');
        if (idx < idx1) {
          var tmp = ln.substring(tag.length+1, idx1).trim();
          if (tmp.startsWith('title="') && tmp.endsWith('"'))
            annoTxt = tmp.substring(7, tmp.length-1);
        }
      }
    }
    var w = (tag === 'p') ? this.pW : (this.widths[tag] || this.textW);

    if (buf) {
      if (tag === 'p') ln = '';
      w -= 3;
      var x = lastX - w;
      buf.w('<div style="', DEBUG, 'position:absolute; height:', h, 'px; width:', w,
            'px; left:', x, 'px; top:', this.margin, 'px; ');
      if (isHilite) buf.w('background-color:', HILITE_COLOR, ';');
      else if (startsWith(tag, 'booktitle', 'titledesc')) {
        buf.w('background-color:#ddd;');
        ln = '&nbsp;' + ln;
      }
      if (tag === 'booktitle') buf.w('border-left:1px solid lightgray');
      else if (ln !== '') buf.w('line-height:', w, 'px;');
      buf.w('">', ln, '</div>\n');
      if (annoTxt) {
        var pageW = this.bookTitleW;
        buf.w('<div style="position:absolute; text-align:right; font-size:16px; font-family:' +
                KAI_TI + '; height:' + h + 'px; top: ' + this.margin + 'px; width:' + (pageW/2) +
                'px; line-height:' + (pageW/2) + 'px; left:', x, 'px">', annoTxt, '　</div>');
      }
    }
    return w;
  }

  _computePages() {
    var el = e(this.elemId),
        W = el.clientWidth,
        len = this.displayLines.length,
        readWidth = W - this.margin * 2 - this.titleGap,
        lastTitle = true,
        desc = this.desc;

    if (desc)
      readWidth -= this._renderReadLine(null, '<titledesc> </titledesc>', false, 0, 0);
    readWidth -= this._renderReadLine(null, '<booktitle> </booktitle>', false, 0, 0);

    this.pages = [];
    var lastTitle = true;
    var curPg = { start:0, end:len-1, lastW: 0, chapter:0, isChapterStart:false }, curW = 0;
    this.pages.push(curPg);
    var curChapterIdx = -1;
    for (var i=0; i<len; ++i) {
      var ln = this.displayLines[i];
      if (startsWith(ln, '</p>')) continue; // flat ignored
      if (startsWith(ln, '<p>') && lastTitle) continue; // ignored in front of a chapter (or any?) title
      lastTitle = ln.startsWith('<chaptertitle');
      if (lastTitle) // set up chapter stuff
        this.chapters[++curChapterIdx].startPage = this.pages.length-1;

      var lastW = curW;
      curW += this._renderReadLine(null, ln, lastTitle, 0, 0, false);
      if (curW > readWidth) {
        curPg.end = i-1;
        curPg.lastW = lastW;
        curPg = { start:i, end:len-1, chapter:curChapterIdx };
        if (this.chapters.length > 0 && !lastTitle)
          curPg.chapterTitle = this.chapters[curPg.chapter].caption;
        this.pages.push(curPg);
        curW = 0;
      }
      if (lastTitle) {
        var t = this.chapters[curChapterIdx].caption;
        if (!curPg.chapterTitle) {
          curPg.chapterTitle = t;
        } else {
          var a = curPg.chapterTitle.split('　　');
          if (a.length <= 2)
            curPg.chapterTitle += '　　' + t;
          else // limit to 3 chapter titles on the side
            curPg.chapterTitle = a[a.length-2] + '　　' + a[a.length-1] + '　　' + t;
        }
        curPg.isChapterStart = lastTitle;
      }
    }
  }

  renderReader(dir) {
    if (!this.isReaderReady) {
      alert('本書不能用Reader閱讀。\n' + READER_HELP);
      return;
    }
    if (!this.readingStarted) {
      curBook = this;
      document.addEventListener("keydown", (e) => curBook.nav(e), false);
      window.addEventListener("resize", () => { curBook._computePages(); curBook.renderReader() }, false);
      this.readingStarted = true;

      this._computePages();
      this.curPage   = 0;  // 0-based
      this.curHilite = -1; // 0-based
    }

    const numPgs = this.pages.length
    if (typeof dir === 'number') {
      if (dir < 0 || dir >= numPgs) return;
      this.curPage = dir;
    } else {
      switch (dir) {
      case 'nextHilite': this._toNextHilite(true); break;
      case 'prevHilite': this._toNextHilite(false); break;
      case 'next5Pages': this._nextPage(5); break;
      case 'prev5Pages': this._prevPage(5); break;
      case   'nextPage': this._nextPage(); break;
      case   'prevPage': this._prevPage(); break;
      case      'start': this.curPage = 0; this.curHilite = null; break;
      case        'end': this.curPage = numPgs-1; this.curHilite = null; break;
      }
    }

    var el = e(this.elemId);
    if (!el) { alert('Element [id=' + this.elemId + '] is not found.'); return; }
    const W = el.clientWidth,
          H = this.readerHeight,
          origR = W - this.margin;
    el.style.height = H + 'px';

    var buf = new Buffer(),
        lastX = origR;

    var desc  = this.desc, pageOffset = 0;
    if (desc) {
      pageOffset = this._renderReadLine(buf, '<titledesc>' + desc + '</titledesc>', false, lastX, H);
      lastX -= pageOffset;
    }
    var pageW = this._renderReadLine(buf, '<booktitle>' + this.title + '</booktitle>', false, lastX, H);
    this.bookTitleW = pageW;
    lastX -= pageW + this.titleGap;

    var lastTitle = true;
    var len = this.displayLines.length, curPg = this.pages[this.curPage];
    for (var i=curPg.start; i<=curPg.end; ++i) {
      var ln = this.displayLines[i];
      if (startsWith(ln, '</p>')) continue; // flat ignored
      if (startsWith(ln, '<p>') && lastTitle) continue; // ignored in front of a chapter (or any?) title
      lastTitle = ln.startsWith('<chaptertitle');

      lastX -= this._renderReadLine(buf, ln, lastTitle, lastX, H, this.curHilite === i);
    }

    const h = H - this.margin * 2;
    var div_= '<div style="position:absolute; text-align:right; font-size:16px; font-family:' +
              KAI_TI + '; height:' + h + 'px; top: ' + this.margin + 'px; width:' + (pageW/2) +
              'px; line-height:' + (pageW/2) + 'px; left:';
    if (numPgs > 1) {
      buf.w(div_, origR - pageW/2 - pageOffset/2, 'px">共', zNumber(numPgs), '頁　</div>',
            div_, origR - pageW   - pageOffset/2, 'px">第', zNumber(this.curPage+1), '頁　</div>');
      if (curPg.chapterTitle)
        buf.w(div_, origR - pageW*3/2 - pageOffset, 'px">', curPg.chapterTitle, '　</div>');
    }
    buf.render(this.elemId);
  }

  _nextPage(pgs) {
    pgs || (pgs = 1);
    if (this.curPage < this.pages.length-pgs) this.curPage += pgs
  }
  _prevPage(pgs) {
    pgs || (pgs = 1);
    if (this.curPage > pgs-1) this.curPage -= pgs
  }

  _toNextHilite(forward) {
    if (this.curHilite < 0 && !forward) return;
    var len      = this.displayLines.length,
        startIdx = this.pages[this.curPage].start,
        endIdx   = this.pages[this.curPage].end;
    if (forward) {
      if (this.curHilite < 0) this.curHilite = 0;
      while (this.curHilite < len-1) {
        if (++this.curHilite < startIdx) this.curHilite = startIdx;
        if (!startsWith(this.displayLines[this.curHilite], '<p>', '</p>')) {
          if (this.curHilite > endIdx) this._nextPage();
          return;
        }
      }
    } else {
      while (this.curHilite > 0) {
        if (--this.curHilite > endIdx) this.curHilite = endIdx;
        if (!startsWith(this.displayLines[this.curHilite], '<p>', '</p>')) {
          if (this.curHilite < startIdx) this._prevPage();
          return;
        }
      }
    }
    this.curHilite = -1;
  }

  nav(event) {
    var isShift = event.shiftKey; // altKey, ctrlKey
    switch (event.keyCode) {
    case 40: /* down  */
    case 37: /* left  */ this.renderReader('nextHilite'); break;
    case 38: /* up    */
    case 39: /* right */ this.renderReader('prevHilite'); break;
    case 32: /* space */
    case 34: /* pgdn  */ this.renderReader(isShift ? 'next5Pages' : 'nextPage'); break;
    case 33: /* pgup  */ this.renderReader(isShift ? 'prev5Pages' : 'prevPage'); break;
    case 36: /* home  */ this.renderReader('start');      break;
    case 35: /* end   */ this.renderReader('end');        break;
    }
  }

} // end of BookInfo.

//
// runtime
//
var s = get('s'),          // subject
    b = get('b') || '01',  // book (number, with a volume)
    chapterNum = get('c'), // chapter (number, with a book)
    t = get('t'), // single text
    chBaseUrl;
if (t) {
  addjs(t);
} else {
  if (b.length < 2) b = '0' + b;
  addjs(s + '/' + b + '.js');
  chBaseUrl = '?s=' + s + '&b=' + b;
}
