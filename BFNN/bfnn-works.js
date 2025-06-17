class BfnnWork {
  constructor(nums, title, isSutra) {
    if (Array.isArray(nums)) {
      this.id = nums[0];
      if (nums.length > 1) this.idEnd = nums[1];
    } else {
      this.id = nums;
    }
    this.title = title;
    this.isSutra = isSutra;
    if (this.id >= 9000) this.idCls = 'extra';
  }
  getTopic() { return this.topic || (this.isSutra?'其他佛經':'其他文章'); }
  isTopic(tpc) { return tpc == this.getTopic(); }
  setTopic(tpc) { this.topic = tpc; return this; }
  set(key, val) { key && val && (this[key]=val); return this; }
  isMulti() { return !!this.idEnd; }
  idDisp() {
    if (!this.isMulti()) return toW(this.id, 4, '0');
    var a = toW(this.id, 4, '0'), b = toW(this.idEnd, 4, '0'), i;
    for (i=0; (i<4) && (a[i]==b[i]); ++i);
    if (i>0) b = b.substring(i);
    return `${a}~${b}`;
  }
  getSubfolder() {
    if (this.id <=  999) return 'books';
    if (this.id <= 2016) return 'books2';
    if (this.id <= 2999) return 'books3';
    if (this.id >= 9000) return 'books9';
    throw `Don't know where to find ${this.id} work.`;
  }
  renderMutlPiece(buf) {
    var len = this.idEnd - this.id + 1, nxtln;
    if (len <= 10) {
      buf.w('　');
      for (var i=0; i<len; ++i) {
        var n = i+1;
        if (n <= 10) n = zNumber(n);
        buf.w(` <a href="book/${this.getSubfolder()}/${toW(this.id+i,4,'0')}.htm">${n}</a>`);
      }
    } else {
      var buf1 = new Buffer();
      buf1.w('　');
      for (var i=0; i<len; ++i) {
        var n = i+1;
        if (n <= 10) n = zNumber(n);
        buf1.w(` <a href="book/${this.getSubfolder()}/${toW(this.id+i,4,'0')}.htm">${n}</a>`);
        if (i == 24) buf1.w('<br>　');
      }
      nxtln = buf1.render();
    }
    buf.w('</td>');
    return nxtln;
  }
  render(buf) {
    var nxtln;
    buf.w(`<tr><td valign=top${toAttr('class', this.idCls)}>${this.idDisp()}</td>`);
    if (this.isMulti()) {
      buf.w(`<td>《<span class="${this.isSutra?'sutra':'orig'}">${this.title}</span>》`, this.note || '');
      nxtln = this.renderMutlPiece(buf);
    } else {
      var a = this.title.split('|');
      for (var i=0; i<a.length; ++i)
        a[i] = `《<a class="${this.isSutra?'sutra':'orig'}" href="book/${this.getSubfolder()}/${this.idDisp()}.htm">${a[i]}</a>》`;
      buf.w(`<td>${a.join('又名')}`, this.note || '', '</td>');
    }
    buf.w(`<td valign=top>${(this.author||this.translator||'').replaceAll('|','，')}</td></tr>`);
    nxtln && buf.w(`<tr><td></td><td colspan=2>${nxtln}</td></tr>`);
  }

} // end of BfnnWork.

class BfnnWorkSpecial extends BfnnWork {
  constructor(nums, title, isSutra, author, translator) {
    super(nums, title, isSutra, author, translator);
  }
  renderMutlPiece(buf) {
    if (this.id == 880) { // 880~90 大佛頂如來密因修證了義諸菩薩萬行首楞嚴經文句 蕅益智旭
      buf.w(`<br>　<a href="book/${this.getSubfolder()}/${toW(this.id,4,'0')}.htm">玄義</a>`);
      var len = this.idEnd - this.id + 1;
      for (var i=1; i<len; ++i) {
        var n = i;
        if (n <= 10) n = zNumber(n);
        buf.w(` <a href="book/books/${toW(this.id+i,4,'0')}.htm">${n}</a>`);
      }
      return null;
    }
    if (this.id == 1746) { // 1746~8 流浪者群歌—聖者的生命故事 明暘法師
      buf.w('<br>',
            '　<a href="book/books2/1746.htm">佛陀的一生</a>',
            '　<a href="book/books2/1747.htm">佛陀的十大弟子</a>',
            '　<a href="book/books2/1748.htm">五大菩薩</a>');
      return null;
    }
    return super.renderMutlPiece(buf);
  }
}

const BFNN_WORKS = [];

(() => {
  var data =
`淨土法門#3 龍舒淨土文 王日休居士譔
圓覺經　#15=sutra 大方廣圓覺修多羅了義經 唐佛陀多羅譯
淨土法門#56 淨土十疑論 智者大師
　　　　#57=sutra 佛說四十二章經 摩騰、竺法蘭共譯
淨土法門#60 無住生心集 淨空法師
人生　　#70 飭終須知 釋世了敬述
金剛經　#77 金剛經講義節要 淨空法師 // (對應0868.htm)
佛學基礎#78 認識佛教—幸福美滿的教育 淨空法師會本// (一九九一年邁阿密)
楞嚴經　#82=sutra 大佛頂首楞嚴經 般剌密帝譯
　　　　#83=sutra 阿難問事佛吉凶經 安世高譯
　　　　#84=sutra 佛遺教經 鳩摩羅什譯
　　　　#85=sutra 佛說八大人覺經 安世高譯
淨土法門#86=sutra 佛說阿彌陀經 鳩摩羅什譯
淨土法門#89=sutra 佛說無量壽經 康僧鎧譯
唯識論　#115 八識規矩頌講記 于凌波居士
唯識論　#117 唯識三十頌講記 于凌波居士
楞嚴經　#145~54 大佛頂首楞嚴經譯解 王治平居士
地藏經　#166~216 地藏菩薩本願經講記 淨空法師主講
金剛經　#229 金剛般若波羅蜜經講記 智諭法師
人物故事#241 憨山大師的一生 宋智明編述
淨土法門#360=sutra 佛說大乘無量壽莊嚴清淨平等覺經 夏蓮居居士會集
淨土法門#362 印光大師文鈔菁華錄 印光大師
佛學基礎#363 認識佛教 淨空法師 // (一九九〇年講于新加坡)
人物故事#364 因果報應錄 唐湘清居士
佛理　　#383~99 恒河大手印 元音老人
善書　　#477 太上感應篇 
佛理　　#482~4 學為人師　行為世範 淨空法師
淨土法門#485~6 淨空法師嘉言錄 淨空法師
善書　　#506 太上感應篇感應選錄 林園佛教堂節錄
善書　　#507 太上感應篇直講
善書　　#510 太上感應篇大意 淨空法師
佛理　　#514 永嘉大師證道歌淺釋 宣化上人
地藏經　#541 論地藏經是佛對在家弟子的遺教 朱鏡宙居士 // (經文引用已加色)
善書　　#608~11 太上感應篇例證語譯 釋海山等
淨土法門#614 往生論節要 淨空法師
佛理　　#842 入香光室 了然法師
淨土法門#871 佛說阿彌陀經要解 蕅益智旭
　　　　#875=sutra 妙法蓮華經 鳩摩羅什譯
金剛經　#868 金剛般若研習報告 淨空法師 // (經文加anchor。標題上加9868鏈接)
楞嚴經　#880~90 大佛頂如來密因修證了義諸菩薩萬行首楞嚴經文句 蕅益智旭 // TODO: 玄義 ...
淨土法門#900~3 佛說阿彌陀經疏鈔演義會本 淨空法師
地藏經　#904 地藏菩薩本願經演孝疏 知性法師
淨土法門#906 彌陀疏鈔 蓮池大師
圓覺經　#943 圓覺經略釋 太虛大師講述
金剛經　#1108~10 金剛般若波羅蜜經講義 江味農居士 // (經文引用皆加序號)
佛理　　#1028 優婆塞戒經講錄 太虛大師
佛理　　#1112 禪宗大意 正果法師
人物故事#1113 虛雲老和尚十難四十八奇 蘇芬居士
佛理　　#1146 大乘起信論 馬鳴菩薩
淨土法門#1119 大勢至菩薩念佛圓通章釋—錄楞嚴經文句卷五 靈峰蕅益大師
佛理　　#1162 大乘起信論直解 明德清直解
心經　　#1217 般若波羅蜜多心經直說 憨山大師
金剛經　#1227 金剛般若波羅密經講義 圓瑛大師 // (經文加anchor，對應0868.htm)
淨土法門#1244 印光大師文鈔論集 印光大師
占察經　#1245 占察善惡業報經講記 夢參老和尚
占察經　#1246 占察善惡業報經論 默如論師
淨土法門#1452~3 淨土探究 大寂法師
地藏經　#1454 地藏菩薩本願經唯識觀 趙亮杰居士
金剛經　#1455 金剛經持驗錄 許添誠
人生　　#1471 玉歷寶鈔 
楞嚴經　#1472~95 大佛頂首楞嚴經講義 圓瑛大師
佛理　　#1561 杜漏 耕雲先生
佛理　　#1562 不二法門 耕雲先生
金剛經　#1565 持誦金剛經得定要訣 耕雲先生
佛理　　#1566 摩訶般若的要義與入門 耕雲先生
楞嚴經　#1643 楞嚴經懸鏡 憨山大師
楞嚴經　#1644~53 楞嚴經通議 憨山大師
佛學基礎#1712 佛學常識課本 李炳南居士
佛學基礎#1715 叩鳴集 李炳南居士
淨土法門#1721 念佛速證菩提心要 廖榮尉居士
善書　　#1722 弟子規易解 
善書　　#1725 三字經易解 章炳麟
人物故事#1729=sutra 佛所行讚|佛本行經 馬鳴菩薩
道德經　#1731 老子道德經憨山註 憨山大師
人物故事#1733 2002年參訪韓日專刊 淨空法師
金剛經　#1736 金剛般若波羅蜜經分段注解 黃昆山居士
佛學基礎#1741 佛教各宗派源流 太虛大師
人物故事#1743 黃石公素書註釋彙編 黃石公
人物故事#1746~8 流浪者群歌—聖者的生命故事 明暘法師 // TODO
佛學基礎#1755 學佛淺說 王博謙居士
楞嚴經　#1762 大佛頂首楞嚴經正脈疏序 交光真鑑|朱俊柵
金剛經　#1814 金剛般若波羅蜜經講義 吳潤江上師述
楞嚴經　#1875~84 大佛頂首楞嚴經講記 海仁法師 // (經文引用皆加序號。提取了科判)<br>
金剛經　#1889 金剛般若波羅密經講義 文珠法師述
佛學基礎#1938 超度的理论与事实 淨空法師
金剛經　#1974 金剛經靈異錄 張少齊居士
人生　　#1977 醫學博士為什麼要素食 奧雲伯列博士等
淨土法門#2049 淨宗法要 憨山大師
施食　　#2051 慈悲施食手冊 海濤法師選輯
唯識論　#2088~93 簡明成唯識論白話講記 于凌波居士
金剛經　#2142 金剛般若波羅密經親聞記 倓虛大師述
佛理　　#2154 永嘉玄覺禪師証道歌略解 倓虛大師
淨土法門#9000 無量壽經優波提舍願生偈 婆藪槃豆菩薩
淨土法門#9001 往生論註 釋曇鸞
佛學基礎#9002 佛法非宗教非哲學，而為今時所必需 歐陽竟無|王恩洋
地藏經　#9003~9 地藏菩薩本願經科註 青蓮大師
施食　　#9010=sutra 佛說救拔焰口餓鬼陀羅尼經 唐三藏沙門不空譯
金剛經　#9868=sutra 金剛般若波羅密經 信裹居士 // (經文特殊排版)<br>　諸經文鏈接到 0868.htm 與 1227.htm 相應解釋。`;

var a = data.split('\n');
for (var i in a) {
  var ln = a[i], note = null, topic = null,
      idx = ln.indexOf('//');
  if (idx > 0) {
    note = ln.substring(idx+2).trim();
    ln = ln.substring(0,idx);
  }
  idx = ln.indexOf('#');
  if (idx > 0) {
    topic = ln.substring(0,idx).trim();
    ln = ln.substring(idx+1).trim();
  }
  var segs = ln.split(' ');
  var nums = segs[0],
      ttl = segs[1],
      ttlextra = null,
      author = segs[2],
      translator = null,
      isSutra = false;
  if (author && (author.indexOf('譯')>0)) { translator = author; author = null; }
  if (nums.endsWith('=sutra')) { isSutra = true; nums = nums.substring(0,nums.length-6); }
  var nums = nums.split('~');
  if (nums.length == 1) nums = parseInt(nums[0]);
  else {
    var len1 = nums[0].length, len2 = nums[1].length;
    if (len2 < len1)
      nums[1] = nums[0].substring(0, len1-len2) + nums[1];
    nums[0] = parseInt(nums[0]);
    nums[1] = parseInt(nums[1]);
  }

  if (note && note.startsWith('TODO'))
    BFNN_WORKS.push(new BfnnWorkSpecial(nums, ttl, isSutra)
                      .set('author',     author)
                      .set('translator', translator)
                      .set('topic',      topic)
                      .set('note',       note.substring(4).trim()));
  else
    BFNN_WORKS.push(new BfnnWork(nums, ttl, isSutra)
                      .set('author',     author)
                      .set('translator', translator)
                      .set('topic',      topic)
                      .set('note',       note));
}

})();
