import { Tree } from "./Tree";

describe("buildTree tests", () => {
  let tree;
  const singleRoot = (pValue) => {
    return { value: pValue, left: null, right: null };
  };
  beforeEach(() => {
    tree = Tree();
  });
  it("works with one node", () => {
    const result = singleRoot(1);
    expect(tree.buildTree([1])).toEqual(result);
  });
  it("works with two nodes", () => {
    const result = { value: 1, right: singleRoot(2), left: null };
    expect(tree.buildTree([1, 2])).toEqual(result);
  });
  it("works with three nodes", () => {
    const result = { value: 2, left: singleRoot(1), right: singleRoot(3) };
    expect(tree.buildTree([1, 2, 3])).toEqual(result);
  });
  it("works with four nodes", () => {
    const result = {
      value: 2,
      left: singleRoot(1),
      right: { value: 3, left: null, right: singleRoot(4) },
    };
    expect(tree.buildTree([1, 2, 3, 4])).toEqual(result);
  });
  it("works with nine nodes", () => {
    const result = {
      value: 5,
      left: {
        value: 2,
        left: singleRoot(1),
        right: { value: 3, left: null, right: singleRoot(4) },
      },
      right: {
        value: 7,
        left: singleRoot(6),
        right: { value: 8, left: null, right: singleRoot(9) },
      },
    };
    expect(tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(result);
  });
});
it("insertValue tests", () => {});
it("deleteValue tests", () => {});
it("find tests", () => {});
it("levelOrder tests", () => {});
it("inorder tests", () => {});
it("preorder tests", () => {});
it("postorder tests", () => {});
it("height tests", () => {});
it("depth tests", () => {});
it("isBalanced tests", () => {});
it("rebalance tests", () => {});

// implement deleteValue method
// implement find method
// implement levelOrder method
// implement inorder method
// implement preorder method
// implement postorder method
// implement height method
// implement depth method
// implement isBalanced method
// implement rebalance method
