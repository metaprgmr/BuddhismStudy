const BFNN_BOOK = window['BOOK_BFNN'] || 'https://book.bfnn.org';
function bfnn(uri) { return BFNN_BOOK + uri; }
function isBfnnLocal() { return BFNN_BOOK.startsWith('file:'); }
