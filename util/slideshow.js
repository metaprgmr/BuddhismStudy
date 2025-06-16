var curShow; // singleton
var TEST_SPEED = 1;

function isReal() { return TEST_SPEED == 1; }

function toTimeDisp(secs, plain) {
  var ret = '';
  var hrs = Math.floor(secs / 3600);
  if (hrs > 0) ret = hrs + ':';
  else secs = secs % 3600;
  var mins = Math.floor(secs / 60).toFixed(0);
  if (mins < 10) ret += plain ? '0' : '<inv>0</inv>';
  ret += mins + ':';
  secs = (secs % 60).toFixed(0);
  if (secs == 60) secs = '59';
  else if (secs < 10) ret += '0';
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
    this.stageHeight = cfg.stageHeight || 500;
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

    // silently default to manual started mode
    this._startShow();
    this.addKeyHandler();
  }

  setSlideCallback(cb) { this.slideCallback = cb; return this; }

  addSlide(content, time, topPortion) { return this.add(content, time, topPortion); } // alias

  add(content, time, topPortion, stopClock) {
    // content: can be string (as HTML) or function(this)
    //    time: from the start, in seconds
    if (!time || time < 0 || this.slides.length == 0) time = 0;
    this.slides.push({ content, at:toSecs(time), topPortion, stopClock });
    return this;
  }

  setToLast(vals) {
    if (typeof vals == 'object') {
      var n = this.slides[this.slides.length-1];
      n && Object.assign(n, vals);
    }
    return this;
  }

  addSlideGroup(before, action, list, leading, topPortion) {
    for (var i=0; i<list.length; ++i) {
      var l = list[i], id, idx = l.indexOf('#');
      if (idx >= 0) {
        id = l.substring(0,idx).trim();
        l = l.substring(idx+1).trim();
      }
      l = l.split(',');
      var ts = l[0], fo = l[1], txt = (leading || '') + '<table>';
      for (var j=0; j<list.length; ++j) {
        l = list[j];
        l = l.split(',');
        var todo = l[2] || action;
        if (j == i) {
          if (!before)
            txt += `<tr><td nowrap width="460px"><nian><red>${l[1]}</red></nian><dong>${todo}</dong></td></tr>`;
          else
            txt += `<tr><td valign="top"><nian>${before}</nian></td><td nowrap width="460px">` +
                   `<nian><red>${l[1]}</red></nian><dong>${todo}</dong></td></tr>`;
        } else {
          if (!before)
            txt += `<tr><td nowrap style="opacity:0.4">${l[1]}</td></tr>`;
          else
            txt += `<tr><td>&nbsp;</td><td nowrap style="opacity:0.4">${l[1]}</td></tr>`;
        }
      }
      this.add(txt + '</table>', ts, topPortion);
      id && this.setToLast({id});
    }
    return this;
  }

  showNext(delta) {
    var len = this.slides.length;
    if (!delta) delta = 1;
    if (delta < 0 && this.showPtr <= 0) {
      this.showPtr = len-1;
      delta = 0;
    }
    var next = this.slides[this.showPtr+delta];
    if (!next) return;
    if (next.stopClock) this.stopClock = true;
    this.showPtr += delta;
    {
      var txt = toTimeDisp(this.slides[this.showPtr].at,true) + ',';
      if (this.showPtr < len-1)
        txt += toTimeDisp(this.slides[this.showPtr+1].at,true);
      else
        txt += '     ';
      console.log(`[${txt})【第${this.showPtr+1}/${len}步】${next.id||''}`);
    }
    if (typeof next.content == 'function')
      e(this.contentId).innerHTML = next.content();
    else {
      const pillar = '<td height="${this.stageHeight}" rowspan="2" style="opacity:0">1</td>';
      var c = next.content;
      if (c) {
        if (next.topPortion)
          c = `<table border=0 cellspacing=0 cellpadding=0>` +
              `<tr>${pillar}<td align=center valign=top nowrap height="1">${next.topPortion}</td>` +
              `${pillar}</tr>` +
              `<tr><td align=center nowrap>${c}</td></tr></table>`;
        e(this.contentId).innerHTML = c;
      }
    }
    if (this.slideCallback) this.slideCallback(next);
  }

  showPrev() { this.showNext(-1); }

  _checkShowPtrFromAudio(curSecs) {
    var len = this.slides.length, ptr = this.showPtr;
    if (ptr < 0 || ptr>=len) ptr = Math.floor(len/2);
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
        if (!nxt) return 0;
        if (nxt.at < curSecs) return ptr-1;
      }
      return -1;
    }
  }

  _getDurSecs() {
    if (this.audioStarted) return this.audioTime;
    // audio has ended; continue with timer
    return this.audioTime + (Date.now() - this.timerStart) / 1000;
  }

  _checkAndShowNext() { // only used in automatic mode
    var next = this.slides[this.showPtr+1],
        durSecs = this._getDurSecs(),
        ptr = this._checkShowPtrFromAudio(durSecs);
    if (this.VERBOSE) {
      var intvl = '[', txt;
      var n = curShow.slides[ptr];
      var txt = n && n.id || '';
      if (n) intvl += toTimeDisp(n.at,1);
      intvl += ' - ';
      n = curShow.slides[ptr+1];
      if (n) intvl += toTimeDisp(n.at,1);
      intvl += '] ' + txt;
      console.log(toTimeDisp(durSecs,1), 'ptr:', ptr, 'showPtr:', this.showPtr, intvl);
    }
    if ((ptr != this.showPtr) && (ptr >= 0)) {
      this.showPtr = ptr-1;
      this.showNext();
    }

    var el = e(this.msgbarId);
    if (el && (el.style.display == 'block')) {
      var tm = toTimeDisp(durSecs);
      var pad = '';
      for (var i=tm.length; i<7; ++i) pad += ' ';
      if (pad.length > 0) tm = `<inv>${pad}</inv>${tm}`;
      el.innerHTML = `${tm}　　　　　　　占察懺畢。大衆自修。　　　　　　${tm}`;
    }
  }

  addKeyHandler() { if (!this.kbSet) { document.addEventListener("keydown", this._keypress, false); this.kbSet = true; } }
  removeKeyHandler() { if (this.kbSet) { document.removeEventListener("keydown", this._keypress); this.kbSet = false; } }

  startManual() {
    this._stopTimer();
    this._startShow();
    this.showNext();
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

  _startShow() { this.showPtr = -1; }

  _timerHandler() {
    if (curShow.stopClock) curShow._stopTimer();
    else if (!curShow.audioStarted) curShow._checkAndShowNext();
  }

  _startTimer() {
    if (!this.timer) {
      this.timer = setInterval(this._timerHandler, 300);
      console.log("Timer started.");
    }
    this.timerStart = Date.now();
  }
  _stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      delete this.timer;
      delete this.timerStart;
      delete this.stopClock;
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

