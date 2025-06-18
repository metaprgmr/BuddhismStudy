var DEBUG = ''; // 'border:1px solid red;';
const HILITE_COLOR = '#ff8';
const KAI_TI = 'KaiTi, Kaiti TC, 楷体, STKaiti, 华文楷体';
const FANGSONG_TI = 'FangSong, 仿宋体, STFangSong, 华文仿宋体';
// 特殊符号大全 https://www.jiuwa.net/fuhao/agg/

const zdigits = '〇一二三四五六七八九';
function zNumber(n) { // 0 to 999
  if (typeof n == 'string') n = parseInt(n);
  if (n == 0) return zdigits[0];
  if (n == 10) return '十';
  if (n > 10 && n < 20) return '十' + zdigits[n-10];
  var d100 = Math.floor(n / 100);
  var d10  = Math.floor((n-d100*100) / 10);
  var d1   = n - d100 * 100 - d10 * 10;
  var ret = (d100 > 0 ? zdigits[d100] : '') + zdigits[d10] + zdigits[d1];
  while (ret.length > 1 && ret.startsWith('〇')) ret = ret.substring(1);
  return ret;
}

var queryParams;
function get(name) {
  if (!queryParams) { // singleton, instantiated on-demand
    queryParams = {};
    if (location.search.startsWith('?')) {
      var qparams = location.search.substring(1).split('&');
      for (var i=0; i<qparams.length; ++i) {
        var a = qparams[i].split('=');
        queryParams[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      }
    }
  }
  return queryParams[name];
}

function addjs(uri)           { document.write('<s'+`cript src="${uri}"></sc`+'ript>') }
function toEl(x)              { return (typeof x=='string')?document.getElementById(x):x; }
function e(id)                { return document.getElementById(id) }
function showEl(id)           { var el=toEl(id); el && (el.style.display='block'); }
function hideEl(id)           { var el=toEl(id); el && (el.style.display='none'); }
function enableEl(id, set)    { var c = e(id); if (set) c.removeAttribute('disabled'); else c.setAttribute('disabled', ''); }
function w()                  { for(var i in arguments)document.write(arguments[i]); }
function showTop(id)          { var el=toEl(id); el && el.scrollIntoView(); }
function renderText(id, txt)  { var el=toEl(id); el && (el.innerHTML=txt); }
function addClass(id, cls)    { var el=toEl(id); el && el.classList.add(cls); } 
function removeClass(id, cls) { var el=toEl(id); el && el.classList.remove(cls); } 

function digit2(i, increment) {
  if (!i) i = 0;
  if (typeof i == 'string') i = parseInt(i);
  if (increment) ++i;
  return (i<10) ? ('0' + i) : i;
}

function digit3(i, increment) {
  if (!i) i = 0;
  if (typeof i == 'string') i = parseInt(i);
  if (increment) ++i;
  return (i<10) ? ('00' + i) : (i<100 ? ('0' + i) : i);
}

function digit3RightAligned(i) {
  if (!i) i = 0;
  if (typeof i == 'string') i = parseInt(i);
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

function toW(n, w, c) {
  n = '' + n;
  if (!c) c = ' ';
  while (n.length < w) n = c + n;
  return n;
}

function toInt(n) { return (typeof n === 'string') ? parseInt(n) : n; }

function toLines(txt) { // ending \ concats the next line
  if (Array.isArray(txt)) return txt;
  return txt && txt.replaceAll('\\\n', '').split('\n');
}

function toAttr(a,v) { return !v ? '' : ` ${a}="${v}"`; }

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

const zpuncs = '，、；：。？！';
const zpuncs1L = '「『《（';
const zpuncs1R = '」』》）—─…'; // '　' is punc?
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
function isWhite(c) { return c && c.length && !c.trim().length; }
function isDigit(c) {
  switch(c) {
  case '0': case '1': case '2': case '3': case '4':
  case '5': case '6': case '7': case '8': case '9': return true;
  }
  return false;
}
function trimLead0s(n) {
  if (typeof n != 'string') return n;
  for (var i=0; (i<n.length-1) && (n[i]=='0'); ++i);
  return (i==0) ? n : n.substring(i);
}
function getKeysOrdered(obj) {
  if (!obj) return null;
  var a = Object.keys(obj);
  a.sort();
  return a;
}
function dumpKeys(obj) { console.log(getKeysOrdered(obj)) }
function toSet(s, val) {
  val = val || true;
  var set = {};
  for (var i in s) set[s[i]] = val;
  return set;
}

var allHanZi = {};
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
      if (isHanZi(c)) {
        ++cnt;
        allHanZi[c] = true;
      }
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function writingRedir(name, ttl) {
  if (!ttl) ttl = name;
  document.title = ttl;
  w(`<meta http-equiv="Refresh" content="1;url=../個人文集/${name}.html">`,
    `</head><body><h2>${ttl}</h2></body></html>`);
}

function getYourName(yourTag, anyTag) {
  var ret = window['MYNAME'];
  if (ret) return !yourTag ? ret : `<${yourTag}>${ret}</${yourTag}>`;
  const help = "To set your name, in env.js: var MYNAME='&#24373;&#19977;';";
  return !anyTag ? '某甲' : `<${anyTag} title="${help}">某甲</${anyTag}>`;
}
