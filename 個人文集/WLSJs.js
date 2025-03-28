function showWLSJs(curname) {
  var pref = '&nbsp;', z11 = '　　　　　　　　　　　', z8 = '　　　　　　　　';
  function w() { for (var i in arguments) document.write(arguments[i]); }
  function book(name, zis, ttl, before, after) {
    before = (before||'夏集本✶').replace('✶', `&nbsp;&nbsp;<font style="font-size:14px">(${zis}字)</font>`);
    if (after) after += '<br>';
    if (name == 'Xia')
      w(pref, before, '《<a href="../util/reader.html?s=../淨土宗/《無量壽經》" title="經文">',
        '佛說大乘無量壽莊嚴清淨平等覺經</a>》' + z8 + '夏蓮居居士會集');
    else
      w(pref,
        (name == curname)
          ? before.replace('【', '<font style="background-color:#b00; color:#ff0">').replace('】', '</font>')
          : before.replace('【', `<a href="WLSJx${name}.html" title="筆記">`).replace('】', '</a>'),
        '《<a href="../util/reader.html?t=../淨土宗/《無量壽經》/Original_Versions/',
        name, (name == 'Wang') ? '' : '-trans', '.js" title="經文">', ttl, '</a>》', after);
  }

  w('<p style="text-indent:0">');
　book('HAN', 28224, '無量清淨平等覺經', '　【漢譯】✶',     z11 + '後漢月氏沙門支婁迦讖譯');
  book('WU',  25124, '佛說阿彌陀三耶三佛薩樓佛檀過度人道經', '　【吳譯】✶', '吳月氏優婆塞支謙字恭明譯');
  book('WEI', 17381, '無量壽經', '　【魏譯】✶',             z11 + '　　　　　曹魏印度沙門康僧鎧譯');
  book('TANG',14003, '無量壽如來會', '　【唐譯】✶',         z11 + '　　唐南印度三藏菩提流志譯');
  book('SONG',11661, '佛說大乘無量壽莊嚴經', '　【宋譯】✶', z11 + '　宋西域沙門法賢譯');
  book('Wang',17739, '大阿彌陀經', '【王校本】✶',           z11 + '　　　　　　　王日休居士校輯');
  book('Xia', 16171);

  w('</p>');
}
