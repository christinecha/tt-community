/** @jsx jsx */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

import { Loader } from "@googlemaps/js-api-loader";
import { LocationSearch } from "./LocationSearch";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import ReactDOM from "react-dom";
import { css, jsx } from "@emotion/react";

import ttClubs from "../data/tt-clubs";

import { ClubDetail } from "./ClubDetail";
import { ClubList } from "./ClubList";
import { ClubStars } from "./ClubStars";
import debounce from "lodash.debounce";

const PINS = {
  DEFAULT: "./pinpong.svg",
  ACTIVE: "./pinpong-black.svg",
};

export const ClubMap = ({
  clubs,
  center,
  activeClub,
  setActiveClub,
  onChange,
  mapRef,
}) => {
  const markers = useRef({}).current;
  const infowindows = useRef([]).current;

  useLayoutEffect(() => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center,
      zoom: 4,
      mapTypeControl: false,
    });

    mapRef.current = map;
  }, []);

  useEffect(() => {
    const debouncedOnChange = debounce(() => {
      const bounds = mapRef.current.getBounds();
      onChange(bounds);
    }, 500);
    const handle = mapRef.current.addListener(
      "bounds_changed",
      debouncedOnChange
    );

    return () => {
      handle.remove();
    };
  }, [onChange]);

  useEffect(() => {
    clubs.forEach((club) => {
      const { lat, lng } = club;
      const isActive = (activeClub || {}).id === club.id;

      if (!lat || !lng) return;

      const minSize = 20;
      const maxSize = 32;
      const size = (club.score || 0.5) * (maxSize - minSize) + minSize;

      let marker = markers[club.id];

      if (!marker) {
        marker = new google.maps.Marker({
          map: mapRef.current,
          icon: {
            url: isActive ? PINS.ACTIVE : PINS.DEFAULT,
            scaledSize: new google.maps.Size(size, size),
          },
          position: {
            lat,
            lng,
          },
          zIndex: isActive ? 2 : 1,
        });
      } else {
        marker.setIcon({ url: isActive ? PINS.ACTIVE : PINS.DEFAULT });
        marker.setZIndex(isActive ? 2 : 1);
      }

      markers[club.id] = marker;

      const infowindow = new google.maps.InfoWindow({
        content: ReactDOMServer.renderToString(
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <p
              style={{
                color: "var(--contentColor)",
                margin: 0,
                fontFamily: "'Muli', sans-serif",
              }}
            >
              {club.name}
            </p>
            <div style={{ margin: -2 }}>
              <ClubStars score={club.score} />
            </div>
            <a href={`#${club.id}`} style={{ color: "var(--contentColor)" }}>
              More Details
            </a>
          </div>
        ),
        pixelOffset: new google.maps.Size(0, -2),
        maxWidth: 200,
      });

      infowindows.push(infowindow);

      marker.addListener("click", () => {
        infowindows.forEach((i) => i.close());
        infowindow.open(map, marker);
      });

      marker.addListener("dblclick", () => {
        mapRef.current.setCenter({ lat, lng });
        mapRef.current.setZoom(14);
      });
    });
  }, [clubs]);

  useEffect(() => {
    Object.values(markers).forEach((m) => {
      m.setIcon({ url: PINS.DEFAULT });
      m.setZIndex(1);
    });

    if (!activeClub) return;
    const activeMarker = markers[activeClub.id];
    if (!activeMarker) return;

    activeMarker.setIcon({
      url: PINS.ACTIVE,
    });
    activeMarker.setZIndex(2);
  }, [activeClub]);

  useEffect(() => {
    if (!mapRef.current || !center) return;
    mapRef.current.setCenter({
      ...center,
    });
  }, [center, mapRef.current]);

  return (
    <div
      id="map"
      css={css({
        width: "100%",
        height: "100%",
        border: "10px solid var(--contentBgColor)",
        boxSizing: "border-box",
      })}
    ></div>
  );
};
