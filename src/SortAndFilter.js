/** @jsx jsx */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { css, jsx } from "@emotion/react";
import Select from "react-select";

export const SORT = {
  DISTANCE: {
    id: "distance",
    name: "Distance",
    fn: (a, b) => a.distance - b.distance,
  },
  RATING: {
    id: "rating",
    name: "Rating",
    fn: (a, b) => {
      if (b.score === undefined) return -1;
      if (a.score === undefined) return 1;
      return b.score - a.score;
    },
  },
};

export const FILTER_RATING = {
  STAR_3: {
    id: "star_3",
    name: "★★★",
    fn: (a) => a.score > 0.9,
  },
  STAR_2: {
    id: "star_2",
    name: "★★",
    fn: (a) => a.score <= 0.9 && a.score > 0.7,
  },
  STAR_1: {
    id: "star_1",
    name: "★",
    fn: (a) => a.score <= 0.7 && a.score > 0.5,
  },
  ALL: {
    id: "all",
    name: "Show All",
    fn: () => true,
  },
};

const SORT_OPTIONS = [
  { value: SORT.DISTANCE, label: SORT.DISTANCE.name },
  { value: SORT.RATING, label: SORT.RATING.name },
];

const FILTER_RATING_OPTIONS = [
  { value: FILTER_RATING.ALL, label: FILTER_RATING.ALL.name },
  { value: FILTER_RATING.STAR_3, label: FILTER_RATING.STAR_3.name },
  { value: FILTER_RATING.STAR_2, label: FILTER_RATING.STAR_2.name },
  { value: FILTER_RATING.STAR_1, label: FILTER_RATING.STAR_1.name },
];

const Wrapper = ({ label, children }) => {
  return (
    <div css={css({ display: "flex", flexDirection: "column", minWidth: 150 })}>
      <label css={css({ marginRight: 5, fontSize: "0.8rem", marginBottom: 2 })}>
        {label}
      </label>
      <div data-label>{children}</div>
    </div>
  );
};

export const SortAndFilter = ({
  sortBy,
  setSortBy,
  filterRating,
  setFilterRating,
}) => {
  return (
    <div
      css={css({
        display: "flex",
        width: "100%",
        alignItems: "center",
        paddingBottom: 10,
      })}
    >
      <Wrapper label="sorted by">
        <Select
          value={SORT_OPTIONS.find((s) => s.value === sortBy)}
          options={SORT_OPTIONS}
          onChange={(option) => {
            setSortBy(option.value);
          }}
          isSearchable={false}
          styles={{
            container: (provided, state) => ({
              ...provided,
              maxWidth: 200,
            }),
          }}
        />
      </Wrapper>

      <div css={css({ width: 20 })}></div>

      <Wrapper label="filter (★ - ★★★)">
        <Select
          value={FILTER_RATING_OPTIONS.find((s) => s.value === filterRating)}
          options={FILTER_RATING_OPTIONS}
          onChange={(option) => {
            setFilterRating(option.value);
          }}
          isSearchable={false}
          styles={{
            container: (provided, state) => ({
              ...provided,
              maxWidth: 200,
            }),
          }}
        />
      </Wrapper>
    </div>
  );
};
