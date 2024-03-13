import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import {
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  Link,
  Box,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FaDiscord, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { Logo } from "components/icons";
import API from "helpers/api";
import { AuthResponse } from "common/types";
import MetaMaskLogin from "pages/Signin/MetamaskSignin";
import { API_PATH } from "helpers/routeManager";
import GoogleSignIn from "pages/Signin/GoogleSignin";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import Loader from "components/styled-components/Loader";
import EmailInput from "components/forms/EmailInput";
import NameInput from "components/forms/NameInput";
import PasswordInput from "components/forms/PasswordInput";
import PhoneInput from "components/forms/PhoneInput";
import LinkInput from "components/forms/LinkInput";

const SignUp: React.FC = () => {
  const googleLoginEnabled = true;
  const [, setRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const campaign_type = query.get("utm_source");
    const campaign_id = query.get("utm_campaign");
    if (campaign_type) localStorage.setItem("campaign_type", campaign_type);
    if (campaign_id) localStorage.setItem("campaign_id", campaign_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        maxW="80vw"
        mx="auto"
        py={8}
      >
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Flex>
      <Flex align="center" direction="column" my={4}>
        <Heading fontSize="2xl">Getting Started</Heading>
        <Text color="subtle" my={3}>
          Create an account to continue!
        </Text>
        <Stack spacing={4} direction={["column", "column", "column", "row"]}>
          <MetaMaskLogin />
          {googleLoginEnabled && <GoogleSignIn />}
        </Stack>
        <HStack spacing={5} width={["300px", "400px", "600px"]}>
          <Divider background={"#FAFBFC"} width={"43%"} />
          <Text color="subtle" my={3}>
            OR
          </Text>
          <Divider background={"#FAFBFC"} width={"45%"} />
        </HStack>

        {/* <Flex
            align="center"
            justify="center"
            width={["300px", "400px", "500px"]}
            color="subtle"
            px={5}
            mt={8}
            sx={{
              height: 0.5,
              borderColor: "#EDF2F7",
              borderStyle: "solid",
              borderLeftWidth: ["130px", "180px", "220px"],
              borderRightWidth: ["130px", "180px", "220px"],
            }}
          >
            <Text fontWeight={600} color="subtle">
              OR
            </Text>
          </Flex> */}
        <RegisterForm
          setRegistered={setRegistered}
          setEmail={setEmail}
          email={email}
        />
        <Link
          as={RouterLink}
          variant="subtle"
          fontSize="sm"
          mr={1}
          mt={4}
          to="/signin"
        >
          Already have an account?{" "}
          <Box as="span" color="black" fontWeight={600}>
            Sign In
          </Box>
        </Link>
      </Flex>
    </>
  );
};

type FormData = {
  first_name: string;
  email: string;
  password1: string;
  contact_number: string;
  company_name: string;
};

const RegisterForm: React.FC<{
  setRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
}> = ({ setRegistered, setEmail, email }) => {
  const { handleSubmit, formState } = useForm<FormData>();

  const history = useHistory();
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const [step, setStep] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = async () => {
    try {
      if (!step) {
        setStep(true);
      } else {
        const campaign_type = localStorage.getItem("campaign_type");
        const campaign_id = localStorage.getItem("campaign_id");
        const reqHeaders = await getReCaptchaHeaders("signin");

        let reqBody = {
          email: email,
          password1: password,
          company_name: companyName,
          contact_number: contactNumber,
          first_name: name,
          socials: {
            telegram: telegram,
            discord: discord,
            linkedin: linkedin,
            twitter: twitter,
          },
          campaign:
            campaign_type && campaign_id
              ? {
                  campaign_type,
                  campaign_id,
                }
              : undefined,
        };
        const { data } = await API.post<AuthResponse>(
          API_PATH.API_REGISTER,
          reqBody,
          {
            headers: reqHeaders,
          }
        );

        if (data.status === "success") {
          setRegistered(true);
          setEmail(email);
          localStorage.setItem("current-registered-email", email);
          history.push("/check-email");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={6} mt={8} width={["90%", "80%", "600px"]}>
        {step ? (
          <>
            <LinkInput
              showLeftIcon
              title={"Discord"}
              placeholder="Discord (optional)"
              iconChild={<Icon as={FaDiscord} color="gray.300" />}
              value={discord}
              onChange={(e) => {
                setDiscord(e.target.value);
              }}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Discord: e };
                })
              }
            />

            <LinkInput
              showLeftIcon
              title={"Telegram"}
              placeholder="Telegram (optional)"
              iconChild={<Icon as={FaTelegram} color="gray.300" />}
              value={telegram}
              onChange={(e) => {
                setTelegram(e.target.value);
              }}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Telegram: e };
                })
              }
            />

            <LinkInput
              showLeftIcon
              title={"LinkedIn"}
              placeholder="LinkedIn (optional)"
              iconChild={<Icon as={FaLinkedin} color="gray.300" />}
              value={linkedin}
              onChange={(e) => {
                setLinkedin(e.target.value);
              }}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, LinkedIn: e };
                })
              }
            />

            <LinkInput
              showLeftIcon
              title={"Twitter"}
              placeholder="Twitter (optional)"
              iconChild={<Icon as={FaTwitter} color="gray.300" />}
              value={twitter}
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Twitter: e };
                })
              }
            />
          </>
        ) : (
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

            <NameInput
              isRequired
              showLeftIcon
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Name: e };
                })
              }
            />

            <PasswordInput
              isRequired
              showLeftIcon
              value={password}
              placeholder="Create password"
              onChange={(event) => setPassword(event.target.value)}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Password: e };
                })
              }
            />

            <NameInput
              showLeftIcon
              value={companyName}
              iconChild={<Icon as={MdWork} color="gray.300" />}
              placeholder="Your company (Optional)"
              onChange={(event) => setCompanyName(event.target.value)}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Company: e };
                })
              }
            />

            <PhoneInput
              showLeftIcon
              value={contactNumber}
              placeholder="Your phone number (Optional)"
              onChange={(event) => setContactNumber(event.target.value)}
              onError={(e: any) =>
                setErrors((prv) => {
                  return { ...prv, Phone: e };
                })
              }
            />
          </>
        )}
        <Button
          type="submit"
          variant="brand"
          isLoading={formState.isSubmitting}
          spinner={<Loader color={"#3300FF"} size={25} />}
          isDisabled={Object.values(errors).join("").length > 0}
        >
          {!step ? "Next" : "Submit"}
        </Button>
      </Stack>
    </form>
  );
};
export default SignUp;
