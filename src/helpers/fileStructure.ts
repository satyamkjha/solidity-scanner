import { TreeItem, TreeItemUP } from "common/types";

export const restructureRepoTree = (
  repoTree: TreeItem,
  check: boolean
): TreeItemUP => {
  let tempRepoTree = { ...repoTree, isChildCheck: check, checked: check };
  if (tempRepoTree.name !== "root") {
    tempRepoTree = { ...tempRepoTree, path: `${tempRepoTree.path}/` };
  }
  // console.log(generatePathArray(tempRepoTree.path));
  let newBlobs = tempRepoTree.blobs.map((blob) => ({
    path: `${tempRepoTree.path}${blob}`,
    checked: check,
    name: blob,
  }));
  //   newBlobs.forEach((item) => {
  //     console.log(item.path);
  //     console.log(generatePathArray(item.path));
  //   });
  let newTree = tempRepoTree.tree.map((item) =>
    restructureRepoTree(item, check)
  );

  let newRepoTree = { ...tempRepoTree, blobs: newBlobs, tree: newTree };
  return newRepoTree;
};

export const updateChildTree = (
  repoTree: TreeItemUP,
  check: boolean
): TreeItemUP => {
  let tempRepoTree = { ...repoTree, isChildCheck: check, checked: check };

  let newBlobs = tempRepoTree.blobs.map((blob) => ({
    ...blob,
    checked: check,
  }));

  let newTree = tempRepoTree.tree.map((item) => updateChildTree(item, check));

  let newRepoTree = { ...tempRepoTree, blobs: newBlobs, tree: newTree };
  return newRepoTree;
};

export const generatePathArray = (path: string): string[] => {
  const pathParts = path.split("/");
  pathParts.pop();
  let lastElement = "";
  const pathArray = pathParts.map((item, index) => {
    lastElement = `${lastElement}${item}/`;
    return lastElement;
  });
  if (path.slice(-1) !== "/") {
    pathArray.push(path);
  }
  return pathArray;
};

export const updateCheckedValue = (
  path: string,
  check: boolean,
  repoTreeUP: TreeItemUP
): TreeItemUP => {
  let newRepoTreeUP = repoTreeUP;
  const pathArray = generatePathArray(path);
  let depth = 0;

  // const updateParent = (tree: TreeItemUP[]): TreeItemUP[] => {
  //   const currDepth = depth;
  //   let newTree = tree.map((item) => {
  //     if (pathArray[depth] === item.path) {
  //       depth++;
  //       if (currDepth === pathArray.length - 1) {
  //         const newChildTree = updateChildTree(item, check);
  //         // tick all children same check and return updated tree ..... pass the tree and check
  //         return newChildTree;
  //       } else {
  //         if (pathArray[currDepth].slice(-1) === "/") {
  //           let newChildTree = updateFolderCheck(item.tree);
  //           return { ...item, tree: newChildTree };
  //         }
  //         let newChildBlobs = updateFileCheck(item.blobs);
  //         return { ...item, blobs: newChildBlobs };
  //       }
  //     }
  //     return item;
  //   });
  //   return newTree;
  // };

  const updateParent = (treeItem: TreeItemUP): TreeItemUP => {
    let count = 0;
    treeItem.tree.forEach((item) => {
      if (item.checked) {
        count++;
      }
    });

    treeItem.blobs.forEach((item) => {
      if (item.checked) {
        count++;
      }
    });

    if (count === 0) {
      return {
        ...treeItem,
        checked: false,
        isChildCheck: false,
      };
    }
    if (count === treeItem.tree.length + treeItem.blobs.length) {
      return {
        ...treeItem,
        checked: true,
        isChildCheck: true,
      };
    }
    return {
      ...treeItem,
      checked: false,
      isChildCheck: true,
    };
  };

  const updateFolderCheck = (treeItem: TreeItemUP): TreeItemUP => {
    const currDepth = depth;
    let updateParentFlag = false;
    // flag to check if parent needs to be checked for updation or not
    let newTree = treeItem.tree.map((item) => {
      if (pathArray[depth] === item.path) {
        updateParentFlag = true;
        depth++;
        if (currDepth === pathArray.length - 1) {
          const newChildTree = updateChildTree(item, check);
          // tick all children same check and return updated tree ..... pass the tree and check
          return newChildTree;
        } else {
          if (pathArray[depth].slice(-1) === "/") {
            let newTreeItem = updateFolderCheck(item);
            // check all files and folders and update containing tree. i.e item
            return { ...newTreeItem };
          }
          let newTreeItem = updateFileCheck(item);
          // check all files and folders and update containing tree. i.e item
          return { ...newTreeItem };
        }
      }
      return item;
    });
    let newTreeItem = { ...treeItem, tree: newTree };
    if (updateParentFlag) {
      newTreeItem = updateParent(newTreeItem);
    }
    return newTreeItem;
  };
  // will be provided with a list of trees and will return an updated list of trees

  const updateFileCheck = (treeItem: TreeItemUP): TreeItemUP => {
    let updateParentFlag = false;
    const newBlobs = treeItem.blobs.map((blob) => {
      if (pathArray[depth] === blob.path) {
        updateParentFlag = true;
        return { ...blob, checked: check };
      } else {
        return { ...blob };
      }
    });
    let newTreeItem = { ...treeItem, blobs: newBlobs };
    if (updateParentFlag) {
      newTreeItem = updateParent(newTreeItem);
    }
    return newTreeItem;
  };
  //will be provided with a list of blobs and will return an updated list of blobs

  // newRepoTreeUP.blobs.map((blob) => {
  //   if (pathArray[depth] === blob.path) {
  //     return { ...blob, checked: check };
  //     // updateChild()
  //   }
  // });

  // newRepoTreeUP.tree.map((item) => {
  //   if (pathArray[depth] === item.path) {
  //     depth--;
  //     if (depth === 0) {
  //       const newChildTree = restructureRepoTree(item, true);
  //       // tick all children same check and return updated tree ..... pass the tree and check
  //       return newChildTree;
  //     } else {
  //       const newChildTree = updateFolderCheck();
  //       return { ...item, tree: newChildTree };
  //     }
  //   }
  // });

  if (pathArray[depth].slice(-1) === "/") {
    newRepoTreeUP = updateFolderCheck(newRepoTreeUP);
  } else {
    newRepoTreeUP = updateFileCheck(newRepoTreeUP);
  }

  return newRepoTreeUP;
  // initializing traversing based on if the first path to be checked is of a file or folder.
};

export const getSkipFilePaths = (repoTreeUP: TreeItemUP): string[] => {
  let skipFilePaths: string[] = [];

  const traverseTree = (treeList: TreeItemUP[]) => {
    treeList.map((tree) => {
      if (!tree.checked && !tree.isChildCheck) {
        skipFilePaths.push(tree.path);
      } else if (!tree.checked && tree.isChildCheck) {
        traverseTree(tree.tree);
        traverseBlobs(tree.blobs);
      }
    });
  };

  const traverseBlobs = (
    blobs: {
      path: string;
      checked: boolean;
      name: string;
    }[]
  ) => {
    blobs.forEach((blob) => {
      if (!blob.checked) {
        skipFilePaths.push(blob.path);
      }
    });
  };

  traverseTree(repoTreeUP.tree);
  traverseBlobs(repoTreeUP.blobs);

  return skipFilePaths;
};
