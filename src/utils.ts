import { KeyedData } from "./types";
import Data from "./Data";

export function toKebabCase(str: string) {
  // @ts-ignore
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

export function query(selector: string | HTMLElement): HTMLElement | null {
  return typeof selector === "string"
    ? document.querySelector(selector)
    : selector;
}

export function queryAll<T extends HTMLElement>(selector: string): T[] {
  return Array.from(document.querySelectorAll(selector));
}

export function throwError(cond: boolean, msg: string) {
  if (cond) throw msg;
}

export function watch({ key, state }: KeyedData, callback: VoidFunction) {
  state.subscribe(() => {
    const value = (state.get() as any)[key];
    const prevValue = (state.getPrev() as any)[key];
    if (value !== prevValue) callback();
  });
}
