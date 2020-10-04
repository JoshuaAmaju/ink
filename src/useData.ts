import Data from "./Data";
import { KeyedData, Props } from "./types";

export type UseData<T extends Props, P extends keyof T> = {
  state: T;
  data: Data<T>;
  forceUpdate: VoidFunction;
  get: Record<P, KeyedData<T>>;
};

export default function useData<T extends Props, P extends keyof T>(
  state: T
): UseData<T, P> {
  const get = {} as T;
  const data = new Data(state);

  const _state = data.get();

  const forceUpdate = () => {
    for (const key in state) {
      _state[key] = _state[key];
    }
  };

  for (const key in state) {
    Object.defineProperty(get, key, {
      value: {
        key,
        state: data,
      },
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }

  return { get, data, state: _state, forceUpdate };
}
