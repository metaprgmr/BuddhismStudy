class SKVisit {
  constructor(o) { Object.assign(this,o); }
  getTeacher80() { return Array.isArray(this.teacher) ? this.teacher[0] : this.teacher; }
  getTeacher40() { return this.teacher40 || this.getTeacher80(); }
}

var VISITS53 = [ // Sudhanakumāra
  { teacher:[ '德雲比丘', '功德雲比丘', '吉祥雲比丘' ], sanskrit:'Meghaśrī-bhikşu', where:'勝樂國妙峯山', num: 1,
    teacher40: '吉祥雲比丘',
    volInHY80: 3, // 入法界品第三十九之三
    volInHY40: 4,
    teaching:'“憶念一切諸佛境界智慧光明普見法門”'
  },
  { teacher:'海雲比丘', sanskrit:'Sāgara-megha', where:'海門國', num: 2,
    volInHY80: 3, // 入法界品第三十九之三
    volInHY40: 5,
    teaching:'“諸佛菩薩行光明普眼法門”'
  },
  { teacher:'善住比丘', sanskrit:'Supratişthita', where:'楞伽道邊海岸聚落', num: 3,
    teacher40: '妙住比丘',
    volInHY80: 3, // 入法界品第三十九之三
    volInHY40: 5,
    teaching:'“普速疾供養諸佛成就眾生無礙解脱法門”'
  },
  { teacher:'彌伽大士', sanskrit:'Megha-dramida', where:'達裏鼻茶國自在城', num: 4,
    volInHY80: 4, // 入法界品第三十九之四
    volInHY40: 5,
    teaching:'“妙音陀羅尼光明法門”'
  },
  { teacher:'解脱長者', sanskrit:'Vimuktika-śreşthin', where:'遊行十二年至住林城', num: 5,
    volInHY80: 4, // 入法界品第三十九之四
    volInHY40: 6,
    teaching:'“如來無礙莊嚴解脱法門”'
  },
  { teacher:'海幢比丘', sanskrit:'Sāgara-dhvaja', where:'閻浮提畔利伽羅國', num: 6,
    volInHY80: 4, // 入法界品第三十九之四
    volInHY40: 6,
    teaching:'“般若波羅蜜三昧光明”'
  },
  { teacher:'休舍優婆夷', sanskrit:'Ashā', where:'海潮處普莊嚴國', num: 7,
    teacher40: '伊舍那優婆夷',
    volInHY80: 5, // 入法界品第三十九之五
    volInHY40: 7,
    teaching:'“離憂安穩幢解脱法門”'
  },
  { teacher:[ '毗目瞿沙仙人', '毗目多羅仙人' ], sanskrit:'Bhīşmottara-nirghoşa', where:'那羅素國', num: 8,
    teacher40: '大威猛聲仙人',
    volInHY80: 5, // 入法界品第三十九之五
    volInHY40: 8,
    teaching:'“菩薩無勝幢解脱”'
  },
  { teacher:[ '勝熱婆羅門', '方便命婆羅門' ], sanskrit:'Jayoşmāya', where:'伊沙那聚落', num: 9,
    volInHY80: 5, // 入法界品第三十九之五
    volInHY40: 8,
    teaching:'承其教，於登刀山、投火聚時，證得菩薩善住三昧及菩薩寂靜樂神通三昧。',
  },
  { teacher:'慈行童女', sanskrit:'Maitreyanī', where:'獅子奮迅城', num: 10,
    volInHY80: 6, // 入法界品第三十九之六
    volInHY40: 9,
    teaching:'“般若波羅蜜普莊嚴法門”'
  },
  { teacher:'善見比丘', sanskrit:'Su-darshana', where:'三眼國', num: 11,
    volInHY80: 6, // 入法界品第三十九之六
    teacher40: '妙見比丘',
    volInHY40: 9,
    teaching:'“菩薩隨順燈解脱法門”'
  },
  { teacher:[ '自在主童子', '釋天主童子' ], sanskrit:'Indriyeśvara', where:'名聞國河渚中', num: 12,
    volInHY80: 6, // 入法界品第三十九之六
    volInHY40: 9,
    teaching:'“一切工巧大神通智光明法門”'
  },
  { teacher:[ '具足優婆夷', '自在優婆夷' ], sanskrit:'Prabhūtā', where:'海住大城', num: 13,
    teacher40: '辯具足優婆夷',
    volInHY80: 6, // 入法界品第三十九之六
    volInHY40: 10,
    teaching:'“菩薩無盡福德藏解脱法門”'
  },
  { teacher:[ '明智居士', '甘露頂長者' ], sanskrit:'Vidvan', where:'大興城', num: 14,
    teacher40: '具足智長者',
    volInHY80: 6, // 入法界品第三十九之七
    volInHY40: 10,
    teaching:'“隨意出生福德藏解脱法門”'
  },
  { teacher:[ '法寶髻長者', '法寶周羅長者' ], sanskrit:'Ratna-cūda', where:'獅子大城', num: 15,
    volInHY80: 7, // 入法界品第三十九之七
    volInHY40: 11,
    teaching:'“菩薩無量福德寶藏解脱法門”'
  },
  { teacher:'普眼長者', sanskrit:'Samanta-netra', where:'藤根國普門城', num: 16,
    volInHY80: 7, // 入法界品第三十九之七
    volInHY40: 11,
    teaching:'“令一切眾生普見諸佛歡喜法門”'
  },
  { teacher:[ '無厭足王', '滿足王' ], sanskrit:'Anala', where:'多羅幢城', num: 17,
    teacher40: '甘露火王',
    volInHY80: 7, // 入法界品第三十九之七
    volInHY40: 11,
    teaching:'“菩薩如幻解脱”'
  },
  { teacher:'大光王', sanskrit:'Mahāprabha', where:'妙光城', num: 18,
    volInHY80: 7, // 入法界品第三十九之七
    volInHY40: 14, // HY40 失文              <---
    teaching:'“菩薩大慈為首隨順世間三昧法門”'
  },
  { teacher:'不動優婆夷', sanskrit:'Acalā', where:'安住國', num: 19,
    volInHY80: 7, // 入法界品第三十九之七
    volInHY40: 14, // HY40 失前半部          <---
    teaching:'“求一切法無厭足三昧光明”'
  },
  { teacher:[ '遍行外道', '隨順一切眾生外道' ], sanskrit:'Sarvagāmin', where:'都薩羅城', num: 20,
    volInHY80: 8, // 入法界品第三十九之八
    volInHY40: 14,
    teaching:'“至一切處菩薩行”'
  },
  { teacher:[ '鬻香長者', '青蓮華香長者', '優缽羅華香長者' ], sanskrit:'Utpalabhūti', where:'廣大國', num: 21,
    teacher40: '優鉢羅華長者',
    volInHY80: 8, // 入法界品第三十九之八
    volInHY40: 14,
    teaching:'“調和一切香法”'
  },
  { teacher:[ '婆施羅船師', '自在海師' ], sanskrit:'Vairocana', where:'樓閣大城', num: 22,
    volInHY80: 8, // 入法界品第三十九之八
    volInHY40: 14,
    teaching:'“大悲幢行”'
  },
  { teacher:'無上勝長者', sanskrit:'Jayottama', where:'可樂城', num: 23, teacher40: '最勝長者',
    volInHY80: 8, // 入法界品第三十九之八
    volInHY40: 15,
    teaching:'“至一切處修菩薩行清淨法門”'
  },
  { teacher:[ '師子頻申比丘尼', '獅子奮迅比丘尼' ], sanskrit:'Simha-vijrimbhitā', where:'輸那國迦陵迦林城', num: 24,
    volInHY80: 8, // 入法界品第三十九之八
    volInHY40: 15,
    teaching:'“成就一切智解脱”'
  },
  { teacher:[ '婆須蜜多女', '婆須彌多女' ], sanskrit:'Vasumitrā', where:'險難國寶莊嚴城', num: 25,
    teacher40: '伐蘇蜜多女',
    volInHY80: 9, // 入法界品第三十九之九
    volInHY40: 15,
    teaching:'“菩薩離貪際解脱”'
  },
  { teacher:'鞞瑟胝羅居士', sanskrit:'Veşthila', where:'善度城', num: 26,
    teacher40: '毘瑟底羅居士',
    volInHY80: 9, // 入法界品第三十九之九
    volInHY40: 16,
    teaching:'“菩薩所得不般涅槃際解脱”'
  },
  { teacher:'觀自在菩薩', sanskrit:'Avalokiteśvara', where:'補怛洛迦山', num: 27,
    volInHY80: 9, // 入法界品第三十九之九
    volInHY40: 16,
    teaching:'“大悲行法門”'
  },
  { teacher:'正趣菩薩', sanskrit:'Ananyagāmin', where:'觀自在菩薩處', num: 28,
    teacher40: '正性無異行菩薩',
    volInHY80: 9, // 入法界品第三十九之九
    volInHY40: 16,
    teaching:'“菩薩普疾行解脱”'
  },
  { teacher:'大天神', sanskrit:'Mahādeva', where:'墯羅缽底城', num: 29,
    volInHY80: 9, // 入法界品第三十九之九
    volInHY40: 17,
    teaching:'“菩薩雲網解脱”'
  },
  { teacher:'安住地神', sanskrit:'Sthāvarā', where:'摩竭提國菩提場', num: 30,
    teacher40: '自性不動主地神',
    volInHY80: 9, // 入法界品第三十九之九
    volInHY40: 17,
    teaching:'“不可壞智慧藏法門”'
  },
  { teacher:[ '婆珊婆演底主夜神', '婆娑陀夜天', '婆珊那演底主夜神' ], sanskrit:'Vasantī', where:'摩竭提國迦毗羅城', num: 31,
    teacher40: '春和主夜神',
    volInHY80: 9, // 入法界品第三十九之九
    volInHY40: 17,
    teaching:'“菩薩破一切眾生暗法光明解脱法門”'
  },
  { teacher:[ '普德淨光主夜神', '甚深妙德離垢光明夜天' ], sanskrit:'Samanta-gambhīraśrī-vimala-prabhā', where:'摩竭提國菩提場', num: 32,
    teacher40: '普遍吉祥無垢光主夜',
    volInHY80: 10, // 入法界品第三十九之十
    volInHY40: 18,
    teaching:'“菩薩寂靜禪定樂普遊步解脱法門”'
  },
  { teacher:[ '喜目觀察眾生主夜神', '喜目觀察眾生夜天' ], sanskrit:'Pramudita-nayana-jagad-virocanā', where:'菩提場右邊', num: 33,
    teacher40: '大喜目主夜神',
    volInHY80: 10, // 入法界品第三十九之十
    volInHY40: 18,
    teaching:'“大勢力普喜幢解脱法門”'
  },
  { teacher:[ '普救眾生妙德夜神', '妙德救護眾生夜天' ], sanskrit:'Samanta-sattva-trānojah-śrī', where:'', num: 34,
    teacher40: '普救護一切眾生威德吉祥主夜神',
    volInHY80: 11, // 入法界品第三十九之十一
    volInHY40: 19,
    teaching:'“普現一切世間調伏眾生解脱法門”'
  },
  { teacher:[ '寂靜音海主夜神', '寂靜音夜天' ], sanskrit:'Prashānta-ruta-sāgaravatī', where:'', num: 35,
    teacher40: '具足功德寂靜音海主夜神',
    volInHY80: 12, // 入法界品第三十九之十二
    volInHY40: 21,
    teaching:'“念念出生廣大喜莊嚴解脱法門”'
  },
  { teacher:[ '守護一切眾生主夜神', '妙德守護諸城夜天' ], sanskrit:'Sarva-nagara-rakşā-sambhava-tejah-śrī', where:'菩提場如來會中', num: 36,
    teacher40: '守護一切城增長威德主夜神',
    volInHY80: 12, // 入法界品第三十九之十二
    volInHY40: 22,
    teaching:'“甚深自在妙音解脱法門”'
  },
  { teacher:[ '開敷一切樹花主夜神', '開敷樹華夜天' ], sanskrit:'Sarva-vrikşa-praphullana-sukha-samvāsā', where:'', num: 37,
    teacher40: '能開敷一切樹華安樂主夜神',
    volInHY80: 13, // 入法界品第三十九之十三
    volInHY40: 22,
    teaching:'“出生廣大光明解脱法門”'
  },
  { teacher:[ '大願精進力救護一切眾生夜神', '願勇光明守護眾生夜天' ], sanskrit:'Sarva-jagad-rakşī-pranidhāna-vīrya-prabhā', where:'', num: 38,
    teacher40: '守護一切眾生大願精進力光明主夜神',
    volInHY80: 14, // 入法界品第三十九之十四
    volInHY40: 24,
    teaching:'“教化眾生令生善根解脱法門”'
  },
  { teacher:[ '妙德圓滿神', '妙德圓滿天' ], sanskrit:'Sutejo-mandnalarati-śrī', where:'嵐毗尼園', num: 39,
    teacher40: '妙威德圓滿愛敬神',
    volInHY80: 16, // 入法界品第三十九之十五
    volInHY40: 26,
    teaching:'“菩薩於無量劫遍一切處示現受生自在解脱法門”'
  },
  { teacher:[ '釋迦瞿波女', '瞿夷女' ], sanskrit:'Gopā', where:'迦毗羅城', num: 40,
    volInHY80: 16, // 入法界品第三十九之十六
    volInHY40: 27,
    teaching:'“觀察菩薩三昧海解脱法門”'
  },
  { teacher:'摩耶夫人', sanskrit:'Māyā', where:'大寶蓮華座上', num: 41,
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 30,
    teaching:'“菩薩大願智幻解脱法門”'
  },
  { teacher:[ '天主光王女', '天主光童女', '正念光童女' ], sanskrit:'Surendrābhā', where:'天宮', num: 42,
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 31,
    teaching:'“無礙念清淨莊嚴解脱”'
  },
  { teacher:[ '遍友童子師', '遍友童子' ], sanskrit:'Viśvā-mitra', where:'迦毗羅城', num: 43,
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 31,
    teaching:'別無指示'
  },
  { teacher:'善知眾藝童子', sanskrit:'Śilpābhijna', where:'', num: 44,
    teacher40: '最勝賢優婆夷',
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 31,
    teaching:'“四十二字母法門”'
  },
  { teacher:'賢勝優婆夷', sanskrit:'Bhadrottamā', where:'摩竭提國婆怛那城', num: 45,
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 32,
    teaching:'“無依處道場解脱法門”'
  },
  { teacher:[ '堅固解脱長者', '堅固長者' ], sanskrit:'Muktā-sāra', where:'沃田城', num: 46,
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 32,
    teaching:'“無著念清淨莊嚴解脱”'
  },
  { teacher:'妙月長者', sanskrit:'Sucandra', where:'', num: 47,
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 32,
    teaching:'“淨智光明解脱法門”'
  },
  { teacher:'無勝軍長者', sanskrit:'Ajita-sena', where:'出生城', num: 48,
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 32,
    teaching:'“菩薩無盡相解脱”'
  },
  { teacher:[ '最寂靜婆羅門', '屍毗最勝婆羅門' ], sanskrit:'Śiva-rāgra', where:'城南法聚落', num: 49,
    volInHY80: 17, // 入法界品第三十九之十七
    volInHY40: 32,
    teaching:'“菩薩誠願語解脱”'
  },
  { teacher:'德生童子及有德童女', sanskrit:'Śrī-sambhava, Śrī-matī', where:'妙意華門城', num: 50,
    volInHY80: 18, // 入法界品第三十九之十八
    volInHY40: 32,
    teaching:'“菩薩幻住解脱”'
  },
  { teacher:'彌勒菩薩', sanskrit:'Maitreya', where:'海岸國大莊嚴園中', num: 51,
    volInHY80: 18, // 入法界品第三十九之十八
    volInHY40: 34,
    teaching:'無量諸總持門，住菩薩不可思議自在解脱'
  },
  { teacher:'文殊師利菩薩', sanskrit:'Manjuśrī', where:'普門國蘇摩那城', num: 52,
    volInHY80: 21, // 入法界品第三十九之二十一
    volInHY40: 38,
    teaching:'成就阿僧祇法門，具足無量大光明'
  },
  { teacher:'普賢菩薩', sanskrit:'Samantabhadra', where:'如來前眾會', num: 53,
    volInHY80: 21, // 入法界品第三十九之二十一
    volInHY40: 38,
    teaching:'一切佛剎微塵數三昧門'
  },
];

(() => {
  for (var i=0; i<VISITS53.length; ++i)
    VISITS53[i] = new SKVisit(VISITS53[i]);
})();
