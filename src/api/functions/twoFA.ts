import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

export const setup2FARequest = async () => {
  try {
    const { data } = await API.get<{
      status: string;
      provisioning_uri: string;
      two_factor_hash: string;
    }>(API_PATH.API_2FA_SETUP);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const disable2FARequest = async () => {
  try {
    const { data } = await API.delete<{
      status: string;
      message: string;
    }>(API_PATH.API_2FA_DISABLE);
    return data;
  } catch (e) {
    console.log(e);
  }
};
