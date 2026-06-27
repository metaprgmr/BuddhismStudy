function getLists() {
  var vids = `
#!淨土法門
171|24:22|BUmN4xX1QMA|淨土宗旨
 42|14:14|uwY7zg_QBh4|淨土的真相
 35|15:47|3rXkY1oJ9QE|唯心淨土
 34|17:23|lyNr8kawOr4|上品三心
 74|17:28|Z0Vyj85grAE|信解行證
---|20:22|HhVomKXUByg|帶業往生           => B
---|20:51|U-1NICU9_tE|淨土精華           => B
---|19:53|PJR-k-10ZkI|念佛斷障           => B
 18|59:23|oB_vF_S0d5w|厭離娑婆：無我空觀 => A | ~_逆境當前莫動瞋_A.jpg
176|47:48|TZx4nXsPYl8|至心信樂求往生
 43|38:00|Z5kKEqluf0M|大勢至菩薩念佛圓通章大意
---|22:36|NfKeXBiD0SQ|都攝六根，淨念相繼 => B | 唯攝一精明，不令託根緣塵。元依一精明，分成六和合。#因賅果海，果徹因源。
 44|14:42|ujw_tgXUXbU|華嚴念佛三昧
<h3>修行</h3>
 45|14:57|asuFL9uO2fY|念佛三昧           => 49247944@ | A | 對治執空：能念之心，靈靈不昧；所念之佛，歷歷分明。#對治執有：能念之心，本體即空；所念之佛，了不可得。#明心見性，見性成佛。#但離妄念，即如如佛。
 25|36:13|Lqb_nz33STc|念佛三昧－五別境，與五根五力
 57|38:38|ocmoVo7QZrY|觀無量壽佛法       => A | 101994632@ | 鳩摩羅什《思惟略要法》
 17|18:09|CtDKD8kw8rw|實相念佛           => 55624325@ | B
---|30:52|Idu1tfXZjkQ|約心觀佛           => O
 28|44:20|Qpr6NAqBHI4|念佛止觀大意(上) => 137765264@ | B | 念佛止觀_天台25前方便_A.jpg
 29|44:18|oIWMpv3bIzE|念佛止觀大意(下) => A | 138212330@
 47|18:27|H9X4RrTySmI|禪淨雙修         => A | 53934636@
114|17:03|eqjjTy3WwmI|九心住           => B | 50213126@

#!《彌陀要解》
152|40:50|lFn3Fc1iGwU|阿彌陀經要解大意 01－五重玄義（釋名，辨體）
153|40:52|ApOndd_RywQ|阿彌陀經要解大意 02－五重玄義（明宗）
154|34:27|nNEToVWlMCM|阿彌陀經要解大意 03－五重玄義（力用）
155|42:55|jjBvTOYcK94|阿彌陀經要解大意 04－五重玄義（判教）
156|37:25|Molq3O0DvkY|阿彌陀經要解大意 05－二有現在
157|38:48|lXG2GjYsuag|阿彌陀經要解大意 06－依報莊嚴（無苦受樂）
158|37:50|ZKnVfFe6Gh4|阿彌陀經要解大意 07－依報莊嚴（住處，生處）
159|37:17|BkAQBV44Uao|阿彌陀經要解大意 08－勝妙五塵，說法莊嚴
160|45:03|SUtSqG7XEuQ|阿彌陀經要解大意 09－説法莊嚴（三十七助道品）
161|32:45|DE0OwLiM-Ms|阿彌陀經要解大意 10－正報莊嚴（名號，主伴）
162|33:59|-w0tGj3U0Uo|阿彌陀經要解大意 11－勸願
163|29:00|A8q59tsXgGY|阿彌陀經要解大意 12－勸行
164|27:16|dcBGaE9MPhI|阿彌陀經要解大意 13－感應道交
165|30:21|0xev05FHu2c|阿彌陀經要解大意 14－勸信流通
166|30:30|gmDvfeBAhno|阿彌陀經要解大意 16－勸行流通（終）

#!《往生論註》=PLsQIKP8ObPuDDv2Xql4h2fY9szuyeNiZq
170|37:58|edOmpo06jYQ|往生論註 01－五念門                        => 往生論註-01_A.jpg
---|40:02|6TSdXumm51E|往生論註 02－難行道/易行道                 => 往生論註-02_A.jpg
---|33:10|Y4catlQhGrA|往生論註 03－禮拜門                        => 往生論註-03_A.jpg
---|29:22|qZ8NTLwO5fU|往生論註 04－讚歎門                        => 往生論註-04_A.jpg
---|35:03|8ZU-aex7qlk|往生論註 05－作願門                        => 往生論註-05_A.jpg
---|41:33|OHn0z2ZuylU|往生論註 06－發起序                        => 往生論註-06_A.jpg | 往生論構造.jpg
---|34:11|wzfeyRsQZ5Y|往生論註 07－觀察門（1清淨功德）           => 往生論註-07_A.jpg
---|31:47|3P--HsytuUU|往生論註 08－觀察門（2量功德）             => 往生論註-08_A.jpg
---|35:32|Vhqw2wUncmE|往生論註 09－觀察門（3性功德）             => 往生論註-09_A.jpg
---|31:43|zKIfxVMwRsA|往生論註 10－觀察門（4形象5種種事功德）    => 往生論註-10_A.jpg
---|35:11|-CQOiJi6edI|往生論註 11－觀察門（6妙色7觸功德）        => 往生論註-11_A.jpg
---|32:41|IF_N5d5UJoQ|往生論註 12－觀察門（8三種事功德）         => 往生論註-12_A.jpg | 幢：四無量心。幔：四攝法。珠：六波羅蜜。
---|29:09|cgI9iASjeaU|往生論註 13－觀察門（9雨10光明11妙聲功德） => 往生論註-13_A.jpg | 法界圓融體　作我一念心#故我念佛心　全體即法界
---|32:11|fRVPUz2_adM|往生論註 14－觀察門（12主13眷屬14受用功德）=> 往生論註-14_A.jpg
---|30:48|THxGGB_7cRw|往生論註 15－觀察門（15無諸難16大義門17所求滿足）=> 往生論註-15_A.jpg
---|34:57|enkU2ymPxFg|往生論註 16－觀察門（佛功德1座2身）              => 往生論註-16_A.jpg
---|26:38|LDjAHMtRSx0|往生論註 17－觀察門（佛功德3口4心5大眾）         => 往生論註-17_A.jpg
---|24:52|m0fn_XH67ZM|往生論註 18－觀察門（佛功德6上首7主8不虛作主持） => 往生論註-18_A.jpg
---|27:19|bDwvSVT2c54|往生論註 19－觀察門（菩薩四功德）          => 往生論註-19_A.jpg
174|27:13|F_hc73UFnqU|往生論註 20－迴向門                        => 往生論註-20_A.jpg

#!經綸講解
109|37:19|gmTpcHKpa8o|心經         => 115660051@ | A
139|22:16|EFTvy_kLyGM|法華要義
143|27:20|I1lRLvAbvkw|法華七喻（1）
144|26:55|OPqxwT_k3IM|法華七喻（2）
 50|15:48|uw9x4SrWv_4|楞嚴合心經
---|54:27|K1vv8x73kqQ|楞嚴要義 （字幕版）
 97|16:25|8dWBLw822Mg|圓覺經
125|16:49|z2X2MXE6l0A|妄盡還源觀
113|14:22|yGSsjLxfk70|大乘起信論   => B
 11|32:39|g20qgdiIqpE|一心二門     => 134479405@ | B
 32|20:07|sb3UApAn0P0|證道歌
187|25:34|r1z3FAr9DFk|妙法蓮華經觀世音菩薩普門品

#!天台教觀
181|31:43|u3KKIw-qi5Y|3-1-25 天台教觀（精華版）
172|17:46|J7OUl_vHuMo|天台與淨土（1）四教教觀
---|23:35|sy8LWCoGkmw|天台與淨土（2）四教四諦、十二因緣、六度
---|15:07|kRgjhjysZ00|天台與淨土（3）一心三觀
---|24:53|etWA7xA5J1M|天台與淨土（4）見思惑
169|52:08|9bWfYR15v8E|天台小止觀（1）十章簡介               => 天台小止觀1_A.jpg
---|27:33|wvVxl5YYnS0|天台小止觀（2）總序 (A)－天台四部止觀
---|40:36|_AeiNC3C-Kw|天台小止觀（3）總序 (B)－止觀雙運
 20|27:03|ouVLKFBkH9c|摩訶止觀
136|24:18|S4EXVYg9MgU|（別教）六即佛      => 六即佛_B.jpg

#!佛學概念
 49|16:37|Bg9qB_ntnt8|學觀音，做觀音
 41|18:45|oVVUbJLz49Q|學地藏，做地藏
 61|19:50|_-6ctVJSzQ0|學文殊，做文殊
151|40:38|fOqi95vFJwg|佛學十四講表 第一講表 先明佛義（總說）
167|37:25|WzenwLG2gIg|佛學十四講表 第七講表 宇宙器界概説
 21|27:47|4fnfgcPFwfo|修學法要
 46|38:16|4xeQ5bfkzaw|普賢十願
 19|17:23|k3hdPBk1QlQ|悟四聖諦
 65|23:53|C3Dxz76M0gU|懺悔
---|19:18|Lv_dIlQ_g9Q|觀心無心            => B
---|17:36|5AjxBTCihgU|如幻三昧 (字幕版)   => 如幻三昧_B.jpg
 60|19:41|23tVAZ5aLSY|心靈的力量-信願行
 39|14:42|znT51XiptSM|三時繫念
110|17:05|L_naVguu7_0|三自性
123|15:45|Yh8pB5ShaVk|四念處
115|32:17|sMEqknGoTX4|四諦與念佛
 58|28:14|kkMXhbNzRCI|四敎四諦
135|27:38|hwErH1rTOyY|六門教授習定論
149|18:52|lB5Vxfzu5Vo|八宗一心           => B
 70|18:30|vbIYstc64MI|耳根圓通
 71|15:33|e7VXOj1xFlA|反妄歸真
---|21:32|QurfaCO6ZEI|六解一亡           => B
 72|17:56|6v2x5wg0us8|如幻三昩
 73|15:07|d76_n3x9Hv0|熟處轉生，生處轉熟
 79|13:26|BYNTKe-EoOk|因果輪迴，想情升墜
---|18:52|xmKd-Zi-tCY|悟性論
  2|15:52|fe6VbjGRa-w|一心三般若
  3|15:16|-vZ48hHpefE|一切事究竟堅固
  4|15:55|97gDQU8GPNw|一心三止
  6|19:10|AqGiY3dQZZI|一心歸命
 10|15:07|Bybwbv0B2rg|一心為宗
  8|28:07|QPq6bLZGBOw|三慈
 31|30:04|oFIiwyCqJSM|三主要道
 40|17:52|v4QTP43B7Zc|十八空
 14|29:54|dxXhb7xaIAg|轉識成智
 16|16:01|AgibvU-Auak|無住生心
 23|26:14|mNxCRsJ6Fco|起心動念
 24|22:35|PIQcSMKoHAQ|客塵煩惱
 27|17:34|y2M8eRmFPS8|心意識
 30|15:02|Zs_BSnBK0GQ|現前一念心性
 33|15:31|v8aPUhrMyCE|盡所有性、如所有性
 36|37:30|9hsf8nxVNCo|身心世界
 37|13:31|QL3onCv1R18|止－寂靜的心
 38|14:26|dR-wF141sVw|宇泊
 48|17:28|HtGIazdMqBM|謙光
 51|15:27|JwIKyy_ISKA|顛倒妄見
 52|14:27|g_IQrO3IyB8|放下
 53|28:11|uj0jP1PhkZI|發菩提心
 54|18:50|tC6BL6zwU1w|知恩報恩，有願必成
 62|24:04|8BHFfJWvlBE|純淨純善
 63|22:45|F6uNzS8t55s|離苦得樂
 64|15:12|JeqxwZdL9w8|回家         => B
 68|13:02|vtwQrehdbVU|順菩提門
 78|20:31|1e9t2Mi1HfI|斷疑生信
 80|14:45|pnZMxVT5LyA|根本
 82|16:53|bz2dABqbFzU|認識自己的慢
 84|14:31|kj3YjdH0u8o|體用事理
 85|14:48|rR-Iun4ZIE0|四心降伏
 87|15:38|Ho21ivMhFNk|超群拔俗
 88|16:17|hWs9qqg2C3k|善用其心
 89|15:16|xSawQIJMO_U|恆轉如瀑流
 90|16:47|JVCTmfL81bc|佛種從緣起   => B
 91|15:37|xfHlNf38sgw|性相不二
 92|13:49|JyKZAPtWiiY|無分別智
 93|14:29|VNjsyWCmfXQ|徧計執
 94|15:00|4rw1XofUnkA|角虎集
 95|16:57|nSU_ksKjnbc|心一境性
 96|15:41|bAYAnxX_Vkg|事事無礙
 98|18:11|zEkc4jD6-8g|相妄性真
 99|17:58|xuP0-oXEo1U|生無生論（上）
100|16:53|c3ilEqSF07o|生無生論（下）
102|15:27|Plp5HjWlf-4|修行如調玄
104|15:14|5yvqBiqVW4o|觀－明了的心
105|18:35|yONLPd_DEjs|般若人生觀
106|19:56|xYskwrsYTbM|轉煩惱成菩提
107|17:41|f_aHmebZM5w|改變的大能～緣起法
108|34:16|Y6J1PdwNJ-Y|菩薩的精神
111|16:55|Mz3LyknB1f0|莫向外求
112|18:48|9LNUmWm_4TE|熏習
117|10:46|A-RsHaPN1Yc|中道
118|16:41|J5nRSccTs4g|執著
119|15:01|tPOoXWp9veU|弟子心不安
122|17:34|p0nwTacb0l4|心寂三昧
124|16:53|NE7BCVli-NQ|覺意三昧
126|13:33|ErfFNhGcPtA|血脈論
127|17:07|dGmlikylZT4|轉凡成聖
128|16:51|OukSSCuYYm0|學道三要
129|18:32|5gn_JNNoDj4|圓頓觀心
130|16:02|fTldx1NyeVo|禪波羅密
131|10:49|BzN0jzXBfo4|Buddha Recitation
137|17:39|cqHGCGY3GAM|克念作聖            => B
138|22:33|z-vJebU5G-w|萬法歸心 惟心淨土
150|21:10|U3yA71Iece8|妙因妙果不離一心
175|55:14|JpnL2iOqT4I|勸發菩提心文 八種發心
178|25:26|uZ4Cv19TrLM|諸法無生            => 82026102@ | B | 四性推檢：諸法不自生，亦不從他生，不共不無因，是故知無生。#四運觀心：未生無潛處，欲生無來處，正生無住處，生已無去處。#本惟一心，體無差別。心不見心，無相可得。不更覓心，不動分別。
179|22:17|JBYzjBTyLw8|離言法性
188|18:15|MYT-h3f7wg4|性相空寂
189|24:51|OnO_p3UWBy8|識原於性
190|27:56|xMPoKQkjd7w|如來
191|29:09|Qq9GiNRR04M|無我的智慧
193|34:00|XZd8jDny7NI|緣起正見           => B
#195|33:58|oGVbqo6qN6M|緣起正見（新字慕版）=> 緣起正見_B.jpg
194|17:22|zshhAqlxdaM|性相通說

#!般若中觀
---|17:42|9iAxwIHFtPA|法界互具            => B
---|26:38|NoT0c3pw0HY|實相般若            => B
---|39:12|FT6XxZ_GjoE|二十五圓通          => B
---|22:16|CC-WtHj8fbI|棄生滅，守真常      => B
---|24:52|X3z4vRdFdAQ|照見五蘊皆空        => B | 三智一心中得。
 55|24:43|U519pniqPGE|始終心要            => 76665342@ | B
177|23:13|Ktf_kdmCFoU|止觀大意            => B
134|26:45|teWJSQlslpA|大乘止觀            => B
 22|51:45|jV5I5U7-LEQ|十如是              => A
  1|13:30|rLvHlIhzAX0|一念三千            => B
7|13:00|KkXIfshBwW0|一真法界              => B
5|14:43|z09du7WgUBg|一實境界              => B
 13|23:18|5RgZL3TQAaQ|諸法實相            => B
 69|17:30|XJnHR0R2_zg|真如之體相用        => B
 15|25:02|9MpfSfI-3H0|緣起性空            => 64960319@ | A
180|22:49|8YcWUqERcak|唯心識觀，真如實觀  => O
133|13:41|uecj1LwSJXM|知真本有（上)       => B
132|20:34|8ismiFfenRI|知真本有（下)       => B
---|22:32|dySZvO52KBU|十牛圖              => 55485594@ | B
 83|16:54|IwNnRb-4mkU|聖賢之道            => B

#!唯識相宗
 12|23:33|a-BfwgiAbNI|一切法無我          => B
 56|31:13|5xQ_sRpnJbQ|心能轉境，則同如來  => A
---|26:50|eKmM3Vymbes|一切唯識            => 89519053@ | B
  9|20:11|B05oG1yRx7c|一切唯心造
192|24:59|WCaTHT3aono|唯識綱要
 26|33:42|a6awOZjrNaI|萬法唯識
116|15:56|BO2sNDyHU_8|唯識人生觀
 86|15:35|HjBYFDaC6To|唯識止觀
168| 9:24|YsZ5FLpFNXY|八識規矩頌（1）轉識成智
173|22:16|S7baZqupHmk|八識規矩頌（8）第八識（終）
182|29:57|CIOb_l6pwwo|唯識三十頌（一）
183|27:48|aSjeZ7BMYFg|唯識三十頌（二）
184|33:45|aT0dXirIJl4|唯識三十頌（三）
185|27:51|A006o5otxzE|唯識三十頌（四）
186|28:16|zyDe7o8gacY|唯識三十頌（五）
---|24:06|o5Z7t93B2eg|三界唯心，萬法唯識 => B

#!道人生活
120|16:03|pG1YqnVKWdU|改造生命
121|15:52|c4bsy1Y5zz4|佛子行                  => B | 無著賢菩薩三十七偈
147|28:22|7OXN2J0hGBM|覺醒的人生 1
148|28:02|605kzP2DoeY|覺醒的人生 2
146|29:20|5V-mUHjRZl0|覺醒的人生 3
145|31:49|O9PO5ge9F2g|覺醒的人生 4
142|14:15|U58NjNRFtmY|道人風範（一）毫釐心術  => 道人風範1_B.jpg
141|16:43|2OWRx0EhyN4|道人風範（二）出格見地  => 道人風範2_B.jpg
140|14:39|8uYqp84CkJc|道人風範（三）淡字法門  => 道人風範3_B.jpg
 67|11:12|b4PuiywCAh0|佛化家庭
 59|19:43|vGkpGmjkISM|生活中的一心三觀        => B
 66|19:35|s0irK_Pf0s0|面對困難
101|15:40|fegksmKuPlc|全新的你                => B
103|18:36|zn6U6l8F5Bg|人生的意義
 81|16:04|VKwkyiz461Y|安樂人生
#`; // END OF DATA ============================================

  const M = 1024*1024;

  class GTRLecture {
    constructor(ln) {
      var idx = ln.indexOf('=>'), more;
      if (idx > 0) {
        more = ln.substring(idx+2).trim().split('\|');
        ln = ln.substring(0, idx).trim();
      }
      ln = ln.split('\|');
      this.id    = ln[2].trim();
      this.dur   = ln[1].trim();
      this.title = (ln[3]||'').trim();

      // images, videos, note
      var len = more && more.length || 0;
      for (var j=0; j<len; ++j) {
        var seg = more[j].trim();
        switch (seg) {
        case 'A':                                             // quality A
        case 'B':    seg = `${this.title}_${seg}.jpg`; break; // quality B
        case 'O':    seg = this.title + '.jpg'; break;        // quality poor
        case '.png': seg = this.title + seg;
        default:     seg = seg.replace('~', this.title); break;
        }
        if (this.parseVideoInfo(seg))
          ;
        else if (seg.endsWith('.jpg') || seg.endsWith('.png'))
          this.addImage(seg);
        else
          this.setNote(seg.replaceAll('#', '\n'));
      }
    }
    parseVideoInfo(seg) {
      if (!SEMOY) return false;
      if (seg.endsWith('@')) {
        this.addVideo(`${this.title} [${this.id}].mp4`, rtrim(seg,1));
        return true;
      }
      if (!seg.endsWith('mp4')) return false;
      var a = seg.split('@'), sz;
      if (a.length == 2) {
        sz = a[0].trim();
        seg = a[1].trim();
      }
      if (seg == 'mp4') seg = `${this.title} [${this.id}].mp4`;
      this.addVideo(seg, sz);
      return true;
    }
    addVideo(fname, sz) { this.video = fname; this.videoSize = sz; }
    addImage(fname) {
      if (this.images) this.images.push(fname);
      else this.images = [ fname ];
    }
    hasImages() { return this.images && this.images.length; }
    setNote(n) { this.note = n; }
    getExtra() {
      var mydir = 'gtrjs', viddir = 'gtrjs/alfa-videos';
      var buf = new Buffer();
      var len = this.images && this.images.length;
      if (len > 1) buf.w('圖');
      for (var i=0; i<len; ++i) {
        var img = this.images[i];
        var bgc = null, imgnum = len==1 ? '圖' : (i+1);;
        if (img.indexOf('_A.') < 0) {
          bgc = 'background-color:#ee9';
          if (img.indexOf('_B.') < 0) bgc += '; border:1px gray dashed';
        }
        if (bgc) bgc = ` style="${bgc}"`;
        buf.w(`<a href="${mydir}/${img}" target="extra" title="${img}"${bgc}>${imgnum}</a> `);
      }
      if (this.video) {
        var ttl = '', sz = '';
        if (this.videoSize) ttl = `[${(this.videoSize/M).toFixed(0)}M]`;
        buf.w(`<a href="${viddir}/${this.video}" target="extra" class="vid" title="${ttl}">看</a>`);
      }
      this.note && buf.w(` <span title="${this.note}">★</span>`);
      return buf.render();
    }
  }

  class GTRList extends YTList {
    constructor(name, plid) {
      super((name[0] == '《' || name[0] == '（') ? name : `【${toLen(name,4,'　')}】`, plid);
      this.lectures = {}; // id => GTRLecture
    }
    addLecture(ln) {
      var l = new GTRLecture(ln);
      this.lectures[l.id] = l;
      this.add(l.dur, l.id, l.title, l.getExtra());
      this.lastAdded().viewed = l.hasImages();
    }
    addVideo(id, v, sz) { var l=this.lectures[id]; l&&l.addVideo(v,sz); return this; }

    // override
    renderVideoTextTD(buf, vidInfo) {
      var v = vidInfo, extra = v.extra, cls = '', videoInfo = '',
          ttl = v.getTitleDisp(), idx = (v.titleLen <= 55) ? -1 : ttl.indexOf('|');
      if (idx > 0) ttl = ttl.substring(0,idx) + '<br>' + ttl.substring(idx);
      if (videoInfo) cls = 'vid';
      buf.w(`<td style="padding-left:10px" nowrap class="${cls}" title="${videoInfo}">${ttl}`)
         .wIf(extra, `</td><td style="opacity:0.5">${extra}`)
         .w('</td>');
    }
  }

  var ret = [], a = vids.split('\n'), curlst;
  for (var i=0; i<a.length; ++i) {
    var ln = a[i].trim();
    if (!ln) continue;
    switch (ln[0]) {
    case '#': if (ln[1]=='!') {
                ln = ln.substr(2).trim().split('=');
                var plid = (ln[1]||'').trim();
                ret.push(curlst = new GTRList(ln[0].trim(), plid));
              }
              break;
    case '<': curlst.addCaption(ln); continue;
    default:  curlst.addLecture(ln); break;
    }
  }
  return ret;
}
