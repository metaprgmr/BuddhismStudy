function get(name) {
 if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
   return decodeURIComponent(name[1]);
}
function e(id) { return document.getElementById(id) }
class Buffer {
  constructor() { this.bufList = Array.from(arguments); }

  w() {
    var ret = '';
    for (var i in arguments) ret += arguments[i];
    if (ret) this.bufList.push(ret);
    return (this.bufList.length < 1024) ? this : this.condense();
  }

  append(s) { // for performance
    this.bufList.push(s);
  }

  prepend() {
    var ret = '';
    for (var i in arguments) {
      var x = arguments[i];
      x && (ret += x);
    }
    if (ret) this.bufList.unshift(ret);
    return this;
  }

  // renders to one or more elements.
  // returns the text, and clears the internal content.
  render() {
    var ret = this.text();
    for (var i in arguments) {
      var el = e(arguments[i]);
      el && (el.innerHTML = ret);
    }
    this.bufList = [];
    return ret;
  }

  text() {
    var s = this.bufList.join('')
    this.bufList = [ s ];
    return s;
  }

  condense() {
    if (this.bufList.length > 100)
      this.text();
    return this;
  }

} // end of Buffer.

const iMonths     = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ], // international
      iWdayNames  = [ 'M', 'T', 'W', 'H', 'F', 'S', 'N' ],              // international
      z天干 = '甲乙丙丁戊己庚辛壬癸',
      z地支 = '子丑寅卯辰巳午未申酉戌亥',
      z生肖 = '鼠牛虎兔龍蛇馬羊猴雞狗豬',
      zDayNames = [ '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十' ],
      LeapMonthYears = []; // 閏月年列表

(function() { var a=arguments; for (var i=0; i<a.length; i+=2) LeapMonthYears[a[0]-1900] = a[1]-1; })
 (1903, 5,  1906, 4,  1909, 2,  1911, 6,  1914, 5,  1917, 2,  1919, 7,  1922, 5,  1925, 4,  1928, 2,
  1930, 6,  1933, 5,  1936, 3,  1938, 7,  1941, 6,  1944, 4,  1947, 2,  1949, 7,  1952, 5,  1955, 3,
  1957, 8,  1960, 6,  1963, 4,  1966, 3,  1968, 7,  1971, 5,  1974, 4,  1976, 8,  1979, 6,  1982, 4,
  1984, 10, 1987, 6,  1990, 5,  1993, 3,  1995, 8,  1998, 5,  2001, 4,  2004, 2,  2006, 7,  2009, 5,
  2012, 4,  2014, 9,  2017, 6,  2020, 4,  2023, 2,  2025, 6,  2028, 5,  2031, 3,  2033, 11, 2036, 6,
  2039, 5,  2042, 2,  2044, 7,  2047, 5,  2050, 3,  2052, 8,  2055, 6,  2058, 4,  2061, 3,  2063, 7,
  2066, 5,  2069, 4,  2071, 8,  2074, 6,  2077, 4,  2080, 3,  2082, 7,  2085, 5,  2088, 4,  2090, 8,
  2093, 6,  2096, 4,  2099, 2);

// The calendars for these years.
const zMonthNickNames = {
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
};
const nongliNians = {};
var firstYr = new Date().getFullYear(), curYr = firstYr; // will be updated by NongLiYear's.
var journal;

class NongLiYear
{
  constructor(year, firstDayYangLi, daysOfMonths, 節氣) {
    nongliNians[`${year}`] = this;
    if (firstDayYangLi[0] != year) firstDayYangLi.unshift(year);
    if (year < firstYr) firstYr = year; // global
    if (year > curYr) curYr = year;     // global
    this.year = year;
    this.firstDay = firstDayYangLi;
    this.daysOfMonths = daysOfMonths;
    this.zMonthNames = '正月:二月:三月:四月:五月:六月:七月:八月:九月:十月:十一月:十二月'.split(':'),
    this.jieqi = 節氣;
    this.setOtherEvents();
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
  }
  get天地年() { var d = this.year-2023; return z天干[(9+d) % 10] + z地支[(3+d) % 12]; }
  get生肖年() { return z生肖[(this.year-2000+4) % 12]; }

  check傳統節日(month, day) { // month, day are 0-based
    var isLeap2 = this.hasLeapMonth, lastMonth = this.daysOfMonths.length-1;
    if (day === 0  && month === 0)                 return '春節';
    if (day === 14 && month === 0)                 return '元宵';
    if (day === 1  && month === 1)                 return '龍抬頭';
    if (day === 4  && month === (isLeap2 ? 5 : 4)) return '端午';
    if (day === 6  && month === (isLeap2 ? 7 : 6)) return '七夕';
    if (day === 14 && month === (isLeap2 ? 7 : 6)) return '中元';
    if (day === 14 && month === (isLeap2 ? 8 : 7)) return '中秋';
    if (day === 8  && month === (isLeap2 ? 9 : 8)) return '重陽';
    if (day === 7  && month === lastMonth)         return '腊八';
    if (day === 22 && month === lastMonth)         return '祭灶';
    var lastMonthDays = this.daysOfMonths[lastMonth].length;
    if (day === (lastMonthDays-1) && month === lastMonth) return '除夕';
    return null;
  }

  setOtherEvents(evts) { this.otherEvents = evts || []; }

  showCal(elid) {
    var year = this.year, daysOfMonths = this.daysOfMonths, buf = new Buffer();
    document.title = `陰曆${year}年`;
  
    buf.w('<h1>',
      year > firstYr ? ('<a href="?year=' + (year-1) + '"><<</a>') : '<inv><<</inv>',
      '&nbsp;&nbsp;&nbsp;公元<red>', year, '</red>年　農曆<red>',
      this.get天地年(), '</red>年　生肖<red>', this.get生肖年(), '</red>&nbsp;&nbsp;&nbsp;',
      year < curYr ? '<a href="?year=' + (year+1) + '">>></a>' : '<inv>>></inv>',
      '</h1>',
      '<table cellpadding="0" cellspacing="0" border="0">');
  
    // all components are 1-based
    if ((year % 4 === 0) && (year % 400 !== 0)) // international leap year
      iMonths[1] = 29;
  
    // set days
    var i, j, row, cells = [];
    for (i=0; i<30; ++i) {
      var dname = zDayNames[i];
      row = [];
      for (j=0; j<daysOfMonths.length; ++j) {
        var is30 = (daysOfMonths[j] === 30);
        if (i < 29 || is30) {
          var d = { zday:     dname,
                    isZhaiRi: (i===0) || (i===7) || (i===13) || (i===14) || (i===17) ||
                              (i===22) || (i===23) || (i===27) || (i===28) || (i === (is30 ? 29 : 26))
                  };
          row.push(d);
        } else
          row.push({ zday:'' });
      }
      cells.push(row);
    }
  
    // set jieqi and events
    var jieqiMap = {}, eventsMap = {}; // 數據是陽曆
    for (i=0; i<this.jieqi.length; ++i) {
      var jq = this.jieqi[i];
      jieqiMap[jq[1] + '_' + jq[2] + '_' + jq[3]] = jq[0];
    }
    if (this.otherEvents) {
      for (i=0; i<this.otherEvents.length; ++i) {
        var e = this.otherEvents[i];
        eventsMap[e[0] + '_' + e[1] + '_' + e[2]] = e[3];
      }
    }
  
    // set international month/day/weekday
    var curYear  = cells[0][0].year  = this.firstDay[0];
    var curMonth = cells[0][0].month = this.firstDay[1] - 1;
    var curDay   = cells[0][0].day   = this.firstDay[2] - 1;
    var curWeek  = cells[0][0].week  = this.firstDay[3] - 1;
    var lastMonthDays = iMonths[daysOfMonths.length-1];
    for (j=0; j<daysOfMonths.length; ++j) {
      var daysThisMonth = iMonths[curMonth];
      var zDaysThisMonth = daysOfMonths[j];
      for (i=(j===0)?1:0; i<zDaysThisMonth; ++i) {
        curWeek = (++curWeek) % 7;
        ++curDay;
        if (curDay >= daysThisMonth) {
          curDay = 0;
          ++curMonth;
          if (curMonth >= 12) { curMonth = 0; ++curYear; }
        }
        var me = cells[i][j];
        me.year  = curYear;
        me.month = curMonth;
        me.day   = curDay;
        me.week  = curWeek;
        me.iToken = curYear + '_' + (curMonth+1) + '_' + (curDay+1);
      }
    }
  
    // display
    var today = new Date();
    var thisMonth = today.getMonth();
    thisMonth = 1;
    buf.w('<tr bgcolor="">');
    var zMonths = this.zMonthNames;
    for (j=thisMonth-1; j<daysOfMonths.length; ++j) {
      var zm = zMonths[j];
      var monthName;
      if (zm.startsWith('潤')) monthName = '潤：' + zMonthNickNames[zm.substring(1)];
      else monthName = zMonthNickNames[zm];
      buf.w('<th width="100px" style="border-bottom:1px solid black" title="', monthName, '">', zm, '</th>');
    }
    buf.w('</tr>');
  
    for (i=0; i<30; ++i) {
      row = cells[i];
      buf.w('<tr>');
      for (j=thisMonth-1; j<daysOfMonths.length; ++j) {
        var cell = row[j], zd = this.check傳統節日(j, i);
        var cls = zd ? 'traditional' : '';
        zd = zd || cell.zday;
        if (zd === '') { buf.w('<td></td>'); continue; }
        var txt = '', jq = jieqiMap[cell.iToken] || (cell.iToken && cell.iToken.endsWith('_1_1') && '元旦');
        if (jq) cls = (cls + ' jieqi').trim();
        var e = eventsMap[cell.iToken];
        if (e) {
          var idx = e.indexOf(':'), txt = '';
          if (idx >= 0) {
            txt = e.substring(idx+1).trim();
            if (idx === 0)
              e = jieqiMap[cell.iToken] || zd;
            else
              e = e.substring(0, idx);
          }
          if (e.length > 2) {
            txt = '【' + e + '】' + txt;
            e = e.substring(0,2);
          }
          cls = (cls + ' event').trim();
          zd = '<font class="' + cls + '" title="' + txt + '">' + e + '</font>';
        } else if (jq) {
          zd = '<font class="' + cls + '">' + jq + '</font>';
        } else if (cls) {
          zd = '<font class="' + cls + '">' + zd + '</font>';
        }
        var style = '';
        if (cell.isZhaiRi) style = ' bgcolor="#DDF";';
        var wd = iWdayNames[cell.week], txtstyle = 'font-size:14px;';
        if (wd === 'N' || wd === 'S') txtstyle = 'color:red;';
        buf.w('<td nowrap align="left"', style, '>&nbsp;', zd);
        if (cell.year === today.getFullYear() && cell.month === today.getMonth() && cell.day === today.getDate()-1) {
          txtstyle += 'background:#f33; color:white; font-style:italic';
          buf.w(' <font style="', txtstyle, '" title="今天">');
        } else {
          buf.w(' <font style="', txtstyle, '">');
        }
        buf.w(cell.month+1, '-', cell.day+1, '&nbsp;', wd, '</font></td>');
      }
      buf.w('</tr>');
    }
    buf.w('</table>');
    buf.render(elid);
  }

} // end of NongLiYear.

new NongLiYear(2023, [ 1, 22, 7 ], [ 29, 29, -30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30 ],
  [ // 節氣: 陽曆日子                                                            2022< ['小寒',2023, 1, 5], ['大寒',2023, 1,20],
    ['立春',2023, 2, 4], ['雨水',2023, 2,19], ['驚蟄',2023, 3, 6], ['春分',2023, 3,21], ['清明',2023, 4, 5], ['穀雨',2023, 4,20],
    ['立夏',2023, 5, 6], ['小滿',2023, 5,21], ['芒種',2023, 6, 6], ['夏至',2023, 6,21], ['小暑',2023, 7, 7], ['大暑',2023, 7,23],
    ['立秋',2023, 8, 8], ['處暑',2023, 8,23], ['白露',2023, 9, 8], ['秋分',2023, 9,23], ['寒露',2023,10, 8], ['霜降',2023,10,24],
    ['立冬',2023,11, 8], ['小雪',2023,11,22], ['大雪',2023,12, 7], ['冬至',2023,12,22], ['小寒',2024, 1, 6], ['大寒',2024, 1,20],
    ['立春',2024, 2, 4], // 2024
  ]);

new NongLiYear(2024, [ 2, 10, 6 ], [ 29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29 ],
  [ // 節氣: 陽曆日子                                                            2023< ['小寒',2023, 1, 6], ['大寒',2023, 1,20],
    ['立春',2024, 2, 4], ['雨水',2024, 2,19], ['驚蟄',2024, 3, 5], ['春分',2024, 3,20], ['清明',2024, 4, 4], ['穀雨',2024, 4,19],
    ['立夏',2024, 5, 5], ['小滿',2024, 5,20], ['芒種',2024, 6, 5], ['夏至',2024, 6,21], ['小暑',2024, 7, 6], ['大暑',2024, 7,22],
    ['立秋',2024, 8, 7], ['處暑',2024, 8,22], ['白露',2024, 9, 7], ['秋分',2024, 9,22], ['寒露',2024,10, 8], ['霜降',2024,10,23],
    ['立冬',2024,11, 7], ['小雪',2024,11,22], ['大雪',2024,12, 6], ['冬至',2024,12,21], ['小寒',2025, 1, 5], ['大寒',2025, 1,20],
    ['立春',2025, 2, 3], // 2025
  ]);

// TODO: data completely not right !!!
new NongLiYear(2025, [ 1, 29, 3 ], [ 30, 29, 30, 29, 29, 30, -29, 30, 29, 30, 30, 30, 29 ],
  [ // 節氣: 陽曆日子                                                            2024< ['小寒',2023, 1, 5], ['大寒',2023, 1,20],
    ['立春',2025, 2, 3], ['雨水',2025, 2,18], ['驚蟄',2025, 3, 5], ['春分',2025, 3,20], ['清明',2025, 4, 4], ['穀雨',2025, 4,20],
    ['立夏',2025, 5, 5], ['小滿',2025, 5,21], ['芒種',2025, 6, 5], ['夏至',2025, 6,21], ['小暑',2025, 7, 7], ['大暑',2025, 7,22],
    ['立秋',2025, 8, 7], ['處暑',2025, 8,23], ['白露',2025, 9, 7], ['秋分',2025, 9,23], ['寒露',2025,10, 8], ['霜降',2025,10,23],
    ['立冬',2025,11, 7], ['小雪',2025,11,22], ['大雪',2025,12, 7], ['冬至',2025,12,21], ['小寒',2026, 1, 5], ['大寒',2026, 1,20],
    ['立春',2026, 2, 4], // 2026
  ]);

//new NongLiYear(2026, [ 2, 17, 2 ], 
