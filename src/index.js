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
import axios from "axios";

import ReactDOM from "react-dom";
import { css, jsx } from "@emotion/react";

import ttClubs from "../data/tt-clubs";

import { ClubDetail } from "./ClubDetail";
import { ClubList } from "./ClubList";
import { ClubMap } from "./ClubMap";
import { getClubScore } from "./util";

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

clubs = clubs
.filter(
  (club) => !Number.isNaN(club.lat) && !Number.isNaN(club.lng)
).filter(club => !club.closed);

const SORT = {
  DISTANCE: { name: "distance", fn: (a, b) => a.distance - b.distance },
};

const App = () => {
  const mapRef = useRef();
  const [initialLocation, setInitialLocation] = useState();
  const [activeClub, setActiveClub] = useState();
  const [loaded, setLoaded] = useState(false);
  const [searchCenter, setSearchCenter] = useState();
  const [sortBy, setSortBy] = useState(SORT.DISTANCE);

  useLayoutEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyA-Tg-VBzTQ0sgZtJpNv43IltvDH0f7zPQ",
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const cachedLat = Number(window.localStorage.getItem("searchLat"));
    const cachedLng = Number(window.localStorage.getItem("searchLng"));

    let center = { lat: cachedLat, lng: cachedLng };

    if (!center.lat || !center.lng) {
      const rnd = Math.floor(Math.random() * clubs.length);
      const randomClub = clubs[rnd];
      center = { lat: randomClub.lat, lng: randomClub.lng };
    }

    getGeocode({ location: center }).then((results) => {
      const match = results[0];
      setInitialLocation(match.formatted_address);
      setSearchCenter(center);
      mapRef.current.setZoom(9);
    });
  }, [loaded, mapRef]);

  const onSearch = (placeId) => {
    getGeocode({ placeId })
      .then((results) => {
        const match = results[0];
        getLatLng(match).then((latLng) => {
          const { lat, lng } = latLng;
          setSearchCenter(latLng);
          mapRef.current.fitBounds(match.geometry.viewport);
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const sortedClubs = useMemo(() => {
    if (!searchCenter) return clubs;

    window.localStorage.setItem("searchLat", searchCenter.lat);
    window.localStorage.setItem("searchLng", searchCenter.lng);

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
        score: getClubScore(c),
      }))
      .sort(sortBy.fn);
  }, [clubs, searchCenter, sortBy]);

  if (!loaded || !initialLocation) return null;

  // const sortAndFilter = {
  //   filters: [],
  //   sort: [{ nearest: searchCenter }],
  // };

  return (
    <div
      css={css({
        maxWidth: 1200,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        margin: "auto",
      })}
    >
      <div
        css={css({
          background: "white",
          borderBottom: "10px solid #e6e6e6",
          padding: 20,
        })}
      >
        <h1 css={css({ margin: 0 })}>Table Tennis Travelers</h1>
        <p>A guided map to find table tennis clubs wherever you go.</p>
        <br />
        {initialLocation && (
          <LocationSearch onChange={onSearch} defaultValue={initialLocation} />
        )}
      </div>
      <div css={css({ display: "flex", overflow: "hidden" })}>
        <div
          css={css({
            position: "relative",
            background: "white",
            width: "50%",
            maxWidth: 450,
            padding: 20,
            borderRight: "10px solid #e6e6e6",
          })}
        >
          <label css={css({ display: "block", paddingBottom: 10 })}>
            sorted by {sortBy.name}
          </label>
          <ClubList clubs={sortedClubs} setActiveClub={setActiveClub} />
          {activeClub && (
            <ClubDetail club={activeClub} onClose={() => setActiveClub(null)} />
          )}
        </div>
        <div css={css({ flex: 1 })}>
          <ClubMap
            mapRef={mapRef}
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
