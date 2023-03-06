import React from "react";

const Button = (props) => {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      onMouseEnter={props.checkValidation}
      onClick={props.submitForm}
      type="submit"
    >
      {props.text}
    </button>
  );
};

export default Button;
