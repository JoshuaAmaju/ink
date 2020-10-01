export type Props<T = unknown> = Record<string, T>;

export type Events = Props<EventListener>;

export type Properties = { value: any } & Events & Props;

export type Block = (props?: Props<string>) => Partial<Properties>;

export type Options = {
  immediate: boolean;
};
