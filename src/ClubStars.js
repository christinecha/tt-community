/** @jsx jsx */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { TRAIT_DATA } from "../data/club-traits";

export const ClubStars = ({ score }) => {
  if (!score) return null;
  const numPoints = Math.floor(score * 10);
  const numStars = Math.floor(numPoints / 2);
  const hasHalf = numPoints % 2 === 1;

  return (
    <span
      css={css({
        display: "flex",
        paddingTop: 2,
        paddingBottom: 2,
        boxSizing: "border-box",
        fontSize: 11,
        margin: 2,
      })}
    >
      {Array(numStars)
        .fill("")
        .map((_, i) => (
          <span key={i}>★</span>
        ))}
      {hasHalf && (
        <span
          css={css({
            display: "inline-block",
            width: "0.7ch",
            overflow: "hidden",
          })}
        >
          ★
        </span>
      )}
    </span>
  );
};
