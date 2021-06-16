/** @jsx jsx */

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { LocationSearch } from "./LocationSearch";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { getDistance } from "geolib";

import ReactDOM from "react-dom";
import { css, jsx } from "@emotion/react";

import ttClubs from "../data/tt-clubs";

import { ClubDetail } from "./ClubDetail";
import { ClubList } from "./ClubList";
import { ClubMap } from "./ClubMap";

let clubs = [];

ttClubs.forEach((club) => {
  if (!club.locations) {
    clubs.push(club);
    return;
  }

  club.locations.forEach((l) => {
    clubs.push({
      ...club,
      ...l,
    });
  });
});

clubs = clubs.filter(
  (club) => !Number.isNaN(club.lat) && !Number.isNaN(club.lng)
);
// .filter((c) => c.visited);

const App = () => {
  const initialLocationRef = useRef();
  const [activeClub, setActiveClub] = useState();
  const [loaded, setLoaded] = useState(false);
  const [searchCenter, setSearchCenter] = useState();

  useLayoutEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyA-Tg-VBzTQ0sgZtJpNv43IltvDH0f7zPQ",
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const rnd = Math.floor(Math.random() * clubs.length);
      const randomClub = clubs[rnd];
      const randomLocation = { lat: randomClub.lat, lng: randomClub.lng };

      getGeocode({ location: randomLocation }).then((results) => {
        initialLocationRef.current = results[0].formatted_address;
        setSearchCenter(randomLocation);
        setLoaded(true);
      });
    });
  }, []);

  const onSearch = (placeId) => {
    console.log(placeId);
    getGeocode({ placeId })
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const { lat, lng } = latLng;
        setSearchCenter(latLng);

        console.log("Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const sortedClubs = useMemo(() => {
    if (!searchCenter) return clubs;

    const getDist = (club) => {
      return getDistance(
        { latitude: club.lat, longitude: club.lng },
        { latitude: searchCenter.lat, longitude: searchCenter.lng }
      );
    };
    return clubs
      .map((c) => ({
        ...c,
        distance: getDist(c),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [clubs, searchCenter]);

  if (!loaded) return null;

  // const sortAndFilter = {
  //   filters: [],
  //   sort: [{ nearest: searchCenter }],
  // };

  return (
    <div
      css={css({ display: "flex", flexDirection: "column", height: "100%" })}
    >
      <div
        css={css({
          borderBottom: "10px solid white",
          padding: 20,
        })}
      >
        <h1 css={css({ margin: 0 })}>Table Tennis Travelers</h1>
        <p>A guided map to find table tennis clubs wherever you go.</p>
        <br />
        <LocationSearch
          onChange={onSearch}
          defaultValue={initialLocationRef.current}
        />
      </div>
      <div css={css({ display: "flex", overflow: "hidden" })}>
        <div
          css={css({
            position: "relative",
            width: "50%",
            maxWidth: 600,
            padding: 20,
            borderRight: "10px solid white",
          })}
        >
          <label>sorted by nearest to destination</label>
          <ClubList clubs={sortedClubs} setActiveClub={setActiveClub} />
          {activeClub && (
            <ClubDetail club={activeClub} onClose={() => setActiveClub(null)} />
          )}
        </div>
        <div css={css({ flex: 1 })}>
          <ClubMap
            center={searchCenter}
            clubs={clubs}
            activeClub={activeClub}
            setActiveClub={setActiveClub}
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
