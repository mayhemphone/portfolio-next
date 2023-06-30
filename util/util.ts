import { CompanyLogoResponse } from "../types/types";
import ColorThief from "colorthief";

export const fetchSuggestions = async (query: string) => {
  try {
    const res = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`
    );

    const json: CompanyLogoResponse[] = await res.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPalette = async (url: string) => {
  // https://lokeshdhakar.com/projects/color-thief/#api
  return await new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      let colorThief = new ColorThief();
      resolve(colorThief.getPalette(img, 5));
    };
    img.src = url;
  });
};
