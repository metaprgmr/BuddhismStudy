var DEBUG = ''; // 'border:1px solid red;';
var isDebugging = false;
const ON={}, OFF={};
function dbg() {
  if (arguments[0] == ON) { isDebugging = true; return; }
  else if (arguments[0] === OFF) { isDebugging = false; return; }
  if (isDebugging) console.log.apply(null, Array.from(arguments));
}

const HILITE_COLOR = '#ff8';
const KAI_TI = 'KaiTi, Kaiti TC, 楷体, STKaiti, 华文楷体';
const FANGSONG_TI = 'FangSong, 仿宋体, STFangSong, 华文仿宋体';
// 特殊符号大全 https://www.jiuwa.net/fuhao/agg/
const A2Z = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const a2z = 'abcdefghijklmnopqrstuvwxyz';

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

var SAMSKRT_SCRIPT = 'Siddham'; // or 'Devaganari'
function IAST(iast) {
  var i = iast;
  if ((i.length > 1) && i.endsWith('a'))
    i = i.substring(0,i.length-1);
  switch(i) {
  case 'a':   return '𑖀';
  case 'ā':   return '𑖁';
  case 'aṃ':
  case 'āṃ':  return '𑖀𑖽';
  case 'aḥ':  return '𑖀𑖾';
  case 'i':   return '𑖂';
  case 'ī':   return '𑖃';
  case 'u':   return '𑖄';
  case 'ū':   return '𑖅';
  case 'ṛ':   return '𑖆';
  case 'ṝ':   return '𑖇';
  case 'ḷ':   return '𑖈';
  case 'ḹ':   return '𑖉';
  case 'e':   return '𑖊';
  case 'ai':  return '𑖋';
  case 'o':   return '𑖌';
  case 'au':  return '𑖍';
  case 'k':   return '𑖎';
  case 'kh':  return '𑖏';
  case 'g':   return '𑖐';
  case 'gh':  return '𑖑';
  case 'ṅ':   return '𑖒';
  case 'c':   return '𑖓';
  case 'ch':  return '𑖔';
  case 'j':   return '𑖕';
  case 'jh':  return '𑖖';
  case 'ñ':   return '𑖗';
  case 'ṭ':   return '𑖘';
  case 'ṭh':  return '𑖙';
  case 'ḍ':   return '𑖚';
  case 'ḍh':  return '𑖛';
  case 'ṇ':   return '𑖜';
  case 't':   return '𑖝';
  case 'th':  return '𑖞';
  case 'd':   return '𑖟';
  case 'dh':  return '𑖠';
  case 'n':   return '𑖡';
  case 'p':   return '𑖢';
  case 'ph':  return '𑖣';
  case 'b':   return '𑖤';
  case 'bh':  return '𑖥';
  case 'm':   return '𑖦';
  case 'ś':   return '𑖫';
  case 'ṣ':   return '𑖬';
  case 's':   return '𑖭';
  case 'h':   return '𑖮';
  case 'y':   return '𑖧';
  case 'v':   return '𑖪';
  case 'r':   return '𑖨';
  case 'l':   return '𑖩';
  }
  return iast;
}
function samskrt(iast, zi, sans) {
  //case 'ṃ': // anusvāra
  //case 'ḥ': // visarga
  var i = iast;
  if ((i.length > 1) && i.endsWith('a'))
    i = i.substring(0,i.length-1);
  if (!sans && i) iast = IAST(iast);
  return `<span class="samskrt" title="${iast}">${sans}</span>${zi||''}`;
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

var urlMyName = get('myname');

function addjs(uri)         { document.write('<s'+`cript src="${uri}"></sc`+'ript>') }
function addStyleTag(s)     { var el = document.createElement('style'); el.textContent = s; document.head.appendChild(el); }
function toEl(x)            { return (typeof x=='string')?document.getElementById(x):x; }
function e(id)              { return document.getElementById(id) }
function showEl()           { for (var i in arguments) { var el=toEl(arguments[i]); el && (el.style.display='block'); } }
function hideEl()           { for (var i in arguments) { var el=toEl(arguments[i]); el && (el.style.display='none'); } }
function enableEl(id, set)  { var el=toEl(id); el && (set ? el.removeAttribute('disabled') : el.setAttribute('disabled', '')); }
function showTop(id)        { var el=toEl(id); el && el.scrollIntoView(); }
function showModal(id,s,t)   { showDialog(id,s,t); }
function showModeless(id,s,t){ showDialog(id,s,t,true); }
function w()                { for(var i in arguments){var x=arguments[i]; if(typeof x!='number')x=x||''; document.write(x);} }
function renderText(id,t)   { id ? new Buffer(t).render(id) : document.write(t); }
function addClass(id, cls)  { var el=toEl(id); el && el.classList.add(cls); }
function removeClass(id, cls) { var el=toEl(id); el && el.classList.remove(cls); }
function showOne() { // id's; last is 0-based index; if not a number, defaulted to 0
  var endIdx = arguments.length-1, selIdx = 0;
  if (typeof arguments[endIdx] == 'number') selIdx = arguments[endIdx--];
  for (var i=0; i<=endIdx; ++i)
    if (i == selIdx) showEl(arguments[i]); else hideEl(arguments[i]);
}
function jslnk(jscall, txt) { return `<a href="javascript:${jscall}">${txt}</a>`; }
function toOL(lst, extra) { return `<ol ${extra||''}><li>${lst.join('</li><li>')}</li></ol>`; }
function toOLZH(lst) { return toOL(lst, 'class=cjk'); }
function toUL(lst) { return `<ul><li>${lst.join('</li><li>')}</li></ul>`; }
function trimFirstBlankLine(txt) {
  if (!txt) return txt;
  var idx = txt.indexOf('\n');
  if (idx < 0) return txt;
  var first = txt.substring(0, idx).trim();
  return (first == '') ? txt.substring(idx+1) : txt;
}

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

function containsAny() {
  var len = arguments.length;
  var s = arguments[0];
  if (s)
    for (var i=1; i<len; ++i)
      if (s.indexOf(arguments[i]) >= 0) return true;
  return false;
}

function range(from, to) { // inclusive
  var ret = [];
  for (var i=from; i<=to; i++) ret.push(i);
  return ret;
}

function toRange(a) {
  return ((a.length == 3) && (a[1] == '-')) ? range(a[0], a[2]) : a;
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

function repeat(x, n) {
  var ret = '';
  for (var i=0; i<n; ++i) ret += x;
  return ret;
}

function toW(n, w, c) {
  n = '' + n;
  if (!c) c = ' ';
  while (n.length < w) n = c + n;
  return n;
}
function to4d(n) { return toW(n, 4, '0'); }
function to3d(n) { return toW(n, 3, '0'); }
function to2d(n) { return toW(n, 2, '0'); }

function toInt(n) { return (typeof n === 'string') ? parseInt(n) : n; }

function toLines(txt) { // ending \ concats the next line
  if (Array.isArray(txt)) return txt;
  return txt && txt.replaceAll('\\\n', '').split('\n');
}

function toSet(lst) {
  var ret = {};
  if (typeof lst == 'string') {
    var ast = new Astral(lst), len = ast.getLength();
    for (var i=0; i<len; ++i) ret[ast.charAt(i)] = true;
  }
  else if (lst.length)
    for (var i=0; i<lst.length; ++i) ret[lst[i]] = true;
  else
    ret[lst] = true;
  return ret;
}

function dateShift(adate, num, unit) { // unit: 'y', 'm', 'd', 'w'. Default 'd'.
  var y = adate.getFullYear(), m = adate.getMonth(), d = adate.getDate();
  switch(unit) {
  case 'y': return new Date(y+num, m, d);
  case 'm': return new Date(y, m+num, d);
  case 'w': return new Date(y, m, d+num*7);
  default:  return new Date(y, m, d+num);
  }
}

function getUniqueHanZisAsSet(str) {
  var ret = {}, ast = str.isAstral ? str : new Astral(str), len = ast.getLength();
  for (var i=0; i<len; ++i) {
    var z = ast.charAt(i);
    (z.length > 1 || isHanZi(z)) && (ret[z] = true);
  }
  return ret;
}

function getUniqueHanZisAsList(str) { return Object.keys(getUniqueHanZisAsSet(str)); }

function toAttr(a,v) { return v && a && (` ${a}="${v}"`) || ''; }

function setToString(s, sep) { return Object.keys(s).join(sep||''); }

function setsIntersect(a, b) { // a ∩ b
  var ret = Object.assign({}, a);
  for (var k in b) if (!a[k]) delete ret[k];
  return ret;
}

function setsAdd() {
  var ret = {}, len = arguments.length;
  for (var i=0; i<len; ++i)
    ret = Object.assign(ret, arguments[i]);
  return ret;
}

function setsSub() { // [0] - [1...]
  var ret = {}, len = arguments.length;
  if (len > 0) ret = Object.assign(ret, arguments[0]);
  for (var j=1; j<len; ++j) {
    var b = arguments[j];
    for (var k in b) delete ret[k];
  }
  return ret;
}

function setsDiff() { // for 2:  { aOnly, bOnly, both }
                      // for >2: { inAll, notInAll:{ zi:[] }* }
  var args = [];
  for (var i in arguments) if (arguments[i]) args.push(arguments[i]);
  var common = {}, len = args.length;
  if (len <= 1) return common;
  if (len == 2) { // 2 sets to compare, ad hoc treatment
    var a = args[0], b = args[1], aOnly = {}, bOnly = Object.assign({}, b);
    for (var i in a) {
      if (b[i]) { common[i] = true; delete bOnly[i]; }
      else aOnly[i] = true;
    }
    return { aOnly, bOnly, both:common };
  }

  // more than 2
  var i, stats = {};
  for (i=0; i<len; ++i) {
    var arg = args[i];
    for (var z in arg) {
      var zstats = stats[z];
      if (zstats) zstats.push(i);
      else stats[z] = [ i ];
    }
  }
  var a = Object.keys(stats);
  for (i=0; i<a.length; ++i) {
    var z = a[i], zstats = stats[z];
    if (zstats.length == len) {
      delete stats[z];
      common[z] = true;
    }
  }
  return { inAll:common, notInAll:stats };
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
function numberAlignedListStart(start) { AlignedListBulletType = bulletType; }
  AlignedListBulletType = ALBulletNumber;
  AlignedListItemNumber = (arguments.length > 0) ? arguments[0] : 1;
}
function alignedList(subject, content, bullet) {
}
*/

class Buffer {
  constructor() { this.bufList = Array.from(arguments); }

  w() {
    var ret = '';
    for (var i in arguments) {
      var x = arguments[i];
      if (x || (typeof x == 'number'))
        ret += x;
    }
    if (ret.length) this.bufList.push(ret);
    return (this.bufList.length < 1024) ? this : this.condense();
  }

  wIf() {
    if (arguments[0]) {
      arguments[0] = '';
      this.w.apply(this, arguments);
    }
    return this;
  }

  wIfElse(cond, a, b) { this.w(cond ? a : b); return this; }

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

  wrap(before, after) { return this.prepend(before).w(after); }

  // renders to one or more elements,
  // or an object with a write() function.
  // returns the text, and clears internally.
  render() {
    var ret = this.text();
    for (var i in arguments) {
      var k = arguments[i];
      if (!k) continue;
      if (typeof k == 'function')
        k(ret);
      else if (k.write)
        k.write(ret);
      else {
        var el = k.hasOwnProperty('innerHTML') ? k : e(k);
        el && (el.innerHTML = ret);
      }
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

const NULL = { j:'suinil' };
function isNil(x) { return (x == null) || (x === NULL); }
function ensureNULL(x) { return (x == null) ? NULL : x; }

class Counter {
  constructor() { this.counts = {}; this.second = {}; }
  add(n) { n=n||''; this.counts[n] = 1 + (this.counts[n] || 0); }
  add2nd(n) { n=n||''; this.second[n] = 1 + (this.second[n] || 0); }
  getCount(n) { return this.counts[n] || 0; }
  get2ndCount(n) { return this.second[n] || 0; }
  getNames() { return getKeysOrdered(this.counts); }
  getNamesByCount(type) {
    var me = this;
    if (typeof type == 'function')
      return getKeysOrdered(this.counts, type);
    var asc = (type || 'desc').toLowerCase().startsWith('asc');
    return getKeysOrdered(this.counts,
             (a,b) => {
               var c1 = me.getCount(a), c2 = me.getCount(b);
               if (c1 == c2) return 0;
               c1 = (c1 > c2) ? 1 : -1;
               return asc ? c1 : -c1;
             });
  }
  getNamesBy2ndCount() {
    return this.getNamesByCount(
             (a,b) => {
               var c1 = me.get2ndCount(a), c2 = me.get2ndCount(b);
               if (c1 == c2) return 0;
               return (c1 > c2) ? 1 : -1;
             });
  }
}

class TreeNode {
  constructor(name) { this.name = name; }
  isRoot() { return !this.parent; }
  hasChildren() { return this.children && this.children.length; }
  numChildren() { return this.children ? this.children.length : 0; }
  lastChild() { return this.children && this.children[this.children.length-1]; }
  addChild(c) { // returns c
    c.parent = this;
    if (!this.children) this.children = [];
    this.children.push(c);
    return c;
  }
  dfs(fxn) {
    if (!this.isRoot()) fxn(this);
    var len = this.numChildren();
    for (var i=0; i<len; ++i)
      this.children[i].dfs(fxn);
  }
  dump(indent) {
    if (!this.isRoot())
      console.log(repeat(indent, this.depth()) + this.name);
    var len = this.numChildren();
    for (var i=0; i<len; ++i)
      this.children[i].dump(indent);
  }
  depth() { // not-slim'med!
    var ret = -1;
    for (var n=this; !n.isRoot(); n = n.parent, ++ret);
    return ret;
  }
/*
  slim() {
    delete this.parent;
    var len = this.numChildren();
    for (var i=0; i<len; ++i) {
      var n = this.children[i];
      if (typeof n == 'object') {
        n.slim();
        if (!n.hasChildren())
          this.children[i] = n.name; // use text
      }
    }
  }
*/
} // end of TreeNode.

class Tree {
  constructor(txt, indent) {
    this.indent = indent;
    this._parse(txt);
  }
  dfs(fxn) { this.root.dfs(fxn); return this; }
//  slim() { this.root.slim(); return this; }
  dump() { this.root.dump(this.indent); }
  _parse(txt) {
    var indent = this.indent;
    function getDepth(ln) {
      var x=0, len = ln ? ln.length : 0;
      for (; (x<len) && (ln[x]==indent); ++x);
      return x;
    }
    this.root = new TreeNode('ROOT');
    var curN = this.root,
        lnNum = 1,
        a = trimFirstBlankLine(txt).split('\n'),
        len = a.length;
    for (var i=0; i<len; ++i) {
      var orig = a[i],
          curD = curN.depth(),
          d    = getDepth(orig),
          ln   = orig.substring(d);
      if (!ln.trim()) continue;
      if (ln.startsWith('!!')) { // treated as a continuation, not a new node
        ++lnNum;
        continue;
      }
      var n = new TreeNode(ln);
      n.x = d+1;
      n.y = lnNum++;
      if (d == curD)
        curN = curN.parent.addChild(n);
      else if (d < curD) {
        for (; d < curD; --curD, curN = curN.parent);
        curN = curN.parent.addChild(n);
      }
      else if (d == curD+1)
        curN = curN.addChild(n);
      else
        throw `Illegal descending: ${d}, ${curD}, ${orig}`;
    }
  }
}

class ActiveObject {
  constructor(storageItem, obj) {
    if (arguments.length == 1) obj = storageItem;
    else storageItem && (this.storageItem = storageItem);
    if ((obj == null) && this.storageItem)
      obj = JSON.parse(localStorage.getItem(this.storageItem));

    this.data = {};
    this.changed = {};
    this.globalHandler = null;
         // if globalHandler is set,
         // individual handlers will be ignored, but won't be removed.
    this.handlers = {};
    if (obj) {
      for (var i in obj) {
        var v = obj[i];
        if (v != null) this.data[i] = v;
      }
    }
  }
  setHandler(k, fxn) { // if only one param, set as the global handler
    fxn ? (this.handlers[k] = fxn) : (this.globalHandler = k);
    return this;
  }
  removeHandler(k) { // if no k, remove the global handler
    k ? (delete this.handlers[k]) : (this.golbalHandler = null);
    return this;
  }
  set(k,v) {
    var old = ensureNULL(this.data[k]);
    v = ensureNULL(v);
    if (v !== old) {
      this.changed[k] = old;
      if (v == null) delete this.data[k]; else this.data[k] = v;
    }
    return this;
  }
  getValues() { return this.data; }
  get(k) { return this.data[k]; }
  done() {
    if (this.globalHandler) { // handle globally ONLY
      var changes = [];
      for (var k in this.changed)
        changes.push([ k, this.data[k], this.changed[k]]);
      this.globalHandler(changes);
    } else { // call individual handlers
      for (var k in this.changed) {
        var f = this.handlers[k];
        f && f(this.data[k], this.changed[k]); // new & old values
      }
    }
    this.changed = {};
    this.storageItem && localStorage.setItem(this.storageItem, JSON.stringify(this.data));
    return this;
  }
}

class PersistentHistory {
  constructor(storageItem) {
    this.storageItem = storageItem;
    this.data = JSON.parse(localStorage.getItem(this.storageItem)) || [];
  }
  persist() {
    if (this.storageItem) {
      if (this.data)
        localStorage.setItem(this.storageItem, JSON.stringify(this.data));
      else
        localStorage.removeItem(this.storageItem);
    }
  }
  // for push()/unshift(), the obj is copied
  push(obj) { obj && this.data.push(Object.assign({}, obj)); this.persist(); }
  unshift(obj) { obj && this.data.unshift(Object.assign({}, obj)); this.persist(); }
  pop() { var obj = this.data.pop(); this.persist(); return obj; }
  shift() { var obj = this.data.shift(); this.persist(); return obj; }
  cur() { return this.data[this.data.length-1]; }
  length() { return this.data.length; }
}

class Astral {
  constructor(str) {
    this.isAstral = true;
    this.original = str.isAstral ? str.getAll() : str;
    this.indices = [];
    var idx = 0;
    for (var i=0; i<this.original.length; ++i, ++idx) {
      this.indices.push(idx);
      var code = this.original.charCodeAt(i);
      if (code >= 0xd800 && code <= 0xdbff) { // skip the 2nd
        ++i;
        ++idx;
      }
    }
    this.length = this.indices.length;
  }
  append(s) {
    var ast = (s.original && s.indices) ? s : new Astral(s),
        olen = this.original.length;
    this.original += ast.original;
    for (var i=0; i<ast.length; ++i)
      this.indices.push(olen + ast.indices[i]);
    this.length = this.indices.length;
    return this;
  }
  getLength() { return this.indices.length; } // safer than this.length
  toString() { return this.original; }
  charAt(idx) {
    var idcs = this.indices, len = idcs.length;
    if (idx < 0 || idx >= len) return '';
    return (idx == len-1)
           ? this.original.substring(idcs[len-1])
           : this.original.substring(idcs[idx], idcs[idx+1]);
  }
  substring(startIdx, endIdx) {
    var idcs = this.indices, orig = this.original, ret = '';
    if (idcs.length == 0) return '';
    if (startIdx < 0) startIdx = 0;
    if (endIdx == null || endIdx < 0 || endIdx > idcs.length) endIdx = idcs.length;
    for (var i=startIdx; i<endIdx; i++)
      ret += orig.substring(idcs[i], idcs[i+1]);
    return ret;
  }
  substr(startIdx, endIdx) { return this.substring(startIdx, endIdx); }
  forEach (fn) { for (var i=0; i<this.length; i++) fn(this.charAt(i), i); }
}

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
function getKeysOrdered(obj, cptr) {
  if (!obj) return null;
  var a = Object.keys(obj);
  if (cptr) a.sort(cptr); else a.sort();
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

function writingRedir(name, ttl, back) {
  if (!ttl) ttl = name;
  document.title = ttl;
  w(`<meta http-equiv="Refresh" content="1;url=../${back?'writings':'個人文集'}/${name}.html">
</head><body><h2>${ttl}</h2></body></html>`);
}

function getYourName(yourTag, anyTag) {
  var ret = urlMyName || getGlobal('MYNAME');
  if (ret) return !yourTag ? ret : `<${yourTag}>${ret}</${yourTag}>`;
  const help = "若要設定名字，有二法：\n1. 在env.js裡加: var MYNAME='張三';\n2. 在url上加?myname=張三";
  return !anyTag ? '某甲' : `<${anyTag} title="${help}">某甲</${anyTag}>`;
}

function getGlobal(name) { return window[name]; }

function formatTime(tm) {
  if (tm == 0) return '';
  function fmt2Digits(x, min) {
    if (min && (x < min)) return '<inv>0</inv>0';
    return (x<10) ? ('<inv>0</inv>'+x) : x;
  }
  var hrs = Math.floor(tm / 3600);
  var secs = tm - hrs*3600;
  var mins = Math.floor(secs / 60);
  secs -= mins*60;
  var res = '';
  if (hrs <= 0)
    return fmt2Digits(mins) + ':' + fmt2Digits(secs, 5);
  return '<b>' + hrs + ':</b>' + fmt2Digits(mins) + ':' + fmt2Digits(secs, 5);
}

function enterFullScreenMode() {
  document.documentElement.requestFullscreen();
}

function exitFullScreenMode() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { // For Safari
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) { // For Firefox
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) { // For IE/Edge
    document.msExitFullscreen();
  }
}

function closeEl(id)        { var el=toEl(id); el && el.close(); }
function showDialog(id, subj, txt, modeless) {
  var el = txt && toEl(id);
  if (!el) return;
  renderText(id+'Title', subj);
  renderText(id+'Body', txt);
  modeless ? el.show() : el.showModal();
}

class MyDialog {
  constructor(width, dlgId) {
    this.width = width || 700;
    this.dlgId = dlgId || 'dlg';
  }
  render(id) {
    var dlgId = this.dlgId;
    console.log(`May write and/or modify the following in <style>:

#${dlgId}        { background-color:#ffe; padding-left:0px; padding-right:0px }
#${dlgId}Title   { color:brown; border-bottom:1px solid brown; padding-left:10px }
#${dlgId}Body    { padding-left:10px; padding-right:10px }
#${dlgId} header { margin-top:-15px; margin-left:0px; margin-right:0px; margin-bottom:10px }`);
    renderText(id, `<dialog id="${dlgId}">
<header>
  <table width="${this.width}px" cellspacing="0">
    <tr><td id="${dlgId}Title"></td>
        <td align=right style="border-bottom:1px solid brown; padding-right:10px">
          <button aria-label="Close dialog" onclick="closeEl('${dlgId}')">&times;</button>
        </td>
    </tr>
  </table>
</header>
<div id="${dlgId}Body"></div>
</dialog>`);
  }
}

class ResourceItem {
  constructor(name, type) {
    var a = name.split('|');
    this.name = a[0];
    if (a.length > 1) { a.shift(); this.alias = a; }
    this.type = type;
  }
  setCategory(cat) { cat && (this.category = cat); return this; }
  run(opt) { throw 'ResourceItem.run() not implemented.'; }
}
class TextItem extends ResourceItem {
  constructor(name, txt) { super(name, "TEXT"); this.text = txt; }
  run(opt) { return this.text; }
}
class GridPerfectItem extends ResourceItem {
  constructor(name, gp) { super(name, "GRIDP"); this.gp = gp; }
  run(opt) { return this.gp.genSVG(opt); }
}
class ResourceRepo {
  constructor() {
    this.all = {};
    this.config = null;
  }
  add(item, category) {
    var me = this, name = item.name;
    function _add(name, item) {
      if (me.all[name]) throw `Resource "${name}" already exists in ResourceRepo.`;
      me.all[name] = item;
    }
    item.setCategory(category);
    _add(name, item);
    var len = item.alias ? item.alias.length : 0;
    for (var i=0; i<len; ++i)
      _add(item.alias[i], item);
    return this;
  }
  get(name) { return this.all[name]; }
  run(name, opt) { var i = this.all[name]; return i && i.run(opt); }
  getAllItems(type) {
    var keys = Object.keys(this.all), ret = [];
    for (var i=0; i<keys.length; ++i) {
      var item = this.all[keys[i]];
      if (!type || (item.type == type))
        ret.push(item);
    }
    return ret;
  }
}
