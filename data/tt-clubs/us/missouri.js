const { CLUB_TRAITS: CT } = require("../../club-traits");

module.exports = [
  {
    name: "Kansas City Table Tennis",
    id: "kansas-city-tt",
    address:
      "Saint Catherine of Sienna Parish\n4101 E. 105th Terrace\nKansas City, MO 64137",
    phone: "(816)-769-3279",
    visited: false,
    website: "https://www.kansascitytabletennis.com/",
    lat: 38.934245265878076,
    lng: -94.54264568685733,
    pricePerDay: "$7",
    images: [
      "https://www.kansascitytabletennis.com/wp-content/uploads/2021/06/saint-catherine-gym2.jpg",
    ],
    traits: {
      [CT.PERMANENCE]: 0,
      [CT.HOURS]: 1,
      [CT.CLUB_SIZE]: 2,
      [CT.CEILINGS]: 2,
      [CT.FLOORING]: 0,
      [CT.LIGHTING]: 2,
      [CT.COURT_SIZE]: 1,
      [CT.BARRIERS]: 1,
      [CT.GROUP_TRAINING]: 0,
      [CT.WALKINS]: 2,
      [CT.PRO_COACHES]: 1,
      [CT.COMPETITIVE_LEVEL]: undefined,
      [CT.TOURNAMENTS]: undefined,
      [CT.PRO_TABLES]: 1,
      [CT.WEATHER_CONTROL]: undefined,
      [CT.ACCESSIBILITY]: undefined,
    },
  },
];
