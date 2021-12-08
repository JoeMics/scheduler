import React from "react";
import classNames from 'classnames';

import "components/Button.scss";

const Button = (props) => {
  const buttonClass = classNames({
    'button': true,
    'button--confirm': props.confirm,
    'button--danger': props.danger,
  });

  return (
    <button 
      disabled={props.disabled} 
      onClick={props.onClick} 
      className={buttonClass}
    >
      {props.children}
    </button>
  );
};

export default Button;
