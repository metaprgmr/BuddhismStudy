var theBook = createBibleBook(false, {
  "id":            "Revl",
  "title":         { "en":"Revelation", "fr":"Apocalypse" },
  "chapter_count": 22,
  "langs":         [ "en", "fr" ],

  "descriptions": [
    "[Wikipedia] <p>The <b>Book of Revelation</b> (also called the <b>Apocalypse of John</b>, <b>Revelation to John</b> or <b>Revelation from Jesus Christ</b>) is the final book of the New Testament, and consequently is also the final book of the Christian Bible. Its title is derived from the first word of the Koine Greek text: apokalypsis, meaning \"unveiling\" or \"revelation.\" The Book of Revelation is the only apocalyptic book in the New Testament canon. Thus, it occupies a central place in Christian eschatology.</p>" +
    "<p>The author names himself as \"John\" in the text, but his precise identity remains a point of academic debate. Second-century Christian writers such as Justin Martyr, Irenaeus, Melito (the bishop of Sardis), Clement of Alexandria, and the author of the Muratorian fragment identify John the Apostle as the \"John\" of Revelation. Modern scholarship generally takes a different view, with many considering that nothing can be known about the author except that he was a Christian prophet. Some modern scholars characterize Revelation's author as a putative figure whom they call \"John of Patmos\". The bulk of traditional sources date the book to the reign of the Roman emperor Domitian (AD 81–96), which evidence tends to confirm.</p>" +
    "<p>The book spans three literary genres: the epistolary, the apocalyptic, and the prophetic. It begins with John, on the island of Patmos in the Aegean Sea, addressing a letter to the \"Seven Churches of Asia\". He then describes a series of prophetic visions, including of figures such as the Seven-Headed Dragon, the Serpent, and the Beast, which culminate in the Second Coming of Jesus.</p>" +
    "<p>The obscure and extravagant imagery has led to a wide variety of Christian interpretations. Historicist interpretations see Revelation as containing a broad view of history, whilst preterist interpretations treat Revelation as mostly referring to the events of the Apostolic Age (1st century), or, at the latest, the fall of the Roman Empire. Futurists, meanwhile, believe that Revelation describes future events, with the seven churches growing into the body/believers throughout the age, and a reemergence or continuous rule of a Roman/Graeco system with modern capabilities described by John in ways familiar to him, and idealist or symbolic interpretations consider that Revelation does not refer to actual people or events, but is an allegory of the spiritual path and the ongoing struggle between good and evil.</p>" +
    "<p>The predominant view is that Revelation alludes to the Old Testament although it is difficult among scholars to agree on the exact number of allusions or the allusions themselves. Revelation rarely quotes directly from the Old Testament, yet almost every verse alludes to or echoes older scriptures. Over half of the references stem from Daniel, Ezekiel, Psalms, and Isaiah, with Daniel providing the largest number in proportion to length and Ezekiel standing out as the most influential. Because these references appear as allusions rather than as quotes, it is difficult to know whether the author used the Hebrew or the Greek version of the Hebrew scriptures, but he was clearly often influenced by the Greek. He very frequently combines multiple references, and again the allusional style makes it impossible to be certain to what extent he did so consciously.</p>" +

    "<h4>Canonical history</h4>" +

    "<p>Revelation was among the last books accepted into the Christian biblical canon, and to the present day some churches that derive from the Church of the East reject it. Eastern Christians became skeptical of the book as doubts concerning its authorship and unusual style were reinforced by aversion to its acceptance by Montanists and other groups considered to be heretical. This distrust of the Book of Revelation persisted in the East through the 15th century.</p>" +
    "<p>Dionysius (248 AD), bishop of Alexandria and disciple of Origen, wrote that the Book of Revelation could have been written by Cerinthus although he himself did not adopt the view that Cerinthus was the writer. He regarded the Apocalypse as the work of an inspired man but not of an Apostle (Eusebius, Church History VII.25).</p>" +
    "<p>Eusebius, in his Church History (c. 330 AD) mentioned that the Apocalypse of John was accepted as a Canonical book and rejected at the same time:</p>" +
    "<blockquote><p>1. ... it is proper to sum up the writings of the New Testament which have been already mentioned... After them is to be placed, if it really seem proper, the Apocalypse of John, concerning which we shall give the different opinions at the proper time. These then belong among the accepted writings [Homologoumena].</p>" +
    "<p>4. Among the rejected [Kirsopp. Lake translation: \"not genuine\"] writings must be reckoned, as I said, the Apocalypse of John, if it seem proper, which some, as I said, reject, but which others class with the accepted books.</p></blockquote>" +
    "<p>The Apocalypse of John is counted as both accepted (Kirsopp. Lake translation: \"Recognized\") and disputed, which has caused some confusion over what exactly Eusebius meant by doing so. The disputation can perhaps be attributed to Origen. Origen seems to have accepted it in his writings.</p>" +
    "<p>Cyril of Jerusalem (348 AD) does not name it among the canonical books (Catechesis IV.33–36).</p>" +
    "<p>Athanasius (367 AD) in his Letter 39, Augustine of Hippo (c. 397 AD) in his book On Christian Doctrine (Book II, Chapter 8), Tyrannius Rufinus (c. 400 AD) in his Commentary on the Apostles' Creed, Pope Innocent I (405 AD) in a letter to the bishop of Toulouse and John of Damascus (about 730 AD) in his work An Exposition of the Orthodox Faith (Book IV:7) listed \"the Revelation of John the Evangelist\" as a canonical book.</p>" +
    "<p>Doubts resurfaced during the 16th-century Protestant Reformation. Martin Luther called Revelation \"neither apostolic nor prophetic\" in the 1522 preface to his translation of the New Testament (he revised his position with a much more favorable assessment in 1530), Huldrych Zwingli labelled it \"not a book of the Bible\", and it was the only New Testament book on which John Calvin did not write a commentary. As of 2015 Revelation remains the only New Testament book not read in the Divine Liturgy of the Eastern Orthodox Church, though Catholic and Protestant liturgies include it.</p>" +

    "<h4>Outline</h4>" +

    "<ol><li>The Revelation of Jesus Christ" +
      "<ol><li>The Revelation of Jesus Christ is communicated to John of Patmos through prophetic visions. (1:1–9)</li>" +
      "<li>John is instructed by the \"one like a son of man\" to write all that he hears and sees, from the prophetic visions, to Seven churches of Asia. (1:10–13)</li>" +
      "<li>The appearance of the \"one like a son of man\" is given, and he reveals what the seven stars and seven lampstands represent. (1:14–20)</li></ol></li>" +

    "<li class=\"li_level1\">Messages for seven churches of Asia" +
      "<ol><li><i>Ephesus</i>: From this church, he \"who overcomes is granted to eat from the tree of life, which is in the midst of the Paradise of God.\" (2:1–7)" +
        "<ol><li>Praised for not bearing those who are evil, testing those who say they are apostles and are not, and finding them to be liars; hating the deeds of the Nicolaitans; having persevered and possessing patience.</li>" +
        "<li>Admonished to \"do the first works\" and to repent for having left their \"first love.\"</li></ol></li>" +
      "<li><i>Smyrna</i>: From this church, those who are faithful until death, will be given \"the crown of life.\" He who overcomes shall not be hurt by the second death. (2:8–11)" +
        "<ol><li>Praised for being \"rich\" while impoverished and in tribulation.</li>" +
        "<li>Admonished not to fear the \"synagogue of Satan\", nor fear a ten-day tribulation of being thrown into prison.</li></ol></li>" +
      "<li><i>Pergamum</i>: From this church, he who overcomes will be given the hidden manna to eat and a white stone with a secret name on it.\" (2:12–17)" +
        "<ol><li>Praised for holding \"fast to My name\", not denying \"My faith\" even in the days of Antipas, \"My faithful martyr.\"</li>" +
        "<li>Admonished to repent for having held the doctrine of Balaam, who taught Balak to put a stumbling block before the children of Israel; eating things sacrificed to idols, committing sexual immorality, and holding the \"doctrine of the Nicolaitans.\"</li></ol></li>" +
      "<li><i>Thyatira</i>: From this church, he who overcomes until the end, will be given power over the nations in order to dash them to pieces with a rod of iron; he will also be given the \"morning star.\" (2:18–29)</li>" +
        "<ol><li>Praised for their works, love, service, faith, and patience.</li>" +
        "Admonished to repent for allowing a \"prophetess\" to promote sexual immorality and to eat things sacrificed to idols.</li></ol></li>" +
      "<li><i>Sardis</i>: From this church, he who overcomes will be clothed in white garments, and his name will not be blotted out from the Book of Life; his name will also be confessed before the Father and His angels. (3:1–6)" +
        "<ol><li>Admonished to be watchful and to strengthen since their works have not been perfect before God.</li></ol></li>" +
      "<li><i>Philadelphia</i>: From this church, he who overcomes will be made a pillar in the temple of God having the name of God, the name of the city of God, \"New Jerusalem\", and the Son of God's new name. (3:7–13)" +
        "<ol><li>Praised for having some strength, keeping \"My word\", and having not denied \"My name.\"</li>" +
        "<li>Reminded to hold fast what they have, that no one may take their crown.</li></ol></li>" +
      "<li><i>Laodicea</i>: From this church, he who overcomes will be granted the opportunity to sit with the Son of God on His throne. (3:14–22)" +
        "<ol><li>Admonished to be zealous and repent from being \"lukewarm\"; they are instructed to buy the \"gold refined in the fire\", that they may be rich; to buy \"white garments\", that they may be clothed, so that the shame of their nakedness would not be revealed; to anoint their eyes with eye salve, that they may see.</li></ol></li>" +
      "</ol>" +

    "<li class=\"li_level1\">Before the Throne of God" +
      "<ol><li>The Throne of God appears, surrounded by twenty four thrones with Twenty-four elders seated in them. (4:1–5)</li>" +
      "<li>The four living creatures are introduced. (4:6–11)</li>" +
      "<li>A scroll, with seven seals, is presented and it is declared that the Lion of the tribe of Judah, from the \"Root of David\", is the only one that will be worthy to open this scroll in the future (5:1–5)</li>" +
      "<li>When the \"Lamb having seven horns and seven eyes\" took the scroll, the creatures of heaven fell down before the Lamb to give him praise, joined by myriads of angels and the creatures of the earth. (5:6–14)</li></ol></li>" +
    "<li class=\"li_level1\">Seven Seals are opened" +
      "<ol><li>First Seal: A white horse appears, whose crowned rider has a bow with which to conquer. (6:1–2)</li>" +
      "<li>Second Seal: A red horse appears, whose rider is granted a \"great sword\" to take peace from the earth. (6:3–4)</li>" +
      "<li>Third Seal: A black horse appears, whose rider has \"a pair of balances in his hand\", where a voice then says, \"A measure of wheat for a penny, and three measures of barley for a penny; and thou hurt not the oil and the wine.\" (6:5–6)</li>" +
      "<li>Fourth Seal: A pale horse appears, whose rider is Death, and Hades follows him. Death is granted a fourth part of the earth, to kill with sword, with hunger, with death, and with the beasts of the earth. (6:7–8)</li>" +
      "<li>Fifth Seal: \"Under the altar\", appeared the souls of martyrs for the \"word of God\", who cry out for vengeance. They are given white robes and told to rest until the martyrdom of their brothers is completed. (6:9–11)</li>" +
      "<li>Sixth Seal: (6:12–17)" +
        "<ol><li>There occurs a great earthquake where \"the sun becomes black as sackcloth of hair, and the moon like blood\" (6:12).</li>" +
        "<li>The stars of heaven fall to the earth and the sky recedes like a scroll being rolled up (6:13–14).</li>" +
        "<li>Every mountain and island is moved out of place (6:14).</li>" +
        "<li>The people of earth retreat to caves in the mountains (6:15).</li>" +
        "<li>The survivors call upon the mountains and the rocks to fall on them, so as to hide them from the \"wrath of the Lamb\" (6:16).</li></ol></li>" +
      "<li>Interlude: The 144,000 Hebrews are sealed.</li>" +
        "<ol><li>144,000 from the Twelve Tribes of Israel are sealed as servants of God on their foreheads (7:1–8)</li>" +
        "<li>A great multitude stand before the Throne of God, who come out of the Great Tribulation, clothed with robes made \"white in the blood of the Lamb\" and having palm branches in their hands. (7:9–17)</li></ol></li>" +
      "<li>Seventh Seal: Introduces the seven trumpets (8:1–5)" +
        "<ol><li>\"Silence in heaven for about half an hour\" (8:1).</li>" +
        "<li>Seven angels are each given trumpets (8:2).</li>" +
        "<li>An eighth angel takes a \"golden censer\", filled with fire from the heavenly altar, and throws it to the earth (8:3–5). What follows are \"peals of thunder, rumblings, flashes of lightning, and an earthquake\" (8:5).</li>" +
        "<li>After the eighth angel has devastated the earth, the seven angels introduced in verse 2 prepare to sound their trumpets (8:6).</li></ol></li>" +
      "</ol>" +

    "<li class=\"li_level1\">Seven trumpets are sounded (Seen in Chapters 8, 9, and 12)." +
      "<ol><li>First Trumpet: Hail and fire, mingled with blood, are thrown to the earth burning up a third of the trees and green grass. (8:6–7)</li>" +
      "<li>Second Trumpet: Something that resembles a great mountain, burning with fire, falls from the sky and lands in the ocean. It kills a third of the sea creatures and destroys a third of the ships at sea. (8:8–9)</li>" +
      "<li>Third Trumpet: A great star, named Wormwood, falls from heaven and poisons a third of the rivers and springs of water. (8:10–11)</li>" +
      "<li>Fourth Trumpet: A third of the sun, the moon, and the stars are darkened creating complete darkness for a third of the day and the night. (8:12–13)</li>" +
      "<li>Fifth Trumpet: The First Woe (9:1–12)" +
        "<ol><li>A \"star\" falls from the sky (9:1).</li>" +
        "<li>This \"star\" is given \"the key to the bottomless pit\" (9:1).</li>" +
        "<li>The \"star\" then opens the bottomless pit. When this happens, \"smoke [rises] from [the Abyss] like smoke from a gigantic furnace. The sun and sky [are] darkened by the smoke from the Abyss\" (9:2).</li>" +
        "<li>From out of the smoke, locusts who are \"given power like that of scorpions of the earth\" (9:3), who are commanded not to harm anyone or anything except for people who were not given the \"seal of God\" on their foreheads (from chapter 7) (9:4).</li>" +
        "<li>The \"locusts\" are described as having a human appearance (faces and hair) but with lion's teeth, and wearing \"breastplates of iron\"; the sound of their wings resembles \"the thundering of many horses and chariots rushing into battle\" (9:7–9).</li></ol></li>" +
      "<li>Sixth Trumpet: The Second Woe (9:13–21)" +
        "<ol><li>The four angels bound to the great river Euphrates are released to prepare two hundred million horsemen.</li>" +
        "<li>These armies kill a third of mankind by plagues of fire, smoke, and brimstone.</li></ol></li>" +
      "<li>Interlude: The little scroll. (10:1–11)" +
        "<ol><li>An angel appears, with one foot on the sea and one foot on the land, having an opened little book in his hand.</li>" +
        "<li>Upon the cry of the angel, seven thunders utter mysteries and secrets that are not to be written down by John.</li>" +
        "<li>John is instructed to eat the little scroll that happens to be sweet in his mouth, but bitter in his stomach, and to prophesy.</li>" +
        "<li>John is given a measuring rod to measure the temple of God, the altar, and those who worship there.</li>" +
        "<li>Outside the temple, at the court of the holy city, it is trod by the nations for forty-two months (3 1/2 years).</li>" +
        "<li>Two witnesses prophesy for 1,260 days, clothed in sackcloth. (11:1–14)</li></ol></li>" +
      "<li>Seventh Trumpet: The Third Woe that leads into the seven bowls (11:15–19)" +
        "<ol><li>The temple of God opens in heaven, where the ark of His covenant can be seen. There are lightnings, noises, thunderings, an earthquake, and great hail.</li></ol></li>" +
      "</ol>" +

    "<li class=\"li_level1\">The Seven Spiritual Figures. (Events leading into the Third Woe)" +
      "<ol><li>A Woman \"clothed with a white robe, with the sun at her back, with the moon under her feet, and on her head a crown of twelve stars\" is in pregnancy with a male child. (12:1–2)</li>" +
      "<li>A great Dragon (with seven heads, ten horns, and seven crowns on his heads) drags a third of the stars of Heaven with his tail, and throws them to the Earth. (12:3–4). The Dragon waits for the birth of the child so he can devour it. However, sometime after the child is born, he is caught up to God's throne while the Woman flees into the wilderness into her place prepared of God that they should feed her there for 1,260 days (3½ years). (12:5–6). War breaks out in heaven between Michael and the Dragon, identified as that old Serpent, the Devil, or Satan (12:9). After a great fight, the Dragon and his angels are cast out of Heaven for good, followed by praises of victory for God's kingdom. (12:7–12). The Dragon engages to persecute the Woman, but she is given aid to evade him. Her evasiveness enrages the Dragon, prompting him to wage war against the rest of her offspring, who keep the commandments of God and have the testimony of Jesus Christ. (12:13–17)</li>" +
      "<li>A Beast (with seven heads, ten horns, and ten crowns on his horns and on his heads names of blasphemy) emerges from the Sea, having one mortally wounded head that is then healed. The people of the world wonder and follow the Beast. The Dragon grants him power and authority for forty-two months. (13:1–5)</li>" +
      "<li>The Beast of the Sea blasphemes God's name (along with God's tabernacle and His kingdom and all who dwell in Heaven), wages war against the Saints, and overcomes them. (13:6–10)</li>" +
      "<li>Then, a Beast emerges from the Earth having two horns like a lamb, speaking like a dragon. He directs people to make an image of the Beast of the Sea who was wounded yet lives, breathing life into it, and forcing all people to bear \"the mark of the Beast\", \"666\". Events leading into the Third Woe:</li>" +
      "<li>The Lamb stands on Mount Zion with the 144,000 \"first fruits\" who are redeemed from Earth and victorious over the Beast and his mark and image. (14:1–5)" +
        "<ol><li>The proclamations of three angels. (14:6–13)</li>" +
        "<li>One like the Son of Man reaps the earth. (14:14–16)</li>" +
        "<li>A second angel reaps \"the vine of the Earth\" and throws it into \"the great winepress of the wrath of God... and blood came out of the winepress... up to one thousand six hundred stadia.\" (14:17–20)</li>" +
        "<li>The temple of the tabernacle, in Heaven, is opened(15:1–5), beginning the \"Seven Bowls\" revelation.</li>" +
        "<li>Seven angels are given a golden bowl, from the Four Living Creatures, that contains the seven last plagues bearing the wrath of God. (15:6–8)</li></ol></li>" +
      "</ol>" +

    "<li class=\"li_level1\">Seven bowls are poured onto Earth:" +
      "<ol><li>First Bowl: A \"foul and malignant sore\" afflicts the followers of the Beast. (16:1–2)</li>" +
      "<li>Second Bowl: The Sea turns to blood and everything within it dies. (16:3)</li>" +
      "<li>Third Bowl: All fresh water turns to blood. (16:4–7)</li>" +
      "<li>Fourth Bowl: The Sun scorches the Earth with intense heat and even burns some people with fire. (16:8–9)</li>" +
      "<li>Fifth Bowl: There is total darkness and great pain in the Beast's kingdom. (16:10–11)</li>" +
      "<li>Sixth Bowl: The Great River Euphrates is dried up and preparations are made for the kings of the East and the final battle at Armageddon between the forces of good and evil. (16:12–16)</li>" +
      "<li>Seventh Bowl: A great earthquake and heavy hailstorm: \"every island fled away and the mountains were not found.\" (16:17–21)</li></ol></li>" +

    "<li class=\"li_level1\">Aftermath: Vision of John given by \"an angel who had the seven bowls\"" +
      "<ol><li>The great Harlot who sits on a scarlet Beast (with seven heads and ten horns and names of blasphemy all over its body) and by many waters: Babylon the Great. The angel showing John the vision of the Harlot and the scarlet Beast reveals their identities and fates (17:1–18)</li>" +
      "<li>New Babylon is destroyed. (18:1–8)</li>" +
      "<li>The people of the Earth (the kings, merchants, sailors, etc.) mourn New Babylon's destruction. (18:9–19)</li>" +
      "<li>The permanence of New Babylon's destruction. (18:20–24)</li></ol>" +

    "<li class=\"li_level1\">The Marriage Supper of the Lamb" +
      "<ol><li>A great multitude praises God. (19:1–6)</li>" +
      "<li>The marriage Supper of the Lamb. (19:7–10)</li></ol>" +

    "<li class=\"li_level1\">The Judgment of the two Beasts, the Dragon, and the Dead (19:11–20:15)" +
      "<ol><li>The Beast and the False Prophet are cast into the Lake of Fire. (19:11–21)</li>" +
      "<li>The Dragon is imprisoned in the Bottomless Pit for a thousand years. (20:1–3)</li>" +
      "<li>The resurrected martyrs live and reign with Christ for a thousand years. (20:4–6)</li>" +
      "<li>After the Thousand Years" +
        "<ol><li>The Dragon is released and goes out to deceive the nations in the four corners of the Earth—Gog and Magog—and gathers them for battle at the holy city. The Dragon makes war against the people of God, but is defeated. (20:7–9)</li>" +
        "<li>The Dragon is cast into the Lake of Fire with the Beast and the False Prophet. (20:10)</li>" +
        "<li>The Last Judgment: the wicked, along with Death and Hades, are cast into the Lake of Fire, which is the second death. (20:11–15)</li></ol></li>" +
        "</ol>" +

    "<li class=\"li_level1\">The New Heaven and Earth, and New Jerusalem" +
      "<ol><li>A \"new heaven\" and \"new earth\" replace the old heaven and old earth. There is no more suffering or death. (21:1–8)</li>" +
      "<li>God comes to dwell with humanity in the New Jerusalem. (21:2–8)</li>" +
      "<li>Description of the New Jerusalem. (21:9–27)</li>" +
      "<li>The River of Life and the Tree of Life appear for the healing of the nations and peoples. The curse of sin is ended. (22:1–5)</li></ol></li>" +

    "<li class=\"li_level1\">Conclusion" +
      "<ol><li>Christ's reassurance that his coming is imminent. Final admonitions. (22:6–21)</li></ol></li>" +

    "",
  ],

});

theBook.lang_en = [

  [ // 1
    "The Revelation of <span class=\"person\">Jesus </span><span class=\"person\">Christ</span>, which God gave unto him, to shew unto his servants things which must shortly come to pass; and he sent and signified it by his angel unto his servant <span class=\"person\">John</span>:",
    "Who bare record of the word of God, and of the testimony of <span class=\"person\">Jesus </span><span class=\"person\">Christ</span>, and of all things that he saw.",
    "Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein: for the time is at hand.",
    "<span class=\"person\">John </span>to the seven churches which are in Asia: Grace be unto you, and peace, from him which is, and which was, and which is to come; and from the seven Spirits which are before his throne;",
    "And from <span class=\"person\">Jesus </span><span class=\"person\">Christ</span>, who is the faithful witness, and the first begotten of the dead, and the prince of the kings of the earth. Unto him that loved us, and washed us from our sins in his own blood,",
    "And hath made us kings and priests unto God and his Father; to him be glory and dominion for ever and ever. Amen.",
    "Behold, he cometh with clouds; and every eye shall see him, and they also which pierced him: and all kindreds of the earth shall wail because of him. Even so, Amen.",
    "<span class=\"word\">I am Alpha and Omega, the beginning and the ending, </span>saith the Lord, which is, and which was, and which is to come, the Almighty.",
    "I <span class=\"person\">John</span>, who also am your brother, and companion in tribulation, and in the kingdom and patience of <span class=\"person\">Jesus </span><span class=\"person\">Christ</span>, was in the isle that is called Patmos, for the word of God, and for the testimony of <span class=\"person\">Jesus </span><span class=\"person\">Christ</span>.",
    "I was in the Spirit on the Lord's day, and heard behind me a great voice, as of a trumpet,",
    "Saying, <span class=\"word\">I am Alpha and Omega, the first and the last: and, What thou seest, write in a book, and send it unto the seven churches which are in Asia; unto Ephesus, and unto Smyrna, and unto Pergamos, and unto Thyatira, and unto Sardis, and unto Philadelphia, and unto Laodicea. </span>",
    "And I turned to see the voice that spake with me. And being turned, I saw seven golden candlesticks;",
    "And in the midst of the seven candlesticks one like unto the Son of man, clothed with a garment down to the foot, and girt about the paps with a golden girdle.",
    "His head and his hairs were white like wool, as white as snow; and his eyes were as a flame of fire;",
    "And his feet like unto fine brass, as if they burned in a furnace; and his voice as the sound of many waters.",
    "And he had in his right hand seven stars: and out of his mouth went a sharp twoedged sword: and his countenance was as the sun shineth in his strength.",
    "And when I saw him, I fell at his feet as dead. And he laid his right hand upon me, saying unto me, <span class=\"word\">Fear not; I am the first and the last: </span>",
    "<span class=\"word\">I am he that liveth, and was dead; and, behold, I am alive for evermore, Amen; and have the keys of hell and of death. </span>",
    "<span class=\"word\">Write the things which thou hast seen, and the things which are, and the things which shall be hereafter; </span>",
    "<span class=\"word\">The mystery of the seven stars which thou sawest in my right hand, and the seven golden candlesticks. The seven stars are the angels of the seven churches: and the seven candlesticks which thou sawest are the seven churches. </span>",
  ],

  [ // 2
    "<span class=\"word\">Unto the angel of the church of Ephesus write; These things saith he that holdeth the seven stars in his right hand, who walketh in the midst of the seven golden candlesticks; </span>",
    "<span class=\"word\">I know thy works, and thy labour, and thy patience, and how thou canst not bear them which are evil: and thou hast tried them which say they are apostles, and are not, and hast found them liars: </span>",
    "<span class=\"word\">And hast borne, and hast patience, and for my name's sake hast laboured, and hast not fainted. </span>",
    "<span class=\"word\">Nevertheless I have somewhat against thee, because thou hast left thy first love. </span>",
    "<span class=\"word\">Remember therefore from whence thou art fallen, and repent, and do the first works; or else I will come unto thee quickly, and will remove thy candlestick out of his place, except thou repent. </span>",
    "<span class=\"word\">But this thou hast, that thou hatest the deeds of the Nicolaitans, which I also hate. </span>",
    "<span class=\"word\">He that hath an ear, let him hear what the Spirit saith unto the churches; To him that overcometh will I give to eat of the tree of life, which is in the midst of the paradise of God. </span>",
    "<span class=\"word\">And unto the angel of the church in Smyrna write; These things saith the first and the last, which was dead, and is alive; </span>",
    "<span class=\"word\">I know thy works, and tribulation, and poverty, (but thou art rich) and I know the blasphemy of them which say they are Jews, and are not, but are the synagogue of <span class=\"person\">Satan</span>. </span>",
    "<span class=\"word\">Fear none of those things which thou shalt suffer: behold, the devil shall cast some of you into prison, that ye may be tried; and ye shall have tribulation ten days: be thou faithful unto death, and I will give thee a crown of life. </span>",
    "<span class=\"word\">He that hath an ear, let him hear what the Spirit saith unto the churches; He that overcometh shall not be hurt of the second death. </span>",
    "<span class=\"word\">And to the angel of the church in Pergamos write; These things saith he which hath the sharp sword with two edges; </span>",
    "<span class=\"word\">I know thy works, and where thou dwellest, even where <span class=\"person\">Satan</span>'s seat is: and thou holdest fast my name, and hast not denied my faith, even in those days wherein Antipas was my faithful martyr, who was slain among you, where <span class=\"person\">Satan </span>dwelleth. </span>",
    "<span class=\"word\">But I have a few things against thee, because thou hast there them that hold the doctrine of Balaam, who taught Balac to cast a stumblingblock before the children of <span class=\"place\">Israel</span>, to eat things sacrificed unto idols, and to commit fornication. </span>",
    "<span class=\"word\">So hast thou also them that hold the doctrine of the Nicolaitans, which thing I hate. </span>",
    "<span class=\"word\">Repent; or else I will come unto thee quickly, and will fight against them with the sword of my mouth. </span>",
    "<span class=\"word\">He that hath an ear, let him hear what the Spirit saith unto the churches; To him that overcometh will I give to eat of the hidden manna, and will give him a white stone, and in the stone a new name written, which no man knoweth saving he that receiveth it. </span>",
    "<span class=\"word\">And unto the angel of the church in Thyatira write; These things saith the Son of God, who hath his eyes like unto a flame of fire, and his feet are like fine brass; </span>",
    "<span class=\"word\">I know thy works, and charity, and service, and faith, and thy patience, and thy works; and the last to be more than the first. </span>",
    "<span class=\"word\">Notwithstanding I have a few things against thee, because thou sufferest that woman Jezebel, which calleth herself a prophetess, to teach and to seduce my servants to commit fornication, and to eat things sacrificed unto idols. </span>",
    "<span class=\"word\">And I gave her space to repent of her fornication; and she repented not. </span>",
    "<span class=\"word\">Behold, I will cast her into a bed, and them that commit adultery with her into great tribulation, except they repent of their deeds. </span>",
    "<span class=\"word\">And I will kill her children with death; and all the churches shall know that I am he which searcheth the reins and hearts: and I will give unto every one of you according to your works. </span>",
    "<span class=\"word\">But unto you I say, and unto the rest in Thyatira, as many as have not this doctrine, and which have not known the depths of <span class=\"person\">Satan</span>, as they speak; I will put upon you none other burden. </span>",
    "<span class=\"word\">But that which ye have already hold fast till I come. </span>",
    "<span class=\"word\">And he that overcometh, and keepeth my works unto the end, to him will I give power over the nations: </span>",
    "<span class=\"word\">And he shall rule them with a rod of iron; as the vessels of a potter shall they be broken to shivers: even as I received of my Father. </span>",
    "<span class=\"word\">And I will give him the morning star. </span>",
    "<span class=\"word\">He that hath an ear, let him hear what the Spirit saith unto the churches. </span>",
  ],

  [ // 3
    "<span class=\"word\">And unto the angel of the church in Sardis write; These things saith he that hath the seven Spirits of God, and the seven stars; I know thy works, that thou hast a name that thou livest, and art dead. </span>",
    "<span class=\"word\">Be watchful, and strengthen the things which remain, that are ready to die: for I have not found thy works perfect before God. </span>",
    "<span class=\"word\">Remember therefore how thou hast received and heard, and hold fast, and repent. If therefore thou shalt not watch, I will come on thee as a thief, and thou shalt not know what hour I will come upon thee. </span>",
    "<span class=\"word\">Thou hast a few names even in Sardis which have not defiled their garments; and they shall walk with me in white: for they are worthy. </span>",
    "<span class=\"word\">He that overcometh, the same shall be clothed in white raiment; and I will not blot out his name out of the book of life, but I will confess his name before my Father, and before his angels. </span>",
    "<span class=\"word\">He that hath an ear, let him hear what the Spirit saith unto the churches. </span>",
    "<span class=\"word\">And to the angel of the church in Philadelphia write; These things saith he that is holy, he that is true, he that hath the key of <span class=\"person\">David</span>, he that openeth, and no man shutteth; and shutteth, and no man openeth; </span>",
    "<span class=\"word\">I know thy works: behold, I have set before thee an open door, and no man can shut it: for thou hast a little strength, and hast kept my word, and hast not denied my name. </span>",
    "<span class=\"word\">Behold, I will make them of the synagogue of <span class=\"person\">Satan</span>, which say they are Jews, and are not, but do lie; behold, I will make them to come and worship before thy feet, and to know that I have loved thee. </span>",
    "<span class=\"word\">Because thou hast kept the word of my patience, I also will keep thee from the hour of temptation, which shall come upon all the world, to try them that dwell upon the earth. </span>",
    "<span class=\"word\">Behold, I come quickly: hold that fast which thou hast, that no man take thy crown. </span>",
    "<span class=\"word\">Him that overcometh will I make a pillar in the temple of my God, and he shall go no more out: and I will write upon him the name of my God, and the name of the city of my God, which is new <span class=\"place\">Jerusalem</span>, which cometh down out of heaven from my God: and I will write upon him my new name. </span>",
    "<span class=\"word\">He that hath an ear, let him hear what the Spirit saith unto the churches. </span>",
    "<span class=\"word\">And unto the angel of the church of the Laodiceans write; These things saith the Amen, the faithful and true witness, the beginning of the creation of God; </span>",
    "<span class=\"word\">I know thy works, that thou art neither cold nor hot: I would thou wert cold or hot. </span>",
    "<span class=\"word\">So then because thou art lukewarm, and neither cold nor hot, I will spue thee out of my mouth. </span>",
    "<span class=\"word\">Because thou sayest, I am rich, and increased with goods, and have need of nothing; and knowest not that thou art wretched, and miserable, and poor, and blind, and naked: </span>",
    "<span class=\"word\">I counsel thee to buy of me gold tried in the fire, that thou mayest be rich; and white raiment, that thou mayest be clothed, and that the shame of thy nakedness do not appear; and anoint thine eyes with eyesalve, that thou mayest see. </span>",
    "<span class=\"word\">As many as I love, I rebuke and chasten: be zealous therefore, and repent. </span>",
    "<span class=\"word\">Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me. </span>",
    "<span class=\"word\">To him that overcometh will I grant to sit with me in my throne, even as I also overcame, and am set down with my Father in his throne. </span>",
    "<span class=\"word\">He that hath an ear, let him hear what the Spirit saith unto the churches. </span>",
  ],

  [ // 4
    "After this I looked, and, behold, a door was opened in heaven: and the first voice which I heard was as it were of a trumpet talking with me; which said, Come up hither, and I will shew thee things which must be hereafter.",
    "And immediately I was in the spirit: and, behold, a throne was set in heaven, and one sat on the throne.",
    "And he that sat was to look upon like a jasper and a sardine stone: and there was a rainbow round about the throne, in sight like unto an emerald.",
    "And round about the throne were four and twenty seats: and upon the seats I saw four and twenty elders sitting, clothed in white raiment; and they had on their heads crowns of gold.",
    "And out of the throne proceeded lightnings and thunderings and voices: and there were seven lamps of fire burning before the throne, which are the seven Spirits of God.",
    "And before the throne there was a sea of glass like unto crystal: and in the midst of the throne, and round about the throne, were four beasts full of eyes before and behind.",
    "And the first beast was like a lion, and the second beast like a calf, and the third beast had a face as a man, and the fourth beast was like a flying eagle.",
    "And the four beasts had each of them six wings about him; and they were full of eyes within: and they rest not day and night, saying, Holy, holy, holy, LORD God Almighty, which was, and is, and is to come.",
    "And when those beasts give glory and honour and thanks to him that sat on the throne, who liveth for ever and ever,",
    "The four and twenty elders fall down before him that sat on the throne, and worship him that liveth for ever and ever, and cast their crowns before the throne, saying,",
    "Thou art worthy, O Lord, to receive glory and honour and power: for thou hast created all things, and for thy pleasure they are and were created.",
  ],

  [ // 5
    "And I saw in the right hand of him that sat on the throne a book written within and on the backside, sealed with seven seals.",
    "And I saw a strong angel proclaiming with a loud voice, Who is worthy to open the book, and to loose the seals thereof?",
    "And no man in heaven, nor in earth, neither under the earth, was able to open the book, neither to look thereon.",
    "And I wept much, because no man was found worthy to open and to read the book, neither to look thereon.",
    "And one of the elders saith unto me, Weep not: behold, the Lion of the tribe of Juda, the Root of <span class=\"person\">David</span>, hath prevailed to open the book, and to loose the seven seals thereof.",
    "And I beheld, and, lo, in the midst of the throne and of the four beasts, and in the midst of the elders, stood a Lamb as it had been slain, having seven horns and seven eyes, which are the seven Spirits of God sent forth into all the earth.",
    "And he came and took the book out of the right hand of him that sat upon the throne.",
    "And when he had taken the book, the four beasts and four and twenty elders fell down before the Lamb, having every one of them harps, and golden vials full of odours, which are the prayers of saints.",
    "And they sung a new song, saying, Thou art worthy to take the book, and to open the seals thereof: for thou wast slain, and hast redeemed us to God by thy blood out of every kindred, and tongue, and people, and nation;",
    "And hast made us unto our God kings and priests: and we shall reign on the earth.",
    "And I beheld, and I heard the voice of many angels round about the throne and the beasts and the elders: and the number of them was ten thousand times ten thousand, and thousands of thousands;",
    "Saying with a loud voice, Worthy is the Lamb that was slain to receive power, and riches, and wisdom, and strength, and honour, and glory, and blessing.",
    "And every creature which is in heaven, and on the earth, and under the earth, and such as are in the sea, and all that are in them, heard I saying, Blessing, and honour, and glory, and power, be unto him that sitteth upon the throne, and unto the Lamb for ever and ever.",
    "And the four beasts said, Amen. And the four and twenty elders fell down and worshipped him that liveth for ever and ever.",
  ],

  [ // 6
    "And I saw when the Lamb opened one of the seals, and I heard, as it were the noise of thunder, one of the four beasts saying, Come and see.",
    "And I saw, and behold a white horse: and he that sat on him had a bow; and a crown was given unto him: and he went forth conquering, and to conquer.",
    "And when he had opened the second seal, I heard the second beast say, Come and see.",
    "And there went out another horse that was red: and power was given to him that sat thereon to take peace from the earth, and that they should kill one another: and there was given unto him a great sword.",
    "And when he had opened the third seal, I heard the third beast say, Come and see. And I beheld, and lo a black horse; and he that sat on him had a pair of balances in his hand.",
    "And I heard a voice in the midst of the four beasts say, A measure of wheat for a penny, and three measures of barley for a penny; and see thou hurt not the oil and the wine.",
    "And when he had opened the fourth seal, I heard the voice of the fourth beast say, Come and see.",
    "And I looked, and behold a pale horse: and his name that sat on him was Death, and Hell followed with him. And power was given unto them over the fourth part of the earth, to kill with sword, and with hunger, and with death, and with the beasts of the earth.",
    "And when he had opened the fifth seal, I saw under the altar the souls of them that were slain for the word of God, and for the testimony which they held:",
    "And they cried with a loud voice, saying, How long, O Lord, holy and true, dost thou not judge and avenge our blood on them that dwell on the earth?",
    "And white robes were given unto every one of them; and it was said unto them, that they should rest yet for a little season, until their fellowservants also and their brethren, that should be killed as they were, should be fulfilled.",
    "And I beheld when he had opened the sixth seal, and, lo, there was a great earthquake; and the sun became black as sackcloth of hair, and the moon became as blood;",
    "And the stars of heaven fell unto the earth, even as a fig tree casteth her untimely figs, when she is shaken of a mighty wind.",
    "And the heaven departed as a scroll when it is rolled together; and every mountain and island were moved out of their places.",
    "And the kings of the earth, and the great men, and the rich men, and the chief captains, and the mighty men, and every bondman, and every free man, hid themselves in the dens and in the rocks of the mountains;",
    "And said to the mountains and rocks, Fall on us, and hide us from the face of him that sitteth on the throne, and from the wrath of the Lamb:",
    "For the great day of his wrath is come; and who shall be able to stand?",
  ],

  [ // 7
    "And after these things I saw four angels standing on the four corners of the earth, holding the four winds of the earth, that the wind should not blow on the earth, nor on the sea, nor on any tree.",
    "And I saw another angel ascending from the east, having the seal of the living God: and he cried with a loud voice to the four angels, to whom it was given to hurt the earth and the sea,",
    "Saying, Hurt not the earth, neither the sea, nor the trees, till we have sealed the servants of our God in their foreheads.",
    "And I heard the number of them which were sealed: and there were sealed an hundred and forty and four thousand of all the tribes of the children of <span class=\"place\">Israel</span>.",
    "Of the tribe of Juda were sealed twelve thousand. Of the tribe of <span class=\"person\">Reuben </span>were sealed twelve thousand. Of the tribe of <span class=\"person\">Gad </span>were sealed twelve thousand.",
    "Of the tribe of Aser were sealed twelve thousand. Of the tribe of <span class=\"place\">Nepthalim </span>were sealed twelve thousand. Of the tribe of <span class=\"person\">Manasses </span>were sealed twelve thousand.",
    "Of the tribe of <span class=\"person\">Simeon </span>were sealed twelve thousand. Of the tribe of <span class=\"person\">Levi </span>were sealed twelve thousand. Of the tribe of <span class=\"person\">Issachar </span>were sealed twelve thousand.",
    "Of the tribe of <span class=\"place\">Zabulon </span>were sealed twelve thousand. Of the tribe of <span class=\"person\">Joseph </span>were sealed twelve thousand. Of the tribe of <span class=\"person\">Benjamin </span>were sealed twelve thousand.",
    "After this I beheld, and, lo, a great multitude, which no man could number, of all nations, and kindreds, and people, and tongues, stood before the throne, and before the Lamb, clothed with white robes, and palms in their hands;",
    "And cried with a loud voice, saying, Salvation to our God which sitteth upon the throne, and unto the Lamb.",
    "And all the angels stood round about the throne, and about the elders and the four beasts, and fell before the throne on their faces, and worshipped God,",
    "Saying, Amen: Blessing, and glory, and wisdom, and thanksgiving, and honour, and power, and might, be unto our God for ever and ever. Amen.",
    "And one of the elders answered, saying unto me, What are these which are arrayed in white robes? and whence came they?",
    "And I said unto him, Sir, thou knowest. And he said to me, These are they which came out of great tribulation, and have washed their robes, and made them white in the blood of the Lamb.",
    "Therefore are they before the throne of God, and serve him day and night in his temple: and he that sitteth on the throne shall dwell among them.",
    "They shall hunger no more, neither thirst any more; neither shall the sun light on them, nor any heat.",
    "For the Lamb which is in the midst of the throne shall feed them, and shall lead them unto living fountains of waters: and God shall wipe away all tears from their eyes.",
  ],

  [ // 8
    "And when he had opened the seventh seal, there was silence in heaven about the space of half an hour.",
    "And I saw the seven angels which stood before God; and to them were given seven trumpets.",
    "And another angel came and stood at the altar, having a golden censer; and there was given unto him much incense, that he should offer it with the prayers of all saints upon the golden altar which was before the throne.",
    "And the smoke of the incense, which came with the prayers of the saints, ascended up before God out of the angel's hand.",
    "And the angel took the censer, and filled it with fire of the altar, and cast it into the earth: and there were voices, and thunderings, and lightnings, and an earthquake.",
    "And the seven angels which had the seven trumpets prepared themselves to sound.",
    "The first angel sounded, and there followed hail and fire mingled with blood, and they were cast upon the earth: and the third part of trees was burnt up, and all green grass was burnt up.",
    "And the second angel sounded, and as it were a great mountain burning with fire was cast into the sea: and the third part of the sea became blood;",
    "And the third part of the creatures which were in the sea, and had life, died; and the third part of the ships were destroyed.",
    "And the third angel sounded, and there fell a great star from heaven, burning as it were a lamp, and it fell upon the third part of the rivers, and upon the fountains of waters;",
    "And the name of the star is called Wormwood: and the third part of the waters became wormwood; and many men died of the waters, because they were made bitter.",
    "And the fourth angel sounded, and the third part of the sun was smitten, and the third part of the moon, and the third part of the stars; so as the third part of them was darkened, and the day shone not for a third part of it, and the night likewise.",
    "And I beheld, and heard an angel flying through the midst of heaven, saying with a loud voice, Woe, woe, woe, to the inhabiters of the earth by reason of the other voices of the trumpet of the three angels, which are yet to sound!",
  ],

  [ // 9
    "And the fifth angel sounded, and I saw a star fall from heaven unto the earth: and to him was given the key of the bottomless pit.",
    "And he opened the bottomless pit; and there arose a smoke out of the pit, as the smoke of a great furnace; and the sun and the air were darkened by reason of the smoke of the pit.",
    "And there came out of the smoke locusts upon the earth: and unto them was given power, as the scorpions of the earth have power.",
    "And it was commanded them that they should not hurt the grass of the earth, neither any green thing, neither any tree; but only those men which have not the seal of God in their foreheads.",
    "And to them it was given that they should not kill them, but that they should be tormented five months: and their torment was as the torment of a scorpion, when he striketh a man.",
    "And in those days shall men seek death, and shall not find it; and shall desire to die, and death shall flee from them.",
    "And the shapes of the locusts were like unto horses prepared unto battle; and on their heads were as it were crowns like gold, and their faces were as the faces of men.",
    "And they had hair as the hair of women, and their teeth were as the teeth of lions.",
    "And they had breastplates, as it were breastplates of iron; and the sound of their wings was as the sound of chariots of many horses running to battle.",
    "And they had tails like unto scorpions, and there were stings in their tails: and their power was to hurt men five months.",
    "And they had a king over them, which is the angel of the bottomless pit, whose name in the Hebrew tongue is Abaddon, but in the Greek tongue hath his name Apollyon.",
    "One woe is past; and, behold, there come two woes more hereafter.",
    "And the sixth angel sounded, and I heard a voice from the four horns of the golden altar which is before God,",
    "Saying to the sixth angel which had the trumpet, Loose the four angels which are bound in the great river <span class=\"place\">Euphrates</span>.",
    "And the four angels were loosed, which were prepared for an hour, and a day, and a month, and a year, for to slay the third part of men.",
    "And the number of the army of the horsemen were two hundred thousand thousand: and I heard the number of them.",
    "And thus I saw the horses in the vision, and them that sat on them, having breastplates of fire, and of jacinth, and brimstone: and the heads of the horses were as the heads of lions; and out of their mouths issued fire and smoke and brimstone.",
    "By these three was the third part of men killed, by the fire, and by the smoke, and by the brimstone, which issued out of their mouths.",
    "For their power is in their mouth, and in their tails: for their tails were like unto serpents, and had heads, and with them they do hurt.",
    "And the rest of the men which were not killed by these plagues yet repented not of the works of their hands, that they should not worship devils, and idols of gold, and silver, and brass, and stone, and of wood: which neither can see, nor hear, nor walk:",
    "Neither repented they of their murders, nor of their sorceries, nor of their fornication, nor of their thefts.",
  ],

  [ // 10
    "And I saw another mighty angel come down from heaven, clothed with a cloud: and a rainbow was upon his head, and his face was as it were the sun, and his feet as pillars of fire:",
    "And he had in his hand a little book open: and he set his right foot upon the sea, and his left foot on the earth,",
    "And cried with a loud voice, as when a lion roareth: and when he had cried, seven thunders uttered their voices.",
    "And when the seven thunders had uttered their voices, I was about to write: and I heard a voice from heaven saying unto me, Seal up those things which the seven thunders uttered, and write them not.",
    "And the angel which I saw stand upon the sea and upon the earth lifted up his hand to heaven,",
    "And sware by him that liveth for ever and ever, who created heaven, and the things that therein are, and the earth, and the things that therein are, and the sea, and the things which are therein, that there should be time no longer:",
    "But in the days of the voice of the seventh angel, when he shall begin to sound, the mystery of God should be finished, as he hath declared to his servants the prophets.",
    "And the voice which I heard from heaven spake unto me again, and said, Go and take the little book which is open in the hand of the angel which standeth upon the sea and upon the earth.",
    "And I went unto the angel, and said unto him, Give me the little book. And he said unto me, Take it, and eat it up; and it shall make thy belly bitter, but it shall be in thy mouth sweet as honey.",
    "And I took the little book out of the angel's hand, and ate it up; and it was in my mouth sweet as honey: and as soon as I had eaten it, my belly was bitter.",
    "And he said unto me, Thou must prophesy again before many peoples, and nations, and tongues, and kings.",
  ],

  [ // 11
    "And there was given me a reed like unto a rod: and the angel stood, saying, Rise, and measure the temple of God, and the altar, and them that worship therein.",
    "But the court which is without the temple leave out, and measure it not; for it is given unto the Gentiles: and the holy city shall they tread under foot forty and two months.",
    "And I will give power unto my two witnesses, and they shall prophesy a thousand two hundred and threescore days, clothed in sackcloth.",
    "These are the two olive trees, and the two candlesticks standing before the God of the earth.",
    "And if any man will hurt them, fire proceedeth out of their mouth, and devoureth their enemies: and if any man will hurt them, he must in this manner be killed.",
    "These have power to shut heaven, that it rain not in the days of their prophecy: and have power over waters to turn them to blood, and to smite the earth with all plagues, as often as they will.",
    "And when they shall have finished their testimony, the beast that ascendeth out of the bottomless pit shall make war against them, and shall overcome them, and kill them.",
    "And their dead bodies shall lie in the street of the great city, which spiritually is called <span class=\"place\">Sodom </span>and <span class=\"place\">Egypt</span>, where also our Lord was crucified.",
    "And they of the people and kindreds and tongues and nations shall see their dead bodies three days and an half, and shall not suffer their dead bodies to be put in graves.",
    "And they that dwell upon the earth shall rejoice over them, and make merry, and shall send gifts one to another; because these two prophets tormented them that dwelt on the earth.",
    "And after three days and an half the Spirit of life from God entered into them, and they stood upon their feet; and great fear fell upon them which saw them.",
    "And they heard a great voice from heaven saying unto them, Come up hither. And they ascended up to heaven in a cloud; and their enemies beheld them.",
    "And the same hour was there a great earthquake, and the tenth part of the city fell, and in the earthquake were slain of men seven thousand: and the remnant were affrighted, and gave glory to the God of heaven.",
    "The second woe is past; and, behold, the third woe cometh quickly.",
    "And the seventh angel sounded; and there were great voices in heaven, saying, The kingdoms of this world are become the kingdoms of our Lord, and of his <span class=\"person\">Christ</span>; and he shall reign for ever and ever.",
    "And the four and twenty elders, which sat before God on their seats, fell upon their faces, and worshipped God,",
    "Saying, We give thee thanks, O LORD God Almighty, which art, and wast, and art to come; because thou hast taken to thee thy great power, and hast reigned.",
    "And the nations were angry, and thy wrath is come, and the time of the dead, that they should be judged, and that thou shouldest give reward unto thy servants the prophets, and to the saints, and them that fear thy name, small and great; and shouldest destroy them which destroy the earth.",
    "And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament: and there were lightnings, and voices, and thunderings, and an earthquake, and great hail.",
  ],

  [ // 12
    "And there appeared a great wonder in heaven; a woman clothed with the sun, and the moon under her feet, and upon her head a crown of twelve stars:",
    "And she being with child cried, travailing in birth, and pained to be delivered.",
    "And there appeared another wonder in heaven; and behold a great red dragon, having seven heads and ten horns, and seven crowns upon his heads.",
    "And his tail drew the third part of the stars of heaven, and did cast them to the earth: and the dragon stood before the woman which was ready to be delivered, for to devour her child as soon as it was born.",
    "And she brought forth a man child, who was to rule all nations with a rod of iron: and her child was caught up unto God, and to his throne.",
    "And the woman fled into the wilderness, where she hath a place prepared of God, that they should feed her there a thousand two hundred and threescore days.",
    "And there was war in heaven: Michael and his angels fought against the dragon; and the dragon fought and his angels,",
    "And prevailed not; neither was their place found any more in heaven.",
    "And the great dragon was cast out, that old serpent, called the Devil, and <span class=\"person\">Satan</span>, which deceiveth the whole world: he was cast out into the earth, and his angels were cast out with him.",
    "And I heard a loud voice saying in heaven, Now is come salvation, and strength, and the kingdom of our God, and the power of his <span class=\"person\">Christ</span>: for the accuser of our brethren is cast down, which accused them before our God day and night.",
    "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not their lives unto the death.",
    "Therefore rejoice, ye heavens, and ye that dwell in them. Woe to the inhabiters of the earth and of the sea! for the devil is come down unto you, having great wrath, because he knoweth that he hath but a short time.",
    "And when the dragon saw that he was cast unto the earth, he persecuted the woman which brought forth the man child.",
    "And to the woman were given two wings of a great eagle, that she might fly into the wilderness, into her place, where she is nourished for a time, and times, and half a time, from the face of the serpent.",
    "And the serpent cast out of his mouth water as a flood after the woman, that he might cause her to be carried away of the flood.",
    "And the earth helped the woman, and the earth opened her mouth, and swallowed up the flood which the dragon cast out of his mouth.",
    "And the dragon was wroth with the woman, and went to make war with the remnant of her seed, which keep the commandments of God, and have the testimony of <span class=\"person\">Jesus </span><span class=\"person\">Christ</span>.",
  ],

  [ // 13
    "And I stood upon the sand of the sea, and saw a beast rise up out of the sea, having seven heads and ten horns, and upon his horns ten crowns, and upon his heads the name of blasphemy.",
    "And the beast which I saw was like unto a leopard, and his feet were as the feet of a bear, and his mouth as the mouth of a lion: and the dragon gave him his power, and his seat, and great authority.",
    "And I saw one of his heads as it were wounded to death; and his deadly wound was healed: and all the world wondered after the beast.",
    "And they worshipped the dragon which gave power unto the beast: and they worshipped the beast, saying, Who is like unto the beast? who is able to make war with him?",
    "And there was given unto him a mouth speaking great things and blasphemies; and power was given unto him to continue forty and two months.",
    "And he opened his mouth in blasphemy against God, to blaspheme his name, and his tabernacle, and them that dwell in heaven.",
    "And it was given unto him to make war with the saints, and to overcome them: and power was given him over all kindreds, and tongues, and nations.",
    "And all that dwell upon the earth shall worship him, whose names are not written in the book of life of the Lamb slain from the foundation of the world.",
    "If any man have an ear, let him hear.",
    "He that leadeth into captivity shall go into captivity: he that killeth with the sword must be killed with the sword. Here is the patience and the faith of the saints.",
    "And I beheld another beast coming up out of the earth; and he had two horns like a lamb, and he spake as a dragon.",
    "And he exerciseth all the power of the first beast before him, and causeth the earth and them which dwell therein to worship the first beast, whose deadly wound was healed.",
    "And he doeth great wonders, so that he maketh fire come down from heaven on the earth in the sight of men,",
    "And deceiveth them that dwell on the earth by the means of those miracles which he had power to do in the sight of the beast; saying to them that dwell on the earth, that they should make an image to the beast, which had the wound by a sword, and did live.",
    "And he had power to give life unto the image of the beast, that the image of the beast should both speak, and cause that as many as would not worship the image of the beast should be killed.",
    "And he causeth all, both small and great, rich and poor, free and bond, to receive a mark in their right hand, or in their foreheads:",
    "And that no man might buy or sell, save he that had the mark, or the name of the beast, or the number of his name.",
    "Here is wisdom. Let him that hath understanding count the number of the beast: for it is the number of a man; and his number is Six hundred threescore and six.",
  ],

  [ // 14
    "And I looked, and, lo, a Lamb stood on the mount <span class=\"place\">Sion</span>, and with him an hundred forty and four thousand, having his Father's name written in their foreheads.",
    "And I heard a voice from heaven, as the voice of many waters, and as the voice of a great thunder: and I heard the voice of harpers harping with their harps:",
    "And they sung as it were a new song before the throne, and before the four beasts, and the elders: and no man could learn that song but the hundred and forty and four thousand, which were redeemed from the earth.",
    "These are they which were not defiled with women; for they are virgins. These are they which follow the Lamb whithersoever he goeth. These were redeemed from among men, being the firstfruits unto God and to the Lamb.",
    "And in their mouth was found no guile: for they are without fault before the throne of God.",
    "And I saw another angel fly in the midst of heaven, having the everlasting gospel to preach unto them that dwell on the earth, and to every nation, and kindred, and tongue, and people,",
    "Saying with a loud voice, Fear God, and give glory to him; for the hour of his judgment is come: and worship him that made heaven, and earth, and the sea, and the fountains of waters.",
    "And there followed another angel, saying, <span class=\"place\">Babylon </span>is fallen, is fallen, that great city, because she made all nations drink of the wine of the wrath of her fornication.",
    "And the third angel followed them, saying with a loud voice, If any man worship the beast and his image, and receive his mark in his forehead, or in his hand,",
    "The same shall drink of the wine of the wrath of God, which is poured out without mixture into the cup of his indignation; and he shall be tormented with fire and brimstone in the presence of the holy angels, and in the presence of the Lamb:",
    "And the smoke of their torment ascendeth up for ever and ever: and they have no rest day nor night, who worship the beast and his image, and whosoever receiveth the mark of his name.",
    "Here is the patience of the saints: here are they that keep the commandments of God, and the faith of <span class=\"person\">Jesus</span>.",
    "And I heard a voice from heaven saying unto me, Write, Blessed are the dead which die in the Lord from henceforth: Yea, saith the Spirit, that they may rest from their labours; and their works do follow them.",
    "And I looked, and behold a white cloud, and upon the cloud one sat like unto the Son of man, having on his head a golden crown, and in his hand a sharp sickle.",
    "And another angel came out of the temple, crying with a loud voice to him that sat on the cloud, Thrust in thy sickle, and reap: for the time is come for thee to reap; for the harvest of the earth is ripe.",
    "And he that sat on the cloud thrust in his sickle on the earth; and the earth was reaped.",
    "And another angel came out of the temple which is in heaven, he also having a sharp sickle.",
    "And another angel came out from the altar, which had power over fire; and cried with a loud cry to him that had the sharp sickle, saying, Thrust in thy sharp sickle, and gather the clusters of the vine of the earth; for her grapes are fully ripe.",
    "And the angel thrust in his sickle into the earth, and gathered the vine of the earth, and cast it into the great winepress of the wrath of God.",
    "And the winepress was trodden without the city, and blood came out of the winepress, even unto the horse bridles, by the space of a thousand and six hundred furlongs.",
  ],

  [ // 15
    "And I saw another sign in heaven, great and marvellous, seven angels having the seven last plagues; for in them is filled up the wrath of God.",
    "And I saw as it were a sea of glass mingled with fire: and them that had gotten the victory over the beast, and over his image, and over his mark, and over the number of his name, stand on the sea of glass, having the harps of God.",
    "And they sing the song of <span class=\"person\">Moses </span>the servant of God, and the song of the Lamb, saying, Great and marvellous are thy works, Lord God Almighty; just and true are thy ways, thou King of saints.",
    "Who shall not fear thee, O Lord, and glorify thy name? for thou only art holy: for all nations shall come and worship before thee; for thy judgments are made manifest.",
    "And after that I looked, and, behold, the temple of the tabernacle of the testimony in heaven was opened:",
    "And the seven angels came out of the temple, having the seven plagues, clothed in pure and white linen, and having their breasts girded with golden girdles.",
    "And one of the four beasts gave unto the seven angels seven golden vials full of the wrath of God, who liveth for ever and ever.",
    "And the temple was filled with smoke from the glory of God, and from his power; and no man was able to enter into the temple, till the seven plagues of the seven angels were fulfilled.",
  ],

  [ // 16
    "And I heard a great voice out of the temple saying to the seven angels, Go your ways, and pour out the vials of the wrath of God upon the earth.",
    "And the first went, and poured out his vial upon the earth; and there fell a noisome and grievous sore upon the men which had the mark of the beast, and upon them which worshipped his image.",
    "And the second angel poured out his vial upon the sea; and it became as the blood of a dead man: and every living soul died in the sea.",
    "And the third angel poured out his vial upon the rivers and fountains of waters; and they became blood.",
    "And I heard the angel of the waters say, Thou art righteous, O Lord, which art, and wast, and shalt be, because thou hast judged thus.",
    "For they have shed the blood of saints and prophets, and thou hast given them blood to drink; for they are worthy.",
    "And I heard another out of the altar say, Even so, Lord God Almighty, true and righteous are thy judgments.",
    "And the fourth angel poured out his vial upon the sun; and power was given unto him to scorch men with fire.",
    "And men were scorched with great heat, and blasphemed the name of God, which hath power over these plagues: and they repented not to give him glory.",
    "And the fifth angel poured out his vial upon the seat of the beast; and his kingdom was full of darkness; and they gnawed their tongues for pain,",
    "And blasphemed the God of heaven because of their pains and their sores, and repented not of their deeds.",
    "And the sixth angel poured out his vial upon the great river <span class=\"place\">Euphrates</span>; and the water thereof was dried up, that the way of the kings of the east might be prepared.",
    "And I saw three unclean spirits like frogs come out of the mouth of the dragon, and out of the mouth of the beast, and out of the mouth of the false prophet.",
    "For they are the spirits of devils, working miracles, which go forth unto the kings of the earth and of the whole world, to gather them to the battle of that great day of God Almighty.",
    "<span class=\"word\">Behold, I come as a thief. Blessed is he that watcheth, and keepeth his garments, lest he walk naked, and they see his shame. </span>",
    "And he gathered them together into a place called in the Hebrew tongue Armageddon.",
    "And the seventh angel poured out his vial into the air; and there came a great voice out of the temple of heaven, from the throne, saying, It is done.",
    "And there were voices, and thunders, and lightnings; and there was a great earthquake, such as was not since men were upon the earth, so mighty an earthquake, and so great.",
    "And the great city was divided into three parts, and the cities of the nations fell: and great <span class=\"place\">Babylon </span>came in remembrance before God, to give unto her the cup of the wine of the fierceness of his wrath.",
    "And every island fled away, and the mountains were not found.",
    "And there fell upon men a great hail out of heaven, every stone about the weight of a talent: and men blasphemed God because of the plague of the hail; for the plague thereof was exceeding great.",
  ],

  [ // 17
    "And there came one of the seven angels which had the seven vials, and talked with me, saying unto me, Come hither; I will shew unto thee the judgment of the great whore that sitteth upon many waters:",
    "With whom the kings of the earth have committed fornication, and the inhabitants of the earth have been made drunk with the wine of her fornication.",
    "So he carried me away in the spirit into the wilderness: and I saw a woman sit upon a scarlet coloured beast, full of names of blasphemy, having seven heads and ten horns.",
    "And the woman was arrayed in purple and scarlet colour, and decked with gold and precious stones and pearls, having a golden cup in her hand full of abominations and filthiness of her fornication:",
    "And upon her forehead was a name written, MYSTERY, BABYLON THE GREAT, THE MOTHER OF HARLOTS AND ABOMINATIONS OF THE EARTH.",
    "And I saw the woman drunken with the blood of the saints, and with the blood of the martyrs of <span class=\"person\">Jesus</span>: and when I saw her, I wondered with great admiration.",
    "And the angel said unto me, Wherefore didst thou marvel? I will tell thee the mystery of the woman, and of the beast that carrieth her, which hath the seven heads and ten horns.",
    "The beast that thou sawest was, and is not; and shall ascend out of the bottomless pit, and go into perdition: and they that dwell on the earth shall wonder, whose names were not written in the book of life from the foundation of the world, when they behold the beast that was, and is not, and yet is.",
    "And here is the mind which hath wisdom. The seven heads are seven mountains, on which the woman sitteth.",
    "And there are seven kings: five are fallen, and one is, and the other is not yet come; and when he cometh, he must continue a short space.",
    "And the beast that was, and is not, even he is the eighth, and is of the seven, and goeth into perdition.",
    "And the ten horns which thou sawest are ten kings, which have received no kingdom as yet; but receive power as kings one hour with the beast.",
    "These have one mind, and shall give their power and strength unto the beast.",
    "These shall make war with the Lamb, and the Lamb shall overcome them: for he is Lord of lords, and King of kings: and they that are with him are called, and chosen, and faithful.",
    "And he saith unto me, The waters which thou sawest, where the whore sitteth, are peoples, and multitudes, and nations, and tongues.",
    "And the ten horns which thou sawest upon the beast, these shall hate the whore, and shall make her desolate and naked, and shall eat her flesh, and burn her with fire.",
    "For God hath put in their hearts to fulfil his will, and to agree, and give their kingdom unto the beast, until the words of God shall be fulfilled.",
    "And the woman which thou sawest is that great city, which reigneth over the kings of the earth.",
  ],

  [ // 18
    "And after these things I saw another angel come down from heaven, having great power; and the earth was lightened with his glory.",
    "And he cried mightily with a strong voice, saying, <span class=\"place\">Babylon </span>the great is fallen, is fallen, and is become the habitation of devils, and the hold of every foul spirit, and a cage of every unclean and hateful bird.",
    "For all nations have drunk of the wine of the wrath of her fornication, and the kings of the earth have committed fornication with her, and the merchants of the earth are waxed rich through the abundance of her delicacies.",
    "And I heard another voice from heaven, saying, Come out of her, my people, that ye be not partakers of her sins, and that ye receive not of her plagues.",
    "For her sins have reached unto heaven, and God hath remembered her iniquities.",
    "Reward her even as she rewarded you, and double unto her double according to her works: in the cup which she hath filled fill to her double.",
    "How much she hath glorified herself, and lived deliciously, so much torment and sorrow give her: for she saith in her heart, I sit a queen, and am no widow, and shall see no sorrow.",
    "Therefore shall her plagues come in one day, death, and mourning, and famine; and she shall be utterly burned with fire: for strong is the Lord God who judgeth her.",
    "And the kings of the earth, who have committed fornication and lived deliciously with her, shall bewail her, and lament for her, when they shall see the smoke of her burning,",
    "Standing afar off for the fear of her torment, saying, Alas, alas that great city <span class=\"place\">Babylon</span>, that mighty city! for in one hour is thy judgment come.",
    "And the merchants of the earth shall weep and mourn over her; for no man buyeth their merchandise any more:",
    "The merchandise of gold, and silver, and precious stones, and of pearls, and fine linen, and purple, and silk, and scarlet, and all thyine wood, and all manner vessels of ivory, and all manner vessels of most precious wood, and of brass, and iron, and marble,",
    "And cinnamon, and odours, and ointments, and frankincense, and wine, and oil, and fine flour, and wheat, and beasts, and sheep, and horses, and chariots, and slaves, and souls of men.",
    "And the fruits that thy soul lusted after are departed from thee, and all things which were dainty and goodly are departed from thee, and thou shalt find them no more at all.",
    "The merchants of these things, which were made rich by her, shall stand afar off for the fear of her torment, weeping and wailing,",
    "And saying, Alas, alas, that great city, that was clothed in fine linen, and purple, and scarlet, and decked with gold, and precious stones, and pearls!",
    "For in one hour so great riches is come to nought. And every shipmaster, and all the company in ships, and sailors, and as many as trade by sea, stood afar off,",
    "And cried when they saw the smoke of her burning, saying, What city is like unto this great city!",
    "And they cast dust on their heads, and cried, weeping and wailing, saying, Alas, alas, that great city, wherein were made rich all that had ships in the sea by reason of her costliness! for in one hour is she made desolate.",
    "Rejoice over her, thou heaven, and ye holy apostles and prophets; for God hath avenged you on her.",
    "And a mighty angel took up a stone like a great millstone, and cast it into the sea, saying, Thus with violence shall that great city <span class=\"place\">Babylon </span>be thrown down, and shall be found no more at all.",
    "And the voice of harpers, and musicians, and of pipers, and trumpeters, shall be heard no more at all in thee; and no craftsman, of whatsoever craft he be, shall be found any more in thee; and the sound of a millstone shall be heard no more at all in thee;",
    "And the light of a candle shall shine no more at all in thee; and the voice of the bridegroom and of the bride shall be heard no more at all in thee: for thy merchants were the great men of the earth; for by thy sorceries were all nations deceived.",
    "And in her was found the blood of prophets, and of saints, and of all that were slain upon the earth.",
  ],

  [ // 19
    "And after these things I heard a great voice of much people in heaven, saying, Alleluia; Salvation, and glory, and honour, and power, unto the Lord our God:",
    "For true and righteous are his judgments: for he hath judged the great whore, which did corrupt the earth with her fornication, and hath avenged the blood of his servants at her hand.",
    "And again they said, Alleluia. And her smoke rose up for ever and ever.",
    "And the four and twenty elders and the four beasts fell down and worshipped God that sat on the throne, saying, Amen; Alleluia.",
    "And a voice came out of the throne, saying, Praise our God, all ye his servants, and ye that fear him, both small and great.",
    "And I heard as it were the voice of a great multitude, and as the voice of many waters, and as the voice of mighty thunderings, saying, Alleluia: for the Lord God omnipotent reigneth.",
    "Let us be glad and rejoice, and give honour to him: for the marriage of the Lamb is come, and his wife hath made herself ready.",
    "And to her was granted that she should be arrayed in fine linen, clean and white: for the fine linen is the righteousness of saints.",
    "And he saith unto me, Write, Blessed are they which are called unto the marriage supper of the Lamb. And he saith unto me, These are the true sayings of God.",
    "And I fell at his feet to worship him. And he said unto me, See thou do it not: I am thy fellowservant, and of thy brethren that have the testimony of <span class=\"person\">Jesus</span>: worship God: for the testimony of <span class=\"person\">Jesus </span>is the spirit of prophecy.",
    "And I saw heaven opened, and behold a white horse; and he that sat upon him was called Faithful and True, and in righteousness he doth judge and make war.",
    "His eyes were as a flame of fire, and on his head were many crowns; and he had a name written, that no man knew, but he himself.",
    "And he was clothed with a vesture dipped in blood: and his name is called The Word of God.",
    "And the armies which were in heaven followed him upon white horses, clothed in fine linen, white and clean.",
    "And out of his mouth goeth a sharp sword, that with it he should smite the nations: and he shall rule them with a rod of iron: and he treadeth the winepress of the fierceness and wrath of Almighty God.",
    "And he hath on his vesture and on his thigh a name written, KING OF KINGS, AND LORD OF LORDS.",
    "And I saw an angel standing in the sun; and he cried with a loud voice, saying to all the fowls that fly in the midst of heaven, Come and gather yourselves together unto the supper of the great God;",
    "That ye may eat the flesh of kings, and the flesh of captains, and the flesh of mighty men, and the flesh of horses, and of them that sit on them, and the flesh of all men, both free and bond, both small and great.",
    "And I saw the beast, and the kings of the earth, and their armies, gathered together to make war against him that sat on the horse, and against his army.",
    "And the beast was taken, and with him the false prophet that wrought miracles before him, with which he deceived them that had received the mark of the beast, and them that worshipped his image. These both were cast alive into a lake of fire burning with brimstone.",
    "And the remnant were slain with the sword of him that sat upon the horse, which sword proceeded out of his mouth: and all the fowls were filled with their flesh.",
  ],

  [ // 20
    "And I saw an angel come down from heaven, having the key of the bottomless pit and a great chain in his hand.",
    "And he laid hold on the dragon, that old serpent, which is the Devil, and <span class=\"person\">Satan</span>, and bound him a thousand years,",
    "And cast him into the bottomless pit, and shut him up, and set a seal upon him, that he should deceive the nations no more, till the thousand years should be fulfilled: and after that he must be loosed a little season.",
    "And I saw thrones, and they sat upon them, and judgment was given unto them: and I saw the souls of them that were beheaded for the witness of <span class=\"person\">Jesus</span>, and for the word of God, and which had not worshipped the beast, neither his image, neither had received his mark upon their foreheads, or in their hands; and they lived and reigned with <span class=\"person\">Christ </span>a thousand years.",
    "But the rest of the dead lived not again until the thousand years were finished. This is the first resurrection.",
    "Blessed and holy is he that hath part in the first resurrection: on such the second death hath no power, but they shall be priests of God and of <span class=\"person\">Christ</span>, and shall reign with him a thousand years.",
    "And when the thousand years are expired, <span class=\"person\">Satan </span>shall be loosed out of his prison,",
    "And shall go out to deceive the nations which are in the four quarters of the earth, Gog and <span class=\"person\">Magog</span>, to gather them together to battle: the number of whom is as the sand of the sea.",
    "And they went up on the breadth of the earth, and compassed the camp of the saints about, and the beloved city: and fire came down from God out of heaven, and devoured them.",
    "And the devil that deceived them was cast into the lake of fire and brimstone, where the beast and the false prophet are, and shall be tormented day and night for ever and ever.",
    "And I saw a great white throne, and him that sat on it, from whose face the earth and the heaven fled away; and there was found no place for them.",
    "And I saw the dead, small and great, stand before God; and the books were opened: and another book was opened, which is the book of life: and the dead were judged out of those things which were written in the books, according to their works.",
    "And the sea gave up the dead which were in it; and death and hell delivered up the dead which were in them: and they were judged every man according to their works.",
    "And death and hell were cast into the lake of fire. This is the second death.",
    "And whosoever was not found written in the book of life was cast into the lake of fire.",
  ],

  [ // 21
    "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea.",
    "And I <span class=\"person\">John </span>saw the holy city, new <span class=\"place\">Jerusalem</span>, coming down from God out of heaven, prepared as a bride adorned for her husband.",
    "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God.",
    "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
    "And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful.",
    "And he said unto me, It is done. I am Alpha and Omega, the beginning and the end. I will give unto him that is athirst of the fountain of the water of life freely.",
    "He that overcometh shall inherit all things; and I will be his God, and he shall be my son.",
    "But the fearful, and unbelieving, and the abominable, and murderers, and whoremongers, and sorcerers, and idolaters, and all liars, shall have their part in the lake which burneth with fire and brimstone: which is the second death.",
    "And there came unto me one of the seven angels which had the seven vials full of the seven last plagues, and talked with me, saying, Come hither, I will shew thee the bride, the Lamb's wife.",
    "And he carried me away in the spirit to a great and high mountain, and shewed me that great city, the holy <span class=\"place\">Jerusalem</span>, descending out of heaven from God,",
    "Having the glory of God: and her light was like unto a stone most precious, even like a jasper stone, clear as crystal;",
    "And had a wall great and high, and had twelve gates, and at the gates twelve angels, and names written thereon, which are the names of the twelve tribes of the children of <span class=\"place\">Israel</span>:",
    "<span class=\"place\">On </span>the east three gates; on the north three gates; on the south three gates; and on the west three gates.",
    "And the wall of the city had twelve foundations, and in them the names of the twelve apostles of the Lamb.",
    "And he that talked with me had a golden reed to measure the city, and the gates thereof, and the wall thereof.",
    "And the city lieth foursquare, and the length is as large as the breadth: and he measured the city with the reed, twelve thousand furlongs. The length and the breadth and the height of it are equal.",
    "And he measured the wall thereof, an hundred and forty and four cubits, according to the measure of a man, that is, of the angel.",
    "And the building of the wall of it was of jasper: and the city was pure gold, like unto clear glass.",
    "And the foundations of the wall of the city were garnished with all manner of precious stones. The first foundation was jasper; the second, sapphire; the third, a chalcedony; the fourth, an emerald;",
    "The fifth, sardonyx; the sixth, sardius; the seventh, chrysolite; the eighth, beryl; the ninth, a topaz; the tenth, a chrysoprasus; the eleventh, a jacinth; the twelfth, an amethyst.",
    "And the twelve gates were twelve pearls: every several gate was of one pearl: and the street of the city was pure gold, as it were transparent glass.",
    "And I saw no temple therein: for the Lord God Almighty and the Lamb are the temple of it.",
    "And the city had no need of the sun, neither of the moon, to shine in it: for the glory of God did lighten it, and the Lamb is the light thereof.",
    "And the nations of them which are saved shall walk in the light of it: and the kings of the earth do bring their glory and honour into it.",
    "And the gates of it shall not be shut at all by day: for there shall be no night there.",
    "And they shall bring the glory and honour of the nations into it.",
    "And there shall in no wise enter into it any thing that defileth, neither whatsoever worketh abomination, or maketh a lie: but they which are written in the Lamb's book of life.",
  ],

  [ // 22
    "And he shewed me a pure river of water of life, clear as crystal, proceeding out of the throne of God and of the Lamb.",
    "In the midst of the street of it, and on either side of the river, was there the tree of life, which bare twelve manner of fruits, and yielded her fruit every month: and the leaves of the tree were for the healing of the nations.",
    "And there shall be no more curse: but the throne of God and of the Lamb shall be in it; and his servants shall serve him:",
    "And they shall see his face; and his name shall be in their foreheads.",
    "And there shall be no night there; and they need no candle, neither light of the sun; for the Lord God giveth them light: and they shall reign for ever and ever.",
    "And he said unto me, These sayings are faithful and true: and the Lord God of the holy prophets sent his angel to shew unto his servants the things which must shortly be done.",
    "<span class=\"word\">Behold, I come quickly: blessed is he that keepeth the sayings of the prophecy of this book. </span>",
    "And I <span class=\"person\">John </span>saw these things, and heard them. And when I had heard and seen, I fell down to worship before the feet of the angel which shewed me these things.",
    "Then saith he unto me, See thou do it not: for I am thy fellowservant, and of thy brethren the prophets, and of them which keep the sayings of this book: worship God.",
    "And he saith unto me, Seal not the sayings of the prophecy of this book: for the time is at hand.",
    "He that is unjust, let him be unjust still: and he which is filthy, let him be filthy still: and he that is righteous, let him be righteous still: and he that is holy, let him be holy still.",
    "<span class=\"word\">And, behold, I come quickly; and my reward is with me, to give every man according as his work shall be. </span>",
    "<span class=\"word\">I am Alpha and Omega, the beginning and the end, the first and the last. </span>",
    "Blessed are they that do his commandments, that they may have right to the tree of life, and may enter in through the gates into the city.",
    "For without are dogs, and sorcerers, and whoremongers, and murderers, and idolaters, and whosoever loveth and maketh a lie.",
    "<span class=\"word\">I <span class=\"person\">Jesus </span>have sent mine angel to testify unto you these things in the churches. I am the root and the offspring of <span class=\"person\">David</span>, and the bright and morning star. </span>",
    "And the Spirit and the bride say, Come. And let him that heareth say, Come. And let him that is athirst come. And whosoever will, let him take the water of life freely.",
    "For I testify unto every man that heareth the words of the prophecy of this book, If any man shall add unto these things, God shall add unto him the plagues that are written in this book:",
    "And if any man shall take away from the words of the book of this prophecy, God shall take away his part out of the book of life, and out of the holy city, and from the things which are written in this book.",
    "He which testifieth these things saith, <span class=\"word\">Surely I come quickly. </span>Amen. Even so, come, Lord <span class=\"person\">Jesus</span>.",
    "The grace of our Lord <span class=\"person\">Jesus </span><span class=\"person\">Christ </span>be with you all. Amen.",
  ],

]; // end of en


theBook.lang_fr = [

  [ // 1
    "Révélation de Jésus Christ, que Dieu lui a donnée pour montrer à ses serviteurs les choses qui doivent arriver bientôt, et qu'il a fait connaître, par l'envoi de son ange, à son serviteur Jean,",
    "lequel a attesté la parole de Dieu et le témoignage de Jésus Christ, tout ce qu'il a vu.",
    "Heureux celui qui lit et ceux qui entendent les paroles de la prophétie, et qui gardent les choses qui y sont écrites! Car le temps est proche.",
    "Jean aux sept Églises qui sont en Asie: que la grâce et la paix vous soient données de la part de celui qui est, qui était, et qui vient, et de la part des sept esprits qui sont devant son trône,",
    "et de la part de Jésus Christ, le témoin fidèle, le premier-né des morts, et le prince des rois de la terre! A celui qui nous aime, qui nous a délivrés de nos péchés par son sang,",
    "et qui a fait de nous un royaume, des sacrificateurs pour Dieu son Père, à lui soient la gloire et la puissance, aux siècles des siècles! Amen!",
    "Voici, il vient avec les nuées. Et tout oeil le verra, même ceux qui l'ont percé; et toutes les tribus de la terre se lamenteront à cause de lui. Oui. Amen!",
    "<span class=\"word\"> Je suis l'alpha et l'oméga,</span> dit le Seigneur Dieu, celui qui est, qui était, et qui vient, le Tout Puissant.",
    "Moi Jean, votre frère, et qui ai part avec vous à la tribulation et au royaume et à la persévérance en Jésus, j'étais dans l'île appelée Patmos, à cause de la parole de Dieu et du témoignage de Jésus.",
    "Je fus ravi en esprit au jour du Seigneur, et j'entendis derrière moi une voix forte, comme le son d'une trompette,",
    "qui disait: <span class=\"word\">Ce que tu vois, écris-le dans un livre, et envoie-le aux sept Églises, à Éphèse, à Smyrne, à Pergame, à Thyatire, à Sardes, à Philadelphie, et à Laodicée.</span>",
    "Je me retournai pour connaître quelle était la voix qui me parlait. Et, après m'être retourné, je vis sept chandeliers d'or,",
    "et, au milieu des sept chandeliers, quelqu'un qui ressemblait à un fils d'homme, vêtu d'une longue robe, et ayant une ceinture d'or sur la poitrine.",
    "Sa tête et ses cheveux étaient blancs comme de la laine blanche, comme de la neige; ses yeux étaient comme une flamme de feu;",
    "ses pieds étaient semblables à de l'airain ardent, comme s'il eût été embrasé dans une fournaise; et sa voix était comme le bruit de grandes eaux.",
    "Il avait dans sa main droite sept étoiles. De sa bouche sortait une épée aiguë, à deux tranchants; et son visage était comme le soleil lorsqu'il brille dans sa force.",
    "Quand je le vis, je tombai à ses pieds comme mort. Il posa sur moi sa main droite en disant: <span class=\"word\">Ne crains point!</span>",
    "<span class=\"word\">Je suis le premier et le dernier, et le vivant. J'étais mort; et voici, je suis vivant aux siècles des siècles. Je tiens les clefs de la mort et du séjour des morts.</span>",
    "<span class=\"word\">Écris donc les choses que tu as vues, et celles qui sont, et celles qui doivent arriver après elles,</span>",
    "<span class=\"word\">le mystère des sept étoiles que tu as vues dans ma main droite, et des sept chandeliers d'or. Les sept étoiles sont les anges des sept Églises, et les sept chandeliers sont les sept Églises.</span>",
  ],

  [ // 2
    "<span class=\"word\"> Écris à l'ange de l'Église d'Éphèse: Voici ce que dit celui qui tient les sept étoiles dans sa main droite, celui qui marche au milieu des sept chandeliers d'or:</span>",
    "<span class=\"word\">Je connais tes oeuvres, ton travail, et ta persévérance. Je sais que tu ne peux supporter les méchants; que tu as éprouvé ceux qui se disent apôtres et qui ne le sont pas, et que tu les as trouvés menteurs;</span>",
    "<span class=\"word\"> que tu as de la persévérance, que tu as souffert à cause de mon nom, et que tu ne t'es point lassé.</span>",
    "<span class=\"word\"> Mais ce que j'ai contre toi, c'est que tu as abandonné ton premier amour.</span>",
    "<span class=\"word\"> Souviens-toi donc d'où tu es tombé, repens-toi, et pratique tes premières oeuvres; sinon, je viendrai à toi, et j'ôterai ton chandelier de sa place, à moins que tu ne te repentes.</span>",
    "<span class=\"word\"> Tu as pourtant ceci, c'est que tu hais les oeuvres des Nicolaïtes, oeuvres que je hais aussi.</span>",
    "<span class=\"word\"> Que celui qui a des oreilles entende ce que l'Esprit dit aux Églises: A celui qui vaincra je donnerai à manger de l'arbre de vie, qui est dans le paradis de Dieu.</span>",
    "<span class=\"word\"> Écris à l'ange de l'Église de Smyrne: Voici ce que dit le premier et le dernier, celui qui était mort, et qui est revenu à la vie:</span>",
    "<span class=\"word\"> Je connais ta tribulation et ta pauvreté (bien que tu sois riche), et les calomnies de la part de ceux qui se disent Juifs et ne le sont pas, mais qui sont une synagogue de Satan.</span>",
    "<span class=\"word\"> Ne crains pas ce que tu vas souffrir. Voici, le diable jettera quelques-uns de vous en prison, afin que vous soyez éprouvés, et vous aurez une tribulation de dix jours. Sois fidèle jusqu'à la mort, et je te donnerai la couronne de vie.</span>",
    "<span class=\"word\"> Que celui qui a des oreilles entende ce que l'Esprit dit aux Églises: Celui qui vaincra n'aura pas à souffrir la seconde mort.</span>",
    "<span class=\"word\"> Écris à l'ange de l'Église de Pergame: Voici ce que dit celui qui a l'épée aiguë, à deux tranchants:</span>",
    "<span class=\"word\"> Je sais où tu demeures, je sais que là est le trône de Satan. Tu retiens mon nom, et tu n'as pas renié ma foi, même aux jours d'Antipas, mon témoin fidèle, qui a été mis à mort chez vous, là où Satan a sa demeure.</span>",
    "<span class=\"word\"> Mais j'ai quelque chose contre toi, c'est que tu as là des gens attachés à la doctrine de Balaam, qui enseignait à Balak à mettre une pierre d'achoppement devant les fils d'Israël, pour qu'ils mangeassent des viandes sacrifiées aux idoles et qu'ils se livrassent à l'impudicité.</span>",
    "<span class=\"word\"> De même, toi aussi, tu as des gens attachés pareillement à la doctrine des Nicolaïtes.</span>",
    "<span class=\"word\"> Repens-toi donc; sinon, je viendrai à toi bientôt, et je les combattrai avec l'épée de ma bouche.</span>",
    "<span class=\"word\"> Que celui qui a des oreilles entende ce que l'Esprit dit aux Églises: A celui qui vaincra je donnerai de la manne cachée, et je lui donnerai un caillou blanc; et sur ce caillou est écrit un nom nouveau, que personne ne connaît, si ce n'est celui qui le reçoit.</span>",
    "<span class=\"word\"> Écris à l'ange de l'Église de Thyatire: Voici ce que dit le Fils de Dieu, celui qui a les yeux comme une flamme de feu, et dont les pieds sont semblables à de l'airain ardent:</span>",
    "<span class=\"word\"> Je connais tes oeuvres, ton amour, ta foi, ton fidèle service, ta constance, et tes dernières oeuvres plus nombreuses que les premières.</span>",
    "<span class=\"word\"> Mais ce que j'ai contre toi, c'est que tu laisses la femme Jézabel, qui se dit prophétesse, enseigner et séduire mes serviteurs, pour qu'ils se livrent à l'impudicité et qu'ils mangent des viandes sacrifiées aux idoles.</span>",
    "<span class=\"word\"> Je lui ai donné du temps, afin qu'elle se repentît, et elle ne veut pas se repentir de son impudicité.</span>",
    "<span class=\"word\"> Voici, je vais la jeter sur un lit, et envoyer une grande tribulation à ceux qui commettent adultère avec elle, à moins qu'ils ne se repentent de leurs oeuvres.</span>",
    "<span class=\"word\"> Je ferai mourir de mort ses enfants; et toutes les Églises connaîtront que je suis celui qui sonde les reins et les coeurs, et je vous rendrai à chacun selon vos oeuvres.</span>",
    "<span class=\"word\"> A vous, à tous les autres de Thyatire, qui ne reçoivent pas cette doctrine, et qui n'ont pas connu les profondeurs de Satan, comme ils les appellent, je vous dis: Je ne mets pas sur vous d'autre fardeau;</span>",
    "<span class=\"word\"> seulement, ce que vous avez, retenez-le jusqu'à ce que je vienne.</span>",
    "<span class=\"word\"> A celui qui vaincra, et qui gardera jusqu'à la fin mes oeuvres, je donnerai autorité sur les nations.</span>",
    "<span class=\"word\"> Il les paîtra avec une verge de fer, comme on brise les vases d'argile, ainsi que moi-même j'en ai reçu le pouvoir de mon Père.</span>",
    "<span class=\"word\"> Et je lui donnerai l'étoile du matin.</span>",
    "<span class=\"word\"> Que celui qui a des oreilles entende ce que l'Esprit dit aux Églises!</span>",
  ],

  [ // 3
    "<span class=\"word\">Écris à l'ange de l'Église de Sardes: Voici ce que dit celui qui a les sept esprits de Dieu et les sept étoiles: Je connais tes oeuvres. Je sais que tu passes pour être vivant, et tu es mort.</span>",
    "<span class=\"word\">Sois vigilant, et affermis le reste qui est près de mourir; car je n'ai pas trouvé tes oeuvres parfaites devant mon Dieu.</span>",
    "<span class=\"word\">Rappelle-toi donc comment tu as reçu et entendu, et garde et repens-toi. Si tu ne veilles pas, je viendrai comme un voleur, et tu ne sauras pas à quelle heure je viendrai sur toi.</span>",
    "<span class=\"word\">Cependant tu as à Sardes quelques hommes qui n'ont pas souillé leurs vêtements; ils marcheront avec moi en vêtements blancs, parce qu'ils en sont dignes.</span>",
    "<span class=\"word\">Celui qui vaincra sera revêtu ainsi de vêtements blancs; je n'effacerai point son nom du livre de vie, et je confesserai son nom devant mon Père et devant ses anges.</span>",
    "<span class=\"word\">Que celui qui a des oreilles entende ce que l'Esprit dit aux Églises!</span>",
    "<span class=\"word\">Écris à l'ange de l'Église de Philadelphie: Voici ce que dit le Saint, le Véritable, celui qui a la clef de David, celui qui ouvre, et personne ne fermera, celui qui ferme, et personne n'ouvrira:</span>",
    "<span class=\"word\">Je connais tes oeuvres. Voici, parce que tu a peu de puissance, et que tu as gardé ma parole, et que tu n'as pas renié mon nom, j'ai mis devant toi une porte ouverte, que personne ne peut fermer.</span>",
    "<span class=\"word\">Voici, je te donne de ceux de la synagogue de Satan, qui se disent Juifs et ne le sont pas, mais qui mentent; voici, je les ferai venir, se prosterner à tes pieds, et connaître que je t'ai aimé.</span>",
    "<span class=\"word\">Parce que tu as gardé la parole de la persévérance en moi, je te garderai aussi à l'heure de la tentation qui va venir sur le monde entier, pour éprouver les habitants de la terre.</span>",
    "<span class=\"word\">Je viens bientôt. Retiens ce que tu as, afin que personne ne prenne ta couronne.</span>",
    "<span class=\"word\">Celui qui vaincra, je ferai de lui une colonne dans le temple de mon Dieu, et il n'en sortira plus; j'écrirai sur lui le nom de mon Dieu, et le nom de la ville de mon Dieu, de la nouvelle Jérusalem qui descend du ciel d'auprès de mon Dieu, et mon nom nouveau.</span>",
    "<span class=\"word\"> Que celui qui a des oreilles entende ce que l'Esprit dit aux Églises!</span>",
    "<span class=\"word\">Écris à l'ange de l'Église de Laodicée: Voici ce que dit l'Amen, le témoin fidèle et véritable, le commencement de la création de Dieu:</span>",
    "<span class=\"word\">Je connais tes oeuvres. Je sais que tu n'es ni froid ni bouillant. Puisses-tu être froid ou bouillant!</span>",
    "<span class=\"word\">Ainsi, parce que tu es tiède, et que tu n'es ni froid ni bouillant, je te vomirai de ma bouche.</span>",
    "<span class=\"word\">Parce que tu dis: Je suis riche, je me suis enrichi, et je n'ai besoin de rien, et parce que tu ne sais pas que tu es malheureux, misérable, pauvre, aveugle et nu,</span>",
    "<span class=\"word\">je te conseille d'acheter de moi de l'or éprouvé par le feu, afin que tu deviennes riche, et des vêtements blancs, afin que tu sois vêtu et que la honte de ta nudité ne paraisse pas, et un collyre pour oindre tes yeux, afin que tu voies.</span>",
    "<span class=\"word\">Moi, je reprends et je châtie tous ceux que j'aime. Aie donc du zèle, et repens-toi.</span>",
    "<span class=\"word\">Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui, je souperai avec lui, et lui avec moi.</span>",
    "<span class=\"word\">Celui qui vaincra, je le ferai asseoir avec moi sur mon trône, comme moi j'ai vaincu et me suis assis avec mon Père sur son trône.</span>",
    "<span class=\"word\">Que celui qui a des oreilles entende ce que l'Esprit dit aux Églises!</span>",
  ],

  [ // 4
    "Après cela, je regardai, et voici, une porte était ouverte dans le ciel. La première voix que j'avais entendue, comme le son d'une trompette, et qui me parlait, dit: Monte ici, et je te ferai voir ce qui doit arriver dans la suite.",
    "Aussitôt je fus ravi en esprit. Et voici, il y avait un trône dans le ciel, et sur ce trône quelqu'un était assis.",
    "Celui qui était assis avait l'aspect d'une pierre de jaspe et de sardoine; et le trône était environné d'un arc-en-ciel semblable à de l'émeraude.",
    "Autour du trône je vis vingt-quatre trônes, et sur ces trônes vingt-quatre vieillards assis, revêtus de vêtements blancs, et sur leurs têtes des couronnes d'or.",
    "Du trône sortent des éclairs, des voix et des tonnerres. Devant le trône brûlent sept lampes ardentes, qui sont les sept esprits de Dieu.",
    "Il y a encore devant le trône comme une mer de verre, semblable à du cristal. Au milieu du trône et autour du trône, il y a quatre êtres vivants remplis d'yeux devant et derrière.",
    "Le premier être vivant est semblable à un lion, le second être vivant est semblable à un veau, le troisième être vivant a la face d'un homme, et le quatrième être vivant est semblable à un aigle qui vole.",
    "Les quatre êtres vivants ont chacun six ailes, et ils sont remplis d'yeux tout autour et au dedans. Ils ne cessent de dire jour et nuit: Saint, saint, saint est le Seigneur Dieu, le Tout Puisant, qui était, qui est, et qui vient!",
    "Quand les êtres vivants rendent gloire et honneur et actions de grâces à celui qui est assis sur le trône, à celui qui vit aux siècles des siècles,",
    "les vingt-quatre vieillards se prosternent devant celui qui est assis sur le trône et ils adorent celui qui vit aux siècles des siècles, et ils jettent leurs couronnes devant le trône, en disant:",
    "Tu es digne, notre Seigneur et notre Dieu, de recevoir la gloire et l'honneur et la puissance; car tu as créé toutes choses, et c'est par ta volonté qu'elles existent et qu'elles ont été créées.",
  ],

  [ // 5
    "Puis je vis dans la main droite de celui qui était assis sur le trône un livre écrit en dedans et en dehors, scellé de sept sceaux.",
    "Et je vis un ange puissant, qui criait d'une voix forte: Qui est digne d'ouvrir le livre, et d'en rompre les sceaux?",
    "Et personne dans le ciel, ni sur la terre, ni sous la terre, ne put ouvrir le livre ni le regarder.",
    "Et je pleurai beaucoup de ce que personne ne fut trouvé digne d'ouvrir le livre ni de le regarder.",
    "Et l'un des vieillards me dit: Ne pleure point; voici, le lion de la tribu de Juda, le rejeton de David, a vaincu pour ouvrir le livre et ses sept sceaux.",
    "Et je vis, au milieu du trône et des quatre êtres vivants et au milieu des vieillards, un agneau qui était là comme immolé. Il avait sept cornes et sept yeux, qui sont les sept esprits de Dieu envoyés par toute la terre.",
    "Il vint, et il prit le livre de la main droite de celui qui était assis sur le trône.",
    "Quand il eut pris le livre, les quatre êtres vivants et les vingt-quatre vieillards se prosternèrent devant l'agneau, tenant chacun une harpe et des coupes d'or remplies de parfums, qui sont les prières des saints.",
    "Et ils chantaient un cantique nouveau, en disant: Tu es digne de prendre le livre, et d'en ouvrir les sceaux; car tu as été immolé, et tu as racheté pour Dieu par ton sang des hommes de toute tribu, de toute langue, de tout peuple, et de toute nation;",
    "tu as fait d'eux un royaume et des sacrificateurs pour notre Dieu, et ils régneront sur la terre.",
    "Je regardai, et j'entendis la voix de beaucoup d'anges autour du trône et des êtres vivants et des vieillards, et leur nombre était des myriades de myriades et des milliers de milliers.",
    "Ils disaient d'une voix forte: L'agneau qui a été immolé est digne de recevoir la puissance, la richesse, la sagesse, la force, l'honneur, la gloire, et la louange.",
    "Et toutes les créatures qui sont dans le ciel, sur la terre, sous la terre, sur la mer, et tout ce qui s'y trouve, je les entendis qui disaient: A celui qui est assis sur le trône, et à l'agneau, soient la louange, l'honneur, la gloire, et la force, aux siècles des siècles!",
    "Et les quatre êtres vivants disaient: Amen! Et les vieillards se prosternèrent et adorèrent.",
  ],

  [ // 6
    "Je regardai, quand l'agneau ouvrit un des sept sceaux, et j'entendis l'un des quatre êtres vivants qui disait comme d'une voix de tonnerre: Viens.",
    "Je regardai, et voici, parut un cheval blanc. Celui qui le montait avait un arc; une couronne lui fut donnée, et il partit en vainqueur et pour vaincre.",
    "Quand il ouvrit le second sceau, j'entendis le second être vivant qui disait: Viens.",
    "Et il sortit un autre cheval, roux. Celui qui le montait reçut le pouvoir d'enlever la paix de la terre, afin que les hommes s'égorgeassent les uns les autres; et une grande épée lui fut donnée.",
    "Quand il ouvrit le troisième sceau, j'entendis le troisième être vivant qui disait: Viens. Je regardai, et voici, parut un cheval noir. Celui qui le montait tenait une balance dans sa main.",
    "Et j'entendis au milieu des quatre êtres vivants une voix qui disait: Une mesure de blé pour un denier, et trois mesures d'orge pour un denier; mais ne fais point de mal à l'huile et au vin.",
    "Quand il ouvrit le quatrième sceau, j'entendis la voix du quatrième être vivant qui disait: Viens.",
    "Je regardai, et voici, parut un cheval d'une couleur pâle. Celui qui le montait se nommait la mort, et le séjour des morts l'accompagnait. Le pouvoir leur fut donné sur le quart de la terre, pour faire périr les hommes par l'épée, par la famine, par la mortalité, et par les bêtes sauvages de la terre.",
    "Quand il ouvrit le cinquième sceau, je vis sous l'autel les âmes de ceux qui avaient été immolés à cause de la parole de Dieu et à cause du témoignage qu'ils avaient rendu.",
    "Ils crièrent d'une voix forte, en disant: Jusques à quand, Maître saint et véritable, tarde-tu à juger, et à tirer vengeance de notre sang sur les habitants de la terre?",
    "Une robe blanche fut donnée à chacun d'eux; et il leur fut dit de se tenir en repos quelque temps encore, jusqu'à ce que fût complet le nombre de leurs compagnons de service et de leurs frères qui devaient être mis à mort comme eux.",
    "Je regardai, quand il ouvrit le sixième sceau; et il y eut un grand tremblement de terre, le soleil devint noir comme un sac de crin, la lune entière devint comme du sang,",
    "et les étoiles du ciel tombèrent sur la terre, comme lorsqu'un figuier secoué par un vent violent jette ses figues vertes.",
    "Le ciel se retira comme un livre qu'on roule; et toutes les montagnes et les îles furent remuées de leurs places.",
    "Les rois de la terre, les grands, les chefs militaires, les riches, les puissants, tous les esclaves et les hommes libres, se cachèrent dans les cavernes et dans les rochers des montagnes.",
    "Et ils disaient aux montagnes et aux rochers: Tombez sur nous, et cachez-nous devant la face de celui qui est assis sur le trône, et devant la colère de l'agneau;",
    "car le grand jour de sa colère est venu, et qui peut subsister?",
  ],

  [ // 7
    "Après cela, je vis quatre anges debout aux quatre coins de la terre; ils retenaient les quatre vents de la terre, afin qu'il ne soufflât point de vent sur la terre, ni sur la mer, ni sur aucun arbre.",
    "Et je vis un autre ange, qui montait du côté du soleil levant, et qui tenait le sceau du Dieu vivant; il cria d'une voix forte aux quatre anges à qui il avait été donné de faire du mal à la terre et à la mer, et il dit:",
    "Ne faites point de mal à la terre, ni à la mer, ni aux arbres, jusqu'à ce que nous ayons marqué du sceau le front des serviteurs de notre Dieu.",
    "Et j'entendis le nombre de ceux qui avaient été marqués du sceau, cent quarante-quatre mille, de toutes les tribus des fils d'Israël:",
    "de la tribu de Juda, douze mille marqués du sceau; de la tribu de Ruben, douze mille; de la tribu de Gad, douze mille;",
    "de la tribu d'Aser, douze mille; de la tribu de Nephthali, douze mille; de la tribu de Manassé, douze mille;",
    "de la tribu de Siméon, douze mille; de la tribu de Lévi, douze mille; de la tribu d'Issacar, douze mille;",
    "de la tribu de Zabulon, douze mille; de la tribu de Joseph, douze mille; de la tribu de Benjamin, douze mille marqués du sceau.",
    "Après cela, je regardai, et voici, il y avait une grande foule, que personne ne pouvait compter, de toute nation, de toute tribu, de tout peuple, et de toute langue. Ils se tenaient devant le trône et devant l'agneau, revêtus de robes blanches, et des palmes dans leurs mains.",
    "Et ils criaient d'une voix forte, en disant: Le salut est à notre Dieu qui est assis sur le trône, et à l'agneau.",
    "Et tous les anges se tenaient autour du trône et des vieillards et des quatre êtres vivants; et ils se prosternèrent sur leur face devant le trône, et ils adorèrent Dieu,",
    "en disant: Amen! La louange, la gloire, la sagesse, l'action de grâces, l'honneur, la puissance, et la force, soient à notre Dieu, aux siècles des siècles! Amen!",
    "Et l'un des vieillards prit la parole et me dit: Ceux qui sont revêtus de robes blanches, qui sont-ils, et d'où sont-ils venus?",
    "Je lui dis: Mon seigneur, tu le sais. Et il me dit: Ce sont ceux qui viennent de la grande tribulation; ils ont lavé leurs robes, et ils les ont blanchies dans le sang de l'agneau.",
    "C'est pour cela qu'ils sont devant le trône de Dieu, et le servent jour et nuit dans son temple. Celui qui est assis sur le trône dressera sa tente sur eux;",
    "ils n'auront plus faim, ils n'auront plus soif, et le soleil ne les frappera point, ni aucune chaleur.",
    "Car l'agneau qui est au milieu du trône les paîtra et les conduira aux sources des eaux de la vie, et Dieu essuiera toute larme de leurs yeux.",
  ],

  [ // 8
    "Quand il ouvrit le septième sceau, il y eut dans le ciel un silence d'environ une demi-heure.",
    "Et je vis les sept anges qui se tiennent devant Dieu, et sept trompettes leur furent données.",
    "Et un autre ange vint, et il se tint sur l'autel, ayant un encensoir d'or; on lui donna beaucoup de parfums, afin qu'il les offrît, avec les prières de tous les saints, sur l'autel d'or qui est devant le trône.",
    "La fumée des parfums monta, avec les prières des saints, de la main de l'ange devant Dieu.",
    "Et l'ange prit l'encensoir, le remplit du feu de l'autel, et le jeta sur la terre. Et il y eut des voix, des tonnerres, des éclairs, et un tremblement de terre.",
    "Et les sept anges qui avaient les sept trompettes se préparèrent à en sonner.",
    "Le premier sonna de la trompette. Et il y eut de la grêle et du feu mêlés de sang, qui furent jetés sur la terre; et le tiers de la terre fut brûlé, et le tiers des arbres fut brûlé, et toute herbe verte fut brûlée.",
    "Le second ange sonna de la trompette. Et quelque chose comme une grande montagne embrasée par le feu fut jeté dans la mer; et le tiers de la mer devint du sang,",
    "et le tiers des créatures qui étaient dans la mer et qui avaient vie mourut, et le tiers des navires périt.",
    "Le troisième ange sonna de la trompette. Et il tomba du ciel une grande étoile ardente comme un flambeau; et elle tomba sur le tiers des fleuves et sur les sources des eaux.",
    "Le nom de cette étoile est Absinthe; et le tiers des eaux fut changé en absinthe, et beaucoup d'hommes moururent par les eaux, parce qu'elles étaient devenues amères.",
    "Le quatrième ange sonna de la trompette. Et le tiers du soleil fut frappé, et le tiers de la lune, et le tiers des étoiles, afin que le tiers en fût obscurci, et que le jour perdît un tiers de sa clarté, et la nuit de même.",
    "Je regardai, et j'entendis un aigle qui volait au milieu du ciel, disant d'une voix forte: Malheur, malheur, malheur aux habitants de la terre, à cause des autres sons de la trompette des trois anges qui vont sonner!",
  ],

  [ // 9
    "Le cinquième ange sonna de la trompette. Et je vis une étoile qui était tombée du ciel sur la terre. La clef du puits de l'abîme lui fut donnée,",
    "et elle ouvrit le puits de l'abîme. Et il monta du puits une fumée, comme la fumée d'une grande fournaise; et le soleil et l'air furent obscurcis par la fumée du puits.",
    "De la fumée sortirent des sauterelles, qui se répandirent sur la terre; et il leur fut donné un pouvoir comme le pouvoir qu'ont les scorpions de la terre.",
    "Il leur fut dit de ne point faire de mal à l'herbe de la terre, ni à aucune verdure, ni à aucun arbre, mais seulement aux hommes qui n'avaient pas le sceau de Dieu sur le front.",
    "Il leur fut donné, non de les tuer, mais de les tourmenter pendant cinq mois; et le tourment qu'elles causaient était comme le tourment que cause le scorpion, quand il pique un homme.",
    "En ces jours-là, les hommes chercheront la mort, et ils ne la trouveront pas; ils désireront mourir, et la mort fuira loin d'eux.",
    "Ces sauterelles ressemblaient à des chevaux préparés pour le combat; il y avait sur leurs têtes comme des couronnes semblables à de l'or, et leurs visages étaient comme des visages d'hommes.",
    "Elles avaient des cheveux comme des cheveux de femmes, et leurs dents étaient comme des dents de lions.",
    "Elles avaient des cuirasses comme des cuirasses de fer, et le bruit de leurs ailes était comme un bruit de chars à plusieurs chevaux qui courent au combat.",
    "Elles avaient des queues semblables à des scorpions et des aiguillons, et c'est dans leurs queues qu'était le pouvoir de faire du mal aux hommes pendant cinq mois.",
    "Elles avaient sur elles comme roi l'ange de l'abîme, nommé en hébreu Abaddon, et en grec Apollyon.",
    "Le premier malheur est passé. Voici il vient encore deux malheurs après cela.",
    "Le sixième ange sonna de la trompette. Et j'entendis une voix venant des quatre cornes de l'autel d'or qui est devant Dieu,",
    "et disant au sixième ange qui avait la trompette: Délie les quatre anges qui sont liés sur le grand fleuve d'Euphrate.",
    "Et les quatre anges qui étaient prêts pour l'heure, le jour, le mois et l'année, furent déliés afin qu'ils tuassent le tiers des hommes.",
    "Le nombre des cavaliers de l'armée était de deux myriades de myriades: j'en entendis le nombre.",
    "Et ainsi je vis les chevaux dans la vision, et ceux qui les montaient, ayant des cuirasses couleur de feu, d'hyacinthe, et de soufre. Les têtes des chevaux étaient comme des têtes de lions; et de leurs bouches il sortait du feu, de la fumée, et du soufre.",
    "Le tiers des hommes fut tué par ces trois fléaux, par le feu, par la fumée, et par le soufre, qui sortaient de leurs bouches.",
    "Car le pouvoir des chevaux était dans leurs bouches et dans leurs queues; leurs queues étaient semblables à des serpents ayant des têtes, et c'est avec elles qu'ils faisaient du mal.",
    "Les autres hommes qui ne furent pas tués par ces fléaux ne se repentirent pas des oeuvres de leurs mains, de manière à ne point adorer les démons, et les idoles d'or, d'argent, d'airain, de pierre et de bois, qui ne peuvent ni voir, ni entendre, ni marcher;",
    "et ils ne se repentirent pas de leurs meurtres, ni de leurs enchantements, ni de leur impudicité ni de leurs vols.",
  ],

  [ // 10
    "Je vis un autre ange puissant, qui descendait du ciel, enveloppé d'une nuée; au-dessus de sa tête était l'arc-en-ciel, et son visage était comme le soleil, et ses pieds comme des colonnes de feu.",
    "Il tenait dans sa main un petit livre ouvert. Il posa son pied droit sur la mer, et son pied gauche sur la terre;",
    "et il cria d'une voix forte, comme rugit un lion. Quand il cria, les sept tonnerres firent entendre leurs voix.",
    "Et quand les sept tonnerres eurent fait entendre leurs voix, j'allais écrire; et j'entendis du ciel une voix qui disait: Scelle ce qu'ont dit les sept tonnerres, et ne l'écris pas.",
    "Et l'ange, que je voyais debout sur la mer et sur la terre, leva sa main droite vers le ciel,",
    "et jura par celui qui vit aux siècles des siècles, qui a créé le ciel et les choses qui y sont, la terre et les choses qui y sont, et la mer et les choses qui y sont, qu'il n'y aurait plus de temps,",
    "mais qu'aux jours de la voix du septième ange, quand il sonnerait de la trompette, le mystère de Dieu s'accomplirait, comme il l'a annoncé à ses serviteurs, les prophètes.",
    "Et la voix, que j'avais entendue du ciel, me parla de nouveau, et dit: Va, prends le petit livre ouvert dans la main de l'ange qui se tient debout sur la mer et sur la terre.",
    "Et j'allai vers l'ange, en lui disant de me donner le petit livre. Et il me dit: Prends-le, et avale-le; il sera amer à tes entrailles, mais dans ta bouche il sera doux comme du miel.",
    "Je pris le petit livre de la main de l'ange, et je l'avalai; il fut dans ma bouche doux comme du miel, mais quand je l'eus avalé, mes entrailles furent remplies d'amertume.",
    "Puis on me dit: Il faut que tu prophétises de nouveau sur beaucoup de peuples, de nations, de langues, et de rois.",
  ],

  [ // 11
    "On me donna un roseau semblable à une verge, en disant: Lève-toi, et mesure le temple de Dieu, l'autel, et ceux qui y adorent.",
    "Mais le parvis extérieur du temple, laisse-le en dehors, et ne le mesure pas; car il a été donné aux nations, et elles fouleront aux pieds la ville sainte pendant quarante-deux mois.",
    "Je donnerai à mes deux témoins le pouvoir de prophétiser, revêtus de sacs, pendant mille deux cent soixante jours.",
    "Ce sont les deux oliviers et les deux chandeliers qui se tiennent devant le Seigneur de la terre.",
    "Si quelqu'un veut leur faire du mal, du feu sort de leur bouche et dévore leurs ennemis; et si quelqu'un veut leur faire du mal, il faut qu'il soit tué de cette manière.",
    "Ils ont le pouvoir de fermer le ciel, afin qu'il ne tombe point de pluie pendant les jours de leur prophétie; et ils ont le pouvoir de changer les eaux en sang, et de frapper la terre de toute espèce de plaie, chaque fois qu'ils le voudront.",
    "Quand ils auront achevé leur témoignage, la bête qui monte de l'abîme leur fera la guerre, les vaincra, et les tuera.",
    "Et leurs cadavres seront sur la place de la grande ville, qui est appelée, dans un sens spirituel, Sodome et Égypte, là même où leur Seigneur a été crucifié.",
    "Des hommes d'entre les peuples, les tribus, les langues, et les nations, verront leurs cadavres pendant trois jours et demi, et ils ne permettront pas que leurs cadavres soient mis dans un sépulcre.",
    "Et à cause d'eux les habitants de la terre se réjouiront et seront dans l'allégresse, et ils s'enverront des présents les uns aux autres, parce que ces deux prophètes ont tourmenté les habitants de la terre.",
    "Après les trois jours et demi, un esprit de vie, venant de Dieu, entra en eux, et ils se tinrent sur leurs pieds; et une grande crainte s'empara de ceux qui les voyaient.",
    "Et ils entendirent du ciel une voix qui leur disait: Montez ici! Et ils montèrent au ciel dans la nuée; et leurs ennemis les virent.",
    "A cette heure-là, il y eut un grand tremblement de terre, et la dixième partie de la ville, tomba; sept mille hommes furent tués dans ce tremblement de terre, et les autres furent effrayés et donnèrent gloire au Dieu du ciel.",
    "Le second malheur est passé. Voici, le troisième malheur vient bientôt.",
    "Le septième ange sonna de la trompette. Et il y eut dans le ciel de fortes voix qui disaient: Le royaume du monde est remis à notre Seigneur et à son Christ; et il régnera aux siècles des siècles.",
    "Et les vingt-quatre vieillards, qui étaient assis devant Dieu sur leurs trônes, se prosternèrent sur leurs faces, et ils adorèrent Dieu,",
    "en disant: Nous te rendons grâces, Seigneur Dieu tout puissant, qui es, et qui étais, de ce que car tu as saisi ta grande puissance et pris possession de ton règne.",
    "Les nations se sont irritées; et ta colère est venue, et le temps est venu de juger les morts, de récompenser tes serviteurs les prophètes, les saints et ceux qui craignent ton nom, les petits et les grands, et de détruire ceux qui détruisent la terre.",
    "Et le temple de Dieu dans le ciel fut ouvert, et l'arche de son alliance apparut dans son temple. Et il y eut des éclairs, des voix, des tonnerres, un tremblement de terre, et une forte grêle.",
  ],

  [ // 12
    "Un grand signe parut dans le ciel: une femme enveloppée du soleil, la lune sous ses pieds, et une couronne de douze étoiles sur sa tête.",
    "Elle était enceinte, et elle criait, étant en travail et dans les douleurs de l'enfantement.",
    "Un autre signe parut encore dans le ciel; et voici, c'était un grand dragon rouge, ayant sept têtes et dix cornes, et sur ses têtes sept diadèmes.",
    "Sa queue entraînait le tiers des étoiles du ciel, et les jetait sur la terre. Le dragon se tint devant la femme qui allait enfanter, afin de dévorer son enfant, lorsqu'elle aurait enfanté.",
    "Elle enfanta un fils, qui doit paître toutes les nations avec une verge de fer. Et son enfant fut enlevé vers Dieu et vers son trône.",
    "Et la femme s'enfuit dans le désert, où elle avait un lieu préparé par Dieu, afin qu'elle y fût nourrie pendant mille deux cent soixante jours.",
    "Et il y eut guerre dans le ciel. Michel et ses anges combattirent contre le dragon. Et le dragon et ses anges combattirent,",
    "mais ils ne furent pas les plus forts, et leur place ne fut plus trouvée dans le ciel.",
    "Et il fut précipité, le grand dragon, le serpent ancien, appelé le diable et Satan, celui qui séduit toute la terre, il fut précipité sur la terre, et ses anges furent précipités avec lui.",
    "Et j'entendis dans le ciel une voix forte qui disait: Maintenant le salut est arrivé, et la puissance, et le règne de notre Dieu, et l'autorité de son Christ; car il a été précipité, l'accusateur de nos frères, celui qui les accusait devant notre Dieu jour et nuit.",
    "Ils l'ont vaincu à cause du sang de l'agneau et à cause de la parole de leur témoignage, et ils n'ont pas aimé leur vie jusqu'à craindre la mort.",
    "C'est pourquoi réjouissez-vous, cieux, et vous qui habitez dans les cieux. Malheur à la terre et à la mer! car le diable est descendu vers vous, animé d'une grande colère, sachant qu'il a peu de temps.",
    "Quand le dragon vit qu'il avait été précipité sur la terre, il poursuivit la femme qui avait enfanté l'enfant mâle.",
    "Et les deux ailes du grand aigle furent données à la femme, afin qu'elle s'envolât au désert, vers son lieu, où elle est nourrie un temps, des temps, et la moitié d'un temps, loin de la face du serpent.",
    "Et, de sa bouche, le serpent lança de l'eau comme un fleuve derrière la femme, afin de l'entraîner par le fleuve.",
    "Et la terre secourut la femme, et la terre ouvrit sa bouche et engloutit le fleuve que le dragon avait lancé de sa bouche.",
    "Et le dragon fut irrité contre la femme, et il s'en alla faire la guerre au restes de sa postérité, à ceux qui gardent les commandements de Dieu et qui ont le témoignage de Jésus.",
  ],

  [ // 13
    "Et il se tint sur le sable de la mer. Puis je vis monter de la mer une bête qui avait dix cornes et sept têtes, et sur ses cornes dix diadèmes, et sur ses têtes des noms de blasphème.",
    "La bête que je vis était semblable à un léopard; ses pieds étaient comme ceux d'un ours, et sa gueule comme une gueule de lion. Le dragon lui donna sa puissance, et son trône, et une grande autorité.",
    "Et je vis l'une de ses têtes comme blessée à mort; mais sa blessure mortelle fut guérie. Et toute la terre était dans l'admiration derrière la bête.",
    "Et ils adorèrent le dragon, parce qu'il avait donné l'autorité à la bête; ils adorèrent la bête, en disant: Qui est semblable à la bête, et qui peut combattre contre elle?",
    "Et il lui fut donné une bouche qui proférait des paroles arrogantes et des blasphèmes; et il lui fut donné le pouvoir d'agir pendant quarante-deux mois.",
    "Et elle ouvrit sa bouche pour proférer des blasphèmes contre Dieu, pour blasphémer son nom, et son tabernacle, et ceux qui habitent dans le ciel.",
    "Et il lui fut donné de faire la guerre aux saints, et de les vaincre. Et il lui fut donné autorité sur toute tribu, tout peuple, toute langue, et toute nation.",
    "Et tous les habitants de la terre l'adoreront, ceux dont le nom n'a pas été écrit dès la fondation du monde dans le livre de vie de l'agneau qui a été immolé.",
    "Si quelqu'un a des oreilles, qu'il entende!",
    "Si quelqu'un mène en captivité, il ira en captivité; si quelqu'un tue par l'épée, il faut qu'il soit tué par l'épée. C'est ici la persévérance et la foi des saints.",
    "Puis je vis monter de la terre une autre bête, qui avait deux cornes semblables à celles d'un agneau, et qui parlait comme un dragon.",
    "Elle exerçait toute l'autorité de la première bête en sa présence, et elle faisait que la terre et ses habitants adoraient la première bête, dont la blessure mortelle avait été guérie.",
    "Elle opérait de grands prodiges, même jusqu'à faire descendre du feu du ciel sur la terre, à la vue des hommes.",
    "Et elle séduisait les habitants de la terre par les prodiges qu'il lui était donné d'opérer en présence de la bête, disant aux habitants de la terre de faire une image à la bête qui avait la blessure de l'épée et qui vivait.",
    "Et il lui fut donné d'animer l'image de la bête, afin que l'image de la bête parlât, et qu'elle fît que tous ceux qui n'adoreraient pas l'image de la bête fussent tués.",
    "Et elle fit que tous, petits et grands, riches et pauvres, libres et esclaves, reçussent une marque sur leur main droite ou sur leur front,",
    "et que personne ne pût acheter ni vendre, sans avoir la marque, le nom de la bête ou le nombre de son nom.",
    "C'est ici la sagesse. Que celui qui a de l'intelligence calcule le nombre de la bête. Car c'est un nombre d'homme, et son nombre est six cent soixante-six.",
  ],

  [ // 14
    "Je regardai, et voici, l'agneau se tenait sur la montagne de Sion, et avec lui cent quarante-quatre mille personnes, qui avaient son nom et le nom de son Père écrits sur leurs fronts.",
    "Et j'entendis du ciel une voix, comme un bruit de grosses eaux, comme le bruit d'un grand tonnerre; et la voix que j'entendis était comme celle de joueurs de harpes jouant de leurs harpes.",
    "Et ils chantaient un cantique nouveau devant le trône, et devant les quatre êtres vivants et les vieillards. Et personne ne pouvait apprendre le cantique, si ce n'est les cent quarante-quatre mille, qui avaient été rachetés de la terre.",
    "Ce sont ceux qui ne se sont pas souillés avec des femmes, car ils sont vierges; ils suivent l'agneau partout où il va. Ils ont été rachetés d'entre les hommes, comme des prémices pour Dieu et pour l'agneau;",
    "et dans leur bouche il ne s'est point trouvé de mensonge, car ils sont irrépréhensibles.",
    "Je vis un autre ange qui volait par le milieu du ciel, ayant un Évangile éternel, pour l'annoncer aux habitants de la terre, à toute nation, à toute tribu, à toute langue, et à tout peuple.",
    "Il disait d'une voix forte: Craignez Dieu, et donnez-lui gloire, car l'heure de son jugement est venue; et adorez celui qui a fait le ciel, et la terre, et la mer, et les sources d'eaux.",
    "Et un autre, un second ange suivit, en disant: Elle est tombée, elle est tombée, Babylone la grande, qui a abreuvé toutes les nations du vin de la fureur de son impudicité!",
    "Et un autre, un troisième ange les suivit, en disant d'une voix forte: Si quelqu'un adore la bête et son image, et reçoit une marque sur son front ou sur sa main,",
    "il boira, lui aussi, du vin de la fureur de Dieu, versé sans mélange dans la coupe de sa colère, et il sera tourmenté dans le feu et le soufre, devant les saints anges et devant l'agneau.",
    "Et la fumée de leur tourment monte aux siècles des siècles; et ils n'ont de repos ni jour ni nuit, ceux qui adorent la bête et son image, et quiconque reçoit la marque de son nom.",
    "C'est ici la persévérance des saints, qui gardent les commandements de Dieu et la foi de Jésus.",
    "Et j'entendis du ciel une voix qui disait: Écris: Heureux dès à présent les morts qui meurent dans le Seigneur! Oui, dit l'Esprit, afin qu'ils se reposent de leurs travaux, car leurs oeuvres les suivent.",
    "Je regardai, et voici, il y avait une nuée blanche, et sur la nuée était assis quelqu'un qui ressemblait à un fils d'homme, ayant sur sa tête une couronne d'or, et dans sa main une faucille tranchante.",
    "Et un autre ange sortit du temple, criant d'une voix forte à celui qui était assis sur la nuée: Lance ta faucille, et moissonne; car l'heure de moissonner est venue, car la moisson de la terre est mûre.",
    "Et celui qui était assis sur la nuée jeta sa faucille sur la terre. Et la terre fut moissonnée.",
    "Et un autre ange sortit du temple qui est dans le ciel, ayant, lui aussi, une faucille tranchante.",
    "Et un autre ange, qui avait autorité sur le feu, sortit de l'autel, et s'adressa d'une voix forte à celui qui avait la faucille tranchante, disant: Lance ta faucille tranchante, et vendange les grappes de la vigne de la terre; car les raisins de la terre sont mûrs.",
    "Et l'ange jeta sa faucille sur la terre. Et il vendangea la vigne de la terre, et jeta la vendange dans la grande cuve de la colère de Dieu.",
    "Et la cuve fut foulée hors de la ville; et du sang sortit de la cuve, jusqu'aux mors des chevaux, sur une étendue de mille six cents stades.",
  ],

  [ // 15
    "Puis je vis dans le ciel un autre signe, grand et admirable: sept anges, qui tenaient sept fléaux, les derniers, car par eux s'accomplit la colère de Dieu.",
    "Et je vis comme une mer de verre, mêlée de feu, et ceux qui avaient vaincu la bête, et son image, et le nombre de son nom, debout sur la mer de verre, ayant des harpes de Dieu.",
    "Et ils chantent le cantique de Moïse, le serviteur de Dieu, et le cantique de l'agneau, en disant: Tes oeuvres sont grandes et admirables, Seigneur Dieu tout puissant! Tes voies sont justes et véritables, roi des nations!",
    "Qui ne craindrait, Seigneur, et ne glorifierait ton nom? Car seul tu es saint. Et toutes les nations viendront, et se prosterneront devant toi, parce que tes jugements ont été manifestés.",
    "Après cela, je regardai, et le temple du tabernacle du témoignage fut ouvert dans le ciel.",
    "Et les sept anges qui tenaient les sept fléaux sortirent du temple, revêtus d'un lin pur, éclatant, et ayant des ceintures d'or autour de la poitrine.",
    "Et l'un des quatre êtres vivants donna aux sept anges sept coupes d'or, pleines de la colère du Dieu qui vit aux siècles des siècles.",
    "Et le temple fut rempli de fumée, à cause de la gloire de Dieu et de sa puissance; et personne ne pouvait entrer dans le temple, jusqu'à ce que les sept fléaux des sept anges fussent accomplis.",
  ],

  [ // 16
    "Et j'entendis une voix forte qui venait du temple, et qui disait aux sept anges: Allez, et versez sur la terre les sept coupes de la colère de Dieu.",
    "Le premier alla, et il versa sa coupe sur la terre. Et un ulcère malin et douloureux frappa les hommes qui avaient la marque de la bête et qui adoraient son image.",
    "Le second versa sa coupe dans la mer. Et elle devint du sang, comme celui d'un mort; et tout être vivant mourut, tout ce qui était dans la mer.",
    "Le troisième versa sa coupe dans les fleuves et dans les sources d'eaux. Et ils devinrent du sang.",
    "Et j'entendis l'ange des eaux qui disait: Tu es juste, toi qui es, et qui étais; tu es saint, parce que tu as exercé ce jugement.",
    "Car ils ont versé le sang des saints et des prophètes, et tu leur as donné du sang à boire: ils en sont dignes.",
    "Et j'entendis l'autel qui disait: Oui, Seigneur Dieu tout puissant, tes jugements sont véritables et justes.",
    "Le quatrième versa sa coupe sur le soleil. Et il lui fut donné de brûler les hommes par le feu;",
    "et les hommes furent brûlés par une grande chaleur, et ils blasphémèrent le nom du Dieu qui a l'autorité sur ces fléaux, et ils ne se repentirent pas pour lui donner gloire.",
    "Le cinquième versa sa coupe sur le trône de la bête. Et son royaume fut couvert de ténèbres; et les hommes se mordaient la langue de douleur,",
    "et ils blasphémèrent le Dieu du ciel, à cause de leurs douleurs et de leurs ulcères, et ils ne se repentirent pas de leurs oeuvres.",
    "Le sixième versa sa coupe sur le grand fleuve, l'Euphrate. Et son eau tarit, afin que le chemin des rois venant de l'Orient fût préparé.",
    "Et je vis sortir de la bouche du dragon, et de la bouche de la bête, et de la bouche du faux prophète, trois esprits impurs, semblables à des grenouilles.",
    "Car ce sont des esprits de démons, qui font des prodiges, et qui vont vers les rois de toute la terre, afin de les rassembler pour le combat du grand jour du Dieu tout puissant.",
    "<span class=\"word\">Voici, je viens comme un voleur. Heureux celui qui veille, et qui garde ses vêtements, afin qu'il ne marche pas nu et qu'on ne voie pas sa honte!</span> -",
    "Ils les rassemblèrent dans le lieu appelé en hébreu Harmaguédon.",
    "Le septième versa sa coupe dans l'air. Et il sortit du temple, du trône, une voix forte qui disait: C'en est fait!",
    "Et il y eut des éclairs, des voix, des tonnerres, et un grand tremblement de terre, tel qu'il n'y avait jamais eu depuis que l'homme est sur la terre, un aussi grand tremblement.",
    "Et la grande ville fut divisée en trois parties, et les villes des nations tombèrent, et Dieu, se souvint de Babylone la grande, pour lui donner la coupe du vin de son ardente colère.",
    "Et toutes les îles s'enfuirent, et les montagnes ne furent pas retrouvées.",
    "Et une grosse grêle, dont les grêlons pesaient un talent, tomba du ciel sur les hommes; et les hommes blasphémèrent Dieu, à cause du fléau de la grêle, parce que ce fléau était très grand.",
  ],

  [ // 17
    "Puis un des sept anges qui tenaient les sept coupes vint, et il m'adressa la parole, en disant: Viens, je te montrerai le jugement de la grande prostituée qui est assise sur les grandes eaux.",
    "C'est avec elle que les rois de la terre se sont livrés à l'impudicité, et c'est du vin de son impudicité que les habitants de la terre se sont enivrés.",
    "Il me transporta en esprit dans un désert. Et je vis une femme assise sur une bête écarlate, pleine de noms de blasphème, ayant sept têtes et dix cornes.",
    "Cette femme était vêtue de pourpre et d'écarlate, et parée d'or, de pierres précieuses et de perles. Elle tenait dans sa main une coupe d'or, remplie d'abominations et des impuretés de sa prostitution.",
    "Sur son front était écrit un nom, un mystère: Babylone la grande, la mère des impudiques et des abominations de la terre.",
    "Et je vis cette femme ivre du sang des saints et du sang des témoins de Jésus. Et, en la voyant, je fus saisi d'un grand étonnement.",
    "Et l'ange me dit: Pourquoi t'étonnes-tu? Je te dirai le mystère de la femme et de la bête qui la porte, qui a les sept têtes et les dix cornes.",
    "La bête que tu as vue était, et elle n'est plus. Elle doit monter de l'abîme, et aller à la perdition. Et les habitants de la terre, ceux dont le nom n'a pas été écrit dès la fondation du monde dans le livre de vie, s'étonneront en voyant la bête, parce qu'elle était, et qu'elle n'est plus, et qu'elle reparaîtra. -",
    "C'est ici l'intelligence qui a de la sagesse. -Les sept têtes sont sept montagnes, sur lesquelles la femme est assise.",
    "Ce sont aussi sept rois: cinq sont tombés, un existe, l'autre n'est pas encore venu, et quand il sera venu, il doit rester peu de temps.",
    "Et la bête qui était, et qui n'est plus, est elle-même un huitième roi, et elle est du nombre des sept, et elle va à la perdition.",
    "Les dix cornes que tu as vues sont dix rois, qui n'ont pas encore reçu de royaume, mais qui reçoivent autorité comme rois pendant une heure avec la bête.",
    "Ils ont un même dessein, et ils donnent leur puissance et leur autorité à la bête.",
    "Ils combattront contre l'agneau, et l'agneau les vaincra, parce qu'il est le Seigneur des seigneurs et le Roi des rois, et les appelés, les élus et les fidèles qui sont avec lui les vaincront aussi.",
    "Et il me dit: Les eaux que tu as vues, sur lesquelles la prostituée est assise, ce sont des peuples, des foules, des nations, et des langues.",
    "Les dix cornes que tu as vues et la bête haïront la prostituée, la dépouilleront et la mettront à nu, mangeront ses chairs, et la consumeront par le feu.",
    "Car Dieu a mis dans leurs coeurs d'exécuter son dessein et d'exécuter un même dessein, et de donner leur royauté à la bête, jusqu'à ce que les paroles de Dieu soient accomplies.",
    "Et la femme que tu as vue, c'est la grande ville qui a la royauté sur les rois de la terre.",
  ],

  [ // 18
    "Après cela, je vis descendre du ciel un autre ange, qui avait une grande autorité; et la terre fut éclairée de sa gloire.",
    "Il cria d'une voix forte, disant: Elle est tombée, elle est tombée, Babylone la grande! Elle est devenue une habitation de démons, un repaire de tout esprit impur, un repaire de tout oiseau impur et odieux,",
    "parce que toutes les nations ont bu du vin de la fureur de son impudicité, et que les rois de la terre se sont livrés avec elle à l'impudicité, et que les marchands de la terre se sont enrichis par la puissance de son luxe.",
    "Et j'entendis du ciel une autre voix qui disait: Sortez du milieu d'elle, mon peuple, afin que vous ne participiez point à ses péchés, et que vous n'ayez point de part à ses fléaux.",
    "Car ses péchés se sont accumulés jusqu'au ciel, et Dieu s'est souvenu de ses iniquités.",
    "Payez-la comme elle a payé, et rendez-lui au double selon ses oeuvres. Dans la coupe où elle a versé, versez-lui au double.",
    "Autant elle s'est glorifiée et plongée dans le luxe, autant donnez-lui de tourment et de deuil. Parce qu'elle dit en son coeur: Je suis assise en reine, je ne suis point veuve, et je ne verrai point de deuil!",
    "A cause de cela, en un même jour, ses fléaux arriveront, la mort, le deuil et la famine, et elle sera consumée par le feu. Car il est puissant, le Seigneur Dieu qui l'a jugée.",
    "Et tous les rois de la terre, qui se sont livrés avec elle à l'impudicité et au luxe, pleureront et se lamenteront à cause d'elle, quand ils verront la fumée de son embrasement.",
    "Se tenant éloignés, dans la crainte de son tourment, ils diront: Malheur! malheur! La grande ville, Babylone, la ville puissante! En une seule heure est venu ton jugement!",
    "Et les marchands de la terre pleurent et sont dans le deuil à cause d'elle, parce que personne n'achète plus leur cargaison,",
    "cargaison d'or, d'argent, de pierres précieuses, de perles, de fin lin, de pourpre, de soie, d'écarlate, de toute espèce de bois de senteur, de toute espèce d'objets d'ivoire, de toute espèce d'objets en bois très précieux, en airain, en fer et en marbre,",
    "de cinnamome, d'aromates, de parfums, de myrrhe, d'encens, de vin, d'huile, de fine farine, de blé, de boeufs, de brebis, de chevaux, de chars, de corps et d'âmes d'hommes.",
    "Les fruits que désirait ton âme sont allés loin de toi; et toutes les choses délicates et magnifiques sont perdues pour toi, et tu ne les retrouveras plus.",
    "Les marchands de ces choses, qui se sont enrichis par elle, se tiendront éloignés, dans la crainte de son tourment; ils pleureront et seront dans le deuil,",
    "et diront: Malheur! malheur! La grande ville, qui était vêtue de fin lin, de pourpre et d'écarlate, et parée d'or, de pierres précieuses et de perles! En une seule heure tant de richesses ont été détruites!",
    "Et tous les pilotes, tous ceux qui naviguent vers ce lieu, les marins, et tous ceux qui exploitent la mer, se tenaient éloignés,",
    "et ils s'écriaient, en voyant la fumée de son embrasement: Quelle ville était semblable à la grande ville?",
    "Ils jetaient de la poussière sur leurs têtes, ils pleuraient et ils étaient dans le deuil, ils criaient et disaient: Malheur! malheur! La grande ville, où se sont enrichis par son opulence tous ceux qui ont des navires sur la mer, en une seule heure elle a été détruite!",
    "Ciel, réjouis-toi sur elle! Et vous, les saints, les apôtres, et les prophètes, réjouissez-vous aussi! Car Dieu vous a fait justice en la jugeant.",
    "Alors un ange puissant prit une pierre semblable à une grande meule, et il la jeta dans la mer, en disant: Ainsi sera précipitée avec violence Babylone, la grande ville, et elle ne sera plus trouvée.",
    "Et l'on n'entendra plus chez toi les sons des joueurs de harpe, des musiciens, des joueurs de flûte et des joueurs de trompette, on ne trouvera plus chez toi aucun artisan d'un métier quelconque, on n'entendra plus chez toi le bruit de la meule,",
    "la lumière de la lampe ne brillera plus chez toi, et la voix de l'époux et de l'épouse ne sera plus entendue chez toi, parce que tes marchands étaient les grands de la terre, parce que toutes les nations ont été séduites par tes enchantements,",
    "et parce qu'on a trouvé chez elle le sang des prophètes et des saints et de tous ceux qui ont été égorgés sur la terre.",
  ],

  [ // 19
    "Après cela, j'entendis dans le ciel comme une voix forte d'une foule nombreuse qui disait: Alléluia! Le salut, la gloire, et la puissance sont à notre Dieu,",
    "parce que ses jugements sont véritables et justes; car il a jugé la grande prostituée qui corrompait la terre par son impudicité, et il a vengé le sang de ses serviteurs en le redemandant de sa main.",
    "Et ils dirent une seconde fois: Alléluia! ...et sa fumée monte aux siècles des siècles.",
    "Et les vingt-quatre vieillards et les quatre êtres vivants se prosternèrent et adorèrent Dieu assis sur le trône, en disant: Amen! Alléluia!",
    "Et une voix sortit du trône, disant: Louez notre Dieu, vous tous ses serviteurs, vous qui le craignez, petits et grands!",
    "Et j'entendis comme une voix d'une foule nombreuse, comme un bruit de grosses eaux, et comme un bruit de forts tonnerres, disant: Alléluia! Car le Seigneur notre Dieu tout puissant est entré dans son règne.",
    "Réjouissons-nous et soyons dans l'allégresse, et donnons-lui gloire; car les noces de l'agneau sont venues, et son épouse s'est préparée,",
    "et il lui a été donné de se revêtir d'un fin lin, éclatant, pur. Car le fin lin, ce sont les oeuvres justes des saints.",
    "Et l'ange me dit: Écris: Heureux ceux qui sont appelés au festin des noces de l'agneau! Et il me dit: Ces paroles sont les véritables paroles de Dieu.",
    "Et je tombai à ses pieds pour l'adorer; mais il me dit: Garde-toi de le faire! Je suis ton compagnon de service, et celui de tes frères qui ont le témoignage de Jésus. Adore Dieu. -Car le témoignage de Jésus est l'esprit de la prophétie.",
    "Puis je vis le ciel ouvert, et voici, parut un cheval blanc. Celui qui le montait s'appelle Fidèle et Véritable, et il juge et combat avec justice.",
    "Ses yeux étaient comme une flamme de feu; sur sa tête étaient plusieurs diadèmes; il avait un nom écrit, que personne ne connaît, si ce n'est lui-même;",
    "et il était revêtu d'un vêtement teint de sang. Son nom est la Parole de Dieu.",
    "Les armées qui sont dans le ciel le suivaient sur des chevaux blancs, revêtues d'un fin lin, blanc, pur.",
    "De sa bouche sortait une épée aiguë, pour frapper les nations; il les paîtra avec une verge de fer; et il foulera la cuve du vin de l'ardente colère du Dieu tout puissant.",
    "Il avait sur son vêtement et sur sa cuisse un nom écrit: Roi des rois et Seigneur des seigneurs.",
    "Et je vis un ange qui se tenait dans le soleil. Et il cria d'une voix forte, disant à tous les oiseaux qui volaient par le milieu du ciel: Venez, rassemblez-vous pour le grand festin de Dieu,",
    "afin de manger la chair des rois, la chair des chefs militaires, la chair des puissants, la chair des chevaux et de ceux qui les montent, la chair de tous, libres et esclaves, petits et grands.",
    "Et je vis la bête, et les rois de la terre, et leurs armées rassemblés pour faire la guerre à celui qui était assis sur le cheval et à son armée.",
    "Et la bête fut prise, et avec elle le faux prophète, qui avait fait devant elle les prodiges par lesquels il avait séduit ceux qui avaient pris la marque de la bête et adoré son image. Ils furent tous les deux jetés vivants dans l'étang ardent de feu et de soufre.",
    "Et les autres furent tués par l'épée qui sortait de la bouche de celui qui était assis sur le cheval; et tous les oiseaux se rassasièrent de leur chair.",
  ],

  [ // 20
    "Puis je vis descendre du ciel un ange, qui avait la clef de l'abîme et une grande chaîne dans sa main.",
    "Il saisit le dragon, le serpent ancien, qui est le diable et Satan, et il le lia pour mille ans.",
    "Il le jeta dans l'abîme, ferma et scella l'entrée au-dessus de lui, afin qu'il ne séduisît plus les nations, jusqu'à ce que les mille ans fussent accomplis. Après cela, il faut qu'il soit délié pour un peu de temps.",
    "Et je vis des trônes; et à ceux qui s'y assirent fut donné le pouvoir de juger. Et je vis les âmes de ceux qui avaient été décapités à cause du témoignage de Jésus et à cause de la parole de Dieu, et de ceux qui n'avaient pas adoré la bête ni son image, et qui n'avaient pas reçu la marque sur leur front et sur leur main. Ils revinrent à la vie, et ils régnèrent avec Christ pendant mille ans.",
    "Les autres morts ne revinrent point à la vie jusqu'à ce que les mille ans fussent accomplis. C'est la première résurrection.",
    "Heureux et saints ceux qui ont part à la première résurrection! La seconde mort n'a point de pouvoir sur eux; mais ils seront sacrificateurs de Dieu et de Christ, et ils régneront avec lui pendant mille ans.",
    "Quand les mille ans seront accomplis, Satan sera relâché de sa prison.",
    "Et il sortira pour séduire les nations qui sont aux quatre coins de la terre, Gog et Magog, afin de les rassembler pour la guerre; leur nombre est comme le sable de la mer.",
    "Et ils montèrent sur la surface de la terre, et ils investirent le camp des saints et la ville bien-aimée. Mais un feu descendit du ciel, et les dévora.",
    "Et le diable, qui les séduisait, fut jeté dans l'étang de feu et de soufre, où sont la bête et le faux prophète. Et ils seront tourmentés jour et nuit, aux siècles des siècles.",
    "Puis je vis un grand trône blanc, et celui qui était assis dessus. La terre et le ciel s'enfuirent devant sa face, et il ne fut plus trouvé de place pour eux.",
    "Et je vis les morts, les grands et les petits, qui se tenaient devant le trône. Des livres furent ouverts. Et un autre livre fut ouvert, celui qui est le livre de vie. Et les morts furent jugés selon leurs oeuvres, d'après ce qui était écrit dans ces livres.",
    "La mer rendit les morts qui étaient en elle, la mort et le séjour des morts rendirent les morts qui étaient en eux; et chacun fut jugé selon ses oeuvres.",
    "Et la mort et le séjour des morts furent jetés dans l'étang de feu. C'est la seconde mort, l'étang de feu.",
    "Quiconque ne fut pas trouvé écrit dans le livre de vie fut jeté dans l'étang de feu.",
  ],

  [ // 21
    "Puis je vis un nouveau ciel et une nouvelle terre; car le premier ciel et la première terre avaient disparu, et la mer n'était plus.",
    "Et je vis descendre du ciel, d'auprès de Dieu, la ville sainte, la nouvelle Jérusalem, préparée comme une épouse qui s'est parée pour son époux.",
    "Et j'entendis du trône une forte voix qui disait: Voici le tabernacle de Dieu avec les hommes! Il habitera avec eux, et ils seront son peuple, et Dieu lui-même sera avec eux.",
    "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu.",
    "Et celui qui était assis sur le trône dit: Voici, je fais toutes choses nouvelles. Et il dit: Écris; car ces paroles sont certaines et véritables.",
    "Et il me dit: C'est fait! Je suis l'alpha et l'oméga, le commencement et la fin. A celui qui a soif je donnerai de la source de l'eau de la vie, gratuitement.",
    "Celui qui vaincra héritera ces choses; je serai son Dieu, et il sera mon fils.",
    "Mais pour les lâches, les incrédules, les abominables, les meurtriers, les impudiques, les enchanteurs, les idolâtres, et tous les menteurs, leur part sera dans l'étang ardent de feu et de soufre, ce qui est la seconde mort.",
    "Puis un des sept anges qui tenaient les sept coupes remplies des sept derniers fléaux vint, et il m'adressa la parole, en disant: Viens, je te montrerai l'épouse, la femme de l'agneau.",
    "Et il me transporta en esprit sur une grande et haute montagne. Et il me montra la ville sainte, Jérusalem, qui descendait du ciel d'auprès de Dieu, ayant la gloire de Dieu.",
    "Son éclat était semblable à celui d'une pierre très précieuse, d'une pierre de jaspe transparente comme du cristal.",
    "Elle avait une grande et haute muraille. Elle avait douze portes, et sur les portes douze anges, et des noms écrits, ceux des douze tribus des fils d'Israël:",
    "à l'orient trois portes, au nord trois portes, au midi trois portes, et à l'occident trois portes.",
    "La muraille de la ville avait douze fondements, et sur eux les douze noms des douze apôtres de l'agneau.",
    "Celui qui me parlait avait pour mesure un roseau d'or, afin de mesurer la ville, ses portes et sa muraille.",
    "La ville avait la forme d'un carré, et sa longueur était égale à sa largeur. Il mesura la ville avec le roseau, et trouva douze mille stades; la longueur, la largeur et la hauteur en étaient égales.",
    "Il mesura la muraille, et trouva cent quarante-quatre coudées, mesure d'homme, qui était celle de l'ange.",
    "La muraille était construite en jaspe, et la ville était d'or pur, semblable à du verre pur.",
    "Les fondements de la muraille de la ville étaient ornés de pierres précieuses de toute espèce: le premier fondement était de jaspe, le second de saphir, le troisième de calcédoine, le quatrième d'émeraude,",
    "le cinquième de sardonyx, le sixième de sardoine, le septième de chrysolithe, le huitième de béryl, le neuvième de topaze, le dixième de chrysoprase, le onzième d'hyacinthe, le douzième d'améthyste.",
    "Les douze portes étaient douze perles; chaque porte était d'une seule perle. La place de la ville était d'or pur, comme du verre transparent.",
    "Je ne vis point de temple dans la ville; car le Seigneur Dieu tout puissant est son temple, ainsi que l'agneau.",
    "La ville n'a besoin ni du soleil ni de la lune pour l'éclairer; car la gloire de Dieu l'éclaire, et l'agneau est son flambeau.",
    "Les nations marcheront à sa lumière, et les rois de la terre y apporteront leur gloire.",
    "Ses portes ne se fermeront point le jour, car là il n'y aura point de nuit.",
    "On y apportera la gloire et l'honneur des nations.",
    "Il n'entrera chez elle rien de souillé, ni personne qui se livre à l'abomination et au mensonge; il n'entrera que ceux qui sont écrits dans le livre de vie de l'agneau.",
  ],

  [ // 22
    "Et il me montra un fleuve d'eau de la vie, limpide comme du cristal, qui sortait du trône de Dieu et de l'agneau.",
    "Au milieu de la place de la ville et sur les deux bords du fleuve, il y avait un arbre de vie, produisant douze fois des fruits, rendant son fruit chaque mois, et dont les feuilles servaient à la guérison des nations.",
    "Il n'y aura plus d'anathème. Le trône de Dieu et de l'agneau sera dans la ville; ses serviteurs le serviront et verront sa face,",
    "et son nom sera sur leurs fronts.",
    "Il n'y aura plus de nuit; et ils n'auront besoin ni de lampe ni de lumière, parce que le Seigneur Dieu les éclairera. Et ils régneront aux siècles des siècles.",
    "Et il me dit: Ces paroles sont certaines et véritables; et le Seigneur, le Dieu des esprits des prophètes, a envoyé son ange pour montrer à ses serviteurs les choses qui doivent arriver bientôt. -",
    "<span class=\"word\">Et voici, je viens bientôt. -Heureux celui qui garde les paroles de la prophétie de ce livre!</span>",
    "C'est moi Jean, qui ai entendu et vu ces choses. Et quand j'eus entendu et vu, je tombai aux pieds de l'ange qui me les montrait, pour l'adorer.",
    "Mais il me dit: Garde-toi de le faire! Je suis ton compagnon de service, et celui de tes frères les prophètes, et de ceux qui gardent les paroles de ce livre. Adore Dieu.",
    "Et il me dit: Ne scelle point les paroles de la prophétie de ce livre. Car le temps est proche.",
    "Que celui qui est injuste soit encore injuste, que celui qui est souillé se souille encore; et que le juste pratique encore la justice, et que celui qui est saint se sanctifie encore.",
    "<span class=\"word\">Voici, je viens bientôt, et ma rétribution est avec moi, pour rendre à chacun selon ce qu'est son oeuvre.</span>",
    "<span class=\"word\">Je suis l'alpha et l'oméga, le premier et le dernier, le commencement et la fin.</span>",
    "Heureux ceux qui lavent leurs robes, afin d'avoir droit à l'arbre de vie, et d'entrer par les portes dans la ville!",
    "Dehors les chiens, les enchanteurs, les impudiques, les meurtriers, les idolâtres, et quiconque aime et pratique le mensonge!",
    "<span class=\"word\">Moi, Jésus, j'ai envoyé mon ange pour vous attester ces choses dans les Églises. Je suis le rejeton et la postérité de David, l'étoile brillante du matin.</span>",
    "Et l'Esprit et l'épouse disent: Viens. Et que celui qui entend dise: Viens. Et que celui qui a soif vienne; que celui qui veut, prenne de l'eau de la vie, gratuitement.",
    "Je le déclare à quiconque entend les paroles de la prophétie de ce livre: Si quelqu'un y ajoute quelque chose, Dieu le frappera des fléaux décrits dans ce livre;",
    "et si quelqu'un retranche quelque chose des paroles du livre de cette prophétie, Dieu retranchera sa part de l'arbre de la vie et de la ville sainte, décrits dans ce livre.",
    "Celui qui atteste ces choses dit: <span class=\"word\">Oui, je viens bientôt.</span> Amen! Viens, Seigneur Jésus!",
    "Que la grâce du Seigneur Jésus soit avec tous!",
  ],

]; // end of fr


theBook.addedTitles = {
  "1:1":   "Prologue",
  "1:9":   "One Like a Son of Man",
  "2:1":   "To the Church in Ephesus",
  "2:8":   "To the Church in Smyrnas",
  "2:12":  "To the Church in Pergamum",
  "2:18":  "To the Church in Thyatira",
  "3:1":   "To the Church in Sardis",
  "3:7":   "To the Church in Philadelphia",
  "3:14":  "To the Church in Laodicea",
  "4:1":   "The Throne in Heaven",
  "5:1":   "The Scroll and the Lamb",
  "6:1":   "The Seal",
  "7:1":   "144,000 Sealed",
  "8:1":   "The Seventhg Seal and the Golden Censer",
  "8:6":   "The Trumpets",
  "10:1":  "The Angel and the Little Scroll",
  "11:1":  "The Two Witnesses",
  "11:15": "The Seventh Trumpet",
  "12:1":  "The Woman and the Dragon",
  "13:1":  "The Beast out of the Sea",
  "13:11": "The Beast out of the Earth",
  "14:1":  "The Lamb and the 144,000",
  "14:6":  "The Three Angels",
  "14:14": "The Harvest of the Earth",
  "15:1":  "Seven Angels With Seven Plagues",
  "16:1":  "The Seven Bowls of God's Wrath",
  "17:1":  "The Woman on the Beast",
  "18:1":  "The Fall of Babylon",
  "19:1":  "Hallelujah!",
  "19:11": "The Rider on the White Horse",
  "20:1":  "The Thousand Years",
  "20:7":  "Satan's Doom",
  "20:11": "The Dead Are Judged",
  "21:1":  "The New Jerusalem",
  "22:1":  "The River of Life",
  "22:7":  "Jesus Is Coming",
};
