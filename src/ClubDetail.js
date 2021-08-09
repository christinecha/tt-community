/** @jsx jsx */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { ClubStars } from "./ClubStars";
import { ClubTrait } from "./ClubTrait";
import { CLUB_TRAITS } from "../data/club-traits";

export const ClubDetail = ({ club, onClose }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setReady(true);
    });
  }, [club]);

  return (
    <>
      <div
        css={css({
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.2)",
          padding: 20,
          boxSizing: "border-box",
          opacity: ready ? 1 : 0,
          transition: "opacity 200ms ease-in-out",
        })}
      ></div>
      <div
        css={css({
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          background: "var(--contentBgColor)",
          transition: "transform 200ms ease-in-out",
          transform: `translate3d(${ready ? "0" : "-100%"},0,0)`,
        })}
      >
        <div
          css={css({
            height: "100%",
            overflowX: "hidden",
            padding: 20,
            boxSizing: "border-box",
          })}
        >
          <a
            css={css({
              cursor: "pointer",
              padding: 10,
              margin: -10,
              textDecoration: "none",
            })}
            href={"#"}
            onClick={onClose}
          >
            ✕
          </a>
          <h1>{club.name}</h1>
          {/* {club.visited && <label>✅ Visited</label>} */}
          <div>
            <ClubStars score={club.score} />
          </div>

          <div css={css({ marginTop: 5, marginBottom: 10 })}>
            <p>{club.address}</p>
            {club.website && (
              <a href={club.website} target="_blank">
                {club.website}
              </a>
            )}
            <br />
            {club.facebookUrl && (
              <a href={club.facebookUrl} target="_blank">
                {club.facebookUrl}
              </a>
            )}

            {club.closed && "Closed :("}
          </div>

          {/* <div css={css({ margin: -2, marginTop: 5, marginBottom: 10 })}>
            {club.traits && (
              <>
                {Object.entries(club.traits).map(([id, value]) => {
                  if (!value || value < 2) return null;
                  return <ClubTrait key={id} id={id} value={value} />;
                })}
              </>
            )}
          </div>
           */}

          <p css={css({ lineHeight: 1.6 })}>{club.notes}</p>

          <div
            css={css({
              marginTop: 20,
              marginBottom: 10,
            })}
          >
            <div css={css({ marginBottom: 5 })}>
              <label>Full Details</label>
            </div>

            <div css={css({ display: "flex", flexDirection: "column" })}>
              {Object.values(CLUB_TRAITS).map((id) => {
                return (
                  <ClubTrait
                    key={id}
                    id={id}
                    value={(club.traits || {})[id]}
                    full={true}
                  />
                );
              })}
            </div>
          </div>

          {/* {!club.closed && club.website && (
        <iframe width="100%" src={club.website} />
      )} */}
        </div>
      </div>
    </>
  );
};
