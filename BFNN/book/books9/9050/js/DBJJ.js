var catalog = `
1  | 1 | 3 | <a href="9050/v001-3.htm">三律儀會</a> | 唐．菩提流志
4  | 2*| 4 | <a href="9050/v004-7.htm">無邊莊嚴會</a> | 唐．菩提流志
8  | 3 | 7 | <a href="9050/v008-14.htm">密跡金剛力士會</a> | 晉．竺法護 | 《如來不思議祕密大乘經》趙宋．法護譯
15 | 4 | 2 | <a href="9050/v015-6.htm">淨居天子會</a> | 晉．竺法護
17 | 5*| 2 | <a href="../books/0360/WLSJ-TANG.htm">無量壽如來會</a> | 唐．菩提流志 | 《<a href="../books/0360/WLSJ-WU.htm">大阿彌陀經</a>》　吳．支謙；　　《<a href="../books/0360/WLSJ-HAN.htm">無量清淨平等覺經</a>》後漢．支婁迦讖譯；<br>《<a href="../books/0360/WLSJ-WEI.htm">無量壽經</a>》　曹魏．康僧鎧譯；《<a href="../books/0360/WLSJ-SONG.htm">大乘無量壽莊嚴經</a>》趙宋．法賢譯；<br>《<a href="../books/0360.htm">佛說大乘無量壽莊嚴清淨平等覺經</a>》夏蓮居居士會集
19 | 6*| 2 | <a href="9050/v019-20.htm">不動如來會</a> | 唐．菩提流志 | 《阿閦佛國經》東漢．支婁迦讖譯
21 | 7 | 5 | <a href="9050/v021-5.htm">被甲莊嚴會</a> | 唐．菩提流志
26 | 8 | 2 | <a href="9050/v026-7.htm">法界體性無分別會</a> | 梁．曼陀羅仙
28 | 9 | 1 | <a href="9050/v028.htm">大乘十法會</a> | 元魏．佛陀扇多 | 《大乘十法經》南齊．僧伽婆羅
29 |10 | 1 | <a href="9050/v029.htm">文殊師利普門會</a> | 唐．菩提流志 | 《普門品經》晉．竺法護譯
30 |11 | 5 | <a href="9050/v030-4.htm">出現光明會</a> | 唐．菩提流志
35 |12*|20 | <a href="9050/v035-54.htm">菩薩藏會</a> | 唐．玄奘 | 《大乘菩薩藏正法經》趙宋．法護
55 |13 | 1 | <a href="9050/v055.htm">佛為阿難說處胎會</a> | 唐．菩提流志 | 《<a href="9065.htm">胞胎經</a>》晉．竺法護譯
56 |14 | 2 | <a href="9050/v056-7.htm">佛說入胎藏會</a> | 唐．義淨
58 |15 | 3 | <a href="9050/v058-60.htm">文殊師利授記會</a> | 唐．實叉難陀 | 《<a href="9049.htm">文殊佛土嚴淨經</a>》晉．竺法護譯；《文殊佛剎功德莊嚴經》唐．不空譯
61 |16*|16 | <a href="9050/v061-76.htm">菩薩見實會</a> | 隋．那連提耶舍 | 《父子合集經》趙宋．日稱譯
77 |17*| 3 | <a href="9050/v077-9.htm">富樓那會</a> | 後秦．鳩摩羅什
80 |18 | 2 | <a href="9050/v080-1.htm">護國菩薩會</a> | 隋．闍那崛多 | 《護國尊者所問大乘經》趙宋．施護譯
82 |19 | 1 | <a href="9050/v082.htm">郁伽長者會</a> | 曹魏．康僧鎧 | 《法鏡經》安玄譯；《郁迦羅越問菩薩行經》晉．竺法護譯
83 |20 | 2 | <a href="9050/v083-4.htm">無盡伏藏會</a> | 唐．菩提流志
85 |21 | 1 | <a href="9050/v085.htm">授幻師跋陀羅記會</a> | 唐．菩提流志 | 《幻士仁賢經》晉．竺法護譯
86 |22 | 2 | <a href="9050/v086-7.htm">大神變會</a> | 唐．菩提流志
88 |23 | 2 | <a href="9050/v088-9.htm">摩訶迦葉會</a> | 元魏．月婆首那
90 |24 | 1 | <a href="9050/v090.htm">優波離會</a> | 唐．菩提流志 | 《三十五佛名禮懺文》唐．不空譯
91 |25 | 2 | <a href="9050/v091-2.htm">發勝志樂會</a> | 唐．菩提流志 | 《發覺淨心經》隋．闍那崛多譯
93 |26 | 2 | <a href="9050/v093-4.htm">善臂菩薩會</a> | 後秦．鳩摩羅什
95 |27 | 1 | <a href="9050/v095.htm">善順菩薩會</a> | 唐．菩提流志 | 《須賴經》二種
96 |28 | 1 | <a href="9050/v096.htm">勤授長者會</a> | 唐．菩提流志 | 《無畏授所問大乘經》趙宋．施護譯
97 |29 | 1 | <a href="9050/v097.htm">優陀延王會</a> | 唐．菩提流志 | 《大乘日子王所問經》趙宋．法天譯
98 |30 | 0.7 | <a href="9050/v098a.htm">妙慧童女會</a> | 唐．菩提流志 | 《須摩提菩薩經》晉．竺法護譯；《無畏授所問大乘經》趙宋．施護譯
   |31 | 0.3 | <a href="9050/v098b.htm">恆河上優婆夷會</a> | 唐．菩提流志
99 |32 | 1 | <a href="9050/v099.htm">無畏德菩薩會</a> | 元魏．佛陀扇多 | 《阿闍世王女阿術達菩薩經》晉．竺法護譯
100|33*| 1 | <a href="9050/v100.htm">無垢施菩薩應辯會</a> | 晉．聶道真 | 《離垢施女經》晉．竺法護譯；《得無垢女經》元魏．瞿曇般若流支譯
101|34 | 0.5 | <a href="9050/v101a.htm">功德寶花敷菩薩會</a> | 唐．菩提流志
   |35 | 0.5 | <a href="9050/v101b.htm">善德天子會</a> | 唐．菩提流志 | 《文殊師利所說不思議佛境界經》唐．菩提流志譯
102|36*| 4 | <a href="9050/v102-5.htm">善住意天子會</a> | 隋．達摩笈多 | 《如幻三昧經》晉．竺法護譯；《聖善住意經》元魏．瞿曇般若流支譯
106|37 | 0.5 | <a href="9050/v106a.htm">阿闍世王子會</a> | 唐．菩提流志
   |38 | 2.5 | <a href="9050/v106b-8.htm">大乘方便會</a> | 東晉．竺難提 | 《慧上菩薩問大善權經》晉．竺法護譯；《大方廣善巧方便經》趙宋．施護譯
109|39 | 2 | <a href="9050/v109-10.htm">賢護長者會</a> | 隋．闍那崛多 | 《顯識經》唐．地婆訶羅
111|40 | 0.4 | <a href="9050/v111a.htm">淨信童女會</a> | 唐．菩提流志
   |41 | 0.3 | <a href="9050/v111b.htm">彌勒菩薩問八法會</a> | 元魏．菩提留支
   |42 | 0.3 | <a href="9050/v111c.htm">彌勒菩薩所問會</a> | 唐．菩提流志 | 《彌勒菩薩所問本願經》晉．竺法護譯
112|43 | 1 | <a href="9050/v112.htm">普明菩薩會</a> | 失譯。附秦錄勘 | 《大迦葉問大寶積正法經》趙宋施護譯；《遺曰摩尼寶經》東漢支讖
113|44*| 2 | <a href="9050/v113-4.htm">寶梁聚會</a> | 北梁．釋道龔
115|45 | 0.5 | <a href="9050/v115a.htm">無盡慧菩薩會</a> | 唐．菩提流志
   |46 | 1.5 | <a href="../books2/1800.htm">文殊說般若會</a> | 梁．曼陀羅仙 | 《大般若．曼殊室利分》唐．玄奘；《文殊般若經》南齊．僧伽婆羅譯
117|47 | 2 | <a href="9050/v117-8.htm">寶髻菩薩會</a> | 晉．竺法護 | 《大集．寶髻菩薩品》北涼．曇無讖譯
119|48 | 1 | <a href="9050/v119.htm">勝鬘夫人會</a> | 唐．菩提流志 | 《<a href="9015.htm">勝鬘經</a>》劉宋．求那跋陀羅譯
120|49 | 1 | <a href="9050/v120.htm">廣博仙人會</a> | 唐．菩提流志 | 《毘耶娑問經》元魏．瞿曇般若流支譯
`;

function showDBJJTOC() {
  var a = catalog.split('\n'), buf = new Buffer();
  buf.w('/TEXT030C/唐．菩提流志等譯\n',
        '<center><table style="margin-top:20px; margin-bottom:-30px">',
        '<caption class="ail1">（共120卷。右為現存之別譯本等）</caption>');
  var doneVolCnt = 0;
  for (var i in a) {
    var ln = a[i].trim();
    if (!ln) continue;
    ln = ln.split('\|');
    var volNum  = ln[0].trim(),
        meetNum = ln[1].trim(),
        vols    = ln[2].trim(),
        meet    = ln[3].trim(),
        xlator  = ln[4].trim(),
        alts    = (ln[5]||'').trim().replaceAll('《','《<c339>').replaceAll('》','</c339>》'),
        isDone  = meet.startsWith('<a'),
        volcls  = isDone ? 'ail' : 'cil',
        hasPins = '';
    if (xlator == '唐．菩提流志') xlator = '<cil>唐．菩提流志</cil>';
    if (meetNum.endsWith('*')) {
      meetNum = rtrim(meetNum, 1);
      hasPins = ' <span style="color:gray" title="有分品">✶</span>';
    }
    if (vols >= 5) volcls += ' style="color:brown" title="分卷頁"';
    else           volcls += ' title="單頁"';
    if (isDone) doneVolCnt += parseFloat(vols);
    vols = (vols == 1) ? '' : `(${vols}卷)`;
    var styl = (alts.indexOf('<br>') > 0) ? ' style="border-left:1px solid lightgray"' : '';
        vol = volNum ? `<small>第${volNum}卷</small>&nbsp;&nbsp;&nbsp;` : '';
    buf.w(`<tr><td align=right>${vol}</td>`,
          `<td align="right">${meetNum}.&nbsp;</td><td>${meet}${hasPins}</td>`,
          `<td class=${volcls} nowrap align=right>&nbsp;&nbsp;&nbsp;${vols}&nbsp;&nbsp;</td>`,
          `<td class=ail nowrap>&nbsp;&nbsp;&nbsp;${xlator}&nbsp;&nbsp;</td>`,
          `<td class="ail1"${styl}>${alts}</td></tr>`);
  }
  buf.w('</table></center>\n\n/VOLSEP/');
  if (doneVolCnt < 120) buf.w(`\n/TEXT339C/<i>Done volumes:</i> &nbsp;${doneVolCnt} / <i>120</i>`);
  return buf.render();
}

class SubsetSeriesContainer extends SeriesContainer {
  constructor(hasTOCPage, startNum, endNum, seriesTtl, author) {
    super();
    this.hasTOC = hasTOCPage;
    this.startNum = startNum;
    this.endNum = endNum;
    this.author = author;
    var idx = seriesTtl.lastIndexOf('第');
    if (idx > 0) {
      this.seriesTtl = seriesTtl.substring(0,idx);
      this.seriesNum = seriesTtl.substring(idx);
    } else {
      this.seriesTtl = seriesTtl;
      this.seriesNum = '';
    }
  }

  // 大寶積經 as default impl
  loadJS(vol) { addjs(`js/${vol&&to2d(vol) || !this.hasTOC&&to2d(this.startNum) || this.tocJS}.js`); }
  toCompleteTitle(ttl) { return '<a href="../9050.htm">大寶積經卷</a>•' + ttl; }

  inPageStart(newPin, id, pastPin, newprefix) {
    return `/END/${this.seriesTtl}${this.seriesNum} • ${pastPin}
/VOLSEP:${id}/
${newprefix||''}/SECTION/${newPin}`;
  }
  pageEnd(pin) {
    if (!pin) return '';
    if (pin.startsWith(this.seriesTtl)) return `/SECTIONR/${pin}`;
    return `/SECTIONR/${this.seriesTtl}${this.seriesNum} • ${pin}`;
  }

  seriesTitleDisp() { return this.seriesTtl + '<small style="color:gray">' + this.seriesNum + '</small>'; }
  setSimpleTOCAtop() { this.simpleTOC = true; return this; }

  showPage() {
    var me = this, len = me.endNum - me.startNum + 1;
    new (class extends DocInfo {
      constructor() {
        super();
        this.setVolumesInJS(me.hasTOC, true).setBuffer().setXG().setDepth(1)
            .setVolNumStart(me.startNum).reInit(`${me.startNum}-${me.endNum}`, len);
        this.tocJS = me.tocJS;
        this.volNum = me.volNum;
        var txt, zvol = zNumber(me.volNum),
            subttl = me.seriesTtl, ttl = me.toCompleteTitle(subttl);
        if (!me.volNum) {
          txt = `\n/TEXT030C/${me.author}\n${me.text}`;
        } else {
          ttl += `|第${zvol}卷`;
          subttl += `-卷${me.volNum}`;
          txt = `\n/TEXT030C/${me.author}`;
          if (me.simpleTOC)
            txt += `\n\n${this.showSimpleTOC()}`;
          txt += '\n' + me.text;
          txt += `\n/END/大寶積經第${zvol}卷\n/VOLSEP/`;
        }
        this.writeStart(ttl, subttl).writeBody(txt, true);
      }
      showSimpleTOC() {
        var s = me.startNum, e = me.endNum;
        return simpleTOC(me.seriesTtl, s, e, me.volNum-s+1);
      }
    })(); // class extends DocInfo

    docInfo.buf.render('stg');
  }

} // end of DBJJ.

const PART_FIRST = '（之上部）';
const PART_MID   = '（之中部）';
const PART_LAST  = '（之下部）';

var mvp; // singleton for single-page.

class MultiVolumePage { // covers single-volume page
  constructor(ttl, xlator, vStart, firstVolNote) {
    mvp = this;
    this.xlator = xlator || '大唐三藏菩提流志奉　詔譯';
    this.vStart = vStart;
    this.firstVolNote = (typeof firstVolNote == 'boolean') ? PART_LAST : (firstVolNote||'');
    var idx = ttl.lastIndexOf('第');
    if (idx < 0) {
      this.ttl = ttl;
      this.seq = '';
    } else {
      this.ttl = ttl.substring(0,idx);
      this.seq = ttl.substring(idx);
    }

    this.curIdx = 1;
  }

  // 單品會之支持

  START(volumes) {
    if (!volumes) volumes = 2;
    this.claimedVolumes = volumes;
    var toc = '';
    if (volumes > 1) {
      toc = `\n/TEXT030C/【${this.ttl}】　第一`;
      for (var i=2; i<=volumes; ++i)
        toc += `　　<a#a0${i}>第${zNumber(i)}</a>`;
    }
    return `/TEXT030C/${this.xlator}
${toc}
/SECTIONR:a01/大寶積經卷${zNumber(this.vStart)}${this.firstVolNote}
/SECTION/${this.ttl}${this.seq}${volumes>1?'之一':''}`;
  }

  END() {
    var cv = this.claimedVolumes;
    if (cv && (cv != this.curIdx))
      alert(`Claimed volumes is different from actual: ${cv} vs ${this.curIdx}`);
    return `/END/${this.ttl}${this.seq}`;
  }

  MID() {
    return `/SECTIONR:a${to2d(1+this.curIdx)}/${this.ttl}${this.seq}之${zNumber(this.curIdx)}
/SECTIONR/大寶積經卷${zNumber(this.vStart+this.curIdx)}
/SECTION/${this.ttl}${this.seq}之${zNumber(++this.curIdx)}`;
  }

  // 分品會之支持

  multiPinStart(toc) {
    return `/TEXT030C/${this.xlator}
${toc && nVolsTOC(this.ttl+this.seq, toc, null, true) || ''}`;
  }

  startAtVol(pin, id, vol, pastPin) {
    pastPin = pastPin && `/SECTIONR/${pastPin}\n` || '';
    vol = vol && `/SECTIONR/大寶積經第${zNumber(vol)}卷\n` || '';
    pin = pin && `/SECTION/${pin}` || '';
    id  = id  && `:${id}` || '';
    return `${pastPin}/VOLSEP${id}/\n${vol}${pin}`;
  }

  startInVol(newPin, id, pastPin, newprefix) {
    id = id ? `:${id}` : '';
    return `/END${id}/${this.ttl}${this.seq} • ${pastPin}

${newprefix||''}/SECTION/${newPin}`;
  }

  pageEnd() { return `/SECTIONR/${this.ttl}${this.seq}`; }

} // end of MVP.

// single-volume average size: 27300 bytes
