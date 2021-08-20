const { CLUB_TRAITS: CT } = require("../../club-traits");
const california = require("./california");
const hawaii = require("./hawaii");
const new_york = require("./new_york");
const georgia = require("./georgia");
const massachusetts = require("./massachusetts");
const illinois = require("./illinois");
const florida = require("./florida");
const new_jersey = require("./new_jersey");
const colorado = require("./colorado");
const north_carolina = require("./north_carolina");
const virginia = require("./virginia");
const ohio = require("./ohio");
const rhode_island = require("./rhode_island");
const oregon = require("./oregon");

module.exports = [
  ...california,
  ...hawaii,
  ...new_york,
  ...georgia,
  ...massachusetts,
  ...illinois,
  ...florida,
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
    name: "Maryland Table Tennis Center",
    id: "mdttc",
    location: "Gaithersburg",
    type: "Training Center,Tournament Venue",
    tags: "Good for Training,League Play,Coaching Available,Training Camp,Good for Practice Matches",
    pricePerDay: "$10",
    address: "18761 N Frederick Ave\nGaithersburg, MD 20879",
    website: "https://mdttc.com/",
    notes:
      "Drivers, be warned - this club is pretty hard to find! It's located inside a mixed-use complex, so you have to keep an eye out for these tiny brown signs to lead you into the correct parking lot.\n\nMDTTC is a high quality training center. There are a lot of tables and a good amount of space at each one. In the few hours we spent there, we saw kids training, professional coaching, intermediate amateurs - the whole spectrum of table tennis levels. \n\nThere are two league nights - over 1000 and over 1800 - each weekend. We didn't get to play those, but it seems that there's usually a pretty solid showing. Maybe next time!",
    attachments:
      "Image 05 September 2019 05:18 PM.jpg (https://dl.airtable.com/.attachments/d1bea8e0a548f46a5b4d1d46ff02e16e/98389cee/Image05September20190518PM.jpg)",
    lastModified: "5/30/2021 11:26pm",
    lat: 39.16523842056648,
    lng: -77.2267826345088,
    quality: 8,
    visited: true,
  },

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
