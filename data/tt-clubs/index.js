const { CLUB_TRAITS } = require("../club-traits");
const denmark = require("./denmark");
const ecuador = require("./ecuador");
const us = require("./us");

const getClubScore = (club) => {
  if (!club.traits) return undefined;

  const num_traits = Object.keys(CLUB_TRAITS).length;
  const sum = Object.values(club.traits).reduce((sum, n) => sum + (n || 0), 0);

  return sum / num_traits / 2;
};

const clubs = [
  ...denmark.map((c) => ({ ...c, country: "Denmark" })),
  ...ecuador.map((c) => ({ ...c, country: "Ecuador" })),
  ...us.map((c) => ({ ...c, country: "United States" })),
];

const expandedClubs = [];

clubs.forEach((club) => {
  if (!club.locations) {
    expandedClubs.push(club);
    return;
  }

  club.locations.forEach((l) => {
    expandedClubs.push({
      ...club,
      ...l,
    });
  });
});

module.exports = expandedClubs.map((club) => ({
  ...club,
  score: getClubScore(club),
}));
