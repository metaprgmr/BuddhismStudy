const zpuncs = '，、；：。？！□①②③④⑤⑥';
const zpuncs1L = '「『《（“‘';
const zpuncs1R = '”’」』》）—─…　';
const zpuncs1 = zpuncs1L + zpuncs1R;
const zpuncsAll = zpuncs + zpuncs1 + 'āōēīūǖñáóéíúǘńǎǒěǐǔǚňàòèìùǜǹ';
const REGEX_CHINESE = /[\u3300-\u4dbf]|[\u4e00-\u9fff]|[\uf900-\ufaff]|[\ufe30-\ufe4f]|[\u20000-\u2a6df]|[\u2a700-\u2ceaf]|[\u2f800-\u2fa1f]/;
function isHanZi(x) { return !isASCII(x) && REGEX_CHINESE.test(x) && (zpuncsAll.indexOf(x) < 0); }
function isASCII(str) { return /^[\x00-\xFF]*$/.test(str) }
function checkNonHanZi(x) {
  if (!x) return false;
  x = x[0];
  return isASCII(x) && ('ĀāĪīŪūṚṛṝḶḷṃḥṅñṇŚśṢṣṬṭḌḍ'.indexOf(x) >= 0);
}

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

function romanDigit(n) {
  const digs = [ '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X' ];
  return digs[n] || (''+n);
}

function toLines(txt, width) {
  if (!txt) return null;
  var a = [];
  for (var i=0; i < txt.length; i+=width) {
    if (i+width < txt.length)
      a.push(txt.substring(i, i+width));
    else
      a.push(txt.substring(i));
  }
  return a;
}

function dumpLines(txt, width) {
  console.log("'" + toLines(txt, width).join("' +\n'") + "',");
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

function get(name) {
 if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
   return decodeURIComponent(name[1]);
}
function addjs(uri) { document.write('<s' + 'cript src="' + uri + '"></s' + 'cript>') }
function e(id) { return (typeof id=='string') ? document.getElementById(id) : id; } // id may be the el itself
function setClass(id, cls) { var el = e(id); el && (el.className = cls); }
function addClass(id, cls) { var el = e(id); el && el.classList.add(cls); }
function removeClass(id, cls) { var el = e(id); el && el.classList.remove(cls); }
function rubyfy(txt, anno, cls) {
  var ttl = '';
  if (txt && txt.startsWith('[') && txt.endsWith(']')) {
    ttl = ` title="${txt.substring(1,txt.length-1)}"`
    txt = '';
  }
  if (anno && anno.startsWith('[') && anno.endsWith(']')) {
    if (!ttl)
      ttl = ` title="${anno.substring(1,anno.length-1)}"`
    anno = '';
  }
  if (!txt || txt.length <= 1)
    return `<ruby${ttl} style="ruby-position:under"><noruby>${txt||'&nbsp;'}</noruby><rt>${anno}</rt></ruby>`;
  else
    return !anno ? `<noruby${ttl}>${txt}</noruby>`
                 : `<ruby${ttl} class="${cls||''}" style="ruby-position:under">${txt||'&nbsp;'}<rt>${anno}</rt></ruby>`;
}
function doGathaHTML(buf, txt, anno) { buf.w('<egatha>', txt, '</egatha><br><zgatha>　', anno, '</zgatha>'); }
const circledLetters = {
  "a":"Ⓐ", "b":"Ⓑ", "c":"Ⓒ", "d":"Ⓓ", "e":"Ⓔ", "f":"Ⓕ", "g":"Ⓖ", "h":"Ⓗ",
  "i":"Ⓘ", "j":"Ⓙ", "k":"Ⓚ", "l":"Ⓛ", "m":"Ⓜ", "n":"Ⓝ", "o":"Ⓞ", "p":"Ⓟ",
  "q":"Ⓠ", "r":"Ⓡ", "s":"Ⓢ", "t":"Ⓣ", "u":"Ⓤ", "v":"Ⓥ", "w":"Ⓦ", "x":"Ⓧ",
  "y":"Ⓨ", "z":"Ⓩ",
};

function processCircled(s) {
  var a = s.split('@'), len = a.length;
  if (len <= 1) return s;
  if (len % 2 == 0) throw `UNBALANCED @: ${s}`;
  var ret = '';
  for (var i=0; i<len; i+=2) {
    ret += a[i];
    if (i < len-1) { var c = a[i+1]; ret += circledLetters[c] || c; }
  }
  return ret;
}

class Buffer {
  constructor() { this.bufList = Array.from(arguments); }
  w() {
    var ret = '';
    for (var i in arguments) ret += arguments[i];
    if (ret) this.bufList.push(ret);
    return (this.bufList.length < 1024) ? this : this.condense();
  }
  append(s) { this.bufList.push(s); return this;} // for performance
  prepend() {
    var ret = '';
    for (var i in arguments) { var x = arguments[i]; x && (ret += x); }
    if (ret) this.bufList.unshift(ret);
    return this;
  }
  // renders to one or more elements. returns the text, and clears the internal content.
  render() {
    var ret = this.text();
    for (var i in arguments) {
      var el = e(arguments[i]);
      el && (el.innerHTML = ret);
    }
    this.bufList = [];
    return ret;
  }
  text() { var s = this.bufList.join(''); this.bufList = [ s ]; return s; }
  condense() { if (this.bufList.length > 100) this.text(); return this; }

} // Buffer.

class Directive {
  // type
  // value
  // level
  constructor(ln) {
    if (ln[0] == '{') {
      ln = ln.substring(1, ln.length-1);
      switch (ln) {
      case 'gatha':  this.type = 'gatha';  break;
      case '/gatha': this.type = '_gatha'; break;
      case 'pre':    this.type = 'pre';    break;
      case '/pre':   this.type = '_pre';   break;
      default:
        if (ln.startsWith('pt')) {
          this.type = 'part';
          this.value = ln.substring(2);
        } else if (ln.startsWith('V')) {
          this.type = 'volume';
          this.value = ln.substring(1);
        }
        break;
      }
    }
    else if (ln[0] == '#') {
      if (ln[1] == '!') {
        this.type = 'annotation';
        var idx = ln.indexOf(' ');
        this.value = ln.substring(idx).trim();
      } else {
        this.type = 'caption';
        var idx = ln.indexOf(' ');
        this.level = idx;
        this.value = ln.substring(idx).trim();
      }
    }
    else {
      throw `Unrecognized line: ${ln}`;
    }
  }

  isA(type) { return this.type == type; }

  toHTML(buf) {
    var fortxt = !buf, x;
    if (fortxt) buf = new Buffer();
    if (this.isA('volume')) {
      x = `【楞嚴經•卷${zNumber(this.value)}】`;
      return fortxt ? x : buf.append(x);
    }
    var lvl, isAnno = false;
    if (this.isA('part'))
      lvl = 1;
    if (this.isA('annotation')) {
      lvl = 3;
      isAnno = true;
    }
    else if (this.level)
      lvl = parseInt(this.level) + 1;
    var pref = '';
    if (lvl) {
      x = 'h' + lvl;
      if (lvl == 1)
        pref = 'Part&nbsp;';
      var txt = this.value.replaceAll('|', '.&nbsp;')
                    .replaceAll('{', '<sub>').replaceAll('}', '</sub>');
      if (isAnno) txt = `<i style="color:darkblue">${txt}</i>`;
      x = `<${x}>${pref}${txt}</${x}>`;
      return buf ? buf.append(x) : x;
    }
    console.log(`▸ Unmanifested directive: [${this.type}] ${this.value}`);
    return fortxt ? buf.render() : buf;
  }

} // Directive.

class DualTextPara {
  constructor(type) {
    this.type = type || 'TEXT';
    this.segs = [];
  }

  isA() { return false; }

  addText1(ln) {
    this.cur = [ ln.trim() ];
    this.segs.push(this.cur);
  }

  addText2(ln) {
    if (this.cur) this.cur[1] = ln.trim();
  }

  toHTML(buf, prefix, suffix) {
    var fortxt = !buf;
    if (fortxt) buf = new Buffer();
    var isGatha = prefix == 'GATHA';
    if (isGatha) {
      prefix = null;
      suffix = '<br>';
    }
    var len = this.segs.length;
    buf.w('<p>');
    var isDim = false;
    for (var i=0; i<len; ++i) {
      var seg = this.segs[i],
          txt = seg[0].replaceAll('{', '<sub>').replaceAll('}', '</sub>');
      if (prefix) buf.w(prefix);
      if (isGatha)
        doGathaHTML(buf, txt, seg[1]);
      else
        buf.w(rubyfy(txt, seg[1], isDim ? 'u_dotted' : 'u_'));
      isDim = !isDim;
      if (suffix) buf.w(suffix);
    }
    buf.w('</p>');
    return fortxt ? buf.render() : buf;
  }

} // DualTextPara.

class DualTextPassage {
  constructor(txt) {
    this.content = [];
    txt && this._parse(txt.trim());
  }

  _parse(txt) {
    var a = txt.split('\n'), len = a.length, curpara;
    var state = 0; // 0: any; 1: expect Text2
    for (var i=0; i<len; ++i) {
      var ln = processCircled(a[i].trim());
      switch (state) {
      case 1: // expect Text2
        if (!curpara) {
          curpara = new DualTextPara();
          this.content.push(curpara);
        }
        curpara.addText2(ln);
        state = 0;
        break;
      default:
        if (!ln) {
          curpara = null;
          state = 0;
        }
        else {
          switch(ln[0]) {
          case '{':
          case '#': this.content.push(new Directive(ln)); continue;
          default:  if (!curpara) {
                      curpara = new DualTextPara();
                      this.content.push(curpara);
                    }
                    curpara.addText1(ln);
                    state = 1;
                    break;
          }
        }
        break;
      }
    }
    this.isReady = true;
  }

  toHTML(buf) {
    var fortxt = !buf;
    if (fortxt) buf = new Buffer();
    var inGatha = false, pref, suff = ' ';
    for (var i in this.content) {
      var seg = this.content[i];
      if (seg.isA('gatha')) {
        pref = 'GATHA';
        buf.w('<blockquote>');
      }
      else if (seg.isA('_gatha')) {
        pref = null;
        suff = ' ';
        buf.w('</blockquote>');
      }
      else
        seg.toHTML(buf, pref, suff);
    }
    buf.w('<center><hr style="color:red"> <span class="copyright"></span></center>');
    return fortxt ? buf.render() : buf;
  }

} // DualTextPassage.

class SimpleHTMLContent {
  constructor(html) {
    this.html = html;
    this.isReady = true;
  }

  toHTML(buf) {
    var forhtml = !buf;
    if (forhtml) buf = new Buffer();
    buf.w(this.html, '<center><p>&nbsp;</p><hr style="color:red"> <span class="copyright"></span></center>');
    return forhtml ? buf.render() : buf;
  }
}

function windowResize() {
  var height = 0;
  var body = window.document.body;
  if (window.innerHeight) {
      height = window.innerHeight;
  } else if (body.parentElement.clientHeight) {
      height = body.parentElement.clientHeight;
  } else if (body && body.clientHeight) {
      height = body.clientHeight;
  }

  var el = e('stg');
  el.style.height = ((height - el.offsetTop - 40) + "px");
}

var psg;
