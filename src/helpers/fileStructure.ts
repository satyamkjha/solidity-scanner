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

  // console.log(generatePathArray(tempRepoTree.path));
  let newBlobs = tempRepoTree.blobs.map((blob) => ({
    ...blob,
    checked: check,
  }));
  //   newBlobs.forEach((item) => {
  //     console.log(item.path);
  //     console.log(generatePathArray(item.path));
  //   });
  let newTree = tempRepoTree.tree.map((item) => updateChildTree(item, check));

  let newRepoTree = { ...tempRepoTree, blobs: newBlobs, tree: newTree };
  return newRepoTree;
};

export const generatePathArray = (path: string): string[] => {
  const pathParts = path.split("/");
  if (pathParts[pathParts.length - 1] === "") {
    pathParts.pop();
  }
  let lastElement = "";
  const pathArray = pathParts.map((item, index) => {
    lastElement = `${lastElement}${item}/`;
    return lastElement;
  });
  return pathArray;
};
