function showWLSJs(curname) {
  function w() { for (var i in arguments) document.write(arguments[i]); }
  function bk(type, name, vowNum, zis, ttl, author) {
    var typeDisp, lnk;
    if (name == 'Xia')
      typeDisp = type;
    else if (name == curname)
      typeDisp = `<font style="color:#ff0; background-color:#b00">${type}</font>`;
    else
      typeDisp = `<a href="WLSJx${name}.html" title="筆記">${type}</a>`;
    if (name == 'Xia') {
      lnk = '../util/reader.html?s=../淨土宗/《無量壽經》';
    } else {
      lnk = '../util/reader.html?t=../淨土宗/《無量壽經》/Original_Versions/' + name;
      if (name == 'Wang') lnk += '-trans';
      lnk += '.js';
    }
    w(`<tr>
<td nowrap>【${typeDisp}】</td>
<td nowrap><small>(${vowNum}願。${zis}字)</small></td>
<td nowrap>《<a href="${lnk}" title="經文">${ttl}</a>》</td>
<td nowrap align=right>${author}</td></tr>`);
  }

  w('<table width="750px" border=0>');
　bk('漢譯', 'HAN', 24, 28224, '無量清淨平等覺經', '後漢月氏沙門支婁迦讖譯');
  bk('吳譯', 'WU',  24, 25124, '佛說阿彌陀三耶三佛薩樓佛檀過度人道經', '吳月氏優婆塞支謙字恭明譯');
  bk('魏譯', 'WEI', 48, 17381, '無量壽經', '曹魏印度沙門康僧鎧譯');
  bk('唐譯', 'TANG',48, 14003, '無量壽如來會', '唐南印度三藏菩提流志譯');
  bk('宋譯', 'SONG',36, 11661, '佛說大乘無量壽莊嚴經', '宋西域沙門法賢譯');
  bk('王校本', 'Wang',48, 17739, '大阿彌陀經', '王日休居士校輯');
  bk('夏集本', 'Xia', 48, 16171, '佛說大乘無量壽莊嚴清淨平等覺經', '夏蓮居居士會集');
  w('<table>');
}
