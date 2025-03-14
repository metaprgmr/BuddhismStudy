class Pre6Part {
  constructor(txt) {
    this.caption = 'Part pre-6. The Un-translated <i>Śūraṅgama Mantra</i> Part of the Sūtra';
    this.volInfo = '【楞嚴經•卷七】';
    this.txt = txt;
    this.isReady = true;
  }

  toHTML(buf) {
    var fortxt = !buf;
    if (fortxt) buf = new Buffer();
    buf.w('<h1>', this.caption, '</h1><p>', this.volInfo, '</p>');

    var a = this.txt.split('\n');
    for (var i in a) {
      var ln = a[i].trim();
      if (ln) buf.w('<p class="pre6">', ln, '</p>');
    }
    buf.w('<center><hr style="color:red"> <span class="copyright"></span></center>');
    return fortxt ? buf.render() : buf;
  }
}

psg = new Pre6Part(
`阿難。汝問攝心。我今先說入三摩地，修學妙門，求菩薩道。要先持此四種律儀，皎如冰霜。自不能生一切枝葉。心三口四，生必無因。阿難。如是四事，若不遺失。心尚不緣色香味觸。一切魔事，云何發生。若有宿習不能滅除。汝教是人，一心誦我佛頂光明摩訶薩怛多般怛囉無上神咒。斯是如來無見頂相，無為心佛從頂發輝，坐寶蓮華所說心咒。且汝宿世與摩登伽，歷劫因緣恩愛習氣，非是一生及與一劫。我一宣揚，愛心永脫，成阿羅漢。彼尚婬女，無心修行。神力冥資速證無學。云何汝等在會聲聞，求最上乘決定成佛。譬如以塵揚於順風，有何艱險。若有末世欲坐道場。先持比丘清淨禁戒。要當選擇戒清淨者，第一沙門，以為其師。若其不遇真清淨僧，汝戒律儀必不成就。戒成已後，著新淨衣，然香閒居，誦此心佛所說神咒一百八遍，然後結界，建立道場。求於十方現住國土無上如來，放大悲光來灌其頂。阿難。如是末世清淨比丘，若比丘尼，白衣檀越，心滅貪婬，持佛淨戒。於道場中發菩薩願。出入澡浴。六時行道。如是不寐，經三七日。我自現身至其人前，摩頂安慰，令其開悟。

阿難白佛言：世尊。我蒙如來無上悲誨，心已開悟。自知修證無學道成。末法修行建立道場，云何結界，合佛世尊清淨軌則。

佛告阿難。若末世人願立道場。先取雪山大力白牛。食其山中肥膩香草。此牛唯飲雪山清水。其糞微細。可取其糞，和合栴檀，以泥其地。若非雪山，其牛臭穢，不堪塗地。別於平原，穿去地皮五尺已下，取其黃土，和上栴檀、沈水、蘇合、薰陸、鬱金、白膠、青木、零陵、甘松、及雞舌香。以此十種細羅為粉。合土成泥，以塗場地。方圓丈六，為八角壇。壇心置一金銀銅木所造蓮華。華中安砵。砵中先盛八月露水。水中隨安所有華葉。取八圓鏡，各安其方，圍繞華砵。鏡外建立十六蓮華。十六香鑪，間華鋪設。莊嚴香鑪，純燒沈水，無令見火。取白牛乳，置十六器。乳為煎餅，并諸砂糖、油餅、乳糜、蘇合、蜜薑、純酥、純蜜。於蓮華外，各各十六圍繞華外。以奉諸佛及大菩薩。每以食時，若在中夜，取蜜半升，用酥三合。壇前別安一小火爐。以兜樓婆香，煎取香水，沐浴其炭，然令猛熾。投是酥蜜於炎爐內，燒令煙盡，享佛菩薩。令其四外遍懸幡華。於壇室中，四壁敷設十方如來及諸菩薩所有形像。應於當陽，張盧舍那、釋迦、彌勒、阿閦、彌陀。諸大變化觀音形像，兼金剛藏，安其左右。帝釋、梵王、烏芻瑟摩、并藍地迦、諸軍茶利、與毗俱胝、四天王等，頻那夜迦，張於門側，左右安置。又取八鏡覆懸虛空，與壇場中所安之鏡，方面相對，使其形影重重相涉。於初七中，至誠頂禮十方如來，諸大菩薩，阿羅漢號。恒於六時誦咒圍壇，至心行道。一時常行一百八遍。第二七中，一向專心發菩薩願，心無間斷。我毗奈耶先有願教。第三七中，於十二時，一向持佛般怛囉咒。至第七日，十方如來一時出現。鏡交光處，承佛摩頂。即於道場修三摩地。能令如是末世修學，身心明淨猶如琉璃。阿難。若此比丘本受戒師，及同會中十比丘等，其中有一不清淨者，如是道場多不成就。從三七後，端坐安居，經一百日。有利根者，不起於座，得須陀洹。縱其身心聖果未成。決定自知成佛不謬。汝問道場，建立如是。

阿難頂禮佛足，而白佛言：自我出家，恃佛憍愛。求多聞故，未證無為。遭彼梵天邪術所禁心雖明了，力不自由。賴遇文殊，令我解脫。雖蒙如來佛頂神咒，冥獲其力，尚未親聞。惟願大慈重為宣說，悲救此會諸修行輩，末及當來在輪迴者，承佛密音，身意解脫。

於時會中一切大眾，普皆作禮，佇聞如來秘密章句。爾時世尊從肉髻中。涌百寶光。光中涌出千葉寶蓮。有化如來，坐寶華中。頂放十道百寶光明。一一光明。皆遍示現十恒河沙金剛密跡，擎山持杵，遍虛空界。大眾仰觀，畏愛兼抱，求佛哀祐。一心聽佛無見頂相放光如來宣說神咒。

《<a class="lnk" href="../../../陀羅尼/楞嚴咒/Shurangama-mantra-信裹.html">楞嚴咒 The Śūraṅgama Mantra</a>》，全名《一切如來頂髻白傘蓋無有能及甚能調伏大總持》

阿難。是佛頂光聚，悉怛多般怛羅，祕密伽陀，微妙章句。出生十方一切諸佛。十方如來，因此咒心，得成無上正遍知覺。十方如來，執此咒心，降伏諸魔，制諸外道。十方如來，乘此咒心，坐寶蓮華，應微塵國。十方如來，含此咒心，於微塵國轉大法輪。十方如來，持此咒心，能於十方摩頂授記。自果未成，亦於十方蒙佛授記。十方如來，依此咒心，能於十方拔濟群苦。所謂地獄餓鬼畜生，盲聾瘖啞，怨憎會苦、愛別離苦、求不得苦、五陰熾盛，大小諸橫同時解脫。賊難兵難、王難獄難、風火水難、飢渴貧窮，應念銷散。十方如來，隨此咒心，能於十方事善知識，四威儀中供養如意。恒沙如來會中，推為大法王子。十方如來，行此咒心，能於十方攝受親因，令諸小乘聞祕密藏，不生驚怖。十方如來，誦此咒心，成無上覺，坐菩提樹，入大涅槃。十方如來，傳此咒心，於滅度後付佛法事，究竟住持，嚴淨戒律，悉得清淨。若我說是佛頂光聚般怛羅咒，從旦至暮，音聲相聯，字句中間，亦不重疊，經恒沙劫終不能盡。亦說此咒名如來頂。汝等有學，未盡輪迴，發心至誠取阿羅漢，不持此咒而坐道場，令其身心遠諸魔事，無有是處。

阿難。若諸世界，隨所國土所有眾生，隨國所生樺皮貝葉紙素白㲲書寫此咒，貯於香囊。是人心昏，未能誦憶。或帶身上。或書宅中。當知是人盡其生年，一切諸毒所不能害。

阿難。我今為汝更說此咒，救護世間得大無畏，成就眾生出世間智。若我滅後，末世眾生，有能自誦，若教他誦，當知如是誦持眾生，火不能燒，水不能溺，大毒小毒所不能害。如是乃至天龍鬼神，精祇魔魅，所有惡咒，皆不能著。心得正受。一切咒詛厭蠱毒藥、金毒銀毒、草木蟲蛇萬物毒氣，入此人口，成甘露味。一切惡星并諸鬼神，磣心毒人，於如是人不能起惡。頻那夜迦諸惡鬼王，并其眷屬，皆領深恩，常加守護。

阿難當知。是咒常有八萬四千那由他恒河沙俱胝金剛藏王菩薩種族，一一皆有諸金剛眾而為眷屬，晝夜隨侍。設有眾生，於散亂心，非三摩地，心憶口持。是金剛王，常隨從彼諸善男子。何況決定菩提心者。此諸金剛菩薩藏王，精心陰速，發彼神識。是人應時心能記憶八萬四千恒河沙劫，周遍了知，得無疑惑。從第一劫乃至後身，生生不生藥叉羅剎，及富單那，迦吒富單那，鳩槃茶，毗舍遮等，并諸餓鬼，有形無形、有想無想、如是惡處。是善男子，若讀若誦、若書若寫、若帶若藏，諸色供養，劫劫不生貧窮下賤不可樂處。此諸眾生，縱其自身不作福業，十方如來所有功德，悉與此人。由是得於恒河沙阿僧祇不可說不可說劫，常與諸佛同生一處。無量功德，如惡叉聚。同處熏修，永無分散。是故能令破戒之人，戒根清淨。未得戒者，令其得戒。未精進者，令得精進。無智慧者，令得智慧。不清淨者，速得清淨。不持齋戒，自成齋戒。

阿難。是善男子持此咒時。設犯禁戒於未受時。持咒之後。眾破戒罪，無問輕重，一時銷滅。縱經飲酒，食噉五辛，種種不淨，一切諸佛菩薩金剛天仙鬼神不將為過。設著不淨破弊衣服。一行一住悉同清淨。縱不作壇，不入道場，亦不行道，誦持此咒，還同入壇行道功德，無有異也。若造五逆無間重罪，及諸比丘比丘尼四棄八棄，誦此咒已，如是重業，猶如猛風吹散沙聚悉皆滅除，更無毫髮。

阿難。若有眾生，從無量無數劫來，所有一切輕重罪障，從前世來未及懺悔。若能讀誦書寫此咒，身上帶持，若安住處莊宅園館。如是積業，猶湯銷雪。不久皆得悟無生忍。復次阿難。若有女人，未生男女，欲求孕者，若能至心憶念斯咒，或能身上帶此悉怛多般怛囉者，便生福德智慧男女。求長命者，即得長命，欲求果報速圓滿者，速得圓滿。身命色力，亦復如是。命終之後，隨願往生十方國土，必定不生邊地下賤，何況雜形。

阿難。若諸國土州縣聚落，饑荒疫癘。或復刀兵賊難鬥諍。兼餘一切厄難之地。寫此神咒，安城四門，并諸支提，或脫闍上。令其國土所有眾生，奉迎斯咒，禮拜恭敬，一心供養。令其人民各各身佩。或各各安所居宅地。一切災厄悉皆銷滅。阿難。在在處處，國土眾生，隨有此咒，天龍歡喜，風雨順時，五穀豐殷，兆庶安樂。亦復能鎮一切惡星，隨方變怪。災障不起。人無橫夭。杻械枷鎖不著其身。晝夜安眠，常無惡夢。

阿難。是娑婆界，有八萬四千災變惡星。二十八大惡星而為上首。復有八大惡星以為其主。作種種形出現世時，能生眾生種種災異。有此咒地，悉皆銷滅。十二由旬成結界地。諸惡災祥永不能入。是故如來宣示此咒，於未來世，保護初學諸修行者，入三摩提，身心泰然，得大安隱。更無一切諸魔鬼神，及無始來冤橫宿殃，舊業陳債，來相惱害。汝及眾中諸有學人，及未來世諸修行者，依我壇場如法持戒，所受戒主，逢清淨僧，持此咒心，不生疑悔。是善男子，於此父母所生之身，不得心通，十方如來便為妄語。

說是語已。會中無量百千金剛，一時佛前合掌頂禮，而白佛言：如佛所說。我當誠心保護如是修菩提者。爾時梵王、并天帝釋、四天大王，亦於佛前同時頂禮，而白佛言：審有如是修學善人，我當盡心至誠保護，令其一生所作如願。復有無量藥叉大將、諸羅剎王、富單那王、鳩槃茶王、毗舍遮王、頻那夜迦、諸大鬼王、及諸鬼帥，亦於佛前合掌頂禮。我亦誓願護持是人，令菩提心速得圓滿。復有無量日月天子，風師雨師，雲師雷師，并電伯等，年歲巡官，諸星眷屬，亦於會中頂禮佛足，而白佛言：我亦保護是修行人，安立道場，得無所畏。復有無量山神海神，一切土地水陸空行，萬物精祇，并風神王，無色界天，於如來前，同時稽首而白佛言：我亦保護是修行人，得成菩提，永無魔事。爾時八萬四千那由他恒河沙俱胝金剛藏王菩薩，在大會中，即從座起，頂禮佛足而白佛言：世尊。如我等輩所修功業，久成菩提，不取涅槃，常隨此咒，救護末世修三摩提正修行者。世尊。如是修心求正定人，若在道場及餘經行，乃至散心遊戲聚落，我等徒眾，常當隨從侍衛此人。縱令魔王大自在天，求其方便，終不可得。諸小鬼神，去此善人十由旬外。除彼發心樂修禪者。世尊。如是惡魔若魔眷屬，欲來侵擾是善人者。我以寶杵殞碎其首，猶如微塵。恒令此人，所作如願。`);
