export const Tree = () => {
  let _root = null;
  const buildTree = (pArray) => {
    const removeDuplicates = (pArray) => [...new Set(pArray)];
    pArray = removeDuplicates(pArray).sort((a, b) => a - b);

    const startIndex = 0;
    const endIndex = pArray.length - 1;

    _root = _buildTreeRecursively(pArray, startIndex, endIndex);

    return _root;

    function _buildTreeRecursively(pArray, pStartIndex, pEndIndex) {
      if (pStartIndex > pEndIndex) return null;

      const mid = Math.floor((pStartIndex + pEndIndex) / 2);
      const root = Node(pArray[mid]);
      root.left = _buildTreeRecursively(pArray, pStartIndex, mid - 1);
      root.right = _buildTreeRecursively(pArray, mid + 1, pEndIndex);

      return root;
    }
  };

  const prettyPrint = (node = _root, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insertValue = () => {};
  const deleteValue = (pValue) => {};
  const find = () => {};
  const levelOrder = () => {};
  const inorder = () => {};
  const preorder = () => {};
  const postorder = () => {};
  const height = () => {};
  const depth = () => {};
  const isBalanced = () => {};
  const rebalance = () => {};

  return {
    buildTree,
    prettyPrint,
    insertValue,
    deleteValue,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

export const Node = (value, left = null, right = null) => {
  return { value, left, right };
};
