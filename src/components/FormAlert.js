import React from "react";

const FormAlert = (props) => {
  return (
    <label className="red-alert" htmlFor="">
      {props.text}
    </label>
  );
};

export default FormAlert;
