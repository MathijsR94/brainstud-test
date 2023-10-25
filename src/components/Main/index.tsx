import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
}

/**
 * Show main content
 */
export function Main({ children }: IProps) {
  return <main>{children}</main>;
}
