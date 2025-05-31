class Lecture {
  constructor(obj) {
    Object.assign(this, obj);
    this._process();
  }
  _process() {
    // handle video durations
    var tDur = 0;
    for (var i=0; i<this.videos.length; ++i) {
      var vid = this.videos[i];
      var a = vid.dur.split(':');
      var factor = 1, dur = 0;
      for (var j=a.length-1; j>=0; --j) {
        dur += a[j] * factor;
        factor *= 60;
      }
      vid.dur = dur; // in seconds
      tDur += dur;
    }
    this.totalDur = tDur;
  }
}

var lectures = [];

function formatTime(tm) {
  if (tm == 0) return '';
  function fmt2Digits(x, min) {
    if (min && (x < min)) return '<inv>0</inv>0';
    return (x<10) ? ('<inv>0</inv>'+x) : x;
  }
  var hrs = Math.floor(tm / 3600);
  var secs = tm - hrs*3600;
  var mins = Math.floor(secs / 60);
  secs -= mins*60;
  var res = '';
  if (hrs <= 0)
    return fmt2Digits(mins) + ':' + fmt2Digits(secs, 5);
  return '<b>' + hrs + ':</b>' + fmt2Digits(mins) + ':' + fmt2Digits(secs, 5);
}

function addJJList(lst) { lectures.push(new Lecture(lst)); }

function showAll(elid) {
  var buf = new Buffer();
  var ytv = window['YTViewing'] ? window.YTViewing : null;
  buf.w('<hr color="lightgray"><center><table style="margin-left:20px" border=0>',
        '<h2>淨界法師&ndash;淨土教觀學苑</h2>');
  var totalD = 0;
  for (var i=0; i<lectures.length; ++i) {
    var lst = lectures[i];
    totalD += lst.totalDur;
    buf.w(`<tr><td>${i+1}.&nbsp;</td>`,
          `<td><b><a href="javascript:showTop('_${i}')">${lst.title}</a></b>`,
          '&nbsp;&nbsp;&nbsp;</td>',
          `<td align="right">${formatTime(lst.totalDur)}</td>`,
          `<td align="right">&nbsp;&nbsp;&nbsp;${lst.videos.length}</td><td>集</td></tr>`);
  }
  buf.w('<tr><td colspan="2">&nbsp;</td>',
        '<td align="right" style="border-top:1px solid black">', formatTime(totalD), '</td>',
        '<td colspan="2">&nbsp;</td></tr></table>');

  for (var i=0; i<lectures.length; ++i) {
    var lst = lectures[i], ttl = lst.title;
    if (lst.ytlistid)
      ttl = `<a href="https://www.youtube.com/playlist?list=${lst.ytlistid}" target="extra" title="YouTube List">${ttl}</a>`;
    buf.w(`<hr color="lightgray"><div id="_${i}"><h3>${i+1}.&nbsp;${ttl}</h3>`,
          '<table cellspacing="0" style="margin-left:20px" border=0 bgcolor="white">');
    var totalCheckedDur = 0;
    for (var j=0; j<lst.videos.length; ++j) {
      var vid = lst.videos[j];
      if (vid.checked) totalCheckedDur += vid.dur;
      var vu = ytv && ytv[vid.ytid];
      if (vu) vu = ` style="border-left:2px solid green" title="${vu}"`; else vu = '';
      buf.w('<tr><td valign="top" align="right"', vu, '>', j+1, '.&nbsp;</td>',
            `<td valign="top" style="font-family:monospace; padding-top:4px"><a href="https://www.youtube.com/watch?v=${vid.ytid}" target="extra">${vid.ytid}</a>&nbsp;</td>`,
            '<td valign="top" align="right">', formatTime(vid.dur), '</td>',
            '<td style="padding-left:5px">', vid.title, '</td></tr>');
    }
    buf.w('<tr><td colspan="3" align="right" style="border-top:1px solid black;">',
          '總時長：&nbsp;<i>', formatTime(lst.totalDur), '</i></td>',
          '</tr></table></div>');
  }

  buf.w('</center><hr color="lightgray">').render(elid);
}
