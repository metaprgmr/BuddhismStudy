var DEBUG = ''; // 'border:1px solid red;';
const HILITE_COLOR = '#ff8';
const KAI_TI = 'KaiTi, Kaiti TC, 楷体, STKaiti, 华文楷体';
// 特殊符号大全 https://www.jiuwa.net/fuhao/agg/

const zdigits = '〇一二三四五六七八九';
function zNumber(n) { // 0 to 999
  if (typeof n === 'string') n = parseInt(n);
  if (n == 0) return zdigits[0];
  if (n == 10) return '十';
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
function w() { for(var i in arguments)document.write(arguments[i]) }

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

function digit3RightAligned(i) {
  if (!i) i = 0;
  if (typeof i === 'string') i = parseInt(i);
  return (i<10) ? ('<font style="opacity:0">00</font>' + i) : (i<100 ? ('<font style="opacity:0">0</font>' + i) : i);
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

// Aligned lists
/*
  // ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊝ ⊞ ⊟ ⊠ ⊡ ⋄ ⋅ ⋆ ⋇ □ ▪ ▫ ▭ ▮ ▱ △ ▴ ▵ ▸ ▹ ◻ ◼ ★ ☆ ♠ ♣ ♥ ♦ ♪ ♭ ♮ ♯ ✓ ✗ ✠ ✶
  // A a
  // 𝒜 = &Ascr;  𝒶 = &ascr;
  // 𝔄 = &Afr;   𝔞 = &afr;
  // 𝔸 = &Aopf;  𝕒 = &aopf;
var AlignedListBulletType = ALBulletNumber;
var AlignedListItemNumber = 1;
var AlignedListItemBullet = 1;
function bulletAlignedListStart(, bullet) {
  AlignedListBulletType = bulletType;
}
function numnberAlignedListStart(start) { AlignedListBulletType = bulletType; }
  AlignedListBulletType = ALBulletNumber;
  AlignedListItemNumber = (arguments.length > 0) ? arguments[0] : 1;
}
function alignedList(subject, content, bullet) {
}
*/

// Buffer
class Buffer {
  constructor() {
    this.buf = '';
    for (var i in arguments) { var x = arguments[i]; this.buf += x }
  }

  w() { for (var i in arguments) { var x = arguments[i]; x && (this.buf += x) } }

  prepend() {
    var pre = '';
    for (var i in arguments) { var x = arguments[i]; pre += x }
    this.buf = pre + this.buf;
  }

  // renders to one or more elements.
  // returns the text, and clears the internal content.
  render() {
    var ret = this.buf;
    for (var i in arguments) {
      var el = e(arguments[i]);
      el && (el.innerHTML = ret);
    }
    this.buf = '';
    return ret;
  }

  text() { return this.buf }

} // end of Buffer.

const zpuncs = '，、；：。？！';
const zpuncs1L = '「『《（';
const zpuncs1R = '」』》）—─…　';
const zpuncs1 = zpuncs1L + zpuncs1R;
const zpuncsAll = zpuncs + zpuncs1;
const REGEX_CHINESE = /[\u3300-\u4dbf]|[\u4e00-\u9fff]|[\uf900-\ufaff]|[\ufe30-\ufe4f]|[\u20000-\u2a6df]|[\u2a700-\u2ceaf]|[\u2f800-\u2fa1f]/;
function isPunc(z)  { return zpuncs.indexOf(z) >= 0; }
function isPunc1L(z) { return zpuncs1L.indexOf(z) >= 0; }
function isPunc1R(z) { return zpuncs1R.indexOf(z) >= 0; }
function isPunc1(z) { return zpuncs1.indexOf(z) >= 0; }
function isHanZi(x)       { return !isASCII(x) && REGEX_CHINESE.test(x) && (zpuncsAll.indexOf(x) < 0); }
function isHanZiOrQuot(x) { return !isASCII(x) && REGEX_CHINESE.test(x) && (zpuncs.indexOf(x) < 0); }
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
   if (isPunc1R(zi)) zi = '<punc1>' + zi + '</punc1>';
   return before + '<ruby>' + zi + rt + punc + '</rt></ruby>' + after;
}

function processBookContent(id, bookInfo, chapterNum, chBaseUrl, forView) {
  var result = [], title = bookInfo.title;
  var lines = bookInfo.content;
  if (chapterNum) bookInfo.noChapterTitles = chapterNum === 'none';
  if (bookInfo.noChapterTitles) chapterNum = null;
  var desc = bookInfo.noChapterTitles ? bookInfo.descNoChapterTitles : bookInfo.desc;

  var chNumS, chNumE;
  if (chapterNum) {
    var idx = chapterNum.indexOf('-');
    if (idx <= 0) {
      chNumS = chNumE = parseInt(chapterNum);  if (isNaN(chNumS)) chNumS = chNumE = null;
    } else {
      chNumS = parseInt(chapterNum.substring(0, idx)); if (isNaN(chNumS)) chNumS = null;
      chNumE = parseInt(chapterNum.substring(idx+1));  if (isNaN(chNumE)) chNumE = null;
    }
    if (!chNumS) { // check if it is a chapter name
      for (var k=0; k<bookInfo.getChapters().length; ++k)
        if (chapterNum === bookInfo.getChapters()[k].caption) { chNumS = chNumE = k+1; break; }
      if (!chNumS) chapterNum = null;
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
        if (bookInfo.noChapterTitles && tag.startsWith('chaptertitle'))
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

function lastTag(tag) { return { tag, tagLast:false }; }

function processPara(result, verseNum, ln, isGatha, lasteol, cureol, forView) {
  var anno, annoAll;
  if (Array.isArray(ln)) { anno = ln[1]; ln = ln[0] }
  var segs = ln.split('|'), start = '', startLast = '', end = '';
  if (isGatha)  start += INDENT;
  if (anno) { start += '<anno>'; startLast = '<anno title="' + anno + '">'; }
  else startLast = start;
  if (anno) end += '</anno>';
  if (lasteol) result.push('<p>');
  var lastHtmlTag = null;
  var lastTags = [
    lastTag('em'), lastTag('u'),
    lastTag('xg'), lastTag('xg1'), lastTag('xg2'), lastTag('xg3')
  ];
  for (var s=0; s<segs.length; ++s) {
    ln = segs[s];
    for (var lg in lastTags) ln = processLineHtmlTags(ln, lastTags[lg]);
    ln = ((s === segs.length-1) ? startLast : start) + processText(ln, s, verseNum) + end;
    if (forView && s < segs.length-1) ln += '<br>';
    result.push(ln);
  }
  if (cureol) result.push('</p>');
  else if (forView) result.push('<br>');
}

function processLineHtmlTags(ln, tagLast) {
  var _tag = tagLast.tag + '>';
  var _endtag = '/' + _tag;
  var a = ln.split('<');

  var x, i, hasLeadEndTag = false, hasLastTag = false;
  for (i=0; i<a.length; ++i) {
    x = a[i];
    if (x.startsWith(_tag)) break;
    if (x.startsWith(_endtag)) { hasLeadEndTag = true; break; }
  }
  for (i=a.length-1; i>=0; --i) {
    x = a[i];
    if (x.startsWith(_endtag)) break;
    if (x.startsWith(_tag)) { hasLastTag = true; break; }
  }

  if (!hasLastTag && !hasLeadEndTag) {
    if (tagLast.tagLast) {
      if (ln.endsWith('\n'))
        ln = '<' + _tag + ln.substring(0, ln.length-1) + '<' + _endtag + '\n';
      else
        ln = '<' + _tag + ln + '<' + _endtag;
    }
  } else {
    if (hasLeadEndTag) {
      if (tagLast.tagLast) {
        ln = '<' + _tag + ln;
        tagLast.tagLast = false;
      }
    }
    if (hasLastTag) {
      tagLast.tagLast = true;
      if (ln.endsWith('\n'))
        ln = ln.substring(0, ln.length-1) + '<' + _endtag + '\n';
      else
        ln = ln + '<' + _endtag;
    }
  }
  return ln;
}

function processText(seg, segNum, verseNum) {
  verseNum = null; // TODO: re-enable?
  var ret = '';

    var len = seg.length, len1 = len-1;
    for (i=0; i<len1; ++i) {
      var idelta = -1, cur = seg[i], nxt = seg[i+1], p1;

      if (cur === '[') { // annotation for term, e.g. [普賢]               (look up)
                         //                           [普賢=samantabhadra] (verbatim)
                         //           or pinyin, e.g. [妷@zhi3]            (verbatim)
                         //                           [妷@] [妷@-]         (look up)
                         //
        var term = nxt;
        for (p1=i+2; p1<len; ++p1) {
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
            anno = lookupTerm(anno) || anno;
          } else {
            anno = lookupTerm(term) || ('（“' + term + '”的註解未找到）');
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
  console.log('《' + bookInfo.title + '》共' + bookInfo.ziCount + '字。');
  const el = e(id);
  el.innerHTML = processBookContent(id, bookInfo, chapterNum, chBaseUrl, true).join('');
  if (bookInfo.ziCount)
    el.title = '《' + bookInfo.title + '》（' + bookInfo.ziCount + '字）';
}

function renderReading(id, bookInfo, chapterNum, chBaseUrl) {
  console.log('《' + bookInfo.title + '》共' + bookInfo.ziCount + '字。');
  processBookContent(id, bookInfo, chapterNum, chBaseUrl);
  bookInfo.elemId = id;
  bookInfo.renderReader();
}

//
// MyBookInfo
//

var LIVRE;

const KNOWN_PREFICES = {
  'gatha':      true, // shorthanded as ''
  'chapter':    true,
  'versequote': true, // TODO
  'note':       true, // TODO
};

class MyBookInfo {
  constructor(title, desc, descNoChapterTitles) {
    this.noimg = noimg; // global
    this._className = 'MyBookInfo';
    this.title = title;
    this.desc = desc;
    this.descNoChapterTitles = descNoChapterTitles || desc;
    this.ziCount = 0;
    this.content = [];
    this.chapterNum = 0;
    this.paraPrefix = '　　';
    this.breakLen = 25;

    // for reader rendition
    this.readerHeight = 700;  // settable by individual books
    this.chapterTitleStyle = 'chaptertitle';
    this.margin = 20;
    this.titleGap = 35;
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
    this.chaptersOrig = [];
  }

//  setSelectedChapters(chNums) {
//    this.readingStarted = false;
//    this._selectedChapters = !chNums || chNums.sort();
//  }

  getChapters() {
    if (!this._curChapters) {
      if (!this._selectedChapters) {
        this._curChapters = this.chaptersOrig;
      } else { // cherry-pick chapters
        this._curChapters = [];
        for (var i in this._selectedChapters)
          this._curChapters.push(this.chaptersOrig[this._selectedChapters[i]-1]);
      }
    }
    return this._curChapters;
  }

  setImage(uri, width, height, closeDisabled) {
    if (!this.noimg && uri) {
      if (typeof uri === 'object') {
        this.imageUri      = uri.uri;
        this.imageWidth    = uri.width;
        this.imageHeight   = uri.height;
        this.closeDisabled = uri.closeDisabled;
      } else {
        this.imageUri      = uri;
        this.imageWidth    = width;
        this.imageHeight   = height;
        this.closeDisabled = closeDisabled;
      }
    }
    return this;
  }

  setTOC(attrs) {
    // TODO
    return this;
  }

  set(k,v) { this[k] = v; return this }

  // addContent(array) or addContent(``), or first parameter is the number of Zis to break the line.
  addContent() {
    var lines = arguments, curChpt;

    if (arguments.length <= 2) {
      var arg = arguments[0];
      if (Array.isArray(arg))
        lines = arg;
      else if (typeof arg === 'string')
        lines = this.parseContent(arg, this.breakLen);
    }

    for (var i in lines) {
      var ln = this.processMarks( this.preprocessAnnos(lines[i]) );
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
        this.content.push(this.breakLine(ln));
      }
    }

    return this;
  }

  fixPrefix(ln) {
    var idx = ln.indexOf('#');
    if (idx < 0) {
      if (isPunc1(ln[0]) && (this.paraPrefix.length > 0))
        return this.paraPrefix.substring(0, this.paraPrefix.length-1) + ln;
      return this.paraPrefix + ln;
    }
    return ln;
  }

  parseContent(raw_content) {
    const lines = raw_content.split('\n');
    const ret = [];
    for (var i=0; i<lines.length; ++i) {
      var ln = lines[i];
      var cnt;
      for (cnt=0; ln[cnt] === '　'; ++cnt);
      ln = ln.trim();
      for (; cnt > 0; --cnt) ln = '　' + ln;
      if (ln.length > 0) ret.push(ln);
    }
    return ret;
  }

  // Turn, say, "[涅槃=涅槃有三種]", into "[涅=涅槃有三種][槃=涅槃有三種]".
  preprocessAnnos(ln) {
    var result = '';
    if (ln.indexOf('[') < 0) return ln;
    for (var i=0; i<ln.length; ++i) {
      var c = ln[i];
      if (c != '[') { result += c; continue; }
      var idxStart = ++i, idxDiv = -1;
      for (; i<ln.length; ++i) {
        c = ln[i];
        if (c === ']') {
          var term, anno, divr;
          if (idxDiv < 0) {
            term = ln.substring(idxStart, i);
            anno = term;
          } else {
            term = ln.substring(idxStart, idxDiv);
            anno = ln.substring(idxDiv+1, i);
            divr = ln[idxDiv];
          }
          if (!divr) {
            for (var j=0; j<term.length; ++j)
              result += '[' + term[j] + '='+ term + ']';
          }
          else if (term.length <= 1) {
            result += '[' + term + divr + anno + ']';
          }
          else {
            for (var j=0; j<term.length; ++j)
              result += '[' + term[j] + divr + anno + ']';
          }
          break;
        } else if ((idxDiv < 0) && isASCII(c)) {
          idxDiv = i++;
        }
      }
    }
    return result;
  }

  processMarks(ln) { // for now, just skip them. need to redesign the whole thing for marks
    var orig = ln, re = /\[\$[0-9a-zA-Z_]*]/g;
    if (Array.isArray(ln)) ln = ln[0];
    var marks = ln.match(re);
    if (!marks) return orig;
//    console.log('marks:', marks);
    ln = ln.replace(re, '');
    if (Array.isArray(orig)) {
      orig[0] = ln;
      return orig;
    }
    return ln;
  }

  breakLine(ln) { // tags like <em> and <u> must be closed within a single line.
    if (!this.breakLen) return ln;
    // pre-insert "\n|" to break the lines. Mind the <>'s!
    var result = '', cnt = this.breakLen+1;
    for (var i=0; i<ln.length; ++i) {
      var c = ln[i];
      switch (c) {
      case '[': // [...] is treated as a single zi.
        c = '[';
        for (++i; ; ++i) {
          var x = ln[i];
          c += x;
          if (x === ']')
            break;
        }
        break;
      case '|':
        result += '|';
        cnt = this.breakLen+1;
        continue;
      case '<': // skip the tag
        result += '<';
        while ((c = ln[++i]) !== '>') result += c;
//      result += '>';
//      c = ln[++i];
        break;
      }
      if (!c) continue;
      if (isHanZi(c) || c.endsWith(']') || isPunc1(c)) {
        switch (--cnt) {
        case 0:
          cnt = this.breakLen;
          if (isPunc1R(c)) {
            ++cnt;
            result += c;
            if (i < ln.length-1)
              result += '\n|';
          }
          else if (i === ln.length-1 && isPunc1L(c))
            result += c;
          else
            result += '\n|' + c;
          continue;
        case 1:
          if (isPunc1L(c)) {
            result += '\n|' + c;
            cnt = this.breakLen;
            continue;
          }
          break;
        }
      }
      result += c;
    }
    return result;
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
    this.chaptersOrig.push(c);
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
      while (ln.endsWith('\n')) ln = ln.substring(0, ln.length-1);
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
        W = this._clientWidth(el),
        len = this.displayLines.length,
        readWidth = W - this.margin * 0 - this.titleGap,
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
      if (lastTitle) { // set up chapter stuff
        var ch = this.getChapters()[++curChapterIdx];
        if (ch) ch.startPage = this.pages.length-1;
      }

      var lastW = curW;
      curW += this._renderReadLine(null, ln, lastTitle, 0, 0, false);
      if (curW > readWidth) {
        curPg.end = i-1;
        curPg.lastW = lastW;
        curPg = { start:i, end:len-1, chapter:curChapterIdx };
        if (this.getChapters().length > 0 && !lastTitle && this.getChapters()[curPg.chapter])
          curPg.chapterTitle = this.getChapters()[curPg.chapter].caption;
        this.pages.push(curPg);
        curW = 0;
      }
      if (lastTitle) {
        var ch = this.getChapters()[curChapterIdx];
        if (!ch) continue;
        var t = ch.caption;
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

  _clientWidth(el) {
    var W = el.clientWidth, H = this.readerHeight;
    if (!this.noimg && this.imageUri) W -= this.imageWidth * (H / this.imageHeight);
    return W;
  }

  _setCurPage(cp) {
    cp && sessionStorage.setItem(this.title + '_curPage', cp);
    this.curPage = cp;
  }

  renderReader(dir) {
//    this.noimg = 'true' === sessionStorage.getItem(this.title + '_noimg');
    if (!this.readingStarted) {
      LIVRE = this;
      document.addEventListener("keydown",   (e) => LIVRE.nav(e), false);
      document.addEventListener("mousedown", (e) => LIVRE.nav(e), false);
      document.addEventListener("mousemove", (e) => LIVRE.nav(e), false);
      window.addEventListener("resize", () => { LIVRE._computePages(); LIVRE.renderReader() }, false);
      this.readingStarted = true;

      this._computePages();
      this._setCurPage(0);  // 0-based
      this.curHilite = -1; // 0-based
    }
    else if (dir === 'noimg') {
      this.noimg = true;
      sessionStorage.setItem(this.title + '_noimg', 'true');
      this._computePages();
      this._setCurPage(0);  // 0-based
      this.curHilite = -1; // 0-based
    }

    const numPgs = this.pages.length
    if (!dir) {
      dir = sessionStorage.getItem(this.title + '_curPage');
      if (typeof dir === 'string') dir = parseInt(dir);
    }

    if (typeof dir === 'number') {
      if (dir < 0 || dir >= numPgs) return;
      this._setCurPage(dir);
    } else {
      switch (dir) {
      case 'nextHilite': this._toNextHilite(true); break;
      case 'prevHilite': this._toNextHilite(false); break;
      case 'next5Pages': this._nextPage(5); break;
      case 'prev5Pages': this._prevPage(5); break;
      case   'nextPage': this._nextPage(); break;
      case   'prevPage': this._prevPage(); break;
      case      'start': this._setCurPage(0); this.curHilite = null; break;
      case        'end': this._setCurPage(numPgs-1); this.curHilite = null; break;
      }
    }

    var el = e(this.elemId);
    if (!el) { alert('Element [id=' + this.elemId + '] is not found.'); return; }

    var W = this._clientWidth(el),
        H = this.readerHeight,
        origR = W - this.margin;
    el.style.height = H + 'px';

    var buf = new Buffer(), lastX = origR;

    var desc  = this.noChapterTitles ? this.descNoChapterTitles :  this.desc, pageOffset = 0;
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
    if (!this.noimg && this.imageUri) {
      var scale = (H - 2 * this.margin) / this.imageHeight;
      const imgW = !this.imageWidth  ? '' : (' width="'  + (this.imageWidth  * scale) + '"');
      const imgH = !this.imageHeight ? '' : (' height="' + (this.imageHeight * scale) + '"');
      buf.w('<div style="position:absolute; top:', this.margin, 'px; left:', W, 'px">');
      if (this.closeDisabled)
        buf.w('<img border="0" src="', this.imageUri, '"', imgW, imgH, '>');
      else
        buf.w('<a href="javascript:LIVRE.renderReader(\'noimg\')">',
              '<img border="0" src="', this.imageUri, '"', imgW, imgH, ' title="Click to turn off the image. (Reload the page to get the image back.)"></a>');
      buf.w('</div>');
    }
    buf.render(this.elemId);
  }

  _nextPage(pgs) {
    pgs || (pgs = 1);
    if (this.curPage < this.pages.length-pgs) this._setCurPage(this.curPage + pgs);
  }
  _prevPage(pgs) {
    pgs || (pgs = 1);
    if (this.curPage > pgs-1) this._setCurPage(this.curPage - pgs);
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
    var el, w, clickMargin, isMouseDown = false;
    switch (event.type) {
    case 'keydown':
      var isShift = event.shiftKey; // altKey, ctrlKey
      switch (event.keyCode) {
      case 40: /* down  */
      case 37: /* left  */ this.renderReader('nextHilite'); break;
      case 38: /* up    */
      case 39: /* right */ this.renderReader('prevHilite'); break;
      case 32: /* space */ this.renderReader((isShift || event.altKey) ? 'prevPage' : 'nextPage'); break;
      case 34: /* pgdn  */ this.renderReader(isShift ? 'next5Pages' : 'nextPage'); break;
      case 33: /* pgup  */ this.renderReader(isShift ? 'prev5Pages' : 'prevPage'); break;
      case 36: /* home  */ this.renderReader('start'); break;
      case 35: /* end   */ this.renderReader('end'); break;
      }
      break;
    case 'mousedown':
      isMouseDown = true;
    case 'mousemove':
      el = e(this.elemId);
      w = el.clientWidth;
//      clickMargin = w / 10;
      clickMargin = 10;
      if (isMouseDown) {
        if (event.x > w - clickMargin)  this.renderReader('prevPage');
        else if (event.x < clickMargin) this.renderReader('nextPage');
      } else {
        if (event.x > w - clickMargin)  el.style.cursor = 'pointer';
        else if (event.x < clickMargin) el.style.cursor = 'pointer';
        else                            el.style.cursor = 'auto';
      }
      break;
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
    noimg = get('noimg'),
    chBaseUrl;
if (t) {
  addjs(t);
} else {
  if (b.length < 2) b = '0' + b;
  addjs(s + '/' + b + '.js');
  chBaseUrl = '?s=' + s + '&b=' + b;
}
