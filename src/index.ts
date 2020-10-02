import Controller from "./Controller";
import type { Block, KeyedData, Options } from "./types";
import { invariant, query } from "./utils";
import useData from "./useData";

export function register(block: Block, domNode: string | HTMLElement) {
  const element = query(domNode);

  invariant(!element, `element with selector ${domNode} not found`);

  const controller = new Controller(element, block);
  controller.init();
}

export function map(data: KeyedData) {}

export type { Block };

export { useData };
