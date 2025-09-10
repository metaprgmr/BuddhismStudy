function isGPSP(x) { // SP = space
  const SPs = '　〇─│┌┐└┘┼┬┴├┤';
  return x && (SPs.indexOf(x) >= 0);
}

const LINE='LINE', TEXT='TEXT';

// Named points (marks) are useful to abstract out diagrams.
// They can be defined programmatically, which always works.
// They can also be declared in the diagram itself;
//   currently it works for lines, but not for text, as the
//   marks will collide with text.
//   This can be enhanced, but will cost. Leave it for now.

class GridPerfect {
  constructor() {
    this.gridW = 16;
    this.gridH = 22;
    this.fontSize = this.gridW;
    this.bgColor = undefined;
    this.macros = {};
    this.marks = '';

    var o = arguments[0], isCfg = (typeof o == 'object');
    if (isCfg) Object.assign(this, o);

    var layout = isCfg ? arguments[1] : o;
    layout && this.setLayout(layout);
  }

  setLayout(layout) {
    this.layout = layout.split('\n');
    var ln = this.layout[0];
    if (ln.trim() == '') this.layout.shift(); // skip 1st empty line
    this.height = this.layout.length;
    this.width  = 10; // random min width
    for (var i in this.layout)
      this.width = Math.max(this.width, this.layout[i].length+1);
    this._initLayout();
    return this;
  }

  setMacro(name, fxn) { this.macros[name] = fxn; return this; }
  macro(name) {
    var fxn = this.macros[name];
    if (fxn) {
      var args = Array.from(arguments);
      args[0] = this;
      fxn.apply(this, args);
    }
    return this;
  }

  set(k,n) { this[k] = n; return this; }
  setGridWidth(sz) { this.gridW = sz; return this; }
  setGridHeight(sz) { this.gridH = sz; return this; }
  setMarks(mks) { this.marks = mks; return this; }
  defPoint(name, x, y) {
    if (this.namedPts[name]) throw `Conflict of named point: ${name}.`;
    this.namedPts[name] = [x,y];
    this.xyToMarks[`${x}_${y}`] = name;
    return this;
  }
  shiftPoint(x, y, dx, dy) {
    var arg0 = arguments[0];
    if (typeof arg0[0] == 'string') {
      // then the params become (markList, dx, dy)
      dx = arguments[1];
      dy = arguments[2];
      var delta = [ dx||0, dy||0 ], i;
      for (i=0; i<arg0.length; ++i) {
        var xy = this.namedPts[arg0[i]];
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

  // [from] can be a string for a defined point, or an [x,y].
  // [to] can be like from, but can also take derivitives:
  // '%r9', '%l9', '%u9', '%d' for going right, left, up and down.
  line(from, to) { this.program.push({ act:LINE, from, to }); return this; }

  _initLayout() {
    this.program   = [];
    this.namedPts  = {}; // name => [x,y]; for runtime
    this.xyToMarks = {}; // x_y => name; for layout design view
    this.shiftings = {}; // x_y => [dx,dy]; only apply to starting points

    var i, j, curInst;
    for (var i=1; i<=this.height; ++i) {
      var row = this.layout[i-1];
      for (var j=1; j<=row.length; ++j) {
        var c = row[j-1];
        if (isGPSP(c)) {
          if (curInst) curInst = null;
        } else if (this.isMark(c)) {
          this.defPoint(c, j, i);
        } else { // not GPSP nor mark
          if (curInst) {
            curInst.text += c;
          } else {
            curInst = { act:TEXT, x:j, y:i, text:c };
            this.program.push(curInst);
          }
        }
      }
      curInst = null;
    }
  }

  isMark(x) { var m = this.marks; return m && (m.indexOf(x) >= 0); }

  _compile() { // into instructions for SVG generation
    const me = this;
    function compileLine(inst) { // turn textual from/to into xy's
      var ret = Object.assign({}, inst), xy;
      if (typeof ret.from == 'string') { // otherwise, should be [x,y]
        xy = me.namedPts[ret.from];
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
          xy = me.namedPts[ret.to];
          if (!xy) throw `To-point not found: ${ret.to}`;
        }
        ret.to = xy;
      }
      return ret;
    }

    var pgm = [];
    for (var i in this.program) {
      var inst = this.program[i];
      switch(inst.act) {
      case TEXT: pgm.push(inst); break;
      case LINE: pgm.push(compileLine(inst)); break;
      }
    }
    return pgm;
  }

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
      s = this.layout[i-1];
      for (j=1; j<=s.length; ++j) {
        var cell = this.xyToMarks[`${j}_${i}`];
        if (cell) cell = `<red>${cell}</red>`; else cell = s[j-1];
        buf.w(`<td align=center${isGPSP(cell) ? ' class=sp' : ''}>${cell}</td>`);
      }
      buf.w('</tr>');
    }
    return buf.w('</table>');
  }

  genSVG(opt) { // executes definitions and actions
    var buf;
    if (typeof opt == 'object')
      buf = opt;
    else { // opt is not Buffer; treated as boolean
      buf = new Buffer();
      if (opt) return this.layoutForDesign(buf);
    }
    var svg = '<svg xmlns="http://www.w3.org/2000/svg"';
    if (this.bgColor) svg += ` style="background-color:${this.bgColor}"`;
    var pgm = this._compile(), gw = this.gridW, gh = this.gridH, hw = gw/2;
    buf.w(`${svg} height="${this.height * gh + gh}" width="${this.width * gw + gw}">`);
    for (var i in pgm) {
      var inst = pgm[i], x, y, x2, y2, dx, dy, shft;
      switch(inst.act) {
      case LINE:
        shft = this.getShifting(inst.from[0], inst.from[1]);
        dx = shft && shft[0] || 0;
        dy = shft && shft[1] || 0;
        x = (dx+inst.from[0]) * gw + gh/2;
        y = (dy+inst.from[1]) * gh;
        if (!inst.to[2]) { // absolute; check its own shifting
          shft = this.getShifting(inst.to[0], inst.to[1]);
          dx = shft && shft[0] || 0;
          dy = shft && shft[1] || 0;
        } // otherwise, it is relative, just shift with from
        x2 = (dx+inst.to[0])  * gw + gh/2;
        y2 = (dy+inst.to[1])  * gh;
        buf.w(`<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" style="stroke:black;stroke-width:1"/>`);
        break;
      case TEXT:
        shft = this.getShifting(inst.x, inst.y);
        dx = shft && shft[0] || 0;
        dy = shft && shft[1] || 0;
        x = (dx+inst.x) * gw;
        y = (dy+inst.y) * gh + gh/4;
        buf.w(`<text x="${x}" y="${y}" font-size="${this.fontSize}">${inst.text}</text>`);
        break;
      }
    }
    return buf.w('Sorry, your browser does not support inline SVG.</svg>');
  }

} // end of GridPerfect.
