const { CLUB_TRAITS: CT } = require("../club-traits");

module.exports = [
  {
    name: "Pinx Table Tennis Club",
    id: "pinx-ttc",
    address: "Kaluri tee 3\nHaabneeme\n74001 Harju maakond\nEstonia",
    website: "https://www.pinx.ee/",
    images: [
      "https://static.wixstatic.com/media/a356d2_7f4e4e06c3b94bdfa96924267b000816~mv2.jpeg/v1/fill/w_2846,h_1140,fp_0.50_0.50,q_90,usm_0.66_1.00_0.01/a356d2_7f4e4e06c3b94bdfa96924267b000816~mv2.webp",
    ],
    lat: 59.509952337170624,
    lng: 24.827225083188353,
    traits: {
      [CT.PERMANENCE]: 2,
      [CT.HOURS]: undefined,
      [CT.CLUB_SIZE]: 0,
      [CT.CEILINGS]: 0,
      [CT.FLOORING]: 2,
      [CT.LIGHTING]: 2,
      [CT.COURT_SIZE]: 1,
      [CT.BARRIERS]: 1,
      [CT.GROUP_TRAINING]: 0,
      [CT.WALKINS]: undefined,
      [CT.PRO_COACHES]: undefined,
      [CT.COMPETITIVE_LEVEL]: 2,
      [CT.TOURNAMENTS]: 2,
      [CT.PRO_TABLES]: 2,
      [CT.WEATHER_CONTROL]: undefined,
      [CT.ACCESSIBILITY]: undefined,
    },
  },
];
