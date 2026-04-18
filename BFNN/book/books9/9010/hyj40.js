var HY40SECTIONS = `
sk01 | 入逝多林給孤獨園大莊嚴重閣 |  1 | 60
sk02 | 聲聞衆不見佛菩薩境界       |  2 | 60
sk03 | 逝多林菩薩衆會得見一切境界 |  3 | 61
sk04 | 文殊菩薩弘法福生城         |  4 | 61
`;

class HYJContainer extends SeriesContainer {
  constructor(isHY40) {
    super();
    this.isHY40 = isHY40;
    if (isHY40) this.use五十三參();
  }
  use五十三參() { if (!this.hy40Sections) return this.parseSections(); }
  parseSections(txt) {
    this.hy40Sections = {};
    var a = HY40SECTIONS.split('\n');
    for (var i in a) {
      var x = a[i].trim();
      if (x) { x = new HY40Anchor(x); this.hy40Sections[x.id] = x; }
    }
    return this;
  }
  sectionW(id) {
    var s = this.hy40Sections[id];
    return s ? `/SECTION:${id}/【${s.text}】` : `/SECTION/〖${id}〗`;
  }
  toLink40(id) { var s = this.hy40Sections[id]; return s && s.toLink40() || ''; }
  toLink80(id) { var s = this.hy40Sections[id]; return s && s.toLink80() || ''; }
  getLabel(id) { var s = this.hy40Sections[id]; return s && s.text || id; }
}

class HY40Anchor {
  constructor (ln) {
    var a = ln.split('\|');
    if (a.length < 4) throw `HY40Section parsing ERROR: [${ln}]`;
    this.id   = a[0].trim();
    this.text = a[1].trim();
    this.volInHY40 = parseInt(a[2].trim());
    this.volInHY80 = parseInt(a[3].trim());
  }
  toLink40(curVol) {
    return (curVol == this.volInHY40)
           ? `<a href="javascript:showTop('${this.id}')">${this.text}</a>`
           : `<a href="?vol=${this.volInHY40}&pin=${this.id}">${this.text}</a>`;
  }
  toLink80(curVol) {
    return (curVol == this.volInHY80)
           ? `<a href="javascript:showTop('${this.id}')">${this.text}</a>`
           : `<a href="?vol=${this.volInHY80}&pin=${this.id}">${this.text}</a>`;
  }
}

function section40(id) { return SC.sectionW(id); }
function link40(id)    { return SC.toLink40(id); }
function link80(id)    { return SC.toLink80(id); }
function hylabel(id)   { return SC.getLabel(id);  }

