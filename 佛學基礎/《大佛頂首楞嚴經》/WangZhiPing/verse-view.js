function toZNum(i) { return (i === 10) ? '十' : zNumber(i) }
function toAlpha(i) { return ' ABCDEFGHIJKL'[i] }
function ensureInt(x, defVal) { return (!x || (x == '') || isNaN(x)) ? defVal : ((typeof x === 'string') ? parseInt(x) : x) }

var myVerses;
function selectVol(title, isHaiRen, volNum, verseNum) {
  myVerses = isHaiRen ? HaiRenVerses : getWangVerses();
  volNum = ensureInt(volNum, 1);
  if (sessionStorage.volNum != volNum) { sessionStorage.volNum = volNum; sessionStorage.verseNum = null; }
  var buf = new Buffer('　', title, ' 卷&nbsp;');
  for (var i=1; i<=10; ++i) {　
    if (i > 1) buf.w('&nbsp;&nbsp;');
    if (i == volNum)
      buf.w('<font style="color:red; background-color:yellow">', toZNum(i), '</font>');
    else
      buf.w('<a href="?vid=', toAlpha(i), '">', toZNum(i), '</a>');
  }
  if (isHaiRen)
    buf.w('&nbsp;（共分908段&nbsp;<font style="font-size:12px">1:77; 2:91; 3:119; 4:105; 5:52; 6:115; 7:71; 8:123; 9:79; 10:76</font>）');
  else
    buf.w('&nbsp;（共分1448段&nbsp;<font style="font-size:12px">1:187; 2:157; 3:179; 4:133; 5:133; 6:154; 7:92; 8:189; 9:129; 10:95</font>）');
  buf.render('volumeNums');

  showText(volNum, verseNum);
}

function showText(volNum, verseNum) {
  var isAll = verseNum === 'all';
  var numVerses = isAll ? 1000 : 10;
  if (!verseNum) verseNum = sessionStorage.verseNum;
  verseNum = ensureInt(verseNum, 1);
  sessionStorage.verseNum = verseNum;
  var buf = new Buffer();
  buf.w('<table border=0><tr><td>');
  if (volNum < 1 || volNum > 10) {
    buf.render('verseNums');
    return;
  }
  var prefix = ' ABCDEFGHIJ'[volNum];
  var zPref = toZNum(volNum);
  var width = 20;
  for (var i=1; ; i++) {
    var num = digit3(i), style = '';
    var v = myVerses[prefix + num];
    if (!v) break;
    if (!isAll && (i >= verseNum && i < verseNum+numVerses))
      style = ' style="background:yellow; font-weight:bold"';
    buf.w('<a', style, ' href="javascript:showText(', volNum, ',', i, ')">', digit3RightAligned(i), '</a> ');
    if (i % width === 0) buf.w('<br>');
  }
  if (!isAll) buf.w('<a href="javascript:showText(', volNum, ', \'all\')">（全部）</a> ');
  buf.w('</td></tr></table>');
  buf.render('verseNums');

  // show the selected text
  buf.w('<table width="100%">');
  var prefix = ' ABCDEFGHIJ'[volNum];
  for (var i=0; i<numVerses; ++i) {
    var id = digit3(verseNum+i);
    var v = myVerses[prefix + id];
    if (!v) break;
    buf.w('<tr><td valign="top" style="font-family:fixed width">', digit3RightAligned(verseNum+i), '&nbsp;</td><td style="color:teal">', v, '</td></tr>');
  }
  buf.w('</table>');
  buf.render('verseStage');
}
function main(isHaiRen) {
  var title = isHaiRen ? '海仁法師《楞嚴經》科判經文' : '王治平《<a href="Wang.html">楞嚴經譯解</a>》經文';
  document.title = isHaiRen ? '海仁法師《楞嚴經》科判經文' : '王治平《楞嚴經譯解》經文';
  w(`<center><table border="0">
<tr><td align="center" id="volumeNums" style="border-bottom:1px solid black"></td></tr>
<tr><td align="center" id="verseNums" style="border-bottom:1px solid black; font-family:fixed width"></td></tr>
<tr><td style="border-bottom:1px solid black" id="verseStage"></td></tr>
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
    }
  }
  if (v > 0) n = vid.substring(1);
  selectVol(title, isHaiRen, v, n);
  w('</center>');
}
