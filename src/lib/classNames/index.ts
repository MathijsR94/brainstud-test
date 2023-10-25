/**
 * Concatenates class names together, filtering out any undefined values
 */
export function classNames(classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}
