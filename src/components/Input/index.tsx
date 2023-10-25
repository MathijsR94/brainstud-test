import { ChangeEvent } from "react";
import "./input.scss";

interface IProps {
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type: "text";
}

/**
 * Shared input component
 */
export function Input({ label, name, onChange, value, type }: IProps) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} onChange={onChange} value={value} />
    </div>
  );
}
