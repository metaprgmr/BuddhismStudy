function zNumber(n) { // 0 to 999
  const zdigits = '〇一二三四五六七八九十';
  if (typeof n == 'string') n = parseInt(n);
  if (n <= 10) return zdigits[n];
  if (n > 10 && n < 20) return '十' + zdigits[n-10];
  var d100 = Math.floor(n / 100);
  var d10  = Math.floor((n-d100*100) / 10);
  var d1   = n - d100 * 100 - d10 * 10;
  var ret = '';
  if (d100 > 0)
    return zdigits[d100] + '百' + zNumber(n - d100*100);
  ret += zdigits[d10] + '十';
  if (d1 > 0) ret += zdigits[d1];
  return ret;
}
function to4d(n) { for (n =''+n; n.length<4; n='0'+n); return n; }
function trimLead0s(n) {
  if (typeof n != 'string') return n;
  for (var i=0; (i<n.length-1) && (n[i]=='0'); ++i);
  return (i==0) ? n : n.substring(i);
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
function w() { for(var i in arguments) document.write(arguments[i]); }
function e(id) { return document.getElementById(id) }
function isLocal() { return window.location.href.toLowerCase().startsWith('file:'); }
function getFileName() {
  var i = window.location.href.lastIndexOf('/');
  return (i>0) ? x.substring(i+1) : x;
}

const LNSP = '<LNSP></LNSP>', SP = '<br>', ASIS = 'asis';
var terse = get('terse');

const FA_HUA_PINS = [
  '序品', '方便品', '譬喻品', '信解品', '藥草喻品', '授記品', '化城喻品',
  '五百弟子授記品', '授學無學人記品', '法師品', '見寶塔品', '提婆達多品', '勸持品',
  '安樂行品', '從地涌出品', '如來壽量品', '分別功德品', '隨喜功德品', '法師功德品',
  '常不輕菩薩品', '如來神力品', '囑累品', '藥王菩薩本事品', '妙音菩薩品',
  '觀世音菩薩普門品', '陀羅尼品', '妙莊嚴王本事品', '普賢菩薩勸發品',
];

class DocInfo {
  constructor() {
    this.defaultClass = 'TEXT';
    this.gathaClass = 'gatha';
    this.zdigits = '〇一二三四五六七八九十';
    this.setMetaDelim('/');
    docInfo = this; // singleton
  }
  reInit(firstVol, totalVols, vol, labels) {
    this.firstVolNum = firstVol;
    this.totalVols = totalVols;
    this.labels = labels;
    this.volNum = vol || 1;
    return this;
  }
  getIdAt(i/*1-based*/) {
    var idx = (i || 1) - 1;
    return this.idMap ? this.idMap[idx] : this.firstVolNum + idx;
  }
  setBuffer(buf) { this.buf = buf; return this; }
  setMetaDelim(l, r) { this.metaLeft = l; this.metaRight = r||l; return this; }
  setGathaClass(cls) { this.gathaClass = cls; return this; }
  setXG(endCenter) { this.isXG = true; this.endCenter = endCenter; return this; }
  setHints(hints) { this.hints = hints; return this; }
  set(k,v) { k && v && (this[k]=v); return this; }
  w() {
    for(var i in arguments)
      if (this.buf) this.buf.w(arguments[i]);
      else document.write(arguments[i]);
    return this;
  }
  wIf() {
    if (arguments.length > 1 && arguments[0]) {
      arguments[0] = '';
      this.w.apply(this, arguments);
    }
    return this;
  }
  writeStart(ttl, docTtl) {
    // ttl can have | indicating subtitle; or || for subtitle with line break

    if (!this.buf)
      this.w(`<body link=blue vlink=purple background="../books/textbackground.jpg" class="Normal">`);
    this.w(`<div class=bookClean style='layout-grid:18.0pt'>`); // content starts...
    if (this.isXG && this.endCenter)
      this.w('<table><tr><td>');

    var idx = ttl.indexOf('|');
    if (idx > 0) {
      var sub = ttl.substring(idx+1);
      ttl = ttl.substring(0,idx);
      if (sub.startsWith('|')) {
        sub = sub.substring(1);
        if (!docTtl) docTtl = ttl + ' ' + sub;
        ttl += `<br><subtitle>${sub}</subtitle>`;
      } else {
        if (!docTtl) docTtl = ttl + ' ' + sub;
        ttl += `<subtitle>${sub}</subtitle>`;
      }
    }
    this.w(`<p class=TITLE>${ttl}</p>`);
    document.title = docTtl || ttl;
    return this;
  }
  writeEnd(links) {
    if (this.firstVolNum) {
      this.w(SP, '<div class=endBar>');
      this.writeSeriesNav(links);
      this.w('</div>');
    } else if (links) {
      this.w(SP, '<div class=endBar>', links, '</div>');
    }
    this.w('</div>'); // ...content ends
    if (this.isXG)
      this.w(this.endCenter
        ? '</td></tr><tr><td><div class=endImageXG></div></td></tr></table>'
        : '<div class=endImageXG></div>');
    else
      this.w('<div class=endImage title="本頁經信裹居士重新編碼、清理、補正"></div>');
    this.w('</body></html>');
    return this;
  }
  writeSeriesNav(links) {
    function fname(pnum) {
      pnum = to4d(pnum);
      return terse ? `${pnum}.htm?terse` : `${pnum}.htm`;
    }
    if (this.volNum <= 1) this.w('<inv>&laquo;</inv>');
    else this.w(`<a href="${fname(this.getIdAt(this.volNum-1))}">&laquo;</a>`);
    for (var i=1; i<=this.totalVols; ++i) {
      var lbl = i, hint = '';
      if (this.labels) lbl = this.labels[i-1];
      if (this.hints) hint = ` title="${this.hints[i-1]}"`;
      else if (i <= 10) lbl = this.zdigits[i]; // 漢字數字
      if (i == this.volNum) this.w(`&nbsp;<cur${hint}>${lbl}</cur>`);
      else this.w(`&nbsp;<a class="seriesnav" href="${fname(this.getIdAt(i))}"${hint}>${lbl}</a>`);
    }
    if (this.volNum >= this.totalVols) this.w('&nbsp;<inv>&raquo;</inv>');
    else this.w(`&nbsp;<a href="${fname(this.getIdAt(this.volNum+1))}">&raquo;</a>`);
    if (links) this.w('　', links);
  }
  writeBody(txt) {
    // The features are:
    // <Line Format>
    //   1. Each line is a unit, except for a few special cases.
    //      The content will be rendered as-is, decorated by <p>...</p>.
    //   2. For each line, the CSS class name is in the leading /.../.
    //      The default CSS class is "TEXT".
    //   3. Pseudo class "TEXT*R" is rendered as <p class=TEXT align=right>.
    //   4. If a page uses / as a regular leading character, [...] can be
    //      used instead. This is global, so either /.../ or [...].
    // <Anchor>
    //   5. If the line has an anchor, set in the tag like /TEXT:a01/.
    //      Can have multiple anchors, separated by comma.
    //      Regular <a name=""></a> works, but not as elegant.
    // <Multi-Line>
    //   6. Lines ending with \ are concatenated with <br>.
    //   7. An empty line serves as a SP.
    //   8. <html>...</html> enclosed blocks are rendered as-is.
    // <Extension>
    //   9. Override writeln() to support ad hoc syntax.
    //      Don't forget to call super.writeln() for regular content.

    this.inHtml = this.inJS = this.inGatha = this.inLst = false;
    var a = txt.split('\n'), len = a.length;
    for (var i=0; i<len; ++i) {
      var ln = a[i];
      while (ln.endsWith('\\') && i<len)
        ln = ln.substring(0,ln.length-1) + '<br>' + a[++i];
      if ((!ln || ln.trim().length == 0) && !this.inHtml && !this.inGatha && !this.inLst) {
        this.w(SP);
        continue;
      }
      if (ln.endsWith('|')) ln = ln.substring(0, ln.length-1); // trailing | is just visual
      this.writeln(ln, i+1);
    }
    return this;
  }
  writeln(ln, lnnum) {
    var ln1 = ln && ln.trim();
    if (ln1[0] == '/') {
      if ((ln1[1] == '<') && ln1.endsWith('>/')) { // vanilla HTML code. e.g. 0875
        this.w(ln1.substring(1, ln1.length-1));
        return;
      }
      if (ln1.startsWith('/bq')) { // shortcut. e.g. 9020/028.js
        this.w(`<blockquote${ln1.substring(3, ln1.length-1)}>`);
        return;
      }
      if (ln1.startsWith('/_bq')) { // shortcut. e.g. 9020/028.js
        this.w('</blockquote>');
        return;
      }
      if (ln1.startsWith('/quote')) { // shortcut. e.g. 9020/003.js
        this.w(`<blockquote class="quote"${ln1.substring(6, ln1.length-1)}>`);
        this.savedDefaultClass = this.defaultClass;
        this.defaultClass = 'TEXTL';
        return;
      }
      if (ln1.startsWith('/_quote')) { // shortcut. e.g. 9020/003.js
        this.w('</blockquote>');
        this.defaultClass = this.savedDefaultClass;
        return;
      }
    }

    if (this.inHtml) {
      if (ln1.endsWith('</html>')) {
        this.inHtml = false;
        ln = ln1.substring(0, ln.length-7);
      }
      this.w(ln, '\n');
      return;
    }

    if (this.inJS) {
      if (ln1.endsWith('</html:js>')) {
        this.inJS = false;
        ln = ln1.substring(0, ln.length-10) + '</script>';
      }
      this.w(ln.replaceAll('\\`', '`'), '\n');
      return;
    }

    if (this.inGatha) {
      if (ln1.startsWith('//')) {
        this.gatha();
        this.inGatha = false;
      }
      else if (this.gathaText)
        this.gathaText += '\n' + ln;
      else
        this.gathaText = ln;
      return;
    }

    if (this.inLst) {
      if (ln1.startsWith('//')) {
        this.inLst = false;
        this.w(`</${this.lstTag}>`);
        return;
      }
      if (ln1.length > 0)
        this.w(`<li class=cjk>${ln}</li>`);
      return;
    }

    if (ln.startsWith('<html>')) { // e.g. 0117, 0875
      ln = ln1.substring(6).trim();
      if (ln.endsWith('</html>'))
        ln = ln.substring(0, ln.length-7);
      else
        this.inHtml = true;
      this.w(ln, '\n');
      return;
    }

    if (ln1.startsWith('<html:js>')) { // e.g. 1731
      ln = ln1.substring(9).trim();
      if (ln.endsWith('</html:js>'))
        ln = '<script>' + ln.substring(0, ln.length-10) + '</script>';
      else {
        this.inJS = true;
        ln = '<script>' + ln;
      }
      this.w(ln.replaceAll('\\`', '`'), '\n');
      return;
    }

    if (ln1.startsWith('<html:diagram>')) { // e.g. 0115
      ln = ln1.substring(14).trim();
      if (!ln.endsWith('</html:diagram>'))
        throw '<html:diagram> must be closed on the same line.';
      ln = ln.substring(0, ln.length-15).trim();
      this.w('<script> gpRepo.showDiagram("', ln, '"); </script>');
      return;
    }

    if (ln1.startsWith('/gatha/')) { // e.g. 0875
      this.inGatha = true;
      return;
    }

    if (ln1.startsWith('/olzh')) { // e.g. 9020/*.js
      this.inLst = true;
      this.lstTag = 'ol';
      this.w(ln.replaceAll('/olzh', '<ol class=cjk').replace('/', '>'));
      return;
    }

    if (ln1.startsWith('/ul')) {
      this.inLst = true;
      this.lstTag = 'ul';
      this.w(ln.replaceAll('/ul', '<ul').replace('/', '>'));
      return;
    }

    if (ln1.startsWith('/VOLSEP/')) { // e.g. 9011
      this.w('<hr class=volsep>');
      return;
    }

    // process <a!999>; e.g. 0010
    ln = ln.replace(/<a!\d+>/g,
            (m) => `<a href="javascript:xref(${m.substring(3,m.length-1)})")>`);

    if (ln1[0] != this.metaLeft) {
      this.w(`<p class=${this.defaultClass}>${ln}</p>`);
      return;
    }

    var idx = ln.indexOf(this.metaRight, 1);
    if (idx < 0) throw `Missing meta closing delimiter ${this.metaRight} at line ${lnnum}.`;
    var cls = ln.substring(1,idx).split(':');
    ln = ln.substring(idx+1);
    if (cls.length > 1) {
      var anchors = cls[1].split(',');
      for (var k in anchors)
        ln = `<a name="${anchors[k]}" id="${anchors[k]}"></a>${ln}`;
    }
    cls = cls[0] || this.defaultClass;
    if (cls == 'L' || cls == 'R' || cls == 'C')
      cls = 'TEXT' + cls;
    if (cls.startsWith('TEXT') && cls.endsWith('R'))
      cls = cls.substring(0, cls.length-1) + ' align=right';
    if (cls.endsWith('align=right') && !ln.endsWith('　'))
      ln += '　';
    this.w(`<p class=${cls}>${ln}</p>`);
  }

  gatha() {
    const sp = '　', sp3 = '　　　';
    var a = this.gathaText.split('\n'), len = a.length, num = 1;
    for (var i=0; i<len; ++i) {
      var ln = a[i];
      var idx = ln.indexOf('|'), anno;
      if (idx > 0) {
        anno = ln.substring(idx+1).trim();
        ln = ln.substring(0, idx).trim();
      } else {
        anno = null;
      }
      if (ln.trim().length == 0) {
        this.w(LNSP);
      } else {
        this.w(`<p class="TEXTL ${this.gathaClass}"><span class="gathanum">`,
          (len > 5) ? (num++) : '',
          `&nbsp;</span>${ln.replaceAll(' ', sp)}`);
        if (anno) this.w(sp3, `<span style="color:black; opacity:0.4">${anno}</span>`);
        this.w(`</p>`);
      }
    }
    delete this.gathaText;
  }

  writeDoc(ttl) { // convenience method for writing the whole doc
    var docTtl, bodyTxt;
    switch(arguments.length) {
    case 1:  throw `writeDoc() expects more than one parameter.`;
    case 2:  bodyTxt = arguments[1]; break;
    default: bodyTxt = arguments[2]; docTtl = arguments[1]; break;
    }
    this.writeStart(ttl, docTtl).writeBody(bodyTxt).writeEnd();
  }

} // end of DocInfo.

var docInfo;
new DocInfo(); // set to docInfo anyway

function setDocInfo(firstVol, totalVols, cur, labels) {
  docInfo.reInit(firstVol, totalVols, cur, labels);
}
function writeBfnnStart(t,s) { docInfo.writeStart(t,s); }
function writeBfnnEnd()      { docInfo.writeEnd(); }
function writeXgEnd(center)  { docInfo.setXG(center).writeEnd(); }

function xref(num) {
  function subfolder(num) {
    if (num <= 1000) return 'books';
    if (num <= 2016) return 'books2';
    if (num <= 2999) return 'books3';
    if (num >= 9000) return 'books9';
    return '';
  }
  window.open(`../${subfolder(num)}/${to4d(num)}.htm`, 'ext');
}

// typically for long series, where preloading all js files is a waste.
class SeriesContainer { // prototype: 9010
  constructor() {
    this.volNum = undefined; // default impl
    this.text   = undefined; // default impl
    this.loadWait = 300;
  }
  setLoadWait(msecs) { this.loadWait = msecs; return this; }

  isReady() { return !!this.text; } // default impl
  loadJS(vol) { throw 'Must implement SeriesContainer.loadJS()'; }
  showPage() { throw 'Must implement SeriesContainer.showPage()'; }

  show(vol, anchor) {
    this.loadJS(vol);
    this.timer = setInterval(() => {
      if (!this.isReady()) return;
      this.showPage();
      clearInterval(this.timer);
      anchor && showTop(anchor);
    }, this.loadWait);
  }
}

//////////////////////////////////////////////////////////////////////////////////////
// The following are for series, typically used for >3 in size.

// -- 妙法蓮華經淺釋 宣化上人` --
function write0119(filenum, body) {
  var pinInfo = [
    { id:119, vol:1 }, { id: 34, vol:1 }, { id:120, vol:2 }, { id:121, vol:2 },
    { id:122, vol:3 }, { id:123, vol:3 }, { id:124, vol:3 }, { id:125, vol:4 },
    { id:126, vol:4 }, { id:127, vol:4 }, { id:128, vol:4 }, { id:129, vol:4 },
    { id:130, vol:4 }, { id: 35, vol:5 }, { id:131, vol:5 }, { id:132, vol:5 },
    { id:133, vol:5 }, { id:134, vol:6 }, { id:135, vol:6 }, { id:136, vol:6 },
    { id:137, vol:6 }, { id:138, vol:6 }, { id:139, vol:6 }, { id:140, vol:7 },
    { id: 73, vol:7 }, { id:141, vol:7 }, { id:142, vol:7 }, { id:143, vol:7 },
  ];
  new (class extends DocInfo {
    constructor() {
      super();
      this.idMap = [];
      var curIdx;
      for (var i=0; i<pinInfo.length; ++i) {
        var pi = pinInfo[i];
        this.idMap[i] = pi.id;
        pi.volNum = i+1;
        if (pi.id == filenum) curIdx = i;
      }
      this.setHints(FA_HUA_PINS)
          .reInit(119, 28, this.volNum)
          .writeStart(`妙法蓮華經${FA_HUA_PINS[curIdx]}淺釋`)
          .w(SP, '<p class=TEXT030C>姚秦三藏法師鳩摩羅什譯</p>',
                 '<p class=TEXT030C>美國萬佛聖城宣化上人講述</p>')
          .writeBody(body).writeEnd();
    }
  })();
}

// -- 大佛頂首楞嚴經譯解 王治平 --
function write0145(n, body) {
  var zn = zNumber(n);
  docInfo.reInit(145, 10, n)
         .writeStart(`大佛頂首楞嚴經|（卷${zn}譯解）`, `楞嚴經譯解 卷${n}`)
         .w(SP, '<p class=TEXT030C>唐天竺沙門般剌密帝　譯<br>',
                '烏萇國沙門彌伽釋迦　譯語<br>',
                '菩薩戒弟子前正議大夫同中書門下平章事清河房融　筆受</p>', SP)
         .wIf(n>1,
              `<p class=TEXT339>卷${zn}</p>`, SP)
         .writeBody(body)
         .writeEnd();
}

// -- 地藏菩薩本願經講記 淨空法師 --
function write0166(n, body) {
  docInfo.reInit(166, 51, n)
         .writeStart(`地藏菩薩本願經講記||（第${zNumber(n)}卷）`, `地藏經講記 卷${n}`)
         .w(SP, '<p class=TEXT030C>淨空法師主講<br>新加坡淨宗學會錄影室</p>', SP)
         .writeBody(body)
         .writeEnd();
}

// -- 恆河大手印 元音老人 --
function write0383(n, body) {
  var zn = zNumber(n);
  docInfo.reInit(383, 17, n)
         .writeStart(`恆河大手印||（第${zn}講）`, `恆河大手印 第${n}講`)
         .w(SP, '<p class=TEXT030C>元音老人 著</p>', SP)
         .wIf(n>1,
              `<p class=KEPAN>第${zn}講</p>`, SP)
         .writeBody(body)
         .writeEnd();
}

// -- 太上感應篇例證語譯 釋海山‧釋大恩‧釋昌臻主編 --
function write0608(n, body) {
  var zn = zNumber(n);
  docInfo.reInit(608, 4, n)
         .writeStart(`太上感應篇例證語譯|| 卷${zn}`, `太上感應篇例證 卷${n}`)
         .w(SP, '<p class=TEXT030C>釋海山‧釋大恩‧釋昌臻主編</p>', SP)
         .writeBody(body)
         .writeEnd();
}

// -- 佛頂文句 智旭大師 --
function write0881(n, body) {
  var zn = zNumber(n);
  var subttl = (n==0) ? '玄義' : `卷第${zn}`;
  docInfo.reInit(880, 11, n+1, ['玄義','一','二','三','四','五','六','七','八','九','十'])
         .writeStart(`大佛頂如來密因修證了義<br>諸菩薩萬行首楞嚴經文句||（${subttl}）`, `佛頂文句${subttl}`)
         .w(SP, '<p class=TEXT030C>智旭大師著<p>', SP)
         .w(n>0,
            `<p class=KEPAN>大佛頂如來密因修證了義諸菩薩萬行首楞嚴經 【文句卷第${zn}】</p>`, SP)
         .w('<p class=TEXT align=right>唐天竺沙門般剌密諦譯經　<br>明菩薩沙彌古吳智旭文句　',
            n<7 ? '</p>' : '<br>菩薩比丘溫陵道昉參訂　</p>', SP)
         .writeBody(body)
         .writeEnd();
}

//  -- 彌陀疏鈔演義 淨空會本 --
function write0900(n, body) {
  var zn = zNumber(n);
  docInfo.reInit(900, 4, n)
         .writeStart(`佛說阿彌陀經疏鈔演義會本|（卷第${zn}）`, `彌陀疏鈔演義會本 第${n}`)
         .w(SP, '<p class=TEXT030C>明古杭雲棲寺 沙門袾宏述<br>',
                '明古杭雲棲寺 　古德演義<br>',
                '民國華藏蓮社 　淨空會本</p>', SP,
                `<p class=KEPAN>佛說阿彌陀經疏鈔演義本卷第${zn}</p>`, SP)
         .writeBody(body)
         .writeEnd();
}

//  -- 佛學常見辭彙 陳義孝居士 --
function write0592(n, body) {
  var zn = zNumber(n);
  function subttl(n) { return (n >= 6) ? '十六畫～' : `${zNumber((n-1)*3+1)}畫～${zNumber((n-1)*3+3)}畫`; }
  function lnk(st) {
    var uri;
    switch(st) {
    case 1: case 2: case 3:    uri = `0592.htm#a0${st}`; break;
    case 4: case 5: case 6:    uri = `0593.htm#a0${st}`; break;
    case 7: case 8: case 9:    uri = `0594.htm#a0${st}`; break;
    case 10: case 11: case 12: uri = `0595.htm#a${st}`; break;
    case 13: case 14: case 15: uri = `0596.htm#a${st}`; break;
    default:                   uri = `0597.htm#a${st}`; break;
    }
    st = zNumber(st);
    if (st.startsWith('二十') && st.length > 2) st = '廿' + st.substring(2);
    else if (st.startsWith('三十三')) st = '卅三';
    return `<a href="${uri}">${st}劃</a>`;
  }
  docInfo.reInit(592, 6, n)
         .writeStart(`佛學常見辭彙 |（${subttl(n)}）`)
         .w(SP, '<p class=TEXT030C>陳義孝居士編<br>竺摩法師鑑定</p>', SP,
            '<p class=TEXTC>【<a href="0592S.htm">搜索工具</a>】&nbsp;&nbsp;');
  for (var i=1; i<=26; ++i) {
    switch(i) {
    case 1:  break;
    case 15: docInfo.w('<br>'); break;
    default: docInfo.w('&nbsp;&nbsp;'); break;
    }
    docInfo.w(lnk(i));
  }
  docInfo.w('&nbsp;&nbsp;', lnk(33), '</p>')
         .writeBody(body).writeEnd();
}

// -- 法華經講演錄 太虛大師 --
function write1037(n, body) {
  docInfo.setHints(FA_HUA_PINS)
         .reInit(1037, 28, n)
         .writeStart(`法華經通議||（${FA_HUA_PINS[n-1]}第${zNumber(n)}）`)
         .w(SP, '<p class=TEXT030C>太虛大師講述<br>民國十年秋在北京</p>', SP)
         .writeBody(body)
         .writeEnd();
}

// -- 楞嚴經通議 憨山大師 --
function write1644(n, body) {
  docInfo.reInit(1644, 10, n)
         .writeStart(`楞嚴經通議| 卷${zNumber(n)}`)
         .w(SP, '<p class=TEXT030C>明‧憨山大師著</p>', SP)
         .wIf(n>1,
              '<p class=TEXT align=right>唐天竺沙門般剌密帝譯　<br>',
                    '烏萇國沙門釋迦彌伽譯語　<br>',
                    '菩薩戒弟子清河房融筆受　<br>',
                    '明南嶽沙門憨山釋德清述　</p>', SP)
         .writeBody(body)
         .writeEnd('<a href="1643.htm">懸鏡</a>');
}

// -- 簡明成唯識論白話講記 于凌波居士 --
function write2088(n, subttl, body) {
  new (class extends DocInfo {
    constructor() {
      super();
      var zn = zNumber(n);
      this.reInit(2088, 6, n)
          .writeStart(`簡明成唯識論白話講記||（第${zn}篇 ${subttl}）`, `成唯識論白話講記 篇${zn}`)
          .w(SP, '<p class=TEXT030C>于凌波居士講授<br>佛光山叢林學院．臺中慈明佛學研究所佛學講義</p>', SP)
          .writeBody(body)
          .writeEnd();
    }
    writeSeriesNav(links) {
      var toc = [
`釋歸敬頌 釋難破執<br>標宗歸識 彰能變體
序
歸敬頌與造釋願由
釋難破執．破實我
釋難破執．破實法
釋難破執．破餘乘
釋難破執．釋外妨難
彰能變體`,

`異熟能變識詮釋
三相門
所緣行相門
心所相應門
五受相應門
三性分別門
心所例同門
因果譬喻門
伏斷位次門
如何證明有第八阿賴耶識——五教證
如何證明有第八阿賴耶識——十理證`,

`思量能變識詮釋
舉體出名門
所依門
所緣門
體性行相門
合解染俱相應二門
三性分別門
界繫分別門
起滅分位門
如何證明有第七識`,

`了境能變識詮解
能變差別門
自性行相門
三性分別門
心所相應門．泛說六位心所
三受門
心所相應門．詳釋六位心所
所依門．俱不俱轉門
起滅分位門
綜合分別八識`,

`廣釋所變 釋違理難<br>釋違教難 唯識實性
正辯唯識
問答辯難
釋違理難．心法生起的原由
四緣、十因、五果
釋違理難．有情生死相續的由來
惑、業、苦與十二有支
釋違教難．三種自性
釋違教難．三種無性與唯識實性`,

`明唯識位<br>唯識五位修行
總明五位
釋資糧位
釋加行位
釋通達位
釋修習位
釋究竟位` ];
      var i, len = toc.length;
      for (i=0; i<len; ++i) toc[i] = toc[i].split('\n');
      this.w('<center><hr><table border=0 cellspacing=0 cellpadding="5px">');
      this.w('<tr>');
      for (i=0; i<len; ++i) {
        this.w('<td align=center valign=top>');
        if (this.volNum == i+1)
          this.w(`<cur>第${zNumber(i+1)}篇</cur>`);
        else
          this.w(`<a href="${2088+i}.htm">第${zNumber(i+1)}篇</a>`);
        this.w(`<br>${toc[i][0]}</td>`);
      }
      this.w('</tr><tr>');
      this.w('</tr>');
      this.w('</table></center>');
    }
  })();
}

//////////////////////////////////////////////////////////////////////////////////////
// The following are for special syntax support.

// -- 海仁法師 大佛頂首楞嚴經講記 --
function write1875(n, body) {
  new (class extends DocInfo {
    constructor() {
      super();
      this.VERSES = getHaiRenVerses();
      this.reInit(1875, 10, n)
          .writeStart(`大佛頂首楞嚴經講記||（卷第${zNumber(n)}）`, `楞嚴經 海仁講記 卷${n}`)
          .w(SP, '<p class=TEXT030C>海仁老法師主講<br>受業弟子釋文珠筆記</p>', n>1 ? SP : '')
          .writeBody(body)
          .writeEnd();
    }
    writeln(ln, lnnum) {
      if (ln.startsWith('#HR:')) {
        var num = ln.substring(4).trim(),
            key = ' ABCDEFGHIJ'[docInfo.volNum] + num;
        ln = docInfo.VERSES[key];
        w('<p class=VERSE>', terse ? '' : `<verseNum>${trimLead0s(num)}</verseNum>`, ln, '</p>', SP);
        return;
      }
      super.writeln(ln, lnnum);
    }
  })();
}

// -- 圓瑛大師 大佛頂首楞嚴經講義 --
function write1472(n, body) {
  new (class extends DocInfo {
    constructor() {
      super();
      this.reInit(1472, 24, n)
          .writeStart(`大佛頂首楞嚴經講義||第${zNumber(n)}卷`, `楞嚴經 圓瑛講義 卷${n}`)
          .w(SP, '<p class=TEXT030C>圓瑛大師著</p>')
          .wIf(n>1,
               '<p class=KEPAN>大佛頂如來密因修證了義諸菩薩萬行首楞嚴經講義</p>', SP,
               '<p class=TEXT align=right>福州鼓山湧泉禪寺圓瑛弘悟述受法弟子明暘日新敬校　</p>', SP)
          .writeBody(body)
          .writeEnd();
    }
    writeln(ln, lnnum) {
      if (ln.startsWith('#YY:')) {
        var idx = ln.indexOf('#', 4), num = ln.substring(4,idx).trim();
        ln = ln.substring(idx+1);
        w('<p class=VERSE>');
        if (!terse) {
          var id = (docInfo.volNum < 10 ? '0' : '') + docInfo.volNum + num;
          w(`<verseNum id='${id}'>${num}</verseNum>${ln}`);
        }
        w('</p>', SP);
        return;
      }
      super.writeln(ln, lnnum);
    }
    writeSeriesNav(links) {
      if (this.volNum <= 1) w('<inv>&laquo;</inv>');
      else w(`<a href="${this.getIdAt(this.volNum-1)}.htm">&laquo;</a>`);
      for (var i=1; i<=this.totalVols; ++i) {
        var sutraVol = null, lbl = i;
        if (this.labels) lbl = this.labels[i-1];
        else if (i <= 10) lbl = this.zdigits[i]; // 漢字數字
        switch(i) {
        case  1: sutraVol = '經'; break;
        case  3: sutraVol = '二'; break;
        case  6: sutraVol = '三'; break;
        case  9: sutraVol = '四'; break;
        case 12: sutraVol = '五'; break;
        case 14: sutraVol = '六'; break;
        case 17: sutraVol = '七'; break;
        case 19: sutraVol = '八'; break;
        case 21: sutraVol = '九'; break;
        case 23: sutraVol = '十'; break;
        }
        if (sutraVol)
          lbl = `<ruby style="ruby-position:under">${lbl}` +
                `<rt style="font-size:16px; margin-top:10px">${sutraVol}</rt></ruby>`;
        if (i == this.volNum) w(`&nbsp;<cur>${lbl}</cur>`);
        else w(`&nbsp;<a class="seriesnav" href="${this.getIdAt(i)}.htm">${lbl}</a>`);
      }
      if (this.volNum >= this.totalVols) w('&nbsp;<inv>&raquo;</inv>');
      else w(`&nbsp;<a href="${this.getIdAt(this.volNum+1)}.htm">&raquo;</a>`);
      if (links) w('　', links);
    }
  })();
}

// -- 大佛頂首楞嚴經正脈疏 交光大師 --
function write1762(n, body) {
  new (class extends DocInfo {
    constructor() {
      super();
      this.reInit(1762, 38, n);
      if (n == 1) {
        this.writeStart(`大佛頂首楞嚴經正脈疏||序`, `楞嚴經正脈疏序`)
            .w(SP, '<p class=TEXT030C>明 交光大師 述</p>');
      } else {
        var subttl = this.getSubTitle(), zn = zNumber(n+2);
        this.writeStart(`大佛頂首楞嚴經正脈疏||第${zn}卷（${subttl}）`, `楞嚴經正脈疏卷${n+2}`)
            .w(SP, '<p class=TEXT030C>明 交光大師 述</p>')
            .wIf(n==38,
                 SP, '<p class=TEXTC><a href="#a01">大佛頂首楞嚴經正脈疏卷四十</a></p>',
                 '<p class=TEXTC><a href="#a02">刊楞嚴正脈後跋</a></p>')
            .w(`<p class=TEXT339><p class=KEPAN>大佛頂首楞嚴經正脈疏卷${zn}（${subttl}）</p>`,
               '<p class=TEXT align=right>明京都西湖沙門交光真鑑述</p>',
               '<p class=TEXT align=right>蒲州萬固沙門妙峰福登校</p>', SP);
      }
      this.writeBody(body).writeEnd();
    }
    getSubTitle() {
                   // 懸示 一 二 三 四 五 六 七 八 九 十
      var sutraInfo = [ 3, 3, 4, 3, 5, 3, 4, 2, 4, 3, 3 ];
      var v2sutra = [], vn = 3;
      for (var i=0; i<sutraInfo.length; ++i) {
        var pts = sutraInfo[i];
        for (var j=1; j<=pts; ++j)
          v2sutra.push({v:vn++, sutraV:i, sutraNum:j});
      }
      var info = v2sutra[this.volNum-2];
      var base = (info.sutraV<1) ? '懸示' : '經文卷';
      var part;
      if (info.sutraV < 1) part = '上中下'[info.sutraNum-1];
      else part = `${zNumber(info.sutraV)}之${zNumber(info.sutraNum)}`;
      return base + part;
    }
    writeSeriesNav(links) {
      var SEP = '&nbsp;', me = this;
      function a(sutra) {
        if (!sutra) { // 序
          if (me.volNum == 1) w('<cur>序</cur>');
          else w('<a class=seriesnav href="1762.htm">序</a>');
          return;
        }
        w(SEP, `<ruby style="ruby-position:under; text-decoration:underline; text-decoration-style:double">`);
        if (sutra == '科判圖表') {
          w('<dim>一&nbsp;二&nbsp;三</dim>');
          sutra = '<dim>科判圖表</dim>';
        } else {
          for (var i=1; i<arguments.length; ++i) {
            if (i>1) w(SEP);
            var vn = arguments[i], ndisp = (vn<10) ? zNumber(vn) : vn;
            if (me.volNum == vn-2) w(`<cur>${ndisp}</cur>`);
            else w(`<a class=seriesnav href="${1762+vn-3}.htm">${ndisp}</a>`);
          }
        }
        w(`<rt style="font-size:16px; margin-top:5px">${sutra}</rt></ruby>`);
      }
      w('<p class=TEXT>&nbsp;</p>');
      a(null); w(SEP);
      a('科判圖表');
      a('懸示', 4, 5, 6);
      a('經卷一', 7, 8, 9);
      a('卷二', 10, 11, 12, 13);
      a('卷三', 14, 15, 16);
      a('卷四', 17, 18, 19, 20, 21);
      a('卷五', 22, 23, 24);
      a('卷六', 25, 26, 27, 28);
      a('卷七',   29, 30);
      a('卷八', 31, 32, 33, 34);
      a('卷九', 35, 36, 37);
      a('經卷十', 38, 39, 40);
    }
  })();
}
