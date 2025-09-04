var articleInfo = {},
    lines; // for index.html to list

function w() { for (var i in arguments) document.write(arguments[i]) }

function endOfArticle(id) {
  var info = articleInfo[id], invalidID = !info || info.invalidID;
  w(`
<div class="noprint">
<p><a href="index.html">返回《個人文集》目錄</a></p><hr>
<div align=center class="copyright"></div>
</div>
<div class="forprint" style="text-align:center"><hr>
https://metaprgmr.github.io/BuddhismStudy/article.html?id=${id}${invalidID?' *':''}
</div>`);
}

(() => {
  var knownIDs = {}, jklb = 'JK-Learn-Buddhism-';
  lines = `
240530|${jklb}認識佛教筆記.html|《認識佛教》筆記▄240608|${jklb}Review-Qs.html|復習
250328|WLSJs_various.html|《無量壽經》諸版對照
240531|《無量壽經》三聖之考究
250321|與時俱進的提婆達多
250821|經或會集本.html|夏蓮居會集的《無量壽經》<br>究竟是經還是會集本？
250828|地藏菩薩大智開示
250523|《八識規矩頌》內容
250801|《宗鏡錄》摘要
250530|淨界法師.html|【善知識】淨界法師
250629|北川致遠書社.html|【善知識】北川致遠書社
#######
250515|廿字加卅字
241113|浪費時間
241114|人之將死.html|人之將死
250527|一即一切
250625|淨空法師是對的
250603|素質
#######
230516|略言不言而喻之事
230518|苦空無常之音.mp3|苦空無常之音
250630|凡夫苦
240605|毛虫
230517|論飯桶，兼論素食
231111|DuBist.html|Du Bist Was Du Isst
240307|養生乎.html|養生，乎？
240308|對自己好一點
250802|圍棋與人生.html|棋道•人道•佛道
`.trim().split('\n');

  for (var i=0; i<lines.length; ++i) {
    var ln = lines[i];
    if (ln.startsWith('##')) continue;
    var row = ln.split('▄');
    for (var j=0; j<row.length; ++j) {
      ln = row[j].split('|');
      var id = ln[0];
      if (ln.length > 2)
        articleInfo[id] = { uri:ln[1], title:ln[2] };
      else
        articleInfo[id] = { uri:ln[1]+'.html', title:ln[1] };
      if (knownIDs[id]) articleInfo[id].invalidID = true;
    }
  }
})();
