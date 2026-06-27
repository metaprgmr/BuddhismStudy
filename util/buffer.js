class Buffer {
  constructor() { this.bufList = Array.from(arguments); }

  w() {
    var ret = '';
    for (var i in arguments) {
      var x = arguments[i];
      if (x || (typeof x == 'number')) ret += x;
    }
    if (ret.length) this.bufList.push(ret);
    return (this.bufList.length < 1024) ? this : this.condense();
  }

  wIf() {
    if (arguments[0]) { arguments[0] = ''; this.w.apply(this, arguments); }
    return this;
  }

  wIfElse(cond, a, b) { return this.w(cond ? a : b); }

  join(arr, sep) {
    if (arr && arr.length) {
      if (!sep) sep = '';
      this.w(arr[0]);
      for (var i=1; i<arr.length; ++i) this.w(sep, arr[i]);
    }
    return this;
  }

  append(s) { this.bufList.push(s); } // for performance

  prepend() {
    var ret = '';
    for (var i in arguments) { var x = arguments[i]; x && (ret += x); }
    if (ret) this.bufList.unshift(ret);
    return this;
  }

  wrap(before, after) { return this.prepend(before).w(after); }

  trimFirstNL() {
    var first = this.bufList[0] || '';
    if (first[0] == '\n') this.bufList[0] = first.substr(1);
    return this;
  }

  // renders to one or more elements,
  // or an object with a write() function.
  // returns the text, and clears internally.
  render() {
    var ret = this.text();
    for (var i in arguments) {
      var k = arguments[i];
      if (!k) continue;
      if (typeof k == 'function')
        k(ret);
      else if (k.write)
        k.write(ret);
      else {
        var el = k.hasOwnProperty('innerHTML') ? k : e(k);
        el && (el.innerHTML = ret);
      }
    }
    this.bufList = [];
    return ret;
  }

  text() {
    var s = this.bufList.join('');
    this.bufList = [ s ];
    return s;
  }

  condense() {
    if (this.bufList.length > 100)
      this.text();
    return this;
  }

} // end of Buffer.
