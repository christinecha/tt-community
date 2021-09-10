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

import rawClubs from "../data/tt-clubs/dist/all-clubs.json";

import { ClubDetail } from "./ClubDetail";
import { ClubList } from "./ClubList";
import { ClubMap } from "./ClubMap";
import { useMobile, MobileProvider } from "./util";
import { FILTER_RATING, SORT, SortAndFilter } from "./SortAndFilter";

const ttClubs = rawClubs
  .filter((club) => !Number.isNaN(club.lat) && !Number.isNaN(club.lng))
  .filter((club) => !club.closed);

const getClubFromUrl = () => {
  const clubId = location.hash.split("#")[1];
  const newActiveClub = ttClubs.find((c) => c.id === clubId);
  return newActiveClub || null;
};

const MOBILE_VIEW = {
  LIST: { name: "List" },
  MAP: { name: "Map" },
};

const cacheMap = (center, zoom) => {
  window.localStorage.setItem("searchLat", center.lat);
  window.localStorage.setItem("searchLng", center.lng);
  window.localStorage.setItem("searchZoom", zoom);
};

const App = () => {
  const [clubs, setClubs] = useState([]);
  const mapRef = useRef();
  const [initialLocation, setInitialLocation] = useState();
  const [activeClub, setActiveClub] = useState(getClubFromUrl());
  const [loaded, setLoaded] = useState(false);
  const [searchCenter, setSearchCenter] = useState();
  const [sortBy, setSortBy] = useState(SORT.DISTANCE);
  const [filterRating, setFilterRating] = useState(FILTER_RATING.ALL);
  const [mobileView, setMobileView] = useState(MOBILE_VIEW.MAP);
  const isMobile = useMobile();

  useEffect(() => {
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
    const cachedZoom = Number(window.localStorage.getItem("searchZoom"));

    let center = { lat: cachedLat, lng: cachedLng };

    if (!center.lat || !center.lng) {
      const rnd = Math.floor(Math.random() * ttClubs.length);
      const randomClub = ttClubs[rnd];
      center = { lat: randomClub.lat, lng: randomClub.lng };
    }

    getGeocode({ location: center })
      .then((results) => {
        const match = results[0];
        setSearchCenter(center);
        setInitialLocation(match.formatted_address);
        mapRef.current.setZoom(cachedZoom || 9);
      })
      .catch(() => {
        setSearchCenter(center);
        setInitialLocation(`${center.lat}, ${center.lng}`);
        mapRef.current.setZoom(cachedZoom || 9);
      });
  }, [loaded, mapRef]);

  const onSearch = useCallback(
    (placeId) => {
      getGeocode({ placeId })
        .then((results) => {
          const match = results[0];
          getLatLng(match).then((latLng) => {
            mapRef.current.setCenter(latLng);
            mapRef.current.fitBounds(match.geometry.viewport);
            const zoom = Math.min(mapRef.current.getZoom(), 11);
            mapRef.current.setZoom(zoom);
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    },
    [mapRef]
  );

  const sortedClubs = useMemo(() => {
    if (!mapRef.current) return [];
    const center = mapRef.current.getCenter();

    const getDist = (club) => {
      return getDistance(
        { latitude: club.lat, longitude: club.lng },
        { latitude: center.lat(), longitude: center.lng() }
      );
    };

    return clubs
      .map((c) => ({
        ...c,
        distance: getDist(c),
      }))
      .filter(filterRating.fn)
      .sort(sortBy.fn);
  }, [clubs, sortBy, filterRating]);

  const onBoundsChange = useCallback(() => {
    const bounds = mapRef.current.getBounds();
    const center = mapRef.current.getCenter();

    const newClubs = ttClubs.filter((c) => {
      const inBounds = bounds.contains({ lat: c.lat, lng: c.lng });
      return inBounds;
    });

    setClubs(newClubs);

    const centerCoords = { lat: center.lat(), lng: center.lng() };
    cacheMap(centerCoords, mapRef.current.getZoom());
    getGeocode({ location: centerCoords })
      .then((results) => {
        const match = results[0];
        setInitialLocation(match.formatted_address);
      })
      .catch(() => {
        setInitialLocation(`${centerCoords.lat}, ${centerCoords.lng}`);
      });
  }, []);

  const Title = useMemo(
    () =>
      ({ children }) =>
        (
          <div
            css={css({
              background: "var(--contentBgColor)",
              padding: isMobile && mobileView === MOBILE_VIEW.MAP ? 10 : 0,
              boxSizing: "border-box",
            })}
          >
            <h1 css={css({ margin: 0, fontSize: isMobile ? 24 : "2rem" })}>
              Table Tennis Community 🏓 🌏
            </h1>
            <p>Where to play table tennis all over the world.</p>
            <LocationSearch
              onChange={onSearch}
              defaultValue={initialLocation}
            />
            <br />
            {children}
            {isMobile && (
              <div css={css({ marginBottom: 10, marginTop: 5 })}>
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

  if (!loaded || !searchCenter) return null;

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
              maxWidth: 500,
              padding: isMobile ? 10 : 20,
              paddingBottom: isMobile ? 0 : 20,
              boxSizing: "border-box",
            })}
          >
            <Title>
              <SortAndFilter
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterRating={filterRating}
                setFilterRating={setFilterRating}
              />
            </Title>
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
          <div
            css={css({
              flex: 1,
              position: "relative",
              width: "100%",
              background: "var(--contentBgColor)",
            })}
          >
            {isMobile && (
              <Title>
                <SortAndFilter
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  filterRating={filterRating}
                  setFilterRating={setFilterRating}
                />
              </Title>
            )}
            <ClubMap
              mapRef={mapRef}
              initialCenter={searchCenter}
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

ReactDOM.render(
  <MobileProvider>
    <App />
  </MobileProvider>,
  document.getElementById("app")
);
