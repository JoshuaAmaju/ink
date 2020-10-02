import { register, Block, useData } from "../src";

const {
  map,
  state,
  get: { radius },
} = useData({ radius: 10 });

const Range: Block = () => {
  return {
    onChange({ target }: Event) {
      const value = (target as HTMLInputElement).value;
      state.radius = parseFloat(value);
    },
  };
};

const Circle: Block = () => {
  return {
    r: radius,
  };
};

const blocks = {
  circle: Circle,
  input: Range,
};

for (const key in blocks) {
  register(blocks[key], key);
}
