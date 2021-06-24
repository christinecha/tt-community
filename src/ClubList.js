/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useEffect } from "react";

export const ClubList = ({ clubs, setActiveClub }) => {
  return (
    <div
      css={css({
        overflowY: "auto",
        height: "100%",
        ["&::-webkit-scrollbar"]: {
          width: 0 /* Remove scrollbar space */,
          background:
            "transparent" /* Optional: just make scrollbar invisible */,
        },
      })}
    >
      <ol css={css({})}>
        {clubs.map((club, i) => {
          const distKm = club.distance / 1000;
          const distMi = 0.621371 * distKm;
          return (
            <li key={club.id} css={css({ marginBottom: 10 })}>
              <a css={css({ textDecoration: "none" })} href={`#${club.id}`}>
                <h3
                  css={css({
                    display: "inline",
                    cursor: "pointer",
                    "&:hover": {
                      borderBottom: "1px solid black",

                      span: {
                        opacity: 1,
                      },
                    },
                  })}
                  onClick={() => setActiveClub(club)}
                >
                  {club.name}
                  <span css={css({ opacity: 0, marginLeft: 5 })}>→</span>
                </h3>
              </a>
              <p css={css({ marginTop: 5 })}>{club.address}</p>
              <label>{distMi.toFixed(1)} miles away</label>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
