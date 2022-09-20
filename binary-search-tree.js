class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let currentNode = this.root;
    if(!this.root) {
      this.root = new Node(val);
      return this
    };

    while(currentNode){
      const left = currentNode.left;
      const right = currentNode.right;

      if(val > currentNode.val){
        if (right === null) {
          currentNode.right = new Node(val);
          return this
        } 
        else {
          currentNode = right
        }

      } else if (val < currentNode.val ){
        if(left === null){
          currentNode.left = new Node(val);
          return this
        }
        else {
          currentNode = left
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val,node = this.root) {
    if(!node){
      this.root = new Node(val);
      return this
    };
    const greaterThen = val > node.val;
    if(greaterThen) {
      if(node.right === null) {
        node.right = new Node(val);
        return this
      }
      this.insertRecursively(val, node.right);
    }
    else if(!greaterThen){
      if(node.left === null){
        node.left = new Node(val);
        return this
      }
      this.insertRecursively(val, node.left);
    };
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    while (currentNode){
      if(currentNode.val === val) {
        return currentNode
      } else {
        if(val > currentNode.val){
          currentNode = currentNode.right
        } else if (val < currentNode.val) {
          currentNode = currentNode.left
        }
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if(node === null) return undefined;
    if(node.val === val) {
      return node
    } else if(val > node.val){
      return this.findRecursively(val, node.right)
    } else if(val < node.val){
      return this.findRecursively(val, node.left)
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];
    const traverse = (node)=>{
      result.push(node.val)
      if(node.left) traverse(node.left);
      if(node.right) traverse(node.right);
    }
    traverse(this.root);
    return result
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    const traverse = (node)=>{
      if(node.left) traverse(node.left);
      result.push(node.val)
      if(node.right) traverse(node.right);
    }
    traverse(this.root);
    return result
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];
    const traverse = (node)=>{
      if(node.left) traverse(node.left);
      if(node.right) traverse(node.right);
      result.push(node.val)
    }
    traverse(this.root);
    return result
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    let currentLevel = [this.root];
    while(currentLevel.length){
      let nextLevel = [];
      for(let node of currentLevel){
        if(node) {
          result.push(node.val);
          if(node.left) nextLevel.push(node.left);
          if(node.right) nextLevel.push(node.right);
        }
      }
      currentLevel = nextLevel;
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val, node = this.root) {
    const successor = (root)=>{
      let current = root.right;
      while(current.left){
        current = current.left
      }
      return current.val
    };
    
    const predecessor = (root)=>{
      let current = root.left;
      while(current.right){
        current = current.right
      }
      return current.val
    };

    const findParent = (val, node = this.root)=>{
      const greaterThen =  val > node.val;
      if(greaterThen) {
        if (node.right.val === val) return node;
        return findParent(val, node.right)
      }else {
        if (node.left.val === val) return node;
        return findParent(val, node.left)
      }
    };

    if(!node) return null;

    if(node.val === val){
      if(!node.right && !node.left){
        //If this is a leaf node, find the parent node and set pointer to null
        const parent = findParent(val)
        const greaterThen =  val > parent.val;
        if(greaterThen) {
          parent.right = null;
        } else if (!greaterThen){
          parent.left = null;
        }
      } else if(!node.right || !node.left){
        //If this is a node with one child, set the child of the parent node to be the child of the deleted node.
        const parent = findParent(val)
        const greaterThen =  val > parent.val;
        if(greaterThen) {
          parent.right = node.right || node.left;
        } else if (!greaterThen){
          parent.left = node.right || node.left;
        }
      } else if(node.right && node.left){
        // If the node we need to delete has two children. Find the successor/predecessor, set the node value to be the successor/predecessor value and delete the successor/predecessor node.
        if(node.right){
          const newVal = successor(node)
          this.remove(newVal, node.right)
          node.val = newVal
        } else if(node.left){
          const newVal = predecessor(node)
          this.remove(newVal, node.right)
          node.val = newVal
        }
      } 
    } else {
      if (val > node.val) this.remove(val, node.right)
      if (val < node.val) this.remove(val, node.left)
    }
};

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const heightDif = (node)=>{
      if(!node) return 0;
      const leftHeight = heightDif(node.left);
      const rightHeight = heightDif(node.right);
      return 1 + Math.abs(leftHeight - rightHeight);
    };

    const difference = heightDif(this.root);
    return difference <= 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(node = this.root) {
    if(!this.root) return undefined;
    if(!this.root.right) return this.root.left;
    if(node.right) {
      if(node.right.right === null){
        if(node.right.left) return node.right.left.val
        return node.val
      }else {
        this.findSecondHighest(node.right)
      }
    }
  }
}

module.exports = BinarySearchTree;
