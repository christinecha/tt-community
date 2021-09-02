const { CLUB_TRAITS: CT } = require("../../club-traits");
const alabama = require("./alabama");
const california = require("./california");
const hawaii = require("./hawaii");
const new_york = require("./new_york");
const georgia = require("./georgia");
const massachusetts = require("./massachusetts");
const illinois = require("./illinois");
const alaska = require("./alaska");
const florida = require("./florida");
const new_jersey = require("./new_jersey");
const colorado = require("./colorado");
const north_carolina = require("./north_carolina");
const virginia = require("./virginia");
const ohio = require("./ohio");
const rhode_island = require("./rhode_island");
const oregon = require("./oregon");
const arizona = require("./arizona");
const maryland = require("./maryland");

module.exports = [
  ...alaska,
  ...alabama,
  ...arizona,
  ...california,
  ...hawaii,
  ...new_york,
  ...georgia,
  ...massachusetts,
  ...illinois,
  ...florida,
  ...maryland,
  ...new_jersey,

  // {
  //   name: "Malmö Arena Sports Complex",
  //   id: "malmo-arena",
  //   location: "Malmo",
  //   type: "Gymnasium",
  //   tags: "Table Reservations",
  //   pricePerDay: "",
  //   address: "",
  //   website: "",
  //   notes: "",
  //   attachments: "",
  //   lastModified: "6/27/2019 7:37pm",
  // },

  {
    name: "SPiN DC",
    id: "spin-dc",
    location: "Washington",
    type: "Bar",
    tags: "Table Reservations,Casual Play,League Play,Coaching Available",
    pricePerDay: "$9",
    address: "1332 F St NW, Washington, DC 20045",
    website: "https://wearespin.com/location/washington-dc/",
    notes: "",
    attachments: "",
    lastModified: "9/5/2019 5:58pm",
    visited: true,
    lat: 38.89740417866915,
    lng: -77.03100508662774,
  },
  {
    name: "SPiN Philadelphia",
    id: "spin-philadelphia",
    location: "Philadelphia",
    type: "Bar",
    tags: "Casual Play,Table Reservations,Coaching Available",
    pricePerDay: "$9",
    address: "211 S 15th St, Philadelphia, PA 19102",
    website: "https://wearespin.com/location/philadelphia/",
    notes: "",
    attachments: "",
    lastModified: "9/5/2019 6:00pm",
    visited: true,
    lat: 39.9493021271359,
    lng: -75.16594647310632,
  },
  ...oregon,
  ...rhode_island,
  ...ohio,
  ...north_carolina,
  ...virginia,
  ...colorado,
];
