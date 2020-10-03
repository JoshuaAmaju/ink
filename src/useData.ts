import Data from "./Data";
import { KeyedData, Props } from "./types";

type UseData<T extends Props, P extends keyof T> = {
  state: T;
  data: Data<T>;
  forceUpdate: VoidFunction;
  get: Record<P, KeyedData>;
  map: (value: KeyedData, fn: (v: T[P]) => unknown) => KeyedData;
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

  const map: UseData<T, P>["map"] = ({ key, state }, callback) => {
    const fauxState = new Data(_state);

    Object.defineProperties(fauxState, {
      get: {
        value() {
          return callback(state.get()[key] as any);
        },
      },
      getPrev: {
        value() {
          return callback(state.getPrev()[key] as any);
        },
      },
    });

    state.subscribe(() => {
      fauxState.set(state.get() as any);
    });

    return { key, state: fauxState };
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

  return { get, map, data, state: _state, forceUpdate };
}
