import { register, Block } from "../src";

const Text: Block = () => {
  return {
    value: "Hello",
    dataId: 1,
  };
};

register(Text, "h1", { immediate: false });
