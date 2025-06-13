var curShow; // singleton
var TEST_SPEED = 1;

function isReal() { return TEST_SPEED == 1; }

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
  var a = time.split(':'), ret = parseFloat(a[a.length-1]), factor = 60;
  for (var i=2; i<=a.length; ++i) {
    ret += factor * a[a.length-i];
    factor *= 60;
  }
  return ret;
}

class SlideShow {
  constructor(cfg) {
    // environment
    this.contentId   = cfg.contentElid;
    this.audioId     = cfg.audioElid;
    this.singleAudio = cfg.singleAudio;
    this.btnManualId = cfg.btnManualElid;
    this.btnAutoId   = cfg.btnAutoElid;
    this.msgbarId    = cfg.msgbarElid;

    // init internals
    this.audioTime = 0;
    this.slides = [];

    // Add event handlers
    this.addKeyHandler();
    var a = this.audioId && e(this.audioId);
    if (a) {
      a.src = this.singleAudio;
      a.addEventListener('play', audioStartedHandler);
      a.addEventListener('ended', audioEndHandler);
      a.addEventListener('timeupdate', audioTimeHandler);
    }

    curShow = this; // global single to this.
  }

  setSlideCallback(cb) { this.slideCallback = cb; return this; }

  add(content, time) { return this.addSlide(content, time ); } // alias

  addSlide(content, time) { // content: can be string (as HTML) or function(this)
                            //    time: from the start, in seconds
    if (!time || time < 0 || this.slides.length == 0) time = 0;
    this.slides.push({ content, at:toSecs(time) });
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
    console.log(' >>> Showing slide', this.showPtr, '/', this.slides.length);
    if (typeof next.content == 'function')
      e(this.contentId).innerHTML = next.content();
    else {
      var c = next.content;
      if (c) e(this.contentId).innerHTML = c;
    }
    if (this.slideCallback) this.slideCallback(next);
  }

  showPrev() { this.showNext(-1); }

  _checkShowPtrFromAudio(curSecs) {
    var len = this.slides.length, ptr = this.showPtr;
    if (ptr < 0 || ptr>=len) ptr = len/2;
    var cur = this.slides[ptr], nxt;
    if (!cur) return -1;
    if (curSecs >= cur.at) {
      for (; ptr<len; ++ptr) {
        nxt = this.slides[ptr+1];
        if (!nxt || nxt.at > curSecs) return ptr;
      }
      return -1;
    }
    else {
      for (; ptr>0; --ptr) {
        nxt = this.slides[ptr-1];
        if (!nxt || nxt.at < curSecs) return ptr;
      }
      return -1;
    }
  }

  _checkAndShowNext() { // only used in automatic mode
    var next = this.slides[this.showPtr+1];
    var durSecs = this.audioTime;
    if (!this.audioStarted) // audio has ended; continue with timer
      durSecs += (Date.now() - this.timerStart) / 1000;

    var ptr = this._checkShowPtrFromAudio(durSecs);
    if ((ptr != this.showPtr) && (ptr >= 0)) {
      this.showPtr = ptr-1;
      this.showNext();
    }

    var el = e(this.msgbarId);
    if (el && (el.style.display == 'block')) {
      var tm = toTimeDisp(durSecs);
      el.innerHTML = `${tm}　　　　　　　占察懺畢。大衆自修。　　　　　　${tm}`;
    }
  }

  addKeyHandler() { if (!this.kbSet) { document.addEventListener("keydown", this._keypress, false); this.kbSet = true; } }
  removeKeyHandler() { if (this.kbSet) { document.removeEventListener("keydown", this._keypress); this.kbSet = false; } }

  startManual() {
    this._stopTimer();
    this._startShow();
    this.addKeyHandler();
    var el = e(this.msgbarId);
    if (el)
      el.innerHTML = '占察懺，手工模式進行中&nbsp;';
    console.log('Starting manual show. Use SPACE or Right-Arrow to go forward, and Left-Arror to go backward.');
  }

  startAutoPilot() {
    this.removeKeyHandler();
    // Prepare UI
    showEl(this.audioId);
    hideEl(this.btnManualId);
    hideEl(this.btnAutoId);
    hideEl(this.msgbarId);

    // Start it
    this._startShow();
    this._startSingleAudio();
    console.log('Starting auto-pilotting.');
  }

  audioEnded() {
    this.audioStarted = false;
    // Update UI
    hideEl(this.audioId);
    showEl(this.msgbarId);

    // Start the timer to continue after the audio
    this._startTimer();
  }

  _startSingleAudio() {
    if (!this.singleAudio || !this.audioId || TEST_SPEED != 1) return;
    var a = e(this.audioId);
    if (a) {
      showEl(a);
      a.src = this.singleAudio;
      a.play();
    }
  }

  _stopSingleAudio() {
    var a = e(this.audioId);
    a.style.display = 'none';
    a.pause();
    this.audioStarted = false;
  }

  _startShow() {
    this.showPtr = -1;
    this.showNext();
  }

  _timerHandler() { if (!this.audioStarted) curShow._checkAndShowNext(); }

  _startTimer() {
    if (!this.timer) {
      this.timer = setInterval(this._timerHandler, 500);
      console.log("Timer started.");
    }
    this.timerStart = Date.now();
  }
  _stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      delete this.timer;
      delete this.timerStart;
      console.log("Timer cleared.");
    }
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

function audioStartedHandler(event) {
  console.log('Audio started playing');
  curShow._stopTimer();
  curShow.audioTime = 0;
  curShow.audioStarted = true;
}

function audioEndHandler(event) {
  console.log('Audio playing finished');
  curShow.audioEnded();
  curShow.audioStarted = false;
}

function audioTimeHandler(event) {
  //console.log('Current time:', event.target.currentTime);
  curShow.audioTime = event.target.currentTime;
  curShow._checkAndShowNext();
}

