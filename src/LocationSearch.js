/** @jsx jsx */
import usePlacesAutocomplete from "use-places-autocomplete";
import React, { useEffect } from "react";
import { css, jsx } from "@emotion/react";
import useOnclickOutside from "react-cool-onclickoutside";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { useMobile } from "./util";

// import "@reach/combobox/styles.css";

export const LocationSearch = ({ onChange, defaultValue }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ defaultValue });

  const { isMobile } = useMobile();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    const { place_id } = data.find((d) => d.description === val);
    setValue(val, false);
    onChange(place_id);
    clearSuggestions();
  };

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  return (
    <div
      css={css({ display: "flex", flexDirection: isMobile ? "column" : "row" })}
    >
      <p css={css({ marginRight: 10 })}>Find a club near:</p>
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter a location"
          css={css({
            background: "transparent",
            border: "none",
            color: "var(--contentColor)",
            fontFamily: "Muli, sans-serif",
            fontSize: 16,
            borderBottom: "2px solid var(--bgColor)",
            maxWidth: "100%",
            width: 400,
            "&:focus": {
              outline: "none",
              borderBottom: "2px solid var(--contentColor)",
            },
            "&::placeholder": {
              fontStyle: "italic",
              opacity: 0.5,
            },
          })}
        />

        {status === "OK" && data.length && (
          <ComboboxPopover
            ref={ref}
            css={css({
              background: "var(--contentBgColor)",
              border: "2px solid var(--contentColor)",
              boxSizing: "border-box",
              marginTop: -2,
            })}
          >
            <ComboboxList
              css={css({
                listStyle: "none",
                padding: 0,
                paddingTop: 5,
                paddingBottom: 5,
                margin: 0,
              })}
            >
              {data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  css={css({
                    cursor: "pointer",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,

                    "&:hover": {
                      background: "var(--bgColor)",
                    },
                    '&[aria-selected="true"]': {
                      background: "var(--bgColor)",
                    },
                  })}
                >
                  {description}
                </ComboboxOption>
              ))}
            </ComboboxList>
          </ComboboxPopover>
        )}
      </Combobox>
    </div>
  );
};
