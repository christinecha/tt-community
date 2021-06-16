const ttClubs = require("../data/tt-clubs");
const fs = require("fs");
const path = require("path");
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

const mapData = {};

const promises = ttClubs.map((club) => {
  if (!club.googlePlaceId) return Promise.resolve();

  return client
    .geocode({
      params: {
        place_id: club.googlePlaceId,
        key: "AIzaSyA-Tg-VBzTQ0sgZtJpNv43IltvDH0f7zPQ",
      },
    })
    .then((res) => {
      const data = res.data || {};
      const result = data.results[0];
      if (result) {
        const position = result.geometry.location;

        mapData[club.id] = {
          lat: position.lat,
          lng: position.lng,
        };
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data.error_message);
        return;
      }

      console.log("Err", err);
    });
});

Promise.all(promises).then(() => {
  fs.writeFileSync(
    path.resolve(__dirname, "../data/map-data.json"),
    JSON.stringify(mapData, null, 2)
  );
});
