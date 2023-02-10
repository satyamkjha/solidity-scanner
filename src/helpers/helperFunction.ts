import UAParser from "ua-parser-js";

export const sentenceCapitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

export const getBrowserName = (): string => {
  const UserAgentInstance = new UAParser();
    let browserName = UserAgentInstance.getBrowser().name;
 
    if(browserName) return browserName
    else return 'NA'
}

export const getDeviceType = (): string => {
  const UserAgentInstance = new UAParser();
    let deviceType = UserAgentInstance.getDevice().type;
 
    if(deviceType) return deviceType
    else return 'NA'
}
