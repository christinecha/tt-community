/** @jsx jsx */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { TRAIT_DATA } from "../data/club-traits";

export const ClubTrait = ({ id, value }) => {
  const data = TRAIT_DATA[id] || {};

  if (!data) return null;

  const option = data.options[value];

  if (!option) return null;

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
      {data.name || id} ✅
    </span>
  );
};
