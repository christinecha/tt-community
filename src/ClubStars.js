/** @jsx jsx */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { TRAIT_DATA } from "../data/club-traits";

export const ClubStars = ({ score }) => {
  let stars;
  if (score > 0.9) stars = 3;
  else if (score > 0.7) stars = 2;
  else if (score > 0.5) stars = 1;

  return typeof stars === "undefined" ? null : (
    <span
      css={css({
        display: "inline",
        boxSizing: "border-box",
        fontSize: "0.9rem",
      })}
    >
      {Array(stars)
        .fill("")
        .map((_, i) => (
          <span key={i}>★</span>
        ))}
    </span>
  );
};
