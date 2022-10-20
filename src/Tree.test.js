import { Tree } from "./Tree";

let tree;
const singleRoot = (pValue) => {
  return { value: pValue, left: null, right: null };
};
beforeEach(() => {
  tree = Tree();
});

describe("buildTree tests", () => {
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
  it("works with duplicate data", () => {
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
    expect(tree.buildTree([1, 2,2, 3, 4, 5, 6, 7, 8, 9])).toEqual(result);
  });
  it("works with unsorted data", () => {
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
    expect(tree.buildTree([1, 8, 7, 6, 5, 4, 3, 2, 9])).toEqual(result);
  });
});
describe("insertValue tests", () => {
  it("works with one node", () => {
    tree.buildTree([2]);
    tree.insertValue(3);
    const result = { value: 2, left: null, right: singleRoot(3) };
    expect(tree.getRoot()).toEqual(result);
  });
  it("works with two nodes", () => {
    tree.buildTree([2]);
    tree.insertValue(3);
    tree.insertValue(1);
    const result = { value: 2, left: singleRoot(1), right: singleRoot(3) };
    expect(tree.getRoot()).toEqual(result);
  });
  it("works with three nodes", () => {
    tree.buildTree([1, 2, 3]);
    tree.insertValue(10);
    const result = {
      value: 2,
      left: singleRoot(1),
      right: { value: 3, left: null, right: singleRoot(10) },
    };
    expect(tree.getRoot()).toEqual(result);
  });
  it("works on nine node tree", () => {
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    tree.insertValue(10);
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
        right: {
          value: 8,
          left: null,
          right: { value: 9, left: null, right: singleRoot(10) },
        },
      },
    };
    expect(tree.getRoot()).toEqual(result);
  });
  it("does nothing if value already exists", () => {
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    tree.insertValue(2);
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
    expect(tree.getRoot()).toEqual(result);
  });
});
describe.only("find tests", () => {
  beforeEach(() => {
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("returns null if not found", () => {
    expect(tree.find(-1)).toEqual(null);
    expect(tree.find()).toEqual(null);
    expect(tree.find("a")).toEqual(null);
    expect(tree.find(20)).toEqual(null);
  });
  it("returns correct node", () => {
    const result1 = {
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
    expect(tree.find(5)).toEqual(result1);

    const result2 = {
      value: 2,
      left: singleRoot(1),
      right: { value: 3, left: null, right: singleRoot(4) },
    };
    expect(tree.find(2)).toEqual(result2);
    expect(tree.find(1)).toEqual(singleRoot(1));
    expect(tree.find(4)).toEqual(singleRoot(4));
  });
  it("doesn't mutate root", () => {
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
    tree.find(1);
    tree.find(2);
    tree.find(3);
    tree.find(4);
    tree.find(5);
    tree.find(6);
    tree.find(7);
    tree.find(8);
    tree.find(9);
    tree.find("3");
    tree.find(-1);
    tree.find(20);
    tree.find();
    expect(tree.getRoot()).toEqual(result);
  });
});
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
