/** @jsx jsx */
import React, { useEffect } from "react";
import { css, jsx } from "@emotion/react";

export const ClubDetail = ({ club, onClose }) => {
  return (
    <div
      css={css({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#001e61",
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
      {club.visited && <label>✅ Visited</label>}
      <br />
      <br />
      <p>{club.address}</p>
      {club.website && (
        <a href={club.website} target="_blank">
          {club.website}
        </a>
      )}
      <br />

      {club.closed && "Closed :("}

      {club.notes}

      {/* {!club.closed && club.website && (
        <iframe width="100%" src={club.website} />
      )} */}
    </div>
  );
};
