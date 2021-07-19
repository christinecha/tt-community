import debounce from "lodash.debounce";
import React, { useLayoutEffect, useState } from "react";
import { CLUB_TRAITS as CT } from "../data/club-traits";

export const getClubScore = (club) => {
  if (!club.traits) return undefined;

  const num_traits = Object.keys(CT).length;
  const sum = Object.values(club.traits).reduce((sum, n) => sum + (n || 0), 0);

  return sum / num_traits / 2;
};

const getMobile = () => window.innerWidth < 768;

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(getMobile());

  useLayoutEffect(() => {
    const onResize = debounce(() => {
      setIsMobile(getMobile);
    }, 500);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return { isMobile };
};
