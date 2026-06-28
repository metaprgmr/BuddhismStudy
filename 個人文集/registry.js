var articleInfo = {},
    lines, // for index.html to list
    MULTI_SEP = '▄';

function w() { for (var i in arguments) document.write(arguments[i]) }

function endOfArticle(id) {
  var info = articleInfo[id], invalidID = !info || info.invalidID,
      returnLnk = info.returnToMain ? '<a href="../index.html">返回主頁</a>'
                                    : '<a href="index.html">返回《個人文集》目錄</a>';
  w(`
<div class="noprint">
<p>${returnLnk}</p><hr>
<div align=center class="copyright"></div>
</div>
<div class="forprint" style="text-align:center"><hr>
https://metaprgmr.github.io/BuddhismStudy/a.html?id=${id}${invalidID?' *':''}
</div>`);
}

(() => {
  var jklb = 'JK-Learn-Buddhism-';
  lines = `
240530|${jklb}認識佛教筆記.html|《認識佛教》筆記${MULTI_SEP}240608|${jklb}Review-Qs.html|復習
250328|WLSJs_various.html|《無量壽經》諸版對照
260220|彌陀要解精要.html|《彌陀要解》精要
250828|地藏菩薩大智開示
260527|一實境界
250801|《宗鏡錄》摘要
251007|圓音講義
251013|大慧總問
260205|YG333-synopsis.html|《印光文鈔菁華錄》梗概
260123|DZJ-synopsis.html|《地藏菩薩本願經》梗概
250509|CAUSE-AND-EFFECT.html|《因果》
#######
260519|勸學佛
260525|托福進修學校
260107|百過歌
260111|佛子根
251107|念佛节奏.html|念佛节奏計算器
250917|發露懺悔
250515|廿字加卅字
241113|浪費時間
241114|人之將死.html|人之將死
250527|一即一切
260526|海賢老和尚語錄
260613|構思
260628|打坐歌
#######
240531|《無量壽經》三聖之考究
250821|經或會集本.html|夏集《無量壽》是佛經嗎？
250321|與時俱進的提婆達多
230516|略言不言而喻之事
250802|圍棋與人生.html|棋道•人道•佛道
240210|對自己好一點
260209|Vimalakirti-Tang-Poems.html|維摩詰唐詩選
230517|論飯桶，兼論素食
231111|DuBist.html|Du Bist Was Du Isst
231222|養生乎.html|養生，乎？
240605|毛虫
250630|凡夫苦
260524|有感
xxxxxxxx
250530|淨界法師.html|【善知識】淨界法師
260609|甘台榮居士.html|【善知識】甘台榮居士
260625|南懷瑾老師.html|【善知識】南懷瑾老師
250629|北川致遠書社.html|【善知識】北川致遠書社
260221|一念相應一念佛.html|?「一念相應一念佛」
250625|淨空法師是對的
250603|素質
250916|十句
260210|念佛訣竅
`.trim().split('\n');

  var hidden = false;
  for (var i=0; i<lines.length; ++i) {
    var ln = lines[i].trim();
    if (ln.startsWith('xxxx')) hidden = true;
    if (ln[0] != '2') continue;
    var row = ln.split(MULTI_SEP);
    for (var j=0; j<row.length; ++j) {
      ln = row[j].split('|');
      var id = ln[0], obj = articleInfo[id];
      if (obj) throw `Duplicate article ID: ${id}`;
      if (ln.length > 2)
        articleInfo[id] = obj = { id, hidden, uri:ln[1], title:ln[2] };
      else
        articleInfo[id] = obj = { id, hidden, uri:ln[1]+'.html', title:ln[1] };
      if (obj.title) {
        if (obj.title[0] == '?') {
          obj.title = obj.title.substring(0, obj.title.length-1);
          obj.returnToMain = true;
        } else {
          obj.returnToMain = obj.title.startsWith('【善知識】');
        }
      }
    }
  }
})();
