const zdigits = '〇一二三四五六七八九十';
function zNumber(n) { // 0 to 999
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
function toW(n, w, c) {
  n = '' + n;
  if (!c) c = ' ';
  while (n.length < w) n = c + n;
  return n;
}
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

const SP = '<LNSP></LNSP>', ASIS = 'asis';
var terse = get('terse');

class DocInfo {
  constructor() {
    this.defaultClass = 'TEXT';
    docInfo = this; // singleton
  }
  reInit(firstVol, totalVols, vol, labels) {
    this.firstVolNum = firstVol;
    this.totalVols = totalVols;
    this.labels = labels;
    this.volNum = vol || 1;
    return this;
  }
  setMetaDelim(l, r) { this.metaLeft = l; this.metaRight = r||l; return this; }
  setXG(endCenter) { this.isXG = true; this.endCenter = endCenter; return this; }
  set(k,v) { k && v && (this[k]=v); return this; }
  writeStart(ttl, docTtl) {
    // ttl can have | indicating subtitle; or || for subtitle with line break

    w(`<body lang=ZH-TW link=blue vlink=purple background="../books/textbackground.jpg"
       class="Normal" bgcolor="#ffffff">`,
      `<div class=bookClean style='layout-grid:18.0pt'>`); // content starts...
    if (this.isXG && this.endCenter)
      w('<table><tr><td>');

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
    w(`<p class=TITLE>${ttl}</p>`);
    document.title = docTtl || ttl;
    return this;
  }
  writeEnd(links) {
    if (this.firstVolNum) {
      function fname(pnum) {
        if (pnum < 1000) pnum = '0' + pnum;
        return terse ? `${pnum}.htm?terse` : `${pnum}.htm`;
      }
      w(SP, '<div class=endBar>');
      if (this.volNum <= 1) w('<inv>&laquo;</inv>');
      else w(`<a href="${fname(this.firstVolNum+this.volNum-2)}">&laquo;</a>`);
      for (var i=1; i<=this.totalVols; ++i) {
        var lbl = i;
        if (this.labels) lbl = this.labels[i-1];
        else if (this.totalVols <= 10) lbl = zdigits[i]; // 漢字數字
        else if (i<10) lbl = '&nbsp;' + i;
        if (i == this.volNum) w(`&nbsp;<cur>${lbl}</cur>`);
        else w(`&nbsp;<a href="${fname(this.firstVolNum+i-1)}">${lbl}</a>`);
      }
      if (this.volNum >= this.totalVols) w('&nbsp;<inv>&raquo;</inv>');
      else w(`&nbsp;<a href="${fname(this.firstVolNum+this.volNum)}">&raquo;</a>`);
      if (links) w('　', links);
      w('</div>');
    }
    w('</div>'); // ...content ends
    if (this.isXG)
      w(this.endCenter
        ? '</td></tr><tr><td><div class=endImageXG></div></td></tr></table>'
        : '<div class=endImageXG></div>');
    else
      w('<div class=endImage title="本頁經信裹居士重新編碼、清理、補正"></div>');
    w('</body></html>');
    return this;
  }
  writeBody(txt) {
    // The features are:
    // <Line Format>
    //   1. Each line is a unit, except for a few special cases.
    //      The content will be rendered as-is, decorated by <p>...</p>.
    //   2. For each line, the CSS class name is in the leading /.../.
    //      The default CSS class is "TEXT".
    //   3. Pseudo class "TEXTR" is rendered as <p class=TEXT align=right>.
    //   4. If a page uses / as a regular leading character, [...] can be
    //      used instead. This is global, so either /.../ or [...].
    // <Anchor>
    //   5. If the line has an anchor, set in the tag like /TEXT:a01/.
    //      Can have multiple anchors, separated by comma.
    //      Regular <a name=""></a> works, but not as elegant.
    // <Multi-Line>
    //   6. Lines ending with \ are concatenated with <br>.
    //   7. An empty line serves as a <LNSP></LNSP>.
    //   8. <html>...</html> enclosed blocks are rendered as-is.
    // <Extension>
    //   9. Override writeln() to support ad hoc syntax.
    //      Don't forget to call super.writeln() for regular content.

    this.inHtml = this.inJS = false;
    var a = txt.split('\n'), len = a.length;
    for (var i=0; i<len; ++i) {
      var ln = a[i];
      while (ln.endsWith('\\') && i<len)
        ln = ln.substring(0,ln.length-1) + '<br>' + a[++i];
      if (!ln || (ln.trim().length == 0)) { w(SP); continue; }
      if (ln.endsWith('|')) ln = ln.substring(0, ln.length-1); // trailing | is just visual
      this.writeln(ln, i+1);
    }
    return this;
  }
  writeln(ln, lnnum) {
    if (!this.metaLeft) {
      // first guess the meta left/right, using // or []
      if (ln[0] == '/') this.setMetaDelim('/');
      else if (ln[0] == '[') this.setMetaDelim('[',']');
    }

    if (this.inHtml) {
      if (ln.endsWith('</html>')) {
        this.inHtml = false;
        ln = ln.substring(0, ln.length-7);
      }
      w(ln, '\n');
      return;
    }

    if (this.inJS) {
      if (ln.endsWith('</html:js>')) {
        this.inJS = false;
        ln = ln.substring(0, ln.length-10) + '</script>';
      }
      w(ln.replaceAll('\\`', '`'), '\n');
      return;
    }

    if (ln.startsWith('<html>')) { // e.g. 0117, 0875
      ln = ln.substring(6);
      if (ln.endsWith('</html>'))
        ln = ln.substring(0, ln.length-7);
      else
        this.inHtml = true;
      w(ln, '\n');
      return;
    }

    if (ln.startsWith('<html:js>')) { // e.g. 0875, 1731
      ln = ln.substring(9);
      if (ln.endsWith('</html:js>'))
        ln = '<script>' + ln.substring(0, ln.length-10) + '</script>';
      else {
        this.inJS = true;
        ln = '<script>' + ln;
      }
      w(ln.replaceAll('\\`', '`'), '\n');
      return;
    }

    // process <a!999>; e.g. 0010
    ln = ln.replace(/<a!\d+>/g,
            (m) => `<a href="javascript:xref(${m.substring(3,m.length-1)})")>`);

    if (ln[0] != this.metaLeft) {
      w(`<p class=${this.defaultClass}>${ln}</p>`);
      return;
    }

    var idx = ln.indexOf(this.metaRight, 1);
    if (idx < 0) throw `Missing meta closing delimiter ${this.metaRight} at line ${lnnum}.`;
    var cls = ln.substring(1,idx).split(':');
    ln = ln.substring(idx+1);
    if (cls.length > 1) {
      var anchors = cls[1].split(',');
      for (var k in anchors)
        ln = `<a name="${anchors[k]}"></a>${ln}`;
    }
    cls = cls[0] || this.defaultClass;
    if (cls == 'TEXTR') cls = 'TEXT align=right';
    if (cls.endsWith('align=right') && !ln.endsWith('　'))
      ln += '　';
    w(`<p class=${cls}>${ln}</p>`);
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
  window.open(`../${subfolder(num)}/${toW(num,4,'0')}.htm`, 'ext');
}

//////////////////////////////////////////////////////////////////////////////////////
// The following are for series, typically used for >3 in size.

// -- 大佛頂首楞嚴經譯解 王治平 --
function write0145(n, body) {
  setDocInfo(145, 10, n);
  var zn = zNumber(n);
  writeBfnnStart(`大佛頂首楞嚴經|（卷${zn}譯解）`, `楞嚴經譯解 卷${n}`);
  w(SP, '<p class=TEXT030C>唐天竺沙門般剌密帝　譯<br>',
                          '烏萇國沙門彌伽釋迦　譯語<br>',
                          '菩薩戒弟子前正議大夫同中書門下平章事清河房融　筆受</p>', SP);
  if (n>1) w(`<p class=TEXT339>卷${zn}</p>`, SP);
  body && docInfo.writeBody(body).writeEnd();
}

// -- 地藏菩薩本願經講記 淨空法師 --
function write0166(n, body) {
  setDocInfo(166, 51, n);
  writeBfnnStart(`地藏菩薩本願經講記||（第${zNumber(n)}卷）`, `地藏經講記 卷${n}`);
  w(SP, '<p class=TEXT030C>淨空法師主講<br>新加坡淨宗學會錄影室</p>', SP);
  body && docInfo.writeBody(body).writeEnd();
}

// -- 恆河大手印 元音老人 --
function write0383(n, body) {
  setDocInfo(383, 17, n);
  var zn = zNumber(n);
  writeBfnnStart(`恆河大手印||（第${zn}講）`, `恆河大手印 第${n}講`);
  w(SP, '<p class=TEXT030C>元音老人 著</p>', SP);
  if (n>1) w(`<p class=KEPAN>第${zn}講</p>`, SP);
  body && docInfo.writeBody(body).writeEnd();
}

// -- 太上感應篇例證語譯 釋海山‧釋大恩‧釋昌臻主編 --
function write0608(n, body) {
  setDocInfo(608, 4, n);
  var zn = zNumber(n);
  writeBfnnStart(`太上感應篇例證語譯|| 卷${zn}`, `太上感應篇例證 卷${n}`);
  w(SP, '<p class=TEXT030C>釋海山‧釋大恩‧釋昌臻主編</p>', SP);
  body && docInfo.writeBody(body).writeEnd();
}

// -- 佛頂文句 智旭大師 --
function write0881(n, body) {
  setDocInfo(881, 10, n);
  var zn = zNumber(n);
  writeBfnnStart(`大佛頂如來密因修證了義<br>諸菩薩萬行首楞嚴經文句||（卷第${zn}）`, `佛頂文句 卷${n}`);
  w(SP, '<p class=TEXT030C>智旭大師著<p>', SP, 
    `<p class=KEPAN>大佛頂如來密因修證了義諸菩薩萬行首楞嚴經 【文句卷第${zn}】</p>`, SP,
    '<p class=TEXT align=right>唐天竺沙門般剌密諦譯經　<br>明菩薩沙彌古吳智旭文句　',
    n<7 ? '</p>' : '<br>菩薩比丘溫陵道昉參訂　</p>', SP);
  body && docInfo.writeBody(body).writeEnd('<a href="0880.htm">玄義</a>');
}

//  -- 彌陀疏鈔演義 淨空會本 --
function write0900(n, body) {
  setDocInfo(900, 4, n);
  var zn = zNumber(n);
  writeBfnnStart(`佛說阿彌陀經疏鈔演義會本|（卷第${zn}）`, `彌陀疏鈔演義會本 第${n}`);
  w(SP, '<p class=TEXT030C>明古杭雲棲寺 沙門袾宏述<br>',
                          '明古杭雲棲寺 　古德演義<br>',
                          '民國華藏蓮社 　淨空會本</p>', SP,
    `<p class=KEPAN>佛說阿彌陀經疏鈔演義本卷第${zn}</p>`, SP);
  body && docInfo.writeBody(body).writeEnd();
}

// -- 楞嚴經通議 憨山大師 --
function write1644(n, body) {
  setDocInfo(1644, 10, n);
  writeBfnnStart(`楞嚴經通議| 卷${zNumber(n)}`);
  w(SP, '<p class=TEXT030C>明‧憨山大師著</p>', SP);

  if (n>1)
    w('<p class=TEXT align=right>唐天竺沙門般剌密帝譯　<br>',
      '烏萇國沙門釋迦彌伽譯語　<br>',
      '菩薩戒弟子清河房融筆受　<br>',
      '明南嶽沙門憨山釋德清述　</p>', SP);
  body && docInfo.writeBody(body).writeEnd('<a href="1643.htm">懸鏡</a>');
}

// -- 簡明成唯識論白話講記 于凌波居士 --
function write2088(n, subttl, body) {
  setDocInfo(2088, 6, n);
  var zn = zNumber(n);
  writeBfnnStart(`簡明成唯識論白話講記||（第${zn}篇 ${subttl}）`, `成唯識論白話講記 篇${zn}`);
  w(SP, '<p class=TEXT030C>于凌波居士講授<br>佛光山叢林學院．臺中慈明佛學研究所佛學講義</p>', SP);
  body && docInfo.writeBody(body).writeEnd();
}

//////////////////////////////////////////////////////////////////////////////////////
// The following are for special syntax support.

// -- 海仁法師 大佛頂首楞嚴經講記 --
function write1875(n, body) {
  new (class extends DocInfo {
    constructor() {
      super();
      this.VERSES = getHaiRenVerses();
      this.reInit(1875, 10, n);
      this.writeStart(`大佛頂首楞嚴經講記||（卷第${zNumber(n)}）`, `楞嚴經 海仁講記 卷${n}`);
      w(SP, '<p class=TEXT030C>海仁老法師主講<br>受業弟子釋文珠筆記</p>');
      if (n>1) w(SP);
      this.writeBody(body).writeEnd();
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
      this.reInit(1472, 24, n);
      this.writeStart(`大佛頂首楞嚴經講義||第${zNumber(n)}卷`, `楞嚴經 圓瑛講義 卷${n}`);
      w(SP, '<p class=TEXT030C>圓瑛大師著</p>');
      if (n>1)
        w('<p class=KEPAN>大佛頂如來密因修證了義諸菩薩萬行首楞嚴經講義</p>', SP,
          '<p class=TEXT align=right>福州鼓山湧泉禪寺圓瑛弘悟述受法弟子明暘日新敬校　</p>', SP);
      this.writeBody(body).writeEnd();
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
  })();
}
