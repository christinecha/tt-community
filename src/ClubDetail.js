/** @jsx jsx */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { ClubStars } from "./ClubStars";
import { ClubTrait } from "./ClubTrait";
import { CLUB_TRAITS } from "../data/club-traits";
import { Link } from "react-router-dom";

const LabeledField = ({ label, children }) => (
  <div css={css({ marginBottom: 10 })}>
    <label data-xs css={css({ opacity: 0.6 })}>
      {label}
    </label>
    <div>{children}</div>
  </div>
);

export const ClubDetail = ({ club, onClose }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setReady(true);
    });
  }, [club]);

  const googleMapsQuery = club.address.replace(/\s+/g, "+");

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
          <Link
            css={css({
              cursor: "pointer",
              padding: 10,
              margin: -10,
              textDecoration: "none",
            })}
            to={"/"}
          >
            ✕
          </Link>
          <h1>{club.name}</h1>
          {/* {club.visited && <label>✅ Visited</label>} */}
          <div>
            <ClubStars score={club.score} />
          </div>

          <div css={css({ marginTop: 5 })}>
            <LabeledField label="Address">
              <a
                css={css({
                  display: "inline-block",
                  whiteSpace: "pre-wrap",
                })}
                href={`https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`}
                target="_blank"
              >
                {club.address}
              </a>
            </LabeledField>
            {club.pricePerDay && (
              <LabeledField label="Price Per Day">
                <p>
                  {club.pricePerDay} {club.priceBy ? `per ${club.priceBy}` : ""}
                </p>
              </LabeledField>
            )}
            {club.pricePerHour && (
              <LabeledField label="Price Per Hour">
                <p>
                  {club.pricePerHour}{" "}
                  {club.priceBy ? `per ${club.priceBy}` : ""}
                </p>
              </LabeledField>
            )}
            {club.website && (
              <LabeledField label="Website">
                <a href={club.website} target="_blank">
                  {club.website}
                </a>
              </LabeledField>
            )}
            {club.facebook && (
              <LabeledField label="Facebook">
                <a href={club.facebook} target="_blank">
                  {club.facebook}
                </a>
              </LabeledField>
            )}
            {club.email && (
              <LabeledField label="Email">
                <a href={`mailto:${club.email}`} target="_blank">
                  {club.email}
                </a>
              </LabeledField>
            )}
            {club.phone && (
              <LabeledField label="Phone">
                <a href={`tel:${club.phone}`} target="_blank">
                  {club.phone}
                </a>
              </LabeledField>
            )}

            {club.closed && "Closed :("}
          </div>

          {club.images && (
            <LabeledField label="Photos">
              <div
                css={css({
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                })}
              >
                {club.images.map((image) => (
                  <div
                    css={css({
                      position: "relative",
                      flexBasis: club.images.length > 1 ? "50%" : "100%",
                      padding: 2,
                      boxSizing: "border-box",
                    })}
                    key={image}
                  >
                    <div
                      css={css({
                        paddingBottom: club.images.length > 1 ? "100%" : "50%",
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      })}
                      key={image}
                    />
                  </div>
                ))}
              </div>
            </LabeledField>
          )}

          {/* <p css={css({ lineHeight: 1.6 })}>{club.notes}</p> */}
          <br />
          <LabeledField label="Details">
            <div
              css={css({
                display: "flex",
                flexDirection: "column",
              })}
            >
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
          </LabeledField>

          {/* {!club.closed && club.website && (
        <iframe width="100%" src={club.website} />
      )} */}
        </div>
      </div>
    </>
  );
};
