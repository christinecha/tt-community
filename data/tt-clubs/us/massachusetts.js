const { CLUB_TRAITS: CT } = require("../../club-traits");

module.exports = [
  {
    name: "Boston Table Tennis Center",
    id: "boston-ttc",
    location: "Boston",
    type: "Training Center",
    tags: "Good for Practice Matches,Good for Training",
    pricePerDay: "",
    address: "407R Mystic Ave # 19D\nMedford, MA 02155",
    website: "https://www.bostonttc.us/",
    notes: "",
    attachments: "",
    lastModified: "6/27/2019 7:49pm",
    visited: true,
    lat: 42.40224673903118,
    lng: -71.10023698652466,
  },
  {
    name: "Fitchburg-Leominster Table Tennis Club",
    id: "fitchburg-ttc",
    type: "Training Center",
    address: "100 West St, Leominster, MA 01453",
    phone: "+19785017915",
    visited: false,
    quality: 2,
    website: "https://www.fitchburgttc.com/",
    lat: 42.527727025034956,
    lng: -71.76618680186581,
  },
  {
    name: "Westford Table Tennis Club",
    id: "westford-ttc",
    address: "22 Town Farm Rd, Westford, MA 01886",
    phone: "+16176695585",
    visited: false,
    website: "http://westfordtabletennis.com/",
    facebook: "https://www.facebook.com/coachqtt",
    lat: 42.58315105700431,
    lng: -71.482489761369,
    images: [
      "https://lh5.googleusercontent.com/p/AF1QipObycIAj6V0yWINn9Z0KteKyPZ2Q74RfHFnZESb=s773-k-no",
    ],
    traits: {
      [CT.PERMANENCE]: 2,
      [CT.HOURS]: 2,
      [CT.CLUB_SIZE]: 1,
      [CT.CEILINGS]: 2,
      [CT.FLOORING]: 2,
      [CT.LIGHTING]: 2,
      [CT.COURT_SIZE]: 2,
      [CT.BARRIERS]: 1,
      [CT.GROUP_TRAINING]: 1,
      [CT.WALKINS]: undefined,
      [CT.PRO_COACHES]: 2,
      [CT.COMPETITIVE_LEVEL]: undefined,
      [CT.TOURNAMENTS]: 2,
      [CT.PRO_TABLES]: 1,
      [CT.WEATHER_CONTROL]: 2,
      [CT.ACCESSIBILITY]: undefined,
    },
  },
  {
    name: "Zing! Table Tennis Center",
    id: "zing-ttc",
    type: "Training Center",
    address: "122 Pleasant St #111, Easthampton, MA 01027",
    phone: "+19785017915",
    visited: false,
    quality: 2,
    website: "https://zingtt.com/",
    lat: 42.27399675252936,
    lng: -72.66154927303731,
  },
  {
    name: "Massachusetts Table Tennis and Badminton Club",
    id: "massachusetts-ttbc",
    type: "Training Center,Tournament Venue",
    address: "104 Clematis Ave, Waltham, MA 02453",
    phone: "+17813739086",
    website: "https://www.mattbc.com/",
    lat: 42.38474092266342,
    lng: -71.19973621536145,
    visited: false,
  },
];
