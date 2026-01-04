const nlconsts = (() => {
  var ret = {
    iMonths:    [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ], // international
    iWdayNames: [ 'M', 'T', 'W', 'H', 'F', 'S', 'N' ],              // international
    z天干:      '甲乙丙丁戊己庚辛壬癸',
    z地支:      '子丑寅卯辰巳午未申酉戌亥',
    z生肖:      '鼠牛虎兔龍蛇馬羊猴雞狗豬',
    zDayNames:  [
      '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
      '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
    ],
    zMonthNickNames: {
      '正月':   '孟春、正月、端月、柳月',
      '二月':   '仲春、杏月、如月、花月',
      '三月':   '季春、晚春、暮春、桃月、蚕月',
      '四月':   '孟夏、麦月、梅月、槐月',
      '五月':   '仲夏、蒲月、榴月、鸣蜩',
      '六月':   '季夏、荷月、荔月',
      '七月':   '孟秋、瓜月、兰月',
      '八月':   '仲秋、桂月、壮月',
      '九月':   '暮秋、菊月',
      '十月':   '孟冬、露月、阳月、阴月',
      '十一月': '仲冬、冬月、雪月、畅月、葭月',
      '十二月': '暮冬、腊月、冰月'
    },
    LeapMonthYears: []  // 閏月年列表
  };
  var data = [
    1903, 5,  1906, 4,  1909, 2,  1911, 6,  1914, 5,  1917, 2,  1919, 7,  1922, 5,  1925, 4,  1928, 2,
    1930, 6,  1933, 5,  1936, 3,  1938, 7,  1941, 6,  1944, 4,  1947, 2,  1949, 7,  1952, 5,  1955, 3,
    1957, 8,  1960, 6,  1963, 4,  1966, 3,  1968, 7,  1971, 5,  1974, 4,  1976, 8,  1979, 6,  1982, 4,
    1984, 10, 1987, 6,  1990, 5,  1993, 3,  1995, 8,  1998, 5,  2001, 4,  2004, 2,  2006, 7,  2009, 5,
    2012, 4,  2014, 9,  2017, 6,  2020, 4,  2023, 2,  2025, 6,  2028, 5,  2031, 3,  2033, 11, 2036, 6,
    2039, 5,  2042, 2,  2044, 7,  2047, 5,  2050, 3,  2052, 8,  2055, 6,  2058, 4,  2061, 3,  2063, 7,
    2066, 5,  2069, 4,  2071, 8,  2074, 6,  2077, 4,  2080, 3,  2082, 7,  2085, 5,  2088, 4,  2090, 8,
    2093, 6,  2096, 4,  2099, 2 ];
  for (var i=0; i<data.length; i+=2) ret.LeapMonthYears[data[i]-1900] = data[i+1]-1;
  return ret;
})();

// The calendars for these years.
const nongliNians = {};
const dayColl = {}; // from all years loaded
var curIYear = new Date().getFullYear(); // will be updated by NongLiYear's, to be for NongLi.
var journal;

function getNongLiNian(yr) { return nongliNians[`${yr}`]; }

function getDayInfo(tok) { return dayColl[tok]; }

function toToken(a, b, c) {
  var leap = b < 0 ? '^' : '';
  if (leap) b *= -1;
  return `${a}${leap}${to2d(b)}${to2d(c)}`;
}

class NongLiYear {
  constructor(year, firstDayYangLi, daysOfMonths, 節氣, events) {
    console.log('Adding NL Year', year);
    nongliNians[`${year}`] = this;
    if (firstDayYangLi[0] != year) firstDayYangLi.unshift(year);
    this.year = year;
    var d = this.year - 2020;
    this.天地年 = nlconsts.z天干[(d+6) % 10] + nlconsts.z地支[d % 12];
    this.生肖年 = nlconsts.z生肖[d % 12];

    this.firstDay = firstDayYangLi;
    this.daysOfMonths = daysOfMonths;
    this.zMonthNames = '正月:二月:三月:四月:五月:六月:七月:八月:九月:十月:十一月:十二月'.split(':'),
    this.jieqi = 節氣;
    this.otherEvents = events;
    if (daysOfMonths.length > 12) {
      this.hasLeapMonth = true;
      for (var i=0; i<daysOfMonths.length; ++i) {
        if (daysOfMonths[i] < 0) {
          daysOfMonths[i] *= -1;
          this.leapMonth = i;
          this.zMonthNames.splice(i, 0, '潤' + this.zMonthNames[i-1]);
          break;
        }
      }
    }
    this._prepareDays();
  }

  setHasNext() { this.hasNext = true; }
  setHasPrev() { this.hasPrev = true; }

  _prepareDays() {
    var cells = [];

    var myMonths = Array.from(nlconsts.iMonths), monthCnt = this.daysOfMonths.length;

    // all components are 1-based
    if ((this.year % 4 === 0) && (this.year % 400 !== 0)) // international leap year
      myMonths[1] = 29;

    // set days
    var i, j, row;
    for (i=0; i<30; ++i) {
      var dname = nlconsts.zDayNames[i];
      row = [];
      for (j=0; j<monthCnt; ++j) {
        var is30 = (this.daysOfMonths[j] === 30);
        if (i < 29 || is30) {
          var d = { zday:   dname,
                    is齋日: (i===0) || (i===7) || (i===13) || (i===14) || (i===17) ||
                            (i===22) || (i===23) || (i===27) || (i===28) || (i === (is30 ? 29 : 26))
                  };
          row.push(d);
        } else
        row.push({ zday:'' });
      }
      cells.push(row);
    }

    // set international month/day/weekday
    var lastMonthDays = myMonths[monthCnt-1], me = cells[0][0];

    var curYear  = me.year  = this.firstDay[0];
    var curMonth = me.month = this.firstDay[1] - 1;
    var curDay   = me.day   = this.firstDay[2] - 1;
    var curWeek  = me.week  = this.firstDay[3] - 1;
    me.iToken = toToken(curYear, curMonth+1, curDay+1);
    me.yinToken = 'yin' + toToken(this.year, 1, 1);
    me.yx = '0_0';
    dayColl[me.iToken] = dayColl[me.yinToken] = dayColl[me.yx] = me;

    for (j=0; j<monthCnt; ++j) {
      var daysThisMonth = myMonths[curMonth];
      var zDaysThisMonth = this.daysOfMonths[j];
      for (i=(j===0)?1:0; i<zDaysThisMonth; ++i) {
        curWeek = (++curWeek) % 7;
        ++curDay;
        if (curDay >= daysThisMonth) {
          curDay = 0;
          ++curMonth;
          if (curMonth >= 12) { curMonth = 0; ++curYear; }
        }
        me = cells[i][j];
        me.year  = curYear;
        me.month = curMonth;
        me.day   = curDay;
        me.week  = curWeek;
        me.iToken = toToken(curYear, curMonth+1, curDay+1);
        me.yinToken = 'yin' + toToken(this.year, (j==this.leapMonth) ? (-j-1) : (j+1), i+1);
        me.yx = `${j}_${i}`;

        dayColl[me.iToken] = dayColl[me.yinToken] = dayColl[me.yx] = me;
      }
    }

    // set jieqi and events
    for (i=0; i<this.jieqi.length; ++i) { // 數據是陽曆
      var jq = this.jieqi[i], tok = toToken(jq[1], jq[2], jq[3]),
          dayInfo = dayColl[tok];
      if (dayInfo) dayInfo.jieqi = jq[0];
    }
    if (this.otherEvents) { // 數據是陽曆
      for (i=0; i<this.otherEvents.length; ++i) {
        var e = this.otherEvents[i], tok = toToken(e[0], e[1], e[2]),
            dayInfo = dayColl[tok];
        if (dayInfo) dayInfo.event = e[3];
      }
    }
  }

  check傳統節日(month, day) { // month, day are 0-based
    var isLeap2 = this.hasLeapMonth, lastMonth = this.daysOfMonths.length-1;
    if (month === lastMonth) {
      if (day === 7)  return '腊八';
      if (day === 22) return '祭灶';
      var lastMonthDays = this.daysOfMonths[lastMonth].length;
      if (day === (lastMonthDays-1)) return '除夕';
    }
    switch(day) {
    case 0:  if (month === 0)                 return '春節'; break;
    case 1:  if (month === 1)                 return '龍抬頭'; break;
    case 4:  if (month === (isLeap2 ? 5 : 4)) return '端午'; break;
    case 6:  if (month === (isLeap2 ? 7 : 6)) return '七夕'; break;
    case 8:  if (month === (isLeap2 ? 9 : 8)) return '重陽'; break;
    case 14: if (month === 0)                 return '元宵';
             if (month === (isLeap2 ? 7 : 6)) return '中元';
             if (month === (isLeap2 ? 8 : 7)) return '中秋';
             break;
    }
    return null;
  }

} // end of NongLiYear.

class NL2023 extends NongLiYear {
  constructor(events) {
    super(2023, [ 1, 22, 7 ], [ 29, 29, -30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30 ],
      [ // 節氣: 陽曆日子                                                           2022 << ['小寒',2023, 1, 5], ['大寒',2023, 1,20],
        ['立春',2023, 2, 4], ['雨水',2023, 2,19], ['驚蟄',2023, 3, 6], ['春分',2023, 3,21], ['清明',2023, 4, 5], ['穀雨',2023, 4,20],
        ['立夏',2023, 5, 6], ['小滿',2023, 5,21], ['芒種',2023, 6, 6], ['夏至',2023, 6,21], ['小暑',2023, 7, 7], ['大暑',2023, 7,23],
        ['立秋',2023, 8, 8], ['處暑',2023, 8,23], ['白露',2023, 9, 8], ['秋分',2023, 9,23], ['寒露',2023,10, 8], ['霜降',2023,10,24],
        ['立冬',2023,11, 8], ['小雪',2023,11,22], ['大雪',2023,12, 7], ['冬至',2023,12,22], ['小寒',2024, 1, 6], ['大寒',2024, 1,20],
        ['立春',2024, 2, 4], // >> 2024
      ], events);
  }
};

class NL2024 extends NongLiYear {
  constructor(events) {
    super(2024, [ 2, 10, 6 ], [ 29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29 ],
      [ // 節氣: 陽曆日子                                                           2023 << ['小寒',2024, 1, 6], ['大寒',2024, 1,20],
        ['立春',2024, 2, 4], ['雨水',2024, 2,19], ['驚蟄',2024, 3, 5], ['春分',2024, 3,20], ['清明',2024, 4, 4], ['穀雨',2024, 4,19],
        ['立夏',2024, 5, 5], ['小滿',2024, 5,20], ['芒種',2024, 6, 5], ['夏至',2024, 6,21], ['小暑',2024, 7, 6], ['大暑',2024, 7,22],
        ['立秋',2024, 8, 7], ['處暑',2024, 8,22], ['白露',2024, 9, 7], ['秋分',2024, 9,22], ['寒露',2024,10, 8], ['霜降',2024,10,23],
        ['立冬',2024,11, 7], ['小雪',2024,11,22], ['大雪',2024,12, 6], ['冬至',2024,12,21], ['小寒',2025, 1, 5], ['大寒',2025, 1,20],
        ['立春',2025, 2, 3], // >> 2025
      ], events);
  }
};

class NL2025 extends NongLiYear {
  constructor(events) {
    super(2025, [ 1, 29, 3 ], [ 30, 29, 30, 29, 29, 30, -29, 30, 29, 30, 30, 30, 29 ],
      [ // 節氣: 陽曆日子                                                           2024 << ['小寒',2025, 1, 5], ['大寒',2025, 1,20],
        ['立春',2025, 2, 3], ['雨水',2025, 2,18], ['驚蟄',2025, 3, 5], ['春分',2025, 3,20], ['清明',2025, 4, 4], ['穀雨',2025, 4,20],
        ['立夏',2025, 5, 5], ['小滿',2025, 5,21], ['芒種',2025, 6, 5], ['夏至',2025, 6,21], ['小暑',2025, 7, 7], ['大暑',2025, 7,22],
        ['立秋',2025, 8, 7], ['處暑',2025, 8,23], ['白露',2025, 9, 7], ['秋分',2025, 9,23], ['寒露',2025,10, 8], ['霜降',2025,10,23],
        ['立冬',2025,11, 7], ['小雪',2025,11,22], ['大雪',2025,12, 7], ['冬至',2025,12,21], ['小寒',2026, 1, 5], ['大寒',2026, 1,20],
        ['立春',2026, 2, 4], // >> 2026
      ], events);
  }
};

class NL2026 extends NongLiYear {
  constructor(events) {
    super(2026, [ 2, 17, 2 ], [ 30, 29, 30, 29, 29, 30, 29, 29, 30, 30, 30, 29 ],
      [ // 節氣: 陽曆日子                                                           2025 << ['小寒',2025, 1, 5], ['大寒',2025, 1,20],
        ['立春',2026, 2, 4], ['雨水',2026, 2,18], ['驚蟄',2026, 3, 5], ['春分',2026, 3,20], ['清明',2026, 4, 5], ['穀雨',2026, 4,20],
        ['立夏',2026, 5, 5], ['小滿',2026, 5,21], ['芒種',2026, 6, 5], ['夏至',2026, 6,21], ['小暑',2026, 7, 7], ['大暑',2026, 7,23],
        ['立秋',2026, 8, 7], ['處暑',2026, 8,23], ['白露',2026, 9, 7], ['秋分',2026, 9,23], ['寒露',2026,10, 8], ['霜降',2026,10,23],
        ['立冬',2026,11, 7], ['小雪',2026,11,22], ['大雪',2026,12, 7], ['冬至',2026,12,22], ['小寒',2027, 1, 5], ['大寒',2027, 1,20],
        ['立春',2026, 2, 6], // >> 2027
      ], events);
  }
};

/*
class NL2027 extends NongLiYear {
  constructor() {
    super(2027, [ 2, 6, 6 ], [ ],
      [ // 節氣:
      ]);
  }
};
*/

const NLYearDefs = [ NL2023, NL2024, NL2025, NL2026 ];

function loadNongLiYear(yr, events, loadAdj) {
  yr = toInt(yr || curIYear);
  var clz = NLYearDefs[yr-2023];
  if (!clz) { alert(`農曆年${yr}尚未建立，抱歉。`); return; }
  var nln = new clz(events); // Created the main/only instance.
  clz = NLYearDefs[yr-2024]; if (clz) { nln.setHasPrev(); if (loadAdj) new clz(events); }
  clz = NLYearDefs[yr-2022]; if (clz) { nln.setHasNext(); if (loadAdj) new clz(events); }
}

//
// -- UI
//
function showNongLiNian(nlyr, elid) {
  document.title = `陰曆${nlyr}年`;

  var year = toInt(nlyr), nextYr = year+1, today = new Date(), nlnMonth = 1, buf = new Buffer();
  var nln = getNongLiNian(year), zMonths = nln.zMonthNames, monthCnt = nln.daysOfMonths.length;

  buf.w('<h1>',
        nln.hasPrev ? ('<a href="?year=' + (year-1) + '"><<</a>') : '<inv><<</inv>',
        '&nbsp;農曆<red>', nln.天地年, '</red>年　<red>', nln.生肖年, '</red>年　',
        '公元<red>', year, '-', nextYr-2000, '</red>年&nbsp;',
        nln.hasNext ? '<a href="?year=' + nextYr + '">>></a>' : '<inv>>></inv>',
        '</h1><table cellpadding="0" cellspacing="0" border="0">',
        '<tr bgcolor="">');
  for (j=nlnMonth-1; j<monthCnt; ++j) {
    var zm = zMonths[j], monthName;
    if (zm.startsWith('潤')) monthName = '潤：' + nlconsts.zMonthNickNames[zm.substring(1)];
    else monthName = nlconsts.zMonthNickNames[zm];
    buf.w('<th width="100px" style="border-bottom:1px solid #337" title="', monthName, '">', zm, '</th>');
  }
  buf.w('</tr>');

  for (i=0; i<30; ++i) {
    buf.w('<tr>');
    for (j=nlnMonth-1; j<monthCnt; ++j) {
      var cell = dayColl[`${j}_${i}`], zd = nln.check傳統節日(j,i), cls = zd ? 'traditional' : '';
      zd = zd || cell && cell.zday || '';
      if (zd === '') { buf.w('<td></td>'); continue; }
      var txt = '', jq = cell.jieqi || (cell.iToken && (cell.day==0 && cell.month==0) && '元旦'), e = cell.event;
      if (jq) cls = (cls + ' jieqi').trim();
      if (e) {
        var idx = e.indexOf(':'), txt = '';
        if (idx >= 0) {
          txt = e.substring(idx+1).trim();
          e = (idx===0) ? (cell.jieqi||zd) : e.substring(0, idx);
        }
        if (e.length > 2) {
          txt = `【${e}】${txt}`;
          e = e.substring(0,2);
        }
        cls = (cls + ' event').trim();
        zd = `<font class="${cls}" title="${txt}">${e}</font>`;
      } else if (jq) {
        zd = `<font class="${cls}">${jq}</font>`;
      } else if (cls) {
        zd = `<font class="${cls}">${zd}</font>`;
      }
      var otheryr = cell.iToken.substring(0,4) != cell.yinToken.substring(3,7),
          style = cell.is齋日 ? ' bgcolor="#DDF";' : (otheryr ? ' bgcolor="#dee";' : ''),
          txtstyle = 'font-size:14px;', wd = nlconsts.iWdayNames[cell.week];
      if (wd === 'N' || wd === 'S') txtstyle = 'color:red;';
      else if (cell.iToken.substring(0,4) != cell.yinToken.substring(3,7)) txtstyle = 'color:teal';
      buf.w('<td nowrap align="left"', style, '>&nbsp;', zd);
      if (cell.year === today.getFullYear() && cell.month === today.getMonth() && cell.day === today.getDate()-1) {
        txtstyle += 'background:#f33; color:blue; font-style:italic';
        buf.w(' <font style="', txtstyle, '" title="今天">');
      } else {
        buf.w(' <font style="', txtstyle, '">');
      }
      buf.w(cell.month+1, '-', cell.day+1, '&nbsp;', wd, '</font></td>');
    }
    buf.w('</tr>');
  }
  buf.w(`<tr><td colspan="${monthCnt}" style="border-top:2px solid #337">&nbsp;</td></tr></table>`);
  buf.render(elid);
}
