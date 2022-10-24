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
    if (_root === null) return;
    const nodeToDel = find(pValue);
    if (nodeToDel === null) return;

    if (isLeaf(nodeToDel)) setNull(nodeToDel);
    else if (hasSingleChild(nodeToDel)) setNodeToChild(nodeToDel);
    else if (hasTwoChildren(nodeToDel)) replaceWithNextBigger(nodeToDel);

    function isLeaf(pNode) {
      return pNode.left === null && pNode.right === null;
    }
    function hasSingleChild(pNode) {
      return (
        (pNode.left !== null || pNode.right !== null) &&
        !(pNode.left !== null && pNode.right !== null)
      );
    }
    function getParent(pNode) {
      let parentNode = null;
      inorder((candidateNode) => {
        if (parentNode !== null) return;
        if (candidateNode.left === pNode || candidateNode.right === pNode)
          parentNode = candidateNode;
      });
      return parentNode;
    }
    function setNull(pNode) {
      if (pNode === _root) return (_root = null);
      const parentNode = getParent(pNode);
      if (parentNode.left === pNode) parentNode.left = null;
      else parentNode.right = null;
    }
    function setNodeToChild(pNode) {
      if (pNode === _root) return (_root = pNode.left || pNode.right);
      const parentNode = getParent(pNode);
      if (parentNode.left === pNode)
        parentNode.left = pNode.left || pNode.right;
      else parentNode.right = pNode.left || pNode.right;
    }
    function hasTwoChildren(pNode) {
      return pNode.left !== null && pNode.right !== null;
    }
    function replaceWithNextBigger(pNode) {
      const nextBigger = getNextBigger(pNode);
      pNode.value = nextBigger.value;

      if (isLeaf(nextBigger)) setNull(nextBigger);
      else setNodeToChild(nextBigger);

      function getNextBigger(pNode) {
        let nextBigger = null;
        inorder((candidateNode) => {
          if (nextBigger !== null) return;
          if (candidateNode.value > pNode.value) nextBigger = candidateNode;
        });
        return nextBigger;
      }
    }
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

  const _travelTree = (travelSteps, userCb) => {
    if (_root === null) return null;

    const nodeValues = [];
    const travelOrder = travelWith(travelSteps, nodeValues);
    travelOrder(userCb, _root);
    return nodeValues;

    function travelWith(travelSteps, nodeValues) {
      return function travelRecur(userCb, rootNode) {
        const Actions = {
          right: (userCb, rootNode) => travelRecur(userCb, rootNode.right),
          left: (userCb, rootNode) => travelRecur(userCb, rootNode.left),
          root: (userCb, rootNode) => {
            if (userCb !== null) userCb(rootNode);
            nodeValues.push(rootNode.value);
          },
        };

        if (rootNode === null) return null;

        travelSteps.forEach((step) => {
          Actions[step](userCb, rootNode);
        });
      };
    }
  };

  function inorder(userCb = null) {
    const travelSteps = ["left", "root", "right"];
    return _travelTree(travelSteps, userCb);
  }

  const preorder = (userCb = null) => {
    const travelSteps = ["root", "left", "right"];
    return _travelTree(travelSteps, userCb);
  };

  const postorder = (userCb = null) => {
    const travelSteps = ["left", "right", "root"];
    return _travelTree(travelSteps, userCb);
  };

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

  const isBalanced = (rootNode = _root) => {
    if (height(rootNode) === 0) return true;
    if (heightDiff(rootNode.left, rootNode.right) > 1) return false;

    return isBalanced(rootNode.left) && isBalanced(rootNode.right);

    function heightDiff(pLeft, pRight) {
      return Math.abs(height(pLeft) - height(pRight));
    }
  };

  const rebalance = () => buildTree(inorder());

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
