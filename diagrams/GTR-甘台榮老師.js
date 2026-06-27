var 一心二門三大 =

(() => {
const gtrjs = 'GTR-甘台榮老師.js';

// 【一心二門】
function 一心二門_真如門(gp) {
  gp ||= newGP();
  gp.setStyle(AIL + BOLD)
    .setDefaultTextColor("purple")
    .setLayout(`
〇〇〇〇〇〇〇〇〇〇不可遣，不可立
/red|真/〇〇離言真如〇〇〇不可說，不可念
/red|如/〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇法空
/red|門/〇〇〇〇〇〇〇〇〇如實空〇〇〇我空
〇〇〇依言真如〇〇〇【/red|體大/】
〇〇〇〇〇〇〇〇〇〇如實不空〇〇常恆不變
〇〇〇〇〇〇〇〇〇〇【/red|相大/】〇〇淨法滿足`)
    .XFT(4,2,0,-0.5)      // 離言真如
    .FO(9,1,2,null,{leftLen:1.75});
  gp.XFT(17,[3,4],0,0.5)  // 我空 法空
    .FO(15,3.5,4.5,null,{leftLen:1.75})
    .XFT(11,[6,7],0,0.5)  // 如實不空
    .FO(15,6,7)
    .XFT(4,5,0,0.25)      // 依言真如
    .FO(9,4,6.5,null,{leftLen:1.75});
  gp.XFT(1,[2,3,4],0,0.5) // 真如門
    .FO(2,1.5,5.25);
  return gp;
}

function 一心二門_覺(gp) {
  gp ||= newGP();
  gp.setStyle(AIL + BOLD)
    .setMarkNames(A2Z)
    .setDefaultTextColor("blue")
    .setLayout(
/*
      a     b           c             d       e */ `
〇〇〇A〇〇〇〇〇〇〇〇〇覺而不覺/violet|滅/〇/violet|凡夫/
〇〇〇〇〇〇〇始覺〇〇〇〇相似覺〇/violet|異/〇/violet|二乘人/
〇〇〇〇〇〇〇〇〇〇〇〇〇隨分覺〇/violet|住/〇/violet|菩薩/〇〇〇智淨相
〇〇〇緣起〇〇〇〇〇〇〇〇究竟覺〇/violet|生/〇〇隨染〇〇不思議業相
覺〇〇/violet|四/〇〇〇本覺〇〇〇〇〇〇〇〇〇〇〇D〇〇〇如實空鏡 /violet|遍計本空/
〇〇〇/violet|聖/〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇因熏習鏡 /violet|依他如幻/
〇〇〇熏習〇〇真如熏無明〇〇〇〇〇〇〇〇性淨〇〇法出離鏡 /violet|根本智；以佛力出煩惱/
〇〇〇〇〇〇〇妄心熏真如〇〇〇〇〇〇〇〇〇〇〇〇緣出離鏡 /violet|後得智；因緣度眾生/`);

  var a = gp.getMark('A')[0], b = a+4, c = b+6,
      d = gp.getMark('D')[0], e = d+4;
  gp.XFT(e,[3,'-',8],0,0.5)    // 智淨相 不思議業相 如實空鏡 因熏習鏡 法出離鏡 緣出離鏡
    .XFT(e+5,[5,'-',8],0,0.5)  // 滅 異 住 生
    .FO(e-2,3.5,4.5)  // 隨染
    .FO(e-2,5.5,8.5)  // 性淨
    .XFT(b,5,0,0.5)   // 本覺
    .FO(d-2,4,7,null,{ leftLen:d-b-4+0.75 });
  gp.XFT(b,2,0,0.5)   // 始覺
    .FO(c-2,1,4,4,{leftLen:2.75});
  gp.FO(b-2,2.5,5.5); // 緣起
  gp.XFT(a,7,0,0.5)   // 熏習
    .FO(b-2,7,8);
  gp.XFT(1,5,0,0.75)  // 覺
    .XFT(a,[5,6],0,0.25)  // 四聖
    .FO(a-2,4,7.5);
  return gp;
}

function 一心二門_不覺(gp) {
  gp ||= newGP();
  gp.setStyle(AIL + BOLD)
    .setMarkNames(A2Z)
    .setLayout(
/*
a     b       c             d     e     f       g      h */ `
A〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇/violet|生/〇〇業相〇〇〇〇〇〇〇〇Z業識
〇〇〇〇〇〇〇〇〇〇〇〇〇〇三細〇〇〇〇能見 /violet|見分；能/〇〇〇〇轉識〇〇業力引生
〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇境界 /violet|相分；所/〇〇〇〇現識
〇〇〇緣起〇〇〇〇〇〇〇〇〇D〇〇/violet|住/〇〇智相〇〇俱生〇〇我執〇智識〇〇分別引生
不〇〇/violet|六/〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇相續〇〇分別〇〇〇〇相續識
覺〇〇/violet|凡/〇〇〇〇〇〇〇〇〇〇六粗〇/violet|異/〇〇執取〇〇俱生〇〇法執〇〇〇〇Y意識
〇〇〇〇〇〇〇無明熏真如〇〇〇〇〇〇〇〇計名〇〇分別〇〇〇〇〇思想
〇〇〇熏習〇〇妄心熏無明〇〇〇〇〇/violet|滅/〇〇起業
〇〇〇〇〇〇〇妄境熏妄心〇〇〇〇〇〇〇〇受苦`);

  var a = gp.getMark('A')[0], b = a+3, c = b+4,
      d = gp.getMark('D')[0], e = d+3, f = e+3, g = f+4, h = g+4,
      y = gp.getMark('Y')[0], z = gp.getMark('Z')[0];
  gp.FO(b-2,4.25,8)         // 不覺
    .XFT(a,[5,6],0,0.625)
    .XFT(b,[5,6],0,0.625);  // 六凡
  gp.FO(c-2,7,9,3);         // 熏習
  gp.FO(f-2,1,3,3,{leftLen:2.75}); // 三細
  gp.FO(f-2,4,9,6,{leftLen:2.75})  // 六粗
    .XFT(d,6,0,0.5);
  gp.FO(d-2,2,6.5,null,{leftLen:d-c+0.75}) // 緣起
    .XFT(b,4,0,0.25);
  gp.L([g-1,4],'%l1.5')     // 我執 法執
    .L([g-1,5],'%l1.5')
    .L([g-1,6],'%l1.5')
    .L([g-1,7],'%l1.5')
    .XFT(h,[4,6],0,0.5)
    .FI(h-2,4,5)
    .FI(h-2,6,7);
  gp.L([f-2.5,1],'%r1.5',' style="stroke:violet"') // 生
    .FO(f-3,2,5,4,   {noIn:1,lineColor:"violet"})  // 住
    .XFT(e,4,0,-0.5)
    .FO(f-3,6,7,null,{noIn:1,lineColor:"violet"})  // 異
    .FO(f-3,8,9,null,{noIn:1,lineColor:"violet"})  // 滅
    .XFT(e,8,0,0.5);
  // 五識、意識等
  var mycolor = 'teal';
  gp.setDefaultLineColor(mycolor)
    .L([z,1], '%l3').TC(z+1,1,mycolor) // 意識
    .L([z,2], '%l3').TC(z+1,2,mycolor) // 轉識
    .L([z,3], '%l3').TC(z+1,3,mycolor) // 現識
    .L([z,4], '%l3').TC(z+1,4,mycolor) // 智識
    .L([z-1,5],'%l2').TC(z,5,mycolor)   // 相續識
    .L([z,7], '%l3').TC(z+1,7,mycolor) // 思想
    .TC(y+1,6,mycolor).FI(y-1, 5, 7, 3).L([y-1,7], '%l1.25').L([y-1,6], '%l6') // 意識
    .setDefaultLineColor('violet')
    .TC(z+5,2,'violet')  // 業力引生
      .L([z+2.75,1],[y,2]).L([z+2.75,2],[y,2]).L([z+2.75,3],[y,2])
    .TC(z+5,4,'violet')  // 分別引生
      .L([z+2.75,4],[y,4]).L([z+2.75,4.75],[y,4]);
  return gp;
}

function 一心二門_生滅門(gp) {
  gp ||= newGP();
  gp.setDefaultTextColor("red")
    .setLayout(`
〇
〇
〇
〇
〇
〇
〇
〇
生
滅〇〇〇〇〇〇〇〇〇【用大】
門
`)
    .XFT(1,[9,10,11],0,0.5) // 生滅門
    .FO(2,5.75,15.125)
    .XFT(11,10,0,0.625) // 用大
    .include(一心二門_覺(),   4, 1)
    .include(一心二門_不覺(), 4, 10);
  return gp;
}

function 一心二門_筆記(gp) {
  gp ||= newGP();
  gp.setMarkNames(A2Z)
    .setDefaultTextColor("white")
    .setWidth(30)
    .setLayout(`
Y
A〇〇離言真如：放下遍計執
B〇〇二空真如：一切染法不相應故
C〇〇如實不空：有無量的性功德
〇〇〇〇〇體大：真如平等不增減故。心、佛、眾生，三無差別
〇〇〇〇〇相大：具足無量性功德。本來常樂我淨，無任何染污
〇〇〇〇〇用大：能生一切世間出世間善因果故
D〇〇若離世俗諦，不得第一諦
E〇〇覺：心體離念。本覺=依言真如。本覺本有；不覺本無
F〇〇〇〇隨染本覺：佛性在染污因緣下可以對治煩惱
G〇〇〇〇〇〇智淨相：〇〇遍計本空，根本智；自受用
〇〇〇〇〇〇〇不思議業相：依他如幻，後得智；他受用
H〇〇阿賴耶識：必有一念不覺生三細，境界為緣長六粗
〇〇〇〇〇〇〇〇每個念頭起，就有這九個相
I〇〇開始學佛：始覺
J〇〇染污的熏習：四個主角：真如、無明、妄心、妄境
〇〇〇〇〇〇〇〇〇要從染污的熏習轉化為真如的熏習
K〇〇清淨的熏習：三個主角：真如、無明、妄心（菩提心）
L〇〇一法界大總相法門體
〇〇〇大乘起信，要信者，自心真如
〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇Z
`)
    .blackboardByCorners('Y','Z')
    .textAtMark('A', '02:30')
    .textAtMark('B', '04:17')
    .textAtMark('C', '04:50')
    .textAtMark('D', '06:55')
    .textAtMark('E', '08:58')
    .textAtMark('F', '09:42')
    .textAtMark('G', '10:35')
    .textAtMark('H', '16:00')
    .textAtMark('I', '21:20')
    .textAtMark('J', '25:28')
    .textAtMark('K', '28:47')
    .textAtMark('L', '31:40');
  return gp;
}

function 一心二門(gp,ttl) {
  if (typeof gp == 'string') {
    var bgc = gp; // for bg color
    gp = newGP();
    gp.setBGColor(bgc);
  } else if (!gp) {
    gp = newGP();
  }
  var treeW = 46;
  gp.setWidth(treeW)
    .setHeight(26)
    .T(28,1, `/h1|${ttl||'一心二門三大'}/`)
    .VT(1, 10.375, '/red|一心/')
    .FO(2,3.375,18.4325)
    .include(一心二門_真如門(), 4, 1)
    .include(一心二門_生滅門(), 4, 9)
    .src = gtrjs;
  return gp;
}

createGP('一心二門', CAT_甘師, gp => {
  var NOTES = 一心二門_筆記(), treeW = 47;
  gp.setWidth(treeW + NOTES.width)
    .setHeight(26)
    .hasRightEdge()
    .include(一心二門(null,'一心二門'), 1, 1)
    .include(NOTES, treeW, 2)
    .T(treeW,1,'源自/b1|甘台榮老師//href:"https://www.youtube.com/watch?v=g20qgdiIqpE"|教學視頻/')
    .src = gtrjs;
  return gp;
});

return 一心二門; // expose
})();
