/** @jsx jsx */

import React, {
  useCallback,
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

import rawClubs from "../data/tt-clubs";

import { ClubDetail } from "./ClubDetail";
import { ClubList } from "./ClubList";
import { ClubMap } from "./ClubMap";
import { useMobile } from "./util";
import Select from "react-select";

const ttClubs = rawClubs
  .filter((club) => !Number.isNaN(club.lat) && !Number.isNaN(club.lng))
  .filter((club) => !club.closed);

const SORT = {
  DISTANCE: {
    id: "distance",
    name: "Distance",
    fn: (a, b) => a.distance - b.distance,
  },
  RATING: {
    id: "rating",
    name: "Rating",
    fn: (a, b) => {
      if (b.score === undefined) return -1;
      if (a.score === undefined) return 1;
      return b.score - a.score;
    },
  },
};

const SORT_OPTIONS = [
  { value: SORT.DISTANCE, label: SORT.DISTANCE.name },
  { value: SORT.RATING, label: SORT.RATING.name },
];

const getClubFromUrl = () => {
  const clubId = location.hash.split("#")[1];
  const newActiveClub = ttClubs.find((c) => c.id === clubId);
  return newActiveClub || null;
};

const MOBILE_VIEW = {
  LIST: { name: "List" },
  MAP: { name: "Map" },
};

const App = () => {
  const [clubs, setClubs] = useState([]);
  const mapRef = useRef();
  const [initialLocation, setInitialLocation] = useState();
  const [activeClub, setActiveClub] = useState(getClubFromUrl());
  const [loaded, setLoaded] = useState(false);
  const [searchCenter, setSearchCenter] = useState();
  const [sortBy, setSortBy] = useState(SORT.DISTANCE);
  const [mobileView, setMobileView] = useState(MOBILE_VIEW.MAP);
  const { isMobile } = useMobile();

  useLayoutEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyA-Tg-VBzTQ0sgZtJpNv43IltvDH0f7zPQ",
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      setLoaded(true);

      window.addEventListener("hashchange", () => {
        setActiveClub(getClubFromUrl());
      });
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const cachedLat = Number(window.localStorage.getItem("searchLat"));
    const cachedLng = Number(window.localStorage.getItem("searchLng"));

    let center = { lat: cachedLat, lng: cachedLng };

    if (!center.lat || !center.lng) {
      const rnd = Math.floor(Math.random() * ttClubs.length);
      const randomClub = ttClubs[rnd];
      center = { lat: randomClub.lat, lng: randomClub.lng };
    }

    getGeocode({ location: center }).then((results) => {
      const match = results[0];
      setInitialLocation(match.formatted_address);
      setSearchCenter(center);
      mapRef.current.setZoom(9);
    });
  }, [loaded, mapRef]);

  const onSearch = useCallback(
    (placeId) => {
      getGeocode({ placeId })
        .then((results) => {
          const match = results[0];
          getLatLng(match).then((latLng) => {
            setSearchCenter(latLng);
            mapRef.current.fitBounds(match.geometry.viewport);
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    },
    [mapRef]
  );

  const sortedClubs = useMemo(() => {
    if (!searchCenter) return [];

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
      }))
      .sort(sortBy.fn);
  }, [clubs, sortBy, searchCenter]);

  const onBoundsChange = useCallback(
    (bounds) => {
      const newClubs = ttClubs.filter((c) => {
        const inBounds = bounds.contains({ lat: c.lat, lng: c.lng });
        return inBounds;
      });
      setClubs(newClubs);
    },
    [clubs]
  );

  const Title = useMemo(
    () => () =>
      (
        <div
          css={css({
            background: "var(--contentBgColor)",
            padding: isMobile && mobileView === MOBILE_VIEW.MAP ? 10 : 0,
            boxSizing: "border-box",
          })}
        >
          <h1 css={css({ margin: 0 })}>Table Tennis Travelers</h1>
          <p>Table tennis clubs all over the world.</p>
          <br />
          {initialLocation && (
            <LocationSearch
              onChange={onSearch}
              defaultValue={initialLocation}
            />
          )}
          <br />
          {isMobile && (
            <div css={css({ marginBottom: 10 })}>
              <button
                onClick={() =>
                  setMobileView(
                    mobileView === MOBILE_VIEW.MAP
                      ? MOBILE_VIEW.LIST
                      : MOBILE_VIEW.MAP
                  )
                }
              >
                Switch to{" "}
                {mobileView === MOBILE_VIEW.MAP
                  ? MOBILE_VIEW.LIST.name
                  : MOBILE_VIEW.MAP.name}{" "}
                View
              </button>
            </div>
          )}
        </div>
      ),
    [initialLocation, onSearch, isMobile, mobileView]
  );

  if (!loaded || !initialLocation) return null;

  return (
    <div
      css={css({
        height: "100%",
        margin: "auto",
      })}
    >
      <div css={css({ display: "flex", height: "100%", overflow: "hidden" })}>
        {(!isMobile || mobileView === MOBILE_VIEW.LIST) && (
          <div
            css={css({
              display: "flex",
              flexDirection: "column",
              position: "relative",
              background: "var(--contentBgColor)",
              width: isMobile ? "100%" : "50%",
              maxWidth: 450,
              padding: isMobile ? 10 : 20,
              paddingBottom: isMobile ? 0 : 20,
              boxSizing: "border-box",
            })}
          >
            <Title />
            <div
              css={css({
                display: "flex",
                width: "100%",
                alignItems: "center",
                paddingBottom: 10,
              })}
            >
              <label css={css({ marginRight: 5 })}>sorted by </label>
              <label css={css({ flex: 1 })}>
                <Select
                  value={SORT_OPTIONS.find((s) => s.value === sortBy)}
                  options={SORT_OPTIONS}
                  onChange={(option) => {
                    setSortBy(option.value);
                  }}
                  isSearchable={false}
                  styles={{
                    container: (provided, state) => ({
                      ...provided,
                      maxWidth: 200,
                    }),
                  }}
                />
              </label>
            </div>
            <ClubList clubs={sortedClubs} setActiveClub={setActiveClub} />
            {activeClub && (
              <ClubDetail
                club={activeClub}
                onClose={() => setActiveClub(null)}
              />
            )}
          </div>
        )}
        {(!isMobile || mobileView === MOBILE_VIEW.MAP) && (
          <div css={css({ flex: 1, position: "relative", width: "100%" })}>
            {isMobile && <Title />}
            <ClubMap
              mapRef={mapRef}
              center={searchCenter}
              clubs={sortedClubs}
              activeClub={activeClub}
              onChange={onBoundsChange}
            />
            {isMobile && activeClub && (
              <ClubDetail
                club={activeClub}
                onClose={() => setActiveClub(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
