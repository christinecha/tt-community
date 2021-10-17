const { CLUB_TRAITS } = require("../data/club-traits");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const TT_CLUBS_DIR = path.resolve(__dirname, "../data/tt-clubs");
const LOCATION_DATA_JSON = path.resolve(
  __dirname,
  "../data/location-data.json"
);

const getClubScore = (club) => {
  if (!club.traits) return null;

  const num_traits = Object.keys(CLUB_TRAITS).length;
  const sum = Object.values(club.traits).reduce((sum, n) => sum + (n || 0), 0);

  return sum / num_traits / 2;
};

const addLocaleData = (clubs) => {
  /* Add location data */
  let locations;
  try {
    locations = JSON.parse(
      fs.readFileSync(LOCATION_DATA_JSON, {
        encoding: "utf8",
      })
    );
  } catch (err) {
    throw `Error parsing location data: ${err}`;
  }

  return clubs.map((club) => {
    const relativePath = path
      .relative(TT_CLUBS_DIR, club.filepath)
      .replace(".json", "");
    const parts = relativePath.split("/");
    let locales = [];
    parts.forEach((part) => {
      const last = locales[locales.length - 1];
      const options = last ? last.locations : locations;
      const locale = (options || []).find((o) => o.id === part);
      if (locale) {
        locales.push(locale);
      }
    });

    const withLocales = { ...club };
    locales.forEach((l) => (withLocales[l.type] = l.name));

    return withLocales;
  });
};

glob(
  "data/tt-clubs/**/*.json",
  { ignore: "data/tt-clubs/dist/**" },
  (err, files) => {
    let allClubs = [];

    if (err) {
      throw err;
    }

    files.forEach((file) => {
      const content = fs.readFileSync(file, { encoding: "utf8" });

      let clubs;
      try {
        clubs = JSON.parse(content).map((club) => ({
          ...club,
          filepath: file,
        }));
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

    /* Add location data */
    const withLocationData = addLocaleData(expandedClubs);

    if (!fs.existsSync(path.resolve(TT_CLUBS_DIR, "dist"))) {
      fs.mkdirSync(path.resolve(TT_CLUBS_DIR, "dist"));
    }

    fs.writeFileSync(
      path.resolve(TT_CLUBS_DIR, "dist/all-clubs.json"),
      JSON.stringify(withLocationData),
      {
        encoding: "utf8",
      }
    );
  }
);
