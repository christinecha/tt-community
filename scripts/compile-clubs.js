const { CLUB_TRAITS } = require("../data/club-traits");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const TT_CLUBS_DIR = path.resolve(__dirname, "../data/tt-clubs");

const getClubScore = (club) => {
  if (!club.traits) return null;

  const num_traits = Object.keys(CLUB_TRAITS).length;
  const sum = Object.values(club.traits).reduce((sum, n) => sum + (n || 0), 0);

  return sum / num_traits / 2;
};

glob("data/tt-clubs/!(dist)/*.json", (err, files) => {
  let allClubs = [];

  if (err) {
    throw err;
  }

  files.forEach((file) => {
    const content = fs.readFileSync(file, { encoding: "utf8" });

    let clubs;
    try {
      clubs = JSON.parse(content);
    } catch (err) {
      console.log(`Error parsing ${file}: ${err}`);
      return;
    }
    allClubs = [...allClubs, ...clubs];
  });

  const expandedClubs = [];
  allClubs.forEach((club) => {
    if (!club.locations) {
      expandedClubs.push({
        ...club,
        score: getClubScore(club),
      });
      return;
    }

    club.locations.forEach((l) => {
      const location = {
        ...club,
        ...l,
      };
      expandedClubs.push({
        ...location,
        score: getClubScore(location),
      });
    });
  });

  if (!fs.existsSync(path.resolve(TT_CLUBS_DIR, "dist"))) {
    fs.mkdirSync(path.resolve(TT_CLUBS_DIR, "dist"));
  }

  fs.writeFileSync(
    path.resolve(TT_CLUBS_DIR, "dist/all-clubs.json"),
    JSON.stringify(expandedClubs),
    {
      encoding: "utf8",
    }
  );
});
