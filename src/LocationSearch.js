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

// import "@reach/combobox/styles.css";

export const LocationSearch = ({ onChange, defaultValue }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ defaultValue });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    const { description } = data.find((d) => d.place_id === val);
    setValue(description, false);
    onChange(val);
    clearSuggestions();
  };

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  return (
    <div css={css({ display: "flex" })}>
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
            color: "black",
            fontFamily: "Muli, sans-serif",
            fontSize: 16,
            borderBottom: "2px solid #e6e6e6",
            width: 400,
            "&:focus": {
              outline: "none",
              borderBottom: "2px solid black",
            },
            "&::placeholder": {
              color: "white",
              fontStyle: "italic",
              opacity: 0.5,
            },
          })}
        />

        {status === "OK" && data.length && (
          <ComboboxPopover
            ref={ref}
            css={css({
              background: "white",
              border: "2px solid black",
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
                  value={place_id}
                  css={css({
                    cursor: "pointer",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,

                    "&:hover": {
                      color: "blue",
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
