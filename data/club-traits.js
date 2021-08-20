const CLUB_TRAITS = {
  PERMANENCE: "permanence",
  HOURS: "hours",
  CLUB_SIZE: "club-size",
  CEILINGS: "ceilings",
  FLOORING: "flooring",
  LIGHTING: "lighting",
  COURT_SIZE: "court-size",
  BARRIERS: "barriers",
  GROUP_TRAINING: "group-training",
  WALKINS: "WALKINS",
  PRO_COACHES: "pro-coaches",
  COMPETITIVE_LEVEL: "competitive-level",
  TOURNAMENTS: "usatt-tournaments",
  PRO_TABLES: "pro-tables",
  WEATHER_CONTROL: "weather-control",
  ACCESSIBILITY: "accessibility",
  MAINTENANCE: "maintenance",
};

const CT = CLUB_TRAITS;

const TRAIT_DATA = {
  [CT.PERMANENCE]: {
    color: "blue",
    name: "Permanence",
    options: {
      0: "Multipurpose space.",
      1: "A section of the facility is always dedicated to table tennis.",
      2: "The entire facility is always dedicated to table tennis.",
    },
  },
  [CT.HOURS]: {
    color: "pink",
    name: "Hours",
    options: {
      0: "There are limited hours (not designated, or only once a week).",
      1: "There are reliable hours for table tennis more than once a week.",
      2: "The club is open 5-7 days a week with reliable hours.",
    },
  },
  [CT.CLUB_SIZE]: {
    name: "Club Size",
    options: {
      0: "There are only 1-4 tables at this location.",
      1: "There are 5-10 tables at this location.",
      2: "There are more than 10 tables at this location",
    },
  },
  [CT.CEILINGS]: {
    color: "yellow",
    name: "High Ceilings",
    options: {
      0: "The low ceilings do not allow for high balls.",
      1: "The ceilings are high enough for most competitive players.",
      2: "The ceilings are high enough for professional matches",
    },
  },
  [CT.FLOORING]: {
    color: "yellow",
    name: "Pro Flooring",
    options: {
      0: "There is no sport flooring.",
      1: "There is rubberized flooring on some tables.",
      2: "There is professional quality rubberized flooring at most tables.",
    },
  },
  [CT.LIGHTING]: {
    color: "yellow",
    name: "Pro Lighting",
    options: {
      0: "The courts are not well lit; it might be hard to see the ball clearly.",
      1: "The courts have good enough lighting for most competitive players.",
      2: "The courts have excellent, professional-level lighting.",
    },
  },
  [CT.COURT_SIZE]: {
    color: "yellow",
    name: "Pro-Sized Courts",
    options: {
      0: "Most courts are too small for advanced competitive play.",
      1: "Most courts are large enough for advanced competitive play.",
      2: "Most courts are large enough for advanced competitive play; some are large enough for professional matches.",
    },
  },
  [CT.BARRIERS]: {
    color: "yellow",
    name: "Complete Court Barriers",
    options: {
      0: "There are few or no barriers available.",
      1: "There are some barriers separating most playing areas.",
      2: "There are enough barriers available to completely surround most courts.",
    },
  },
  [CT.GROUP_TRAINING]: {
    color: "yellow",
    name: "Regular Group Training",
    options: {
      0: "There are no group training opportunities available.",
      1: "There are sometimes group training opportunities available, but they are irregular or infrequent.",
      2: "There are regular group training opportunities available, at least once a week.",
    },
  },
  [CT.WALKINS]: {
    color: "yellow",
    name: "Walk-in Friendly",
    options: {
      0: "This club is private and/or does not allow non-members.",
      1: "No membership required to play but you need to contact the club or reserve a time in advance.",
      2: "No membership required to play; walk-ins welcome.",
    },
  },
  [CT.PRO_COACHES]: {
    color: "yellow",
    name: "Pro Coaches",
    options: {
      0: "There are no professional coaches available.",
      1: "There are professional coaches up to a regional level.",
      2: "There are professional coaches up to a national or international level.",
    },
  },
  [CT.COMPETITIVE_LEVEL]: {
    color: "yellow",
    name: "High Competitive Level",
    options: {
      0: "There are no or very few advanced competitive players who play here regularly.",
      1: "There are advanced competitive players who play here regularly.",
      2: "On most days, there are many advanced competitive players at this club.",
    },
  },
  [CT.TOURNAMENTS]: {
    color: "yellow",
    name: "Official Tournaments",
    options: {
      0: "There are no regular tournaments and/or league play.",
      1: "There are regularly organized tournaments and/or league play.",
      2: "There are regularly organized nationally-sanctioned tournaments.",
    },
  },
  [CT.PRO_TABLES]: {
    color: "yellow",
    name: "Table Quality",
    options: {
      0: "The tables are not of competition-level quality or condition.",
      1: "The tables are of good enough quality and condition for advanced amateur competition.",
      2: "The tables are of professional quality and condition.",
    },
  },
  [CT.WEATHER_CONTROL]: {
    color: "yellow",
    name: "Temperature Control",
    options: {
      0: "There is no or limited climate control at this club.",
      1: "There is some climate control at this club.",
      2: "This club almost always maintains comfortable playing conditions.",
    },
  },
  [CT.ACCESSIBILITY]: {
    color: "yellow",
    name: "Wheelchair Accessibility",
    options: {
      0: "This club is not wheelchair-accessible.",
      1: "Club entry is wheelchair-accessible but there are some primary areas (courts, restrooms, etc.) that are not.",
      2: "This club is fully wheelchair-accessible.",
    },
  },
  [CT.MAINTENANCE]: {
    color: "yellow",
    name: "Clean & well-maintained",
    options: {
      0: "This club is minimally maintained or cleaned.",
      1: "This club is regularly maintained and cleaned to satisfactory conditions.",
      2: "This club employs professional cleaning & maintenance staff to keep things in excellent condition.",
    },
  },
};

module.exports = {
  CLUB_TRAITS,
  TRAIT_DATA,
};
