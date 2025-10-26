function w() { for (var i in arguments) document.write(arguments[i]) }
function get(name) {
 if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
   return decodeURIComponent(name[1]);
}
function showAll(ttl, mantras, onlyOne, isSimple, intro) { // 0-based, 0-9
  if (onlyOne != null) onlyOne = parseInt(onlyOne);
  const isOnlyOne = (onlyOne >= 0);
  var i, k, m, id, indent = '&nbsp;&nbsp;';

  if (!isOnlyOne && !isSimple) {
    w(`<h2 style="margin-left:95px" title="${intro||''}">`, ttl,
      '<a href="?simple=1" style="margin-left:43px; font-size:14px">【緊縮打印版】</a></h2>',
      '<table class="toc" border="0">');
    for (i=0; i<mantras.length; i++) {
      m = mantras[i];
      id = i+1;
      w(`<tr><td align="right">${id}.&nbsp;</td>`,
        `<td title="${m.titleS || ''}"><a href="#${id}" title="${m.功德||''}">${m.title}</a>`);
      for (k=m.title.length; k<15; ++k) w('　');
      w('　【<a href="?i=', i, '">詳情</a>】</td></tr>');
    }
    w('<tr><td>&nbsp;</td></tr></table>');
  }

  w('<table border="0">');
  var HR = onlyOne >= 0 ? "" : "<hr>";
  var start = isOnlyOne ? onlyOne : 0;
  var end   = isOnlyOne ? (onlyOne+1) : mantras.length;
  for (i=start; i<end; i++) {
    m = mantras[i];
    id = i+1;
    if (isOnlyOne) {
      if (isSimple)
        w('<tr><td nowrap align="center" colspan="2"><h3>', m.title, '</h3></td></tr>');
      else if (m.titleS)
        w('<tr><td nowrap align="center" colspan="2"><h3>', m.title, '<br>', m.titleS, '</h3></td></tr>');
      else
        w('<tr><td nowrap align="center" colspan="2"><h3>', m.title, '</h3></td></tr>');
    } else {
      w('<tr><td style="padding-bottom:10px" nowrap align="center" colspan="2"><a name="', id, '">', isSimple ? '' : HR, id, '.&nbsp;', m.title);
      if (!isSimple && m.titleS)
        w(m.titleS.length > 40 ? '<br>' : '&nbsp;&nbsp;', m.titleS);
      w('</td></tr>');
    }
    if (isSimple) {
      w('<tr><td align="center" nowrap><pre>', m.simple, '</pre></td></tr>');
    } else {
      for (var j in m.text) {
        var a = m.text[j].split('|');
        if (a.length === 1) w('<tr><td nowrap colspan="2">', indent, a[0].trim(), '</td></tr>');
        else w('<tr><td nowrap>', indent, a[0].trim(), '</td><td nowrap>', indent, a[1].trim(), '</td></tr>');
      }
      if (isOnlyOne && m.功德)
        w('<tr><td colspan="2"><div style="margin-top:40px; width:370px">',
          m.功德, '</div></td></tr>');
    }
  }
  if (!isOnlyOne && !isSimple) w('<tr><td align="center" colspan="2"><hr></td></tr>');
  w('</table>');
}
