/*
 * WORK: 
 */

function getUrlParams() { var p = window.location.search; return new URLSearchParams(p.startsWith('?') ? p.substring(1) : p); }
function error(msg) { console.log(msg); }
function w() { for (var i=0; i<arguments.length; ++i) document.write(arguments[i]) }
function setContent(elemId, content) { document.getElementById(elemId).innerHTML = content }
function isLowerCase(s) { return s == s.toLowerCase() && !s.startsWith('(') }
function getGlobal(varName) { return window[varName] }
function toLangName(lang) { var ret = LANGUAGES[lang]; return ret || lang}
function notNull(val, defVal) { return (val == null) ? defVal : val; }
function showRef(uri, id) { window.open(`${uri}&id=${id}#${id}_ref`); }
function loadCSS(cssId, uri) {
  if (document.getElementById(cssId)) return;
  const el = document.createElement('link');
  el.id    = cssId;
  el.rel   = 'stylesheet';
  el.type  = 'text/css';
  el.href  = uri;
  el.media = 'all';
  document.getElementsByTagName('head')[0].appendChild(el);
}
function loadScriptsInOrder(arrayOfJs) {
  const promises = arrayOfJs.map(url =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = url;
      script.addEventListener('load', () => resolve(true));
      script.addEventListener('error', reject);
      document.head.appendChild(script);
    }));

  return promises.reduce((p, c) => p.then(() => c.then(result => result)),
    Promise.resolve([])
  );
}

//
// ----- start -----
//

w(`
<body><div class="container">
  <center>
    <table width=1000 border=0>
    <tr><td align=center><div id="caption"></div></td></tr>
    <tr><td><div id="view"></div></td></tr>
    </table>
  </center>
</div>
<div class="fixed-footer">
  <div class="container"><center><div id="footer"> <a href="">&sqcap;</a> </div></center></div>
</div>`);

const NAVDIV = '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'
const MARGIN = 5;
const INDENT = 25;
const LANGUAGES = { 'en': 'English', 'fr': 'Français' };
const NO_NAME_CHAPTER = '&square;';
const NO_NAME_USE_NICKNAME = '??nickname??';
const NOTE_MARK = '<sup class="see">&lt;note&gt;</sup>'
const QUESTION_MARK = '<sup class="see">&lt;?&gt;</sup>';

const _MODE_READ      = '';
const _MODE_TEXTS     = 't';
const _MODE_QUESTIONS = 'q';
const _MODE_HILITE2   = '2';
const _MODE_ALL       = 'a';
const _MODE_SUBTITLES = 'st';
const _MODE_REFERENCE = 'ref';
const _MODE_VOCABULARY = 'v';

var book;

function getReadParams() {
  var params = getUrlParams();
  var x, ret = {};
  x = params.get('book'); if (x != null) ret.bookName = x;
  x = params.get('num');  if (x != null) ret.chNumDisp = x;
  x = params.get('unit'); if (x != null) ret.unitDisp = x;
  x = params.get('id');   if (x != null) ret.refId = x;
  x = params.get('mode'); ret.mode = x || _MODE_READ;
  return ret;
}

function createBibleBook(isOT, bk) { // just attach methods and initialize optional fields
  return createBook(bk, {
    "unitName": 'verse',
    "isBible":  true,
    "isOT":     isOT,
  });
}

function createQuranBook(bk) { // just attach methods and initialize optional fields
  return createBook(bk, {
    "unitName": 'verse',
    "isQuran":   true,
  });
}

function createBook(bk, extra) { return new ParallelBookInfo(bk, extra); }

var ParallelBookInfo = // name-scope 
(() => {
////////////////////////////////////////////////////////////////////////////////////////////////
//
class PBI {
  constructor(bk, extra) {
    Object.assign(this, bk);
    extra && Object.assign(this, extra);
    this.semoi = !!window['SEMOI'];

    // check required fields
    this.ensureValue('id', null, true);
    this.ensureValue('title', null, true);
    this.ensureValue('chapter_count', null, true);

    this.ensureValue('chapter_offset', 0);
    this.ensureValue('addedTitles', {});
    this.ensureValue('langs', ["en"]);
    this.ensureValue('notes', {});
    this.ensureValue('words', {});

    // declare reading parameters
    this.ensureValue('bookName');
    this.ensureValue('mode');
    this.ensureValue('refId'); // if mode == _MODE_REFERENCE
    this.ensureValue('curChIdx');
    this.ensureValue('curUnitIdx');
    this.ensureValue('lang0');
    this.ensureValue('lang1');
    this.ensureValue('chapterNavLinks');
    this.ensureValue('bookStatsLinks');
  }

  ensureValue(name, val, required) {
    if (this[name]) return;
    if (val != null) this[name] = val;
    else if (required) alert('Required field "' + name + '" is not set.');
  }

  // The bkName is needed only for a generic reader where ?book= is necessary to indicate a particular book
  // The mapping from bkName to bk is up to the caller to provide.
  // In most cases, we are reading a definitive book, and bkName is left as null.
  render(readParams) {
    book = this;
    this.bookName = readParams.bookName;
    this._prepareBook();

    this.mode = readParams.mode;
    this.refId = readParams.refId;
    this.curChIdx = this.toChapterNumberInternal(readParams.chNumDisp);
    this.curUnitIdx = (readParams.unitDisp == null) ? null : (readParams.unitDisp-1);
    this.lang0 = this.langs[0];
    this.lang1 = this.langs[1];

    switch (this.mode) {
    case _MODE_READ:      this._renderBook(this.curChIdx); break;
    case _MODE_HILITE2:
    case _MODE_QUESTIONS:
    case _MODE_TEXTS:
    case _MODE_SUBTITLES:
    case _MODE_ALL:       this._renderHilited(); break;
    case _MODE_REFERENCE: this._renderReferences(); break;
    default:  alert(`Mode "${readParams.mode}" not wired yet.`);
    }
  };

  // isReferencesPagefunction() => boolean
  isReferencesPage() { return this.mode == _MODE_REFERENCE; }

  // _prepareBook() -- postprocess the data right before rendering
  _prepareBook() {
    if (this._prepared) return;

    // extract subtitles, if any
    for (var i=0; i<this.chapter_count; ++i) {
      var lines = this.getLines(i);
      for (var j=0; j<lines.length; ++j) {
        var line = lines[j];
        if (typeof line == 'string') lines[j] = line = line.replaceAll(' -- ', '&ndash;');
        if (line.startsWith('<subtitle>')) {
          var unitId = this.getUnitId(i, j);
          var taglen = '<subtitle>'.length;
          var idx = line.indexOf('</subtitle>', taglen);
          if (idx < 0) { alert(`Missing </subtitle> for ${unitId}.`); continue; }
          lines[j] = line.substring(idx + taglen + 1).trim();
          this.addedTitles[unitId] = line.substring(taglen, idx).trim();
        }
      }
    }

    this._prepared = true;
  };

  getDefaultLang() { return this.langs[0]; }

  addNotes(notes, override) { if (this.semoi) _processNotes(notes, override, this.notes); }

  addWords(newWords, lang) { this.words[notNull(lang, this.getDefaultLang())] = newWords; }

  getTitle(lang) {
    if (typeof this.title == 'string') return this.title;
    return this.title[lang ? lang : this.getDefaultLang()];
  };

  getTitleOnHeader() { var ret = this.titleOnHeader; return ret ? ret : this.getTitle().toUpperCase(); };

  // depends on 'bookName' as well
  toUriParams(chIdx, extra) {
    var ret = '?';
    if (this.bookName) ret += 'book=' + this.bookName;
    if (chIdx != null) ret += (ret == '?' ? 'num=' : '&num=') + this.toChapterNumberDisplay(chIdx);
    if (extra) ret += (ret == '?' ? '' : '&') + extra;
    return ret;
  }
  toModeUri(mode, chIdx) { return this.toUriParams(chIdx, 'mode='+mode); }

  // => int; opposite of the below
  toChapterNumberInternal(chNumDisp) { return (chNumDisp == null) ? null : (parseInt(chNumDisp) - 1 + this.chapter_offset); }

  toChapterNumberDisplay(chIdx, noNameDisp, numPrefix) {
    var info = this.getChapterInfo(chIdx);
    if (info && info.ignoreChapterNumber) {
      if (noNameDisp != null) {
        if (noNameDisp == NO_NAME_USE_NICKNAME)
          return info.nickname ? info.nickname : NO_NAME_CHAPTER;
        else
          return noNameDisp;
      }
    }
    info = chIdx - this.chapter_offset + 1;
    return numPrefix ? (numPrefix + info) : info;
  }

  getUnitName() { return this.unitName ? this.unitName : 'paragraph' }

  getCurChapterLineCount() { return (this.curChIdx == null) ? null : this.getLines(this.curChIdx).length; }

  getLines(chIdx, lang) {
    if (!lang) lang = this.getDefaultLang();
    var lines = this[`lang_${lang}`];
    if (lines) return lines[chIdx];
    return this[`chapter_${chIdx+1}_${lang}`]; // legacy say, for some bible T(N)K books.
  }

  // chIdx is 0-based
  getChapterTitle(chIdx, lang) {
    try {
      if (!lang) lang = this.getDefaultLang();
      var ch = this.chapter_titles[chIdx];
      return (typeof ch == 'string') ? ch : ch[lang];
    } catch(e) {}
    return null;
  }

  // => { "ignoreChapterNumber", "en", ... }
  getChapterInfo(chIdx) {
    var ch = {};
    try {
      var ch = this.chapter_titles[chIdx];
      if (typeof ch == 'object') return ch;
      ch[this.getDefaultLang()] = ch;
    } catch(e) {}
    return ch;
  }

  // => `string (x:y)`
  getUnitId(chIdx, unitIdx) { return `${this.toChapterNumberDisplay(chIdx)}:${unitIdx-(-1)}`; }

  // => { hiliteLevel, questionLevel, noteText, addedTitle }; both are 0-based
  getNote(chIdx, unitIdx) {
    var id = this.getUnitId(chIdx, unitIdx);
    var ret, subTitle = this.addedTitles[id];
    try {
      ret = this.notes[id];
    } catch(e) {}
    if (subTitle) {
      if (!ret) return { "addedTitle":subTitle };
      ret.addedTitle = subTitle;
    }
    return ret;
  }

  getChapterNoteCount(chIdx) {
    if (!this.notes) return 0;
    var prefix = this.toChapterNumberDisplay(chIdx) + ':';
    var keys = Object.keys(this.notes);
    var ret = 0;
    for (var i=0; i<keys.length; ++i)
      if (keys[i].startsWith(prefix)) ++ret;
    return ret;
  }

  // { addedTitles, all, hilite2, questions, noteTexts }
  countMarks() {
    var ret = { "addedTitles":0, "all":0, "hilite2":0, "questions":0, "noteTexts":0 };
    if (this.notes) {
      var values = Object.values(this.notes);
      for (var i=0; i<values.length; ++i) {
        var noteInfo = values[i];
        var a = _checkNote(noteInfo);
        if (a.hasText) ret.noteTexts++;
        if (a.has2) ret.hilite2++;
        if (a.hasQ) ret.questions++;
        if (a.has1 || a.has2 || a.hasQ || a.hasText) ret.all++;
      }
    }

    if (this.addedTitles)
      ret.addedTitles += Object.values(this.addedTitles).length;
    return ret;
  }

  // _toUnitLink(chIdx, unitIdx) => string
  // _toUnitLink(unitDisp) => string
  _toUnitLink(chIdx_or_unitDisp, unitIdx) {
    var chIdx;
    if (unitIdx != null) {
      chIdx = chIdx_or_unitDisp;
    } else {
      var sa = chIdx_or_unitDisp.split(':');
      chIdx = this.toChapterNumberInternal(sa[0]);
      unitIdx = parseInt(sa[1]) - 1;
    }

    var unitNum = unitIdx - (-1);
    return '<a href="' + this.toUriParams(chIdx, 'unit=' + unitNum) + '#_' + unitNum + '"><b>' +
           this.toChapterNumberDisplay(chIdx, NO_NAME_CHAPTER) + '</b>:' + unitNum + '</a>';
  }

  _renderHeader(chIdx, forHilited) {
    if (chIdx < 0) chIdx = null;
    if (forHilited)
      document.title = this.getTitle() + ' Highlited';
    else if (chIdx != null)
      document.title = this.getTitle() + ' ' + this.toChapterNumberDisplay(chIdx, NO_NAME_USE_NICKNAME, 'Ch.'); //  + '/' + this.chapter_count;
    else
      document.title = this.getTitle();
    if (this.lang1)
      document.title += ` (${this.lang1})`;

    var i, sum = 0;
    var desc = '';

    if (this.descriptions && this.descriptions.length > 0) {
      var title = `show descriptions${this.getChapterTitle(1) ? ' and TOC' : ''}`;
      desc = `&nbsp;<a href="${this.toUriParams()}" title="${title}">&dagger;</a>`;
    }

    var readUnitCount = 0;
    for (i=0; i<this.chapter_count; i++) {
      var len = this.getLines(i).length;
      sum += len;
      if (i < chIdx)
        readUnitCount += len;
    }

    var perRow = 30;
    var rowCnt = parseInt(this.chapter_count / perRow);
    if (rowCnt * perRow < this.chapter_count) ++rowCnt;

    var content = '<table border=0><tr><td rowspan=' + rowCnt + ' align=center valign=top style="padding-right:20px"><font size=+1 color=red><b>' +
                  this.getTitleOnHeader() + '&nbsp;&nbsp;</b></font><br><font size=-1 color=gray>';

    this.chapterNavLinks = '';
    var ci = this.curChIdx == null ? 0 : this.curChIdx;
    var disp = this.toChapterNumberDisplay(ci, NO_NAME_USE_NICKNAME, 'Ch.');
    var chTitle = ' title="' + this.toChapterNumberDisplay(ci, '', 'Ch.') + ' ' + this.getChapterTitle(ci) + '"';
    if (this.curChIdx == null) {
      this.chapterNavLinks += `<a href="${this.toUriParams(0)}"${chTitle}>${disp}</a>`;
    } else {
      if (this.curChIdx > 0)
        this.chapterNavLinks = `<a href="${this.toUriParams(this.curChIdx-1)}">&lArr;</a>&nbsp;&nbsp;`;
      this.chapterNavLinks += `<a href=""${chTitle}>${disp}</a>`;
      if (this.curChIdx < this.chapter_count-1)
        this.chapterNavLinks += '&nbsp;&nbsp;<a href="' + this.toUriParams(this.curChIdx-(-1)) + '">&rArr;</a>';
    }

    this.bookStatsLinks = '';
    var me = this, markStats = this.countMarks();
    function formLink(mode, ttl, txt, after) {
      return `<a href="${me.toModeUri(mode)}" title="${ttl||''}">${txt}</a>${after||''}`;
    }
    if (markStats.noteTexts > 0)
      this.bookStatsLinks += formLink(_MODE_TEXTS, "show note texts", markStats.noteTexts, '*&nbsp;');
    if (markStats.questions > 0)
      this.bookStatsLinks += formLink(_MODE_QUESTIONS, "show all questions", markStats.questions, '?&nbsp;');
    if (markStats.hilite2 > 0)
      this.bookStatsLinks += formLink(_MODE_HILITE2, "show all level-2 hilites", markStats.hilite2, '!!&nbsp;');
    if (markStats.all > 0)
      this.bookStatsLinks += formLink(_MODE_ALL, "show all hilites", markStats.all, '&nbsp;');
    if (markStats.addedTitles > 0)
      desc += '&nbsp;[' + formLink(_MODE_SUBTITLES, "show subtitles", markStats.addedTitles, ']');
    this.bookStatsLinks += `<span title="${sum} ${this.getUnitName()}'s in ${this.chapter_count} chapters">(${sum}/${this.chapter_count})</span>${desc}</font>`;

    content += this.bookStatsLinks + '</td>';

    readUnitCount = 0; // per chapter
    for (i=0; i<this.chapter_count; ++i) {
      var lines = this.getLines(i);
      var chNumDisp = this.toChapterNumberDisplay(i, NO_NAME_CHAPTER);
      readUnitCount += lines.length;
      content += '<td align=center valign=top>';

      var chTitle = this.getChapterTitle(i);
      var tooltip = (chTitle ? (chTitle+'\n') : '')  + '(cumulative: ' + readUnitCount + ')';

      if (i == chIdx)
        content += _wrap(chNumDisp, null, 'color:red; font-weight:bold', ' title="'+tooltip+'"');
      else if (lines && lines.length > 0)
        content += ' <a href="' + this.toUriParams(i) + '" title="' + tooltip + '">' + chNumDisp + '</a>';
      else
        content += ' <font color="gray">' + chNumDisp + '</font>';
      if (lines)
        content += '<br><font size=-1 color=gray>' + lines.length + '</font>';

      content += '</td>';
      if ((i>0) && (i % perRow == 0))
        content += '</td></tr><tr>';
    }
    setContent("caption", content + '</tr></table>');
  }

  _renderBook(chIdx) {
    this._renderHeader(chIdx, false);

    if (chIdx == null) {
      if (!this.descriptions.length) {
        this.mode = _MODE_READ;
        chIdx = this.curChIdx = this.toChapterNumberInternal('1');
      }
      else if (this._renderDescriptions())
        return;
      if (this.chapter_count == 1)
        chIdx = this.curChIdx = 0;
    }

    var content = '<br><table width="100%" style="border: 2px black solid" border=0 cellpadding=3 bgcolor="white">';
    if (this.lang1) { // two columns
      // The Title Row
      var caption0, caption1;
      try { caption0 = this.getChapterTitle(chIdx, this.lang0) } catch(e) {}
      try { caption1 = this.getChapterTitle(chIdx, this.lang1) } catch(e) {}
      if (!caption0) caption0 = this.getTitle(this.lang0);
      if (!caption1) caption1 = this.getTitle(this.lang1);
      var chNumDisp = this.toChapterNumberDisplay(chIdx, '&nbsp;');
      content += '<tr style="font-weight:bold" class="chapter_title"><td width=50% align=center style="border-bottom: 1px solid black">' +
                 caption0 + '</td><td align=center style="border-bottom: 1px solid black">' + chNumDisp + '</td>' +
                 '<td width=50% align=center style="border-bottom: 1px solid black">' + caption1 + '</td></tr>';

      // The Content
      var lines_lang0 = this.getLines(chIdx, this.lang0),
          lines_lang1 = this.getLines(chIdx, this.lang1),
          lastIndent1 = false,
          lastIndent2 = false;
      for (var i=0; i<lines_lang0.length; ++i) {
        var noteInfo = this.getNote(chIdx, i);
        var subTitle = noteInfo ? noteInfo.addedTitle : null;
        var txt1Info = this._analyzeText(lines_lang0[i], lastIndent1, this.isBible);
        var txt2Info = this._analyzeText(lines_lang1[i], lastIndent2, this.isBible);
        this._processWords(txt1Info, this.lang0, chIdx, i);
        this._processWords(txt2Info, this.lang1, chIdx, i);
        if (subTitle) {
          if (i > 0) {
            txt1Info.addedTitle = '<br>' + subTitle;
            txt2Info.addedTitle = '<br>&nbsp;';
          } else {
            txt1Info.addedTitle = subTitle;
            txt2Info.addedTitle = '&nbsp;';
          }
        }
        if (isLowerCase(txt1Info.text)) lastIndent1 = true;
        if (isLowerCase(txt2Info.text)) lastIndent2 = true;

        var txtStyle = ' style="padding-left:' + MARGIN + 'px; padding-right:' + MARGIN + '"';
        var curReadBG = (chIdx == this.curChIdx && i == this.curUnitIdx) ? ' bgcolor="#AAEEAA" ' : '';
        var unitNumStyle = 'color:gray';
        if (i > 0 && !lastIndent1 && !lastIndent2) unitNumStyle += '; border-top: 1px solid gray';
        content += '<tr><td valign=top' + txtStyle + '>' + this._procText(txt1Info, noteInfo) + '</td>' +
                   '<td valign=top align=center ' + curReadBG + ' style="' + unitNumStyle + '"><a name="_' + (i+1) + '">' + (i+1) + '</a></td>' +
                   '<td valign=top' + txtStyle + '>' + this._procText(txt2Info, noteInfo) + '</td></tr>';

        lastIndent1 = txt1Info.isNextIndent;
        lastIndent2 = txt2Info.isNextIndent;
      }
    }
    else { // single column
      // The Title Row
      var caption;
      try { caption = this.getChapterTitle(chIdx) } catch(e) {}
      if (!caption) caption = this.getTitle();

      if (this.isQuran)
        caption += '&nbsp;&nbsp;(<span style="color:blue">' + this.getChapterTitle(chIdx, 'arx') + '</span>)';

      var chNumDisp = this.toChapterNumberDisplay(chIdx, '&nbsp;');
      content += '<tr style="font-weight:bold" class="chapter_title"><td align=center style="border-bottom: 1px solid black">' + chNumDisp + '</td>' +
                 '<td align=center style="border-bottom: 1px solid black">' + caption + '</td></tr>';

      if (this.isQuran) {
        if (chIdx > 0 && chIdx != 8)
          content += '<tr><td style="border-bottom:1px solid gray">&nbsp;</td><td valign=top style="font-style:italic">' +
                     this._procText(this.getLines(0)[0]) + '</td></tr>';
      }

      // The Content
      var lines = this.getLines(chIdx), lastIndent = false, i, txt;
      for (i=0; i<lines.length; ++i) {
        var noteInfo = this.getNote(chIdx, i),
            subTitle = noteInfo ? noteInfo.addedTitle : null,
            txtInfo = this._analyzeText(lines[i], lastIndent, this.isBible);
        this._processWords(txtInfo, this.lang0, chIdx, i);
        if (subTitle) {
          if (i > 0) txtInfo.addedTitle = '<br>' + subTitle;
          else       txtInfo.addedTitle = subTitle;
        }
        if (isLowerCase(txtInfo.text)) lastIndent = true;
        var curReadBG = (chIdx == this.curChIdx && i == this.curUnitIdx) ? ' bgcolor="#AAEEAA"' : '',
            unitNumStyle = 'color:gray',
            txtStyle = lastIndent ? (' style="padding-left:' + INDENT + '"') : '',
            txtStyle = ' style="padding-left:' + MARGIN + 'px; padding-right:' + MARGIN + '"';
        if (i > 0 && !lastIndent)
          unitNumStyle += '; border-top: 1px solid gray';
        if (this.isQuran && i < 1 && _isQuranSalute(txtInfo.text)) {
          txt = txtInfo.text;
          var idx = txt.indexOf('.');
          if (idx > 0)
            txtInfo.text = `<span class="unit_text"><span class="salute">${txt.substring(0, idx+1)}</span>${txt.substring(idx+1)}</span>`;
        }
        content += `<tr><td valign=top align="center" ${curReadBG} style="${unitNumStyle}"><a name="_${i+1}">${i+1}</a></td><td valign=top${txtStyle}>${this._procText(txtInfo, noteInfo)}</td></tr>`;
        lastIndent = txtInfo.isNextIndent;
      }
    }

    setContent("view", content + '</table>');
  }

  // -- mode: see _MODE_xxxxx
  _renderHilited() {
    this._prepareBook();
    this._renderHeader(null, true);
  
    var content = '<br><table style="border:2px black solid" border=0 cellpadding=3 bgcolor="white"><tr style="font-weight:bold">';
    if (this.lang1)
      content += `<td width=50% align=center style="border-bottom:1px solid black">${this.getTitle(this.lang0)}</td>` +
                 `<td style="border-bottom:1px solid black">&nbsp;</td>` +
                 `<td width=50% align=center style="border-bottom:1px solid black">${this.getTitle(this.lang1)}</td></tr>`;
    else
      content += `<td>&nbsp;</td><td align=center style="border-bottom: 1px solid black">${this.getTitle()}</td></tr>`;
  
    var forQuestions = (this.mode == _MODE_QUESTIONS),
        showHilite2  = (this.mode == _MODE_HILITE2),
        noteTextOnly = (this.mode == _MODE_TEXTS),
        subTitleOnly = (this.mode == _MODE_SUBTITLES),
        showAll      = (this.mode == _MODE_ALL);
  
    var start = 0, end = this.chapter_count;
    if (this.curChIdx != null) {
      start = this.curChIdx;
      end = start + 1;
    }
    if (this.lang1) { // two columns
      for (var chIdx=start; chIdx<end; ++chIdx) {
        var lines_lang0 = this.getLines(chIdx, this.lang0);
        var lines_lang1 = this.getLines(chIdx, this.lang1);
        for (var i=0; i<lines_lang0.length; ++i) {
          var noteInfo = this.getNote(chIdx, i);
          if (!noteInfo) continue;
  
          // display hilited units
          var unitId = this._toUnitLink(chIdx, i);
          var style = ' style="padding-left:' + MARGIN + 'px; padding-right:' + MARGIN + 'px"';
  
          if (i == 0) { // always add chapter titles for the hilite display
            var x = this.getChapterTitle(chIdx);
            if (x)
              content += `<tr><td valign=top${style}><p class="added_title">${x}</p></td>` +
                         `<td align=center style="border-bottom: 1px solid gray">${unitId}</td><td>&nbsp;</td></tr>`;
          }
  
          // added titles are always displayed when not noteTextOnly.
          if (!noteTextOnly && noteInfo.addedTitle)
            content += `<tr><td valign=top${style}><p class="added_title">${noteInfo.addedTitle}</p></td>` +
                       `<td align=center style="border-bottom: 1px solid gray">${unitId}</td><td>&nbsp;</td></tr>`;
          if (subTitleOnly) continue;
  
          var a = _checkNote(noteInfo);
          if (noteTextOnly && !a.hasText) continue;
          if (showHilite2 && !a.has2) continue;
          if (forQuestions && !a.hasQ) continue;
          if (!(a.has1 || a.has2 || a.hasQ)) continue;
  
          var txt1Info = this._analyzeText(lines_lang0[i], false, this.isBible);
          var txt2Info = this._analyzeText(lines_lang1[i], false, this.isBible);
  
          var noteText = noteTextOnly && `<br><span class="note_text">${noteInfo.noteText}</span>` || '';
          content += `<tr><td valign=top${style}>${this._procText(txt1Info, noteInfo)}${noteText}</td>` +
                     `<td align=center style="border-bottom: 1px solid gray">${unitId}</td>` +
                     `<td valign=top${style}>${this._procText(txt2Info, noteInfo)}${noteText}</td></tr>`;
        }
      }
    }
    else { // single column
      for (var chIdx=start; chIdx<end; ++chIdx) {
        var i, lines = this.getLines(chIdx);
        for (i=0; i<lines.length; ++i) {
          var style = ` style="padding-left:${MARGIN}px; padding-right:${MARGIN}px"`,
              unitId = this._toUnitLink(chIdx, i);
  
          if (i == 0) { // always add chapter titles for the hilite display
            var x = this.getChapterTitle(chIdx);
            if (x)
              content += `<tr><td style="border-bottom: 1px solid gray">${unitId}</td>` +
                         `<td valign=top${style} class="chapter_title">${x}</td></tr>`;
          }

          var noteInfo = this.getNote(chIdx, i);
          if (!noteInfo) continue;

          if (noteTextOnly && !noteInfo.noteText) continue;
  
          // added titles are always displayed, separately.
          var txtInfo = this._analyzeText(lines[i], false, this.isBible);
          if (noteInfo.addedTitle)
            content += `<tr><td style="border-bottom: 1px solid gray">${unitId}</td>` +
                       `<td valign=top${style} class="added_title">${noteInfo.addedTitle}</td></tr>`;
          if (subTitleOnly) continue;
  
          var a = _checkNote(noteInfo);
          if (noteTextOnly && !a.hasText) continue;
          if (showHilite2 && !a.has2) continue;
          if (forQuestions && !a.hasQ) continue;
          if (!(a.has1 || a.has2 || a.hasQ)) continue;
  
          var noteText = noteTextOnly ? `<br><span class="note_text">${noteInfo.noteText}</span>` : '';
          content += `<tr><td style="border-bottom: 1px solid gray">${unitId}</td>` +
                     `<td valign=top${style}>${this._procText(txtInfo, noteInfo)}${noteText}</td></tr>`;
        }
      }
    }
    setContent("view", content + '</table>');
  }
  
  _renderDescriptions() {
    var chTitle = null;
    try { chTitle = this.getChapterTitle(0) } catch(e) {}
  
    if (!this.descriptions || (this.descriptions.length == 0) && chTitle)
      return false;

    var showRef = (this.references != null),
        showTOC = (chTitle != null),
        showVoc = this.words != null && Object.keys(this.words).length > 0,
        content = '<center>',
        links = [];

    if (showRef) links.push(`<a href="${this.toModeUri(_MODE_REFERENCE)}" target="_ref">References</a>`);
    if (showVoc) links.push('<a href="#voc">Vocabulary</a>');
    content += links.join(NAVDIV);

    content += '</center><hr><div style="padding: 1px 5px 1px 5px; background:white">';
    for (var i=0; i<this.descriptions.length; ++i) {
      var desc = this.descriptions[i];
      var caption;
      if (desc.startsWith('[')) {
        var idx = desc.indexOf(']');
        caption = desc.substring(1, idx);
        desc = desc.substring(idx+1).trim();
      }
      while (desc.indexOf('#') >= 0) desc = desc.replace('#', '</p><p>');
      if (caption) content += `<h3 style="font-style:italic">${caption}</h3>`;
      content += `<blockquote><p>${desc}</p></blockquote>`;
    }
  
    if (showTOC) {
      // show TOC
      var toc = '<hr><table><tr><td valign="top" style="padding-left:20px; padding-right:50px;"><h3><a name="toc">Table of Content</a></h3></td><td><table>';
      var hasNotes = this.notes != null;
      for (var i=0; i<this.chapter_count; ++i) {
        chTitle = this.getChapterTitle(i);
        var chNumDisp = this.toChapterNumberDisplay(i, '&nbsp;');
        var len = this.getLines(i).length;
        if (len > 0) {
          toc += `<tr><td align="right">${chNumDisp}</td>` +
                 `<td style="padding-left:10px; padding-right:20px"><a href="${this.toUriParams(i)}">${chTitle}</a></td>`;
          if (this.isQuran)
            toc += `<td style="color:blue">${this.getChapterTitle(i, 'arx')}</td>`;
          toc += `<td align="right" style="padding-left:10px"><font size="-1">${len} ${this.getUnitName()}s</font></td>`;
        } else { // (partial books)
          toc += `<tr><td align="right" style="color:gray">${chNumDisp}</td>` +
                 `<td style="padding-left:10px; padding-right:20px; color:gray">${chTitle}</td><td>&nbsp;</td>`;
        }
        if (hasNotes) {
          var cnt = this.getChapterNoteCount(i);
          if (cnt == 0) cnt = '&nbsp;'; else cnt += ' with notes';
          toc += `<td align="right" style="padding-left:20px"><font size="-1"><a href="${this.toModeUri(_MODE_ALL,i)}">${cnt}</a></font></td>`;
        }
        toc += '</tr>';
      }
  
      content += toc + '</table></td></tr></table>';
    }
  
    if (showVoc) {
      var langs = Object.keys(this.words);
      for (var l=0; l<langs.length; ++l) {
        var lang = langs[l];
        var caption = (this.lang1 == null) ? '<h3>Vocabulary</h3>' : `<h3>${toLangName(lang)}<br>Vocabulary</h3>`;
        if (l == 0) caption = `<a name="voc">${caption}</a>`;
        var data = this.words[lang], cnt = Object.keys(data).length;
        if (cnt <= 1) continue;
        content += '<hr><table><tr><td valign="top" align="center" style="padding-left:20px; padding-right:50px;">' +
                   `${caption}(<a href="${this.toModeUri(_MODE_VOCABULARY)}">${cnt} words</a>)</td><td>${this._renderVocList(data)}</td></tr></table>`;
      }
    }

    setContent("view", content + '</div><hr>');
    return true;
  }

  // wordObj: wordObj is like
  //     { "4:10": [ "panegyrist", "proclivities|proclivity", "execration|execrate", ],
  //       "4:17": [ "quackeries|quackery|mediocre doctor", ],
  //       "4:22": [ "benighted", "paroxysm", ],
  //       "4:23": [ "philtre", ],
  //     }
  _renderVocList(wordObj) { // make [ [ word, [ unitId ] ] ], ordered by word and unitId (within)
    // step 1: collect wordColl.
    var unitIDs = Object.keys(wordObj);
    var wordColl = {};
    for (var u=0; u<unitIDs.length; ++u) {
      var uid = unitIDs[u];
      var words = wordObj[uid];
      for (var w=0; w<words.length; ++w) {
        var sa = words[w].split('|');
        var lemma = sa[(sa.length == 1) ? 0 : 1];
        var reflist = wordColl[lemma];
        if (reflist == null) { // new word
          reflist = [];
          wordColl[lemma] = reflist;
        }
        reflist.push( _toSortableUnitId(unitIDs[u]) );
      }
    }

    // step 2: into list
    var wlist = [];
    var words = Object.keys(wordColl).sort();
    for (var w=0; w<words.length; ++w) {
      var lemma = words[w];
      wlist.push([ lemma, wordColl[lemma].sort() ]);
    }

    // step 3: render
    var ret = '<table border="0">';
    for (var w=0; w<wlist.length; ++w) {
      var wi = wlist[w];
      var uids = wi[1];
      for (var i=0; i<uids.length; ++i) uids[i] = this._toUnitLink(uids[i]);
      ret += `<tr><td valign="top" class="voc_word">${wi[0]}</td><td><font size="-1">${uids.join('&nbsp;&nbsp;')}</font></td></tr>`;
    }
    return ret + '</table>';
  }

  _renderReferences() {
    var refs = this.references;
    if (refs == null) {
      setContent("view", 'No references found for this book.');
      return;
    }
    document.title = 'References of ' + this.getTitle();
    var content = `<table border="0"><tr><td colspan="2" align="center"><h1>${this.getTitle()}</h1><h3>References</h3></td></tr>`;
    for (var i=0; i<refs.length; ++i) {
      var r = refs[i];
      if (r == null) {
        content += '<tr><td colspan="2">&nbsp;';
      } else {
        var id = r[0];
        var bgc = (id == this.refId) ? ' bgcolor="white"' : '';
        content += `<tr><td valign="top" style="padding-top:5px"><b><a name="${id}">${id}</a></b>:</td><td${bgc} style="padding:5px 10px 5px 10px">`;
        for (var j=1; j<r.length; ++j)
          content += `<p>${r[j]}</p>`;
      }
      content += '</td></tr>';
    }
    content += '</table>';
    setContent("view", content);
  }

  _analyzeText(txt, initIndent) {
    var ret = { prefix:        null, // e.g. "(14:21)"
                text:          null,
                isLastIndent:  initIndent,
                isSoftIndent:  true,
                isNextIndent:  txt.endsWith(',') || txt.endsWith(':') || txt.endsWith(';')
              };
    while (txt.startsWith('#')) {  // indentation
      ret.isLastIndent = true;
      ret.isSoftIndent = false;
      txt = txt.substring(1);
    }

    if (txt.startsWith('(') && this.isBible) {
      var idx = txt.indexOf(')');
      if (idx <= 8) {
        ret.prefix = txt.substring(0, idx+1);
        txt = txt.substring(idx+1);
      }
    }

    ret.text = txt;
    return ret;
  }

  // -- txtInfo should be returned from _analyzeText(), or a string
  _procText(txtInfo, noteInfo) { // txtInfo should be returned from _analyzeText(), or a string
    var txt = (typeof txtInfo == 'string') ? txtInfo : txtInfo.text;
    var firstIndent = txt.startsWith('#');
    txt = this._processSees(txt);
    txt = _segmentize(noteInfo, txt);
  
    var ret = '';
    if (txtInfo.prefix)
      ret += '<font color="gray" size="-1">' + txtInfo.prefix + '</font> ';
    ret += txt;
  
    var noteMark = '', tooltip = '';
    if (noteInfo && noteInfo.noteText) {
      if (noteInfo.questionLevel > 0)
        noteMark = _wrap(QUESTION_MARK, 'note_text_ind');
      else
        noteMark = _wrap(NOTE_MARK, 'note_text_ind');
      tooltip = ' title="' + noteInfo.noteText + '"';
    }
  
    var isIndented = false;
    var lines = ret.replaceAll('##', ' <br>#').split('#');
    ret = '';
    for (var i=0; i<lines.length; ++i) {
      if (i > 0) ret += '<br>';
      var txt = lines[i];
      var isIndentCancelled = txt.startsWith('@');
      var isBlockIndent = txt.startsWith('%');
      if (isIndentCancelled || isBlockIndent)
        txt = txt.substring(1);
      else if (i == 0) {
        if (txtInfo.isLastIndent)
          isBlockIndent = txtInfo.isSoftIndent ? 'block_indent' : 'indented';
        else
          isIndentCancelled = !firstIndent;
      }
  
      if (isIndentCancelled) {
        ret += txt;
        if (i == lines.length-1) ret += noteMark;
      } else {
        var clz = isBlockIndent ? 'block_indent' : 'indented';
        if (i == lines.length-1)
          ret += _wrap(txt+noteMark, clz);
        else
          ret += _wrap(txt, clz);
      }
    }
  
    if (txtInfo.addedTitle) ret = ('<p class="added_title">' + this._processSees(txtInfo.addedTitle) + '</p>' + ret);
    return _wrapUnit(ret, tooltip);
  }
  
  _processSees(txt) {
    var ret = '';
    for (var ptr = 0; ptr < txt.length; ) {
      var idx = txt.indexOf('<see ', ptr);
      if (idx < 0) return ret + txt.substring(ptr);
      ret += txt.substring(ptr, idx);
      idx += '<see '.length;
      var idx1 = txt.indexOf('>', idx);
      if (idx1 < 0) { error(`Unmatched <see> tag in text: [${txt}].`); continue; }
      var id = txt.substring(idx, idx1).trim();
      ptr = idx1+1;
      ret += `<sup class="see"><a href="javascript:showRef('${this.toModeUri(_MODE_REFERENCE)}','${id}')" title="see ${id}">(${id})</a></sup>`;
    }
    return ret;
  }

  _processWords(txtInfo, lang, chIdx, unitIdx) {
    if (txtInfo == null || txtInfo.text == null) return;
    var wlist = this.words[lang]; if (wlist == null) return;
    wlist = wlist[this.getUnitId(chIdx, unitIdx)]; if (wlist == null) return;
    if (typeof wlist == 'string') wlist = [ wlist ];
    for (var i=0; i<wlist.length; ++i) {
      var sa = wlist[i].split('|');
      var tooltip = '';
      switch(sa.length) {
      case 1: break;
      case 2: tooltip = ` title="${sa[1]}"`; break;
      case 3: tooltip = ` title="${sa[1]}: ${sa[2]}"`; break;
      }
      var x = sa[0].trim();
      txtInfo.text = txtInfo.text.replaceAll(x, `<span class="new_word"${tooltip}>${x}</span>`);
    }
  }

} // end of ParallelBookInfo.

//
////////////////////////////////////////////////////////////////////////////////////////////////

function _checkNote(noteInfo) {
  var ret = { has1:false, has2:false, hasQ:false, hasText:false };

  switch (noteInfo.hiliteLevel) {
  case 1: ret.has1 = true; break;
  case 2: ret.has2 = true; break;
  }
  if (noteInfo.questionLevel > 0) ret.hasQ = true;
  if (noteInfo.noteText) ret.hasText = true;
  if (noteInfo.segments && !ret.has1 && !ret.has2 && !ret.hasQ && !ret.hasText) {
    for (var j=0; j<noteInfo.segments.length; ++j) {
      var seg = noteInfo.segments[j];
      switch (seg.noteInfo.hiliteLevel) {
      case 1: ret.has1 = true; break;
      case 2: ret.has2 = true; break;
      }
      if (seg.noteInfo.questionLevel > 0) ret.hasQ = true;
      if (seg.noteInfo.noteText) ret.hasText = true;
    }
  }
  return ret;
}


function _textColorClass(noteInfo) {
  if (!noteInfo) return null;
  return (noteInfo.questionLevel > 0) ? `q${noteInfo.questionLevel}` : `hl${noteInfo.hiliteLevel}`;
}

function _wrapUnit(txt, extra) { return `<span class="unit_text" ${extra}>${txt}</span>`; }

function _wrap(txt, cls, style, extra) {
  // exclude the ending <see> tag, if any
  var see = '';
  var excludeLastSee = false;
  try {
    excludeLastSee = cls.indexOf('indent') < 0;
  } catch(e) {}
  excludeLastSee &= (typeof txt == 'string');
  var idx = !excludeLastSee ? -1 : txt.lastIndexOf('<sup class="see">');
  if (idx > 0) {
    var idx1 = txt.indexOf('</sup>', idx);
    if (idx1 == txt.length - 6) {
      see = txt.substring(idx);
      txt = txt.substring(0, idx);
    }
  }

  var look = '';
  if (cls)   look += `class="${cls}"`;
  if (style) look += ` style="${style}"`;
  if (extra) look += ' ' + extra;
  return (look && `<span ${look}>${txt}</span>` || txt) + see;
} 

function _segmentize(noteInfo, txt) {
  if (!noteInfo || !noteInfo.segments) {
    var indent = '';
    if (txt.startsWith('#')) {
      indent = '#';
      txt = txt.substring(1);
    }
    if (txt.startsWith('@') || txt.startsWith('%')) {
      indent += txt.substring(0, 1);
      txt = txt.substring(1);
    }
    return indent + _wrap(txt, _textColorClass(noteInfo));
  }

  var ret = '', segs = noteInfo.segments;
  var ptr=0, start, end, t;
  for (var i=0; i<segs.length; ++i) {
    var seg = segs[i];
    colorClz = _textColorClass(seg.noteInfo);
    if (seg.wholeText) {
      t = seg.wholeText;
      start = txt.indexOf(t, ptr);
      if (start < 0) { _unfulfilledSegment(noteInfo, t); continue; }
      end = start + t.length;
      ret += txt.substring(ptr, start) + _wrap(txt.substring(start, end), colorClz);
      ptr = end;
    } else if (!seg.startText) {
      t = seg.endText;
      end = txt.indexOf(t, ptr);
      if (end < 0) { _unfulfilledSegment(noteInfo, t); continue; }
      end += t.length;
      ret += _wrap(txt.substring(ptr, end), colorClz);
      ptr = end;
    } else if (!seg.endText) {
      t = seg.startText;
      start = txt.indexOf(t, ptr);
      if (start < 0) { _unfulfilledSegment(noteInfo, t); continue; }
      ret += txt.substring(ptr, start) + _wrap(txt.substring(start), colorClz);
      ptr = txt.length;
    } else {
      start = txt.indexOf(seg.startText, ptr);
      if (start < 0) { _unfulfilledSegment(noteInfo, txt); continue; }
      end = txt.indexOf(seg.endText, start);
      if (end < 0) { _unfulfilledSegment(noteInfo, txt); continue; }
      end += seg.endText.length;
      ret += txt.substring(ptr, start) + _wrap(txt.substring(start, end), colorClz);
      ptr = end;
    }
    if (seg.noteInfo && seg.noteInfo.noteText) {
      var tooltip = ' title="' + seg.noteInfo.noteText + '"';
      if (seg.noteInfo.questionLevel > 0)
        ret += _wrap(QUESTION_MARK, 'note_text_ind', null, tooltip);
      else
        ret += _wrap(NOTE_MARK, 'note_text_ind', null, tooltip);
    }
  }
  if (ptr < txt.length) ret += txt.substring(ptr);
  return ret;
}

function _unfulfilledSegment(noteInfo, txt) { error('UNFULFILLED SEGMENT [' + noteInfo.id + ']: ' + txt); }

// Quran Specific

var _quranSalutes = [ 'Ha,', 'Ta,', 'Ya,', 'Ayn,', 'Kaf,', 'Qaf.', 'Alif', 'Saad.' ];

function _isQuranSalute(txt) {
  for (var i=0; i<_quranSalutes.length; ++i)
    if (txt.startsWith(_quranSalutes[i])) return true;
  return false;
}

function _processNotes(notes, override, result) {
  if (!result) result = {};
  notes && _procNotes(notes, result);
  override && _procNotes(override, result);
  return result;
}

function _procNotes(input, result) {
  // A. The key: can be like " 1: 4, 5, 9-12, 20"  or  "10:1"  or  "10 : 5"
  // B. The value can be
  //    1. like "!", "!!", "?" or followed by a textual comment.
  //    2. also be an array, to support assorted note segments within.
  //       Each segment spec is like so:
  //       [ "=> chiefly brought this about. | !!",
  //         "Why it was born => mysteries of our world, | ? Why?",
  //       ],
  var keys = Object.keys(input);
  for (var i=0; i<keys.length; ++i) {
    var k = keys[i];
    var val = input[k];
    var sa = k.split(':');
    var id, prefix = sa[0].trim()+':';

    if (typeof val == 'string') {
      if (val.indexOf('|') > 0) { // special case: a single segment
        val = [ val ];
      } else {
        // Value is singular; key can be many
        val = _parseNoteContent(val.trim());

        var sa1 = sa[1].split(',');
        for (var j=0; j<sa1.length; ++j) {
          var k = sa1[j].trim();
          var idx = k.indexOf('-');
          if (idx < 0) {
            id = prefix + k;
            var v = Object.assign({}, val);
            v.id = id;
            result[id] = v;
          } else {
            var a = parseInt(k.substring(0,idx));
            var b = parseInt(k.substring(idx+1));
            for (k = a; k <= b; ++k) {
              id = prefix + k;
              var v = Object.assign({}, val);
              v.id = id;
              result[id] = v;
            }
          }
        }
        continue;
      }
    }

    // v is an array: new-style, segmented hilites
    // Key is singular; value can be many
    var segments = [];
    id = prefix + sa[1].trim();
    result[id] = { "id":id, "segments":segments };

    for (var j=0; j<val.length; ++j) {
      var sa1 = val[j].split('|');
      if (sa1.length <= 1) continue; // invalid
      var noteInfo = _parseNoteContent(sa1[sa1.length-1]);
      for (var k=0; k<sa1.length-1; ++k) {
        var segDef = _parseSegmentDef(sa1[k]);
        segDef.noteInfo = noteInfo;
        segments.push(segDef);
      }
    }
  }
}

function _parseNoteContent(noteText) {
  var ret = { "hiliteLevel": 0, "questionLevel": 0 };
  if (noteText) {
    noteText = noteText.trim();
    for (var i=0; i<noteText.length; ++i) {
      var n = noteText[i];
      switch (n) {
      case '!': ret.hiliteLevel++; break;
      case '?': ret.questionLevel++; break;
      default:  ret.noteText = noteText.substring(i).trim(); i = noteText.length; break; // break the loop
      }
    }
    if (ret.noteText == '') ret.noteText = null;
  }
  return ret;
}

function _parseSegmentDef(txt) {
  var idx = txt.indexOf('=>');
  if (idx < 0) return { "wholeText": txt.trim() };
  var start = txt.substring(0, idx).trim(); if (start.length == 0) start = null;
  var end   = txt.substring(idx+2).trim();  if (end.length == 0)   end = null;
  return { "startText": start, "endText": end };
}

function _toSortableUnitId(uid) { // "1:14" => "0001:0014"
  var sa = uid.split(':');
  var x = sa[0]; while (x.length < 4) x = '0' + x;
  var y = sa[1]; while (y.length < 4) y = '0' + y;
  return x + ':' + y;
}

return PBI;
})();

