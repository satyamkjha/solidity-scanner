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

export const getIssuesData = () => {
  let issueData: any;

  if (process.env.REACT_APP_ISSUES_DATA) {
    issueData = JSON.parse(process.env.REACT_APP_ISSUES_DATA);
  }

  return issueData;
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

export const getAssetsURL = () => {
  return process.env.REACT_APP_ASSETS_URL || "";
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
