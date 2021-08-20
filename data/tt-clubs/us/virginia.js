const { CLUB_TRAITS: CT } = require("../../club-traits");

module.exports = [
  {
    name: "The West Salem Tennis Club",
    id: "west-salem-ttc",
    address: " 2645 W. Main St. Salem, VA",
    phone: "+15408645879",
    visited: false,
    notes:
      "The West Salem Tennis Club plays year round from 5:30 p.m. to midnight every Thursday at 2645 W. Main St. in Salem. All are welcome. For information, call Billy Marshall at (540) 389-3201.",
    website: "",
    email: "billymarshall@hotpop.com",
    lat: 37.28265571896715,
    lng: -80.10561594442984,
  },
  {
    name: "Northern Virginia Table Tennis Center",
    id: "nvttc",
    location: "Chantilly",
    type: "Training Center,Tournament Venue",
    tags: "Good for Practice Matches,Good for Training,League Play,Coaching Available,Casual Play",
    pricePerDay: "$10",
    address: "4264 C Entre Ct\nChantilly, VA 20151",
    website: "https://www.novattc.com/",
    notes:
      "Here's a little club tucked away on the northern edge of Virginia, just 20 minutes from the Maryland border. Great space per table.\n\nCoach Li and his daughter Jie run a strong community of players, with an active over-1800 league. There are only seven tables (one is for coaching) but you can definitely get some serious training.",
    attachments:
      "Image 02 September 2019 01:09 PM.jpg (https://dl.airtable.com/.attachments/5e67f2297303d4369405b08b29dd13b0/f043ddcd/Image02September20190109PM.jpg),Image 02 September 2019 01:09 PM.jpg (https://dl.airtable.com/.attachments/6969fe1f8e6d3f7f7ce546c0974f51d0/40992dee/Image02September20190109PM.jpg),Image 02 September 2019 01:09 PM.jpg (https://dl.airtable.com/.attachments/998d405422a17eac7dd8399d2f1a2f4e/0560fa2d/Image02September20190109PM.jpg)",
    lastModified: "5/30/2021 11:26pm",
    visited: true,
    quality: 6,
    lat: 38.88869110120753,
    lng: -77.43482798662792,
    traits: {
      [CT.PERMANENCE]: 2,
      [CT.HOURS]: 2,
      [CT.CEILINGS]: 2,
      [CT.FLOORING]: 2,
      [CT.LIGHTING]: 1,
      [CT.COURT_SIZE]: 1,
      [CT.BARRIERS]: 1,
      [CT.GROUP_TRAINING]: 1,
      [CT.WALKINS]: 2,
      [CT.PRO_COACHES]: 2,
      [CT.COMPETITIVE_LEVEL]: 2,
      [CT.TOURNAMENTS]: 2,
      [CT.PRO_TABLES]: 2,
      [CT.WEATHER_CONTROL]: 1,
      [CT.ACCESSIBILITY]: 2,
      [CT.MAINTENANCE]: 2,
    },
  },
];
