//SMLY.volNum 
SMLY.text = (() => {
  var base = 'https://www.hwadzan.com/education/play?menuidparent=WD11&menuidchild=2&mp4=1&numbers=';
             // first: 332211, main: 2068 (shows first content)
  var buf = new Buffer('\n<center><table cellpadding=0 cellspacing=0>');
  for (var i=0; i<lectures.length; ++i) {
    buf.w(`<tr><td style="color:gray;font-size:12px">【<a href="${base}${332211+i}" target="extra">${to4d(i+1)}</a>】&nbsp;&nbsp;&nbsp;</td>`,
          `<td valign=top>第</td><td valign=top align=center>${i+1}</a><td valign=top>集&nbsp;&nbsp;</td>`,
          `<td nowrap><a href="?vol=${i+1}">${lectures[i]}</a></td></tr>`);
  }
  return buf.w('</table></center>').render();
})();
