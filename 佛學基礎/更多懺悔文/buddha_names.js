// https://baike.baidu.com/item/七佛/11033674

const lastseven = [
[ '毘婆尸佛',
  '意译为观，以其如月圆智满，则云遍见。魄尽惑亡，则云净观。既圆且净，则云胜观、胜见，是为七佛之首也。'
],
[ '尸棄佛',
  '意译为火，又云持髻。谓无分别智最为尊上，处于心顶也。过毗婆尸佛三十劫后，而成正觉。（无分别智者，即根本智，谓为众智之本也。）'
],
[ '毘舍浮佛',
  '意译遍一切自在。谓烦恼断尽，于一切处无不自在，而为庄严劫中千佛之最后一佛也。'
],
[ '拘留孫佛',
  '意译所应断。谓断一切烦恼，永尽无余。于贤劫中第九减劫，人寿减至六万岁时，出世成佛，为千佛首。'
],
[ '拘那含牟尼佛',
  '意译金色仙、金儒、金寂，谓金则明现，寂则无碍也。《大智度论》云，又名迦那迦牟尼，华言金仙人。谓身金色故也。人寿减至四万岁时，于阎浮提出世成佛。'
],
[ '迦葉佛',
  '意译饮光。谓身光显赫，能饮蔽一切光明故也。人寿减至二万岁时，出世成佛。'
],
[ '釋迦牟尼佛',
  '意译能仁寂默。能仁是姓，寂默是字。以寂默故，不住生死。以能仁故，不住涅盘。悲智双运，利物无穷，故立此号也。人寿减至一百岁时，出世，为贤劫中第四佛。'
]
];

// 《大懺悔文略解》

const fiftythree = [
[ '約三身釋',
  '普光佛',
  '言普光者。謂化身百億。光照大千故。',
  '普明佛',
  '普明者。謂報身相好放無邊光。明如杲日故。',
  '普淨佛',
  '普淨者。謂一真法身。猶若虛空。本來清淨故。'
],
[ '以德表顯',
  '多摩羅跋栴檀香佛',
  '多摩羅跋。此云離垢。牛頭山名也。栴檀。此云與藥。香也。能除風熱等病。以喻如來眾德妙香。普薰一切。眾生聞者。離垢清淨。故名多摩羅跋栴檀香也。',
  '栴檀光佛',
  '栴檀光者。楞嚴云。自得心開。如染香人。身有香氣。今本佛香光莊嚴。明淨滿足。眾生見者。心眼開明。故名栴檀光也。'
],
[ '以喻表顯',
  '摩尼幢佛',
  '摩尼幢者。幢。功德高顯之貌。謂如來利生。處處建大法幢。如摩尼珠隨方現色。摧伏魔軍。破諸黑暗。凡有見者。無不皈敬。故名摩尼幢也。',
  '歡喜藏摩尼寶積佛',
  '歡喜藏摩尼寶積者。如來無盡法喜。名之為藏。眾生聞者。離苦得樂。故云歡喜。猶若如意寶珠。利益無盡。故名歡喜藏摩尼寶積也。'
],
[ '一切世間樂見上大精進佛',
  '一切世間。乃普及之辭。樂見。是喜好之意。上大精進。揀非權小之行也。謂此如來因中發最上心。修廣大行。精進無移。故於果上感得一切眾生所愛樂身。能令見者聞者。皆發菩提故。上句名覺他。功也。下句顯自覺。德也。功成德滿。故名一切世間樂見上大精進也。此約因果同圓。顯德為號。'
],
[ '法喻表顯',
  '摩尼幢燈光佛',
  '摩尼幢燈光者。謂以實智證理。喻如摩尼珠幢。權智鑒機。喻如燈光遍照。權實雙彰。故名摩尼幢燈光也。',
  '慧炬照佛',
  '慧炬照者。謂以聞思修三慧火炬照破見思(塵沙無明)三惑故。如燈明暗盡。慧起惑除故名慧炬照也。'
],
[ '智德表顯',
  '海德光明佛',
  '海德光明者。光明。表智德。謂如來智德無盡。以喻如海。故云海德光明也。',
  '金剛牢強普散金光佛',
  '金剛牢強普散金光者。金剛。性最堅利。不為物壞。而能壞一切物。喻佛不為煩惱破壞。而能破壞一切煩惱。故名金剛牢強也金體極明。不為物照。而能照一切物。喻佛不為無明暗障。而能照破無明。故名普散金光也。'
],
[ '從德表顯',
  '大強精進勇猛佛',
  '大強精進勇猛者。不雜曰精。不退曰進。不怯曰勇。不怖曰猛。謂世尊無量劫來。於諸善法。不雜不退。故稱為大。於諸惡道。不怖不怯。故稱為強由大強故不休不息。故得斷除三障證三菩提故名大強精進勇猛也。',
  '大悲光佛',
  '大悲光者。謂豎窮橫遍曰大。法身德也。運心拔苦曰悲。解脫德也。寂照不二曰光。般若德也。三德圓融。故名大悲光也。',
  '慈力王佛',
  '慈力王者。力。勝也。王。往也。謂佛念眾生。慈無能勝。能令人天。皆共歸往。故名慈力王也。',
  '慈藏佛',
  '慈藏者。謂一極慈心。攝歸萬善。法界含容。出生無盡。故名慈藏也。'
],
[ '依正顯德',
  '栴檀窟莊嚴勝佛',
  '栴檀窟莊嚴勝者。妙香之所成也。謂如來八萬四千毛孔。皆出妙香。猶如栴檀。普熏一切。以此妙寶莊嚴法窟。最勝無比。故名栴檀窟莊嚴勝也。',
  '賢善首佛',
  '賢善首者。如來道高德重。故稱為賢。迥出九界。故稱曰善。為天中之天。聖中之聖。故名賢善首也。',
  '善意佛',
  '善意者。謂如來慈念一切眾生。猶如赤子。從生至生。接引無倦。故名善意也。',
  '廣莊嚴王佛',
  '廣莊嚴王者。謂如來色相。萬德莊嚴。故稱為廣。無量劫來。自在安然。不為物轉。故名廣莊嚴王也。'
],
[ '法喻表顯',
  '金華光佛',
  '金華光者。謂戒心發行。喻如金華。離欲清淨。喻如金光。金。表法身。華。表解脫。光。表般若。三德理圓。故名金華光也。此顯如來清淨光明。無邊相好。皆以持戒而得莊嚴成就。故律云。諸佛證菩提獨覺身心淨。及以阿羅漢。鹹由律行成',
  '寶蓋照空自在力王佛',
  '寶蓋照空自在力王者。以信為實。七菩提分為蓋照耀虛空。令諸眾生。得大利樂。自在無礙。故名寶蓋照空自在力王也。',
  '虛空寶華光佛',
  '虛空寶華光者。法身無相。猶若虛空。本來無染。故稱為寶。心花發焰照真法界。故名虛空寶華光也。',
  '琉璃莊嚴王佛',
  '琉璃莊嚴王者。梵語琉璃。此云青色寶。乃七寶中之最勝者。佛身清淨。故曰琉璃。內外明照。故曰莊嚴。不為群魔之所障蔽。故名琉璃莊嚴王也。'
],
[ '以法表顯',
  '普現色身光佛',
  '普現色身光者。華嚴經云。佛身充滿於法界。普現一切群生前圓光普照於十方。示現種種所行事。故名普現色身光也。',
  '不動智光佛',
  '不動智光者。不動智。即根本智體也。謂本佛法身。如如不動故。光者。即差別智。用也。謂從體起用。如月印千江。故名不動智光也。',
  '降伏眾魔王佛',
  '降伏眾魔王者。謂如來以無漏慧力。降伏諸魔。波旬受化。於法自在。故名降伏眾魔王也。',
  '才光明佛',
  '才光明者。謂以無礙智慧辨才照了諸法。破諸煩惱。利益群生。故名才光明也。',
  '智慧勝佛',
  '智慧勝者。勝力也。謂以一切智力破見思惑以道種智力。破塵沙惑。以一切種智力。破無明惑。三惑既除。覺體常照。功強於彼。故名智慧勝也。'
],
[ '種智顯德',
  '彌勒仙光佛',
  '彌勒仙光者。彌勒。此云慈氏。姓也。仙覺也。謂從發菩提心以來。未嘗入俗。故以為姓。仙光者。離垢清淨之光也。佛為大慈金仙。以無垢清淨智光。普照諸有。離苦得樂。故名彌勒仙光也。',
  '善寂月音妙尊智王佛',
  '善寂月音妙尊智王者。謂智照如月覺妙若音。經云。菩薩清涼月。常遊畢竟空。善寂月音也。又云。眾生心水淨。菩提影現中。妙尊智王也。上句為喻。下句為法。謂以權實智光。覺法自在。如月形影音響一切。雙亡雙照。故名善寂月音妙尊智王也。',
  '世淨光佛',
  '世淨光者。謂如來出世以諸道法。教化眾生。清淨身心。永離黑暗。故名世淨光也。',
  '龍種上尊王佛',
  '龍種上尊王者。謂龍種。世間最為尊上。聞佛音教感發信心。歸投於佛。而得自在。故名龍種上尊王也。'
],
[ '法喻表顯',
  '日月光佛',
  '日月光者。謂以根本智證理。以後得智斷惑。情忘理顯心地開明。光同日月。故名日月光也。',
  '日月珠光佛',
  '日月珠光者。謂如來以三覺智光。照破一切眾生。無明不覺之惑業。故名日月珠光也。',
  '慧幢勝王佛',
  '慧幢勝王者。謂如來建大智慧幢幡。降伏魔軍。功力殊勝。故名慧幢勝王也。',
  '師子吼自在力王佛',
  '獅子吼自在力王者。獅子獸中之王。發聲哮吼。百獸潛藏。如來法音奮同獅子。智慧威德。力勝如王。故云獅子吼自在力王也。古云。佛獅子吼。魔外拱手。四眾聞之得大無畏是也。',
  '妙音勝佛',
  '妙音勝者。謂如來說法不動聲色而周遍十方。故曰妙音。眾生聞之。隨類得解。究成種智。故名妙音勝也。'
],
[ '以法顯德',
  '常光幢佛',
  '常光幢者。謂如來常建大光明幢。無明黑暗。悉皆摧滅。故名常光幢也。',
  '觀世燈佛',
  '觀世燈者。謂如來觀彼世間眾生。從冥入冥。不思返照。是故以大法燈。引歸寶所。故名觀世燈也。',
  '慧威燈王佛',
  '慧威燈王者。以根本智。起後得智。現大法威。故名慧威。猶如燈王。傳耀無盡。眾生蒙光。而得自在。故名慧威燈王。'
],
[ '法喻表顯',
  '法勝王佛',
  '法勝王者。經云。我為法王。於法自在。故名法勝王也。',
  '須彌光佛',
  '須彌光者。須彌。此云妙高。山王名也。謂四寶所成。故稱為妙。迥出群峰。故稱為高。既高且妙。稱為山王。照耀四方。故名曰光。以喻如來四智轉成妙覺佛果。高出人天。光明普照。故名須彌光也。'
],
[ '從喻表顯',
  '須摩那華光佛',
  '須摩那華光者。須摩那。此云稱意華名也。色有黃白。而香光遠徹。以喻如來戒善香光。無不稱意。故名須摩那華光也。',
  '優曇缽羅華殊勝王佛',
  '優曇缽羅華殊勝王者。優曇缽羅。此云靈瑞。又云瑞應華名也。三千年一現。現則金輪王出。故名殊勝。以喻如來希有難遇。故名優曇缽羅華殊勝王也。經云。諸佛興出世。懸遠值遇難。譬如優曇華。時乃一現耳。'
],
[ '從法為名',
  '大慧力王佛',
  '大慧力王者。顯非權小智慧之力也。謂如來法王。以大智慧力。引導眾生。直到涅槃彼岸。故名大慧力王也。',
  '阿閦毗歡喜光佛',
  '阿閦毗歡喜光者。阿閦毗。此云不動。佛名如如不動故。歡喜。國號。人天喜愛故光者。謂依正二報。並放光明。不動寂常。十方遍照。一切人天。無不歡喜。故名阿閦毗歡喜光也。',
  '無量音聲王佛',
  '無量音聲王者。謂如來以無盡音聲。說無窮妙法。自在無礙。故名無量音聲王也。',
  '才光佛',
  '才光者。才辨才也。光。智光也。謂如來具足無量辨才。智慧光明。普利一切。故名才光也。'
],
[ '智慧表顯',
  '金海光佛',
  '金海光者。謂佛身如海。金光紫赤。照耀無窮。以喻海印三昧。表法殊勝。故楞嚴云。如我按指。海印發光。故名金海光也。',
  '山海慧自在通王佛',
  '山海慧自在通王者。謂真實慧如山。方便慧如海。合則成無障礙慧。故名山海慧也。自在通王者。俗諦曰自在。真諦曰通。中道諦曰王。以此三種大智慧。會入三諦理。故名自在通王也。'
],
[ '以法表顯',
  '大通光佛',
  '大通光者。謂覺體曰大。法身德也。覺用曰通。解脫德也。覺相曰光。般若德也。三德圓融。不可思議。故名大通光也。',
  '一切法幢滿王佛',
  '一切法幢滿王者。謂五教三乘。名一切法標示人天曰幢。周遍法界曰滿。法法自在曰王。以一切法豎窮橫遍圓融無礙故名一切法幢滿王也。'
]
]; // end of fiftythree

const thirtyfive = [
[ '釋迦牟尼佛',
  '釋迦牟尼者。釋迦。此云能仁。姓也。從慈悲利物以立名。牟尼。此云寂默。字也。依智慧冥理而為號能仁故。不住於涅槃。寂默故。不住於生死悲智並運。真俗雙融。故名釋迦牟尼也。此佛從姓字合稱。'
],
[ '法喻表顯',
  '金剛不壞佛',
  '金剛不壞者。淨名云。如來身者。金剛之體。物不能壞。諸惡已斷眾善普會。何疾何惱。故名金剛不壞也。',
  '寶光佛',
  '寶光者。楞嚴云。從肉髻中。湧百寶光光中現佛。宣說神咒。故名寶光也。',
  '龍尊王佛',
  '龍尊王者。謂龍中最尊。故稱曰王。以喻如來法王眾聖中尊。故名龍尊王也。',
  '精進軍佛',
  '精進軍者。謂世軍勇猛精進。能卻怨敵。如來為大法將。降伏魔軍。故名精進軍也。',
  '精進喜佛',
  '精進喜者。謂精進。乃修道之寶。由精進故。專心向道。得法喜樂。佛果圓成。故名精進喜也。'
],
[ '法喻顯德',
  '寶火佛',
  '寶火者。顯非世間之火也。有四義故。一。焚燒義。以喻燒諸煩惱故。二。照了義。以喻佛光普照故。三。熏炙義。以喻真如內熏故。四。成熟義。以喻成熟善根故。具此四義。故名寶火也。如楞嚴云。如來藏中。性空真火。清淨本然。周遍法界。隨眾生心。應所知量。是也。此喻如如佛身。',
  '寶月光佛',
  '寶月光者。寶。體也。以表法身。月。相也。以表解脫。光。用也。以表般若。體相用顯。故名寶月光也。此喻如來功德佛身。',
  '現無愚佛',
  '現無愚者。謂智光一發。癡障全消。故名現無愚也。如圓覺經云。智慧愚癡。通為般若。此喻如來智慧佛身。',
  '寶月佛',
  '寶月者。寶。濟苦義。月。清涼義。謂以清涼寶。普濟眾生。除熱惱苦。故名寶月也。此喻如來應化佛身。'
],
[ '並約法說',
  '無垢佛',
  '無垢者。謂如來自性清淨。本無垢染。故名無垢也。如法界論云。自性清淨。無有染著。故名如來也。',
  '離垢佛',
  '離垢者。謂如來覺體。無量劫來。永離煩惱塵垢。故名離垢也。如法界論云。不淨眾生界。染中淨菩薩。最極清淨者。是說為如來。前是在纏如來藏。本覺性淨故。後是出纏如來藏。圓覺究淨也。'
],
[ '悲智雙融。事理顯德',
  '勇施佛',
  '勇施者。謂以財法無畏三種。等施眾生。無有懈退。故名勇施也。',
  '清淨佛',
  '清淨者。謂如來自性清淨離諸塵染。內外洞徹。無幽不燭。故名清淨也。',
  '清淨施佛',
  '清淨施者。謂以正助道法。教化眾生。三輪體空。能所不著。故名清淨施也。'
],
[ '法喻顯德',
  '娑留那佛',
  '娑留那者。此云甘露水。謂甘露有起死回生之功。佛法具轉凡成聖之德。有此功能。故名娑留那也。',
  '水天佛',
  '水天者。謂以性天理水長養心苗。修習觀行。成正覺果。故名水天也。',
  '堅德佛',
  '堅德者。謂以無漏戒法。修攝其心。如保浮囊。堅守不破。以德彰名。故名堅德也。',
  '栴檀功德佛',
  '栴檀功德者。謂有益於事曰功。救度一切曰德。謂如來說法。不可思議。眾生聞之。如得栴檀。病即除愈。具此力用。故名栴檀功德也。'
],
[ '皆以德顯',
  '無量掬光佛',
  '無量掬光者。掬。撮也。謂如來妙相。撮出光明。重重無盡。故名無量掬光也。',
  '光德佛',
  '光德者。謂慈光普照。利益有情。恩德無盡。故名光德也。',
  '無憂德佛',
  '無憂德者。謂如來證大涅槃。永離諸漏。無有憂惱。具此功德。故名無憂德也。'
],
[ '從喻顯德',
  '那羅延佛',
  '那羅延者。此云堅固。謂佛身堅固。猶若金剛。無能沮壞。故名那羅延也。',
  '功德華佛',
  '功德華者。謂如來功成妙智。了悟真常。萬行因華莊嚴果德。故名功德華也。',
  '蓮華光遊戲神通佛',
  '蓮華光遊戲神通者。華光。表佛智也。謂光雖遠照。而本不移。以喻如來遊化諸方。不離華光三昧。皆以神通變現。故名蓮華光遊戲神通也。',
  '財功德佛',
  '財功德者。謂如來以功德法財。普濟諸有。證大菩提。故名財功德也。'
],
[ '法喻表顯',
  '德念佛',
  '德念者。德。成佛之本也。念利生之心也。以德故上弘佛道。以念故。下化眾生。二利同圓。故名德念也。',
  '善名稱功德佛',
  '善名稱功德者。善。贊美之稱。謂如來所修利生功德贊莫能窮。見相聞名。鹹沾利樂。故名善名稱功德也。',
  '紅焰帝幢王佛',
  '紅焰帝幢王者。紅焰。乃天帝宮中赤珠幢之光也。珠光遠射。故曰紅焰。此幢惟天帝宮中所有。故稱為王以喻如來身相紫金光焰。大千國土。惟佛最尊。故名紅焰帝幢王也。'
],
[ '以法表顯',
  '善遊步功德佛',
  '善遊步功德者。謂如來行步。猶若象王。不類余人。輕舉妄動。凡所施行。皆能感發一切眾生。發菩提心。增長功德。故名善遊步功德也。又具三種意生身。善遊步者種類意身。功者。三昧意身。德者。覺法意身也。詳如楞伽經說。',
  '鬥戰勝佛',
  '鬥戰勝者。謂佛以智箭禪弓。光明慧劍。與陰魔煩惱魔共鬥。諸天魔外。戰力不如。鹹皆受化。故名鬥戰勝也。',
  '善遊步佛',
  '善遊步者。謂如來以神足力。周遍十方。自在遊行。感化諸有。故名善遊步也。',
  '周匝莊嚴功德佛',
  '周匝莊嚴功德者。謂十方三際生佛依正。悉以功德法行淨妙莊嚴。非類世間。有為物比。故名周匝莊嚴功德也。'
],
[ '法喻表顯',
  '寶華遊步佛',
  '寶華遊步者。有二意。一。謂盛眾妙華供養他方十萬億佛。即以食時。還到本國。飯食經行也。二。如來足下。有千輻輪相。凡所遊行。寶華乘足。故名寶華遊步也。',
  '寶蓮華善住娑羅樹王佛',
  '寶蓮華善住娑羅樹王者。寶蓮。清淨無垢之華也。善住。身心安住故。娑羅。此云最勝。亦云堅固。既勝且固。故名樹王。謂如來於此樹下。安住身心。起智斷惑。心寶如蓮永離諸垢。猶如樹王。最勝堅固。故名寶蓮華善住娑羅樹王也。'
]
]; // end of thirtyfive.


const amitabha = [
[ '法界藏身阿彌陀佛',
  '法界藏身者。有其二意。一。謂因名法藏比丘。果成法界藏身報也。二。如觀經云。諸佛如來是法界身。入一切眾生心想中。今彌陀亦法界身。遍十方虛空法界微塵剎土中也。阿彌陀者。此翻亦有二意。一。云無量壽。謂彼佛壽命。無量無邊阿僧祗劫故。二。無量光。謂彼佛光明。照十方國無有障礙故。然理實身相功德。依正莊嚴。皆無有量。故稱阿彌陀也。此亦單就法說詳如諸淨土經。'
]
];

function getAllNamesIn4Groups() {
  return [
    getAllNames(lastseven),
    getAllNames(fiftythree),
    getAllNames(thirtyfive),
    getAllNames(amitabha)
  ];
}

function getAllBuddhaNames() {
  var ret = [];
  getAllNames(lastseven, ret);
  getAllNames(fiftythree, ret);
  getAllNames(thirtyfive, ret);
  getAllNames(amitabha, ret);
  return ret;
}

function getAllNames(groups, ret) {
  if (!ret) ret = [];
  for (var g in groups) {
    var coll = groups[g], len = coll.length, numBuddhas = Math.floor(len/2);
    var i=0, groupType = (numBuddhas * 2 < coll.length) ? coll[i++] : '';
    for (; i<len; i++) ret.push(coll[i++]);
  }
  return ret;
}

