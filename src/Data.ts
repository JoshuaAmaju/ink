import { Props } from "./types";

export default class Data<T extends Props = {}> {
  protected prev: T;
  protected state: T;
  private raf?: number;
  private listeners: VoidFunction[] = [];

  constructor(value: T) {
    this.prev = { ...value };

    this.state = new Proxy(value, {
      get(target, prop) {
        return target[prop as keyof T];
      },
      set: (target, prop, value) => {
        const key = prop as keyof T;

        if (value === target[key]) return true;

        this.prev = { ...target };
        target[key] = value;

        this.notify();

        return true;
      },
    });
  }

  get(): T {
    return this.state;
  }

  getPrev(): T {
    return this.prev;
  }

  set(value: T) {
    this.prev = { ...this.state };
    this.state = value;
    this.notify();
  }

  private notify() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.notifyListeners);
  }

  private notifyListeners = () => {
    this.listeners.forEach((callback) => callback());
  };

  subscribe(callback: VoidFunction) {
    this.listeners.push(callback);

    return {
      unsubscribe: () => {
        this.listeners = this.listeners.filter((fn) => fn !== callback);
      },
    };
  }
}
