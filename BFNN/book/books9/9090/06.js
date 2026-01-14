var check100 =
`生活起居異常。
服裝儀容不整潔。
隨地吐痰，亂丟垃圾，邊走邊吃。
見地上垃圾未能隨手撿起。
個人或家裡髒亂，潔僻之習未改進。
尚有抽煙、喝酒、嚼檳榔之惡習。
不守公共秩序，行車未遵守交通規則。
進出不正當場所。
工作不盡職，無敬業精神。
生活沒朝氣，工作或修學效率差。
與人相處不和睦，無團隊精神。
鄰居同事或相識之人，見面未能微笑打招呼。
未能敦親睦鄰，守望相助。
遇殘疾、老弱婦孺未能扶助。
平時好看電視、報紙、雜誌刊物。
觀看色情影片、刊物，身心犯邪淫。
男女異常交往。
昨日過今未改，不良之習氣重犯。
殺、傷害有情眾生。
貪圖食、衣、住、行享受。
偷盜或未經同意取走別人任何一物。
六齋及十齋日、佛菩薩聖誕日，未能全素、斷淫。
平日早餐未能素食。
任棄五穀或任何可食之物。
不惜福，生活奢侈浪費。
遇佛菩薩像或僧眾，未起誠敬心問訊或頂禮。
對父母不孝順（讓父母操心、生氣）。
對師長不恭敬，對兄弟朋友不忠信。
與家人相處或夫妻相處，尚有不和睦。
待人不真誠，態度貢高我慢。
待人處世，不誠信或負人約定。
待人處世，尚喜歡佔別人小便宜。
待人處世，尚怕別人佔我便宜或斤斤計較。
待人處世，學佛修行，尚以攀緣心行之。
待人處世，尚有猜忌、懷疑、嫉妒之心。
早晚課未能按時圓滿落實。
念佛日中九次，十念法未能落實。
平時未能把握時間修學，使其空過。
佛法修學心不專、念不一。
學佛修行，懈怠沒恆心或起退怯心。
遇緣該行未行，該捨未捨。
幫助別人，無勇往直前之精神。
助人為非一事，見人憂驚不慰。
眾生與正法有緣，未與積極引導。
做生意以不正當方法手段謀取利益。
有賭博、不務正業或涉及非法等，不勞而獲之投機行為與心態。
言語、動作不端正，粗俗不雅。
口言粗暴，邪僻穢語。
口言輕浮之語，講話態度不穩重。
以不實虛假之語，矇騙他人。
無意之閒談或多管閒事。
輕言妄談，話多且無好話。
講話喜好誇大或強人出頭。
言行不實，或甚傷人，未生悔意。
講話速度音量不適當。
說話未能恰到好處，或有打岔不禮之習。
兩舌挑撥離間，搬弄是非。
論人是非，隨意批評他人。
為人口是心非，表裡不一。
毀謗三寶，破壞正法教育。
以善言好語詐騙他人；以花言巧語訕誘他人。
好聞讚歎之語，聞及生喜，未能觀照；厭聞逆耳之言，聞及生惱，未能反省。
性情急躁，不能容忍一時之氣。
心量狹小，不能包容寬恕別人。
縱情、任性，為所欲為。
起心動念自私自利。
心中暗舉惡意害人。
惡緣現前，心生煩惱、懷恨或起報復心。
眼見耳聞，稍不順意，隨即心生不悅。
觀看人、事、物尚有不順眼之心境。
慳惜吝嗇，不肯布施或布施心生悔意。
不知命不認命，起分外營求之心。
順境現前或超越他人時，心生驕傲或態度貢高我慢。
逆境現前或失意時，怨天尤人或輕視自己。
稍不順心，即唉聲嘆氣或立即生氣。
見人成就心生嫉妒；見人有難幸災樂禍。
見好人好事未能心生歡喜。
對親情、名利執著，尚有患得患失感。
五慾六塵之慾念尚重，生活過得無踏實感。
是非來臨，無法及時觀照，以平常心面對。
犯善小而不為，惡小而為之過。
未能常思己過，反常見他人之過。
妄想煩惱生起，無法及時觀照以佛號取代之。
平時心無正念，雜念妄想紛飛。
今日心離道，生活過得忙亂或煩燥。
對父母師長、有緣善知識，無日懷感恩之心。
看別人優點自我學習，見他人缺陷自我反省，尚未落實。
時時生慚愧，日日起懺悔，尚未落實。
生活以平常心、平等心面對，尚未落實。
晨起念佛生喜心，日中念佛持淨心，尚未落實。
與人言談和顏愛語，態度謙誠，尚未落實。
以至誠恭敬心待一切人，尚未落實。
存以溫和、善良、慈悲之心，尚未落實。
造福、惜福節儉之美德，尚未落實。
內自謙，外禮讓之美德，尚未落實。
己所不欲，勿施於人，尚未落實。
律己要嚴，待人要寬，尚未落實。
逆來順受，順來不起貪著，尚未落實。
不忍吃眾生肉，菩薩慈悲精神，尚未落實。
於人無爭，於世無求，尚未落實。`.split('\n');

function toHTML(lstFirst) {
  var good = getGlobal('check100Good')||{}, bad = getGlobal('check100Bad')||{};
  // Uncomment the next line to see the effect.
  //good = { 1:'x' }; bad = { 2:'x', 3:'!' };
  // Put the check100Good/check100Bad data in your env.js; see 9090.htm.

  // The list
  var goodCnt = Object.keys(good).length, badCnt = Object.keys(bad).length,
      simple = get('simple') || !goodCnt && !badCnt,
      buf = new Buffer(), i, lst, grd;

  // The list
  function showItem(txt) {
    if (simple) { buf.w(txt, '\n'); return; }
    var tag = '<font', isBad = bad[i];
    if (good[i])
      tag += ' style="color:green; opacity:0.3" title="很好"';
    else if (isBad)
      tag += (isBad=='!')
             ? ' style="color:red; background-color:yellow" title="正在修正中"'
             : ' style="color:red" title="很差"';
    buf.w(`${tag}>${txt}</font>`, '\n');
  }
  buf.w(`${COL_START}\n/ol BQKaiTi14L/\n`);
  for (i=1; i<=50; ++i) showItem(check100[i-1]);
  buf.w(`//\n${COL_DIV}\n/ol@${i} BQKaiTi14L/\n`);
  for (; i<=100; ++i) showItem(check100[i-1]);
  buf.w('//\n', COL_END);
  lst = buf.render();
  var baiguoge = `\n/TEXT339/【百過格】　<ail>（<a href="../../../個人文集/百過歌.html">百過歌</a>）</ail>`;
  if (simple) return buf.w(baiguoge, '<br>&nbsp;', lst).render();

  // The grid
  const s100Segs = {
    1:'生活待人', 19:'恭敬', 36:'精進', 47:'口業', 62:'心量', 72:'煩惱', 86:'行善'
  };
  var bgGray = true, x, y, seg;
  function showCell(txt) {
    if (s100Segs[i]) { bgGray = !bgGray; seg = s100Segs[i]; }
    var disp;
    if (good[i])     disp = `<lightgreen>◼</lightgreen>`;
    else if (bad[i]) disp = `<red>◻</red>`;
    else             disp = `<gray>◻</gray>`;
    buf.w(`<td${bgGray&&' bgcolor="lightgray"'||''} title="【${seg}】${i}. ${txt}" align=center>&nbsp;&nbsp;${disp}&nbsp;&nbsp;</td>`, '\n');
  }
  var stats = [];
  if (goodCnt) stats.push(`<lightgreen title="Confirmed OK">◼</lightgreen>：${goodCnt}`);
  if (badCnt)  stats.push(`<red title="Confirmed POOR">◻</red>：${badCnt}`);
  if (100-goodCnt-badCnt) stats.push(`<gray title="Unconfirmed">◻</gray>：${100-goodCnt-badCnt}`);
  stats = stats.join('　　');
  buf.w('<center><table cellpadding=0 cellspacing=0>')
     .wIf(goodCnt || badCnt, `<caption style="font-size:12px; caption-side:bottom; margin-top:5px">${stats}</caption>`)
     .w('<tr><th></th>');
  for (y=1; y<=10; ++y) buf.w('<th>', y, '</th>');
  buf.w('</tr>');
  for (y=0; y<10; ++y) {
    buf.w(`<tr><td align=right style="padding-right:10px">${y && (y*10+'+') || ''}</td>`);
    for (x=0; x<10; ++x) {
      i = y*10 + x + 1;
      showCell(check100[i-1]);
    }
    buf.w('</tr>');
  }
  buf.w('</table></center>');
  grd = buf.render();

  buf.w(baiguoge)
     .w(lstFirst ? lst : grd)
     .wIf(!lstFirst, '<br>')
     .w(lstFirst ? grd : lst);
  return buf.render();
}

if (typeof XXSZ != 'undefined') {
  XXSZ.sectionTitle = '百過格';
  XXSZ.volNum = 6;
  XXSZ.text = toHTML();
}
