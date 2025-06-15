"use client";

import clsx from "clsx/lite";

type Props = {
  type?: "button" | "submit";
  text?: string;
  variant?: "button-primary" | "button-secondary";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      className={clsx(props.variant, props.className)}
      onClick={props.onClick}
    >
      {props.text}
      {props.children}
    </button>
  );
};

export default Button;
