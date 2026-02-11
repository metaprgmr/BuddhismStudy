const PHONETIC_TYPE = 1;
const ANNOTATE_TYPE = 2;
const FO_TERMS = {};

function addFoTerms() { // first is the saṃskrit term; followed by 0 or more zhongwen;
                        // then, optionally, a '#....' marks the rest as annotations.
  const len = arguments.length; if (len < 2) return;
  var term = arguments[0];
  if (!term) return;
  var info = FO_TERMS[term];
  if (!info) FO_TERMS[term] = info = {};
  var isPhon = true;
  for (var i=1; i<len; ++i) {
    const key = arguments[i];
    if (key.startsWith('#')) { isPhon = false; continue }
    if (isPhon) {
      var existing = FO_TERMS[key];
      if (existing && existing !== term) {
        console.log('Error: ', key, ' exists with "' + existing + '" but is be reset to "' + term + '". Ignored.');
        continue;
      }
      FO_TERMS[key] = term;      // i.e. FO_TERMS[zhongwen] => saṃskrit     for getting saṃskrit for a zhongwen
      info[key] = PHONETIC_TYPE; // i.e. FO_TERMS[saṃskrit][zhongwen] = 1   for getting all zhongwen for a saṃskrit
    } else {
      info[key] = ANNOTATE_TYPE; // i.e. FO_TERMS[saṃskrit][annotation] = 2 for getting all annotations for a saṃskrit
    }
  }
}

function bodhisatva(...a) { addFoTerms(...a) }

var INT = '#'; // interpretive


addFoTerms('sthaviravāda', '上座部', 'Pali：theravāda', '他鞞羅部', '體毘履部', '他毗利部', '他毘梨部');
addFoTerms('mahāsāṃghika', '大眾部', '摩訶僧祇部', '僧祇部', '聖大眾部');

addFoTerms('Gaṇḍavyūha-Sūtra', '華嚴經');
addFoTerms('Kṣitigarbha Bodhisattva Pūrvapraṇidhāna Sūtra', '地藏菩薩本願經');
addFoTerms('pariṇāmanā',       '回向', '施向', '回施');

addFoTerms('aśvaghoṣa',        '馬鳴');
addFoTerms('kumārajīva',       '鳩摩羅什');

addFoTerms('catvāri saṃgraha-vastūni', '四攝法');
addFoTerms('dāna-saṃgraha',            '布施摄');
addFoTerms('priya-vādita-saṃgraha',    '愛語摄');
addFoTerms('artha-caryā-saṃgraha',     '利行摄');
addFoTerms('samānārthat-saṃgraha',     '同事摄');

addFoTerms('ṣaḍ-pāramitā',     '六度', '六波羅蜜');

addFoTerms('trikāya',          '三身');
addFoTerms('sambhogakāya',     '受用身', '報身');
addFoTerms('dharma-kāya',      '法身', '性身', '真实身');
addFoTerms('nirmāṇakāya',      '應身', '应化身', '应化法身', '化身');

addFoTerms('pratyeka-buddha',  '辟支佛');
addFoTerms('śrāmaṇera',        '沙彌');
addFoTerms('śrāmaṇeri',        '沙彌尼');
addFoTerms('avinivartanīya',   '阿惟越致', '阿鞞跋致', '阿毘跋致',
                               INT, '不退轉', '無退', '必定');
addFoTerms('ācārya',           '阿闍黎', '阿奢黎', '阿闍梨', '阿奢梨', '阿舍梨', '阿祗利', '阿遮利',
                               '阿遮梨夜', '阿遮梨耶', '阿查里亞', '闍梨', '奢梨',
                               INT, '軌範師', '教授師', '正行', '悅眾', '應可行', '應供養', '教授',
                                    '傳授', '智德', '智賢');
addFoTerms('dhyana',           '參禪', '禪那', '馱衍那', '持阿那',
                               INT, '靜慮', '思維修習');
addFoTerms('karma',            '羯磨', '羯摩',
                               INT, '果報', '業力', '業報', '報應');
addFoTerms('caṇḍāla',          '旃陀羅');
addFoTerms('śūraṅgama',        '首楞嚴');
addFoTerms('samanta-netra',    '普眼');
addFoTerms('gṛdhrakūṭa',       '耆闍崛');
addFoTerms('kalpa',            '劫數', '劫波', '劫簸');
addFoTerms('vyūha-kalpa',      '莊嚴劫'); //    past kalpa
addFoTerms('bhadra-kalpa',     '賢劫');   // present kalpa
addFoTerms('nakṣatra-kalpa',   '星宿劫'); //  future kalpa
addFoTerms('saṃghārāma',       '僧伽', '僧伽藍摩');
addFoTerms('mano-vijñāna',     '意識');
addFoTerms('manas-vijñāna',    '末那識');
addFoTerms('ālaya-vijñāna',    '阿賴耶識', '阿梨耶識');
addFoTerms('ālaya',            '阿賴耶', '阿梨耶');

//「欲界六天」四天王天、忉利天、夜摩天、兜率天、樂變化天、他化自在天
addFoTerms('tuṣita',           '兜率天', '兜率', '兜率陀天', '都率天', '覩史多天', '兜率陀天', '率陀天',
                               INT, '知足天', '妙足天', '喜足天', '喜樂天');
addFoTerms('trayastriṁśa',     '忉利天', INT, '三十三天');
addFoTerms('śūnyatā',          '舜若多', INT, '空性');
addFoTerms('gāthā',            '伽他', '偈佗', '偈陀', '偈', INT, '偈頌');

addFoTerms('kāmadhātu',        INT, '慾界', 'Desire realm');
addFoTerms('rūpadhātu',        INT, '色界', 'Form realm');
addFoTerms('ārūpyadhātu',      INT, '無色界', 'Formless realm');
addFoTerms('sahāloka dhātu',   '娑婆世界', '索訶', '娑河', INT, '雜惡', '雜會', '忍土');
addFoTerms('jambu-dvīpa',      '贍部洲', '南瞻部洲', '閻浮提', '南閻浮洲', '琰浮洲', '閻浮提鞞波');
addFoTerms('uttara-kuru',      '鬱單越', '鬱單', '北俱盧洲', '郁多羅究琉', '鬱怛羅越', '嗢怛羅矩嚧', '殟怛羅句嚧');
addFoTerms('cakravāda-parvata', '鐵輪圍山', '輪圍山', '金剛山', '金剛圍山');
addFoTerms('yama',             '閻摩', '琰魔', '閻魔', '夜摩', '剡魔', '焰摩');
addFoTerms('yamaraja',         '閻摩羅闍', '閻魔大王', '夜摩天王');
addFoTerms('naraka',           '地獄', '捺落迦', '那落迦', '奈落', '泥梨耶', '泥梨', '泥犁');
addFoTerms('vinaya',           '律', '戒律', INT, '鼻那夜', '毘那耶', '毗尼', '毗尼耶', '鞞尼迦');

addFoTerms('lakṣana-vyañjana',      '莊嚴相好', '相好');
addFoTerms('mahā-puruṣa lakṣaṇa',   '三十二相');
addFoTerms('aśīty-anuvyañjanāni',   '八十種好');

addFoTerms('sagara-nagaraja',  '娑竭羅龍王');
bodhisatva('kṣitigarbha',      '地藏菩薩', '地藏王菩薩');
bodhisatva('avalokiteśvara',   '觀世音', '觀世音菩薩');
bodhisatva('mahāstrāmaprapta', '大勢至', '大勢至菩薩');
bodhisatva('samantabhadra',    '普賢', '普賢菩薩', '普賢王菩薩');
bodhisatva('maitreya',         '彌勒', '彌勒菩薩');
bodhisatva('a-jita',           '阿逸多菩薩', '阿逸多', INT, '彌勒', '彌勒菩薩');
addFoTerms('sudhana',          '善財');
addFoTerms('sudhana-kumāra',   '善財童子');
bodhisatva('mañju-śrī-kumāra-bhūta',  '文殊師利法王子', '文殊師利菩薩', '文殊師利');
bodhisatva('gandha-hastin',    '乾陀訶提菩薩');
bodhisatva('nityodyukta',      '常精進菩薩');
addFoTerms('vairocana',        '毘盧遮那', INT, '遍一切處');
addFoTerms('vimalakīrti',      '維摩羅詰', '毗摩羅詰', INT, '淨名', '無垢稱');
addFoTerms('cakravartin',      '轉輪王');
addFoTerms('upāsaka',          '優婆塞', '烏婆塞', '伊蒲塞', '優婆婆柯', '鄔波索迦',
                               INT, '居士', '清信士', '近事男', '近善男', '善宿男', '善男', '信男', '信士');
addFoTerms('upāsikā',          '優婆夷', '優婆私柯', '优婆斯', '优波赐迦', '邬婆斯迦', '邬波斯迦', '优波赐迦',
                               INT, '女居士', '居士女', '清淨女', '清信女', '近善女', '近事女', '近宿女', '信女');

addFoTerms('rājagaha',         '王舍城');
addFoTerms('śrāvastī',         '舍衛國');
addFoTerms('jeta-vana',        '祇樹');
addFoTerms('anātha-piṇḍadasyârāma', '給孤獨園');
addFoTerms('śāri-putra',       '舍利弗');
addFoTerms('mahā-maudgalyāyana',    '摩訶目犍連', '大目犍連', '目犍連');
addFoTerms('mahā-kāśyapa',     '摩訶迦葉', '迦葉');
addFoTerms('mahā-kātyāyana',   '摩訶迦旃延', '迦旃延');
addFoTerms('mahā-kauṣthila',   '摩訶俱絺羅', '俱絺羅');
addFoTerms('añña koṇḍañña',    '阿若憍陳如', '憍陳如', '阿若拘鄰', '憍陳那', '阿若憍憐', '居鄰', '居倫');
addFoTerms('revata',           '離婆多');
addFoTerms('śuddhi-paṃthaka',  '周利槃陀伽');
addFoTerms('nanda',            '難陀');
addFoTerms('ānanda',           '阿難陀');
addFoTerms('rāhla',            '羅侯羅');
addFoTerms('gavāṃ-pati',       '憍梵波提');
addFoTerms('piṇḍola-bhāra-dvāja',   '賓頭盧頗羅墮');
addFoTerms('kālôdayin',        '迦留陀夷');
addFoTerms('mahā-kaphiṇa',     '摩訶劫賓那', '劫賓那');
addFoTerms('vakkula',          '薄拘羅');
addFoTerms('a-niruddha',       '阿那樓馱');
addFoTerms('śakro devānām indraḥ',  '釋提桓因');
addFoTerms('buddha-kṣetra',    '佛土');
addFoTerms('amitāyus',         '無量壽佛');
addFoTerms('bhikṣuḥ',          '比丘');

addFoTerms('aṣṭasenā',         '八個部眾', '天龍八部');
addFoTerms('deva',             '提婆', INT, '天', '天神');
addFoTerms('nāga',             '那伽', INT, '神龍');
addFoTerms('yakṣa',            '夜叉', '藥叉');
addFoTerms('gandharva',        '乾闥婆', INT, '香神', '樂神', '音樂神');
addFoTerms('asura',            '阿修羅'); // 四種阿修羅：鬼趣攝卵生、畜牲趣攝濕生、人趣攝胎生和天趣攝化生
addFoTerms('garuḍa',           '迦樓羅', INT, '大鵬金翅鳥');
addFoTerms('kiṁnara',          '緊那羅');
addFoTerms('mahoraga',         '摩睺羅伽');
addFoTerms('vināyaka',         '毗那夜迦', '毗那耶迦', '毗那也迦', '频那夜迦', '毗那耶怛迦', '毗那吒迦', '吠那野怛迦', INT, '象鼻天', '大圣欢喜天');
addFoTerms('aṇapati',          '象鼻天');
addFoTerms('nandi-keśvara',    '大圣欢喜天');

addFoTerms('rākṣasa',          '羅剎');
addFoTerms('mṛtyu',            '死亡');

const FO_ZI = { // https://zh.wiktionary.org/wiki/罽
                // https://ctext.org/dictionary.pl?if=gb&char=麤
'闍':  'shé, dū; 粵拼:se6, dou1',
'罽':  'jì; 粵拼:gai3',
'麤':  'cū; 粵音:cou1; 唐音:tso',
'噉':  'dàn',
'攫':  'jué',
'啗':  'dàn',
'剉':  'cuò',
'蚖':  'yuán',
'咄':  'duō',
'龕':  'kān',
'斫':  'zhuo2',
'羸':  'léi',
'鳧':  'fú',
'鴈':  'yàn',
'躐':  'liè',
'勖':  'xù',
'獝':  'xù',
'舁':  'yú',
'洎':  'jì',
'刱':  '創',
'稽顙': 'qǐ sǎng',
'隳':  'huī',
'腠':  'còu',
'〇':  '' };


function lookupTerm(term) { return FO_TERMS[term] }
function lookupSound(zi)  { return FO_ZI[zi] }

//console.log(FO_TERMS);

