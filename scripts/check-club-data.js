const { CLUB_TRAITS } = require("../data/club-traits");
const clubs = require("../data/tt-clubs/dist/all-clubs.json");

const args = process.argv;
const isStrict = args.includes("--strict");

const incomplete = [];
const traitsMissing = [];

console.log("Checking club data...");

const REQUIRED_PROPS = ["name", "id", "address", "lat", "lng"];

clubs.forEach((club, i) => {
  const ID = `[${club.id}] ${club.name}`;
  const otherClubs = [...clubs];
  otherClubs.splice(i, 1);
  const missingProps = REQUIRED_PROPS.filter((prop) => club[prop] === null);

  let duplicateProp;
  const duplicate = otherClubs.find((other) => {
    const prop = REQUIRED_PROPS.find((prop) => other[prop] === club[prop]);
    duplicateProp = prop;
    return !!prop;
  });

  if (duplicate) {
    console.log(
      `${ID}: Duplicate prop "${duplicateProp}" found: ${duplicate.name}`
    );
  }

  if (missingProps.length) {
    console.log(`${ID}: Missing required info: ${missingProps.join(", ")} `);
    incomplete.push(club);
  }

  const missingTraits = Object.values(CLUB_TRAITS).filter((trait) => {
    if (isStrict) return (club.traits || {})[trait] === null;
    return !(club.traits || {}).hasOwnProperty(trait);
  });

  if (!club.traits || missingTraits.length) {
    console.log(`${ID}: Missing ${missingTraits.length} trait(s).`);
    traitsMissing.push(club);
  }
});

if (incomplete.length) {
  console.log(`🚫 ${incomplete.length} clubs are missing required info.`);
} else {
  console.log(`✅ All clubs have their required info.`);
}

if (traitsMissing.length) {
  console.log(`🚫 ${traitsMissing.length} clubs are missing 1 or more traits.`);
} else {
  console.log(`✅ All clubs' traits have been recorded.`);
}
