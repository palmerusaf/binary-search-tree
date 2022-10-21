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

  const getRoot = () => _root;

  const insertValue = (pValue, rootNode = _root) => {
    //base case
    if (rootNode === null) return Node(pValue);
    if (rootNode.value === pValue) return rootNode;

    if (rootNode.value < pValue)
      rootNode.right = insertValue(pValue, rootNode.right);
    if (rootNode.value > pValue)
      rootNode.left = insertValue(pValue, rootNode.left);
    return rootNode;
  };

  const deleteValue = (pValue) => {
    const nodeToDelete = find(pValue);
    if (nodeToDelete === null) return;
  };

  const find = (pValue, rootNode = _root) => {
    if (rootNode === null) return null;
    if (rootNode.value === pValue) return rootNode;

    if (rootNode.value < pValue) return find(pValue, rootNode.right);
    if (rootNode.value > pValue) return find(pValue, rootNode.left);
    return null;
  };

  const levelOrder = (cb = null) => {
    if (_root === null) return null;

    const queuedNodes = [_root];
    const nodeValues = [];

    while (queuedNodes.length !== 0) {
      const dequeuedNode = queuedNodes.shift();
      if (cb !== null) cb(dequeuedNode);

      nodeValues.push(dequeuedNode.value);

      if (dequeuedNode.left !== null) queuedNodes.push(dequeuedNode.left);
      if (dequeuedNode.right !== null) queuedNodes.push(dequeuedNode.right);
    }

    return nodeValues;
  };

  const inorder = (cb = null) => {
    if (_root === null) return null;

    const nodeValues = [];
    traverseRecursively(cb, _root);
    return nodeValues;

    function traverseRecursively(cb, rootNode) {
      if (rootNode === null) return null;

      traverseRecursively(cb, rootNode.left);
      if (cb !== null) cb(rootNode);
      nodeValues.push(rootNode.value);
      traverseRecursively(cb, rootNode.right);
    }
  };
  const preorder = () => {};
  const postorder = () => {};
  const height = (pNode) => {
    if (pNode === null) return 0;

    if (pNode.left !== null) return 1 + height(pNode.left);
    if (pNode.right !== null) return 1 + height(pNode.right);
    return 0;
  };
  const depth = (pNode, rootNode = _root) => {
    if (find(pNode.value) === null) return null;
    if (pNode.value == rootNode.value) return 0;

    if (rootNode.value < pNode.value) return 1 + depth(pNode, rootNode.right);
    if (rootNode.value > pNode.value) return 1 + depth(pNode, rootNode.left);
  };
  const isBalanced = () => {};
  const rebalance = () => {};

  return {
    buildTree,
    getRoot,
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
