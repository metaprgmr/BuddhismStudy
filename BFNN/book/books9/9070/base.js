class PersonDesc {
  constructor(volnum, id, type, src) {
    this.volNum = volnum;
    this.id = id;
    this.type = type;
    var idx = src.indexOf('//');
    if (idx >= 0) src = src.substring(0,idx).trim();
    var a = src.split('\|');
    if (a.length != 2) throw `PersonDesc(): ${src}`;
    this.where = a[0].trim();
    a = a[1].trim().split('；');
    this.name = a[0];
    if (a.length > 1) this.others = a[1].split('•');
  }
  toHtml() {
    var others = this.others && `<ail>（${this.others.join('、')}）</ail>` || '';
    return `<a href="?vol=${this.volNum}&pin=${this.id}" title="${this.where}">${this.name}</a>${others}`;
  }
}

class VolList {
  constructor(volNum, type, src) { // can have type/src pairs hereafter
    this.volNum = volNum;
    this.typeNum = 1;
    this.type = type; // can have this.type2, ...
    this.items = [];  // can have this.items2, ...

    try {
      var i, part = arguments[3] && 'a' || '', a = (src||'').trim().split('\n');
      for (i=0; i<a.length; ++i)
        this.items.push(new PersonDesc(volNum, `${part}_${i+1}`, type, a[i]));

      for (i=3; i<arguments.length-1; i+=2) {
        this.typeNum++;
        part = 'bcdefg'[i-3];
        type = arguments[i];
        a    = arguments[i+1].trim().split('\n');
        var items = [];
        this[`items${(i+1)/2}`] = items;
        this[`type${(i+1)/2}`]  = type;
        for (var j=0; j<a.length; ++j)
          items.push(new PersonDesc(volNum, `${part}_${j+1}`, type, a[j]));
      }
    } catch(e) { alert(e); }
  }

  lastType() {
    if (this.typeNum > 1) return this[`type${this.typeNum}`];
    return this.type;
  }

  getPersonIndex() {
    var ret = {}, pd;
    for (var i in this.items) { pd = this.items[i]; ret[pd.id] = pd; }
    for (var i=0; i<this.typeNum; ++i) {
      var lst = this[`items${i+2}`];
      for (var j in lst) { pd = lst[j]; ret[pd.id] = pd; }
    }
    return ret;
  }

  writeTRs(buf, lastType) {
    function writeItems(items) {
      buf.w(`<td nowrap valign=top align=right><ail>${items.length}人</ail>&nbsp;</td><td>`);
      for (var i=0; i<items.length; ++i) buf.w(items[i].toHtml(), '　');
      buf.w('</td></tr>');
    }

    var i, zvol = zNumber(this.volNum), type = this.type;
    buf.w(`<tr><td nowrap valign=top><a href="?vol=${this.volNum}">卷${zvol}</a></td>`);
    if (type.startsWith('雜科') && type.length > 2) type = '雜科<br>' + type.substring(2);
    buf.w(`<td nowrap valign=top>${this.type == lastType ? '' : type}</td><td>`);
    writeItems(this.items);
    if (this.typeNum <= 1) return;
    for (i=1; i<this.typeNum; ++i) {
      buf.w(`<tr><td>&nbsp;</td><td valign=top>${this[`type${i+1}`]}</td><td>`);
      writeItems(this[`items${i+1}`]);
    }
  }
}

class BiographyBook {
  constructor(title, info) {
    this.title = title;
    this.info = info;
    this.volumes = [];
    this.volIndex = {};
  }

  addVol(volList) {
    this.volIndex[volList.volNum] = volList;
    this.volumes.push(volList);
    return this;
  }

  toTRs() {
    var buf = new Buffer();
    for (var i=0; i<this.volumes.length; ++i)
      this.volumes[i].writeTRs(buf, (i==0) ? null : this.volumes[i-1].lastType());
    return buf.render();
  }

  processPersons(volNum, txt) {
    var vol = this.volIndex[volNum];
    if (!vol) return txt;
    var pidx = vol.getPersonIndex(), a = txt.split('\n'), buf = new Buffer();
    for (var i in a) {
      var ln = a[i];
      if (ln.startsWith(':::')) {
        var id = ln.substring(3).trim(), pd = pidx[id];
        if (pd) {
          var num = zNumber(id.substring(id.indexOf('_')+1)),
              others = pd.others && `<ail>（${pd.others.join('、')}）</ail>` || '';
          ln = `/SECTION:${id}/${pd.where||''}<famous>${pd.name}</famous>${num}${others}\n`;
        }
      }
      buf.w(ln, '\n');
    }
    return buf.render();
  }

} // end of BiographyBook.

class BioContainer extends SeriesContainer {
  constructor(pageNum, volCnt, ABCD, title, author, bookGetter) {
    super();
    this.pageNum = pageNum;
    this.volCnt = volCnt;
    this.series = ABCD;
    this.title = title;
    this.author = author;
    this.bookGetter = bookGetter;
    var a = [
      (ABCD == 'A') ? '<cur>梁高僧傳</cur>' : '<a href="9070.htm">梁高僧傳</a>',
      (ABCD == 'B') ? '<cur>唐高僧傳</cur>' : '<a href="9071.htm">唐高僧傳</a>',
      (ABCD == 'C') ? '<cur>宋高僧傳</cur>' : '<a href="9072.htm">宋高僧傳</a>',
      (ABCD == 'D') ? '<cur>明高僧傳</cur>' : '<a href="9073.htm">明高僧傳</a>',
    ];
    this.finalLinks = '《' + a.join('》　《') + '》';
  }

  loadJS(vol) { addjs(`9070/${this.series}${to2d(vol||0)}.js`); }

  showPage() {
    var buf = new Buffer(), me = this;
    new (class extends DocInfo {
      constructor() {
        super();
        this.setVolumesInJS(true, true).setBuffer(buf).setXG().reInit(me.pageNum, me.volCnt);
        this.volNum = me.volNum;
        this.finalLinks = me.finalLinks;
        if (!me.volNum)
          this.writeStart(me.title)
              .writeBody(`\n/TEXT030C/${me.author}\n${me.text}\n/VOLSEP/`, true);
        else {
          var zvol = zNumber(me.volNum), book = me.bookGetter(), ttl = me.volTitle;
          ttl = ttl && `${ttl}` || '';
          var body = me.noLeadingAuthor ? '' : `/TEXT030C/${me.author}\n`;
          body += book.processPersons(this.volNum, me.text);
          if (!me.noEnding)
            body += `/TEXT339R/${me.title}卷${zvol}`;

          this.writeStart(`${me.title}|（卷${zvol}）${ttl}`)
              .writeBody(`${body}\n/VOLSEP/`, true);
        }
      }
    })(); // class extends DocInfo
    buf.render('stg');
  }

} // End of BioContainer.
