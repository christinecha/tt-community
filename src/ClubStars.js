/** @jsx jsx */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { TRAIT_DATA } from "../data/club-traits";

const Stars = ({ score }) => {
  const numPoints = Math.floor(score * 10);
  const numStars = Math.floor(numPoints / 2);
  const hasHalf = numPoints % 2 === 1;
  return (
    <div css={css({ position: "relative", display: "flex" })}>
      <div css={css({ position: "absolute", top: 0, left: 0, opacity: 0.3 })}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <span key={i}>☆</span>
          ))}
      </div>
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
    </div>
  );
};

export const ClubStars = ({ score }) => {
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
      {typeof score === "undefined" ? (
        <span css={css({ opacity: 0.3 })}>☆☆☆☆☆ (unrated)</span>
      ) : (
        <Stars score={score} />
      )}
    </span>
  );
};
