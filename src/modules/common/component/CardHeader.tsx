import React from "react";

interface Props {}

const CardHeader = (props: Props) => {
  return (
    <div
      style={{
        borderRadius: "0 0 32px 32px",
        height: "100%",
        minHeight: "206px",
        background:
          "linear-gradient(96deg, #FFAE46 -31.54%, #FF9755 -2.71%, #CA1E78 59.37%, #C00FA7 98.43%)",
      }}
    />
  );
};

export default CardHeader;
