import { register, Block } from "../src";

const Text: Block = () => {
  return {
    value: "Hello",
  };
};

register(Text, "h1", { immediate: false });
