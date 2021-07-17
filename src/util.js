import { CLUB_TRAITS as CT } from "../data/club-traits";

export const getClubScore = (club) => {
  if (!club.traits) return undefined;

  const num_traits = Object.keys(CT).length;
  const sum = Object.values(club.traits).reduce((sum, n) => sum + (n || 0), 0);

  return sum / num_traits / 2;
};
