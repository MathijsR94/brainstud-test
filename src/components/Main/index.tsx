import { ReactElement } from "react";
import "./main.scss";

interface IProps {
  children: ReactElement;
}

/**
 * Show main content
 */
export function Main({ children }: IProps) {
  return <main>{children}</main>;
}
