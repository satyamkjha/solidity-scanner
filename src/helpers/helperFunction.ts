import UAParser from "ua-parser-js";
import reCAPTCHA from "helpers/reCAPTCHA";

let configValue: any = null;

export const setGlobalConfig = (config: any) => {
  configValue = config;
};

export const getGlobalConfig = () => {
  return configValue;
};

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

export const getFeatureGateConfig = (config?: any) => {
  let feature_gate_config: any = {};
  config = config || getGlobalConfig();
  if (config && config.REACT_APP_FEATURE_GATE_CONFIG) {
    feature_gate_config = config.REACT_APP_FEATURE_GATE_CONFIG;
  }

  return feature_gate_config;
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

export const getAssetsURL = (config?: any) => {
  config = config || getGlobalConfig();
  return config.REACT_APP_ASSETS_URL || "";
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
