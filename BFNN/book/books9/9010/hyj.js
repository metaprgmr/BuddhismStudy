// s/——/──/

var SAHA = 'Sahā';

var _sectionNum = 1;
function sectionSeq(n, left, right) {
  if (n) _sectionNum = n;
  return cilzn(_sectionNum++, left||'　【', right||'】');
}
function statusName(num, name, type) { return `/TEXT030L/第${zNumber(num)}${type||'地'} <ail>（${name}）</ail>`; }

class TenList { // TODO
  constructor(name) {
    this.name = name;
  }
}

function parseBlocks(s) {
  var a = s.split('\n'), len = a.length, ret = [];
  for (var i=0; i<len; ++i) {
    var ln = a[i];
    if (ln[0] == '#') { // get it
      var b = [ ln.substring(1) ];
      ret.push(b);
      while (i<len) {
        ln = a[++i];
        if (ln == null) break;
        if (ln.endsWith('#')) { b.push(rtrim(ln,1)); break; }
        b.push(ln);
      }
    }
  }
  return ret;
}
function findNameIn(ln, sMark, eMark, suffix) {
  if (typeof sMark == 'object') {
    suffix = sMark.suffix;
    eMark = sMark.eMark;
    sMark = sMark.regex || sMark.sMark;
  }
  if (!sMark) sMark = '，';
  if (!eMark) eMark = '菩薩';
  var idx, idx1;
  if (typeof sMark == 'string') {
    var mklen = sMark.length;
    idx1 = ln.indexOf(sMark);
    idx = ln.indexOf(eMark, idx1);
    if (idx1 >= 0 && idx > idx1) {
      var author = ln.substring(idx1+mklen,idx);
      if (author && suffix) author += suffix;
      return [ author, hiliteSeg(ln, idx1+mklen, idx, c) ];
    }
  }
  else if (sMark instanceof RegExp) {
    var matches = ln.match(sMark);
    if (matches) {
      var len = matches.length, nature = matches[len-1];
      if (nature.endsWith('，') || nature.endsWith('；'))
        nature = rtrim(nature,1);
      var author = matches[len-2] + nature;
      idx = ln.indexOf(author);
      return [ author, hiliteSeg(ln, idx, idx+author.length, c) ];
    }
  }
  return [ null, ln ];
}
function 或名list(lst) {
  var lnlen = 0, cnt = 0;
  return lst.map((val,idx,arr) => {
    ++cnt;
    lnlen += val.length;
    if (lnlen + 4*cnt < 58) return `或名：${c(val)}`;
    lnlen = cnt = 0;
    return `\n/I/或名：${c(val)}`;
  }).join('，');
}
function 憶念過去佛來(first, type) {
  var a = first.split('\|');
  if (a.length==2)
    return `${a[0]}，　諸吉祥中最${(type==3)?'殊勝':'無上'}，　彼曾入此${a[1]}殿，　是故此處最吉祥。`
  return `${first}，　諸吉祥中最無上，　彼佛曾來入此殿，　是故此處最吉祥。`;
}

function visit(n) {
  var needN = n > 0;
  if (!needN) n = -n;
  var zn = zNumber(n);
  var t = VISITS53[n-1].teacher;
  if (Array.isArray(t))
    t = t.shift() + '，<small>又稱 </small>' + t.join('、');
  return needN ? `/TEXT339s10:can${n}/【第${zn}參：${t}】`
               : `/TEXT339s10/【第${zn}參：${t}】`
}

var v53profs = [
"德雲比丘\nMeghaśrī-bhikşu",
"海雲比丘\nSāgara-megha",
"善住比丘\nSupratişthita",
"彌伽大士\nMegha-dramida",
"解脱長者\nVimuktika-śreşthin",
"海幢比丘\nSāgara-dhvaja",
"休舍優婆夷\nAshā",
"毗目瞿沙仙人\nBhīşmottara-nirghoşa",
"勝熱婆羅門\nJayoşmāya",
"慈行童女\nMaitreyanī",
"善見比丘\nSu-darshana",
"自在主童子\nIndriyeśvara",
"具足優婆夷\nPrabhūtā",
"明智居士\nVidvan",
"法寶髻長者\nRatna-cūda",
"普眼長者\nSamanta-netra",
"無厭足王\nAnala",
"大光王\nMahāprabha",
"不動優婆夷\nAcalā",
"遍行外道\nSarvagāmin",
"鬻香長者\nUtpalabhūti",
"婆施羅船師\nVairocana",
"師子頻申比丘尼\nSimha-vijrimbhitā",
"婆須蜜多女\nVasumitrā",
"鞞瑟胝羅居士\nVeşthila",
"觀自在菩薩\nAvalokiteśvara",
"正趣菩薩\nAnanyagāmin",
"大天神\nMahādeva",
"安住地神\nSthāvarā",
"婆珊婆演底主夜神\nVasantī",
"普德淨光主夜神\nSamanta-gambhīraśrī-vimala-prabhā",
"喜目觀察眾生主夜神\nPramudita-nayana-jagad-virocanā",
"普救眾生妙德夜神\nSamanta-sattva-trānojah-śrī",
"寂靜音海主夜神\nPrashānta-ruta-sāgaravatī",
"守護一切眾生主夜神\nSarva-nagara-rakşā-sambhava-tejah-śrī",
"開敷一切樹花主夜神\nSarva-vrikşa-praphullana-sukha-samvāsā",
"大願精進力救護一切眾生夜神\nSarva-jagad-rakşī-pranidhāna-vīrya-prabhā",
"妙德圓滿神\nSutejo-mandnalarati-śrī",
"摩耶夫人\nMāyā",
"天主光王女\nSurendrābhā",
"遍友童子師\nViśvā-mitra",
"善知眾藝童子\nŚilpābhijna",
"賢勝優婆夷\nBhadrottamā",
"堅固解脱長者\nMuktā-sāra",
"妙月長者\nSucandra",
"無勝軍長者\nAjita-sena",
"最寂靜婆羅門\nŚiva-rāgra",
"德生童子及有德童女\nŚrī-sambhava, Śrī-matī",
"彌勒菩薩\nMaitreya",
"文殊師利菩薩\nManjuśrī",
"普賢菩薩\nSamantabhadra"
];
function v53n(vol,s,e) {
  var ret = '<cil>第</cil> ';
  if (!e) e = s;
  for (var n=s; n<=e; ++n) {
    if (n>s) ret += '<cil>、</cil>';
    ret += `<a href="?vol=${vol}&loc=can${n}" title="${v53profs[n-1]}">${z10(n)}</a>`;
  }
  return ret + ' <cil>参</cil>';
}

var gathaRepo = {};
function gathaW(id) {
  var g = gathaRepo[id];
  if (!g) throw `Gatha not found for '${id}'.`;
  return g.write();
}

class Gatha {
  constructor(id, gatha, info) {
    gathaRepo[id] = this;
    this.id = id;
    this.gatha = gatha;
    this.info = info;
  }
  setLead(s) { this.lead = s; return this; }
  setAuthor(s) { this.author = s; return this; }
  setTitle(s) { this.title = s; return this; }
  write(bare,nocomment) {
    var f = (x) => {
      var idx = x.indexOf('\|');
      if (idx < 0) return x;
      var more = x.substr(idx+1);
      if (!more.startsWith('<cil') && !more.startsWith('<ail'))
        more = `<cil>${more}</cil>`;
      x = x.substr(0,idx);
      return nocomment ? x : `${x}　${more}`;
    };
    return `${!bare && this.lead || ''}/gatha/
${this.gatha.map(f).join('\n')}
//
`;
  }
} // end of Gatha.

var __gtcolCnt = 0;
class GathaCollection {
  constructor(name, desc) {
    var id = `__gtcol${to3d(++__gtcolCnt)}`;
    if (gathaRepo[id]) throw `Gatha Collection ID conflict: ${id}`;
    gathaRepo[id] = this;

    this.isCollection = true;
    this.name = name;
    this.desc = desc;
    this.gathas = [];
    this.setSimpleProcessing();
  }
  setSingleAuthor(b) { this.singleAuthor = b; return this; }
  setDefaultAuthor(a, isSingle) { this.defaultAuthor = a; this.singleAuthor = isSingle; return this; }
  add(g) {
    if (g) {
      this.gathas.push(g);
      if (!g.author) g.author = this.defaultAuthor;
    }
    return this;
  }
  setAsTitle(b) {
    if (!this.simpleMeta) this.simpleMeta = {};
    this.simpleMeta.asTitle = b;
    return this;
  }
  setSimpleProcessing(sMark, eMark, suffix) {
    if (!this.simpleMeta) this.simpleMeta = {};
    if (sMark && (sMark instanceof RegExp))
      this.simpleMeta.regex = sMark;
    else
      this.simpleMeta = Object.assign({ sMark:sMark||'，', eMark:eMark||'菩薩' });
    this.simpleMeta.suffix = suffix;
    return this;
  }
  processGathaMeta(gatha, ln) {
    if (!ln || !this.simpleMeta) return;
    if (this.simpleMeta.asTitle) {
      gatha.setTitle(ln);
      return;
    }
    var meta = findNameIn(ln, this.simpleMeta);
    if (meta[0]) gatha.setAuthor(meta[0]);
    if (meta[1]) gatha.setLead(meta[1] + '\n\n');
  }
  parseGatha(lns) {
    var ln = lns.shift(), idx = ln.indexOf('\|'), id;
    if (idx <= 0) {
      id = ln.trim();
      ln = null;
    }
    else {
      id = ln.substring(0,idx);
      ln = ln.substring(idx+1);
    }
    var g = new Gatha(id, lns);
    this.processGathaMeta(g, ln);
    return g;
  }
  parse(data) {
    var a = parseBlocks(data);
    for (var i in a) this.add(this.parseGatha(a[i]));
    return this;
  }

} // end of GathaCollection.

var pinsUri = [ // 0-based
  "?vol=1",          // 卷第一　　　世主妙嚴品　　　　 第一
  "?vol=6",          // 卷第六　　　如來現相品　　　　 第二
  "?vol=7",          // 卷第七　　　普賢三昧品　　　　 第三
  "?vol=7&pin=p04",  // 　　　　　　世界成就品　　　　 第四
  "?vol=8",          // 卷第八　　　華藏世界品　　　　 第五
  "?vol=11",         // 卷第十一　　毘盧遮那品　　　　 第六
  "?vol=12",         // 卷第十二　　如來名號品　　　　 第七
  "?vol=12&pin=p08", // 　　　　　　四聖諦品　　　　　 第八
  "?vol=13",         // 卷第十三　　光明覺品　　　　　 第九
  "?vol=13&pin=p10", // 　　　　　　菩薩問明品　　　　 第十
  "?vol=14",         // 卷第十四　　淨行品　　　　　　 第十一
  "?vol=14&pin=p12", // 　　　　　　賢首品　　　　　　 第十二
  "?vol=16",         // 卷第十六　　昇須彌山頂品　　　 第十三
  "?vol=16&pin=p14", // 　　　　　　須彌頂上偈讚品　　 第十四
  "?vol=16&pin=p15", // 　　　　　　十住品　　　　　　 第十五
  "?vol=17",         // 卷第十七　　梵行品　　　　　　 第十六
  "?vol=17&pin=p17", // 　　　　　　初發心功德品　　　 第十七
  "?vol=18",         // 卷第十八　　明法品　　　　　　 第十八
  "?vol=19",         // 卷第十九　　昇夜摩天宮品　　　 第十九
  "?vol=19&pin=p20", // 　　　　　　夜摩宮中偈讚品　　 第二十
  "?vol=19&pin=p21", // 　　　　　　十行品　　　　　　 第二十一
  "?vol=21",         // 卷第二十一　十無盡藏品　　　　 第二十二
  "?vol=22",         // 卷第二十二　昇兜率天宮品　　　 第二十三
  "?vol=23",         // 卷第二十三　兜率宮中偈讚品　　 第二十四
  "?vol=23&pin=p25", // 　　　　　　十迴向品　　　　　 第二十五
  "?vol=34",         // 卷第三十四　十地品　　　　　　 第二十六
  "?vol=40",         // 卷第四十　　十定品　　　　　　 第二十七
  "?vol=44",         // 卷第四十四　十通品　　　　　　 第二十八
  "?vol=44&pin=p29", // 　　　　　　十忍品　　　　　　 第二十九
  "?vol=45",         // 卷第四十五　阿僧祇品　　　　　 第三十
  "?vol=45&pin=p31", // 　　　　　　壽量品　　　　　　 第三十一
  "?vol=45&pin=p32", // 　　　　　　諸菩薩住處品　　　 第三十二
  "?vol=46",         // 卷第四十六　佛不思議法品　　　 第三十三
  "?vol=48",         // 卷第四十八　如來十身相海品　　 第三十四
  "?vol=48&pin=p35", // 　　　　　　如來隨好光明功德品 第三十五
  "?vol=49",         // 卷第四十九　普賢行品　　　　　 第三十六
  "?vol=50",         // 卷第五十　　如來出現品　　　　 第三十七
  "?vol=53",         // 卷第五十三　離世間品　　　　　 第三十八
  "?vol=60",         // 卷第六十　　入法界品 　　　　　第三十九
];
