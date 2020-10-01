import { Props } from "./types";

class Trap<T> {
  private prev: T;

  constructor(private value: T) {}
}

export default class Data<T extends Props> {
  state: T;
  private raf: number;
  private listeners: VoidFunction[] = [];

  constructor(value: T) {
    this.state = new Proxy(value, {
      get(target, prop) {
        return target[prop as keyof T];
      },
      set: (target, prop, value) => {
        target[prop as keyof T] = value;

        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = requestAnimationFrame(this.notifyListeners);

        return true;
      },
    });
  }

  private notifyListeners() {
    this.listeners.forEach((callback) => callback());
  }

  subscribe(callback: VoidFunction) {
    this.listeners.push(callback);
  }

  unsubscribe(callback: VoidFunction) {
    this.listeners = this.listeners.filter((fn) => fn === callback);
  }
}
