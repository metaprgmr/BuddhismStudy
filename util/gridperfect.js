var showPriv = get('all');

const AIL    = '.ail  { font-size:12px; opacity:0.8 }' +
               '.ailb { font-size:14px; opacity:0.8; stroke:brown }' +
               '.ailb1{ font-size:14px; opacity:0.8; stroke:green }' +
               '.ailb2{ font-size:14px; opacity:0.8; stroke:red }' +
               '.ailb3{ font-size:14px; opacity:0.8; stroke:blue }' +
               '.ailteal{ font-size:14px; opacity:0.8; stroke:teal }' +
               '.ail339 { font-size:14px; opacity:0.8; stroke:#333399 }' +
               '.ailinv { font-size:14px; opacity:0.0 }' +
               '.cil { font-size:14px; opacity:0.8 }';
const BOLD   = '.b { stroke:brown }' +
               '.b1{ stroke:green }' +
               '.b2{ stroke:red }' +
               '.b3{ stroke:blue }' +
               '.hl{ fill:red }' +
               '.inv { opacity:0 }' +
               '.h1  { font-size:28px; stroke:brown; font-weight:bold }' +
               '.h2  { font-size:20px; stroke:brown; font-weight:bold }' +
               '.h3  { font-size:16px; stroke:brown; font-weight:bold }' +
               '.mantra{ stroke:teal }' +
               '.kp    { stroke:#333399 }' +
               '.kp0   { stroke:teal }' +
               '.c339  { stroke:#333399 }' +
               '.black { stroke:black }' +
               '.white { stroke:white }' +
               '.red   { stroke:red }' +
               '.blue  { stroke:blue }' +
               '.green { stroke:green }' +
               '.gray  { stroke:gray }' +
               '.teal  { stroke:teal }' +
               '.brown { stroke:brown }' +
               '.yellow { stroke:yellow }' +
               '.pink   { stroke:pink }' +
               '.violet { stroke:violet }' +
               '.darkblue   { stroke:darkblue }' +
               '.darkgreen  { stroke:darkgreen }' +
               '.lightgreen { stroke:lightgreen }' +
               '.lightgray  { stroke:lightgray }' +
               '.href  { cursor:pointer; text-decoration:underline; stroke:blue; }' +
               '.see   { cursor:pointer; text-decoration:underline }' +
               '.see-b { cursor:pointer; text-decoration:underline; stroke:brown }' +
               '.see-b1{ cursor:pointer; text-decoration:underline; stroke:green }' +
               '.see-b2{ cursor:pointer; text-decoration:underline; stroke:red }' +
               '.see-b3{ cursor:pointer; text-decoration:underline; stroke:blue }' +
               '.see-hl{ cursor:pointer; text-decoration:underline; stroke:red }' +
               '.see-mantra{ cursor:pointer; text-decoration:underline; stroke:teal }' +
               '.see-c339  { cursor:pointer; text-decoration:underline; stroke:#333399 }' +
               '';
const CAT_基本 = '佛法基礎';
const CAT_唯識 = '唯識論';
const CAT_大乘 = '大乘佛法';
const CAT_小乘 = '小乘佛法';
const CAT_戒律 = '戒律';
const CAT_經論 = '經論';
const CAT_甘師 = '甘台榮師';
const CAT_外道 = '宗教外道';
const CAT_中華 = '中華文化';
const CAT_ELSE = 'ELSE';
const CAT_NONE = '　';
const catNames = [CAT_基本,CAT_唯識,CAT_大乘,CAT_小乘,CAT_戒律,CAT_經論,CAT_甘師,CAT_中華,CAT_外道,CAT_ELSE,CAT_NONE];

const LINE='LINE', TEXT='TEXT', RECT='rect', OVAL='ellipse', POINTER='PTR',
      INCL='INCL';
const DEFAULTTEXTCOLOR = 'defaultTextColor';
const DEFAULTLINECOLOR = 'defaultLineColor';
const SPLIT = '〰';

// Named points (marks) are useful to abstract out diagrams.
// They can be defined programmatically, which always works.
// They can also be declared in the diagram itself;
//   currently it works for lines but not text, as the
//   marks will collide with text.

class GPInstBase {
  constructor(type, gp, extra) { this.act = type; this.gridPerf = gp; this.extra = extra; this.order = 0; }
  set(key,val) { this[key] = val; return this; }
  setBefore() { this.order = -1; }
  setAfter()  { this.order =  1; }
  setFillStroke(f, s) { // for shapes
    s = (s || f).split('\|');
    this.set('fill', f).set('stroke', s[0]);
    if (s[1]) return this.set('strokeWidth', s[1]);
    return this;
  }
  toFillStrokeAttrs() { // for shapes
    return ` fill="${this.fill||'white'}" stroke="${this.stroke||'white'}" stroke-width="${this.strokeWidth||1}"`;
  }
  render(buf, shiftX, shiftY) { throw `GPInstBase[${this.act}].render() is not implemented.`; }
}

class GPIncludeInst extends GPInstBase {
  constructor(gp, diagram, x, y, ignoreStyle) {
    super(INCL, gp);
    this.diagram = diagram;
    this.x = x;
    this.y = y;
    this.ignoreStyle = ignoreStyle;
  }
  render(buf, shiftX, shiftY) {
    console.log(`INFO: including [${this.diagram.name||''}] at (${this.x}, ${this.y}).`);
  }
}

class GPLineInst extends GPInstBase {
  constructor(gp, from, to, extra) {
    super(LINE, gp, extra);
    this.from = from;
    this.to = to;
  }
  render(buf, shiftX, shiftY) {
    if (!this.isExec) return this.translateDirectives().render(buf, shiftX, shiftY);
    var gp = this.gridPerf,
        gw = gp.gridW, gh = gp.gridH, shft = gp.getShifting(this.from[0], this.from[1]),
        extra = this.extra || '',
        dx = shft && shft[0] || 0,
        dy = shft && shft[1] || 0,
        x = (shiftX + dx + this.from[0]) * gw + gh/2,
        y = (shiftY + dy + this.from[1]) * gh;
    if (!extra)
      extra = `stroke="${gp.defaultLineColor || 'black'}" stroke-width="1px"`;
    if (!this.to[2]) { // absolute; check its own shifting
      shft = gp.getShifting(this.to[0], this.to[1]);
      dx = shft && shft[0] || 0;
      dy = shft && shft[1] || 0;
    } // otherwise, it is relative, just shift with from
    var x2 = (shiftX + dx + this.to[0]) * gw + gh/2,
        y2 = (shiftY + dy + this.to[1]) * gh;
    buf.w(`<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" ${extra}/>`);
  }
  translateDirectives() { // turn textual from/to into xy's
    var gp = this.gridPerf, xy, ret = shallowClone(this); // don't change own values
    ret.isExec = true;
    if (typeof ret.from == 'string') { // otherwise, should be [x,y]
      xy = gp.marks[ret.from];
      if (!xy) throw `From-point not found: ${ret.from}`;
      ret.from = xy;
    }
    if (typeof ret.to == 'string') { // otherwise, should be [x,y]
      if (ret.to.startsWith('%')) {
        var delta = parseFloat(ret.to.substring(2));
        xy = [ret.from[0], ret.from[1]];
        switch(ret.to[1]) {
        case 'r': xy[0] += delta; xy[2] = true; break;
        case 'l': xy[0] -= delta; xy[2] = true; break;
        case 'd': xy[1] += delta; xy[2] = true; break;
        case 'u': xy[1] -= delta; xy[2] = true; break;
        }
      } else {
        xy = gp.marks[ret.to];
        if (!xy) throw `To-point not found: ${ret.to}`;
      }
      ret.to = xy;
    }
    return ret;
  }
}

class GPLineMeta extends GPLineInst {
  constructor(gp, type, value) {
    super(gp);
    this.meta = type;
    this.value = value;
  }
  render(buf, shiftX, shiftY) {
    if (this.meta == DEFAULTLINECOLOR)
      this.gridPerf.defaultLineColor = this.value;
  }
}

class GPRightEdgeInst extends GPLineInst {
  constructor(gp, color) { super(gp); this.color = color; this.isRightEdge = true; }
  render(buf, shiftX, shiftY) {
    var gp = this.gridPerf;
    this.from  = [gp.width+0.25, 0];
    this.to    = [gp.width+0.25, gp.height+1];
    this.extra = ` style="stroke:${this.color||'lightgray'};stroke-width:1px"`;
    super.render(buf, shiftX, shiftY);
  }
}

class GPPointerInst extends GPInstBase {
  constructor(gp, from, to, extra) {
    super(POINTER, gp, extra);
    this.from = from;
    this.to = to;
  }
}

class GPRectInst extends GPInstBase {
  // Legitimate attributes: fill, stroke
  constructor(gp, x, y, width, height, extra) {
    super(RECT, gp, extra);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  setRoundCorner(rx, ry) { this.rx = rx, this.ry = ry || rx; }
  render(buf, shiftX, shiftY) {
    var gp = this.gridPerf,
        gw = gp.gridW, gh = gp.gridH, shft = gp.getShifting(this.x, this.y),
        dx = shft && shft[0] || 0,
        dy = shft && shft[1] || 0,
        x = (shiftX + dx + this.x) * gw - gw/2,
        y = (shiftY + dy + this.y) * gh,
        rx = (this.rx || 0) * gw,
        ry = (this.ry || 0) * gh,
        extra = this.extra || this.toFillStrokeAttrs();
    buf.w(`<rect x="${x}" y="${y}" rx="${rx}" ry="${ry}" width="${this.width*gw}" height="${this.height*gh}" ${extra}/>`);
  }
}

class GPOvalInst extends GPInstBase {
  constructor(gp, x, y, rx, ry, extra) {
    super(OVAL, gp, extra);
    this.x = x;
    this.y = y;
    this.rx = rx;
    this.ry = ry;
  }
  render(buf, shiftX, shiftY) {
    var gp = this.gridPerf,
        gw = gp.gridW, gh = gp.gridH, shft = gp.getShifting(this.x, this.y),
        dx = shft && shft[0] || 0,
        dy = shft && shft[1] || 0,
        x = (shiftX + dx + this.x) * gw - gw/2,
        y = (shiftY + dy + this.y) * gh,
        rx = this.rx * gw,
        ry = this.ry * gh,
        extra = this.extra || this.toFillStrokeAttrs();
    buf.w(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${extra}/>`);
  }
}

class GPTextInst extends GPInstBase {
  constructor(gp, x, y, txt, extra) {
    super(TEXT, gp, extra);
    this.x = x;
    this.y = y;
    this.text = txt || '';
  }
  append(x) { this.text += x; return this; }
  wrapTextInClass(cls) {
    //this.text = `<tspan class="${cls}">${this.text}</tspan>`;
    this.wrapCls = cls;
    return this;
  }
  setVertical() { this.isVertical = true; return this; }
  setText(txt, extra) { this.text = txt; if (extra) this.extra = extra; }
  realLen() { this._procText(); return this._realLen; }
  _procText() { // turn 「/ail|你好/」 into 「<tspan class="ail">你好</tspan>」
    if (this.tokens) return; // done already
    var s = this.text;
    this._realLen = 0;
    if ((s.indexOf('</')>=0) || (s.indexOf('/>')>=0)) {
      this._realLen = textRealLen(s.replace(/<[^>]*>/g,''));
      this.tokens = [s]; // don't handle those with </tag> and <tag/>; leave as-is
      return;
    }
    var idx=s.indexOf('/');
    if (idx < 0) {
      this._realLen = s.replace(/<[^>]*>/g,'').length;
      this.tokens = [s];
      return;
    }
    var ret='', idx1=0;
    this.tokens = [];
    while (true) {
      // -- use the following loop to handle ""
      for (idx1=idx+1; idx1 < s.length; ++idx1) {
        var c = s[idx1];
        if (c == '"') { // skip the emclosed text
          for (++idx1; idx1 < s.length && (s[idx1] != '"'); ++idx1);
        }
        if (c == '/') break;
      }
      if (idx1 <= idx+1) { ret += s; break; }
      this.tokens.push(s.substring(0, idx));
      this._realLen = idx;
      var a = s.substring(idx+1,idx1).split('|'),
          first = a[0], txt = a[1].replaceAll('〰','　'), idx2 = first.indexOf(':'),
          tscls = first, tsextra = '';
      if (idx2 > 0) {
        var type = first.substring(0,idx2).trim(), tip = null;
        first = first.substring(idx2+1).trim();
        if (first[0] == '"' && first.endsWith('"'))
          first = first.substring(1, first.length-1);
        if (type == 'tip' || type == 'tooltip') { // tooltip
          tip = first;
        } else if (type.startsWith('see')) { // popup
          if (!gpRepo.canPopup()) {
            tscls = '';
            console.log('Cannot popup. ' + first);
          } else {
            tsextra = ` onclick="gpRepo.showDialog('${this.gridPerf.name}', '${first || txt}')"`;
            tscls = type;
          }
        } else if (type.startsWith('href')) { // external link
          // e.g. /href:https://www.yahoo.com/  -- open in this window
          //      /href@extra:https://www.yahoo.com/ -- open in window "extra"
          //      /href:=達摩/ -- open in this window, if linkMap['達摩'] is set.
          var lm = this.gridPerf.linkMap,
              a = type.split('@'),
              tgt = (a.length > 1) ? a[1] : '_self';
          if (first[0] == '=')
            first = lm && lm[first.substring(1)] || null;
          if (first) {
            tsextra = ` onclick="window.open('${first}', '${tgt}')"`;
            tscls = type;
          }
        } else {
          tsextra = ` title="Don't know what to do for [${type}:${first}|${txt}]"`;
          tscls = type;
          console.log(msg);
        }
      }
      this.tokens.push([txt, `<tspan class="${tscls}"${tsextra}>`, tip]);
      this._realLen += txt.length;
      s = s.substring(idx1+1);
      idx = s.indexOf('/');
      if (idx < 0) {
        this.tokens.push(s);
        this._realLen += s.length;
        break;
      }
    }
  }

  render(buf, shiftX, shiftY) {
    this._procText();
    var gp = this.gridPerf,
        gw = gp.gridW, gh = gp.gridH, shft = gp.getShifting(this.x, this.y),
        dx = shft && shft[0] || 0,
        dy = shft && shft[1] || 0,
        x = (shiftX + dx + this.x) * gw,
        y = (shiftY + dy + this.y) * gh + gh/4,
        extra = this.extra || '', tip;
    if (!extra && gp.defaultTextColor)
      extra = `stroke="${gp.defaultTextColor}"`;
    if (!this.isVertical) {
      buf.w(`<text x="${x}" y="${y}" ${extra}>`)
         .wIf(this.wrapCls, `<tspan class="${this.wrapCls}">`);
      for (var i in this.tokens) {
        var t = this.tokens[i];
        if (typeof t == 'string') buf.w(t);
        else {
          if (t[2]) // tooltip
            tip = `<title>${t[2]}</title>`;
          buf.w(t[1], tip||'', t[0], '</tspan>');
        }
      }
      buf.wIf(this.wrapCls, '</tspan>')
         .w('</text>');
    } else { // vertical
      for (var i in this.tokens) {
        var t = this.tokens[i], tspan = '', _tspan = '';
        tip = null;
        if (typeof t != 'string') {
          tspan = t[1];
          _tspan = '</tspan>';
          tip = `<title>${t[2]}</title>`;
          t = t[0];
        }
        if (this.wrapCls) {
          tspan = `<tspan class="${this.wrapCls}">${tspan}`;
          _tspan += '</tspan>';
        }
        for (var k=0; k<t.length; ++k) {
          buf.w(`<text x="${x}" y="${y}" ${extra}>`, tspan, tip||'', t[k], _tspan, '</text>');
          y += gh;
        }
      }
    }
  }

} // end of GPTextInst.

class GPTextMeta extends GPTextInst {
  constructor(gp, type, value) {
    super(gp);
    this.meta = type;
    this.value = value;
  }
  render(buf, shiftX, shiftY) {
    if (this.meta == DEFAULTTEXTCOLOR)
      this.gridPerf.defaultTextColor = this.value;
  }
}

function textRealLen(s) { // counting the displayed char's
  var idx = s.indexOf('/');
  while (idx >= 0) {
    var idx1 = s.indexOf('/', idx+2);
    if (idx1 < 0) break;
    var sub = s.substring(idx+1, idx1), end = s.substring(idx1+1);
    s = s.substring(0, idx);
    idx1 = sub.indexOf('|');
    if (idx1 > 0) sub = sub.substring(idx1+1);
    s += sub + end;
    idx = s.indexOf('/');
  }
  return s.length;
}

class GridPerfect {
  constructor() {
    this.program = null; // this indicates to call this.setup(this).
    this.gridW = 16;
    this.gridH = 22;
    this.fontSize = this.gridW;
    this.bgColor = undefined;
    this.markNames = '';
    this.styleBlock = null;
    this.shiftings = {}; // x_y => [dx,dy]; only apply to starting points
    this.layout = []; // dummy
    this.width  = 0;
    this.height = 0;
    this.shiftX = 0;
    this.shiftY = 0;
    this.namedTexts = null;
    this.dialogId = null;
    this.SPs = '　〇─│┌┐└┘┼┬┴├┤';

//  Set in _initLayout():
//  this.marks     = {}; // name => [x,y]; for runtime
//  this.xyToMarks = {}; // x_y => name; for layout design view

    for (var i in arguments) {
      var a = arguments[i];
      if (a == null) continue;
      switch (typeof a) {
      case 'object': Object.assign(this, a); break;
      case 'function': this.setup = a; break; // (gp) => {}
      default: console.log(`In GP[${this.name||''}], ignored unknown init param: [${a}]. Expecting a function and/or an object.`);
      }
    }
  }

  setNotGPSP(s) {
    for (var i=s.length-1; i>=0; --i)
      this.SPs = this.SPs.replaceAll(s[i], '');
    return this;
  }
  isGPSP(x) { // GP = GridPerfect, SP = space
    return x && (this.SPs.indexOf(x) >= 0);
  }
  setWidth(w) { this.width = w; return this; }
  setHeight(h) { this.height = h; return this; }
  getNamedText(id) { return this.namedTexts && this.namedTexts[id]; }
  setNamedText(id,txt) {
    if (id) {
      if (!this.namedTexts) this.namedTexts = {};
      this.namedTexts[id] = txt;
    }
    return this;
  }
  setSutraText(id,txt) {
    if (!id || !txt) return this;
    var a = txt.split('\n'), b = [];
    for (var i in a) {
      var ln = a[i];
      if (ln.startsWith('kp='))
        ln = `<kp>${ln.substring(3).replaceAll(':','：')}</kp>`;
      b.push(ln);
    }
    return this.setNamedText(id, b.join('<br>'));
  }

  clone() {
    this.checkProgram();
    var prgm = []; // deep copy
    for (var i in this.program) {
      var o = this.program[i], c = shallowClone(o);
      if (c.act == INCL) c.diagram = o.diagram.clone();
      prgm.push(c);
    }
    return new GridPerfect({
      gridW:      this.gridW,
      gridH:      this.gridH,
      fontSize:   this.fontSize,
      bgColor:    this.bgColor,
      marks:      this.marks,
      styleBlock: this.styleBlock,
      layout:     this.layout,
      width:      this.width,
      height:     this.height,
      shiftX:     this.shiftX,
      shiftY:     this.shiftY,
      program:    prgm,
      markNames:  this.markNames,
      xyToMarks:  this.xyToMarks,
      shiftings:  this.shiftings
    });
  }

  setLayout(layout) {
    this.layout = trimFirstBlankLine(layout).split('\n');
    this.height = Math.max(this.layout.length, this.height||0);
    if (!this.width) {
      this.width = 20;
      for (var i in this.layout) {
        var ln = this.getLayoutLine(i),
            mylen = textRealLen(ln.replace(/<[^>]*>/g,''));
        this.width = Math.max(this.width, mylen+1);
      }
    }
    this._initLayout();
    return this;
  }

  setTree(layout, indent) {
    if (!indent) indent = '〇';
    this.setLayout(layout.replaceAll('\n!!', '\n　')); // for design view
    this.tree = new Tree(layout, indent);
    var me = this;
    this.tree.dfs((n) => {
      // handle node's anno
      var ln = n.name, idx = ln.indexOf(indent);
      if (idx > 0) {
        while (ln[idx] == indent) ++idx;
        var delta = ln.length - textRealLen(ln);
        me.TC(n.x + idx - delta, n.y, 'ail');
      }
      var num = n.numChildren();
      if (!num) return;
      me.L([n.x-0.25, n.y+0.55], [n.x-0.25, n.lastChild().y]);
      for (var i=0; i<num; ++i)
        me.L([n.x-0.25, n.children[i].y], '%r0.5');
    });
    return this;
  }

  getLayoutLine(i) {
    var ln = this.layout[i];
    if (!ln) return '';
    var idx = ln.indexOf('##');
    return (idx<0) ? ln : rtrim(ln.substring(0, idx));
  }

  set(k,n) { this[k] = n; return this; }
  setPopupModal(yes) { this.popupModal = yes; return this; }
  setGridWidth(sz) { this.gridW = this.fontSize = sz; return this; }
  setGridHeight(sz) { this.gridH = sz; return this; }
  setShift(dx, dy) { this.shiftX = dx; this.shiftY = dy; return this; }
  setMarkNames(names) { this.markNames = names; return this; }       // before setLayout()
  setDefaultTextColor(c) { this.addInst(new GPTextMeta(this, DEFAULTTEXTCOLOR, c)); return this; }
  setDefaultLineColor(c) { this.addInst(new GPLineMeta(this, DEFAULTLINECOLOR, c)); return this; }
  setBGColor(c) { this.bgColor = c; return this; }
  defMark(name, x, y) {
    if (this.marks[name]) throw `Conflict of mark: ${name}.`;
    this.marks[name] = [x,y];
    this.xyToMarks[`${x}_${y}`] = name;
    return this;
  }
  getMark(name) { return this.marks && this.marks[name]; }
  shiftPoint(x, y, dx, dy) { return this.XFT(x,y,dx,dy); }
  XFT(x, y, dx, dy) {
    var arg0 = arguments[0];
    if (typeof arg0[0] == 'string') {
      // then the params become (markList, dx, dy)
      dx = arguments[1];
      dy = arguments[2];
      var delta = [ dx||0, dy||0 ], i;
      for (i=0; i<arg0.length; ++i) {
        var xy = this.marks[arg0[i]];
        if (!xy) throw `Mark "${arg0[i]}" not defined.`;
        this.shiftings[`${xy[0]}_${xy[1]}`] = delta;
      }
      return this;
    }

    var delta = [ dx||0, dy||0 ], i;
    if (Array.isArray(x)) {
      x = toRange(x);
      if (Array.isArray(y)) {
        y = toRange(y);
        for (i=0; i<x.length; ++i) {
          var x1 = x[i];
          for (var j=0; j<y.length; ++j)
            this.shiftings[`${x1}_${y[j]}`] = delta;
        }
      } else {
        for (i=0; i<x.length; ++i)
          this.shiftings[`${x[i]}_${y}`] = delta;
      }
    } else if (Array.isArray(y)) {
      y = toRange(y);
      for (i=0; i<y.length; ++i)
        this.shiftings[`${x}_${y[i]}`] = delta;
    } else
      this.shiftings[`${x}_${y}`] = delta;
    return this;
  }
  getShifting(x, y) { return this.shiftings[`${x}_${y}`]; }

  setLinkMap(lm) { this.linkMap = lm; return this; }
  setStyle(styleBlk) { this.styleBlock = styleBlk; return this; }
  include(diagram, x, y, ignoreStyle) {
    this.addInst(new GPIncludeInst(this, diagram, x, y, ignoreStyle));
    return this;
  }
  toXY(pt) { // if pt is a string, treated as a mark
    return (typeof pt == 'string') ? this.getMark(pt) : pt; // else, pt is assummed [x,y]
  }
  addInst(inst) { this.program.push(this.lastInst = inst); return this; }
  addTextInst(x,y,txt,extra,vert)  {
    var inst = new GPTextInst(this, x, y, txt, extra);
    if (vert) inst.setVertical();
    return this.addInst(inst);
  }
  updateLastInst(fxn) { fxn(this.lastInst); return this; }
  hasRightEdge(color) { return this.addInst(new GPRightEdgeInst(this, color)); }
  line(f,t,e) { return this.L(f,t,e); }
  // [from] can be a string for a defined point, or an [x,y].
  // [to] can be like from, but can also take derivitives:
  // '%r9', '%l9', '%u9', '%d' for going right, left, up and down.
  L(from, to, extra) { this.addInst(new GPLineInst(this, from, to, extra)); return this; }
  ptr(from, to, extra) { // TODO: impl; similar to line()
    this.addInst(new GPPointerInst(this, from, to, extra));
    return this;
  }
  textClass(x,y,c) { return this.TC(x,y,c); }
  TC(x, y, cls) { // to decorate a (horiz.) text, usu. plain in the layout
    for (var i in this.program) {
      var inst = this.program[i];
      if ((inst.act==TEXT) && (inst.x==x && (inst.y==y)))
        inst.wrapTextInClass(cls);
    }
    return this;
  }
  rect(x,y,w,h,extra) {
    this.addInst(new GPRectInst(this, x, y, w, h, extra));
    return this;
  }
  circle(x,y,r,extra) {
    this.addInst(new GPOvalInst(this, x, y, r, r, extra));
    return this;
  }
  oval(x,y,rx,ry,extra) {
    this.addInst(new GPOvalInst(this, x, y, rx, ry, extra));
    return this;
  }
  rectByCorners(ul,lr,extra) {
    ul = this.toXY(ul);
    lr = this.toXY(lr);
    var x = ul[0], y = ul[1];
    return this.rect(x, y, lr[0]-x+1, lr[1]-y, extra);
  }
  circleByCorners(ul,lr,extra) {
    ul = this.toXY(ul);
    lr = this.toXY(lr);
    var x1 = ul[0], y1 = ul[1], x2 = lr[0], y2 = lr[1], r = Math.max((x2-x1+1)/2, (y2-y1+1)/2);
    return this.circle((x1+x2)/2, (y1+y2)/2, r, extra);
  }
  ovalByCorners(ul,lr,extra) {
    ul = this.toXY(ul);
    lr = this.toXY(lr);
    var x1 = ul[0], y1 = ul[1], x2 = lr[0], y2 = lr[1];
    return this.oval((x1+x2)/2, (y1+y2)/2, (x2-x1+1)/2, (y2-y1+1)/2, extra);
  }
  bgRect(x,y,w,h,extra)          { this.rect(x,y,w,h,extra);          this.lastInst.setBefore(); return this; }
  bgRectByCorners(ul,lr,extra)   { this.rectByCorners(ul,lr,extra);   this.lastInst.setBefore(); return this; }
  bgCircle(x,y,r,extra)          { this.circle(x,y,r,extra);          this.lastInst.setBefore(); return this; }
  bgCircleByCorners(ul,lr,extra) { this.circleByCorners(ul,lr,extra); this.lastInst.setBefore(); return this; }
  bgOval(x,y,rx,ry,extra)        { this.oval(x,y,rx,ry,extra);        this.lastInst.setBefore(); return this; }
  bgOvalByCorners(ul,lr,extra)   { this.ovalByCorners(ul,lr,extra);   this.lastInst.setBefore(); return this; }
  blackboardByCorners(a, b) {
    this.bgRectByCorners(a, b);
    this.lastInst.setFillStroke('#16503B', 'gold|6').setRoundCorner(0.2);
    return this;
  }
  whiteboardByCorners(a, b) {
    this.bgRectByCorners(a, b);
    this.lastInst.setFillStroke('#fafaff', 'gold|6').setRoundCorner(0.2);
    return this;
  }
  text(x,y,t,e) { return this.T(x,y,t,e); }
  textAtMark(m,t,e) { m = this.toXY(m); return this.T(m[0],m[1],t,e); }
  T(x, y, txt, extra) {
    var replaced = false;
    for (var i in this.program) {
      var inst = this.program[i];
      if ((inst.act==TEXT) && (inst.x==x) && (inst.y==y)) {
        inst.setText(txt, extra);
        replaced = true;
      }
    }
    if (!replaced) // not found, set it
      this.addTextInst(x, y, txt, extra);
    return this;
  }
  vtext(x,y,t,e) { return this.VT(x,y,t,e); }
  VT(x, y, txt, extra) { this.addTextInst(x, y, txt, extra, true); return this; }
  removeText(x, y) {
    this.program = this.program.filter((a) => (a.act==TEXT) && (a.x==x) && (a.y==y));
    return this;
  }
  findText(t) {
    for (var i in this.program) {
      var inst = this.program;
      if ((inst.act==TEXT) && (inst.text==t))
        return inst;
    }
    return null;
  }
  fanOut(xLeft, yTop, yBottom, numItems, noIn) { return this.FO(xLeft, yTop, yBottom, numItems, noIn); }
  FO(xLeft, yTop, yBottom, numItems, noIn) { // returns yMiddle. numItems can be [], for uneven branching
    if (!numItems) numItems = 2;
    var cfg;
    if (noIn && (typeof noIn == 'object')) { cfg = noIn; noIn = cfg.noIn; }
    if (!extra && cfg && cfg.lineColor)
      extra = ` stroke="${cfg.lineColor}" stroke-width="1px"`;
    var leftLen = cfg && cfg.leftLen || 0.75, rightLen = cfg && cfg.rightLen || 0.5, extra;

    this.L([xLeft+0.5, yTop], [xLeft+0.5, yBottom], extra)
        .L([xLeft+0.5, yTop], "%r0.5", extra)
        .L([xLeft+0.5, yBottom], "%r0.5", extra);
    if (!noIn) this.L([xLeft+0.5, (yTop+yBottom)/2], `%l${leftLen}`, extra)
    if (Array.isArray(numItems)) {
      for (var i=0; i<numItems.length; ++i)
        this.L([xLeft+0.5, numItems[i]], `%r${rightLen}`, extra);
    }
    if (numItems > 2) {
      var dist = (yBottom-yTop) / (numItems-1);
      for (var i=1; i<numItems-1; ++i)
        this.L([xLeft+0.5, yTop + dist * i], "%r0.5", extra);
    }
    return this;
  }
  fanIn(xLeft, yTop, yBottom, numItems, noOut) { return this.FI(xLeft, yTop, yBottom, numItems, null, noOut); }
  GROUPL(xLeft, yTop, yBottom) { return this.FO(xLeft, yTop, yBottom, 2, true); }
  GROUPR(xLeft, yTop, yBottom) { return this.FI(xLeft, yTop, yBottom, 2, true); }
  FI(xLeft, yTop, yBottom, numItems, noOut) { // numItems can be [], for uneven branching
    if (!numItems) numItems = 2;
    var cfg;
    if (noOut && (typeof noOut == 'object')) { cfg = noOut; noOut = cfg.noOut; }
    if (!extra && cfg && cfg.lineColor)
      extra = ` stroke="${cfg.lineColor}" stroke-width="1px"`;
    var leftLen = cfg && cfg.leftLen || 0.75, rightLen = cfg && cfg.rightLen || 0.5, extra;

    this.L([xLeft+0.5, yTop], [xLeft+0.5, yBottom], extra)
        .L([xLeft+0.5, yTop], `%l${leftLen}`, extra)
        .L([xLeft+0.5, yBottom], `%l${leftLen}`, extra);
    if (!noOut) this.L([xLeft+0.5, (yTop+yBottom)/2], `%r${rightLen}`, extra)
    if (Array.isArray(numItems)) {
      for (var i=0; i<numItems.length; ++i)
        this.L([xLeft+0.5, numItems[i]], `%l${leftLen}`, extra);
    }
    if (numItems > 2) {
      var dist = (yBottom-yTop) / (numItems-1);
      for (var i=1; i<numItems-1; ++i)
        this.L([xLeft+0.5, yTop + dist * i], `%l${leftLen}`, extra);
    }
    return this;
  }
  _initLayout() {
    this.marks     = {}; // name => [x,y]; for runtime
    this.xyToMarks = {}; // x_y => name; for layout design view
    this.shiftings = {}; // x_y => [dx,dy]; only apply to starting points

    // Process declared texts in the layout (versus via T())
    var i, j, curInst, curX, extra;
    for (var i=1; i<=this.height; ++i) {
      var row = this.getLayoutLine(i-1), curX = 1, len = row.length;
      for (var j=1; j<=len; ++j) {
        var c = row[j-1];
        if (this.isGPSP(c)) {
          if (curInst)
            curInst = null;
          ++curX;
        } else if (this.isMark(c)) {
          this.defMark(c, curX, i);
          ++curX;
        } else { // not GPSP nor mark
          if (c == SPLIT) c = '　';
          if (!curInst) this.addInst(curInst = new GPTextInst(this, curX, i, null, extra));

          // for "<...>", leave curX
          var inc = 1, tmp;
          if (row[j-1] == '<') {
            inc = 0;
            tmp = c;
            for (++j; (j<=len) && (row[j-1] != '>'); ++j)
              tmp += row[j-1];
            if (row[j-1] != '>') // no ending '>'?
              throw `Bad <...> format in [${$row}]: missing ending '>'.`;
            c = tmp + '>';
          }
          // handle "/...|text/"
          else if (c == '/') {
            tmp = c;
            for (++j; (j<=len) && (row[j-1] != '/'); ++j)
              tmp += row[j-1];
            if (row[j-1] != '/') { // no ending '/'?
              c = tmp;
              inc = tmp.length; // leave it as-is
            } else {
              c = tmp + '/'; // the "/.../"
              var idx = c.lastIndexOf('|');
              if (idx < 0) throw `Bad /.../ format in [${row}]: missing '|'.`;
              inc = c.length - idx - 2; // the effective text length
            }
          }
          // TODO: handle "&...;"?
          curInst.append(c);
          curX += inc;
        }
      }
      curInst = null;
    }
  }

  isMark(x) { var m = this.markNames; return m && (m.indexOf(x) >= 0); }

  layoutForDesign(buf) { // only cares about definitions, ignoring all actions
    if (!buf) buf = new Buffer();
    var i, j, s;
    // Get all defined points

    var xyst = ' style="border-bottom:1px solid black; border-right:1px solid black"';
    var bgc = this.bgColor ? ` bgcolor="${this.bgColor}"` : '';
    buf.w(`<table border=0 cellpadding=0 cellspacing=0${bgc}>
           <tr bgcolor="lightgray"><th align=right ${xyst}>X<br>Y&nbsp;&nbsp;</th>`);
    for (i=1; i<=this.width; ++i) {
      // the x-coord
      s = `${i}`;
      buf.w('<th valign=bottom style="border-bottom:1px solid black">');
      for (var j=0; j<s.length; ++j)
        buf.wIf(j>0, '<br>').w(s[j]);
      buf.w('</th>');
    }
    buf.w('</tr>');
    for (i=1; i<=this.height; ++i) {
      buf.w('<tr><td align=right style="border-right:1px solid black; background-color:lightgray">&nbsp;',
            i, '&nbsp;</td>');
      s = this.getLayoutLine(i-1);
      for (j=1; j<=s.length; ++j) {
        var cell = this.xyToMarks[`${j}_${i}`];
        if (cell) cell = `<mark>${cell}</mark>`; else cell = s[j-1];
        buf.w(`<td align=center${this.isGPSP(cell) ? ' class=sp' : ''}>${cell}</td>`);
      }
      buf.w('</tr>');
    }
    return buf.w('</table>');
  }

  checkProgram() {
    if (this.program) return;
    this.program = [];
    this.setup && this.setup(this);
  }

  genSVG(opt) { // executes definitions and actions
    this.checkProgram();
    var buf;
    if (typeof opt == 'object')
      buf = opt;
    else { // opt is not Buffer; treated as boolean
      buf = new Buffer();
      if (opt) return this.layoutForDesign(buf);
    }
    var svg = '<svg xmlns="http://www.w3.org/2000/svg"';
    if (this.bgColor)
      svg += ` style="background-color:${this.bgColor}"`;
    var gw = this.gridW, gh = this.gridH, w = this.width+1, h = this.height+1;
    var includes = [];
    for (var i in this.program) {
      var p = this.program[i];
      if (p.act == INCL) {
        includes.push(p);
        w = Math.max(w, p.x + p.diagram.width);
        h = Math.max(h, p.y + p.diagram.height);
      }
    }
    buf.w(`${svg} height="${h * gh}" width="${w * gw}">`);
    buf.w(`<style>text { font-family: "FangSong", "仿宋", STFangsong, "华文仿宋"; font-size:${this.fontSize} }</style>`);
    this.genInnerSVG(buf, 1, 1);
    buf.w('Sorry, your browser does not support inline SVG.</svg>');
    return buf;
  }

  genInnerSVG(buf, origX, origY, ignoreStyle) {
    this.checkProgram();
    // Included subparts:
    var shiftX = origX - 1, shiftY = origY - 1;
    for (var i in this.program) {
      var p = this.program[i];
      if (p.act == INCL) {
        var x = shiftX + p.x, y = shiftY + p.y;
        p.diagram.genInnerSVG(buf, x, y, p.ignoreStyle);
      }
    }

    // Myself:
    function getProgramToRun(me) { // into instructions for SVG generation
      var pgm = [], before = [], after = [];
      for (var i in me.program) { // shapes go underneath texts and lines
        var inst = me.program[i];
        if (inst.order < 0)      before.push(inst);
        else if (inst.order > 0) after.push(inst);
        else                     pgm.push(inst);
      }
      return before.concat(pgm, after);
    }

    shiftX += this.shiftX;
    shiftY += this.shiftY;
    var pgm = getProgramToRun(this), gw = this.gridW, gh = this.gridH, hw = gw/2;
    if (!ignoreStyle && this.styleBlock)
      buf.w('<style>', this.styleBlock, '</style>');
    for (var i in pgm) {
      var inst = pgm[i];
      inst.render(buf, shiftX, shiftY);
    }
  }

} // end of GridPerfect.

class MyContent {
  constructor(gridperf, init) {
    if (!gridperf) throw `MyContent needs to set gridperfect.`;
    this.gp = gridperf || new GridPerfect();
    if (init) Object.assign(this, init);
    this.setCommonTexts();
    this.setTexts();
  }
  setNamedText(id, txt) { this.gp.setNamedText(id, txt); }
  setSutraText(id, txt) { this.gp.setSutraText(id, txt); }
  getNamedText(id, txt) { return this.gp.getNamedText(id, txt); }
  setTableData(id, data, tblExtra, sep) { this.setNamedText(id, showTableData(data, tblExtra, sep)); }

  setDialogOL(name, title, csv, sep) {
    if (!Array.isArray(csv)) csv = csv.trim().split(sep || '|');
    var txt = toOL(csv);
    if (title) txt = `<h3>${title}</h3>${txt}`;
    this.setNamedText(name, txt);
  }
  setDialogOLSplit(name, title, csv, sep, cols) {
    if (!Array.isArray(csv)) csv = csv.trim().split(sep || '|');
    var len = csv.length;
    if (!cols) cols = 2;
    var sublen = Math.floor(len / cols);
    if (len % cols) ++sublen;
    var buf = new Buffer();
    buf.wIf(title, '<h3>', title, '</h3>')
       .w('<table><tr><td valign=top><ol>');
    var nextBrk = sublen;
    for (var i=0; i<len; ++i) {
      if (i == nextBrk) {
        buf.w(`</ol></td><td valign=top><ol start="${i+1}">`);
        nextBrk += sublen;
      }
      buf.w('<li>', csv[i], '</li>');
    }
    buf.w('</ol></td></tr>');
    this.setNamedText(name, buf.render());
  }
  parseOLLists(prefix, csvLines, sep) {
    csvLines = csvLines.split('\n');
    for (var i in csvLines) {
      var ln = csvLines[i].trim();
      if (!ln) continue;
      var pair = ln.split('='), p = pair[0].split('|'), subj = (p.length > 1);
      this.setDialogOL(prefix+p[subj ? 1 : 0].trim(), subj ? p[0] : null, pair[1], sep);
    }
  }

  setCommonTexts() {
    this.setDialogOL('十八相動', '六種十八相動',
      '動、遍動、等遍動|' +
      '起、遍起、等遍起|' + // or 爆、極爆、徧極爆
      '湧、遍湧、等遍湧|' +
      '震、遍震、等遍震|' +
      '吼、遍吼、等遍吼|' +
      '擊、遍擊、等遍擊');
  }

  setTexts() { // individual work's texts
  }

} // end of MyContent

// Singleton, with UI support
var gpRepo = new (class extends ResourceRepo {
  setDialogId(id) { this.dialogId = id; return this; }
  canPopup() { return this.dialogId; }
  showDialog(name, txtId, modeless) {
    var rsc = gpRepo.get(name);
    rsc && showDialog(this.dialogId, `${name}:${txtId}`, rsc.gp.getNamedText(txtId), modeless);
  }

  setElidTOC(id) { this.elidTOC = id; return this; }
  setElidStage(id) { this.elidStage = id; return this; }
  getDiagramSvg(name, isLeft) {
    var svg = this.showDiagram(name, 'STRING');
    return isLeft ? svg : `<center>${svg}</center>`;
  }
  showDiagram(name, elid, design) {
    if (!name) {
      name = localStorage.getItem('cur');
      if (name && name.endsWith('*')) {
        design = true;
        name = name.substring(0,name.length-1);
      }
    }
    var rsc = name && gpRepo.run(name, design);
    if (!rsc) {
      name = null;
      localStorage.removeItem('cur');
    } else {
      if (elid == 'STRING')
        return (typeof rsc == 'string') ? rsc : rsc.render(); // rsc is buffer
      if (typeof rsc == 'string')
        renderText(elid || this.elidStage || document, rsc);
      else // buffer
        rsc.wrap('<center>', '</center>').render(elid || this.elidStage || document);
    }
    this.showTOC(name, design);
  }
  showTOC(cur, design) {
    if (cur)
      localStorage.setItem('cur', cur + (design ? '*' : ''));
    else {
      cur = localStorage.getItem('cur');
      if (cur && cur.endsWith('*')) {
        design = true;
        cur = cur.substring(0,cur.length-1);
      }
    }
    var categories = {}, nameSet = {};
    for (var i in gpRepo.all) {
      var item = gpRepo.all[i];
      if (!showPriv && item.name[0] == '%') continue;
      if (nameSet[item.name]) continue;
      nameSet[item.name] = true; // avoid dups for aliased ones.
      var c = item.category || '其他';
      var a = categories[c];
      if (!a) categories[c] = a = [];
      a.push(item.name);
    }
    var buf = new Buffer('<center><table border=0 style="min-width:750px">');
//  var stats = [];
    for (var i in catNames) {
      var cat = catNames[i], c = cat, names = categories[c];
      if (!names) continue;
      if (c.trim().length > 0) c += '：&nbsp;';
      buf.w(`<tr><td valign=top nowrap>${c}</td><td>`);
      for (var j=0; j<names.length; ++j) {
        var n = names[j], rsc = gpRepo.get(n), isPriv = n[0] == '%',
            alias = rsc.alias && ('/' + rsc.alias.join('/')) || '',
            diagLnk = jslnk(`gpRepo.showDiagram('${n}')`, n+alias, rsc.gp.src),
            designLnk = '<sub>' + jslnk(`gpRepo.showDiagram('${n}',null,1)`, '🔍') + '</sub>';
//      stats.push({ cat, name:n+alias, src:rsc.gp.src });
        if (n == cur)
          buf.w(design ? `<u style="background-color:yellow">${diagLnk}</u>　`
                       : `<b style="color:red">${n}${alias}</b>${designLnk}`);
        else if (isPriv)
          buf.w('<span style="background-color:pink">', diagLnk, '</span>', designLnk, ' ');
        else
          buf.w(diagLnk, designLnk, ' ');
      }
      buf.w(`</td></tr>`);
    }
    buf.w('</table><hr></center>').render(this.elidTOC);
//  console.log(JSON.stringify(stats));
  }

  show() { this.showDiagram(); }
})();

function diagramSvg(name, isLeft) { return gpRepo.getDiagramSvg(name, isLeft); }

function getGP(name) {
  var item = gpRepo.get(name);
  if (!item) throw `Requested diagram ${name} is not found.`;
  return item.gp;
}

function cloneGP(name,newName) {
  var c = getGP(name).clone(); 
  c.name = newName || `${name}-clone`;
  return c;
}

function newGP(setupFxn, cfg) {
  var ret = new GridPerfect(gpRepo.config, cfg, setupFxn);
  if (!setupFxn) ret.checkProgram();
  return ret;
}

function addGP(name, gp, category) {
  gp.name = name;
  gpRepo.add(new GridPerfectItem(name, gp).setCategory(category || CAT_NONE));
  return gp;
}

function createGP(name, category, setupFxn, cfg) {
  var gp = new GridPerfect(gpRepo.config, cfg, setupFxn);
  addGP(name, gp, category);
  return gp;
}

function writeDialogCode(width, dlgId) {
  if (!dlgId) dlgId = 'dlg';
  if (!width) width = 700;
  console.log(`If not already, write the following into <style>:

#${dlgId}        { background-color:#ffe; padding-left:0px; padding-right:0px }
#${dlgId}Title   { color:brown; border-bottom:1px solid brown; padding-left:10px }
#${dlgId}Body    { padding-left:10px; padding-right:10px }
#${dlgId} header { margin-top:-15px; margin-left:0px; margin-right:15px; margin-bottom:10px }
kp        { color:green; font-size:12px }`);
  document.write(`<dialog id="${dlgId}">
<header>
  <table width="${width}px" cellspacing="0">
    <tr><td id="${dlgId}Title"></td>
        <td align=right style="border-bottom:1px solid brown; padding-right:10px">
          <button aria-label="Close dialog" onclick="closeEl('${dlgId}')">&times;</button>
        </td>
    </tr>
  </table>
</header>
<div id="${dlgId}Body"></div>
</dialog>`);
}
