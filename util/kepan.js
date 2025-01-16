function ensureInt(x, defVal) {
  if (x === 0) return 0;
  return (!x || (x == '') || isNaN(x)) ? defVal : ((typeof x === 'string') ? parseInt(x) : x)
}

function flipVisible(eid, eid1) {
  var el = e(eid);
  if (el) {
    if (el.style.display === 'none') el.style.display = 'block';
    else el.style.display = 'none';
  }

  if (eid1) flipVisible(eid1);
}

function getPartInfo(part) {
  var ret = { caption:null, firstVerseID: null }
  part = parts[part];
  if (!part) return null;
  var a = part.split('\n');
  for (var i in a) {
    var ln = a[i];
    if (ln.startsWith('//')) continue;
    if (!ret.caption) {
      // The caption for the part is the first line, without the numbering.
      // E.g. this "卷一    （乙）初，顯如來藏妙真如性圓三諦理"
      //      should yield a title of "顯如來藏妙真如性圓三諦理".
      var idx = ln.indexOf('，');
      if (idx > 0) {
        var x = ln.substring(idx+1).trim();
        if (x.endsWith('*')) x = x.substring(0, x.length-1);
        ret.caption = x;
      }
    }
    if (!ret.firstVerseID) {
      var vv = ln.substring(2,6);
      if (vv != '    ') ret.firstVerseID = vv;
    }
    if (ret.caption && ret.firstVerseID) break;
  }
  return ret;
}

class KePanLine {
  constructor(line, verseText, plainText) {
    this.rawVerseNum = line.substring(2,6).trim();
    this.volNum = line.substring(2,3).trim();
    this.verseNum = line.substring(3,6).trim();
    this.text = line.substring(6);
    if (verseText) this.verseText = verseText;
    if (plainText) this.plainText = plainText;
    var ln = this.text, idx = ln.indexOf('*'),
        cls = 'keyLine';
    if (idx < 0) {
      idx = ln.indexOf('+');
      if (idx > 0) this.isKeySecondary = true;
      cls += '1';
    }
    if (idx > 0) {
      this.isKey = true;
      var idx1 = ln.lastIndexOf('　', idx-1);
      this.text = ln.substring(0, idx1+1) + '<font class="' + cls + '">' + ln.substring(idx1+1, idx) + '</font>' + ln.substring(idx+1);
    }
  }
  debugDump() {
    console.log('rawVerseNum', this.rawVerseNum, 'volNum', this.volNum, 'verseNum', this.verseNum, 'text', this.text, 'verseText', this.verseText);
  }
  getVerseIDDisp(suggestedRawVerseNum) {
    var v = this.volNum;
    var n = this.verseNum;
    if (!v && suggestedRawVerseNum) {
      v = suggestedRawVerseNum[0];
      n = suggestedRawVerseNum.substring(1);
    }
    if (!v || !n) return '';
    switch (v) {
    case 'A': v = '　一'; break;  case 'B': v = '　二'; break; case 'C': v = '　三'; break;  case 'D': v = '　四'; break;
    case 'E': v = '　五'; break;  case 'F': v = '　六'; break; case 'G': v = '　七'; break;  case 'H': v = '　八'; break;
    case 'I': v = '　九'; break;  case 'J': v = '十　'; break; case 'K': v = '十一'; break;  case 'L': v = '十二'; break;
    case 'M': v = '十三'; break;  case 'N': v = '十四'; break; case 'O': v = '十五'; break;  case 'P': v = '十六'; break;
    case 'Q': v = '十七'; break;  case 'R': v = '十八'; break; case 'S': v = '十九'; break;  case 'T': v = '廿　'; break;
    case 'U': v = '廿一'; break;  case 'V': v = '廿二'; break; case 'W': v = '廿三'; break;  case 'X': v = '廿四'; break;
    case 'Y': v = '廿五'; break;  case 'Z': v = '廿六'; break; case 'a': v = '廿七'; break;  case 'b': v = '廿八'; break;
    case 'c': v = '廿九'; break;  case 'd': v = '卅　'; break; case 'e': v = '卅一'; break;  case 'f': v = '卅二'; break;
    case 'g': v = '卅三'; break;  case 'h': v = '卅四'; break; case 'i': v = '卅五'; break;  case 'j': v = '卅六'; break;
    case 'k': v = '卅七'; break;  case 'l': v = '卅八'; break; case 'm': v = '卅九'; break;  case 'n': v = '四十'; break;
    case 'o': v = '四一'; break;  case 'p': v = '四二'; break; case 'q': v = '四三'; break;  case 'r': v = '四四'; break;
    case 's': v = '四五'; break;  case 't': v = '四六'; break; case 'u': v = '四七'; break;  case 'v': v = '四八'; break;
    case 'w': v = '四九'; break;  case 'x': v = '五十'; break; case 'y': v = '五一'; break;  case 'z': v = '五二'; break;
    case '_': v = '　　'; n = '<inv>000</inv>'; break;
    }
    return v + '&nbsp;' + n;
  }
} // end of KePanLine.

class KePanDoc {
  constructor(kpdocText) {
    this.lines = [];
    this.maxlen = 40;
    if (kpdocText) this.addAll(kpdocText);
  }
  debugDump() {
    var len = Math.min(100, this.lines.length);
    for (var i=0; i<len; ++i)
      this.lines[i].debugDump();
    return this;
  }
  clearall() { this.lines = [] }
  addAll(kepan, verses, explanations) {
    var a = kepan.split('\n');
    for (var i in a) {
      var ln = a[i];
      if (ln.length === 0 || ln.startsWith('//')) continue;
      var id = ln.substring(2,6).trim();
      this.add(new KePanLine(ln, verses && verses[id], explanations && explanations[id]));
    }
    return this;
  }
  add(kpl) {
    if (!kpl) return;
    if (kpl.length > this.maxlen) this.maxlen = kpl.length - 6;
    this.lines.push(kpl);
  }
  getRawVerseID(lineIdx, force) { // 0-based
    var kpn = this.lines[lineIdx].rawVerseNum;
    if (kpn !== '' || !force)
      return kpn;
    // look for the next available verse ID
    for (var i=lineIdx+1; i<this.lines.length; ++i) {
      kpn = this.lines[i].rawVerseNum;
      if (kpn !== '')
        return kpn;
    }
    return '';
  }
  getVerseIDDisp(lineIdx, force) { // 0-based
    return this.lines[lineIdx].getVerseIDDisp( this.getRawVerseID(lineIdx, force) );
  }
  writeAsTRs(buf, terseLevel, forceVerseIDs, showVerse) {
    var td1 = '<td valign="top" nowrap style="font-size:12px; background-color:#e8e8e8; border-bottom:1px #fff solid">&nbsp;';
    var td2 = '<td valign="top" align="right" nowrap style="font-size:12px; color:gray">';
    var lastIDDisp = null;
    for (var i=0; i<this.lines.length; ++i) {
      var ln = this.lines[i];
      var anchor = ''; // TODO: use?
      if (!showVerse) {
        if (!ln.isKey && terseLevel) continue;
        if (terseLevel === 2 && ln.isKeySecondary) continue;
      }
      var idDisp = this.getVerseIDDisp(i, terseLevel && forceVerseIDs);
      if (idDisp != lastIDDisp)
        lastIDDisp = idDisp;
      else
        idDisp = '';
      if (idDisp.endsWith('000')) idDisp = '◼&nbsp;';
      buf.w('<tr>');
      if (terseLevel !== -1) {
        var txt = ln.text, idx = txt.indexOf('正文卷第');
        if (idx > 0) txt = txt.substring(0, idx) + '<span class="keyline">' + txt.substring(idx) + '</span>';
        buf.w(td1, anchor, txt, '&nbsp;</td>', td2, idDisp, '&nbsp;</td>');
      }
      else if (!ln.verseText)
        continue;
      if (showVerse) {
        if (!ln.plainText) {
          buf.w('<td class=VERSE>', ln.verseText || '', '</td>');
        } else {
          var eid = '_' + ln.verseNum;
          var hint = ln.plainText, maxlen = 100;
          if (hint.length > maxlen) hint = hint.substring(0,maxlen) + '......';
          buf.w('<td onclick="flipVisible(\'', eid, '\')"><span class=VERSE>', ln.verseText || '',
                '</span><span style="color:gray" title="', hint, '">□</span>',
                '<div id="', eid, '" class=PLAIN style="padding-top:5px; padding-bottom:5px; display:none">', ln.plainText, '</div></td>');
        }
      }
      buf.w('</tr>');
    }
  }
} // end of KePanDoc.

var lastDivId;

/* 科判模板

　　xxx （甲）初，
　　xxx 　：　（乙）初，
　　xxx 　：　　：　次，
　　xxx 　：　　：　（丙）初，
　　xxx 　：　　：　　：　次，
　　xxx 　：　　：　　：　三，
　　xxx 　：　　：　　：　四，
　　xxx 　：　　：　　：　（丁）初，
　　xxx 　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　（戊）初，
　　xxx 　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　（己）初，
　　xxx 　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　　：　　：　七，
　　xxx 　：　　：　　：　　：　　：　　：　八，
　　xxx 　：　　：　　：　　：　　：　　：　九，
　　xxx 　：　　：　　：　　：　　：　　：　（庚）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　　：　　：　　：　七，
　　xxx 　：　　：　　：　　：　　：　　：　　：　八，
　　xxx 　：　　：　　：　　：　　：　　：　　：　九，
　　xxx 　：　　：　　：　　：　　：　　：　　：　（辛）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　七，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　八，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　九，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　十，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　（壬）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　（癸）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（子）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（丑）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　七，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　八，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　九，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　十，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（寅）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（卯）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（辰）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（巳）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（午）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（未）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（申）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　（酉）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
*/　　 
