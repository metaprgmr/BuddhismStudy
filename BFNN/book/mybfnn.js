function zNumber(n) { // 0 to 999
  const zdigits = '〇一二三四五六七八九十';
  if (typeof n == 'string') n = parseInt(n);
  if (n <= 10) return zdigits[n];
  if (n > 10 && n < 20) return '十' + zdigits[n-10];
  var d100 = Math.floor(n / 100);
  var d10  = Math.floor((n-d100*100) / 10);
  var d1   = n - d100 * 100 - d10 * 10;
  var ret = '';
  if (d100 > 0)
    return zdigits[d100] + '百' + zNumber(n - d100*100);
  ret += zdigits[d10] + '十';
  if (d1 > 0) ret += zdigits[d1];
  return ret;
}
function trimLead0s(n) {
  if (typeof n != 'string') return n;
  for (var i=0; (i<n.length-1) && (n[i]=='0'); ++i);
  return (i==0) ? n : n.substring(i);
}

var queryParams;
function get(name) {
  if (!queryParams) { // singleton, instantiated on-demand
    queryParams = {};
    if (location.search.startsWith('?')) {
      var qparams = location.search.substring(1).split('&');
      for (var i=0; i<qparams.length; ++i) {
        var a = qparams[i].split('=');
        queryParams[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      }
    }
  }
  return queryParams[name];
}
function w() { for(var i in arguments) document.write(arguments[i]); }
function e(id) { return document.getElementById(id) }
function toEl(x) { return (typeof x=='string') ? document.getElementById(x) : x; }
function showTop(id) { var el=toEl(id); el && el.scrollIntoView(); }

const SP = '<LNSP></LNSP>';
const BODY = `<body lang=ZH-TW link=blue vlink=purple background="../books/textbackground.jpg" class="Normal" bgcolor="#ffffff">`;
const MainDiv = `<div class=bookClean style='layout-grid:18.0pt'>`;
var verbose = get('verbose'), volNum;

function writeBfnnStart(content) { w(BODY, MainDiv, content||''); }

function writeBfnnEnd(firstPgNum, totalPgs, curPg /* 1-based */, isXG) {
  if (firstPgNum) {
    var suffix = verbose ? '?verbose' : '';
    w(SP, '<div class=endBar>');
    if (curPg <= 1) w('<inv>&laquo;</inv>');
    else w(`<a href="${firstPgNum+curPg-2}.htm${suffix}">&laquo;</a>`);
    for (var i=1; i<=totalPgs; ++i) {
      if (i == curPg) w(`&nbsp;<cur>${i}</cur>`);
      else w(`&nbsp;<a href="${firstPgNum+i-1}.htm${suffix}">${i}</a>`);
    }
    if (curPg >= totalPgs) w('&nbsp;<inv>&raquo;</inv>');
    else w(`&nbsp;<a href="${firstPgNum+curPg}.htm${suffix}">&raquo;</a>`);
    w('</div>');
  }
  w('</div>',
    isXG ? '<div class=endImageXG></div>' : '<div class=endImage title="UTF-8 encoded"></div>',
    '</body></html>');
}

function writeXgEnd(firstPgNum, totalPgs, curPg /* 1-based */) {
  writeBfnnEnd(firstPgNum, totalPgs, curPg, true);
}

function wLine(ln,type) {
  w('<p class=', type || 'TEXT', '>', ln, '</p>', SP);
}

// -- 海仁法師 大佛頂首楞嚴經講記 --
var VERSES;
function start1875(n) {
  VERSES = getHaiRenVerses();
  volNum = ' ABCDEFGHIJ'[n];
  w(BODY, MainDiv,
`<p class=TITLE>大佛頂首楞嚴經講記<br><subtitle>（卷第${zNumber(n)}）</subtitle></p>
<LNSP></LNSP>
<p class=TEXT030C>海仁老法師主講</p>
<p class=TEXT030C>受業弟子釋文珠筆記</p>`);
  if (n>1) w(SP);
  document.title = `大佛頂首楞嚴經講記（卷第${zNumber(n)}）`; 
}
function hrVerse(num) {
  if (verbose)
    wLine(`<verseNum>${trimLead0s(num)}</verseNum>${VERSES[volNum+num]}</p>`, 'VERSE');
  else
    wLine(VERSES[volNum+num], 'VERSE');
}

// -- 圓瑛大師 大佛頂首楞嚴經講義 --
function start1472(n) {
  volNum = n;
  w(BODY, MainDiv,
`<p class=TITLE>大佛頂首楞嚴經講義<br><subtitle>第${zNumber(n)}卷</subtitle></p>
<LNSP></LNSP>
<p class=TEXT030C>圓瑛大師著</p>
<LNSP></LNSP>`);
  if (n>1)
    w('<p class=KEPAN>大佛頂如來密因修證了義諸菩薩萬行首楞嚴經講義</p>', SP,
      '<p class=TEXT align=right>福州鼓山湧泉禪寺圓瑛弘悟述受法弟子明暘日新敬校　</p>', SP);
  document.title = `大佛頂首楞嚴經講義第${zNumber(n)}卷`; 
}
function yyVerse(num, ln) {
  function id() { return (volNum < 10 ? '0' : '') + volNum + num; }
  if (verbose)
    wLine(`<verseNum id='${id()}'>${num}</verseNum>${ln}`, 'VERSE');
  else
    wLine(ln, 'VERSE');
}
