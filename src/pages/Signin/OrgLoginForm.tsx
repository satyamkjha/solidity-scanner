import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Flex, Stack, Button, Icon, Link, useToast } from "@chakra-ui/react";
import { MdPeopleAlt } from "react-icons/md";
import API from "helpers/api";
import Auth from "helpers/auth";
import { AuthResponse } from "common/types";
import { API_PATH } from "helpers/routeManager";
import { useForm } from "react-hook-form";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import StyledButton from "components/styled-components/StyledButton";
import { TwoFAField } from "components/common/TwoFAField";
import NameInput from "components/forms/NameInput";
import EmailInput from "components/forms/EmailInput";
import PasswordInput from "components/forms/PasswordInput";

const OrgLoginForm: React.FC<{
  setOrganisation: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setOrganisation }) => {
  const history = useHistory();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(false);
  const [orgName, setOrgName] = useState("");
  const { handleSubmit } = useForm();
  const [twoFAScreen, setTwoFAScreen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async () => {
    if (step) {
      signIn();
    } else {
      checkOrganisationNameRequest();
    }
  };

  const verify2FA = async (otp: string) => {
    setIsLoading(true);
    API.post<AuthResponse>(API_PATH.API_2FA_VERIFY, {
      login_type: "organization",
      otp,
      email,
      password,
      org_name: orgName,
    }).then(
      (res) => {
        if (res.status === 200) {
          if (res.data.status === "success") {
            Auth.authenticateUser();
            history.push("/home");
          }
        }
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  };

  const signIn = async () => {
    setIsLoading(true);
    const reqHeaders = await getReCaptchaHeaders("login");
    API.post<AuthResponse>(
      API_PATH.API_ORG_LOGIN,
      { org_name: orgName, email, password },
      {
        headers: reqHeaders,
      }
    ).then(
      (res) => {
        if (res.status === 200) {
          if (res.data.status === "success") {
            if (res.data.message === "2fa required") {
              setTwoFAScreen(true);
            } else {
              Auth.authenticateUser();
              history.push("/home");
            }
          }
        }
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  };

  const checkOrganisationNameRequest = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.post<{
        status: string;
        org_name_available: boolean;
      }>(API_PATH.API_CHECK_ORGANISATION_NAME_AVAILABILITY, {
        org_name: orgName,
      });
      if (data.status === "success") {
        if (data.org_name_available) {
          toast({
            title: "Organisation does not exist",
            description:
              "The organisation name you entered is not valid. Please check if the name is correct.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setOrganisation(orgName);
          setStep(true);
        }
      } else {
        toast({
          title: "",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={6} mt={8} width={["90%", "80%", "600px"]}>
        {twoFAScreen ? (
          <TwoFAField
            isLoading={isLoading}
            buttonText={"Sign In"}
            verify2FA={verify2FA}
          />
        ) : (
          <>
            {step ? (
              <>
                <EmailInput
                  isRequired
                  showLeftIcon
                  placeholder="Your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onError={(e: any) =>
                    setErrors((prv) => {
                      return { ...prv, Email: e };
                    })
                  }
                />
                <PasswordInput
                  isRequired
                  showLeftIcon
                  value={password}
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  onError={(e: any) =>
                    setErrors((prv) => {
                      return { ...prv, Password: e };
                    })
                  }
                />
              </>
            ) : (
              <NameInput
                isRequired
                showLeftIcon
                title="Organisation Name"
                placeholder="Organisation Name"
                autoComplete="off"
                iconChild={<Icon size={30} as={MdPeopleAlt} color="gray.300" />}
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                onError={(e: any) =>
                  setErrors((prv) => {
                    return { ...prv, Name: e };
                  })
                }
              />
            )}

            <Flex width="100%" justify={step ? "space-between" : "flex-end"}>
              {step && (
                <>
                  <Button
                    variant="link"
                    fontSize="sm"
                    mr={1}
                    my={1}
                    onClick={() => setStep(false)}
                  >
                    Back
                  </Button>

                  <Link
                    as={RouterLink}
                    variant="subtle"
                    fontSize="sm"
                    mr={1}
                    my={1}
                    to={`/forgot/${orgName}`}
                  >
                    Forgot Password?
                  </Link>
                </>
              )}
            </Flex>
            <StyledButton
              type="submit"
              variant="brand"
              isLoading={isLoading}
              disabled={Object.values(errors).join("").length > 0}
            >
              {step ? "Sign in" : "Proceed to Sign in"}
            </StyledButton>
          </>
        )}
      </Stack>
    </form>
  );
};
export default OrgLoginForm;
