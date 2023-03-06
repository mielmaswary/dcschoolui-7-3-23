import React from "react";

const Space = (props) => {
  const { h } = props;
  const style = { width: "100%", height: `${h}px` };
  return <div style={style}></div>;
};

export default Space;
