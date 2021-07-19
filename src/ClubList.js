/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useEffect } from "react";
import { ClubStars } from "./ClubStars";
import { ClubTrait } from "./ClubTrait";

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
      <ol
        css={css({
          paddingBottom: 30,
          listStyle: "none",
          paddingLeft: 0,
        })}
      >
        {clubs.map((club, i) => {
          const distKm = club.distance / 1000;
          const distMi = 0.621371 * distKm;
          const num = i + 1;

          return (
            <li
              key={club.id}
              css={css({
                marginBottom: 10,
                borderLeft: "2px solid var(--bgColor)",
                paddingLeft: 10,
              })}
            >
              <a css={css({ textDecoration: "none" })} href={`#${club.id}`}>
                <h3
                  css={css({
                    display: "inline",
                    cursor: "pointer",
                    "&:hover": {
                      borderBottom: "1px solid var(--contentColor)",

                      span: {
                        opacity: 1,
                      },
                    },
                  })}
                  onClick={() => setActiveClub(club)}
                >
                  {num}. {club.name}
                  <span css={css({ opacity: 0, marginLeft: 5 })}>→</span>
                </h3>
              </a>
              <div css={css({ margin: -2, marginTop: 5 })}>
                <div>
                  <ClubStars score={club.score} />
                </div>
                {/* {Object.entries(club.traits).map(([id, value]) => {
                    if (!value || value < 2) return null;
                    return <ClubTrait key={id} id={id} value={value} />;
                  })} */}
              </div>
              <p css={css({ marginTop: 5 })}>{club.address}</p>
              <label>{distMi.toFixed(1)} miles away</label>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
