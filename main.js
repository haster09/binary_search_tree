const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

function buildTree(array, start, end) {
  if (start > end) {
    return null; 
  }
  let mid = parseInt((start + end) / 2);
  let node = Node(array[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
}

function Node(data, left = null, right = null) {
  return {
    data: data,
    left: left,
    right: right,
  }
}

function Tree(array) {
  return {
    root: buildTree(array, 0, array.length - 1)
  }
}

function insert(root, value) {
  if (root === null) {
    root = Node(value);
    return root;
  }
  if (root.data > value) {
    root.left = insert(root.left, value);
  }
  else if (root.data < value) {
    root.right = insert(root.right, value);
  }
  return root;
}

function minValue(root) {
  let minv = root.data;
    while (root.left !== null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
}

function remove(root, value) {
  if (root === null) {
    return root;
  }
  if (root.data > value) {
    root.left = remove(root.left, value);
  }
  else if (root.data < value) {
    root.right = remove(root.right, value);
  }
  else {
    if (root.right === null && root.left === null) {
      return null;
    }
    else if (root.right !== null && root.left === null) {
      return root.right;
    }
    else if (root.right === null && root.left !== null) {
      return root.left;
    }
      root.data = minValue(root.right);
      root.right = remove(root.right, root.data);
      }
  return root;
}

function find(root, value) {
  if (root === null) {
    return console.log('value not found');
  }
  if (value === root.data) {
    return console.log(root.data);
  }
  else if (root.data > value) {
    find(root.left, value);
  }
  else if (root.data < value) {
    find(root.right, value);
  }
  return;
}

function levelOrder(root) {
  const queue = [];
  const result = [];
  let node = root;
  queue.push(node);
  while (queue.length > 0) {
    if(node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right)
    }
    result.push(queue[0].data);
    queue.shift();
    node = queue[0]
  }
  return result;
}

  function inOrder(root, result = []) {
    if (root === null) {
      return;
    }
      inOrder(root.left, result);
      result.push(root.data);
      inOrder(root.right, result);
      return result;
  }

  function preOrder(root, result = []) {
    if (root === null) {
      return;
    }
      result.push(root.data);
      preOrder(root.left, result);
      preOrder(root.right, result);
      return result;
  }

  function postOrder(root, result = []) {
    if (root === null) {
      return;
    }
      postOrder(root.left, result);
      postOrder(root.right, result);
      result.push(root.data);
      return result;
  }

  function height(node, value) {
    console.log(node)
    if (node.data === value) {
      result = heightRec(node) - 1;
    }
    if (node.data > value) {
      height(node.left, value);
    }
    if (node.data < value) {
      height(node.right, value);
    }
    return result;
  }
  function heightRec(node) {
    if (node === null) {
      return 0;
    }
    let right = heightRec(node.right); 
    let left = heightRec(node.left);

    if (right.length < left.length) {
      left++;
    } 
    else {
      right++;
    }
    return (left.length > right.length ? left : right);
  }

  function depth(root, value, result = 0) {
    if (root === null) {
      return 0;
    }
    if (root.data === value) {
      toReturn = result;
    }
    if (root.data > value) {
      result++;
      depth(root.left, value, result);
    }
    if (root.data < value) {
      result++;
      depth(root.right, value, result);
    }
    return toReturn;
  }

function isBalancedRec(root) {
  if (root === null) {
    return 0;
  }
  let left = isBalancedRec(root.left);
  let right = isBalancedRec(root.right);

  return 1 + left + right
}

function isBalanced(root) {
  if (root === null) {
    return 0;
  }
  let left = isBalancedRec(root.left);
  let right = isBalancedRec(root.right);
  
  if (left - right > -2 && left - right < 2) {
    return true;
  }
  else {
    return false;
  }
}

function rebalance(root) {
  const array = inOrder(root);
  root = Tree(array).root;
  prettyPrint(root);
  return root;
}
 
const arr = [1, 2, 3, 4, 5, 6, 7];
let bst = Tree(arr).root;
prettyPrint(bst);
console.log(isBalanced(bst));
console.log(preOrder(bst));
console.log(inOrder(bst));
console.log(postOrder(bst));
insert(bst, 100);
insert(bst, 112);
insert(bst, 69);
prettyPrint(bst);
console.log(isBalanced(bst));
bst = rebalance(bst);
console.log(isBalanced(bst));
console.log(preOrder(bst));
console.log(inOrder(bst));
console.log(postOrder(bst));