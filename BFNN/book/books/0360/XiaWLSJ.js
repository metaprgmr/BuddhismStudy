class WLSJVow {
  constructor(num, vtxt, comment) {
    this.num = num;
    this.text = vtxt;
    this.comment = comment;
  }
  render(renderer) {
    var ret = renderer ? (renderer(this.num, this.text))
                       : `${this.text} <ail>（第${this.num}願）</ail>`;
    if (this.comment) ret = this.comment + '\n' + ret;
    return ret;
  }
}

class XiaWLSJ {
  constructor(type, vows) {
    this.init(type, vows);
  }
  showVows() {
    var buf = new Buffer(), len = this.vows.length;
    for (var i=0; i<len; ++i)
      buf.w(this.vows[i].render(this.vowRenderer), i<len-1 ? '\n\n' : '');
    return buf.render();
  }
  parseVows(vows) {
    this.vows = [];
    if (!vows) return;
    var vn = 1, a = vows.split('\n'), me = this;
    for (var i=0; i<a.length; ++i) {
      var ln = a[i].trim();
      if (ln && ln.startsWith('v='))
        this.vows.push(new WLSJVow(vn++, a[++i].trim(), ln.substring(2)));
    }
  }
  vowA(num) {
    return `<a href="../../../../淨土宗/《無量壽經》/48.html#_${num}" target="ref">`;
  }
  jyA(anchor) {
    var url = '../../../../淨土宗/《無量壽經》/大經精研.html';
    return anchor ? `<a href="${url}#${anchor}" target="ref">`
                  : `<a href="${url}" target="ref">`;
  }
  getXiaVowText(n) {
    var v = this.xiaVows[n-1];
    this.hasXiaVows[n] = true;
    return v || '';
  }
  reportMissedVows(elid) {
    var rpt = [];
    for (var i=0; i<this.xiaVows.length; ++i) {
      if (!this.hasXiaVows[i+1])
        rpt.push(`${i+1}.${this.xiaVows[i]}`);
    }
    if (rpt.length == 0) return '';
    var x = `夏本48願未明者${rpt.length}個：`;
    if (!elid)
      console.log(`${x}${rpt.join('　')}`);
    else
      renderText(elid,
        `<p class=KEPAN>${x}</p><blockquote>　${rpt.join('　')}</blockquote>`);
  }
  toRef(pinNum, verseNum, noPinTtl) {
    if (!verseNum) verseNum = '';
    var a, i, j;
    if (pinNum[0] == 'v') {
      a = pinNum.substring(1).split(',');
      for (j=0; j<a.length; ++j)
        a[j] = `${this.vowA(a[j])}${toNumDisp(a[j])}</a><ail>〈${this.getXiaVowText(a[j])}〉</ail>`;
      return `【夏•願&nbsp;${a.join('')}】`;
    }
    a = `${verseNum}`.split('-');
    for (i=0; i<a.length; ++i) {
      var b = a[i].split(',');
      for (j=0; j<b.length; ++j) b[j] = toNumDisp(b[j]);
      a[i] = b.join('');
    }
    verseNum = a.join('～');
    var pttl = noPinTtl ? '' : `<ail>〈${this.pinTitles[pinNum-1]}〉</ail>`;
    return `【${this.jyA('_'+pinNum)}夏•品${this.toPinNumber(pinNum)}</a>${pttl}${verseNum}】`;
  }
  toLine(pinNum, verseNum, line) {
    if (!line) line = '';
    return `<p class=XIA1>${this.toRef(pinNum,verseNum,line.length>60)}${line}</p>`;
  }
  toPinNumber(i) {
    if (i < 20)  return zNumber(i);
    if (i == 20) return '廿';
    if (i < 30)  return '廿' + zNumber(i-20);
    if (i == 30) return '卅';
    if (i < 40)  return '卅' + zNumber(i-30);
    if (i == 40) return '卌';
    if (i < 50)  return '卌' + zNumber(i-40);
    return zNumber(i);
  }

  preamble(noSep) {
    function ckvows(me) {
      var cnt = me.vows.length;
      return (cnt!=48) ? `惟${zNumber(cnt)}願，異於主流四十八願之數` : '具四十八願之數';
    }
    var extra =
      `\n/BQKaiTi/本經凡${this.zicnt}萬字（對比<XB>夏蓮居會集本</XB>1.6萬字）。${ckvows(this)}。<a#xgrpt>信裹居士研習報告</a>見下。\n`;
    switch (this.type) {
    case 'SONG': extra += this.songExtra(); break;
    case 'TANG': extra += this.tangExtra(); break;
    }
    return `/TEXT030C/<ail>（信裹居士對照夏蓮居會本研習）</ail>

/VOLSEP/
/BQKaiTi/此乃精研版本，參照、對比<XB>夏蓮居居士會集的</XB>《<a href="../0360.htm">佛說大乘無量壽莊嚴清淨平等覺經</a>》${this.jyA()}（精研本）</a>。
/BQKaiTi/◼ 與<XB>夏蓮居會集本</XB>文字雷同者<x>如此標示</x>。人名異譯及同義異表詞<y>如此標示</y>。<XB>夏蓮居會集本</XB>增加的個別字句<z>如此標示</z>。
/BQKaiTi/◼ <XB>夏本</XB>${this.jyA()}精研本</a>可逐條文句比對。例如：<kepan>${this.toRef(25,2)}</kepan>指<XB>會集本</XB>第二十五品第②句。之後可跟隨任何文字說明。
/BQKaiTi/◼ <XB>夏本</XB>第六品<ail>〈發大誓願〉</ail>專項處理，直接標願號：<kepan>【夏•願&nbsp;⑤ <ail>〈身無差別〉</ail>】</kepan>。
/BQKaiTi/◼ <font class=XIA>普通評註如此標示。</font>
${extra||''}${noSep ? '' : '/VOLSEP/\n'}`;
  }
  songExtra() {
    return '/BQKaiTi/原經之最後六願落在第二卷；在此被提上第一卷，且略去了其中之引導句「<verse>若我證得無上菩提</verse>」。\n';
  }
  tangExtra() {
return `/BQKaiTi/分品原無；取自於CBTA-T0310《大寶積經》。

${COL_START}
<a#p01>法會聖眾第一</a>
<a#p02>阿難啟請第二</a>
<a#p03>佛許宣說第三</a>
<a#p04>古佛出興第四</a>
<a#p05>法處讚佛第五</a>
<a#p06>攝受淨剎第六</a>
<a#p07>發大誓願第七</a>
<a#p08>說頌自要第八</a>
<a#p09>修菩薩行第九</a>
<a#p10>成佛時處第十</a>
${COL_DIV15}
<a#p11>明無量第十一</a>
<a#p12>聖眾無量第十二</a>
<a#p13>壽命無量第十三</a>
<a#p14>國界嚴淨第十四</a>
<a#p15>寶樹莊嚴第十五</a>
<a#p16>佛菩提樹第十六</a>
<a#p17>地平無山第十七</a>
<a#p18>河流妙聲第十八</a>
<a#p19>不聞惡名第十九</a>
<a#p20>受用自然第二十</a>
${COL_DIV15}
<a#p21>人如六天第二十一</a>
<a#p22>雨華布地第二十二</a>
<a#p23>華光出佛第二十三</a>
<a#p24>離分別相第二十四</a>
<a#p25>究竟極果第二十五</a>
<a#p26>十方佛讚第二十六</a>
<a#p27>三輩往生第二十七</a>
<a#p28>十方禮覲第二十八</a>
<a#p29>一生補處第二十九</a>
<a#p30>聖眾身光第三十</a>
${COL_DIV15}
<a#p31>妙相勝德第三十一</a>
<a#p32>常了宿命第三十二</a>
<a#p33>供他方佛第三十三</a>
<a#p34>菩薩功德第三十四</a>
<a#p35>極樂現前第三十五</a>
<a#p36>彌勒述見第三十六</a>
<a#p37>疑悔處胎第三十七</a>
<a#p38>菩薩當生第三十八</a>
<a#p39>付囑彌勒第三十九</a>
<a#p40>說頌諄囑第四十</a>
${COL_DIV}
<a#p41>聞經獲益第四十一</a>
<a#p42>地動現瑞第四十二</a>
${COL_END}
`;
  }

  init(type, vows) {
    function suffix(n) { return ` <ail>（第${n}願）</ail>`; }
    this.parseVows(vows);
    this.type = type;
    this.hasXiaVows = {};
    var vowcnt = this.vows.length;
    switch(type) {
    case 'HAN':  this.zicnt = 2.8; //vowcnt = 24;
                 this.vowRenderer = (n,t) => `${zNumber(n)}。我作佛時。${t}`;
                 break;
    case 'WEI':  this.zicnt = 1.7; //vowcnt = 48;
                 this.vowRenderer = (n,t) => `設我得佛。${t}${suffix(n)}`;
                 break;
    case 'Wang': this.zicnt = 1.7; //vowcnt = 48;
                 this.vowRenderer = (n,t) => `第${zNumber(n)}願。我作佛時。${t}不得是願終不作佛。`;
                 break;
    case 'WU':   this.zicnt = 2.5; //vowcnt = 24;
                 this.vowRenderer = (n,t) => `第${zNumber(n)}願者。使某作佛時。${t}得是願乃作佛。不得是願終不作佛。`;
                 break;
    case 'TANG': this.zicnt = 1.4; //vowcnt = 48;
                 this.vowRenderer = (n,t) => `若我${n==1?'證得無上菩提':'成佛'}。${t}${suffix(n)}`;
                 break;
    case 'SONG': this.zicnt = 1.2; //vowcnt = 36;
                 this.vowRenderer =
                   (n,t) => `世尊。我${n==1?'發誓言。願如世尊證得阿耨多羅三藐三菩提':'得菩提成正覺已'}。${t}${suffix(n)}`;
                 break;
    default:     throw `UNKNOWN TYPE: ${type}.`;
    }
    this.pinTitles = [
      '法會聖衆', '德遵普賢', '大教緣起', '法藏因地', '至心精進',
      '發大誓願', '必成正覺', '積功累德', '圓滿成就', '皆願作佛',
      '國界嚴淨', '光明遍照', '壽衆無量', '寶樹遍國', '菩提道場',
      '堂舍樓觀', '泉池功德', '超世希有', '受用具足', '德風華雨',
      '寶蓮佛光', '決證極果', '十方佛讚', '三輩往生', '往生正因',
      '禮供聽法', '歌歎佛德', '大士神光', '願力宏深', '菩薩修持',
      '真實功德', '壽樂無極', '勸諭策進', '心得開明', '濁世惡苦',
      '重重誨勉', '如貧得寶', '禮佛現光', '慈氏述見', '邊地疑城',
      '惑盡見佛', '菩薩往生', '非是小乘', '受菩提記', '獨留此經',
      '勤修堅持', '福慧始聞', '聞經獲益'
    ];
    this.xiaVows = [
      '國無惡道', '不墮惡趣', '身悉金色', '三十二相', '身無差別',
      '宿命通',   '天眼通',   '天耳通',   '他心通',   '神足通',
      '徧供諸佛', '定成正覺', '光明無量', '觸光安樂', '壽命無量',
      '聲聞無數', '諸佛稱嘆', '十念必生', '聞名發心', '臨終接引',
      '悔過得生', '國無女人', '厭女轉男', '蓮華化生', '天人禮敬',
      '聞名得福', '修殊勝行', '國無不善', '住正定聚', '樂如漏盡',
      '不貪計身', '那羅延身', '光明慧辯', '善談法要', '一生補處',
      '教化隨意', '衣食自至', '應念受供', '莊嚴無盡', '無量色樹', 
      '樹現佛剎', '徹照十方', '寶香普熏', '普等三昧', '定中供佛',
      '獲陀羅尼', '聞名得忍', '現證不退'
    ];
  }

} // end of class.

function toNumDisp(n) {
  const circnums = [
    '① ','② ','③ ','④ ','⑤ ','⑥ ','⑦ ','⑧ ','⑨ ','⑩ ',
    '⑪ ','⑫ ','⑬ ','⑭ ','⑮ ','⑯ ','⑰ ','⑱ ','⑲ ','⑳ ',
    '㉑','㉒','㉓','㉔','㉕','㉖','㉗','㉘','㉙','㉚',
    '㉛','㉜','㉝','㉞','㉟','㊱','㊲','㊳','㊴','㊵',
    '㊶','㊷','㊸','㊹','㊺','㊻','㊼','㊽','㊾','㊿' ];
  return (n < 50) ? circnums[n-1] : n;
}

// Allons-y --

(() => {
const xiaColor = '#901';
addStyleTag(`
x{ font-size:12.0pt; font-family:細明體; color:${xiaColor} }
y{ font-size:12.0pt; font-family:細明體; color:darkgreen }
z{ font-size:12.0pt; font-family:細明體; color:red; opacity:0.2 }
thru { font-size:12.0pt; font-family:細明體; color:black; opacity:0.7; text-decoration: line-through; text-decoration-color:red }
xcomp { font-size:16.0pt; font-family:細明體; border:2px solid ${xiaColor}; }
`);
})();

var XB = '<XB>夏本</XB>', NOXV = `/XIA/${XB}未見對應之願`;
var xia; // must instantiate!

function createStudy(type, vows) { xia = new XiaWLSJ(type, vows); }
