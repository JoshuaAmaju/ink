import Controller from "./Controller";
import { Block, Options } from "./types";
import { invariant, query } from "./utils";

export function register(
  block: Block,
  domNode: string | HTMLElement,
  options?: Options
) {
  const element = query(domNode);

  invariant(!element, `element with selector ${domNode} not found`);

  const controller = new Controller(element, block);
  controller.init();
}

export { Block };
