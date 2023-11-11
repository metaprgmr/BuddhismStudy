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

var lastDivId;

// A global "parts" variable is assumed.
function write楞嚴經圓瑛大師科判(divId, part, terse) {
  if (divId) lastDivId = divId; else divId = lastDivId;
  var partNum, buf = new Buffer();
  switch (part) {
  case 1: case '1': part = 1; partNum = '一'; break;
  case 2: case '2': part = 2; partNum = '二'; break;
  case 3: case '3': part = 3; partNum = '三'; break;
  case 4: case '4': part = 4; partNum = '四'; break;
  case 5: case '5': part = 5; partNum = '五'; break;
  case 6: case '6': part = 6; partNum = '六'; break;
  default:  part = 0; partNum = ''; break;
  }

  buf.w('<h2>圓瑛大師《楞嚴經講義》');
  if (part > 0) buf.w('<a href="?part=&terse=', terse, '">科判</a>'); else buf.w('科判');
  buf.w('</h2>');
  var partInfo = getPartInfo(part);

  buf.w('<table border="0" cellspacing="0px" cellpadding="0" style="min-width:500px">');
  buf.w('<caption><a href="javascript:write楞嚴經圓瑛大師科判(null,', part || '\'\'', ',', terse ? '0' : '1', ')">', terse ? '詳細版' : '精簡版', '</a>');
  if (!terse) buf.w('&nbsp;&nbsp;<a href="YuanYing科判Verses.html">經文參考</a>');
  buf.w('</caption>');
  var kepan = parts[part];
  var i, ln, a = kepan.split('\n'), maxlen = 50;
  for (i in a) {
    ln = a[i];
    if (ln.startsWith('//')) continue;
    if (ln.length > maxlen) maxlen = ln.length;
  }
  for (i in a) {
    ln = a[i];
    var anchor = '';
    if (ln.length === 0 || ln.startsWith('//')) continue;
    var verseNum = '';
    if (!terse) {
      var volNum = ln.substring(2,3);
      verseNum = ln.substring(3,6);
      switch (volNum) {
      case 'A': verseNum = '　一&nbsp;' + verseNum; break;
      case 'B': verseNum = '　二&nbsp;' + verseNum; break;
      case 'C': verseNum = '　三&nbsp;' + verseNum; break;
      case 'D': verseNum = '　四&nbsp;' + verseNum; break;
      case 'E': verseNum = '　五&nbsp;' + verseNum; break;
      case 'F': verseNum = '　六&nbsp;' + verseNum; break;
      case 'G': verseNum = '　七&nbsp;' + verseNum; break;
      case 'H': verseNum = '　八&nbsp;' + verseNum; break;
      case 'I': verseNum = '　九&nbsp;' + verseNum; break;
      case 'J': verseNum = '十　&nbsp;' + verseNum; break;
      case 'K': verseNum = '十一&nbsp;' + verseNum; break;
      case 'L': verseNum = '十二&nbsp;' + verseNum; break;
      case 'M': verseNum = '十三&nbsp;' + verseNum; break;
      case 'N': verseNum = '十四&nbsp;' + verseNum; break;
      case 'O': verseNum = '十五&nbsp;' + verseNum; break;
      case 'P': verseNum = '十六&nbsp;' + verseNum; break;
      case 'Q': verseNum = '十七&nbsp;' + verseNum; break;
      case 'R': verseNum = '十八&nbsp;' + verseNum; break;
      case 'S': verseNum = '十九&nbsp;' + verseNum; break;
      case 'T': verseNum = '廿　&nbsp;' + verseNum; break;
      case 'U': verseNum = '廿一&nbsp;' + verseNum; break;
      case 'V': verseNum = '廿二&nbsp;' + verseNum; break;
      case 'W': verseNum = '廿三&nbsp;' + verseNum; break;
      case 'X': verseNum = '廿四&nbsp;' + verseNum; break;
      case 'Y': verseNum = '廿五&nbsp;' + verseNum; break;
      case 'Z': verseNum = '廿六&nbsp;' + verseNum; break;
      }
    }
    var kepanHint = '';
    var idx = ln.lastIndexOf('：');
//    if (idx > 0) kepanHint = ln.substring(idx+1).trim(); // if kepan font too small, use hint to help
    var kepanLine = ln.substring(6);
    idx = kepanLine.indexOf('*');
    var isKey = idx > 0;
    if (isKey) {
      var idx1 = kepanLine.lastIndexOf('　', idx) + 1;
      ln = kepanLine;
      kepanLine = ln.substring(0, idx1) + '<font class="keyLine">' + ln.substring(idx1, idx) + '</font>' + ln.substring(idx+1);
    }
    else if (terse) continue;
    buf.w('<tr><td valign="top" nowrap style="font-size:12px; background-color:#e8e8e8; border-bottom:1px #fff solid">', anchor,
          '<span title="', kepanHint, '">', kepanLine, '</span>',
          '</td>');
    if (!terse)
      buf.w('<td valign="top" align="right" nowrap style="font-size:12px; color:gray; ">&nbsp;', verseNum, '</td>');
    buf.w('</tr>');
  }
  buf.w('</table>');
  buf.render(divId);
}

// A global "parts" variable is assumed.
function write楞嚴經海仁法師科判(divId, part, terse) {
  if (divId) lastDivId = divId; else divId = lastDivId;
  var partNum, buf = new Buffer();
  switch (part) {
  case 1: case '1': part = 1; partNum = '一'; break;
  case 2: case '2': part = 2; partNum = '二'; break;
  case 3: case '3': part = 3; partNum = '三'; break;
  case 4: case '4': part = 4; partNum = '四'; break;
  case 5: case '5': part = 5; partNum = '五'; break;
  case 6: case '6': part = 6; partNum = '六'; break;
  default:  part = 0; partNum = ''; break;
  }

  buf.w('<h2>海仁法師《楞嚴經講義》');
  if (part > 0) buf.w('<a href="?part=&terse=', terse, '">科判</a>'); else buf.w('科判');
  buf.w('</h2>');
  var partInfo = getPartInfo(part);
  if (partInfo.caption && (partInfo.caption != '序分'))
    buf.w('<h4>正宗分六之第', partNum, '：', partInfo.caption, '</h4>');

  buf.w('<table border="0" cellspacing="0px" cellpadding="0" style="min-width:500px">');
  buf.w('<caption><a href="javascript:write楞嚴經海仁法師科判(null,', part || '\'\'', ',', terse ? '0' : '1', ')">', terse ? '詳細版' : '精簡版', '</a>');
  if (!terse) buf.w('&nbsp;&nbsp;<a href="HaiReng科判Verses.html">經文參考</a>');
  buf.w('</caption>');
  var kepan = parts[part];
  var i, ln, a = kepan.split('\n'), maxlen = 50;
  for (i in a) {
    ln = a[i];
    if (ln.startsWith('//')) continue;
    if (ln.length > maxlen) maxlen = ln.length;
  }
  for (i in a) {
    ln = a[i];
    var anchor = '';
    if (ln.length === 0 || ln.startsWith('//')) continue;
    var verseNum = '';
    if (!terse) {
      var volNum = ln.substring(2,3);
      verseNum = ln.substring(3,6);
      switch (volNum) {
      case 'A': verseNum = '一&nbsp;' + verseNum; break;
      case 'B': verseNum = '二&nbsp;' + verseNum; break;
      case 'C': verseNum = '三&nbsp;' + verseNum; break;
      case 'D': verseNum = '四&nbsp;' + verseNum; break;
      case 'E': verseNum = '五&nbsp;' + verseNum; break;
      case 'F': verseNum = '六&nbsp;' + verseNum; break;
      case 'G': verseNum = '七&nbsp;' + verseNum; break;
      case 'H': verseNum = '八&nbsp;' + verseNum; break;
      case 'I': verseNum = '九&nbsp;' + verseNum; break;
      case 'J': verseNum = '十&nbsp;' + verseNum; break;
      }
    }
    var kepanHint = '';
    var idx = ln.lastIndexOf('：');
//    if (idx > 0) kepanHint = ln.substring(idx+1).trim(); // if kepan font too small, use hint to help
    var kepanLine = ln.substring(6);
    idx = kepanLine.indexOf('*');
    var isKey = idx > 0;
    if (isKey) {
      var idx1 = kepanLine.lastIndexOf('　', idx) + 1;
      ln = kepanLine;
      kepanLine = ln.substring(0, idx1) + '<font class="keyLine">' + ln.substring(idx1, idx) + '</font>' + ln.substring(idx+1);
    }
    else if (terse) continue;
    buf.w('<tr><td valign="top" nowrap style="font-size:12px; background-color:#e8e8e8; border-bottom:1px #fff solid">', anchor,
          '<span title="', kepanHint, '">', kepanLine, '</span>',
          '</td>');
    if (!terse)
      buf.w('<td valign="top" align="right" nowrap style="font-size:12px; color:gray; ">&nbsp;', verseNum, '</td>');
    buf.w('</tr>');
  }
  buf.w('</table>');
  buf.render(divId);
}

function write金剛經科判(kepan, verses, divisions, verseOnly, noVerse, terse) {
  w('<table border="0" cellspacing="0px" cellpadding="0">');
  var i, ln, a = kepan.split('\n'), maxlen = 50;
  for (i in a) {
    ln = a[i];
    if (ln.startsWith('//')) continue;
    if (ln.length > maxlen) maxlen = ln.length;
  }
  var bdr, hasAnchor1 = false, verseStarted = false;
  for (i in a) {
    ln = a[i];
    var anchor = '';
    if (ln.startsWith('十七')) anchor = '<a name="part2"></a>';
    else if (!hasAnchor1 && (ln.indexOf('（乙）初，序分') >= 0)) { anchor = '<a name="part1"></a>'; hasAnchor1 = true; }
    if (ln.length === 0 || ln.startsWith('//')) continue;
    var divNum = ln.substring(0,2);
    var divTitleLen = 0, divTitle = divisions[divNum] || '　　';
    if (divTitle !== '　　') divTitleLen = divTitle.length;
    var verseNum = ln.substring(3,6);
    var verse = verses[verseNum] || '';
    if (verseOnly) {
      if (verse !== '')
        w('<tr><td valign="top" align="right" nowrap style="color:gray">', verseNum, '.&nbsp;&nbsp;&nbsp;</td>',
          '<td nowrap valign="top" class="printing">', verse.replaceAll('|', '<br>'), '</td></tr>');
      continue;
    }
    if (verseNum != '   ') verseNum += '.&nbsp;&nbsp;';
    var kepanHint = '';
    var idx = ln.lastIndexOf('：');
//    if (idx > 0) kepanHint = ln.substring(idx+1).trim(); // if kepan font too small, use hint to help
    var kepanLine = ln.substring(6);
    idx = kepanLine.indexOf('*');
    var isKey = idx > 0;
    if (isKey) {
      var idx1 = kepanLine.lastIndexOf('　', idx) + 1;
      ln = kepanLine;
      kepanLine = ln.substring(0, idx1) + '<font class="keyLine">' + ln.substring(idx1, idx) + '</font>' + ln.substring(idx+1);
    }
    else if (terse) continue;
    if (divTitleLen > 0) {
      if (divNum === '　一') { divTitle = '法會因由分'; divTitleLen = divTitle.length; }
      kepanLine = divTitle + kepanLine.substring(divTitleLen-2); // -2 is for the original division title verbiage
      divTitle = '';
    }
    w('<tr><td valign="top" nowrap style="font-size:12px; background-color:#e8e8e8; border-bottom:1px #fff solid">', anchor,
      divTitle, '<span title="', kepanHint, '">', kepanLine, '</span>',
      '</td>');
    if (!verseStarted) {
      if (kepanLine.indexOf('正文上半部') > 0)
        verseStarted = true;
    }
    if (!terse) {
      bdr = verseStarted ? ' background-color:#efc; ' : '';
//    if (verseNum.startsWith('  1.'))
//      bdr += '; border-top:2px solid lightgray';
//    else if (verseNum.startsWith('184.'))
//      bdr += '; border-bottom:2px solid lightgray';
      w('<td valign="top" align="right" nowrap style="font-size:12px; color:gray; ', bdr, '">', verseNum, '</td>');
    }
    if (!noVerse) {
      bdr = verseStarted ? ' background-color:#efc;' : '';
//    if (verseStarted)
//      bdr += 'border-right:2px solid lightgray';
//    if (verseNum.startsWith('  1.'))
//      bdr += '; border-top:2px solid lightgray';
//    else if (verseNum.startsWith('184.'))
//      bdr += '; border-bottom:2px solid lightgray';
      w('<td nowrap valign="top" style="color:teal; ', bdr, '">', verse.replaceAll('|', '<br>'), '</td>');
    }
    w('</tr>');
  }
  w('</table>');
}

/* 科判模板

　　xxx （甲）初，
　　xxx 　：　（乙）初，
　　xxx 　：　　：　次，
　　xxx 　：　　：　（丙）初，
　　xxx 　：　　：　　：　次，
　　xxx 　：　　：　　：　（丁）初，
　　xxx 　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　（戊）初，
　　xxx 　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　（己）初，
　　xxx 　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　（庚）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　三，
　　xxx 　：　　：　　：　　：　　：　　：　　：　四，
　　xxx 　：　　：　　：　　：　　：　　：　　：　五，
　　xxx 　：　　：　　：　　：　　：　　：　　：　六，
　　xxx 　：　　：　　：　　：　　：　　：　　：　（辛）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　（壬）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　（癸）初，
　　xxx 　：　　：　　：　　：　　：　　：　　：　　：　　：　　：　次，
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
