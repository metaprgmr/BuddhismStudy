const ytListURL  = (id) => `https://www.youtube.com/playlist?list=${id}`;
const ytVideoURL = (id) => `https://www.youtube.com/watch?v=${id}`;

var YTViewing = {};

class YTCollection {
  constructor(title) { this.title=title; this.lists=[]; }
  add() { for (var i in arguments) this.lists.push(arguments[i]); return this; }
  setTOCNoNumber(yes) { this.tocNoNumber = yes; return this; }
  renderTOC(fxnName, buf) {
    if (!buf) buf = new Buffer();
    buf.w('<center><hr color="lightgray"><table style="margin-left:20px" border=0>',
          `<h2>${this.title}</h2>`);
    var totalD = 0, len = this.lists.length;
    for (var i=0; i<len; ++i) {
      var lst = this.lists[i];
      buf.w(`<tr><td align=right>${this.tocNoNumber?'':((i+1)+'.')}&nbsp;</td>`);
      if (Array.isArray(lst) && lst.length > 1) { // a simple link
        if (lst[1].startsWith('link='))
          buf.w(`<td colspan=3><a href="${lst[1].substring(5)}">${lst[0]}</a></td></tr>`);
        else
          buf.w(`<td colspan=3><a href="javascript:${fxnName}(${i})">${lst[0]}</a></b></td></tr>`);
      } else {
        totalD += lst.totalDur;
        var a = lst.name.split('|'), more = '';
        if (a.length > 1) more = ` <i style="opacity:0.4; font-size:14px">${a[1]}</i>`;
        buf.w(`<td><b><a href="javascript:${fxnName}(${i})">${a[0]}</a>${more}</b>`,
              '&nbsp;&nbsp;&nbsp;</td>',
              `<td align="right"><code>${formatTime(lst.totalDur)}</code></td>`,
              `<td align="right">&nbsp;&nbsp;&nbsp;${lst.videos.length}</td><td>集</td></tr>`);
      }
    }
    buf.w('<tr><td colspan="2">&nbsp;</td>',
          `<td align="right" style="border-top:1px solid black"><code>${formatTime(totalD)}</code></td>`,
          '<td colspan="2">&nbsp;</td></tr></table><hr color="lightgray"></center>');
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

class YTVideo {
  constructor(id, title, time, extra) {
    this.id    = id;
    this.title = title;
    this.time  = time;
    this.timeSecs = HHMMSS2Secs(time);
    extra && (this.extra = extra);
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
  render(buf) {
    buf.w('<h3 style="margin-bottom:5px">')
    var a = this.name.split('|'), more = '';
    var name = a[0];
    if (a.length > 1) more = ` <i style="opacity:0.4">${a[1]}</i>`;
    buf.wIfElse(this.id, // if null, just a collection of videos
                `<a href="${ytListURL(this.id)}" target="extnl">${name}</a>${more}【${this.videos.length}個節目】`,
                `${name}${more}【${this.videos.length}個節目】`)
       .w('</h3><table bgcolor="white" style="margin-left:20px">');
    for (var i=0; i<this.videos.length; ++i) {
      var v = this.videos[i], viewed = YTViewing[v.id];
      buf.w(`<tr><td valign=top align=right>${i+1}.&nbsp;</td>`,
            `<td valign=top nowrap style="padding-top:5px"${viewed?' class=viewed':''}>`,
            `<code><a href="${ytVideoURL(v.id)}" target="extnl">${v.id}</a></code></td>`,
            `<td valign=top align=right>&nbsp;<code>${v.time}</code></td>`,
            `<td style="padding-left:10px" nowrap>${v.title}`)
         .wIf(v.extra, `<br><span style="opacity:0.5">${v.extra}</span>`)
         .w('</td></tr>');
    }
    buf.w('<tr><td></td><td colspan=2 align=right style="border-top:1px solid gray">總時長：&nbsp;<code>',
          formatTime(this.totalDur), '</code></td></tr></table>');
    return buf;
  }
}

