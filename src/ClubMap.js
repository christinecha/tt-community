/** @jsx jsx */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { LocationSearch } from "./LocationSearch";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import ReactDOM from "react-dom";
import { css, jsx } from "@emotion/react";

import ttClubs from "../data/tt-clubs";

import { ClubDetail } from "./ClubDetail";
import { ClubList } from "./ClubList";

const PINS = {
  DEFAULT: "./pinpong.svg",
  ACTIVE: "./pinpong-black.svg",
};

export const ClubMap = ({ clubs, center, activeClub, setActiveClub }) => {
  const markers = useRef({}).current;
  const infowindows = useRef([]).current;
  const mapRef = useRef();

  useLayoutEffect(() => {
    window.addEventListener("hashchange", () => {
      const clubId = location.hash.split("#")[1];
      const newActiveClub = clubs.find((c) => c.id === clubId);
      setActiveClub(newActiveClub || null);
    });

    const map = new google.maps.Map(document.getElementById("map"), {
      // center: { lat: 39.8283, lng: -98.5795 },
      center,
      zoom: 4,
      mapTypeControl: false,
    });

    mapRef.current = map;

    clubs.forEach((club) => {
      const { lat, lng } = club;
      // const isActive = randomClub.id === club.id;

      if (!lat || !lng) return;
      const marker = new google.maps.Marker({
        map,
        icon: {
          // url: isActive ? PINS.ACTIVE : PINS.DEFAULT,
          url: PINS.DEFAULT,
        },
        position: {
          lat,
          lng,
        },
      });

      markers[club.id] = marker;

      const infowindow = new google.maps.InfoWindow({
        content: `<p style="color: black; margin: 0; font-family: 'Muli', sans-serif;">${club.name}</p><a href="#${club.id}" style="color: black;">More Details</a>`,
        pixelOffset: new google.maps.Size(0, -2),
        maxWidth: 200,
      });

      infowindows.push(infowindow);

      marker.addListener("click", () => {
        infowindows.forEach((i) => i.close());
        infowindow.open(map, marker);
      });

      marker.addListener("dblclick", () => {
        map.setCenter({ lat, lng });
        map.setZoom(14);
        console.log("hey");
      });

      // if (isActive) {
      //   setActiveClub({ ...club, marker });
      // }
    });
  }, []);

  useEffect(() => {
    if (!activeClub) return;

    Object.values(markers).forEach((m) => {
      m.setIcon({ url: PINS.DEFAULT });
      m.setZIndex(1);
    });
    const activeMarker = markers[activeClub.id];
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
    mapRef.current.setZoom(7);
  }, [center, mapRef.current]);

  return <div id="map" css={css({ width: "100%", height: "100%" })}></div>;
};
