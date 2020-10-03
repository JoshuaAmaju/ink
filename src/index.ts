import Controller from "./Controller";
import type { Block } from "./types";
import useData from "./useData";
import { throwError, query, queryAll } from "./utils";

export function register(block: Block, domNode: string | HTMLElement) {
  const element = query(domNode);

  throwError(!element, `element with selector ${domNode} not found`);

  const controller = new Controller(element, block);
  controller.init();

  return () => controller.destroy();
}

export type { Block };
export { query, queryAll, useData };
