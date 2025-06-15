function w() { for (var i in arguments) document.write(arguments[i]); }

function gatha() {
  var len = arguments.length;
  if (len <= 0) return;
  var src = arguments[len-1];
  const sp = '　', sp3 = '　　　';
  var a = src.trim().split('\n');
  len = a.length, num = 1;
  for (var i=0; i<len; ++i) {
    var ln = a[i].trim();
    var idx = ln.indexOf('|'), anno;
    if (idx > 0) {
      anno = ln.substring(idx+1).trim();
      ln = ln.substring(0, idx).trim();
    } else {
      anno = null;
    }
    if (!ln) {
      w('<LNSP></LNSP>');
    } else {
      w(`<p class="TEXT gatha"><span class="gathanum">`,
        (len > 5) ? (num++) : '',
        `&nbsp;</span>${ln.replaceAll(' ', sp)}`);
      if (anno) w(sp3, `<span style="color:black; opacity:0.4">${anno}</span>`);
      w(`</p>`);
    }
  }
}
