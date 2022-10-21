import { Tree, Node } from "./Tree";

let tree;
beforeEach(() => {
  tree = Tree();
});

describe("buildTree tests", () => {
  it("works with one node", () => {
    const result = Node(1);
    expect(tree.buildTree([1])).toEqual(result);
  });
  it("works with two nodes", () => {
    const result = { value: 1, right: Node(2), left: null };
    expect(tree.buildTree([1, 2])).toEqual(result);
  });
  it("works with three nodes", () => {
    const result = { value: 2, left: Node(1), right: Node(3) };
    expect(tree.buildTree([1, 2, 3])).toEqual(result);
  });
  it("works with four nodes", () => {
    const result = {
      value: 2,
      left: Node(1),
      right: { value: 3, left: null, right: Node(4) },
    };
    expect(tree.buildTree([1, 2, 3, 4])).toEqual(result);
  });
  it("works with nine nodes", () => {
    const result = {
      value: 5,
      left: {
        value: 2,
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    expect(tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(result);
  });
  it("works with duplicate data", () => {
    const result = {
      value: 5,
      left: {
        value: 2,
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    expect(tree.buildTree([1, 2, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(result);
  });
  it("works with unsorted data", () => {
    const result = {
      value: 5,
      left: {
        value: 2,
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    expect(tree.buildTree([1, 8, 7, 6, 5, 4, 3, 2, 9])).toEqual(result);
  });
});
describe("insertValue tests", () => {
  it("works with one node", () => {
    tree.buildTree([2]);
    tree.insertValue(3);
    const result = { value: 2, left: null, right: Node(3) };
    expect(tree.getRoot()).toEqual(result);
  });
  it("works with two nodes", () => {
    tree.buildTree([2]);
    tree.insertValue(3);
    tree.insertValue(1);
    const result = { value: 2, left: Node(1), right: Node(3) };
    expect(tree.getRoot()).toEqual(result);
  });
  it("works with three nodes", () => {
    tree.buildTree([1, 2, 3]);
    tree.insertValue(10);
    const result = {
      value: 2,
      left: Node(1),
      right: { value: 3, left: null, right: Node(10) },
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
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: {
          value: 8,
          left: null,
          right: { value: 9, left: null, right: Node(10) },
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
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    expect(tree.getRoot()).toEqual(result);
  });
});
describe.skip("deleteValue tests", () => {
  beforeEach(() => {
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it.only("does nothing when value not found", () => {
    const result = {
      value: 5,
      left: {
        value: 2,
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    tree.deleteValue(20);
    expect(tree.getRoot()).toEqual(result);
  });
  it.only("works when node is leaf", () => {
    const result1 = {
      value: 5,
      left: {
        value: 2,
        left: null,
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    tree.deleteValue(1);
    expect(tree.getRoot()).toEqual(result1);

    const result2 = {
      value: 5,
      left: {
        value: 2,
        left: null,
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: null },
      },
    };
    tree.deleteValue(9);
    expect(tree.getRoot()).toEqual(result2);
  });
  it("works when node has only one child", () => {
    const result1 = {
      value: 5,
      left: {
        value: 2,
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: Node(9),
      },
    };
    tree.deleteValue(8);
    expect(tree.getRoot()).toEqual(result1);

    const result2 = {
      value: 5,
      left: {
        value: 2,
        left: Node(1),
        right: Node(4),
      },
      right: {
        value: 7,
        left: Node(6),
        right: Node(9),
      },
    };
    tree.deleteValue(3);
    expect(tree.getRoot()).toEqual(result2);
  });
  it("works when node has two children", () => {
    const result1 = {
      value: 5,
      left: {
        value: 3,
        left: Node(1),
        right: Node(4),
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    tree.deleteValue(2);
    expect(tree.getRoot()).toEqual(result1);

    const result2 = {
      value: 5,
      left: {
        value: 3,
        left: Node(1),
        right: Node(4),
      },
      right: {
        value: 8,
        left: Node(6),
        right: Node(9),
      },
    };
    tree.deleteValue(7);
    expect(tree.getRoot()).toEqual(result2);
  });
  it("works on root node of nine node tree", () => {
    const result = {
      value: 6,
      left: {
        value: 2,
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: null,
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    tree.deleteValue(5);
    expect(tree.getRoot()).toEqual(result);
  });
});
describe("find tests", () => {
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
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    expect(tree.find(5)).toEqual(result1);

    const result2 = {
      value: 2,
      left: Node(1),
      right: { value: 3, left: null, right: Node(4) },
    };
    expect(tree.find(2)).toEqual(result2);
    expect(tree.find(1)).toEqual(Node(1));
    expect(tree.find(4)).toEqual(Node(4));
  });
  it("doesn't mutate root", () => {
    const result = {
      value: 5,
      left: {
        value: 2,
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
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
describe("levelOrder tests", () => {
  it("returns null for null tree", () => {
    expect(tree.levelOrder()).toEqual(null);
  });
  it("returns correct for three node tree", () => {
    tree.buildTree([1, 2, 3]);
    expect(tree.levelOrder()).toEqual([2, 1, 3]);
  });
  it("returns correct for nine node tree", () => {
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(tree.levelOrder()).toEqual([5, 2, 7, 1, 3, 6, 8, 4, 9]);
  });
  it("callback works for three node tree", () => {
    const addOneArray = [];
    const addOne = (node) => addOneArray.push(node.value + 1);
    tree.buildTree([1, 2, 3]);
    tree.levelOrder(addOne);
    expect(addOneArray).toEqual([3, 2, 4]);
  });
  it("callback works for nine node tree", () => {
    const addOneArray = [];
    const addOne = (node) => addOneArray.push(node.value + 1);
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    tree.levelOrder(addOne);
    expect(addOneArray).toEqual([6, 3, 8, 2, 4, 7, 9, 5, 10]);
  });
});
describe("inorder tests", () => {
  it("returns null for null tree", () => {
    expect(tree.inorder()).toEqual(null);
  });
  it("returns correct for three node tree", () => {
    tree.buildTree([1, 2, 3]);
    expect(tree.inorder()).toEqual([1, 2, 3]);
  });
  it("returns correct for nine node tree", () => {
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(tree.inorder()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("callback works for three node tree", () => {
    const addOneArray = [];
    const addOne = (node) => addOneArray.push(node.value + 1);
    tree.buildTree([1, 2, 3]);
    tree.inorder(addOne);
    expect(addOneArray).toEqual([2, 3, 4]);
  });
  it("callback works for nine node tree", () => {
    const addOneArray = [];
    const addOne = (node) => addOneArray.push(node.value + 1);
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    tree.inorder(addOne);
    expect(addOneArray).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
it("preorder tests", () => {});
it("postorder tests", () => {});
describe("height tests", () => {
  it("returns zero for null tree", () => {
    const node = null;
    expect(tree.height(node)).toEqual(0);
  });
  it("works for height of zero", () => {
    expect(tree.height(Node(2))).toEqual(0);
  });
  it("works for height of one", () => {
    const node = {
      value: 2,
      left: null,
      right: Node(3),
    };
    expect(tree.height(node)).toEqual(1);
  });
  it("works for height of two", () => {
    const node = {
      value: 2,
      left: null,
      right: Node(3, null, Node(4)),
    };
    expect(tree.height(node)).toEqual(2);
  });
  it("works for height of three", () => {
    const node = {
      value: 2,
      left: null,
      right: Node(3, null, Node(4, null, Node(5))),
    };
    expect(tree.height(node)).toEqual(3);
  });
  it("works for left and right trees", () => {
    const node = {
      value: 2,
      left: null,
      right: Node(3, Node(1, Node(0, Node(-1))), Node(4, null, Node(5))),
    };
    expect(tree.height(node)).toEqual(4);
  });
});
describe("depth tests", () => {
  beforeEach(() => {
    tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("return zero for root", () => {
    const node = {
      value: 5,
      left: {
        value: 2,
        left: Node(1),
        right: { value: 3, left: null, right: Node(4) },
      },
      right: {
        value: 7,
        left: Node(6),
        right: { value: 8, left: null, right: Node(9) },
      },
    };
    expect(tree.depth(node)).toEqual(0);
  });
  it("depth one", () => {
    const node = {
      value: 2,
      left: Node(1),
      right: { value: 3, left: null, right: Node(4) },
    };
    expect(tree.depth(node)).toEqual(1);
  });
  it("depth two", () => {
    const node = Node(1);
    expect(tree.depth(node)).toEqual(2);
  });
  it("depth three", () => {
    const node = Node(9);
    expect(tree.depth(node)).toEqual(3);
  });
  it("return null if node not in tree", () => {
    const node = Node(20);
    expect(tree.depth(node)).toEqual(null);
  });
  it("speed check", () => {
    const bigTree = Tree();
    const bigArray = [];
    for (let i = 1; i <= 1000; i++) bigArray.push(i);
    bigTree.buildTree(bigArray);
    const node = Node(1000);
    expect(bigTree.depth(node)).toEqual(9);
  });
});
it("isBalanced tests", () => {});
it("rebalance tests", () => {});
// implement deleteValue method
// implement preorder method
// implement postorder method
// implement isBalanced method
// implement rebalance method
