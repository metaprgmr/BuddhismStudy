console.log('TODO: 序(orig/dzjkz0.txt) and 跋(orig/dzjkz7.sgml) yet to be done.');


var nokp = get('nokp');

const bfnnLnSp = '<LNSP></LNSP>';

function bfnnShow(volume, width) {
  w(`<script>
setDocInfo(9004, 6);
writeBfnnStart('地藏菩薩本願經科注||卷六之${volume.volNum}', '地藏經科注 卷${volume.volNum}');
w('<p class=TEXT030C>${authors}</p>', SP);
</script>`, bfnnLnSp);

  for (var i in volume.pins) {
    var p = volume.pins[i];
    for (var k in p.lines) {
      var li = p.lines[k];
      if (!nokp || !li.isKePan()) w(li.toDisp(), bfnnLnSp);
    }
  }

  w(`<p class=TEXT align=right>地藏菩薩本願經科注 卷六之${volume.volNum}　</p>`,
    bfnnLnSp,
    '<script> writeXgEnd(); </script>');
}

function bfnnShowVolumes() {
  for (var i in VOLUMES)
    bfnnShow(VOLUMES[i]);
}
