/*
  ==========================================================
  MEMORIAL CONTENT FILE
  Everything about this memorial lives here (tributes are in
  tributes-data.js). Swap these files + photos for a new client.

  Service text format (one string per line):
    "~text"      instruction / rubric (shown in italics)
    "P|text"     Priest / Minister (Alufa)
    "C|text"     People / Congregation (Ijo)
    "#13|text"   numbered verse
    "R|John 3"   scripture reference
    "H|text"     small heading
    plain text   paragraph
  ==========================================================
*/
window.MEMORIAL = {
  person: {
    firstName: "Wesley",
    middleName: "Olajide",
    lastName: "Ojo Aiyegboka",
    fullName: "Wesley Olajide Ojo Aiyegboka",
    shortName: "Pa Wesley Olajide",
    born: "4 March 1943",
    died: "23 September 2026",
    yearRange: "1943 - 2026",
    // NOTE: the printed programme says "97 years", but 1943-2026 is 83 years.
    // Confirm with the family and change this line if needed.
    ageLabel: "83",
    headline: "Forever in our Heart",
    portrait: "assets/gallery/photo-08.jpg",
    verse: { text: "I have fought a good fight, I have finished my course, I have kept the faith.", ref: "2 Timothy 4:7" }
  },

  service: {
    title: "Burial & Funeral Service",
    date: "Friday, 6 November 2026",
    isoDate: "2026-11-06",
    time: "", // add the start time when confirmed, e.g. "10:00 AM"
    church: "St. Paul's Cathedral Church",
    place: "Iyara, Diocese of Ijumu · Church of Nigeria (Anglican Communion)",
    directionsTo: "St. Paul's Anglican Cathedral Church, Iyara, Kogi State, Nigeria",
    livestreamUrl: ""
  },

  backgroundHymn: { title: "To God Be the Glory", src: "assets/audio/to-god-be-the-glory.mp3" },

  officiating: [
    { name: "Ven. D. S. Abiodun", role: "Archdeacon of the Cathedral" },
    { name: "The Rt. Revd. Prof. P. O. Ojo, Ph.D", role: "Assisting Priest" },
    { name: "Canon S. O. Alemidan", role: "" },
    { name: "Rev. S. O. Onipede", role: "" },
    { name: "Mrs. Yetunde Davies", role: "Pastor's Warden" },
    { name: "Mrs. C. O. Jonah", role: "Vicar's Warden" },
    { name: "Mrs. J. T. Ajayi", role: "Choir Mistress" },
    { name: "Mr. Alaba Bakare", role: "Organist" }
  ],

  churchNeeds: {
    intro: "The church needs support in the following areas. You can contribute financially or in kind.",
    items: ["Computer system and photocopy machine", "Big generator", "Choir robes (white and purple)"]
  },

  appreciation: {
    image: "assets/gallery/cross.jpg",
    paragraphs: [
      "With hearts full of gratitude, we, the family of our beloved departed, sincerely appreciate everyone who stood by us during this difficult period.",
      "We are deeply grateful to our family members, friends, relatives, neighbours, colleagues, church members, well-wishers, and everyone who contributed in one way or another towards the success of the burial ceremony.",
      "Your prayers, words of comfort, presence, kindness, and unwavering support gave us strength and comfort when we needed them most.",
      "Although words cannot fully express how grateful we are, please know that every act of love and kindness will forever remain in our hearts.",
      "May Almighty God bless you abundantly, replenish all that you have given, and grant you peace, good health, and long life."
    ],
    signature: "The Ojo Aiyegboka Family"
  },

  /* ---------- Life story ---------- */
  timeline: [
    { year: "1943", text: "Born on 4 March in Bukuru, near Jos, Plateau State" },
    { year: "1953", text: "Began primary school at St Paul's Anglican Primary School, Iyara" },
    { year: "1959", text: "Entered Provincial Secondary School, Okene, where he played hockey" },
    { year: "1965", text: "Higher School Certificate, Barewa College, Zaria" },
    { year: "1969", text: "B.Sc. Economics, Ahmadu Bello University, Zaria" },
    { year: "1972", text: "Married Helen Abidemi Ojo Aiyegboka on 25 April" },
    { year: "1976", text: "Master's in International Economics, Vanderbilt University, USA" },
    { year: "1981", text: "Joined the Nigerian Bank for Commerce and Industry; later Assistant General Manager" },
    { year: "2026", text: "Returned home to Iyara, and answered God's call on 23 September" }
  ],
  biography: [
    { h: "An uncertain start", p: [
      "Wesley Olajide Ojo Aiyegboka was born on the 4th of March 1943 in Bukuru, a sleepy town 5km south of Jos, Plateau State, to the late Michael Ojo Ihinmodu and Seliatu Daniyan.",
      "He had an uncertain start in life as he lost his mother a few months after his birth. As a boy, he was raised by his father and paternal grandmother until he lost them at the age of 17. It is fair to say that Olajide faced considerable challenges from the very beginning of his life, but those early experiences taught him resilience, survival and, above all, how to face adversity head-on."
    ], img: "assets/gallery/photo-01.jpg" },
    { h: "School days", p: [
      "He started his primary education at St Paul's Anglican Primary School, Iyara, in 1953, where he formed friendships that would last a lifetime. Along with some of these friends, he studied hard enough to pass the entrance examination to Provincial Secondary School, Okene, in 1959.",
      "In addition to pursuing his academic qualifications, he was a keen hockey player at Provincial Secondary School Okene. His love for the game led him to play against schools from different provinces, an experience he cherished and was proud of.",
      "In 1963 he finished at Provincial Secondary School, Okene, and proceeded to Barewa College, Zaria, for his Higher School Certificate, which he completed in 1965 with good grades. He went on to study for a degree in Economics at Ahmadu Bello University, Zaria, doing life the only way he knew best: very large!"
    ] },
    { h: "Career and family", p: [
      "Upon completing a Bachelor of Science in Economics in 1969, Olajide began his career with the Ministry of Economic Development in Ilorin, Kwara State. On the 25th of April 1972, he married his wife, Helen Abidemi Ojo Aiyegboka, of blessed memory.",
      "In pursuit of further education, he travelled to the United States of America, where he earned a Master's degree in International Economics at Vanderbilt University, Tennessee, graduating in 1976.",
      "He returned to Nigeria and resumed work with the Ministry of Economic Planning in Ilorin. In 1981 he joined the Nigerian Bank for Commerce and Industry (now the Bank of Industry) in Bauchi State, and was transferred to the head office in Lagos in 1985, where he rose through the ranks to become an Assistant General Manager. He left the Bank in 1991, went into independent contracting and, for some time, managed a frozen food enterprise in Ilorin alongside his wife."
    ], img: "assets/gallery/photo-09.jpg" },
    { h: "A life invested in people", p: [
      "Throughout his working life and beyond, his greatest investment was not in business but in people. He took pride in helping others build better lives for themselves and their families. He paid school fees, helped young people secure admission into higher institutions, and gave accommodation to friends and family who needed a place to stay while pursuing their education. People benefited from his generosity, done without fanfare.",
      "He was unwavering in his commitment to honesty, regardless of the situation. Fully aware that his candour could sometimes rub people the wrong way, he would rather face the consequences of being truthful than compromise his principles.",
      "Olajide was a larger-than-life character. He was an orphan who navigated life without the benefit of parental guidance, yet overcame the challenges before him and made a positive and lasting impact in the lives of many people."
    ] },
    { h: "Faith and home", p: [
      "He came to love the Lord and became a devoted Christian. His love for Iyara was second to none; Iyara was home in a way no other place could be, and he always expressed the wish to spend his final days there. True to form, he had his way, as he so often did in life. He returned home, and when God called, he answered.",
      "He lived a full and remarkable life: he overcame adversity, built enduring friendships, raised a family, pursued education, worked hard, was fearless in his convictions, rallied around others, and left an indelible mark in the lives of many.",
      "He will be deeply missed, fondly remembered and forever loved by his people."
    ], img: "assets/gallery/photo-04.jpg" }
  ],

  /* ---------- Order of service ---------- */
  servicePlan: [
    { part: "church", label: { en: "In Church", yo: "Ninu Ijo" }, items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { part: "grave", label: { en: "At the Graveside", yo: "Ni Ite Oku" }, items: [14, 15, 16, 17] }
  ],

  order: [
    { n: 1, kind: "prayer", en: "Receiving of the Body", yo: "Gbigba Oku ni Enu Ona", text: {
      en: [
        "~The ministers shall meet the body at the entrance of the church.",
        "P|In the name of God the Father, the Son and the Holy Spirit.",
        "C|Amen.",
        "~The congregation will stand.",
        "P|With faith in Jesus Christ, we receive the body of our beloved one, the late Wesley Jide Aiyegboka Ojo, for burial.",
        "Let us pray with confidence in God, the Giver of Life, that He may raise him unto perfection in the company of saints.",
        "~Silence, after which the priest says:",
        "P|Deliver your servant, the late Wesley Jide Aiyegboka Ojo, sovereign Lord, from all evils, and set him free from every bond, that he may rest with all saints in eternal habitation, where with the Father and the Holy Spirit you live and reign, one God, for ever and ever.",
        "C|Amen.",
        "P|Rest eternal grant unto him, O Lord.",
        "C|And let perpetual light shine upon him.",
        "P|I have set the Lord always before me; for He is at my right hand, therefore I shall not be moved.",
        "C|Wherefore my heart was glad, and my glory rejoices. My flesh also shall rest in hope.",
        "P|You will not leave my soul in hell; neither shall you suffer your holy one to see corruption.",
        "C|You shall show me the path of life; in your presence is the fullness of joy, and at your right hand there are pleasures for evermore.",
        "P|Rest eternal grant unto him, O Lord.",
        "C|And let perpetual light shine upon him."
      ],
      yo: [
        "~Awon Alufa yio pade oku ni enu ona ile Olorun.",
        "P|Ni oruko Olorun Baba, ati niti Omo, ati niti Emi Mimo.",
        "C|Amin.",
        "~Gbogbo eniyan yio dide.",
        "P|Ni igbagbo ninu Jesu Kristi, awa gba ara baba wa Late WESLEY JIDE AIYEGBOKA OJO fun isinku.",
        "E je ki a gbadura pelu igboya ninu Olorun Olufunni ni iye, wipe Oun yio ji baba wa yi dide kuro ninu oku pelu awon eniyan mimo.",
        "~(Idakeje)",
        "P|Oluwa Jesu Kristi, gba okan iranse re Late WESLEY JIDE AIYEGBOKA OJO kuro ninu ide gbogbo, ki o le simi pelu awon ayanfe re ni ile ayeraye, nibiti iwo njoba pelu Baba ati Emi Mimo, Olorun kan, aye ainipekun.",
        "C|Amin.",
        "P|Oluwa, fun iranse re ni isinmi ainipekun.",
        "C|Ki o si je ki imole ododo mole si lara re.",
        "P|Emi ti gbe Oluwa si iwaju mi nigba gbogbo; nitori ti o wa ni owo otun mi, a ki yio si mi ni ipo.",
        "C|Nitori naa inu mi dun, ogo mi si yo; ara mi pelu yio simi ni ireti.",
        "P|Nitori iwo ki yio fi okan mi sile ni ipo oku; beeni iwo ki yio je ki Eni Mimo re ki o ri idibaje.",
        "C|Iwo yio fi ipa ona iye han mi; niwaju re ni ekunrere ayo wa, ati ni owo otun re ni didun wa lailai.",
        "P|Oluwa, fun un ni isinmi ailopin.",
        "C|Ki o si je ki imole ayeraye tan sori re. Amin."
      ] } },

    { n: 2, kind: "reading", en: "Sentences", yo: "Awon Asayan Oro Itunu", text: {
      en: [
        "Jesus said, I am the resurrection and the life: he that believeth in me, though he were dead, yet shall he live; and whosoever liveth and believeth in me shall never die.", "R|John 11:25-26",
        "Let not your heart be troubled: ye believe in God, believe also in me. In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you.", "R|John 14:1-2",
        "For whether we live, we live unto the Lord; and whether we die, we die unto the Lord: whether we live therefore, or die, we are the Lord's.", "R|Romans 14:8",
        "For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth: and though after my skin worms destroy this body, yet in my flesh shall I see God: whom I shall see for myself, and mine eyes shall behold, and not another.", "R|Job 19:25-27",
        "Neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.", "R|Romans 8:38-39",
        "For we brought nothing into this world, and it is certain we can carry nothing out. The Lord gave, and the Lord hath taken away; blessed be the name of the Lord.", "R|1 Timothy 6:7; Job 1:21"
      ],
      yo: [
        "Oluwa wipe, Emi ni ajinde ati iye; eniti o ba gba mi gbo, bi o tile ku, sibe yio ye. Enikeni ti o mbe laaye, ti o si gba mi gbo, ki yio ku mo lailai.", "R|Johanu 11:25-26",
        "E ma se je ki okan yin dàrú: e gba Olorun gbo, e gba mi gbo pelu. Ninu ile Baba mi opolopo ibugbe ni o wa: iba ma se bee, emi iba ti so fun yin; nitori emi nlo ipese aye sile fun nyin.", "R|Johanu 14:1-2",
        "Nitori bi awa ba wa laaye, awa wa laaye fun Oluwa; bi a ba si ku, awa ku fun Oluwa: nitori naa, bi awa wa laaye tabi a ku, ti Oluwa ni awa ise.", "R|Romu 14:8",
        "Emi mo pe Oludande mi mbe, ati pe Oun o duro lori ile lehin ola. Nipa ti ara mi, bi kokoro tile ba ara yi je, sugbon ninu ara mi ni emi o ri Olorun: eniti emi o ri fun ara mi, ti oju mi yio si ri, ki si ise ti elomiran.", "R|Jobu 19:25-27",
        "Nitori o da mi loju pe, ki ise iku, tabi iye, tabi awon angeli, tabi awon ijoye, tabi awon ohun igba isinsinyi, tabi ohun igba ti mbo, tabi oke, tabi ogbun, tabi eda miran kan, ni yio le ya wa kuro ninu ife Olorun, ti o wa ninu Kristi Jesu Oluwa wa.", "R|Romu 8:38-39",
        "Nitori a ko mu ohunkohun wa si aiye yi, o si da mi loju pe awa ko si le mu ohunkohun jade lo. Oluwa fi fun ni, Oluwa si gba a; ibukun ni fun oruko Oluwa.", "R|1 Timoteu 6:7; Jobu 1:21"
      ] } },

    { n: 3, kind: "hymn", en: "Hymn", yo: "Orin", hymn: "jesus-lives" },

    { n: 4, kind: "reading", en: "Psalm 90", yo: "Iwe Orin Dafidi 90", text: {
      en: [
        "#1|Lord, thou hast been our dwelling place in all generations.",
        "#2|Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God.",
        "#3|Thou turnest man to destruction; and sayest, Return, ye children of men.",
        "#4|For a thousand years in thy sight are but as yesterday when it is past, and as a watch in the night.",
        "#5|Thou carriest them away as with a flood; they are as a sleep: in the morning they are like grass which groweth up.",
        "#6|In the morning it flourisheth, and groweth up; in the evening it is cut down, and withereth.",
        "#7|For we are consumed by thine anger, and by thy wrath are we troubled.",
        "#8|Thou hast set our iniquities before thee, our secret sins in the light of thy countenance.",
        "#9|For all our days are passed away in thy wrath: we spend our years as a tale that is told.",
        "#10|The days of our years are threescore years and ten; and if by reason of strength they be fourscore years, yet is their strength labour and sorrow; for it is soon cut off, and we fly away.",
        "#11|Who knoweth the power of thine anger? even according to thy fear, so is thy wrath.",
        "#12|So teach us to number our days, that we may apply our hearts unto wisdom.",
        "#13|Return, O Lord, how long? and let it repent thee concerning thy servants.",
        "#14|O satisfy us early with thy mercy; that we may rejoice and be glad all our days.",
        "#15|Make us glad according to the days wherein thou hast afflicted us, and the years wherein we have seen evil.",
        "#16|Let thy work appear unto thy servants, and thy glory unto their children.",
        "#17|And let the beauty of the Lord our God be upon us: and establish thou the work of our hands upon us; yea, the work of our hands establish thou it."
      ],
      yo: [
        "#1|OLUWA, iwo li o ti nse ibujoko wa lati irandiran.",
        "#2|Ki a to bi awon oke nla, ati ki iwo ki o to da ile on aiye, ani lati aiyeraiye, iwo ni Olorun.",
        "#3|Iwo so enia di ibaje; iwo si wipe, E pada wa, enyin omo enia.",
        "#4|Nitori pe egberun odun li oju re, bi ana li o ri nigbati o ba koja, ati bi igba iso kan li oru.",
        "#5|Iwo ko won lo bi enipe nipa sisan omi; nwon dabi orun: ni kutukutu nwon dabi koriko ti o dagba soke.",
        "#6|Ni kutukutu o nruwe, o si dagba soke; li asale a ke e lule, o si rọ.",
        "#7|Nitori awa run nipa ibinu re, ati nipa ibinu re ara ko ro wa.",
        "#8|Iwo ti gbe ese wa ka iwaju re, ese ikoko wa si han kedere ninu imole oju re.",
        "#9|Nitori gbogbo ojo aiye wa nkoja lo ninu ibinu re: awa nlo ojo wa bi ala ti a nro.",
        "#10|Adorin odun ni iye ojo odun wa; bi o si se pe nipa ti agbara, bi nwon ba to ogorin odun, agbara won kiki laalaa on ibinuje ni; nitori pe a ke e kuro laipe, awa si fo lo.",
        "#11|Tani o mo agbara ibinu re? gege bi eru re, beeni ibinu re ri.",
        "#12|Nitori naa ko wa lati ma ka iye ojo wa, ki awa ki o le fi okan wa si ipa ogbon.",
        "#13|Yipada si wa, Oluwa, yio ti pe to? ki o si saanu awon iranse re.",
        "#14|Fi anu re te wa lorun ni kutukutu; ki a le ma yo, ki inu wa si ma dun ni gbogbo ojo aiye wa.",
        "#15|Mu inu wa dun bi iye ojo ti iwo ti pon wa loju, ati iye odun ti awa ti ri ibi.",
        "#16|Je ki ise re han si awon iranse re, ati ogo re si awon omo won.",
        "#17|Je ki ewa Oluwa Olorun wa ki o wa lara wa: ki iwo ki o si fi idi ise owo wa mule lara wa; beni, ise owo wa ni ki iwo ki o fi idi re mule."
      ] } },

    { n: 5, kind: "reading", en: "Lesson: 1 Thessalonians 4:13-18", yo: "Eko Kika: 1 Tesalonika 4:13-18", text: {
      en: [
        "#13|But I would not have you to be ignorant, brethren, concerning them which are asleep, that ye sorrow not, even as others which have no hope.",
        "#14|For if we believe that Jesus died and rose again, even so them also which sleep in Jesus will God bring with him.",
        "#15|For this we say unto you by the word of the Lord, that we which are alive and remain unto the coming of the Lord shall not prevent them which are asleep.",
        "#16|For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first:",
        "#17|Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air: and so shall we ever be with the Lord.",
        "#18|Wherefore comfort one another with these words.",
        "P|This is the word of the Lord.",
        "C|Thanks be to God."
      ],
      yo: [
        "#13|Eyin ara, awa ko fe ki eyin ki o je ope niti awon ti o sun, ki e ma ba a banuje gege bi awon iyoku ti ko ni ireti.",
        "#14|Nitori bi awa ba gbagbo pe Jesu ku, o si tun jinde, bee gege ni awon pelu ti o sun ninu Jesu ni Olorun yio mu pelu re wa.",
        "#15|Nitori eyi ni awa nwi fun yin nipa oro Oluwa, pe awa ti o wa laaye, ti a si ku lehin de abo Oluwa, ki yio saaju awon ti o sun.",
        "#16|Nitori Oluwa tikarare yio sokale lati orun wa, pelu ariwo, pelu ohun olori awon angeli, ati pelu ipe Olorun: awon oku ninu Kristi ni yio si koko jinde:",
        "#17|Nigbana li a o gba awa ti o wa laaye, ti a si ku, soke pelu won ninu awosanma, lati pade Oluwa li oju orun: beni awa o si ma wa pelu Oluwa titi lai.",
        "#18|Nitori naa, e ma fi oro wonyi tu ara yin ninu.",
        "P|Eyi ni oro Oluwa.",
        "C|Ope ni fun Olorun."
      ] } },

    { n: 6, kind: "prayer", en: "Intercessory Prayers", yo: "Adura fun Gbogbo Eniyan", text: {
      en: [
        "P|Almighty God, who has bound together your elect in one communion and fellowship in the body of your Son Jesus Christ: grant, we pray, to your whole Church in paradise and on earth your light and your peace.",
        "C|Amen.",
        "P|Grant that all who have been saved by the death and resurrection of Christ may die to sin and rise to newness of life, and through the gate of death pass to your joyful resurrection.",
        "C|Amen.",
        "P|Grant to those who mourn, especially the family of our dear father, the late Wesley Jide Aiyegboka Ojo, sure confidence in your fatherly care, that casting all their grief on you, they may know the consolation of your love.",
        "C|Amen.",
        "P|Grant us grace to entrust our father into the unfailing arms of your mercy, and remember him according to the favour which you have for your children.",
        "C|Amen."
      ],
      yo: [
        "P|Olorun alagbara julo, Iwo ti o so awon ayanfe re po ninu idapo ati isokan ara Omo Re Jesu Kristi; fifun ni, a mbebe, ki Ijo Re ni paradise ati ni aiye yi le ri imole ati alaafia Re.",
        "C|Amin.",
        "P|Fifun ni ki awon ti a ti gbala nipase iku ati ajinde Kristi le ku si ese, ki won si jinde si igbesi aiye titun; ati nipase ore-ofe re ki won le re iku koja si ayo ajinde re.",
        "C|Amin.",
        "P|Fun awon ti nkaanu, paapaa julo idile Baba wa Late WESLEY JIDE AIYEGBOKA OJO, ni idaniloju itoju re, to bee ti won yio fi ko gbogbo eru won le O, ki won si le mo itunu ife re.",
        "C|Amin.",
        "P|Fifun ni ni ore-ofe Re lati fi Baba wa WESLEY JIDE AIYEGBOKA OJO le owo anu re ti ki i ye, ki o si ranti re gege bi oju rere ti o ni si awon omo re.",
        "C|Amin."
      ] } },

    { n: 7, kind: "hymn", en: "Hymn", yo: "Orin", hymn: "jerusalem-on-high" },

    { n: 8, kind: "sermon", en: "Sermon", yo: "Iwasu", note: { en: "Please be seated for the sermon.", yo: "E joko fun iwasu." } },

    { n: 9, kind: "prayer", en: "Prayers", yo: "Adura", text: {
      en: [
        "P|Lord, have mercy upon us.",
        "C|Christ, have mercy upon us.",
        "P|Lord, have mercy upon us.",
        "H|The Lord's Prayer",
        "C|Our Father, which art in heaven, hallowed be thy name; thy kingdom come; thy will be done, in earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive them that trespass against us. And lead us not into temptation; but deliver us from evil. Amen.",
        "P|O Lord, enter not into judgement with thy servant, the late Wesley Jide Aiyegboka Ojo.",
        "C|For in thy sight shall no man living be justified.",
        "P|Grant unto thy servant, the late Wesley Jide Aiyegboka Ojo, eternal rest.",
        "C|And let thy light perpetual shine upon him.",
        "P|We believe verily to see the goodness of the Lord.",
        "C|In the land of the living.",
        "P|O Lord, hear our prayer.",
        "C|And let our cry come unto thee.",
        "H|Let us pray",
        "O God, the King of saints, we praise and magnify thy holy name for all thy servants who have finished their course in thy faith, especially thy servant the late Wesley Jide Aiyegboka Ojo. We are encouraged by their examples, strengthened by their fellowship and aided by their prayers, so that we may attain everlasting life, through the merits of thy Son Jesus Christ our Lord. Amen.",
        "Almighty God, with whom do live the spirits of them that depart hence in the Lord, and with whom the souls of the faithful, after they are delivered from the burden of the flesh, are in joy and felicity: we give thee hearty thanks, for that it hath pleased thee to deliver thy servant, the late Wesley Jide Aiyegboka Ojo, out of the miseries of this sinful world; beseeching thee that it may please thee, of thy gracious goodness, shortly to accomplish the number of thine elect, and to hasten thy kingdom; that we, with all those that are departed in the true faith of thy holy name, may have our perfect consummation and bliss, both in body and soul, in thy eternal and everlasting glory; through Jesus Christ our Lord. Amen."
      ],
      yo: [
        "P|Oluwa, saanu fun wa.",
        "C|Kristi, saanu fun wa.",
        "P|Oluwa, saanu fun wa.",
        "H|Adura Oluwa",
        "C|Baba wa ti mbe li orun… sugbon gba wa lowo bilisi. Amin.",
        "P|Oluwa, ma ba omo-odo re Late WESLEY JIDE AIYEGBOKA OJO se ejo.",
        "C|Nitori ko si eni ti o wa laaye ti a o da lare niwaju re.",
        "P|Oluwa, fun iranse re Late WESLEY JIDE AIYEGBOKA OJO ni isinmi ainipekun.",
        "C|Ki o si je ki imole re ailopin mole si lara re.",
        "P|Awa gbagbo lati ri ire Oluwa.",
        "C|Ni ile alaaye.",
        "P|Oluwa, gbo adura wa.",
        "C|Ki o si je ki igbe wa ki o wa sodo re.",
        "H|E je ki a gbadura",
        "Olorun, Oba awon eni mimo, awa yin O, awa si gbe oruko mimo re ga, fun gbogbo awon iranse re ti won ti pari ise won laiye ni iberu re, paapaa baba wa Late WESLEY JIDE AIYEGBOKA OJO. Awa si mbebe lodo re, nipa apere iwa mimo ati eko won, ki awa naa le je alabapin ati ajogun iye ainipekun, nitori itoye Jesu Kristi Omo Re, Oluwa wa. Amin.",
        "Baba Alagbara, Olorun emi gbogbo eda, eniti ko yipada, awa fi ibukun fun oruko mimo re fun gbogbo awon ti o ti pari ise won laiye ni igbagbo ati iberu re, ti won si ti fi ihin sile lo sinu isinmi. Awa ranti omo-odo re Late WESLEY JIDE AIYEGBOKA OJO, a si fi ope fun O; a mbebe pe ki O fi fun wa, pelu won, ohun rere gbogbo ti Iwo ti pese sile, nipase Jesu Kristi Oluwa wa. Amin."
      ] } },

    { n: 10, kind: "thanks", en: "Thanksgiving", yo: "Idupe", note: { en: "A time of thanksgiving to God for the life of our father.", yo: "Akoko idupe fun Olorun fun aiye baba wa." } },
    { n: 11, kind: "notice", en: "Notices", yo: "Ifilo", note: { en: "Announcements from the church and the family.", yo: "Ikede lati odo Ijo ati ebi." } },
    { n: 12, kind: "thanks", en: "Vote of Thanks", yo: "Idupe lati Owo Ebi", note: { en: "The family gives thanks to everyone present.", yo: "Ebi dupe lowo gbogbo eniyan." } },
    { n: 13, kind: "hymn", en: "Recessional Hymn", yo: "Orin Akojade", hymn: "realms-of-the-blest" },

    { n: 14, kind: "sermon", en: "Admonition", yo: "Awon Oro Iyanju", note: { en: "Words of exhortation at the graveside.", yo: "Oro iyanju ni ite oku." } },
    { n: 15, kind: "hymn", en: "Hymn", yo: "Orin", hymn: "sleep-on-beloved", also: "in-christ-alone" },
    { n: 16, kind: "prayer", en: "Committal and Prayer", yo: "Gbigbe Oku si Iboji ati Adura", text: {
      en: [
        "~When the coffin is lowered into the grave and earth is cast upon it by someone standing by, the Minister shall say:",
        "Forasmuch as it hath pleased Almighty God of his great mercy to take unto himself the soul of the late Wesley Jide Aiyegboka Ojo here departed, we therefore commit his body to the ground; earth to earth, ashes to ashes, dust to dust; in sure and certain hope of the resurrection to eternal life, through our Lord Jesus Christ; who shall change our vile body, that it may be like unto his glorious body, according to the mighty working, whereby he is able to subdue all things to himself. Amen.",
        "~The Minister shall say:",
        "I heard a voice from heaven, saying unto me, Write, From henceforth blessed are the dead which die in the Lord: even so saith the Spirit; for they rest from their labours.",
        "P|Lord, have mercy upon us.",
        "C|Christ, have mercy upon us.",
        "P|Lord, have mercy upon us.",
        "C|Our Father, which art in heaven… but deliver us from evil. Amen.",
        "H|Let us pray",
        "Almighty God, with whom do live the spirits of them that depart hence in the Lord, and with whom the souls of the faithful, after they are delivered from the burden of the flesh, are in joy and felicity: we give thee hearty thanks, for that it hath pleased thee to deliver this our father, the late Wesley Jide Aiyegboka Ojo, out of the miseries of this sinful world; beseeching thee that it may please thee, of thy gracious goodness, shortly to accomplish the number of thine elect, and to hasten thy kingdom; that we, with all those that are departed in the true faith of thy holy name, may have our perfect consummation and bliss, both in body and soul, in thy eternal and everlasting glory; through Jesus Christ our Lord. Amen.",
        "O merciful God, the Father of our Lord Jesus Christ, who is the resurrection and the life; in whom whosoever believeth shall live, though he die; and whosoever liveth and believeth in him shall not die eternally; who also hath taught us, by his holy Apostle Saint Paul, not to be sorry, as men without hope, for them that sleep in him: we meekly beseech thee, O Father, to raise us from the death of sin unto the life of righteousness; that, when we shall depart this life, we may rest in him, as our hope is this our father, the late Wesley Jide Aiyegboka Ojo, doth; and that, at the general resurrection in the last day, we may be found acceptable in thy sight, and receive that blessing which thy well-beloved Son shall then pronounce to all that love and fear thee, saying, Come, ye blessed children of my Father, receive the kingdom prepared for you from the beginning of the world. Grant this, we beseech thee, O merciful Father, through Jesus Christ, our Mediator and Redeemer. Amen."
      ],
      yo: [
        "~Nigbati a ba bu erupe si lori, Alufa yio wipe:",
        "Nje bi o ti wu Olorun Olodumare ninu anu nla Re lati gba okan Late WESLEY JIDE AIYEGBOKA OJO ti o fi ihin sile lo sodo ara Re, nitori naa awa fi oku re fun ile; erupe fun erupe, eeru fun eeru, ekuru fun ekuru; ni ireti ajinde si iye ti ko nipekun nipase Jesu Kristi; Eniti yio pa ara wa da, ki o le dabi ara Oun tikarare ti ogo, gege bi ise agbara nipa eyi ti Oun le fi te ohun gbogbo ba fun ara Re. Amin.",
        "~Nigbana ni Alufa yio wipe:",
        "Mo gbo ohun kan lati orun wa, ti nwi fun mi pe, Kowe re: Lati isisiyi lo, ibukun ni fun awon oku ti o ku ninu Oluwa; beni Emi wi, nitori won simi kuro ninu laala won.",
        "P|Oluwa, saanu fun wa.",
        "C|Kristi, saanu fun wa.",
        "P|Oluwa, saanu fun wa.",
        "C|Baba wa ti mbe li orun… sugbon gba wa lowo bilisi. Amin.",
        "H|E je ka gbadura",
        "Olorun Olodumare, eniti emi awon ti o fi ihin sile lo ninu Oluwa mbe lodo Re, ati lodo eniti okan awon onigbagbo mbe ninu ayo on idera, lehin igbati a yo won kuro ninu eru ara won: tokantokan li awa fi dupe lowo Re, nitori o wu O lati yo Baba wa Late WESLEY JIDE AIYEGBOKA OJO kuro ninu osi aiye ese yi; awa mbebe lodo Re, ki o le wu O ninu ore Re nla lati tete pari iye awon ayanfe Re, ati lati mu ijoba Re wa; ki awa pelu gbogbo awon ti o fi ihin sile lo ni igbagbo otito oruko Re mimo, le ni ekunrere ati opin ayo wa, li ara ati okan, ninu ogo Re ti ko nipekun; nipase Jesu Kristi Oluwa wa. Amin.",
        "Olorun alaanu, Baba Oluwa wa Jesu Kristi, eniti ise Ajinde ati Iye; eniti enikeni ti o ba gba a gbo yio wa laaye, bi o tile ku; ati enikeni ti o wa laaye ti o si gba a gbo ki yio ku mo lailai; Eniti o ti owo Paulu Aposteli Re mimo ko wa pe ki a ma banuje, bi awon ti ko ni ireti, fun awon ti o sun ninu Re: awa nfi irele bebe lodo Re, Baba, ki O ji wa dide kuro ninu iku ese si iye ododo; ki nigbati awa ba fi aiye sile lo, ki awa ki o le simi ninu Re, bi awa ti ni ireti pe Baba wa Late WESLEY JIDE AIYEGBOKA OJO nsimi; ati ni ajinde gbogbo eniyan ni ojo ikehin, ki a le ba wa ni eni itewogba li oju Re, ki a si le ri ibukun naa gba, ti Omo Re olufe yio so nigbana fun gbogbo awon ti o fe O ti won si beru Re, wipe, E wa, enyin alabukun-fun Baba mi, e jogun ijoba ti a ti pese sile fun yin lati ipilese aiye wa. Fi eyi fun wa, awa mbebe lodo Re, Baba alaanu, nipase Jesu Kristi Alarina ati Oludande wa. Amin."
      ] } },

    { n: 17, kind: "prayer", en: "Benediction and Grace", yo: "Adura Ikehin ati Ore-Ofe", text: {
      en: [
        "P|Go forth upon thy journey from this world, the late Wesley Jide Aiyegboka Ojo, in the name of God the Father Almighty, who created thee.",
        "C|Amen.",
        "P|In the name of Jesus Christ, who suffered for thee.",
        "C|Amen.",
        "P|In the name of the Holy Spirit, who strengthened thee.",
        "C|Amen.",
        "P|In communion with the blessed saints, and aided by angels and archangels and all the armies of the heavenly host.",
        "C|Amen.",
        "P|May the peace of God be yours from now on, and may your dwelling be one of great joy in heaven. May God Almighty, who brought again from the dead our Lord Jesus Christ, raise you up with the saints at the last day.",
        "C|Amen.",
        "H|The Grace",
        "C|The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit, be with us all, now and evermore. Amen."
      ],
      yo: [
        "P|Ma a lo, iwo omo-ehin Kristi, Late WESLEY JIDE AIYEGBOKA OJO, ninu irin ajo re kuro ninu aiye ese yi, ni oruko Olorun Baba Olodumare, eniti o da o.",
        "C|Amin.",
        "P|Ni oruko Jesu Kristi, eniti o jiya nitori re.",
        "C|Amin.",
        "P|Ni oruko Emi Mimo, eniti o fun o ni agbara.",
        "C|Amin.",
        "P|Ni idapo pelu awon eniyan mimo, awon angeli ati awon olori angeli, ati pelu gbogbo egbe ogun orun.",
        "C|Amin.",
        "P|Ki alaafia Olorun ma je tire lati isisiyi lo. Ki ibugbe re si je ibi ayo nla ni orun.",
        "C|Amin.",
        "H|Ore-Ofe",
        "C|Ore-ofe Oluwa wa Jesu Kristi, ati ife Olorun, ati idapo Emi Mimo, ki o wa pelu wa nisisiyi ati titi lailai. Amin."
      ] } }
  ],

  /* ---------- Hymns ---------- */
  hymns: [
    { id: "jesus-lives", order: 3, en: "Jesus Lives!", yo: "Jesu Ye",
      text: {
        en: { verses: [
          ["Jesus lives! Thy terrors now", "Can, O death, no more appal us;", "Jesus lives! By this we know", "Thou, O grave, canst not enthral us.", "Hallelujah!"],
          ["Jesus lives! Henceforth is death", "But the gate of life immortal;", "This shall calm our trembling breath", "When we pass its gloomy portal.", "Hallelujah!"],
          ["Jesus lives! For us He died;", "Then, alone to Jesus living,", "Pure in heart may we abide,", "Glory to our Saviour giving.", "Hallelujah!"],
          ["Jesus lives! Our hearts know well", "Naught from us His love shall sever;", "Life, nor death, nor powers of hell", "Tear us from His keeping ever.", "Hallelujah!"],
          ["Jesus lives! To Him the throne", "Over all the world is given:", "We, in spirit with Him one,", "Rest and reign with Him in heaven.", "Hallelujah! Amen."]
        ] },
        yo: { verses: [
          ["Jesu ye titi aiye,", "Eru iku ko ba mi mo;", "Jesu ye; nitorina", "Isa oku ko n'ipa mo.", "Aleluya!"],
          ["Jesu ye, lat'oni lo,", "Iku je ona si iye;", "Eyi y'o je 'tunu wa", "Gbat' akoko iku ba de.", "Aleluya!"],
          ["Jesu ye; fun wa lo ku,", "Nje Tire ni a o ma se;", "A o f'okan funfun sin,", "A o f'ogo f'Olugbala.", "Aleluya!"],
          ["Jesu ye; eyi daju,", "Iku at'ipa okunkun", "Ki yo le ya ni kuro", "Ninu ife ti Jesu.", "Aleluya!"],
          ["Jesu ye; gbogbo ijoba", "L'orun, li aiye, di Tire;", "E je ki a ma tele,", "Ki a le joba pelu Re.", "Aleluya! Amin."]
        ] }
      } },
    { id: "jerusalem-on-high", order: 7, en: "Jerusalem on High", yo: "Jerusalem T'orun",
      text: {
        en: { refrain: ["O happy place!", "When shall I be,", "My God, with Thee,", "To see Thy face!"], verses: [
          ["Jerusalem on high", "My song and city is,", "My home whene'er I die,", "The centre of my bliss."],
          ["Thy walls are made of pearls,", "My heavenly city bright;", "The gates are dazzling white,", "Thy streets are paved with gold."],
          ["The sun does not light there,", "Neither is there the moon;", "All these are not needed,", "For Jesus is the light."],
          ["There dwells my Lord, my King,", "Judged here unfit to live;", "There angels to Him sing,", "And lowly homage give."],
          ["The patriarchs of old", "There from their travels cease;", "The prophets there behold", "Their long'd-for Prince of peace."],
          ["The Lamb's apostles there", "I might with joy behold;", "The harpers I might hear", "Harping on harps of gold.", "Amen."]
        ] },
        yo: { refrain: ["Ibi ayo!", "Nigbawo ni", "Un o r'oju Re,", "Olorun mi?"], verses: [
          ["Jerusalem t'orun,", "L'orin mi, ilu mi!", "Ile mi bi mba ku;", "Ekun ibukun mi;"],
          ["Nibe l'Oba mi wa,", "T'a da lebi laiye;", "Angeli nkorin fun,", "Won si nteriba fun."],
          ["Patriark igbani,", "Pari irin ajo won nibe;", "Awon woli, won wo", "Omo Alade Alaafia."],
          ["Nibe ni imole ri", "Awon Aposteli;", "At'awon akorin", "Ti nlu harpu wura."],
          ["Ni agbala wonni,", "Ni awon Martir wa;", "Won wo aso ala;", "Ogo bo ogbe won."],
          ["T'emi yi wa su mi,", "Ti mo ngb'agọ Kedar;", "Ko si 'ru yi loke,", "Nibe ni mo fe lo.", "Amin."]
        ] }
      } },
    { id: "realms-of-the-blest", order: 13, number: "261", en: "We Speak of the Realms of the Blest", yo: "A Nsoro Ile 'Bukun",
      text: {
        en: { verses: [
          ["We speak of the realms of the blest,", "Of that country so bright and so fair,", "And oft are its glories confessed;", "But what must it be to be there!"],
          ["We speak of its pathways of gold,", "Of its walls decked with jewels most rare,", "Its wonders and pleasures untold;", "But what must it be to be there!"],
          ["We speak of its freedom from sin,", "From sorrow, temptation, and care,", "From trials without and within;", "But what must it be to be there!"],
          ["We speak of its anthems of praise,", "With which we can never compare", "The sweetest on earth we can raise;", "But what must it be to be there!"],
          ["We speak of its service of love,", "Of the robes which the glorified wear,", "The Church of the First-born above;", "But what must it be to be there!"],
          ["Do Thou, Lord, midst pleasure or woe,", "Still for heaven our spirits prepare;", "And shortly we also shall know", "And feel what it is to be there.", "Amen."]
        ] },
        yo: { verses: [
          ["A nsoro ile 'bukun ni;", "Ile didan at'ile ewa;", "Gbagbogbo l'a nso t'ogo re", "Y'o ti dun to lati de 'be!"],
          ["A nsoro ita wura re;", "Oso odi re ti ko l'egbe;", "Faji re ko se f'enu so;", "Y'o ti dun to lati de 'be!"],
          ["A nso p'ese ko si nibe,", "Ko s'aniyan at'ibanuje,", "Pelu idanwo l'ode, ninu;", "Y'o ti dun to lati de 'be!"],
          ["A nsoro orin iyin re,", "Ti a ko le f'orin aiye we,", "B'o ti wu k'orin wa dun to;", "Y'o ti dun to lati de 'be!"],
          ["A nsoro isin ife re,", "T'agbada t'awon mimo nwo,", "Ijo akobi ti oke;", "Y'o ti dun to lati de 'be!"],
          ["Jo Oluwa, t'ibi t'ire,", "Sa se emi wa ye fun orun;", "Laipe awa na yio mo", "B'o ti dun to lati de 'be.", "Amin."]
        ] }
      } },
    { id: "sleep-on-beloved", order: 15, en: "Sleep On, Beloved", yo: "Maa Sun, Olufe",
      text: {
        en: { verses: [
          ["Sleep on, beloved, sleep, and take thy rest;", "Lay down thy head upon thy Saviour's breast;", "We love thee well, but Jesus loves thee best", "Good-night! Good-night! Good-night!"],
          ["Calm is thy slumber as an infant's sleep;", "But thou shalt wake no more to toil and weep;", "Thine is a perfect rest, secure and deep", "Good-night! Good-night! Good-night!"],
          ["Until the shadows from this earth are cast;", "Until He gathers in His sheaves at last;", "Until the twilight gloom be overpast", "Good-night! Good-night! Good-night!"],
          ["Until the Easter glory lights the skies;", "Until the dead in Jesus shall arise,", "And He shall come, but not in lowly guise", "Good-night! Good-night! Good-night!"],
          ["Until, made beautiful by Love Divine,", "Thou, in the likeness of thy Lord, shalt shine,", "And He shall bring that golden crown of thine", "Good-night! Good-night! Good-night!"],
          ["Only \"Good-night,\" beloved, not \"Farewell!\"", "A little while, and all His saints shall dwell", "In hallowed union, indivisible", "Good-night! Good-night! Good-night!"],
          ["Until we meet again before His throne,", "Clothed in the spotless robe He gives His own,", "Until we know even as we are known", "Good-night! Good-night! Good-night! Amen."]
        ] },
        yo: { verses: [
          ["Olufe, ma sun, ko si ma simi;", "Gb'ori re le aya Olugbala;", "A fe o, sugbon Jesu fe o ju", "Sun 're, sun 're, sun 're."],
          ["Orun itura bi omo titun;", "Ise on ekun re ti pari na;", "Simi l'alaafia titi aiye", "Sun 're, sun 're, sun 're."],
          ["Simi titi aiye ki yio si mo,", "Ti a o ko alikama s'aba,", "Ti a o su epo on iyangbo", "Sun 're, sun 're, sun 're."],
          ["Titi ogo ajinde yio fi tan,", "Tit' awon to ku ninu Jesu yio nde;", "On yio si wa pelu olanla Re", "Sun 're, sun 're, sun 're."],
          ["A o fi ife Jesu se o logo;", "Iwo yio si ji l'aworan Olorun;", "On yio si mu ade ogo re wa", "Sun 're, sun 're, sun 're."],
          ["\"O daro,\" Olufe, ki se titi lai;", "Lehin igba die awon eni mimo", "Yio ma gbe po ni irepo mimo", "Sun 're, sun 're, sun 're."],
          ["Titi a o fi pade ni ite Re,", "A o si wo wa l'agbada funfun;", "T'a o si ri gege b'a ti mo wa", "Sun 're, sun 're, sun 're. Amin."]
        ] }
      } },
    { id: "in-christ-alone", order: 15, en: "In Christ Alone", yo: "Ninu Kristi",
      pending: { en: "This modern hymn is protected by copyright, so its words are not shown here. Please sing along from your printed programme.", yo: "Orin yi ni eto-ini, nitori naa a ko le gbe oro re si ibi. E jowo e lo iwe eto isin yin." } }
  ]
};
