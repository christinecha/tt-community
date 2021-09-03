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
        overflowX: "hidden",
        flex: 1,
        padding: 0,
        ["&::-webkit-scrollbar"]: {
          width: 0 /* Remove scrollbar space */,
          background:
            "transparent" /* Optional: just make scrollbar invisible */,
        },
      })}
    >
      <ol
        css={css({
          listStyle: "none",
          paddingLeft: 0,
        })}
      >
        {clubs.map((club, i) => {
          const distKm = club.distance / 1000;
          const distMi = 0.621371 * distKm;
          const num = i + 1;
          const formattedAddress = club.address.replace(/\n/g, ", ");

          return (
            <li
              key={club.id}
              css={css({
                marginBottom: 15,
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
                  {"\u00A0"}
                  <ClubStars score={club.score} />
                </h3>
              </a>
              {/* <div css={css({ margin: -2, marginTop: 5 })}>
                {Object.entries(club.traits)
                  .filter(([_, value]) => value === 2)
                  .slice(0, 2)
                  .map(([id, value]) => {
                    return <ClubTrait key={id} id={id} value={value} />;
                  })}
              </div> */}
              <p css={css({ marginTop: 5, opacity: 0.5, marginBottom: 2 })}>
                {formattedAddress}
              </p>
              <label data-xs>{distMi.toFixed(1)} miles away</label>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
