const CLUB_TRAITS = {
  PERMANENCE: "_permanence",
  HOURS: "_hours",
  CLUB_SIZE: "_club_size",
  CEILINGS: "_ceiling_height",
  FLOORING: "_flooring",
  LIGHTING: "_lighting",
  COURT_SIZE: "_court_size",
  BARRIERS: "_barriers",
  GROUP_TRAINING: "_group_training",
  WALKINS: "_walkin_friendly",
  PRO_COACHES: "_pro_coaches",
  TOURNAMENTS: "_tournaments",
  PRO_TABLES: "_table_quality",
  WEATHER_CONTROL: "_climate_control",
  ACCESSIBILITY: "_accessibility",
};

const CT = CLUB_TRAITS;

const TRAIT_DATA = {
  _permanence: {
    color: "blue",
    name: "Permanence",
    options: {
      0: "The facility is a multipurpose space (gymnasium, recreation center, etc).",
      1: "A section of the facility is always dedicated to table tennis.",
      2: "The majority of this facility is always dedicated to table tennis.",
    },
  },
  _hours: {
    color: "pink",
    name: "Hours",
    options: {
      0: "There are limited hours (not designated, or only once a week).",
      1: "There are reliable hours for table tennis more than once a week.",
      2: "The club is open 5-7 days a week with reliable hours.",
    },
  },
  _club_size: {
    name: "Club Size",
    options: {
      0: "There is space for 1-4 simultaneous, competitive matches at this location.",
      1: "There is space for 5-10 simultaneous, competitive matches at this location.",
      2: "There is space for more than 10 simultaneous, competitive matches at this location.",
    },
  },
  _ceiling_height: {
    color: "yellow",
    name: "Ceiling Height",
    options: {
      0: "The ceilings are not high enough for competitive play (lower than 3 meters).",
      1: "The ceilings are high enough for competitive play (3+ meters high).",
      2: "The ceilings are high enough for professional matches (5+ meters high).",
    },
  },
  _flooring: {
    color: "yellow",
    name: "Flooring",
    options: {
      0: "There is no rubberized flooring.",
      1: "There is rubberized flooring on some courts.",
      2: "There is rubberized flooring on a majority of the courts.",
    },
  },
  _lighting: {
    color: "yellow",
    name: "Lighting",
    options: {
      0: "The courts are not lit well enough for competitive play (under 300 lux).",
      1: "The courts are lit well enough for competitive play (300+ lux).",
      2: "The courts are lit well enough for professional matches (500+ lux).",
    },
  },
  _court_size: {
    color: "yellow",
    name: "Court Size",
    options: {
      0: "Most courts are too small for competitive play (under 28' x 13').",
      1: "Most courts are large enough for competitive play (at least 28' x 13').",
      2: "Most courts are large enough for competitive play (at least 28' x 13'); some are large enough for professional matches (at least 30' x 16'6\").",
    },
  },
  _barriers: {
    color: "yellow",
    name: "Court Barriers",
    options: {
      0: "There are few or no barriers separating courts.",
      1: "There are some barriers providing some separation between most courts.",
      2: "There are enough barriers to completely surround most courts.",
    },
  },
  _group_training: {
    color: "yellow",
    name: "Group Training",
    options: {
      0: "There are no regular group training programs available.",
      1: "There are some group training programs available for some demographics (beginners, kids, seniors, etc).",
      2: "There are at least two different regular, continous group training programs all year round.",
    },
  },
  _walkin_friendly: {
    color: "yellow",
    name: "Walk-in Friendly",
    options: {
      0: "This club is private and/or does not allow non-members.",
      1: "No membership required to play but you need to contact the club or reserve a time in advance.",
      2: "No membership required to play; walk-ins welcome.",
    },
  },
  _pro_coaches: {
    color: "yellow",
    name: "Pro Coaches",
    options: {
      0: "There are no professional coaches available.",
      1: "There are professional, regional-level coaches available.",
      2: "There are professional, national- or international-level coaches available.",
    },
  },
  _tournaments: {
    color: "yellow",
    name: "Tournaments & Leagues",
    options: {
      0: "There are no regularly organized tournaments and/or leagues.",
      1: "There are regularly organized tournaments and/or leagues.",
      2: "There are regularly organized nationally-sanctioned tournaments.",
    },
  },
  _table_quality: {
    color: "yellow",
    name: "Table Quality",
    options: {
      0: 'Most tables are not made for competitive play - less than 18mm (~3/4") thick.',
      1: 'Most tables are good enough for competitive play - at least 18mm (~3/4") thick.',
      2: 'Most tables are good enough for competitive play - at least 18mm (~3/4") thick. Some are good enough for professional matches - 25mm (~1") thick and made from one continuous sheet (not foldable).',
    },
  },
  _climate_control: {
    color: "yellow",
    name: "Climate Control",
    options: {
      0: "There is no climate control (air conditioning, heating) at this club.",
      1: "There is some climate control (air conditioning, heating) at this club but it may be insufficient at times.",
      2: "This club uses climate control to almost always maintain comfortable playing conditions (~15-20°C or ~60-70°F).",
    },
  },
  _accessibility: {
    color: "yellow",
    name: "Wheelchair Accessibility",
    options: {
      0: "Some or all of this club's primary areas (entry, courts, restrooms) are not wheelchair-accessible.",
      1: "This club's primary areas are wheelchair-accessible.",
      2: "This club is designed for full wheelchair accessibility.",
    },
  },
};

module.exports = {
  CLUB_TRAITS,
  TRAIT_DATA,
};
