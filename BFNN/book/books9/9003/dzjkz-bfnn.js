console.log('TODO: 序(orig/dzjkz0.txt) and 跋(orig/dzjkz7.sgml) yet to be done.');


function w() { for(var i in arguments)document.write(arguments[i]) }
function get(name) {
 if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
   return decodeURIComponent(name[1]);
}
var nokp = get('nokp');

const bfnnLnSp = '<p class=MsoPlainText lang=EN-US>&nbsp;</p>';

function bfnnShow(volume, width) {
  document.title = titleBase.replace('地藏菩薩本願經', '地藏經') + '卷' + volume.volNum;
  var src = '原始資料：' + bookLink;

  if (width) width = 'width:' + width;
  w('<div class=bookClean style="layout-grid:18.0pt; ', width, '">',
    '<p class=MsoPlainText align=center style="font-weight:bold; text-align:center"><span class=caption>', titleBase, '</span></p>',
    '<p class=MsoPlainText align=center style="text-align:center"><b><span class=caption>卷六之', volume.volNum, '</span></b></p>',
    bfnnLnSp,
    '<p class=MsoPlainText align=center style="text-align:center"><span style="color:#003300">', authors, '</span></p>',
    bfnnLnSp);

  for (var i in volume.pins) {
    var p = volume.pins[i];
    for (var k in p.lines) {
      var li = p.lines[k];
      if (!nokp || !li.isKePan()) w(li.toDisp(), bfnnLnSp);
    }
  }

  w('<p class=MsoPlainText align=right style="text-align:right;text-indent:24.0pt; word-break:break-all">',
      titleBase, '卷六之', volume.volNum, '<small>終</small></p>',
    bfnnLnSp,
    '</div>',
    '<div class=endImageXG></div>',
    '<div class=bookClean style="opacity:0.2; text-align:center; ', width, '">',
    src, '</div>');
}

function bfnnShowVolumes() {
  var width = get('width');
  for (var i in VOLUMES)
    bfnnShow(VOLUMES[i], width);
}
