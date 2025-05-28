var curShow; // singleton

function toTimeDisp(secs) {
  secs = secs % 3600; // only mins:secs
  var mins = Math.floor(secs / 60);
  secs = Math.floor(secs - mins * 60);
  var ret = '';
  if (mins < 10) ret += '<inv>0</inv>';
  ret += mins + ':';
  if (secs < 10) ret += '0';
  return ret + secs;
}

function toSecs(time) {
  if (typeof time == 'number') return time;
  // time is string
  var a = time.split(':'), ret = parseInt(a[a.length-1]), factor = 60;
  for (var i=2; i<=a.length; ++i) {
    ret += factor * a[a.length-i];
    factor *= 60;
  }
  return ret;
}

class SlideShow {
  constructor(elid, audioId, singleAudio) {
    curShow = this;
    this.elid = elid;
    this.audioId = audioId;
    this.singleAudio = singleAudio;
    this.defaultDur = 5;
    this.slides = [];
    this.addKeyHandler();
  }

  setAllAbs() { this.allAbs = true; return this; }

  setSlideCallback(cb) { this.slideCallback = cb; return this; }

  add(content, time, isAbs) { return this.addSlide(content, time, isAbs); } // alias

  addSlide(content, time, isAbs) { // content: can be string (as HTML) or function(this)
                                   //    time: in seconds
                                   //   isAbs: time = isAbs ? (relative to start) : (a duration)
    if (!time || (time < 0)) time = this.defaultDur;
    else time = toSecs(time);
    var ss;
    if (this.slides.length == 0) // for first, time must be duration
      this.slides.push({ content, dur:time, at:0 });
    else if (this.allAbs || isAbs)
      this.slides.push({ content, at:time });
    else
      this.slides.push({ content, dur:time });
    return this;
  }

  addSlideGroup(before, action, list, leading) {
    for (var i=0; i<list.length; ++i) {
      var l = list[i].split(',');
      var ts = l[0], fo = l[1], txt = (leading || '') + '<table>';
      for (var j=0; j<list.length; ++j) {
        l = list[j];
        l = l.split(',');
        var todo = l[2] || action;
        if (j == i) {
          if (!before)
            txt += `<tr><td nowrap width="460px"><nian><red>${l[1]}</red></nian><dong>${todo}</dong></td></tr>`;
          else
            txt += `<tr><td valign="top"><nian>${before}</nian></td><td nowrap width="460px"><nian><red>${l[1]}</red></nian><dong>${todo}</dong></td></tr>`;
        } else {
          if (!before)
            txt += `<tr><td nowrap style="opacity:0.4">${l[1]}</td></tr>`;
          else
            txt += `<tr><td>&nbsp;</td><td nowrap style="opacity:0.4">${l[1]}</td></tr>`;
        }
      }
      this.add(txt + '</table>', ts);
    }
    return this;
  }

  showNext(delta) {
    if (!delta) delta = 1;
    var next = this.slides[this.showPtr+delta];
    if (!next) return;
    this.showPtr += delta;
    if (typeof next.content == 'function')
      e(this.elid).innerHTML = next.content();
    else {
      var c = next.content;
      if (c) e(this.elid).innerHTML = c;
    }
    this.lastStart = Date.now();
    if (this.slideCallback) this.slideCallback(next);
  }

  showPrev() { this.showNext(-1); }

  checkAndShowNext() {
    var next = this.slides[this.showPtr+1];
    var curts = Date.now();
    var durSecs = (curts - this.pausedPeriod - this.startedAt) / 1000;
    if (!next) { // end reached
       this.startedAt = Date.now();
    } else if (next.at) { // absolute
      if (durSecs >= next.at)
        this.showNext();
    } else { // relative
      var cur = this.slides[this.showPtr];
      if (curts - this.lastStart >= cur.dur * 1000)
        this.showNext();
    }
    if (this.clockId) {
      var el = e(this.clockId);
      el && (el.innerHTML = toTimeDisp(durSecs));
    }
  }

  pause(exit) {
    if (!this.timer) return; // only for auto-pilot
    var a = e(this.audioId);
    if (a) {
      if (exit) {
        this.pausedPeriod = Date.now() - this.pausedAt;
        a.play();
      } else {
        this.pausedAt = Date.now();
        a.pause();
      }
    }
  }

  addKeyHandler() { if (!this.kbSet) { document.addEventListener("keydown", this._keypress, false); this.kbSet = true; } }
  removeKeyHandler() { if (this.kbSet) { document.removeEventListener("keydown", this._keypress); this.kbSet = false; } }
  startTimer() {
    if (!this.timer) this.timer = setInterval(this._timerHandler, 500);
    this.startedAt = Date.now();
    this.lastStart = this.startedAt;
  }
  stopTimer() {
    if (this.timer) { clearInterval(this.timer); delete this.timer; }
    this._stopSingleAudio();
  }

  startManual() {
    this.stopTimer();
    console.log('Starting manual show. Use SPACE or Right-Arrow to go forward, and Left-Arror to go backward.');
    this._startShow();
    this.addKeyHandler();
  }

  startAutoPilot(clockId) {
    if (clockId) this.clockId = clockId;
    this.removeKeyHandler();
    this.stopTimer();
    console.log('Starting auto-pilotting,', clockId ? 'with' : 'without', 'time display.');
    this._startShow();
    this._startSingleAudio();
    this.startTimer();
  }

  _startSingleAudio() {
    if (!this.singleAudio || !this.audioId) return;
    var a = e(this.audioId);
    a.style.display = 'block';
    a.src = this.singleAudio;
    a.play();
  }

  _stopSingleAudio() {
    var a = e(this.audioId);
    a.style.display = 'none';
    a.pause();
    a.currentTime = 0;
  }

  _startShow() {
    this.showPtr = -1;
    this.pausedPeriod = 0;
    this.showNext();
  }

  _timerHandler() { // uses the global singletone curShow.
    curShow.checkAndShowNext();
  }

  _keypress(event) { // uses the global singletone curShow.
    event.preventDefault();
    var isShift = event.shiftKey;
    var isAlt   = event.altKey;
    var isCtrl  = event.ctrlKey;
    //console.log(`${event.keyCode} ${isShift?'[shift]':''}${isAlt?'[alt]':''}${isCtrl?'[ctrl]':''}`);

    switch (event.keyCode) {
    case  38: // up
    case 104: // ^ 8 ⊞
      curShow.showPrev(); break;
    case  40: // down
    case  98: // v 2 ⊞
    case  32: // space
      curShow.showNext(); break;
/*
    case  13: // enter
    case  32: // space
    case  33: // pgup
    case  34: // pgdown
    case  35: // end
    case  36: // home
    case  37: // left
    case  38: // up
    case  39: // right
    case  40: // down
    case  48: // 0
    case  61: // = +
    case  96: // 0   ⊞
    case  98: // v 2 ⊞
    case 100: // < 4 ⊞
    case 102: // > 6 ⊞
    case 104: // ^ 8 ⊞
    case 107: // +   ⊞
*/
    }
  }

} // end of SlideShow.
