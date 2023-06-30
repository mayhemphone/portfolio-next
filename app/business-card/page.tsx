"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../util/customHooks";
import { fetchSuggestions, getPalette } from "../../util/util";
import { ColorTheifRGB, CompanyLogoResponse } from "../../types/types";
import Palette from "../../components/Palette/Palette";

type Props = {};
const logo = "https://logo.clearbit.com/awstip.com";

const page = ({}: Props) => {
  const [companyInput, setCompanyInput] = useState("");
  const [suggestions, setSuggestions] = useState<CompanyLogoResponse[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<string>();
  const [palette, setPalette] = useState<ColorTheifRGB[]>([]);

  const urlInput = useRef<HTMLInputElement>(null);
  const debouncedCompanyInput = useDebounce(companyInput, 500);

  // color palette
  useEffect(() => {
    if (selectedLogo) {
      getPalette(selectedLogo).then((res) => {
        const test = res as ColorTheifRGB[];
        setPalette(test);
      });
    }
  }, [selectedLogo]);

  // fetching
  useEffect(() => {
    const doFetch = async (query: string) => {
      const res = await fetchSuggestions(query);
      setSuggestions(res);
    };

    if (debouncedCompanyInput !== "") {
      doFetch(debouncedCompanyInput);
    } else {
      setSuggestions([]);
    }
  }, [debouncedCompanyInput]);

  const displayedSuggestions = suggestions.map((item) => (
    <div key={item.domain}>
      <button onClick={() => setSelectedLogo(item.logo)}>
        <img src={item.logo} />
      </button>
      {item.name}
    </div>
  ));

  return (
    <main>
      <h1>business card</h1>
      <label htmlFor="search-logo">Search</label>
      <input
        id="search-logo"
        name="search-logo"
        value={companyInput}
        onChange={(e) => setCompanyInput(e.target.value)}
      />
      <a href="https://clearbit.com">Logos provided by Clearbit</a>
      <br />
      <label htmlFor="url-input">
        url (i need to proxy this, to avoid CORS problems)
      </label>
      <input id="url-input" name="url-input" ref={urlInput} />
      <button
        onClick={() =>
          urlInput?.current?.value &&
          urlInput?.current?.value !== "" &&
          setSelectedLogo(urlInput.current.value)
        }
      >
        use
      </button>
      <br />
      <div>{displayedSuggestions}</div>
      <hr />
      <div>{selectedLogo && <Palette palette={palette} />}</div>
    </main>
  );
};

export default page;
