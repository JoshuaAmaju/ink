import { Events, Props, Block, Properties } from "./types";
import { is, toKebabCase } from "./utils";

type Partitions = {
  events: Events;
  data: Props<string>;
  props: Props<string>;
  rx: Record<string, unknown>;
};

function partition(_props: Partial<Properties>): Partitions {
  const rx = {};
  const data = {};
  const props = {};
  const events = {};

  for (const key in _props) {
    const value = _props[key];

    if (key.startsWith("on")) {
      const eventName = key.substr(2).toLowerCase();
      events[eventName] = value;
    } else if (key.startsWith("data")) {
      data[toKebabCase(key)] = value;
    } else {
      props[key] = value;
    }
  }

  return { rx, data, props, events };
}

export default class Controller {
  private partitions: Partitions;

  constructor(
    private readonly domNode: HTMLElement,
    private readonly block: Block
  ) {}

  init() {
    const props = this.block(this.getAttributes());
    this.partitions = partition(props);
    this.processPartitions();
  }

  initRx() {}

  private getAttributes(): Props<string> {
    const props = {};
    const attrs = this.domNode.attributes;

    for (let i = 0; i < attrs.length; i++) {
      const { name, value } = attrs[i];
      props[name] = value;
    }

    return props;
  }

  private setValue(value: any) {
    if (is.input(this.domNode)) {
      this.domNode.value = value;
    } else {
      this.domNode.textContent = value;
    }
  }

  private processPartitions() {
    const { data, props, events } = this.partitions;

    const { value, class: className, ...restProps } = props;

    this.setValue(value);

    for (const key in { ...data, ...restProps }) {
      this.domNode.setAttribute(key, data[key]);
    }

    for (const key in events) {
      this.domNode.addEventListener(key, events[key]);
    }
  }
}
