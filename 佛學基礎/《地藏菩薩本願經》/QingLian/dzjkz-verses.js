function toZNum(i) { return (i <= 10) ? zNumber(i) : ('' + i); }
function toAlpha(i) {
  switch(i) {
  case '一':   return 'A';
  case '二':   return 'B';
  case '三':   return 'C';
  case '四':   return 'D';
  case '五':   return 'E';
  case '六':   return 'F';
  case '七':   return 'G';
  case '八':   return 'H';
  case '九':   return 'I';
  case '十':   return 'J';
  case '十一': return 'K';
  case '十二': return 'L';
  case '十三': return 'M';
  default:     return ' ABCDEFGHIJKLM'[i];
  }
}
function ensureInt(x, defVal) { return (!x || (x == '') || isNaN(x)) ? defVal : ((typeof x === 'string') ? parseInt(x) : x) }

var myVerses, segsDisp, verseNumName;

var versesForDisplay;

class VerseData {
  constructor() { this.data = {}; }
  addForView(bookNum, verseNum, txt) {
    var id = '' + verseNum;
    while (id.length < 3) id = '0' + id;
    this.data[toAlpha(bookNum) + id] = txt;
  }
}

function getVerses() {
  if (versesForDisplay) return versesForDisplay;
  var obj = new VerseData();
  for (var i in VOLUMES) {
    var pins = VOLUMES[i].pins;
    for (var j in pins) {
      var lines = pins[j].lines;
      for (var k in lines)
        lines[k].addToVerseView(obj);
    }
  }
  return (versesForDisplay = obj.data);
}

function selectVol(title, volNum, verseNum) {
  verseNumName = 'verseNum';
  myVerses = getVerses();
  if (!segsDisp) {
    var total = 0, a = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    var keys = Object.keys(myVerses);
    for (var i in keys) {
      var k = keys[i];
      switch(k[0]) {
      case 'A': ++a[0]; break; case 'B': ++a[1]; break;
      case 'C': ++a[2]; break; case 'D': ++a[3]; break;
      case 'E': ++a[4]; break; case 'F': ++a[5]; break;
      case 'G': ++a[6]; break; case 'H': ++a[7]; break;
      case 'I': ++a[8]; break; case 'J': ++a[9]; break;
      case 'K': ++a[10]; break; case 'L': ++a[11]; break;
      case 'M': ++a[12]; break;
      }
    }
    for (var i=0; i<13; ++i) {
      total += a[i];
      a[i] = (i+1) + ':' + a[i];
    }
    segsDisp = '（共' + total + '段&nbsp;<font style="font-size:12px">' + a.join('; ') +'</font>）';
  }

  volNum = ensureInt(volNum, 1);
  if (sessionStorage.volNum != volNum) {
    sessionStorage.volNum = volNum;
    sessionStorage[verseNumName] = null;
  }
  var buf = new Buffer('　', title, ' 卷');
  for (var i=1; i<=13; ++i) {　
    var alpha = toAlpha(i);
    if (i == volNum)
      buf.w('&nbsp;<font style="color:red; background-color:yellow" title="', alpha, '">', toZNum(i), '</font>');
    else
      buf.w('&nbsp;<a href="?vid=', alpha, '" title="', alpha, '">', toZNum(i), '</a>');
  }
  buf.w('&nbsp;', segsDisp);
  buf.render('volumeNums1', 'volumeNums2');

  showText(volNum, verseNum);
}

function verseLink(volNum, vsNum, style) {
  return '<a' + (style||'') + ' href="javascript:showText(' + volNum + ',' + vsNum + ')">' +
         digit3RightAligned(vsNum) + '</a>';
}

function showText(volNum, verseNum) {
  var isAll = verseNum === 'all';
  var numVerses = isAll ? 1000 : 10;
  if (!verseNum) verseNum = sessionStorage[verseNumName];
  verseNum = ensureInt(verseNum, 1);
  sessionStorage[verseNumName] = verseNum;
  var buf = new Buffer();

  // show the text numbers
  buf.w('<table border=0><tr><td>');
  if (volNum < 1 || volNum > 13) {
    buf.render('verseNums');
    return;
  }
  var prefix = toAlpha(volNum);
  var zPref = toZNum(volNum);
  var width = 20;
  for (var i=1; ; i++) {
    var num = digit3(i), style = '';
    var v = myVerses[prefix + num];
    if (!v) break;
    if (!isAll && (i >= verseNum && i < verseNum+numVerses))
      style = ' style="background:yellow; font-weight:bold"';
    if (i == verseNum)
      buf.w('<font', style, '>', digit3RightAligned(i), '</font> ');
    else
      buf.w(verseLink(volNum, i, style), ' ');
    if (i % width === 0) buf.w('<br>');
  }
  if (!isAll) buf.w('<a href="javascript:showText(', volNum, ', \'all\')" style="font-size:12px">（全部）</a> ');
  buf.w('</td></tr></table>');
  buf.render('verseNums');

  // show the selected text
  buf.w('<table width="100%">');
  for (var i=0; i<numVerses; ++i) {
    var id = digit3(verseNum+i);
    var v = myVerses[prefix + id];
    if (!v) break;
    buf.w('<tr><td valign="top" style="font-family:fixed width">',
          i==0 ? digit3RightAligned(verseNum+i) : verseLink(volNum, verseNum+i),
          '&nbsp;</td><td style="color:teal">', v, '</td></tr>');
  }
  buf.w('</table>');
  buf.render('verseStage');
}

function main() {
  var title = '《地藏經青蓮大師科注》經文';
  document.title = title;
  w(`<center><table border="0">
<tr><td align="center" id="volumeNums1" style="border-bottom:1px solid black"></td></tr>
<tr><td align="center" id="verseNums" style="border-bottom:1px solid black; font-family:fixed width"></td></tr>
<tr><td style="border-bottom:1px solid black" id="verseStage"></td></tr>
<tr><td align="center" id="volumeNums2"></td></tr>
</table>`);

  var vid = get('vid'), v, n;
  if (vid) {
    switch(vid[0]) {
    case 'A': v = 1; break;
    case 'B': v = 2; break;
    case 'C': v = 3; break;
    case 'D': v = 4; break;
    case 'E': v = 5; break;
    case 'F': v = 6; break;
    case 'G': v = 7; break;
    case 'H': v = 8; break;
    case 'I': v = 9; break;
    case 'J': v = 10; break;
    case 'K': v = 11; break;
    case 'L': v = 12; break;
    case 'M': v = 13; break;
    }
  }
  if (v > 0) n = vid.substring(1);
  selectVol(title, v, n);
  w('</center>');
}
