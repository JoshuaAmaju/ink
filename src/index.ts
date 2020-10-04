import Controller from "./Controller";
import Data from "./Data";
import type { Block, KeyedData, Props } from "./types";
import useData, { UseData } from "./useData";
import { throwError, query, queryAll, watch } from "./utils";

export function register(block: Block, domNode: string | HTMLElement) {
  const element = query(domNode);

  throwError(!element, `element with selector ${domNode} not found`);

  const controller = new Controller(element as HTMLElement, block);
  controller.init();

  return () => controller.destroy();
}

export function map<
  K extends KeyedData,
  S extends K["state"],
  G extends ReturnType<S["get"]>
>({ key, state }: K, callback: (v: G[keyof G]) => unknown) {
  const fauxState = new Data(state.get());

  Object.defineProperties(fauxState, {
    get: {
      value() {
        return callback((state.get() as any)[key] as any);
      },
    },
    getPrev: {
      value() {
        return callback((state.getPrev() as any)[key] as any);
      },
    },
  });

  state.subscribe(() => {
    fauxState.set(state.get());
  });

  return { key, state: fauxState };
}

export type { Block };
export { query, queryAll, useData, watch };
