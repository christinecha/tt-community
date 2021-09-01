const { CLUB_TRAITS: CT } = require("../../club-traits");

module.exports = [
  {
    name: "Samson Dubina Table Tennis Academy",
    id: "samson-dubina",
    type: "Training Center",
    address: "2262 S Arlington Rd, Akron, OH 44319",
    phone: "+13309499230",
    visited: false,
    website: "https://samsondubina.com/",
    lat: 41.01108833362306,
    lng: -81.49204438517026,
    images: ["https://i.ytimg.com/vi/bjAU4RdfC6c/maxresdefault.jpg"],
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
      [CT.PRO_COACHES]: 2,
      [CT.COMPETITIVE_LEVEL]: 2,
      [CT.TOURNAMENTS]: 2,
      [CT.PRO_TABLES]: 2,
      [CT.WEATHER_CONTROL]: 2,
      [CT.ACCESSIBILITY]: undefined,
      [CT.MAINTENANCE]: 2,
    },
  },
  {
    name: "Columbus Table Tennis Club",
    id: "columbus-ttc",
    type: "Training Center",
    address: "653 E 8th Ave, Columbus, OH 43201",
    phone: "+16149738584",
    visited: false,
    website: "https://www.columbustabletennisclub.org/",
    lat: 40.01143654354449,
    lng: -82.9926199165601,
    traits: {
      [CT.PERMANENCE]: 2,
      [CT.HOURS]: 2,
      [CT.CLUB_SIZE]: 2,
      [CT.CEILINGS]: 2,
      [CT.FLOORING]: 2,
      [CT.LIGHTING]: 2,
      [CT.COURT_SIZE]: 2,
      [CT.BARRIERS]: 2,
      [CT.GROUP_TRAINING]: undefined,
      [CT.WALKINS]: 2,
      [CT.PRO_COACHES]: undefined,
      [CT.COMPETITIVE_LEVEL]: undefined,
      [CT.TOURNAMENTS]: 1,
      [CT.PRO_TABLES]: 2,
      [CT.WEATHER_CONTROL]: 2,
      [CT.ACCESSIBILITY]: undefined,
      [CT.MAINTENANCE]: 2,
    },
  },
  {
    name: "Spin & Smash Table Tennis & Ping Pong Center",
    id: "spin-smash-columbus",
    type: "Training Center",
    address: "2192 N Wilson Rd, Columbus, OH 43228",
    phone: "+16148698219",
    visited: false,
    website: "https://spinandsmash.com/",
    lat: 40.01653067366695,
    lng: -83.1176639272065,
  },
];
