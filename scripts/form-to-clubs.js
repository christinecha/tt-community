const axios = require("axios");
const { CLUB_TRAITS: CT } = require("../data/club-traits");

const SPECIAL_ALIAS = {
  PRICE_BY: "Rates are calculated",
  ADDED: "Added?",
  LATLNG: "Club's Lat/Lng Coordinates",
  IMG_1: "Link to a photo of the club (#1)",
  IMG_2: "Link to a photo of the club (#2)",
};

const SIMPLE_ALIAS = {
  name: "Club Name",
  address: "Club's Full Address",
  website: "Link to the club's website",
  facebook: "Link to the club's Facebook page",
  phone: "Club phone number",
  email: "Club email",
  pricePerHour: " Price per hour for a non-member",
  pricePerDay: " Price per day for a non-member",
};

const TRAIT_ALIAS = {
  _permanence: "Permanance",
  _hours: "Hours",
  _club_size: "Club Size",
  _ceiling_height: "Ceiling Height",
  _flooring: "Flooring",
  _lighting: "Lighting",
  _court_size: "Court Size",
  _barriers: "Court Barriers",
  _group_training: "Group Training",
  _walkin_friendly: "Walk-In Friendly",
  _pro_coaches: "Pro Coaches",
  _tournaments: "Tournaments & Leagues",
  _table_quality: "Table Quality",
  _climate_control: "Climate Control",
  _accessibility: "Wheelchair Accessibility",
};

const splitCsvString = (str) => str.split(/(,)(?=(?:[^"]|"[^"]*")*$)/);

axios
  .get(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeODW235cKVHRFeQTGz9ajnR2K0RVNjxX8iAvifIr4wMjdUv3uQ-lMafQV_00dO2AslNjH9cwZbAu9/pub?gid=1062528263&single=true&output=csv"
  )
  .then((res) => {
    const csvString = res.data;
    const csvRows = csvString.split("\n");
    const keys = splitCsvString(csvRows[0]);

    const entries = csvRows.slice(1);
    const rawObjects = entries.map((entry) => {
      const obj = {};
      const fields = splitCsvString(entry);
      fields.forEach((val, i) => {
        obj[keys[i]] = val;
      });

      return obj;
    });

    const keyedObjects = rawObjects
      .filter((obj) => {
        return !obj[SPECIAL_ALIAS.ADDED];
      })
      .map((obj) => {
        const newObj = {};

        // simple keys
        Object.entries(SIMPLE_ALIAS).forEach(([key, alias]) => {
          newObj[key] = obj[alias].replace(/"/g, "");
        });

        // lat & lng
        const latLng = obj[SPECIAL_ALIAS.LATLNG].replace(/"/g, "").split(",");
        newObj.lat = Number(latLng[0]);
        newObj.lng = Number(latLng[1]);

        // images
        newObj.images = [];
        if (obj[SPECIAL_ALIAS.IMG_1])
          newObj.images.push(obj[SPECIAL_ALIAS.IMG_1]);
        if (obj[SPECIAL_ALIAS.IMG_2])
          newObj.images.push(obj[SPECIAL_ALIAS.IMG_2]);

        // price by
        if (obj[SPECIAL_ALIAS.PRICE_BY] === "Per Table")
          newObj.priceBy = "table";
        if (obj[SPECIAL_ALIAS.PRICE_BY] === "Per Person")
          newObj.priceBy = "person";

        // traits
        newObj.traits = {};
        Object.entries(TRAIT_ALIAS).forEach(([key, alias]) => {
          const fullAlias = Object.keys(obj).find((k) => k.match(alias));
          let num;
          if (obj[fullAlias].match("[0]")) num = 0;
          if (obj[fullAlias].match("[1]")) num = 1;
          if (obj[fullAlias].match("[2]")) num = 2;
          newObj.traits[key] = num;
        });

        return newObj;
      });

    console.log(keyedObjects);
  });
