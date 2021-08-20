const { CLUB_TRAITS } = require("../club-traits");
const denmark = require("./denmark");
const ecuador = require("./ecuador");
const germany = require("./germany");
const hong_kong = require("./hong-kong");
const south_korea = require("./south-korea");
const spain = require("./spain");
const switzerland = require("./switzerland");
const us = require("./us");
const vietnam = require("./vietnam");

const getClubScore = (club) => {
  if (!club.traits) return undefined;

  const num_traits = Object.keys(CLUB_TRAITS).length;
  const sum = Object.values(club.traits).reduce((sum, n) => sum + (n || 0), 0);

  return sum / num_traits / 2;
};

const clubs = [
  ...denmark.map((c) => ({ ...c, country: "Denmark" })),
  ...ecuador.map((c) => ({ ...c, country: "Ecuador" })),
  ...germany.map((c) => ({ ...c, country: "Germany" })),
  ...hong_kong.map((c) => ({ ...c, country: "Hong Kong" })),
  ...south_korea.map((c) => ({ ...c, country: "South Korea" })),
  ...us.map((c) => ({ ...c, country: "United States" })),
  ...vietnam.map((c) => ({ ...c, country: "Vietnam" })),
  ...spain.map((c) => ({ ...c, country: "Spain" })),
  ...switzerland.map((c) => ({ ...c, country: "Switzerland" })),
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
