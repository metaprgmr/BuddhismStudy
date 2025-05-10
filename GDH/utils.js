// https://hongkongvision.com/tool/cc_py_conv_zh
// https://www.iamwawa.cn/yuepin.html

// utilities
const PUNCS = '：。，、；？！“”【】「」『』（）《》⋯⋯▸ 　';

function isPunc(zi) { return PUNCS.indexOf(zi) >= 0 }
function isWhite(c) { return c && c.length && !c.trim().length; }
function isDigit(c) {
  switch(c) {
  case '0': case '1': case '2': case '3': case '4':
  case '5': case '6': case '7': case '8': case '9': return true;
  }
  return false;
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

function js(uri) { document.write('<s' + 'cript src="' + uri + '"></s' + 'cript>') }
function e(elid) { return document.getElementById(elid) }
function enableEl(id, set) { var c = e(id); if (set) c.removeAttribute('disabled'); else c.setAttribute('disabled', ''); }
function w() { for (var i in arguments) document.write(arguments[i]) }
function get(name) {
 if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
   return decodeURIComponent(name[1]);
}
function toW(n, w) {
  n = '' + n;
  while (n.length < w) n = ' ' + n;
  return n;
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

function toLines(txt) { // ending \ concats the next line
  if (Array.isArray(txt)) return txt;
  return txt && txt.replaceAll('\\\n', '').split('\n');
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
