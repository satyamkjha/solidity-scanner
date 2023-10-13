import UAParser from "ua-parser-js";
import reCAPTCHA from "helpers/reCAPTCHA";
import { Profile, PricingData, Finding } from "common/types";

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
  if (getFeatureGateConfig().reCAPTCHA_enabled) {
    const recaptcha = new reCAPTCHA(
      process.env.REACT_APP_RECAPTCHA_SITE_KEY!,
      action
    );
    const Recaptchatoken = await recaptcha.getToken();
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

export const checkGenerateReportAccess = (
  profile: Profile,
  plans: PricingData,
  role: string
) => {
  if (profile && plans) {
    if (profile.logged_in_via === "org_login") {
      if (role === "viewer") return false;
    }
    if (profile.actions_supported)
      return profile.actions_supported.generate_report;

    if (
      profile.current_package === "expired" ||
      profile.current_package === "trial"
    )
      return false;

    return true;
  }
  return false;
};

export const checkPublishReportAccess = (
  profile: Profile,
  plans: PricingData,
  role: string
) => {
  if (profile && plans) {
    if (profile.logged_in_via === "org_login") {
      if (role === "viewer") return false;
    }

    if (profile.actions_supported)
      return profile.actions_supported.publishable_report;

    if (
      profile.current_package === "expired" ||
      profile.current_package === "trial"
    )
      return false;

    return true;
  }
  return false;
};

export const isEmail = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const hasSpecialCharacters = (email: string) =>
  /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/i.test(email);

export const checkOrgName = (email: string) =>
  /[`!@#$\s%^&*()+\-=[\]{};':"\\|,.<>/?~]/i.test(email);

export const checkContractAddress = (contractAddress: string) =>
  /^xdc[a-fA-F0-9]{40}$|^0x[a-fA-F0-9]{40}$/i.test(contractAddress);

export const checkProjectUrl = (url: string) => {
  const githubRegex = /^https:\/\/github\.com\/[^/]+\/[^/]+(\.git)?(\/|$)/i;
  const bitbucketRegex =
    /^https:\/\/bitbucket\.org\/[^/]+\/[^/]+(\.git)?(\/|$)/i;
  const gitlabRegex = /^https:\/\/gitlab\.com\/[^/]+\/[^/]+(\.git)?(\/|$)/i;

  if (githubRegex.test(url)) {
    return true;
  } else if (bitbucketRegex.test(url)) {
    return true;
  } else if (gitlabRegex.test(url)) {
    return true;
  }
};

export const getProjectType = (project_url: string) => {
  const url = new URL(project_url);
  const hostname = url.hostname.toLowerCase();

  if (hostname.includes("github.com")) {
    return "GitHub";
  } else if (hostname.includes("bitbucket.org")) {
    return "Bitbucket";
  } else if (hostname.includes("gitlab.com")) {
    return "GitLab";
  } else {
    return null;
  }
};

export const getProjectFileUrl = (
  project_url: string,
  branchName: string,
  file: Finding
) => {
  if (project_url.endsWith(".git")) {
    project_url = project_url.slice(0, -4);
  }
  const baseUrl = new URL(project_url);

  switch (getProjectType(project_url)) {
    case "GitHub":
      return `${baseUrl.origin}/${baseUrl.pathname.replace(
        /\/+$/,
        ""
      )}/blob/${branchName}${file.file_path}#L${file.line_nos_start}-L${
        file.line_nos_end
      }`;

    case "Bitbucket":
      return `${baseUrl.origin}${baseUrl.pathname.replace(
        /\/+$/,
        ""
      )}/src/${branchName}${file.file_path}#lines-${file.line_nos_start}:${
        file.line_nos_end
      }`;

    case "GitLab":
      return `${baseUrl.origin}/${baseUrl.pathname.replace(
        /\/+$/,
        ""
      )}/-/blob/${branchName}${file.file_path}#L${file.line_nos_start}-${
        file.line_nos_end
      }`;

    default:
      return "";
  }
};

export const getTrimmedScanMessage = (scan_status: string) => {
  if (scan_status.includes("Download Failed")) return "Download Failed";
  else if (scan_status.includes("Scan Failed")) return "Scan Failed";

  return "Scan Failed";
};

export const formatString = (template: string, ...args: any[]) => {
  return template.replace(/{(\d+)}/g, (match, index) => {
    const arg = args[index];
    return typeof arg !== "undefined" ? arg : match;
  });
};

// ^xdc[a-fA-F0-9]{40}$|^0x[a-fA-F0-9]{40}$

// export const getAssetsFromS3 = async (directory: string) => {
//   const assetsURL = getAssetsURL();
//   const response = await axios.get(`${assetsURL}${directory}`);
//   const jsonData = response.data;
//   return jsonData;
// };
