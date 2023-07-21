import { useQuery } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

type ResponseStructure = {
  status: string;
  organization: {
    is_token_valid: boolean;
    profile: {
      org_name: string;
      user_count: number;
      created_at: string;
    };
    role: string;
  };
};

const getValidateInviteLink = async (
  token: string,
  email: string,
  org_name: string
) => {
  const { data } = await API.post<ResponseStructure>(
    API_PATH.API_VALIDATE_INVITE_LINK,
    {
      token,
      email,
      org_name,
    }
  );
  return data;
};

export const useValidateInviteLink = (
  token: string,
  email: string,
  org_name: string
) => {
  return useQuery<ResponseStructure>(
    ["validate_invite_link", token, email, org_name],
    () => getValidateInviteLink(token, email, org_name)
  );
};
