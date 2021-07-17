export const CLUB_TRAITS = {
  PERMANENCE: "permanence",
  HOURS: "hours",
  CEILINGS: "ceilings",
  FLOORING: "flooring",
  LIGHTING: "lighting",
  COURT_SIZE: "court-size",
  BARRIERS: "barriers",
  GROUP_TRAINING: "group-training",
  PRIVATE_COACHING: "private-coaching",
  PRO_COACHES: "pro-coaches",
  COMPETITIVE_LEVEL: "competitive-level",
  TOURNAMENTS: "usatt-tournaments",
  PRO_TABLES: "pro-tables",
  WEATHER_CONTROL: "weather-control",
  ACCESSIBILITY: "accessibility",
  MAINTENANCE: "maintenance",
};

const CT = CLUB_TRAITS;

export const TRAIT_DATA = {
  [CT.PERMANENCE]: {
    color: "blue",
    name: "Permanent Location",
    options: {
      0: "Multipurpose space.",
      1: "A section of the facility is always dedicated to table tennis.",
      2: "The entire facility is always dedicated to table tennis.",
    },
  },
  [CT.HOURS]: {
    color: "pink",
    name: "Open 5+ Days a Week",
    options: {
      0: "There are no designated and reliable hours for table tennis.",
      1: "There are designated and reliable hours for table tennis a few times a week.",
      2: "The club is open 5-7 days a week with reliable hours.",
    },
  },
  [CT.CEILINGS]: {
    color: "yellow",
    name: "High Ceilings",
    options: {
      0: "The low ceilings do not allow for high balls.",
      1: "The ceilings are high enough for low lobs.",
      2: "The ceilings are high enough that most lobs will be unimpeded.",
    },
  },
  [CT.FLOORING]: {
    color: "yellow",
    name: "Pro Flooring",
    options: {
      0: "There is no rubberized flooring on most tables.",
      1: "There is rubberized flooring on most tables but not professional quality.",
      2: "There is professional quality rubberized flooring at most tables.",
    },
  },
  [CT.LIGHTING]: {
    color: "yellow",
    name: "Pro Flooring",
    options: {
      0: "The courts are not well lit; it might be hard to see the ball clearly.",
      1: "The courts have good enough lighting for amateur play.",
      2: "The courts have excellent, professional-level lighting.",
    },
  },
  [CT.COURT_SIZE]: {
    color: "yellow",
    name: "Pro-Sized Courts",
    options: {
      0: "The courts are too small for most competitive play.",
      1: "The courts are large enough for most amateurs, but not for professional play.",
      2: "The courts are large enough for professional play.",
    },
  },
  [CT.BARRIERS]: {
    color: "yellow",
    name: "Complete Court Barriers",
    options: {
      0: "There are few or no barriers around courts.",
      1: "Most courts are surrounded by barriers, but they are not completely effective.",
      2: "Most courts are completely surrounded by effective barriers.",
    },
  },
  [CT.GROUP_TRAINING]: {
    color: "yellow",
    name: "Regular Group Training",
    options: {
      0: "There are no group training classes available.",
      1: "There are sometimes group training classes available, but they are irregular or infrequent.",
      2: "There are regular group training classes available, at least once a week.",
    },
  },
  [CT.PRIVATE_COACHING]: {
    color: "yellow",
    name: "Private Coaching",
    options: {
      0: "There is no private coaching available.",
      1: "There is private coaching available but it is on a per-individual basis.",
      2: "Anyone can easily book private coaching through the club.",
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
      2: "On most days, there will be many advanced competitive players at this club.",
    },
  },
  [CT.TOURNAMENTS]: {
    color: "yellow",
    name: "Official Tournaments",
    options: {
      0: "There are no regular tournaments and/or league play.",
      1: "There are regular, unofficial tournaments and/or league play.",
      2: "There are regular, official tournaments.",
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
      0: "This club is often too uncomfortable to play at due to weather.",
      1: "This club is sometimes uncomfortable to play at due to weather.",
      2: "This club (almost) always maintains comfortable playing conditions.",
    },
  },
  [CT.ACCESSIBILITY]: {
    color: "yellow",
    name: "Accessible",
    options: {
      0: "This club is inaccessible to disabled folks.",
      1: "This club is mostly but not completely accessible to disabled folks.",
      2: "This club is accessible in all functions to disabled folks.",
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
