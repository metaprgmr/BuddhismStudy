function isGPSP(x) { // SP = space
  const SPs = '　〇─│┌┐└┘┼┬┴├┤';
  return x && (SPs.indexOf(x) >= 0);
}

const LINE='LINE', TEXT='TEXT', INCL='INCL';

// Named points (marks) are useful to abstract out diagrams.
// They can be defined programmatically, which always works.
// They can also be declared in the diagram itself;
//   currently it works for lines but not text, as the
//   marks will collide with text.

class GridPerfect {
  constructor() {
    this.gridW = 16;
    this.gridH = 22;
    this.fontSize = this.gridW;
    this.bgColor = undefined;
    this.markNames = '';
    this.styleBlock = null;
    this.program = [];
    this.shiftings = {}; // x_y => [dx,dy]; only apply to starting points
    this.layout = []; // dummy
    this.width  = 1;
    this.height = 1;
    this.shiftX = 0;
    this.shiftY = 0;

//  Set in _initLayout():
//  this.marks     = {}; // name => [x,y]; for runtime
//  this.xyToMarks = {}; // x_y => name; for layout design view

    var o = arguments[0], isCfg = (typeof o == 'object');
    if (isCfg) Object.assign(this, o);

    var layout = isCfg ? arguments[1] : o;
    layout && this.setLayout(layout);
  }

  run(f) { f(this); return this; } // Good practice for namespace cleanness.

  clone() {
    var prgm = []; // deep copy
    for (var i in this.program) {
      var o = this.program[i], c = Object.assign({}, o);
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
    this.layout = layout.split('\n');
    var ln = this.getLayoutLine(0);
    if (ln.trim() == '') this.layout.shift(); // skip 1st empty line
    this.height = this.layout.length;
    this.width  = 10; // random min width
    for (var i in this.layout)
      this.width = Math.max(this.width, this.getLayoutLine(i).replace(/<[^>]*>/g,'').length+1);
    this._initLayout();
    return this;
  }

  getLayoutLine(i) {
    var ln = this.layout[i];
    if (!ln) return '';
    var idx = ln.indexOf('##');
    if (idx<0) return ln;
    for (--idx; (idx>0) && (ln[idx]==' '); --idx);
    return ln.substring(0, idx+1);
  }

  set(k,n) { this[k] = n; return this; }
  setGridWidth(sz) { this.gridW = this.fontSize = sz; return this; }
  setGridHeight(sz) { this.gridH = sz; return this; }
  setShift(dx, dy) { this.shiftX = dx; this.shiftY = dy; return this; }
  setMarkNames(names) { this.markNames = names; return this; } // before setLayout()
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

  setStyle(styleBlk) { this.styleBlock = styleBlk; return this; }
  include(diagram, x, y, ignoreStyle) {
    this.program.push({ act:INCL, diagram, x, y, ignoreStyle });
    return this;
  }
  line(f,t,e) { return this.L(f,t,e); }
  // [from] can be a string for a defined point, or an [x,y].
  // [to] can be like from, but can also take derivitives:
  // '%r9', '%l9', '%u9', '%d' for going right, left, up and down.
  L(from, to, extra) { this.program.push({ act:LINE, from, to, extra }); return this; }
  textClass(x,y,c) { return this.TC(x,y,c); }
  TC(x, y, cls) {
    var tspan = `<tspan class="${cls}">`;
    for (var i in this.program) {
      var inst = this.program[i];
      if ((inst.act==TEXT) && (inst.x==x && (inst.y==y)))
        inst.text = tspan + inst.text + '</tspan>';
    }
    return this;
  }
  text(x,y,t,e) { return this.T(x,y,t,e); }
  T(x, y, txt, extra) {
    txt = this._procText(txt);
    var replaced = false;
    for (var i in this.program) {
      var inst = this.program[i];
      if ((inst.act==TEXT) && (inst.x==x) && (inst.y==y)) {
        inst.text = txt;
        inst.extra = extra;
        replaced = true;
      }
    }
    if (!replaced) // not found, set it
      this.program.push({ act:TEXT, x, y, text:txt, extra });
    return this;
  }
  removeText(x, y) {
    this.program = this.program.filter((a) => (a.act=='TEXT') && (a.x==x) && (a.y==y));
    return this;
  }
  _procText(s) { // turn 「/ail|你好/」 into 「<tspan class="ail">你好</tspan>」
    if ((s.indexOf('</')>=0) || (s.indexOf('/>')>=0))
      return s; // don't handle those with </tag> and <tag/>; leave as-is
    var ret='', idx1=0, idx=s.indexOf('/');
    if (idx < 0) return s;
    while (true) {
      idx1 = s.indexOf('/', idx+1);
      if (idx1 < 0) { ret += s; break; }
      ret += s.substring(0, idx);
      var a = s.substring(idx+1,idx1).split('|');
      s = s.substring(idx1+1);
      ret += `<tspan class="${a[0]}">${a[1]}</tspan>`;
      idx = s.indexOf('/');
      if (idx < 0) { ret += s; break; }
    }
    return ret;
  }
  _initLayout() {
    this.program   = [];
    this.marks     = {}; // name => [x,y]; for runtime
    this.xyToMarks = {}; // x_y => name; for layout design view
    this.shiftings = {}; // x_y => [dx,dy]; only apply to starting points

    var i, j, curInst;
    for (var i=1; i<=this.height; ++i) {
      var row = this.getLayoutLine(i-1);
      for (var j=1; j<=row.length; ++j) {
        var c = row[j-1];
        if (isGPSP(c)) {
          if (curInst) {
            curInst.text = this._procText(curInst.text);
            curInst = null;
          }
        } else if (this.isMark(c)) {
          this.defMark(c, j, i);
        } else { // not GPSP nor mark
          if (curInst) {
            curInst.text += c;
          } else {
            curInst = { act:TEXT, x:j, y:i, text:c };
            this.program.push(curInst);
          }
        }
      }
      if (curInst && curInst.text) curInst.text = this._procText(curInst.text);
      curInst = null;
    }
  }

  isMark(x) { var m = this.markNames; return m && (m.indexOf(x) >= 0); }

  _compile() { // into instructions for SVG generation
    const me = this;
    function compileLine(inst) { // turn textual from/to into xy's
      var ret = Object.assign({}, inst), xy;
      if (typeof ret.from == 'string') { // otherwise, should be [x,y]
        xy = me.marks[ret.from];
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
          xy = me.marks[ret.to];
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
      s = this.getLayoutLine(i-1);
      for (j=1; j<=s.length; ++j) {
        var cell = this.xyToMarks[`${j}_${i}`];
        if (cell) cell = `<mark>${cell}</mark>`; else cell = s[j-1];
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
    //console.log(buf.text());
    return buf;
  }

  genInnerSVG(buf, origX, origY, ignoreStyle) {
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
    shiftX += this.shiftX;
    shiftY += this.shiftY;
    var pgm = this._compile(), gw = this.gridW, gh = this.gridH, hw = gw/2;
    if (!ignoreStyle && this.styleBlock)
      buf.w('<style>', this.styleBlock, '</style>');
    for (var i in pgm) {
      var inst = pgm[i], x, y, x2, y2, dx, dy, shft, extra;
      switch(inst.act) {
      case LINE:
        shft = this.getShifting(inst.from[0], inst.from[1]);
        dx = shft && shft[0] || 0;
        dy = shft && shft[1] || 0;
        x = (shiftX + dx + inst.from[0]) * gw + gh/2;
        y = (shiftY + dy + inst.from[1]) * gh;
        if (!inst.to[2]) { // absolute; check its own shifting
          shft = this.getShifting(inst.to[0], inst.to[1]);
          dx = shft && shft[0] || 0;
          dy = shft && shft[1] || 0;
        } // otherwise, it is relative, just shift with from
        x2 = (shiftX + dx + inst.to[0])  * gw + gh/2;
        y2 = (shiftY + dy + inst.to[1])  * gh;
        extra = inst.extra || ' style="stroke:black;stroke-width:1px"';
        buf.w(`<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" ${extra}/>\n`);
        break;
      case TEXT:
        shft = this.getShifting(inst.x, inst.y);
        dx = shft && shft[0] || 0;
        dy = shft && shft[1] || 0;
        x = (shiftX + dx + inst.x) * gw;
        y = (shiftY + dy + inst.y) * gh + gh/4;
        extra = inst.extra || '';
        buf.w(`<text x="${x}" y="${y}" ${extra}>${inst.text}</text>\n`);
        break;
      }
    }
  }

} // end of GridPerfect.

// Singleton, with UI support
var gpRepo = new (class extends ResourceRepo {
  setElidTOC(id) { this.elidTOC = id; return this; }
  setElidStage(id) { this.elidStage = id; return this; }
  showDiagram(name, elid, design) {
    if (!name) {
      name = localStorage.getItem('cur');
      if (name && name.endsWith('*')) {
        design = true;
        name = name.substring(0,name.length-1);
      }
    }
    var rsc = name && gpRepo.run(name, design);
    if (rsc) {
      if (typeof rsc == 'string') renderText(elid || this.elidStage || document, rsc);
      else rsc.render(elid || this.elidStage || document);
      this.showTOC(name, design);
    }
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
      if (nameSet[item.name]) continue;
      nameSet[item.name] = true; // avoid dups for aliased ones.
      var c = item.category || '其他';
      var a = categories[c];
      if (!a) categories[c] = a = [];
      a.push(item.name);
    }
    var catNames = ['基本','唯識','大乘','小乘','戒律','其他'],
        buf = new Buffer('<center><table border=0 style="min-width:750px">');
    for (var i in catNames) {
      var c = catNames[i], names = categories[c];
      if (!names) continue;
      buf.w(`<tr><td valign=top nowrap>${c}：&nbsp;</td><td>`);
      for (var j=0; j<names.length; ++j) {
        var n = names[j], rsc = gpRepo.get(n),
            alias = rsc.alias && ('/' + rsc.alias.join('/')) || '',
            diagLnk = jslnk(`gpRepo.showDiagram('${n}')`, n+alias),
            designLnk = '<sub>' + jslnk(`gpRepo.showDiagram('${n}',null,1)`, '🔍') + '</sub>';
        if (n == cur)
          buf.w(design ? `<u style="background-color:yellow">${diagLnk}</u>　`
                       : `<b style="color:red">${n}${alias}</b>${designLnk}`);
        else
          buf.w(diagLnk, designLnk, ' ');
      }
      buf.w(`</td></tr>`);
    }
    buf.w('</table><hr></center>').render(this.elidTOC);
  }

  show() { this.showTOC(); this.showDiagram(); }
})();

function getGP(name) {
  var item = gpRepo.get(name);
  if (!item) throw `Requested diagram ${name} is not found.`;
  return item.gp;
}

function cloneGP(name) { return getGP(name).clone(); }

function addGP(name, gp, category) {
  gpRepo.add(new GridPerfectItem(name, gp).setCategory(category));
  return gp;
}

function createGP(name, category, cfg) {
  var gp = new GridPerfect(cfg || gpRepo.config);
  addGP(name, gp, category);
  return gp;
}
