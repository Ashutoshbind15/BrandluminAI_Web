import { atom } from "jotai";

export const ideaParsedTextAtom = atom("");

export const ideaSocialsAtom = atom([]);
export const ideaTagsAtom = atom([]);
export const ideaMoodAtom = atom([]);

export const ideaAudienceAgeRangeAtom = atom({ min: 0, max: 0 });
export const ideaAudienceLocationAtom = atom([]);
export const ideaAudienceInterestsAtom = atom([]);

export const ideaMediaAtom = atom([]);
export const ideaMediaLimitAtom = atom([]);
export const ideaMediaGuideLinesAtom = atom([]);

export const ideaTitleAtom = atom("");
export const ideaDescriptionAtom = atom("");

export const ideaCurrentStepAtom = atom(1);
