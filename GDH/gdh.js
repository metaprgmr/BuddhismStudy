
// crux
var ypcolor, yptone = 'yptone'; // CSS class names, if any
class YPInfo
{
  constructor(yp) {
    if (!yp) return;
    var len = yp.length;
    if (len > 2) {
      var v, c, first2 = yp.substring(0,2);
      switch(first2) {
      case 'ng': if (yp == 'ng') { v = ''; c = 'ng'; break; } // else, fall thru
      case 'gw':
      case 'kw': v = yp.substring(2,len-1); c = first2; break;
      default:
        switch(yp[0]) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
        case 'y': v = yp.substring(0,len-1); c = ''; break;
        default:  v = yp.substring(1,len-1); c = yp[0]; break;
        }
      }
      this.consonant = c || '';
      this.vowel = v;
      this.tone = yp[len-1];
    }
  }
  toYP(simple) {
    if (simple) return this.consonant + this.vowel + (this.tone||'');
    var ret = yptone && this.tone ? `<font class="yptone">${this.tone}</font>` : (this.tone||'');
    ret = `${this.consonant}${this.vowel}<font class="yptone">${ret}</font>`;
    return !ypcolor ? ret : `<font class="${ypcolor}">${ret}</font>`;
  }
  toYP_rt(rpad) {
    var cls = ypcolor ? ` class="${ypcolor}"` : '';
    var ret = yptone && this.tone ? `<font class="yptone">${this.tone}</font>` : (this.tone||'');
    ret = `${this.consonant}${this.vowel}<font class="yptone">${ret}</font>`;
    return `<rt${cls}>${ret}${rpad||''}</rt>`;
  }
  toConsonantTone(divider) { return `${this.consonant}${this.consonant ? (divider||'-') : ''}${this.tone}`; }
}

const GENERAL = 100; // general level
const FAUXAMIS_ONLY = -100;
class ZiInfo {
  constructor(zi, yp, level, isFA) {
    this.zi = zi;
    this.level = level;
    this.isFA = isFA;
    this.yps = [];
    var yps = yp.split('/');
    for (var i in yps) this.addYP(yps[i].trim());
  }
  addYP(yp) { this.yps.push(new YPInfo(yp)); }
  getYPInfo(hint) {
    if (hint && (this.yps.length > 1)) {
      for (var i in this.yps) {
        var yp = this.yps[i];
        if ((yp.consonant + yp.vowel).startsWith(hint)) return yp;
      }
    }
    return this.yps[0];
  }
  getYP(hint)         { return this.getYPInfo(hint).toYP(); }
  getYP_rt(rpad,hint) { return this.getYPInfo(hint).toYP_rt(rpad); }
  getConsonant(hint)  { return this.getYPInfo(hint).consonant; }
  getConsonantTone(divider,hint) { return this.getYPInfo(hint).toConsonantTone(divider); }
  getFirstYP()        { return this.yps[0].toYP(); }
  getFirstVowel()     { return this.yps[0].vowel; }
  getFirstConsonant() { return this.yps[0].consonant; }
  getFirstConsonantTone(divider) { return this.yps[0].toConsonantTone(divider); }
  isFaultAmi()        { return this.isFA; }
  isPoly()            { return this.yps.length > 1; }
  getAllYPs(sep) {
    var a = [];
    for (var i in this.yps) a.push(this.yps[i].toYP(true));
    return a.join(sep || ', ');
  }
}

class ZiInfoPoly {
  constructor(ziinfo,hint) { this.ziInfo = ziinfo; this.hint = hint; }
  getYP()        { return this.ziInfo.getYPInfo(this.hint).toYP(); }
  getYP_rt(rpad) { return this.ziInfo.getYPInfo(this.hint).toYP_rt(rpad); }
  isFaultAmi()   { return this.ziInfo.isFaultAmi(); }
}

class YPDict {
  constructor() {
    this.store = {};
    this.notAvailable = '';
    this.usedFauxAmis = '';
  }

  printNotAvailable() {
    if (this.notAvailable) console.log('Not available:', this.notAvailable);
    if (this.usedFauxAmis) console.log('Used fauxamis:', this.usedFauxAmis);
  }

  add(ziInfo) { this.store[ziInfo.zi] = ziInfo; return this; }

  clearIgnoreLevel(level) { return setIgnoreLevel('none'); }

  setIgnoreLevel(level) {
    this.ignoreLevel = null;
    switch(level) {
    case 0: case '0': this.ignoreLevel = 0; break; // none
    case 1: case '1': this.ignoreLevel = 1; break;
    case 2: case '2': this.ignoreLevel = 2; break;
    case 3: case '3': this.ignoreLevel = 3; break;
    case 4: case '4': this.ignoreLevel = 4; break;
    case 5: case '5': this.ignoreLevel = 5; break;
    case 6: case '6': this.ignoreLevel = 6; break;
    case 7: case '7': this.ignoreLevel = 7; break;
    case 8: case '8': this.ignoreLevel = 8; break;
    case 9: case '9': this.ignoreLevel = 9; break;
    default: if (typeof level === 'string' && level.toLowerCase().startsWith('fau'))
               this.setFauxAmisOnly();
    }
    return this;
  }

  setFauxAmisOnly() { this.ignoreLevel = FAUXAMIS_ONLY; return this; }

  isFaultAmi(zi) { var i = this.store[zi]; return i && i.isFaultAmi(); }

  lookup(zi, hint) {
    zi = zi.trim();
    if (!zi.length || isPunc(zi))
      return null;
    var zinfo = this.store[zi];
    if (zinfo) {
      if (!hint) {
        if (zinfo.isFaultAmi() && (this.usedFauxAmis.indexOf(zi) < 0)) this.usedFauxAmis += zi;
        if (this.ignoreLevel === FAUXAMIS_ONLY) zinfo.isVisible = zinfo.isFaultAmi();
        else zinfo.isVisible = (this.ignoreLevel == null) || (zinfo.level > this.ignoreLevel);
      }
    } else if ((this.notAvailable.indexOf(zi) < 0) && isHanZi(zi)) {
      this.notAvailable += zi;
    }
    return zinfo;
  }

  groupByVowel() {
    var info = {};
    var zis = Object.keys(this.store);
    zis.sort();
    for (var i in zis) {
      var zinfo = this.lookup(zis[i]);
      if (!zinfo) continue;
      var vwl = zinfo.getFirstVowel();
      var lst = info[vwl];
      if (!lst) lst = info[vwl] = [];
      lst.push(zinfo);
    }
    return info;
  }

  groupByConsonant() {
    var info = {};
    var zis = Object.keys(this.store);
    zis.sort();
    for (var i in zis) {
      var zinfo = this.lookup(zis[i]);
      if (!zinfo) continue;
      var csn = zinfo.getFirstConsonant();
      var lst = info[csn];
      if (!lst) lst = info[csn] = [];
      lst.push(zinfo);
    }
    return info;
  }
}

class LookupTool {
  constructor(dict, firstN) {
    this.dict = dict;
    this.firstN = firstN;
    this.ziCounts = {};
  }

  lookup(zi, hint) {
    var cnt = this.ziCounts[zi];
    this.ziCounts[zi] = !cnt ? 1 : (cnt+1);
    var zinfo = this.dict.lookup(zi);
    if (zinfo) {
      zinfo.useCount = this.ziCounts[zi];
      if (!hint && this.firstN != null && zinfo.useCount > this.firstN)
        zinfo.isVisible = false;
    }
    return zinfo;
  }
}

var dict = new YPDict(); // zi => ZiInfo
var lookuptool = dict;
var todo = {}; // as a set

const NOYP = '-', DOYP = ' ', PUNC = '.';

class YPLine {
  constructor(ln) {
    this.totalPunc = 0;
    this.totalText = 0;
    this.totalRuby = 0;

    // STEP 1, parse the line into this.line (pure text) and this.hints (annotations)
    this.hints = [];
    var i, zi, len=ln.length, trueln='', ptr=0;
    for (i=0; i<len; ++i, ++ptr) {
      zi = ln[i];
      if (zi == '[') { // parse
        var j = ln.indexOf(']', i+1);
        if (j>i) { // found
          var tmp = ln.substring(i+1,j).split('|');
          i = j;
          zi = tmp[0];
          if (tmp.length > 1) this.hints[ptr] = tmp[1];
        }
      }
      trueln += zi;
    }
    this.line = trueln;

    // STEP 2. establish this.lineYPInfo for 粵拼 info
    var y = []; // to parallel x, indicating if a zi needs YP or not.
                // Initialized by lookup, and can be altered along the way of rendering.
    var i, zi, zinfo, yp, noyp = {}, len = this.line.length;
    for (i=0; i<len; ++i) {
      var theZi = zi = this.line[i];
      if (isPunc(zi)) { y[i] = PUNC; ++this.totalPunc; continue; }
      ++this.totalText;
      if (y[i] == NOYP) ; // already decided; nothing to do
      else if (noyp[zi]) y[i] = NOYP; // optimize to save unnecessary future lookups
      else {
        zinfo = lookuptool.lookup(zi, this.hints[i]);
        if (!zinfo || !zinfo.isVisible) {
          noyp[zi] = true;
          y[i] = NOYP;
        } else {
          var hint = this.hints[i];
          y[i] = hint ? new ZiInfoPoly(zinfo, hint) : zinfo;
          // enhance: now don't do YP for the following N zis, since it has just occurred...
          const N = 30;
          for (var cnt=N, i1=i+1; (cnt>0) && (i1<len); ++i1, --cnt) {
            if (y[i1] == PUNC) { ++cnt; continue; } // punctuations don't count
            if (this.line[i1] == theZi) y[i1] = NOYP;
            if (this.line[i1] == '\n') break;
          }
        }
      }
    }
    this.lineYPInfo = y;
  }

  toText() {
    var disp = '', len = this.line.length;
    for (i=0; i<len; ++i) {
      var zi=this.line[i], zilen=1, zinfo=this.lineYPInfo[i], cls='';
      if (typeof zinfo == 'object') {
        var yp = zinfo.getYP();
        cls = zinfo.isFaultAmi() ? ' class="faultami"' : '';
        var ypRPad = '';
        if ((i < len-1) && (this.line[i+1] == zi)) {
          // enhance: same YP on consecutive zis
          zi += zi;
          ++zilen;
          ++i;
        }
        else
        // enhance: if there is a space after the current, put yp atop the zi and space
        if (this.line[i+1] == ' ' || this.line[i+1] == '　') {
          zi = '<font ' + cls + '>' + zi + '</font>' + this.line[++i];
          ++zilen;
          cls = '';
        }
        else
        // enhance: if there is a space before the current, put yp atop the zi and space
        if (disp[disp.length-1] == ' ' || disp[disp.length-1] == '　') {
          zi = disp[disp.length-1] + '<font ' + cls + '>' + zi + '</font>';
          ++zilen;
          disp = disp.substring(0, disp.length-1);
          cls = '';
        }
        else
        // enhance: check before and after, to place long YPs atop 3 zis.
        if ((yp.length > 3) &&
            (disp.length > 0) && (disp[disp.length-1] != '>') && !isWhite(this.line[i-1]) &&
            (i < len-1) && (typeof this.lineYPInfo[i+1] != 'object') && !isWhite(this.line[i+1])) {
          zi = disp[disp.length-1] + '<font ' + cls + '>' + zi + '</font>' + this.line[++i];
          zilen += 2;
          disp = disp.substring(0, disp.length-1);
          cls = '';
        }
        else
        // enhance: check if it is followed by a punctuation, to place long YPs atop the two.
        if ((yp.length > 3) && (i < len-1) && (this.lineYPInfo[i+1] == PUNC)) {
          if (yp.length <= 4) ypRPad = '&nbsp;';
          zi = '<font ' + cls + '>' + zi + '</font>' + this.line[++i];
          ++zilen;
          cls = '';
        }
        var lst = zi.length ? zi[zi.length-1] : '';
        if ((lst == ' ') || (lst == '　') || isPunc(lst) && (zilen == 2))
          cls += ' style="ruby-align:start"';
        zi = `<ruby${cls}>${zi}${zinfo.getYP_rt(ypRPad)}</ruby>`;
        ++this.totalRuby;
      }
      disp += zi;
    }
    return disp;
  }
}

(function() {
  var fauxamis = toSet(
    '集習坑立泣疾急蜜畢吉訖迄乞漆禽禁坎堪尋品斤近貧熏勤仁新欽溪偽詣齎繫誦' +
    '及稽繼攜救愁據舉驅淳卻斫腳像羌祥響強棄器欺歧履俗熾寺棘竊設諂禪親許引' +
    '顯遣荊矜輕勸丸戀泉雪血速曲膝因休鄰逆誣繳劇井陷徙懈糺煢忪鋸兄犬牛伎乳' +
    '邑懇雀攫臨什忽薰突屈欣幸' +
    '差拖哽玷樂咄'); // 《地藏經》讀者發音迥異！
  function _isFA(zi) { return fauxamis[zi] }

  var ignoreLevels = [
    toSet( // 0: polyphones, and the most frequent
      '佛相' +
      '一二三四五六七八九十百千萬億第菩薩摩訶釋迦阿彌陀勒經世界王我汝他人號' +
      '善來去剎光明法中上下東北西南今時間大小國土道方諸白是無不非其如已此不' +
      '在與同所謂真正者以為當曰現最雖故何但悉各有爾次之於乃或又并由而作則衆' +
      '也即子可能必得常皆等唯耶生心金自令至盡反天地義會海定門才身愛願導路壽' +
      '悲哀精過從惡雨黃香洞池水持命意是言男女發多羅老'),

    toSet( // 1: easy-to-recognize
      '聞山達難首普賢值葉士昧告往字那通力異意議固索剛平風男女紅芳用凡功德家' +
      '貢氏叢副伐盲狂痛挂旦狐讀夢塔燈河房閣寧左思清聰古孤娑婆梵廣夜種宮慈波' +
      '木放煩龍因供發終共搏衣腹翻資落慢旛齒散嘆困獅擁靈惛總婦醫昔瓔珞愈回乖' +
      '師檀依目事辟支返華私示鐵圍拔應浪聽蒙停違污還銅壞磨湯馬安彈指斯伏睹鎖' +
      '莫滅貌歌露請易智慧眾知母破念服多度本寶食答疑福奉疫輔毛語住淨羅公碧青' +
      '袈裟庭擔別恭動胡座犯營魔躬玩領覆溫保情遇柱沙冰後衛畫護神慘高志貴英根' +
      '勇足數衆博瑩量'),

    toSet( // 2: sutra-frequent:
      '信說頌假提曾火莊嚴若死微妙行絕解脫始初成復想言歎部切聲劫極滿教實色遠' +
      '離眼比丘益漏盡含果見彼名歡喜受虛空決求音退猛忍開登岸弘誓俱胝授記轉出' +
      '日隨超養深乘友使救修誦讚演書寫譬恆處闇照獲久勤長利理稱孝植識惑歲習勝' +
      '尊耨藐威類進堅具劣瞻禮觀珍弟窮幾歸增就輪迴豐田取分聖集惟辯究竟藏降')
  ];

  var a =
`一二三四五六七八九十
jat1 ji6 saam1 sei3 ng5 luk6 cat1 baat3 gau2 sap6
弗佛目犍連我時山中與王萬千俱通已達
fat1 fat1 muk6 gin1 lin4 ngo5 si4 saan1 zung1 jyu5 wong4 maan6 cin1 keoi1 tung1 ji5 daat6
名而上首阿難薩會曰大比丘迦
ming4/meng2 ji4 soeng6 sau2 aa3 naan4 saat3 wui5 joek6 daai6 bei2 jau1 gaa1
普文殊師彌勒皆來第解脫觀緣起威光述
pou2 man4 syu4 si1 mei4 lak6 gaai1 loi4 dai6 gaai2 tyut3 gun1 jyun4 hei2 wai1 gwong1 seot6
城耆闍崛切聖其舍利又有及賢劫集正士
sing4 kei4 dou1 gwat6 cit3 sing3 kei4 se3 lei6 jau6 jau5 kap6 jin4 gip3 zaap6 zing3 si6
尊者憍陳惟神華寂信願慧香象寶英住制
zyun1 ze2 giu1 can4 wai4 san1 waa4 zik6 seon3 jyun6 wai6 hoeng1 zoeng6 bou2 jing1 zyu6 zai3
咸共遵修具足無量遊宣赫奕如融金聚在
haam4 gung6 zeon1 sau1 geoi6 zuk1 mou4 loeng6 jau4 syun1 haak1 jik6 jyu4 jung4 gam1 zeui6 zoi6
理福田貯功德藥救療升灌頂階授菩提記為
lei5 fuk1 tin4 cyu5 gung1 dak1 joek6 gau3 liu4 sing1 gun3 ding2 gaai1 sau6 pou4 tai4 gei3 wai6
教習相應熟邊善根護念剎譬幻異相實此
gaau3 zaap6 soeng1/soeng3 jing3 suk6 bin1 sin6 gan1 wu6 nim6 caat3 pei3 waan6 ji6 soeng3 sat6 ci2
遠超亦復是供養開導群身猶電裂見網纏縛
jyun5 ciu1 jik6 fau6 si6 gung1 joeng5 hoi1 dou6 kwan4 san1 jau4 din6 lit6 gin3 mong5 cin4 bok3
權方便入法藏究竟彼岸捨兜率聲聞辟支
kyun4 fong1 bin6 jap6 faat3 zong4/cong4 gau3 ging2 bei2 ngon6 se2 dau1 leot2/seot1 sing1 man4 pik1 zi1
地降宮棄位出家苦行學道斯示現順世間故以
dei6 hong4/gong3 gung1 hei3 wai6 ceot1 gaa1 fu2 hang4 hok6 dou6 si1 si6 jin6 seon6 sai3 gaan1 gu3 ji5
定力伏魔怨得微妙成最天人歸仰請真際
ding6 lik6 fuk6 mo1 jyun3 dak1 mei4 miu6 sing4 zeoi3 tin1 jan4 gwai1 joeng5 cing2 zan1 zai3
轉輪說乘壽莊嚴清淨平等覺經白調衆生
zyun2 leon4 syut3 sing4 sau6 zong1 jim4 cing1 zing6 ping4 dang2 gok3/gaau3 ging1 baak6 diu6 zung3 sang1
常音破煩惱壞諸欲塹洗濯垢污顯明所謂滅摩
soeng4 jam1 po3 faan4 nou5 waai6 zyu1 juk6 cim3 sai2 zok6 gau3 wu1 hin2 ming4 so2 wai6 mit6 mo1
辯才幢安之步於界作黎能性空陀羅尼悟門立智
bin6 coi4 cong4 on1 zi1 bou6 jyu1 gaai3 zok3 lai4 nang4 sing3 hung1 to4 lo4 nei4 ng6 mun4 laap6 zi3
思總持百昧深禪悉睹頃徧下度土隨化物意自過心
si1 zung2 ci4 baak3 mui6 sam1 sim4 sik1 dou2 king2 pin3 haa5 dou6 tou2 ceoi4 faa3 mat6 ji3 zi6 gwo3 sam1
可己拯濟負荷獲女色梵興悲愍情演慈分別語言
ho2 gei2 cing2 zai2 fu6 ho6 wok6 neoi5 sik1 faan4 hing1 bei1 man5 cing4 jin2 ci4 fan1 bit6 jyu5 jin4
獄餓鬼禽獸蜎飛蠕動類聽察若證令歡喜稽禮
juk6 ngo6 gwai2 kam4 sau3 jyun1 fei1 jyu4 dung6 leoi6 ting1 caat3 joek6 zing3 ling6 fun1 hei2 kai2 lai5
須飲食衣服種場樹高殿樓池流補處除本諦勝
seoi1 jam2 sik6 ji1 fuk6 zung2 coeng4 syu6 gou1 din6 lau4 ci4 lau4 bou2 cyu2 ceoi4 bun2 dai3 sing1
合掌惡國麤不圓滿被弘誓鎧趣或永離繞匝樂
hap6 zoeng2 ok3 gwok3 cou1 bat1 jyun4 mun5 bei6 wang4 sai6 hoi2 ceoi3 waak6 wing5 lei4 jiu2 zaap3 lok6/ngaau6/ngo3
取退爾從告偈頌建當雨珍震閉塞昔散然尅果冥
ceoi2 teoi3 ji5 cung4 gou3 gai2 zung6 gin3 dong1 jyu5 zan1 zan3 bai3 sak1 sik1 saan2 jin4 hak1 gwo2 ming4
厄倦譏他虛偽諂曲志必至戒忍辱精進落眷屬
aak1 gyun6 gei1 taa1 heoi1 ngai6 cim2 kuk1 zi3 bit1 zi3 gaai3 jan2 juk6 zing1 zeon3 lok6 gyun3 suk6
和顏愛勸諭策貪瞋癡想廓廣向專發雄子吼
wo4 ngaan4 oi3 hyun3 jyu6 caak3 taam1 can1 ci1 soeng2 gwok3/kwok3 gwong2 hoeng3 zyun1 faat3 hung4 zi2 haau1
號就長夜施主窮著恆東南西北維議業汝億同也雖
hou4 zau6 zoeng2/coeng4 je6 si1 zyu2 kung4 zoek3/zoek6 hang4 dung1 naam4 sai1 bak1 wai4 ji5 jip6 jyu5 jik1 tung4 jaa5 seoi1
由旬知耶小江海陵坑坎荊棘沙礫鐵圍遍照幹水晶
jau4 ceon4 zi1 je4 siu2 gong1 hoi2 ling4 haang1 ham2 ging1 gik1 saa1 lik1 tit3 wai4 pin3 ziu3 gon3 seoi2 zing1
瓔珞雲鏁飾柱珠鈴鐸周條琥珀純多美玉瑪瑙莖枝
jing1 lok3 wan4 so2 sik1 cyu5 zyu1 ling4 dok6 zau1 tiu4 fu2 paak3 seon4 do1 mei5 juk6 maa5 nou5 ging3 zi1
各商風面貌形狀寧乎帝但因假設何況餘俗貧乞
gok3 soeng1 fung1 min6 maau6 jing4 zong6 ning4 fu4 dai3 daan6 jan1 gaa2 cit3 ho4 fong3 jyu4 zuk6 pan4 hat1
體差輒獨晃曜柔軟狹盡極麗欄楯堂宇房閣計倍
tai2 caa1 zip3 duk6 fong2 jiu6 jau4 jyun5 haap3 zeon6 gik6 lai6 laan4 seon5 tong4 jyu5 fong4 gok3 gai3 pui5
鄙陋昏闇火日月星玄黃朱紫青葉雜亂塵勞醜劣
pei2 lau6 fan1 am3 fo2 jat6 jyut6 sing1 jyun4 wong4 zyu1 zi2 cing1 jip6 zaap6 lyun6 can4 lou4 cau2 lyut3
受晝臨命終讀誦書寫稱讚勇猛前攝犯要容希
sau6 zau3 lam4 ming6 zung1 duk6 zung6 syu1 se2 cing1 zaan3 jung5 maang5 cin4 sip3 faan6 jiu3 jung4 hei1
狐疑早晚求餮慳惜怒嫉妒去憂顛倒即往數
wu4 ji4 zou2 maan5 kau4 tit3 haan1 sek3 nou6 zat6 dou3 heoi3 jau1 din1 dou2 zik1 wong5 sou2
洞視徹肉眼簡擇義味礙厭琉璃內外障雷
dung6 si6 cit3 juk6 ngaan5 gaan2 zaak6 ji6 mei6 ngoi6 jim3 lau4 lei4 noi6 ngoi6 zoeng3 leoi4
歎未紛奉變胝那龍部放宿次覆蔭剛杵邪執
taan3 mei6 fan1 fung6 bin3 zi1 naa5 lung4 bou6 fong3 suk3/sau3 ci3 fuk1 jam3 gong1 cyu5 ce4 zap1
乃死友博登路唯曾則驕懈怠并幸今始初值
naai5 sei2 jau5 bok3 dang1 lou6 wai2 cang4 zak1 giu1 haai6 doi6 bing6 hang6 gam1 ci2 co1 zik6
決使莫測事盲咐囑波蜜非易遇堅固淪墮備危
kyut3 si2/sai2 mok6 cak1 si6 maang4 fu3 zuk1 bo1 mat6 fei1 ji6 jyu6 gin1 gu3 leon4 do6 bei6 ngai4
妄增減毀失遭勤特留植加耨藐悔屈違背速
mong5 zang1 gaam2 wai2 sat1 zou1 kan4 dak6 lau4 zik6 gaa1 nau6 miu5 fui3 wat1 wai4 bui3 cuk1
疾父母妻男責窗榻座損害饒益還到快
zat6 fu6 mou5 cai1 naam4 zaak3 coeng1 taap3 zo6 syun2 hoi6 jiu4 jik1 waan4 dou3 faai3
鐘磬琴瑟箜篌器鼓泥犁溪谷幽結跏趺坐
zung1 hing3 kam4 sat1 hung1 hau4 hei3 gu2 nai4 lai4 kai1 guk1 jau1 git3 gaa1 fu1 co5
民胎吾般洹息哀糺舉煢忪誨戾親愁久
man4 toi1 ng4 baan1 wun4 sik1 oi1 gau2 geoi2 king4 sung1 fui3 leoi6 can1 sau4 gau2
痛酷毒迫厚爭富貴榮魯扈抵突識諫曉
tung3 huk6 duk6 bik1/baak1 hau5 zang1 fu3 gwai3 wing4 lou5 wu6 dai2 dat6 sik1 gaan3 hiu2
反逆殃咎牽引殺戮強奪脅恚愚奢淫箭夾
faan2 jik6 joeng1 gau3 hin1 jan5 saat3 luk6 koeng4 dyut6 hip3 wai6 jyu4 ce1 jam4 zin3 gaap3
丈且了云互亡交亮仁代任伎伐休伽依侵
zoeng6 ce2 liu5 wan4 wu6 mong4 gaau1 loeng6 jan4 doi6 jam6 gei6 fat6 jau1 gaa1 ji1 cam1
保倉倚倫偏健偷債傷傾像僧儀償優
bou2 cong1 ji2 leon4 pin1 gin6 tau1 zaai3 soeng1 king1 zoeng6 zang1 ji4 soeng4 jau1
兄先免兩兵典冠冤冷凌凡凶刑剋副劇
hing1 sin1 min5 loeng5 bing1 din2 gun1 jyun1 laang5 ling4 faan4 hung1 jing4 hak1 fu3 kek6
努務勢勿匿半卑卒卻厲參叢口古右吞
nou5 mou6 sai3 mat6 nei1 bun3 bei1 cyut3 koek3 lai6 caam1 cung4 hau2 gu2 jau6 tan1
含吹品哉哭哲問單喻嗅嗜嘗噉回困園
ham4 ceoi1 ban2 zoi1 huk1 zit3 man6 daan1 jyu6 cau3 si3 soeng4 dam2 wui4 kwan3 jyun4
堪報塔塗境墨夕夢夫央奇奈奏好妷姓
ham1 bou3 taap3 tou4 ging2 mak6 zik6 mung6 fu1 joeng1 gei1 noi6 zau3 hou2 zat6 sing3
娑婆婦婬字存孝孤孰宅守宏宜室寄密寒
so1 po4 fu5 jam4 zi6 cyun4 haau3 gu1 suk6 zaak6 sau2 wang4 ji4 sat1 gei3 mat6 hon4
寬將尋對少尚尪居層履崇巍巡左
fun1 zoeng1 cam4 deoi3 siu2 soeng6 wong1 geoi1 cang4 lei5 sung4 ngai4 ceon4 zo2
巧巨布帳帶幡年幾床底庶延廻式弟弱
haau2 geoi6 bou3 zoeng3 daai3 faan1 nin4 gei2 cong4 dai2 syu3 jin4 wui4 sik1 dai6 joek6
張影待律後徐徙御忉忠忽忿怖怡急怪
zoeng1 jing2 doi6 leot6 hau6 ceoi4 saai2 jyu6 dou1 zung1 fat1 fan5 bou3 ji4 gap1 gwaai3
恐恣恩恭悅悕患惑惠感態慎慕慚慢慮
hung2 zi1 jan1 gung1 jyut6 hei1 waan6 waak6 wai6 gam2 taai3 san6 mou6 caam4 maan6 leoi6
慶憎憶懷懸懼戀戈截戲手承拔拘拜挂罣
hing3 zang1 jik1 waai4 jyun4 geoi6 lyun2 gwo1 zit6 hei3 sau2 sing4 bat6 keoi1 baai3 gwaa3 gwaa3
指捐捷推揚摧擊擐據攬改攻敗敢敬
zi2 gyun1 zit6 teoi1 joeng4 ceoi1 gik1 gwaan3 geoi3 laam5 goi2 gung1 baai6 gam2 ging3
整敷斂斗新斷旃旋既旦映暇暉暑暗暢暴
zing2 fu1 lim5 dau2 san1 dyun3 zin1 syun4 gei3 daan2 jing2 haa6 fai1 syu2 am3 coeng3 bou6
曇曠更曹朋望朝期木杜枉析林染校栴
taam4 kong3 gang3 cou4 pang4 mong6 ciu4 gei1 muk6 dou6 wong2 sik1 lam4 jim5 gaau3/haau6 zin1
梢槃標機橫檀檢欣欺歌止歲歷殘每毛
saau1 pun4 biu1 gei1 waang4 taan4 gim2 jan1 hei1 go1 zi2 seoi3 lik6 caan4 mui5 mou4
毫氏氣汗沉沒河治沾沿泉泣注洒浩浮浴
hou4 si6 hei3 hon4 cam4 mut6 ho4 ci4 zim1 jyun4 cyun4 jap1 zyu3 saa2 hou6 fau4 juk6
涅消涼淚淡淳淺湛源溫滉滯滴漂漏
nip6 siu1 loeng4 leoi6 daam6 seon4 cin2 zaam4 jyun4 wan1 fong2 zai6 dik6 piu1 lau6
漢漸潔潤澈濁瀁瀾災炎焚焰熏熙熱熾燈
hon3 zim1 git3 jeon6 cit3 zuk6 joeng5 laan4 zoi1 jim4 fan4 jim6 fan1 hei1 jit6 ci3 dang1
燋燒營牟牢狂瑞瑩甘甚用甯甲畏略
ziu1 siu1 jing4 mau4 lou4 kong4 seoi6 jing4 gam1 sam6 jung6 ning6 gaap3 wai3 loek6
病瘂瘖盈盛盜直瞻矜短石碎磨祥禁禍秘
beng6 aa2 jam1 jing4 sing4 dou6 zik6 zim1 ging1 dyun2 sek6 seoi3 mo4 coeng4 gam3 wo6 bei3
積穢竭端競笑算節範籍約紅索累絕
zik1 wai3 kit3 dyun1 ging6 siu3 syun3 zit3 faan6 zik6 joek3 hung4 sok3 leoi3 zyut2
絡給綠綺緜緩縱縶繒繩繫續缺缽罪罰耀
lok3 kap1 luk6 ji2 min4 wun6 zung1 zap1 zang1 sing4 hai6 zuk6 kyut3 but3 zeoi6 fat6 jiu6
老耳耽聰聾肩肯胄胸腋腰膝臣臭致
lou5 ji5 daam1 cung1 lung4 gin1 hang2 zau6 hung1 jik6 jiu1 sat1 san4 cau3 zi3
臾舌良芬花芳苑苞茂萌蒙蓋蓮蔽薪薰
jyu4 sit3 loeng4 fan1 faa1 fong1 jyun2 baau1 mau6 mang4 mung4 goi3/koi3 lin4 bai3 san1 fan1
虧表衰袒裏覩觸訶詣誑誠誡誤誰誹談
kwai1 biu2 ceoi1 taan2 leoi5 dou2 cuk1 ho1 ngai6 kong4 sing4 gaai3 ng6 seoi2 fei2 taam4
諍論謗講譊讐讓豐豪豫財貢費資賊賴
zang3 leon6 pong3 gong2 naau4 cau4 joeng6 fung1 hou4 jyu6 coi4 gung3 fai3 zi1 caak6 laai6
走越跌跪踊踰蹉躍軌軍輕輩輾辨迎近
zau2 jyut6 dit3 gwai6 jung2 jyu4 co1 joek3 gwai2 gwan1 hing1 bui3 zin2 bin6 jing4 gan6/kan5
迭迴迷追逐途逝造逮逸逾遂運適遲選
dit6 wui4 mai4 zeoi1 zuk6 tou4 sai6 zou6 dai6 jat6 jyu4 seoi6 wan6 sik1 ci4 syun2
邑都酒酬釋里重鉢銀鏡鑊閒閻闡闢限
jap1 dou1 zau2 cau4 sik1 lei5 cung4 but3 ngan4 geng3 wok6 haan4 jim4 cin2 pik1 haan6
陷隱雅雪露靈靜靡響預頓頭頸顧飄
haam6 jan2 ngaa5 syut3 lou6 ling4 zing6 mei5 hoeng2 jyu6 deon6 tau4 geng2 gu3 piu1
馥駛驚髮鬥鬱魂鳥黑鼻齊齋齎冰刃飯
fuk1 sai2 ging1 faat3 dau3 wat1 wan4 niu5 hak1 bei6 cai4 zaai1 zai1 bing1 jan6 faan6
丸鞭乖乳井付侍停儻充全公兼再
jyun2 bin1 gwaai1 jyu5 zeng2 fu6 si6 ting4 tong2 cung1 cyun4 gung1 gim1 zoi3
刺刻剉剝劍助卵原叉句叫司吉吐吒吝咄
ci3 hak1 co3 mok1 gim3 zo6 leon2 jyun4 caa1 geoi3 giu3 si1 gat1 tou3 caak1 leon6 deot1
咽哺哽唱啗啞啟啼喚喪嗣嘆垂塑壤夷
jin1 bou6 gang2/ang2/kang2 coeng3 daam6 aa2 kai2 tai4 wun6 song1 zi6 taan3 seoi4 sok3 joeng6 ji4
奮奴妃妹姊姐婢孫完官宰寐審寺尸尿
fan5 nou4 fei1 mui6 zi2 ze2 pei5 syun1 jyun4 gun1 zoi2 mei6 sam2 zi2 si1 niu6
屋川幼庭廟廢彈彩忘忤悖悽惛愈慇慘
uk1 cyun1 jau3 ting4 miu6 fai3 daan2 coi2 mong4 ng5 bui6 cai1 fan1 jyu6 jan1 caam2
慰憐懃懇懺戟扶抱抽拋拖招拽捕接搏
wai3 lin4 kan4 han2 caam3 gik1 fu4 pou5 cau1 paau1 to1 ziu1 jai6 bou6 zip3 bok3
撞撲撻擁擔攜攢攫敕敵斤斫斬族旛
zong2 pok3 taat3 jung2 daam1 kwai4 zaan2 fok3 cik1 dik6 gan1 zoek3 zaam2 zuk6 faan1
暫替末枕某梁棒楚槍欽歧殷毗毘汁沸
zaam6 tai3 mut6 zam2 mau5 loeng4 paang5 co2 coeng1 jam1 kei4 jan1 pei4 pei4 zap1 fai3
油泔浪涌涕渡渧渴游湯溢漆澆澤炒烊
jau4 gam1 long6 jung2 tai3 dou6 dai3 hot3 jau4 tong1 jat6 cat1 giu1 zaak6 caau2 joeng4
爪牆牙牛犬狄狗狼獅獵獻玩玷煮燃燄
zaau2 coeng4 ngaa4 ngau4 hyun2 dik6 gau2 long4 si1 lip6 hin3 waan4 dim3 zyu2 jin4 jim6
產畋畜畢畫疫疲瘡瘵癃癒皮盞盤省
caan2 tin4 cuk1 bat1 waa2 jik6 pei4 cong1 zaai3 lung4 jyu6 pei4 zaan2 pun4 saang2
碧祁祇祭私稻稼穀竊竹答管米睡眠碓眾
bik1 kei4 kei4 zai3 si1 dou6 gaa3 guk1 sit3 zuk1 daap3 gun2 mai5 seoi6 min deoi3 zung1
粗糞糧絃絞綵綿繳繼纔纖置罵羌羼翻
cou1 fan3 loeng4 jin4 gaau2 coi2 min4 giu2 gai3 coi4 cim1 zi3 maa6 goeng1 caan3 faan1
耕胡腥腳腸腹膠臂臥舊舒苗草菜耗肢
gaang1 wu4 seng1 goek3 coeng4 fuk1 gaau1 bei3 ngo6 gau6 syu1 miu4 cou2 coi3 hou3 zi1
葦蔓藍蘇虎蚖蛇蝮蠍血術衛袈裝裟訊
wai5 maan6 laam4 sou1 fu2 jyun4 se4 fuk1 hit3 hyut3 seot6 wai6 gaa1 zong1 saa1 seon3
訖詠誘誣貝賣賤赤趁踐踴躬較輔辛許
gat1 wing6 jau5 mou4 bui3 maai6 zin6 cek3 can3 cin5 jung2 gung1 gaau3 fu6 san1 heoi2
辦辭迄迅返逢遞遣遮邃鄭鄰醫醯釘鈇鈍
baan6 ci4 ngat6 seon3 faan2 fung4 dai6 hin2 ze1 seoi6 zeng6 leon4 ji1 hei1 deng1 fu2 deon6
鈒銅銷鋸錢鎖鏤鑗鑿闕附險雀雛革領飢
zaap6 tung4 siu1 geoi3 cin2 so2 lau6 lei4 zok6 gwat6 fu6 him2 zoek3 co1 gaak3 ling5 gei1
馬馳駕騾驅驢骨魅魍魎魘魚鮮鱉鴛鴦並
maa5 ci4 gaa3 leoi4 keoi1 leoi4 gwat1 mei6 mong5 loeng5 jim2 jyu2 sin1 bit3 jin1 joeng1 bing6
乗争享什介仍企伯似佐佳侮侯鷹麻齒龕
sing4 zang1 hoeng2 sam6 gaai3 jing4 kei5 baak3 ci5 zo3 gaai1 mou5 hau4 jing1 maa4 ci2 am1
儉儼兆克兌兒兕兮冬割劌匠召君嗄嗇圖隳
gim6 jim5 siu6 hak1 deoi3 ji4 zi6 hai4 dung1 got3 gwai3 zoeng6 siu6 gwan1 aa2 sik1 tou4 fai1
均埏域埴基壯太夸契奧妖妨嬰孔孩宗鴿
gwan1 jin4 wik6 zik6 gei1 zong3 taai3 kwaa1 kai2 ou3 jiu2 fong4 jing1 hung2 haai4 zung1 gap3
寡寥寵寸尤尺市廈廉弊弓彰徑徒徼客
gwaa2 liu4 cung2 cyun3 jau4 ce2 si5 haa6 lim4 bai6 gung1 zoeng1 ging3 tou4 giu2 haak3
忌忒恃恍恢恬悶惔戎戰戶执抑投抗拙拱
gei6 tik1 ci5 fong2 fui1 tim4 mun6 taam4 jung4 zin3 wu6 zap1 jik1 tau4 kong3 zyut3 gung2
挫措握揣攘政敝敦料斲春昭朘枯样
co3 cou3 ak1 ceoi2 joeng4 zing3 bai6 deon1 liu6 doek3 ceon1 ciu1 zeoi1 fu1 joeng6
楗楷榖槁樸橐歇歔歙武殆汎沌沖泊泮
gin6 kaai2 guk1 gou2 pok3 lok6 hit3 heoi1 kap1 mou5 doi6 faan3 deon6 cung1 baak3 bun6
活洼涉淵混渙渝渾滋滌澹烹焉燕燿泰
wut6 gwai1 sip3 jyun1 wan6 wun6 jyu4 wan4 zi1 dik6 daam6 paang1 jin1 jin1 jiu6 taai3
爵爽牖牝牡琭瑕璧甫疏疵癈的皦矣社祀
zoek3 song2 jau5 pan5 maau5 luk6 haa4 bik1 fu2 so1 ci1 fai3 dik1 giu2 ji5 se5 zi6
稅稷窈窪窺筋篤籌籥紀素細繟缓羸
seoi3 zik1 jiu2 waa1 kwai1 gan1 duk1 cau4 joek6 gei2 sou3 sai3 cin2 wun6 leoi4
肆肖育脆脩臺舟芸芻蒭荒蒂蒞蕪薄螫蟲
sei3 ciu3 juk6 ceoi3 sau1 toi4 zau1 wan4 co1 co1 fong1 dai3 lei6 mou4 bok6 cik1 cung4
褐襲覽角託訥詰諱諾謀譽讁谿豈貞貨
hot3 zaap6 laam5 gok3 tok3 naap6 kit3 wai5 nok6 mau4 jyu6 zaak6 hai4 hei2 zing1 fo3
貸賓質贅跂跡跨踈蹶躁車載輜輟輻轂轍
taai3 ban1 zat1 zeoi3 kei4 zik1 kwaa1 so1 kyut3 cou3 ce1 zoi2 zi1 zyut3 fuk1 guk1 cit3
遺避邦郊鄉配銳鎮閱闔關陰陸陽隅頗
wai4 bei6 bong1 gaau1 hoeng1 pui3 jeoi6 zan3 jyut6 hap6 gwaan1 jam1 luk6 joeng4 jyu4 po2
雌雞頑飂餌饑駟騁驟魄蘊埵咒揭收濕
ci1 gai1 waan4 lau4 nei6 gei1 si3 cing2 zaau6 paak3 wan5 do2 zau3 kit3 sau1 sap1
章筏蘭逃燭盧砂磧穿童筆紙緊繁翳看
zoeng1 fat6 laan4 tou4 zuk1 lou4 saa1 zaak3 cyun1 tung4 bat1 zi2 gan2 faan4 ai3 hon3
乾價刀唐囚峰怙掣杖杻枷械段潮澍煙
gon1 gaa3 dou1 tong4 cau4 fung1 wu6 zai3 zoeng6 cau2 gaa1 haai6 dyun6 ciu4 syu6 jin1
珊瑚睺硨磲舫船蝎訟詛逼陣雹茶酥野折
saan1 wu4 hau1 ce1 keoi4 fong2 syun4 hit3 zung6 zo2 bik1 zan6 bok3 caa4 sou1 je5 zip3
萎怕謫碌玃䘒醇訞狎轝仙闥鬘鳩傘嗔飽
wai2 paa3 zaak6 luk1 fok3 syun1 seon4 jiu1 haap6 jyu4 sin1 taat3 maan4 kau1 saan3 can1 baau2
卉村溺恒恨干泡稀舜爍楞髻湧擎祐皈埃
wai2 cyun1 nik6 hang4 han6 gon1 paau1 hei1 seon3 soek3 ling4 gai3 jung2 king4 jau6 gwai1 aai1
錫振裡宛紺澄洪爐乍遙摘壇惹搖只打愆
sek3 zan3 lei5 jyun2 gam3 cing4 hung4 lou4 zaa3 jiu4 zaak6 taan4 je5 jiu4 zi2 daa2 hin1
翹披瀝憫詳
kiu4 pei1 lik6 man5 coeng4
絺㝹馱桓玻曼祴鶴鸚鵡頻鞞跋沮統勉攀
ci1 nau4 to4 wun4 bo1 maan6 goi1 hok2 jing1 mou5 pan4 bing2 bat6 zeoi1/zeoi2 tung2 min5 paan1
區展怯錯謬曀旨占促裹擬虔航淩祝徬徨憑閦
keoi1 zin2 hip3 co3 mau6 ai3 zi2 zim3 cuk1 gwo2 ji5 kin4 hong4 ling4 zuk1 pong4 wong4 pang4 cuk1
伴侶工姻畔
bun6 leoi5 gung1 jan1 bun6
`.split('\n');

  function _getIgnoreLevel(zi) {
    for (var i=0; i<ignoreLevels.length; ++i)
      if (ignoreLevels[i][zi]) return i;
    return GENERAL;
  }

  for (i=0; i<a.length-1; i+=2) {
    var zis = a[i].replaceAll(' ', '');
    var yps = a[i+1].trim().split(' ');
    if (zis.length != yps.length) {
      console.log(zis, zis.length, 'phonetics:', yps.length, 'PLEASE FIX AND REDO.');
      continue;
    }

    for (var j=0; j<zis.length; ++j) {
      var zi = zis[j], yp = yps[j], x = dict[zi];
      if (x) x.addYP(yp);
      else dict.add(new ZiInfo(zi, yp, _getIgnoreLevel(zi), _isFA(zi)));
    }
  }

})();
