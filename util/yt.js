const ytListURL  = (id) => `https://www.youtube.com/playlist?list=${id}`;
const ytVideoURL = (id) => `https://www.youtube.com/watch?v=${id}`;

var YTViewing = {};

class YTCollection {
  constructor(title) { this.title = title; this.lists = []; }
  add() { for (var i in arguments) this.lists.push(arguments[i]); return this; }
  setTOCNoNumber(yes) { this.tocNoNumber = yes; return this; }
  renderTOC(fxnName, buf) {
    if (!buf) buf = new Buffer();
    buf.w('<center><hr color="lightgray"><table style="margin-left:20px" border=0>',
          `<h2>${this.title}</h2>`);
    var totalD = 0;
    for (var i=0; i<this.lists.length; ++i) {
      var lst = this.lists[i];
      totalD += lst.totalDur;
      buf.w(`<tr><td>${this.tocNoNumber?'':(i+1)}&nbsp;</td>`,
//          `<td><b><a href="javascript:showTop('_${i}')">${lst.name}</a></b>`,
            `<td><b><a href="javascript:${fxnName}(${i})">${lst.name}</a></b>`,
            '&nbsp;&nbsp;&nbsp;</td>',
            `<td align="right"><code>${formatTime(lst.totalDur)}</code></td>`,
            `<td align="right">&nbsp;&nbsp;&nbsp;${lst.videos.length}</td><td>集</td></tr>`);
    }
    buf.w('<tr><td colspan="2">&nbsp;</td>',
          `<td align="right" style="border-top:1px solid black"><code>${formatTime(totalD)}</code></td>`,
          '<td colspan="2">&nbsp;</td></tr></table><hr color="lightgray"></center>');
    return buf;
  }

  renderList(i, buf) { return this.lists[i].render(buf || new Buffer()); }

  renderAll(buf) {
    if (!buf) buf = new Buffer();
    for (var i=0; i<this.lists.length; ++i)
      this.renderList(i, buf);
    return buf;
  }
}

class YTList {
  constructor(name, id) { 
    this.id = id;
    this.name = name;
    this.videos = [];
    this.totalDur = 0;
  }
  set(k,v) { k && v && (this[k] = v); return this; }
  add(time, id, title, extra) {
    this.videos.push({id, title, time, extra});
    { var a = time.split(':').reverse();
      this.totalDur += parseInt(a[0]);
      if (a[1]) this.totalDur += parseInt(a[1]) * 60;
      if (a[2]) this.totalDur += parseInt(a[2]) * 3600;
    }
    return this;
  }
  render(buf) {
    buf.w('<h3 style="margin-bottom:5px">')
    buf.wIfElse(this.id, // if null, just a collection of videos
                `<a href="${ytListURL(this.id)}" target="extnl">${this.name}</a>【${this.videos.length}個節目】`,
                `${this.name||''}【${this.videos.length}個節目】`)
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
    buf.w(`<tr><td></td><td colspan=2 align=right style="border-top:1px solid gray">總時長：<code>${formatTime(this.totalDur)}</code></td></tr></table>`);
    return buf;
  }
}

