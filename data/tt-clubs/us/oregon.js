const { CLUB_TRAITS: CT } = require("../../club-traits");

module.exports = [
  {
    name: "Paddle Palace Club",
    id: "paddle-palace-club",
    address: "12230 SW Main St, Suite B\nTigard, OR 97223",
    phone: "+15035496292",
    visited: true,
    website: "https://www.paddlepalaceclub.com/",
    facebook: "https://www.facebook.com/PaddlePalaceClub/",
    pricePerDay: "$12",
    lat: 45.43123614910387,
    lng: -122.76937887293857,
    images: [
      "https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/217040610_1892878957541255_5008024683196658870_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=e3f864&_nc_ohc=euzgOW5C2eoAX96O6C1&_nc_ht=scontent-lga3-1.xx&oh=c5e7a23ffe3ece0454ba3b314155e9da&oe=615C8A8C",
      "https://blog.paddlepalace.com/wp-content/uploads/2018/02/27072796_918636534965507_5098531900377821164_n.jpg",
    ],
    traits: {
      [CT.PERMANENCE]: 2,
      [CT.HOURS]: 2,
      [CT.CLUB_SIZE]: 2,
      [CT.CEILINGS]: 2,
      [CT.FLOORING]: 2,
      [CT.LIGHTING]: 2,
      [CT.COURT_SIZE]: 2,
      [CT.BARRIERS]: 2,
      [CT.GROUP_TRAINING]: 2,
      [CT.WALKINS]: 2,
      [CT.PRO_COACHES]: 1,
      [CT.COMPETITIVE_LEVEL]: 1,
      [CT.TOURNAMENTS]: 2,
      [CT.PRO_TABLES]: 2,
      [CT.WEATHER_CONTROL]: 2,
      [CT.ACCESSIBILITY]: 2,
    },
  },
];
