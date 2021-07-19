/** @jsx jsx */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { TRAIT_DATA } from "../data/club-traits";

const ICONS = {
  0: "🚫",
  1: "🔆",
  2: "✅",
};

export const ClubTrait = ({ id, value, full = false }) => {
  const data = TRAIT_DATA[id] || {};

  if (!data) return null;

  const option = data.options[value];

  if (!option) return null;

  const icon = ICONS[value] || "Unknown";

  return (
    <span
      css={css({
        background: "#fff6e1",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        boxSizing: "border-box",
        fontSize: 11,
        display: "inline-block",
        margin: 2,
      })}
    >
      {data.name || id} {icon}
      {full && (
        <p css={css({ opacity: 0.8, lineHeight: 1.4, paddingBottom: 2 })}>
          <em>{option}</em>
        </p>
      )}
    </span>
  );
};
