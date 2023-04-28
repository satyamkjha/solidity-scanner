import UAParser from "ua-parser-js";
import reCAPTCHA from "helpers/reCAPTCHA";
import { TreeItem, TreeItemUP } from "common/types";

export const sentenceCapitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const snakeToNormal = (snakeCase: string): string => {
  const words = snakeCase.split("_");
  const normalWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return normalWords.join(" ");
};

export const camelCaseToNormal = (string: string) => {
  const result = string.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const getFeatureGateConfig = () => {
  let feature_gate_config: any;

  if (process.env.REACT_APP_FEATURE_GATE_CONFIG) {
    feature_gate_config = JSON.parse(process.env.REACT_APP_FEATURE_GATE_CONFIG);
  }

  return feature_gate_config;
};

export const getAssetsURL = () => {
  if (process.env.REACT_APP_ASSETS_URL) {
    return process.env.REACT_APP_ASSETS_URL;
  }
  return "";
};

export const getBrowserName = (): string => {
  const UserAgentInstance = new UAParser();
  let browserName = UserAgentInstance.getBrowser().name;

  if (browserName) return browserName;
  else return "NA";
};

export const getDeviceType = (): string => {
  const UserAgentInstance = new UAParser();
  let deviceType = UserAgentInstance.getDevice().type;

  if (deviceType) return deviceType;
  else return "NA";
};

export const getReCaptchaHeaders = async (action: string) => {
  const recaptcha = new reCAPTCHA(
    process.env.REACT_APP_RECAPTCHA_SITE_KEY!,
    action
  );
  const Recaptchatoken = await recaptcha.getToken();

  if (getFeatureGateConfig().reCAPTCHA_enabled) {
    return {
      "Content-Type": "application/json",
      Recaptchatoken,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

export const restructureRepoTree = (repoTree: TreeItem): TreeItemUP => {
  let tempRepoTree = { ...repoTree, isChildCheck: true, checked: true };
  if (tempRepoTree.name !== "root") {
    tempRepoTree = { ...tempRepoTree, path: `${tempRepoTree.path}/` };
  }
  // console.log(generatePathArray(tempRepoTree.path));
  let newBlobs = tempRepoTree.blobs.map((blob) => ({
    path: `${tempRepoTree.path}${blob}`,
    checked: true,
    name: blob,
  }));
  newBlobs.forEach((item) => {
    console.log(item.path);
    console.log(generatePathArray(item.path));
  });
  let newTree = tempRepoTree.tree.map((item) => restructureRepoTree(item));

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
  return pathArray;
};
