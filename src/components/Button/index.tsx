import { ReactElement } from "react";

import "./button.scss";

interface IProps {
  className?: string;
  type?: "button" | "submit";
  children: ReactElement;
  onClick?: () => void;
}

export function Button({
  className = "",
  type = "button",
  children,
  onClick,
}: IProps) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
