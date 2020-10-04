import { map, register, Block, useData } from "../src";

const {
  state,
  data,
  get: { radius },
} = useData({ radius: 10, arr: [1, 2, 3] });

data.subscribe(() => {
  console.log(state.arr);
});

const Range: Block = () => {
  return {
    onChange({ target }: Event) {
      const value = (target as HTMLInputElement).value;
      const radius = parseFloat(value);
      state.arr.push(radius);
      state.radius = radius;
    },
  };
};

const Circle: Block = () => {
  return {
    cx: radius,
  };
};

const blocks = {
  circle: Circle,
  input: Range,
};

for (const key in blocks) {
  register(blocks[key], key);
}
