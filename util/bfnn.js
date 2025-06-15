var BFNN_BOOK;
function checkBfnn() {
  if (BFNN_BOOK) return;
  var x = window.location.href, i = x.indexOf('BuddhismStudy');
  if (i > 0)
    BFNN_BOOK = x.substring(0, i+'BuddhismStudy'.length) + '/BFNN/book';
  else
    BFNN_BOOK = 'https://book.bfnn.org';
}

function bfnn(uri) { checkBfnn(); return BFNN_BOOK + uri; }
function isBfnnLocal() { checkBfnn(); return BFNN_BOOK.startsWith('file:'); }
