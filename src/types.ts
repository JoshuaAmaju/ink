import Data from "./Data";

export type Props<T = unknown> = Record<string, T>;

export type Events = Props<any>;

export type KeyedData = {
  state: Data;
  key: string;
};

export type Properties<T = KeyedData> = { value: T; class: T } & Events &
  Props<T>;

export type Options = {
  immediate: boolean;
};

export interface Block {
  (props?: Props<string>): Partial<Properties>;
  connected?: () => void;
  disconnected?: () => void;
}
