export function toKebabCase(str: string) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
}

export const is = {
  input(el: any): el is HTMLInputElement {
    return el.nodeName === "INPUT";
  },
};

export function query(selector: string | HTMLElement): HTMLElement {
  return typeof selector === "string"
    ? document.querySelector(selector)
    : selector;
}

export function invariant(cond: boolean, msg: string) {
  if (cond) throw msg;
}
