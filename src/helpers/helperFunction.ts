import UAParser from "ua-parser-js";
import reCAPTCHA from "helpers/reCAPTCHA";
import { Profile, PricingData, Finding } from "common/types";
import { platformVsChains, contractChain, publicRoutes } from "common/values";
import { matchPath } from "react-router-dom";

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

export const matchPublicRoute = (pathToMatch: string) => {
  return publicRoutes.find((route) => {
    const match = matchPath(pathToMatch, { path: route, exact: true });
    return match !== null && match.isExact;
  });
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

export const compareTimeStamp = (timeStamp1: string, timeStamp2: string) => {
  const time1 = new Date(timeStamp1).getTime();
  const time2 = new Date(timeStamp2).getTime();

  if (time1 > time2) return true;
  else return false;
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

    if (profile.current_package === "expired") return false;

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
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

export const hasSpecialCharacters = (email: string) =>
  /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/i.test(email);

export const checkOrgName = (email: string) =>
  /[`!@#$\s%^&*()+\-=[\]{};':"\\|,.<>/?~]/i.test(email);

export const checkContractAddress = (contractAddress: string) =>
  /^xdc[a-fA-F0-9]{40}$|^0x[a-fA-F0-9]{40}$/i.test(contractAddress);

export const checkProjectUrl = (url: string) => {
  const githubRegex = /^https:\/\/github\.com\/[^/]+\/[^/]+(\.git)?(\/|$)/i;
  const bitbucketRegex =
    /^(?:https:\/\/)?(?:[^@]+@)?bitbucket\.org\/([^/]+)\/([^/.]+)(\.git)?(\/|$)/i;

  const gitlabRegex = /^https:\/\/gitlab\.com\/[^/]+\/[^/]+(\.git)?(\/|$)/i;

  if (githubRegex.test(url)) {
    return true;
  } else if (bitbucketRegex.test(url)) {
    return true;
  } else if (gitlabRegex.test(url)) {
    return true;
  } else return false;
};

export const getProjectType = (project_url: string) => {
  try {
    if (project_url === "File Scan") return "filescan";

    const url = new URL(project_url);
    const hostname = url.hostname.toLowerCase();

    if (hostname.includes("github.com")) {
      return "github";
    }
    if (hostname.includes("bitbucket.org")) {
      return "bitbucket";
    }
    if (hostname.includes("gitlab.com")) {
      return "gitlab";
    }
    return "";
  } catch (e) {
    console.log("incorrect url");
    return "";
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
    case "github":
      return `${baseUrl.origin}/${baseUrl.pathname.replace(
        /\/+$/,
        ""
      )}/blob/${branchName}${file.file_path}#L${file.line_nos_start}-L${
        file.line_nos_end
      }`;

    case "bitbucket":
      return `${baseUrl.origin}${baseUrl.pathname.replace(
        /\/+$/,
        ""
      )}/src/${branchName}${file.file_path}#lines-${file.line_nos_start}:${
        file.line_nos_end
      }`;

    case "gitlab":
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

export const getContractChainLabel = (platform: string, chain: string) => {
  if (platformVsChains[platform] && chain) {
    return contractChain[platformVsChains[platform][chain].chain].platforms[
      platform
    ].chains[platformVsChains[platform][chain].index].label;
  }

  if (
    chain &&
    contractChain[platform] &&
    contractChain[platform].platforms[platform]
  ) {
    const chainObj = contractChain[platform].platforms[platform].chains.find(
      (c) => c.value === chain
    );
    return chainObj ? chainObj.label : chain;
  }

  return chain || "NA";
};

export const getContractBlockchainId = (platform: string, chain: string) => {
  if (platformVsChains[platform] && chain) {
    return platformVsChains[platform][chain].chain;
  }

  if (contractChain[platform]) return platform;

  return "NA";
};

export const getContractBlockChainLogoUrl = (
  platform: string,
  chain: string
) => {
  if (platform === "buildbear") return "blockscan/buildbear";

  return (
    contractChain[getContractBlockchainId(platform, chain)] &&
    contractChain[getContractBlockchainId(platform, chain)].logoUrl
  );
};

export const getTrimmedScanMessage = (scan_status: string) => {
  if (
    scan_status.includes("Download Failed") ||
    scan_status.includes("Download_failed")
  )
    return "Download Failed";
  else if (scan_status.includes("Scan Failed")) return "Scan Failed";
  else if (scan_status.includes("Insufficient LoCs"))
    return "insufficient_locs";
  return "Scan Failed";
};

export const formatString = (template: string, options: any) => {
  for (const keys in options) {
    template = template.replaceAll("${" + keys + "}", options[keys]);
  }
  return template;
};

export const splitListIntoChunks = <T>(list: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];

  for (let i = 0; i < list.length; i += chunkSize) {
    result.push(list.slice(i, i + chunkSize));
  }

  return result;
};

export const getRecentQuickScan = () => {
  const scan_details = localStorage.getItem("recent_scan_details");
  if (scan_details) return JSON.parse(scan_details);
  else return null;
};

export const setRecentQuickScan = (scan: any) => {
  scan = JSON.stringify(scan);
  localStorage.setItem("recent_scan_details", scan);
};
