const ytListURL  = (id) => `https://www.youtube.com/playlist?list=${id}`;
const ytVideoURL = (id) => `https://www.youtube.com/watch?v=${id}`;

var YTViewing = {};

function toATag(atag, name) {
  switch (name[0]) {
  case '【':
  case '《':
  case '（':
  case '「': return `${name[0]}${atag}${name.substring(1,name.length-1)}</a>${name[name.length-1]}`;
  default: return `${atag}${name}</a>`;
  }
}

class YTCollection {
  constructor(title) { this.title=title; this.lists=[]; }
  add() {
    var lsts = arguments[0];
    if (!Array.isArray(lsts)) lsts = arguments;
    for (var i in lsts) this.lists.push(lsts[i]);
    return this;
  }
  setTOCNoNumber(yes) { this.tocNoNumber = yes; return this; }
  renderTOC(fxnName, buf) {
    if (!buf) buf = new Buffer();
    buf.w('<center><table style="margin-left:20px" border=0 cellspacing=0>',
          `<h2 class="listheader">${this.title}</h2>`);
    var totalD = 0, totalV = 0, len = this.lists.length, totalVols = 0;
    for (var i=0; i<len; ++i) {
      var lst = this.lists[i];
      buf.w(`<tr><td align=right>${this.tocNoNumber?'':((i+1)+'.')}&nbsp;</td>`);
      if (Array.isArray(lst) && lst.length > 1) { // a simple link
        if (lst[1].startsWith('link='))
          buf.w('<td colspan=3>', toATag(`<a href="${lst[1].substring(5)}">`, lst[0]), '</td></tr>');
        else
          buf.w('<td colspan=3>', toATag(`<a href="javascript:${fxnName}(${i})">`, lst[0]), '</b></td></tr>');
      } else {
        totalD += lst.totalDur;
        totalV += lst.getViewedDur();
        var a = lst.name.split('|'), more = '';
        if (a.length > 1) { more = a[1]; if (more == '@善知識') more = '@amtb'; }
        more = ` <ytauthor>${more}</ytauthor>`;
        totalVols += lst.videos.length;
        buf.w('<td><b>', toATag(`<a href="javascript:${fxnName}(${i})">`, a[0]), more, '</b>',
              '&nbsp;&nbsp;&nbsp;</td>',
              `<td align="right"><code>${formatTime(lst.totalDur)}</code></td>`,
              `<td align="right">${lst.videos.length}</td><td>集&nbsp;${lst.percentEmoji(12)}</td></tr>`);
      }
    }
    const topbar = ' style="border-top:1px solid black"';
    buf.w('<tr><td colspan="2">&nbsp;</td>',
          `<td align="right"${topbar}><code>${formatTime(totalD)}</code></td>`,
          `<td align="right"${topbar}>&nbsp;&nbsp;${totalVols}</td><td${topbar}>集&nbsp;${percentEmoji(totalV/totalD, 12)}</td></tr></table></center>`);
    return buf;
  }

  renderList(i, buf) {
    if (!buf) buf = new Buffer();
    var lst = this.lists[i];
    if (Array.isArray(lst) && lst.length > 1)
      return buf.w(lst[1]); // [0] is caption, [1] content
    else
      return lst.render(buf);
  }

  renderAll(buf) {
    if (!buf) buf = new Buffer();
    for (var i=0; i<this.lists.length; ++i)
      this.renderList(i, buf);
    return buf;
  }
}

class Caption {
  constructor(html) {
    this.html = html;
    this.isCaption = true;
  }
}

class YTVideo {
  constructor(id, title, time, extra) {
    this.id    = id;
    this.time  = time;
    this.timeSecs = HHMMSS2Secs(time);
    extra && (this.extra = extra);

    this.title = title;
    this.titleLen = title.length;
    var idx = title.indexOf('★'); // summary at the end?
    if (idx > 0) this.titleLen = idx+1;
  }
  getTitleDisp() {
    var idx = this.title.indexOf('★'); // summary at the end?
    if (idx <= 0) return this.title;
    this.titleLen = idx+1;
    var x = this.title.substring(idx+1).trim();
    x = x ? ` title="${x}" style="color:blue"` : ` title="精要總結"`;
    return this.title.substring(0,idx) + ` <span ${x}>★</span>`;
  }
}

class YTList {
  constructor(name, id) { 
    this.id = id;
    this.name = name;
    this.videos = [];
    this.totalDur = 0;
  }
  setReferences() { this.references = arguments; return this; }
  set(k,v) { k && v && (this[k] = v); return this; }
  lastVideo() { return this.videos[this.videos.length-1]; }
  getVideoIndex(id) {
    for (var i=0; i<this.videos.length; ++i)
      if (this.videos[i].id == id) return i+1;
    return -1;
  }
  allViewed() {
    for (var i=0; i<this.videos.length; ++i) {
      var v = this.videos[i];
      if (!v.viewed && !YTViewing[v.id]) return false;
    }
    return true;
  }
  getViewedDur() {
    var alldur = 0;
    for (var i=0; i<this.videos.length; ++i) {
      var v = this.videos[i];
      if (v.viewed || YTViewing[v.id]) alldur += v.timeSecs;
    }
    return alldur;
  }
  percentEmoji(h, w) {
    var alldur = this.getViewedDur();
    alldur /= this.totalDur;
    return (alldur >= 0.999) ? '<small>✓</small>' : (alldur < 0.01 ? '' : percentEmoji(alldur, h, w));
  }
  addCaption(html) { this.videos.push(new Caption(html)); return this; }
  add(time, id, title, extra) {
    if (!extra && this.references) {
      for (var i in this.references) {
        var r = this.references[i];
        var idx = r.getVideoIndex(id);
        if (idx > 0) { extra = `= ${r.name}&nbsp;[${idx}]`; break; }
      }
    }

    this.videos.push(new YTVideo(id, title, time, extra));
    this.totalDur += this.lastVideo().timeSecs;
    return this;
  }
  lastAdded() { return this.videos[this.videos.length-1]; }
  render(buf) {
    buf.w('<h3 style="margin-bottom:5px">')
    var a = this.name.split('|'), more = '';
    var name = a[0], knownDur = 0, len = this.videos.filter(v => v.time).length, num = 1;
    if (a.length > 1) more = ` <i style="opacity:0.4">${a[1]}</i>`;
    buf.wIfElse(this.id, // if null, just a collection of videos
                `<a href="${ytListURL(this.id)}" target="extnl">${name}</a>${more}（${len}個節目）`,
                `${name}${more}（${this.videos.length}個節目）`)
       .w('</h3><table border=0 bgcolor="white" style="margin-left:20px">');
    for (var i=0; i<this.videos.length; ++i) {
      var v = this.videos[i];
      if (v.isCaption) { buf.w(`<tr><td colspan=3>${v.html}</td></tr>`); continue; }
      var viewed = v.viewed || YTViewing[v.id] || '';
      if (viewed) knownDur += v.timeSecs;
      var ttl = v.getTitleDisp(), idx = (v.titleLen <= 55) ? -1 : ttl.indexOf('|');
      if (idx > 0) ttl = ttl.substring(0,idx) + '<br>' + ttl.substring(idx);
      buf.w(`<tr><td valign=top align=right>${num++}.&nbsp;</td>`,
            `<td valign=top nowrap valign=center style="font-size:8px; padding-top:5px"${viewed?' class=viewed':''} title="${viewed}">`,
            `<code><a href="${ytVideoURL(v.id)}" target="extnl">${v.id}</a></code></td>`,
            `<td valign=top align=right><code>${v.time}</code>&nbsp;</td>`);
      this.renderVideoTextTD(buf, v);
      buf.w('</tr>');
    }
    if (knownDur == this.totalDur) knownDur = '　✓';
    else knownDur = !knownDur ? '' : `&nbsp;(<font class=viewed>${formatTime(knownDur)}）`;
    buf.w('<tr><td></td><td colspan=2 align=right style="border-top:1px solid gray">總時長：&nbsp;<code>',
          formatTime(this.totalDur), '</code></td><td style="border-top:1px solid gray"><code>',
          knownDur, '</code></td></tr></table>');
    return buf;
  }
  renderVideoTextTD(buf, vidInfo) {
    var v = vidInfo, ttl = v.getTitleDisp(), idx = (v.titleLen <= 55) ? -1 : ttl.indexOf('|');
    if (idx > 0) ttl = ttl.substring(0,idx) + '<br>' + ttl.substring(idx);
    buf.w(`<td style="padding-left:10px" nowrap>${ttl}`)
       .wIf(v.extra, `<br><span style="opacity:0.5">${v.extra}</span>`)
       .w('</td>');
  }
}

