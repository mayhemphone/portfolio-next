import React from "react";
import { ColorTheifRGB } from "../../types/types";

type Props = {
  rgb: ColorTheifRGB;
};

const Swath = ({ rgb }: Props) => {
  return (
    <div
      style={{
        height: "100px",
        width: "100%",
        backgroundColor: `rgb(${rgb.join(",")})`,
      }}
    ></div>
  );
};

export default Swath;
