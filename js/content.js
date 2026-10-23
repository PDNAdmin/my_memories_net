/*
  ==========================================================
  MEMORIAL CONTENT FILE
  ----------------------------------------------------------
  Everything about the person lives here. To make a site
  for a new family, copy this project, edit this file and
  replace the photos in /assets/photos. The design and code
  do not need to change.
  ==========================================================
*/
window.MEMORIAL = {
  person: {
    firstName: "Niala",
    middleName: "Virginia",
    lastName: "Murphy",
    fullName: "Niala Virginia Murphy",
    born: "May 14, 1943",
    died: "September 19, 2025",
    yearsLabel: "82 Years",
    yearRange: "1943 – 2025",
    headline: "Forever in our Hearts",
    tagline: "Celebrating a life of impact",
    portrait: "assets/photos/photo-05.jpg",
    verse: {
      text: "Well done, thou good and faithful servant… enter thou into the joy of thy lord.",
      ref: "Matthew 25:21"
    }
  },

  service: {
    // NOTE: date copied from the printed programme. Confirm with the family.
    date: "Friday, 11th April 2025",
    time: "",
    venue: "Calvary Chapel International Worship Center",
    address: "8064 New Cut Road, Severn, MD 21144, USA",
    // "Get directions" opens the visitor's maps app with directions to this address.
    directionsTo: "Calvary Chapel International Worship Center, 8064 New Cut Road, Severn, MD 21144, USA",
    livestreamUrl: "" // e.g. a YouTube or Facebook Live link
  },

  // Background hymn: played when a visitor taps "Play hymn"
  backgroundHymn: {
    title: "To God Be the Glory",
    src: "assets/audio/to-god-be-the-glory.mp3",
    credit: "Greater London Crusade Choir, 1954"
  },

  // Order of service. "link" can point at a hymn id ("hymn:amazing-grace"),
  // a reading id ("reading:readings") or the tributes tab ("tab:tributes").
  programme: [
    { title: "Welcome & Opening Prayer", who: "Pastor Shawn Murphy" },
    { title: "Congregational Hymn", detail: "Amazing Grace", link: "hymn:amazing-grace", kind: "hymn" },
    { title: "Scriptures of Comfort & Peace", who: "Pastor Francis Duodu", kind: "reading" },
    { title: "Video Montage", detail: "I Can Only Imagine", kind: "music" },
    { title: "Scripture Reading from Grandchildren", detail: "John 14:1–4 · Revelation 21:1–7", link: "reading:readings", kind: "reading" },
    { title: "Congregational Hymn", detail: "Great Is Thy Faithfulness", link: "hymn:great-is-thy-faithfulness", kind: "hymn" },
    { title: "Tributes", people: ["Mrs. Amber Sharps (Daughter)", "Rev. Shawn Murphy (Son)"], link: "tab:tributes", kind: "tribute" },
    { title: "Special Song", detail: "Thank You for Giving to the Lord", kind: "music" },
    { title: "Tributes", people: ["Mr. Shawn Murphy Jr. (Grandchildren's Tribute)", "Mr. Edward Murphy (Husband)"], link: "tab:tributes", kind: "tribute" },
    { title: "Congregational Hymn", detail: "How Great Thou Art", link: "hymn:how-great-thou-art", kind: "hymn" },
    { title: "Eulogy", who: "Rev. Dwayne Saunders" },
    { title: "Family Gratitude & Closing Remarks", who: "Mrs. Amber Sharps" }
  ],

  // Hymns. Each verse is an array of lines. "refrain" shows after verse 1
  // and is marked so it can be sung after every verse.
  // pending: true -> lyrics not yet added; a notice shows instead.
  hymns: [
    {
      id: "amazing-grace",
      title: "Amazing Grace",
      author: "John Newton",
      verses: [
        ["Amazing grace! how sweet the sound", "That saved a wretch like me!", "I once was lost, but now am found,", "Was blind, but now I see."],
        ["'Twas grace that taught my heart to fear,", "And grace my fears relieved;", "How precious did that grace appear", "The hour I first believed!"],
        ["Through many dangers, toils and snares", "I have already come;", "'Tis grace hath brought me safe thus far,", "And grace will lead me home."],
        ["The Lord has promised good to me,", "His word my hope secures;", "He will my shield and portion be", "As long as life endures."],
        ["Yes, when this flesh and heart shall fail,", "And mortal life shall cease,", "I shall possess, within the veil,", "A life of joy and peace."],
        ["The earth shall soon dissolve like snow,", "The sun forbear to shine;", "But God, who called me here below,", "Will be forever mine."]
      ]
    },
    {
      id: "great-is-thy-faithfulness",
      title: "Great Is Thy Faithfulness",
      author: "Thomas O. Chisholm",
      pending: true,
      verseCount: 3,
      hasRefrain: true,
      verses: []
    },
    {
      id: "how-great-thou-art",
      title: "How Great Thou Art",
      author: "Stuart K. Hine",
      pending: true,
      verseCount: 4,
      hasRefrain: true,
      verses: []
    },
    {
      id: "to-god-be-the-glory",
      title: "To God Be the Glory",
      author: "Fanny J. Crosby",
      background: true,
      verses: [
        ["To God be the glory, great things He hath done;", "So loved He the world that He gave us His Son,", "Who yielded His life an atonement for sin,", "And opened the life-gate that all may go in."],
        ["O perfect redemption, the purchase of blood,", "To every believer the promise of God;", "The vilest offender who truly believes,", "That moment from Jesus a pardon receives."],
        ["Great things He hath taught us, great things He hath done,", "And great our rejoicing through Jesus the Son;", "But purer, and higher, and greater will be", "Our wonder, our transport, when Jesus we see."]
      ],
      refrain: ["Praise the Lord, praise the Lord,", "Let the earth hear His voice!", "Praise the Lord, praise the Lord,", "Let the people rejoice!", "O come to the Father, through Jesus the Son,", "And give Him the glory, great things He hath done."]
    }
  ],

  // Bible readings (King James Version)
  readings: [
    {
      ref: "John 14:1–4",
      verses: [
        "Let not your heart be troubled: ye believe in God, believe also in me.",
        "In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you.",
        "And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also.",
        "And whither I go ye know, and the way ye know."
      ],
      start: 1
    },
    {
      ref: "Revelation 21:1–7",
      verses: [
        "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea.",
        "And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband.",
        "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God.",
        "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
        "And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful.",
        "And he said unto me, It is done. I am Alpha and Omega, the beginning and the end. I will give unto him that is athirst of the fountain of the water of life freely.",
        "He that overcometh shall inherit all things; and I will be his God, and he shall be my son."
      ],
      start: 1
    }
  ],

  // Key moments shown as a timeline on the Home tab
  timeline: [
    { year: "1943", text: "Born on May 14th in Baltimore, Maryland" },
    { year: "1961", text: "Graduated from Eastern High School" },
    { year: "1963", text: "Married the love of her life, Edward J. “Ted” Murphy, on February 2nd" },
    { year: "62 yrs", text: "Of committed, loving, giving and serving marriage" },
    { year: "2025", text: "Went peacefully into the arms of her Saviour on September 19th" }
  ],

  biography: [
    "Niala Virginia Murphy (née Mervis) was born on May 14, 1943 in Baltimore, Maryland, and went peacefully into the arms of her Saviour Jesus on September 19, 2025.",
    "Niala attended and graduated from Eastern High School in 1961, and spent a short time at Baltimore Junior College studying early childhood development. As a child she loved to read, listen to music, dance and learn about history. She loved going to museums, long drives with family, and simply spending time with her friends and family.",
    "Niala was very sociable and enjoyed the company of others. She never knew a stranger, because she loved getting to know people whoever and wherever they were. Niala would engage in conversation with anyone she met.",
    "Niala met the love of her life, her husband Edward J. Murphy (Ted), and they were married on February 2, 1963. They spent 62 committed, loving, giving and serving years together making memories. Everyone who knew Niala knew that her family was one of the most important things in her life. She unconditionally gave her love, time and energy to them, always making sure they felt loved.",
    "Niala had one son, Shawn J. Murphy Sr. (Mary Jane), one daughter, Amber N. Murphy Sharps (Randy), and one “son”, Dwayne Saunders. She had one stepbrother, Kerry Garber (Maureen), and one very special “sister”, a childhood friend who became her best friend, Donna McManus.",
    "Niala had 5 grandchildren: Shawn Jr. (Samantha), Joshua (Alyssa), Bethany (Alex), Edward (Marissa) and Charity (Max), and 2 great-grandchildren: Isabella (Bella) Rose and Aliah Love. Niala now has 7 grandchildren and 2 great-grandchildren in Heaven that she has probably not let go of since she arrived. She had nieces, nephews, godchildren and cousins who were special to her. Niala was preceded in death by her loving mother, Ida Garber, and stepfather, Raymond J. Garber.",
    "Niala found something else that was special to her: her relationship with her Saviour Jesus. She was a former member of The Methodist Church, Emmanuel Lutheran and Calvary Assembly of God, and was a member of Calvary Chapel International Worship Center in Severn, MD, where her son is Senior Pastor.",
    "Niala loved children. She taught Sunday School, was head of the Children's Ministry, led the Women's Ministry, served as a Deaconess, assisted with various church outreaches, and was the Church and Pastor's secretary. She had a special place in her heart for the homeless and those in nursing homes.",
    "Niala knew the true meaning of giving and gave to everyone she thought needed assistance. She enjoyed travelling, shopping, finding new adventures, and living life with her husband, family and friends. She left a legacy of love and many happy memories that will live on in the hearts of all who called her Daughter, Wife, Mother, Mother-in-Law, Grandmother, Great-Grandmother, Godmother, Aunt, Cousin, Sister and Friend."
  ],
  biographyClosing: "Well done, thou good and faithful servant. Enter into the joy of your rest!",

  // Tributes read during the service. Paste the family's words into "text".
  familyTributes: [
    { name: "Mrs. Amber Sharps", relation: "Daughter", text: "" },
    { name: "Rev. Shawn Murphy", relation: "Son", text: "" },
    { name: "Mr. Shawn Murphy Jr.", relation: "On behalf of the grandchildren", text: "" },
    { name: "Mr. Edward Murphy", relation: "Husband", text: "" }
  ],

  // Options shown in the "How did you know her?" field
  relationOptions: ["Family", "Friend", "Church family", "Neighbour", "Colleague", "Other"],

  gallery: [
    { src: "assets/photos/photo-05.jpg", alt: "Niala smiling in a white shawl" },
    { src: "assets/photos/photo-07.jpg", alt: "Niala with her husband in a studio portrait" },
    { src: "assets/photos/photo-11.jpg", alt: "Niala in white beside her husband" },
    { src: "assets/photos/photo-01.jpg", alt: "Niala with family at home" },
    { src: "assets/photos/photo-04.jpg", alt: "A cherished portrait of Niala and her husband" },
    { src: "assets/photos/photo-02.jpg", alt: "A family gathering around the table" },
    { src: "assets/photos/photo-03.jpg", alt: "Niala embracing a loved one" },
    { src: "assets/photos/photo-08.jpg", alt: "A large family celebration" },
    { src: "assets/photos/photo-06.jpg", alt: "Niala with two loved ones" },
    { src: "assets/photos/photo-09.jpg", alt: "Niala with family" },
    { src: "assets/photos/photo-10.jpg", alt: "Niala sharing a warm hug" }
  ],

  appreciation: {
    image: "assets/photos/cross-sunset.jpg",
    paragraphs: [
      "The Murphy family would like to express our sincere and profound gratitude to all of our extended family, friends and church families who have expressed their love and comfort during this time. Your calls, messages, cards and meals have blessed us beyond what words could express.",
      "We thank you for attending today to celebrate the life and memory of our grandmother, mom and wife. We love and appreciate each one of you!"
    ],
    closing: "We hold our memories dear, until we meet again!",
    signature: "Love, The Murphy Family"
  }
};
