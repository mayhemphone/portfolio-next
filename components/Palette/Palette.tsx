import React from "react";
import { ColorTheifRGB } from "../../types/types";
import Swath from "./Swath";

type Props = {
  palette: ColorTheifRGB[];
};

const Palette = ({ palette }: Props) => {
  return (
    <div style={{ display: "flex" }}>
      {palette.map((rgb, i) => (
        <Swath rgb={rgb} key={i} />
      ))}
    </div>
  );
};

export default Palette;
