import Data from "./Data";
import { Events, Props, Block, Properties, KeyedData } from "./types";
import { throwError, is, toCamelCase, toKebabCase } from "./utils";

type Partitions<T = KeyedData> = {
  events: Events;
  data: Props<T>;
  props: Props<T>;
};

function get(value: any, key: string) {
  return is.obj(value) ? value[key] : value;
}

function partition(_props: Partial<Properties>): Partitions {
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

  return { data, props, events };
}

export default class Controller {
  private partitions: Partitions;
  private subscriptions: ReturnType<Data["subscribe"]>[] = [];

  constructor(
    private readonly domNode: HTMLElement,
    private readonly block: Block
  ) {}

  init() {
    const props = this.block(this.getAttributes());
    this.partitions = partition(props);
    this.processPartitions();

    this.block.connected?.();

    const mutation = new MutationObserver(this.observer);

    mutation.observe(this.domNode.parentNode, {
      childList: true,
    });
  }

  private getAttributes(): Props<string> {
    const props = {};
    const attrs = this.domNode.attributes;

    for (let i = 0; i < attrs.length; i++) {
      const { name, value } = attrs[i];
      props[toCamelCase(name)] = value;
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

  private throwStateError(key: string, state: Data) {
    throwError(!is.data(state), `${key} value should be a state object`);
  }

  private processPartitions() {
    const { data, props, events } = this.partitions;

    const { value, style, class: className, ...restProps } = props;

    if (value) {
      const { key, state } = value;
      this.throwStateError(key, state);

      const subscription = state.subscribe(() => {
        this.setValue(get(state.get(), key));
      });

      this.subscriptions.push(subscription);
    }

    if (className) {
      const { key, state } = className;
      this.throwStateError(key, state);

      const subscription = state.subscribe(() => {
        const value = get(state.get(), key);
        const prevValue = get(state.getPrev(), key);

        this.domNode.classList.remove(prevValue);
        if (value) this.domNode.classList.add(value);
      });

      this.subscriptions.push(subscription);
    }

    if (style) {
      for (const key in style) {
        const { key: _key, state } = style[key];

        this.throwStateError(key, state);

        const subscription = state.subscribe(() => {
          const value = get(state.get(), _key);
          this.domNode.style[key] = value;
        });

        this.subscriptions.push(subscription);
      }
    }

    const _props = { ...data, ...restProps };

    if (_props) {
      for (const key in _props) {
        const { key: _key, state } = _props[key];

        this.throwStateError(key, state);

        const subscription = state.subscribe(() => {
          const value = get(state.get(), _key);
          this.domNode.setAttribute(key, value);
        });

        this.subscriptions.push(subscription);
      }
    }

    for (const key in events) {
      this.domNode.addEventListener(key, events[key]);
    }
  }

  destroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });

    this.partitions = null;
    this.subscriptions = null;
  }

  private observer = (records: MutationRecord[]) => {
    for (const record of records) {
      record.removedNodes.forEach((node) => {
        if (node === this.domNode) {
          this.block.disconnected?.();
          this.destroy();
        }
      });
    }
  };
}
