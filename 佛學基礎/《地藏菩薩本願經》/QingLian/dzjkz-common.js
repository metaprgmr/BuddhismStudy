console.log('TODO: 序(orig/dzjkz0.txt) and 跋(orig/dzjkz7.sgml) yet to be done.');


const bookSrc   = "卍新纂大日本續藏經 第21冊 No.384";
const bookLink  = 'https://cbetaonline.dila.edu.tw/zh/X0384';
const authors   = '古鹽匡菴　青蓮苾芻　靈椉父　輯';
const titleBase = '地藏菩薩本願經科注';

function w() { for(var i in arguments)document.write(arguments[i]) }
function get(name) {
 if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
   return decodeURIComponent(name[1]);
}
var nokp = get('nokp');

const PIN_TITLE = -2;
class LineInfo {
  constructor(type, txt, pin, verseNum) {
    this.type = type;
    this.txt = txt;
    this.pin = pin;
    if (verseNum === PIN_TITLE) this.isPinTitle = true;
    if (!this.isPinTitle) this.verseNum = verseNum;
  }
  isKePan() { return (this.type === 'KEPAN'); }
  isVerse() { return (this.type === 'VERSE') && this.verseNum; }
  toDisp() {
    var vnum = this.isVerse() ? ('【' + this.pin + '.' + this.verseNum + '】&nbsp;') : '';
    var ret = '<p class=' + this.type + '>' + vnum + this.txt + '</p>';
    if (this.isPinTitle) {
      var anchor = `品${this.pin}`;
      ret = `<a name="${anchor}" id="${anchor}">${ret}</a>`;
    }
    return ret;
  }
  addToVerseView(obj) { if (this.isVerse() && this.pin) obj.addForView(this.pin, this.verseNum, this.txt); }
}

class Pin {
  constructor(pinNum) {
    this.pinNum = pinNum;
    this.lines = [];
    if (pinNum) this._verseNum = 1; // for parsing
  }
  add(lnInfo) { this.lines.push(lnInfo); }
}

class Volume {
  constructor(volNum, txt) {
    this.volNum = volNum;
    this.pins = [];
    this.curPin = null;
    this.parse(txt);
  }
  getCurPin(pinNum) {
    if (!this.curPin || this.curPin.pinNum != pinNum) {
      this.curPin = new Pin(pinNum);
      this.pins.push(this.curPin);
    }
    return this.curPin;
  }
  parse(txt) {
    if (!txt) return;
    var me = this, a = txt.split('\n'), pinNum;
    function addLn(ln, pref, type) {
      if (!ln.startsWith(pref)) return false;
      ln = ln.substring(pref.length);
      var isPinTitle = false;
      if (type === 'VERSE') {
        var idx = ln.indexOf('品第');
        isPinTitle = (idx > 0 && idx >= ln.length-4);
        if (isPinTitle) pinNum = ln.substring(idx+2);
      }
      var pinObj = me.getCurPin(pinNum);
      if ((type === 'VERSE') && !ln.startsWith('唐于闐國') && !isPinTitle)
        pinObj.add(new LineInfo(type, ln, pinObj.pinNum, pinObj._verseNum++));
      else
        pinObj.add(new LineInfo(type, ln, pinObj.pinNum, isPinTitle ? PIN_TITLE : undefined));
      return true;
    }
  
    if (window['onlyVerse']) {
      for (var i in a)
        addLn(a[i], '===== ', 'VERSE');
    } else {
      for (var i in a) {
        var ln = a[i];
        !addLn(ln, '--------- △', 'KEPAN') &&
        !addLn(ln, '--------- ' , 'TEXT')  &&
        !addLn(ln, '===== ',      'VERSE') &&
        !addLn(ln, '',            'TEXT');
      }
    }
  }
}

var VOLUMES = [];
