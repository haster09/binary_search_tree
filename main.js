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
  queue.push(root.data);
    function breadth(root) {
      if (!queue) {
        return;
      }
      while (queue) {
        if (queue[0].left) {
          queue.push(root.left.data);
        }
        if (queue[0].right) {
          queue.push(root.right.data);
        }
        console.log(queue)
        result.push(queue[0]);
        queue.shift()
        breadth(queue[0]);
      }
      return result;
    }
    return breadth();
  }

const arr = [1, 2, 3, 4, 5, 6, 7];
let bst = Tree(arr).root;
insert(bst, 8);
find(bst, 5)
console.log(levelOrder(bst))
prettyPrint(bst)