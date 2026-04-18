var SAHA = 'Sahā';

function parseBlocks(s) {
  var a = s.split('\n'), len = a.length, ret = [];
  for (var i=0; i<len; ++i) {
    var ln = a[i];
    if (ln[0] == '#') { // get it
      var b = [ ln ];
      ret.push(b);
      while (i<len) {
        ln = a[++i];
        if (ln.endsWith('#')) { b.push(rtrim(ln,1)); break; }
        b.push(ln);
      }
    }
  }
  return ret;
}
function parsePusaGathas(data, sMark1, eMark1, sMark2, eMark2, notPusa) {
  function fxn(ln) {
    if (!sMark1) sMark1 = '，';
    if (!eMark1) eMark1 = '菩薩';
    var idx1 = ln.indexOf(sMark1), idx = ln.indexOf(eMark1, idx1), mklen = sMark1.length;
    if ((idx1 < 0 || idx < 0) && sMark2 && eMark2) {
      idx1 = ln.indexOf(sMark2);
      idx = ln.indexOf(eMark2, idx1);
      mklen = sMark2.length;
    }
    if (idx1 >= 0 && idx > idx1) {
      pusa = ln.substring(idx1+1,idx);
      if (!notPusa) pusa += '菩薩';
      return [ pusa, hiliteSeg(ln, idx1+mklen, idx) ];
    }
    return [ null, ln ];
  }
  var a = parseBlocks(data);
  for (var i in a) {
    var arr = a[i], ln = arr.shift(), idx = ln.indexOf('\|');
    if (idx < 0) throw `Expecting a |: ${ln}`;
    id = ln.substring(1,idx);
    ln = fxn(ln.substring(idx+1));
    new Gatha(id, arr.join('\n'), ln[0]).setLead(ln[1]+'\n\n');
  }
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

var gathaRepo = {};
function gathaW(id) { return gathaRepo[id].write(); }

class Gatha {
  constructor(id, gatha, info) {
    gathaRepo[id] = this;
    this.id = id;
    this.gatha = gatha;
    this.info = info;
  }
  setLead(s) { this.lead = s; return this; }
  write() {
    return `${this.lead || ''}/gatha/
${this.gatha}
//
`;
  }
}

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
