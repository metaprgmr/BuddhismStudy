var pyGroupNames = [ // pinyin but in alphabetic order
  'a', 'b', 'c', 'ch', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 'sh', 't', 'w', 'x', 'y', 'z', 'zh' ];

// relationships
const AKA      = "AKA",
      PART_OF  = "PART_OF",
      ALSO_SEE = "ALSO_SEE",
      SAMSKRIT = "SAMSKRIT";
var ELID = 1;

class TermInfo {
  constructor(term, info) {
    this.term = term;
    var idx = term.indexOf('|');
    if (idx >= 0) {
      this.aliasOf = term.substring(idx+1);
      this.term = term.substring(0, idx);
    }
    this.info = this._preproc(info);
    this.elid = `e_${ELID++}`;
  }
  isMain() { return !this.aliasOf; }
  relatesTo(term, relationship) {
    if (!this.relations) this.relations = {};
    this.relations[term] = relationship;
    return this;
  }
  _preproc(s) {
    // Turn 見...條 into 見[[...]]條; let displaying handle [[...]].
    for (var idx = 0;;) {
      idx = s.indexOf('見', idx);
      if (idx < 0) break;
      var idx1 = s.indexOf('條', ++idx);
      if (idx1 < 0) break;
      var t = s.substring(idx, idx1);
      if ((t.indexOf('[[') < 0) && (t.length <= 20)) {
        s = `${s.substring(0, idx)}[[${t}]]${s.substring(idx1)}`;
        idx1 += 4;
      }
      idx = idx1;
    }
    return s;
  }
}

class TermGroupByZi {
  constructor(firstZi, strokes) {
    this.firstZi = firstZi;
    this.pinyin  = pinyins[firstZi];
    this.strokes = strokes;
    this.terms   = [];
  }
  find(term) {
    for (var i in this.terms)
      if (this.terms[i].term == term)
        return this.terms[i].info;
    return null;
  }
  add(term, info) {
    var ti = new TermInfo(term, info);
    this.terms.push(ti);
    return ti;
  }
}

class Glossary {
  constructor() {
    this.all = [];
    this.map = {};
    this.allTerms = {}; // a set
  }
  add(strokes, term, info) {
    var zi0 = term[0];
    var tg = this.map[zi0];
    if (!tg) {
      this.map[zi0] = tg = new TermGroupByZi(zi0, strokes);
      this.all.push(tg);
    }
    var t = tg.add(term, info);
    this.allTerms[t.term] = true;
    return this;
  }

  containsTerm(term) { return this.allTerms[term]; }

  getTermsPerZi(zi) { return this.map[zi]; }

  getIndexByPhonetics() {
    var ziGroups = {}, zis = Object.keys(this.map), groups = {};
    for (var i in zis) {
      var zi = zis[i], py = pinyins[zi];
      var pygroup = (py[1] == 'h') ? py.substring(0,2) : py[0],
          obj = { zi, py },
          lst = groups[pygroup];
      if (!lst) groups[pygroup] = lst = [ obj ]; else lst.push(obj);
    }
    var ret = [];
    for (var i in pyGroupNames) {
      var gn = pyGroupNames[i];
      var g = groups[gn];
      if (g) {
        g.sort((a,b) => a.py.localeCompare(b.py));
        g = g.map((a) => a.zi);
        ret.push({ group:gn, zis:g.join('') });
      }
    }
    return ret;
  }

  getIndexByStrokes() {
    var ret = [];
    for (var i in this.all) {
      var tg = this.all[i];
      var n = tg.strokes, x = ret[n];
      if (!x) ret[n] = x = { strokes:n, zis:[] };
      x.zis.push(tg.firstZi);
    }
    ret = ret.filter((x) => !!x);
    ret = ret.map((x) => { return { strokes:x.strokes, zis:x.zis.join('') } });
    return ret;
  }

  getAllLeadZis() {
    if (!this._cachedAllLeadZis) {
      var buf = new Buffer();
      for (var i in this.all) buf.w(this.all[i].firstZi);
      this._cachedAllLeadZis = buf.render();
    }
    return this._cachedAllLeadZis;
  }

  getAllTerms(mainOnly) {
    var cacheName = mainOnly ? '_cachedMainTerms' : '._cachedAllTerms';
    var ret = this[cacheName];
    if (!ret) {
      ret = [];
      for (var i in this.all) {
        var terms = this.all[i].terms;
        for (var j in terms) {
          var t = terms[j];
          if (!mainOnly || t.isMain())
            ret.push(t.term);
        }
      }
      this[cacheName] = ret;
    }
    return ret;
  }

} // end of Glossary.

// Singletons:
var pinyins = getPinyins(),
    foTerms = new Glossary(),
    tableCharts = gpRepo; // in gridperfect.js

function addTerms() {
  var strokes = arguments[0];
  for (var i=1; i<arguments.length; ++i)
    foTerms.add(strokes, arguments[i], info = arguments[++i]);
}

function getBPMF(x) {
  return x && ((x[1] == 'h') ? x.substring(0,2) : x[0]);
}

function getPinyins() {
  var pys =
`一yi 二er2 七qi 八ba 九jiu3 十shi2 人ren2 入ru4 了liao3 刀dao 力li4 三san 大da4 上shang4 下xia4
乞qi3 口kou3 女nv3 子zi3 小xiao3 尸shi 己ji3 已yi3 工ging 千qian 凡fan2 丈zhang4 心xin 手shou3
文wen2 方fang 木mu4 止zhi3 比bi3 公gong 毛mao2 水shui3 火huo3 不bu4 中zhong 五wu3 元yuan2 內nei4
六liu4 分fen 化hua4 引yin3 天tian 少shao3 幻huan4 反fan3 仁fen2 丹dan 去qu4 平ping2 世shi4 主zhu3
乏fa2 他ta 出chu 加jia 功gong 北bei3 半ban4 古gu3 叫jiao4 台tai2 四si4 布bi4 外wai4 弘hong2 尼ni2
永yong3 末mo4 本ben2 正zheng4 玄xuan2 犯fan4 甘gan 生sheng 用yong4 目mu4 示shi4 由you2 白bai2
忉dao 以yi3 色se4 此ci3 伏fu2 光guang 共gong4 劣lie4 印yin4 合he2 同tong2 名ming2 回hui2 因yin
地di4 在zai4 多duo 如ru2 妄wang4 字zi4 安an 寺si4 年nian2 式shi4 羊yang2 血xue3 托tuo 有you 次ci4
死si3 污wu 灰hui 牟mou2 百bai2 竹zhu2 老lao3 耳er3 肉rou4 自zi4 至zhi4 舌she2 行xing2 衣yi 西xi
伎ji4 任ren4 吉jie2 弟di4 伽ga 但dan4 位wei4 住zhu4 佛fo2 杜du4 作zuo4 初chu 判pan4 別bie2 劫jie2
利li4 卵luan3 忘wang4 吠fei4 含han2 坐zuo4 妙miao4 希xi 形xing2 忌ji4 忍ren3 成cheng2 我wo3 戒jie4
扶fu2 折zhe2 求qiu2 決jue2 沈chen2 沙sha 見jian4 言yan2 貝bei4 身shen 那na4 邪xie2 妓ji4 技ji4
法fa3 乳ru3 事shi4 使shi3 直zhi2 來lai2 供gong4 依yi 到dao4 制zhi4 剎cha4 兩liang3 具ju4 取qu3
受shou4 周zhou 咒zhou4 表biao3 泥ni2 招zhao 味weu4 呵he2 命ming4 和he2 夜ye4 始shi3 孤gu 宗zong
定ding4 居ju 彼bi3 往wang3 念nian4 忿fen4 性xing4 所suo3 披pi 拔ba 拘ju 放fang 明ming2 易yi4
東dong 果guo3 枝zhi 波bo 炎yan2 盂yu3 知zhi 空kong 舍she3 花hua 近jin4 金jin 長chang2 阿a 陀tuo2
雨yu3 青qin 非fei 竺zhu2 拈nian 皈gui 南nan2 俗su2 信xin4 剃ti4 枯ku 前qian2 即ji2 垢gou4 契qi4
威wei 帝di4 幽you 度du4 律lv4 後hou4 思si 怨yuan4 恆heng2 拜bai4 持chi2 施shi 星xing 是shi4 染ran3
柔rou2 毘pi2 流liu2 界jie4 相xiang4 眉mei2 祇qi3 耶ye 背bei4 胎tai 紅hong2 苦ku3 苾bi4 衲na4
段duan4 計ji4 軌gui3 迦jia 重zhong4 降xiang2 音yin 聲sheng 風feng 飛fei 食shi2 首shou3 香xiang
乘chen2 兼jian 冤yuan 息xi 悔hui3 悟wu4 旁pang2 桓huan2 退tui4 馬ma3 骨gu3 能neng2 特te4 荼tu2
修xiu 俱ju4 倒dao4 冥ming3 唐tang2 夏xia4 娑suo 害hai4 宴yan4 剋ke4 差cha 師shi 恚hui4 恩en 恭gong
峨e2 根geng 海hai3 涅nie4 畜qu4 病bing4 迴hui2 真zhen 破po 秘mi4 神shen2 納na4 素su4 脅xie2 般ban
衰shuai 記ji4 財cai2 貢gong4 起qi3 迷mi2 追zhui 鬼gui3 展zhan3 浮fu2 假jia3 偈jie2 偏pian 停ting2
偷tou 兜dou 參can 唯wei2 國gip2 執zhi2 婆po2 淫ying3 宿su4 寂ko4 密mi4 常chang2 得de2 從cong2 悉xi
捨she 授shou4 掉diao4 掛gua4 接jie 教jiao4 救jiu4 曼man4 梵fan2 欲yu4 殺sha 淨jing4 深shen 清qing
牽qian 現xian4 理li3 畢bi4 眼yan3 第di4 細xi4 惛hun 終zhong 習xi2 莊zhuang 袈jia 貪tan 通tong
琉liu2 曹cao2 閉bi4 陰yin 雪xue3 頂ding3 鹿lu4 梁liang2 野ye3 惠hui4 絕jue2 童tong2 傍pang4
勝sheng4 善shan4 喜xi3 喇la3 堪kan 報bao4 富fu4 寒han2 尊zun 尋xun2 強qiang2 遍pian4 悲bei 惑huo4
惡e4 散sab4 普pu3 智zhi4 最zui4 減jian3 無wu2 焰yan4 燃ran2 琰yan2 異yi4 登deng 發fa 眾zhong
等deng3 結jie2 給gei3 菩pu2 華hua 菴yan 虛xu 補bu3 超chao 跏jia 進jin4 都dou 鈍dun4 開kai 間jian
須xu 喘chuan3 順shun4 奢she 黑hei 黃huang2 提ti2 亂luan4 傳fu4 勢shi4 勤qin2 圓yuan2 塔ta3 塚zhong3
微wei 想xiang 意yi4 愚yu2 愛ai4 敬jin4 感gan3 會hui4 極ji2 楞len4 業ye4 滅jian3 煖nuan3 煩fam2
犍jian4 獅shi 瑜yu2 當dang 痴chi 睡shui4 禁jing4 瑞rui4 稟bin3 經jing 罪zui4 群qun2 聖sheng4 萬wan4
著zhuo3 葷hun 解jie3 資zi 路lu4 辟bi4 遊you2 運yun4 過guo4 道dao4 達da2 違wei3 酪lao4 缽bo 電dian4
預yu4 頓dun4 飲yin3 鳩jiu 塗tu2 新xin 準zhun3 像xiang4 僧seng 厭yan4 塵chen 境jing4 壽shou4 實shi2
對dui4 慈ci2 慚chan2 慢man4 慳jian 滿man3 漏lou4 漸jian4 疑yi2 盡jin4 福fu2 種zhong3 稱chen 精jing
維wei2 綺yi2 緇zi 聞wen2 蓋gai4 誓shi4 語yu3 說shuo 輕qin 遠yuan3 銀yin2 銅tong2 障zhang4 魂hun2
鼻bi2 嘉jia 漉lu4 增zeng 廣guang3 影ying3 德de2 慧hui4 憍jiao 摩mo2 敷fu 數shu4 樂le4 潔jie2 熟shu2
熱re2 瞋chen 緣yuan2 羯jie 蓮lian2 誹fei3 調tiao2 論lun4 賢xian2 質zhi4 趣qu4 輪lun2 遮zhe 溈wei1
澄cheng2 劍jian4 撥bo 彈dan4 歎tan4 器qi4 學xue2 導dao2 憶yi4 懈jie4 擇ze2 曇tan2 樹shu4 機ji
橫heng2 濁zhuo2 燄yan4 燈deng 燒shao 獨di2 縛bo2 蕅ou3 融rong2 遵zun 親qin 睹du3 諦di4 諸zhu 諳an4
賴lai1 遶nao2 醍ti2 錫xi 閻yan2 隨sio2 靜jing4 頭tou2 頻pin2 餓e4 龍long2 優you 彌mi2 應ying 戲xi4
檀tan2 濕shi 濟ji4 禪chan2 糞fen4 總zong3 臨lin2 膿mong2 薄po2 薩sa 謗pang4 還huan2 闍du 齋qi2
繁fan2 旛fan 瞿qu2 叢ye4 雙shuang 斷duan4 歸gui 禮li2 穢hui 薰xun 醫yi 藏zang4 轉zhuan3 勸qian4
壞huai4 懷huai2 攀pan 繫xi4 曠kuang4 犢du2 羅luo2 藥yao4 證zheng4 譏ji 識shi2 邊bian 願yuan4
顛dian 離li2 難nan2 嚴yan2 寶bao3 懺chan4 蘇su 蘊yun4 覺jue2 觸chu4 譯yi 譬pi 釋shi4 闡chan3 露lu4
鶖jiu 攝she4 灌guan4 瓔ying 纏chan2 羼chan4 蘭lan2 護hu4 辯bian4 鐵tie3 饑ji 饒rao2 驅qu 鬘man4
魔mo2 歡huan 權quan2 聽tin 讀du2 變bian4 顯xian3 體ti3 鷲jiu 靈ling2 觀guan 讚zan 麤cu`;
  var a = pys.split('\n'), ret = {};
  for (var i in a) {
    var a1 = a[i].split(' ');
    for (var j in a1) { var x = a1[j]; ret[x[0]] = x.substring(1); }
  }
  return ret;
}

