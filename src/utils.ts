import Data from "./Data";

export function toKebabCase(str: string) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
}

export function toCamelCase(str: string) {
  return str.replace(/-./g, (s) => s.toUpperCase()[1]);
}

export const is = {
  data(val: any): val is Data {
    return val instanceof Data;
  },
  input(el: any): el is HTMLInputElement {
    return el.nodeName === "INPUT";
  },
  obj(val: any): val is Record<string, unknown> {
    return Object.prototype.toString.call(val) === "[object Object]";
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
