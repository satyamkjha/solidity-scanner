import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { FiCheck } from "react-icons/fi";
import {
  Flex,
  Box,
  Text,
  Button,
  Icon,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  VStack,
  Input,
  Spinner,
  InputProps,
  useToast,
  Stack,
  Tooltip,
} from "@chakra-ui/react";

import {
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillInfoCircle,
} from "react-icons/ai";
import { useProfile } from "hooks/useProfile";

import API from "helpers/api";
import Auth from "helpers/auth";
import { API_PATH } from "helpers/routeManager";
import { AuthResponse } from "common/types";
import { InfoIcon } from "@chakra-ui/icons";
import reCAPTCHA from "helpers/reCAPTCHA";

type ProfileFormData = {
  first_name?: string;
  company_name?: string;
  contact_number?: string;
};
const Profile: React.FC = () => {
  const toast = useToast();

  const [isEditable, setEditable] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [metaMaskEmail, setMetaMaskEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { data } = useProfile();
  const queryClient = useQueryClient();
  const { handleSubmit, register, formState } = useForm<ProfileFormData>();
  const recaptcha = new reCAPTCHA(
    process.env.REACT_APP_RECAPTCHA_SITE_KEY!,
    "send-email"
  );

  useEffect(() => {
    if (data) {
      setEmailSend(data.verification_email_sent);
      if (data.verification_email_sent && !data.email_verified)
        setMetaMaskEmail(data.email);
    }
  }, [data]);

  const validateEmail = (value: string) => {
    const emailRegex = /^([a-zA-Z0-9._%-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(value)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const onSave = async ({
    company_name,
    contact_number,
    first_name,
  }: ProfileFormData) => {
    await API.post(API_PATH.API_UPDATE_PROFILE, {
      company_name,
      contact_number,
      first_name,
    });
    queryClient.invalidateQueries("profile");
    setEditable(false);
  };

  const updateEmail = async () => {
    if (metaMaskEmail && validateEmail(metaMaskEmail)) {
      setIsLoading(true);
      const { data } = await API.put(API_PATH.API_UPDATE_EMAIL, {
        email: metaMaskEmail,
      });
      setIsLoading(false);
      if (data.status === "success") {
        setEmailSend(true);
        toast({
          title: "Verification email sent",
          description: `We've sent a link to your email ${metaMaskEmail}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        queryClient.invalidateQueries("profile");
      } else {
        setEmailSend(false);
        setMetaMaskEmail("");
      }
    }
  };

  const onResendEmail = async () => {
    setIsLoading(true);
    const Recaptchatoken = await recaptcha.getToken();
    const { data } = await API.post<AuthResponse>(
      API_PATH.API_SEND_EMAIL,
      {
        email: metaMaskEmail,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Recaptchatoken,
        },
      }
    );

    if (data.status === "success") {
      setEmailSend(true);
      toast({
        title: "Verification email sent",
        description: `We've sent a link to your email ${metaMaskEmail}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        w: "98%",
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: 4,
        ml: [0, 0, 4],
        my: 4,
        minH: "78vh",
      }}
    >
      {!data && (
        <Flex
          sx={{
            w: "100%",
            mx: [0, 0, 4],
            my: 4,
            justifyContent: "center",
          }}
        >
          <Spinner mt={20} />
        </Flex>
      )}

      {data && (
        <Box w="100%" bgColor="white" borderRadius="20px" p={4} px={6}>
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSave)}>
            <Flex w="100%" alignItems="center" justifyContent="space-between">
              <Text fontSize="xl">Profile Details</Text>
              {isEditable ? (
                <Button
                  variant="accent-ghost"
                  type="submit"
                  isLoading={formState.isSubmitting}
                >
                  <Icon as={AiOutlineSave} color="accent" mr={2} /> Save
                </Button>
              ) : (
                <Button
                  variant="accent-ghost"
                  //   type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditable(true);
                  }}
                >
                  <Icon as={AiOutlineEdit} color="accent" mr={2} /> Edit
                </Button>
              )}
            </Flex>
            <VStack spacing={isEditable ? 4 : 8} my={4}>
              <FormControl id="name">
                <FormLabel color="subtle">Name</FormLabel>
                {isEditable ? (
                  <Input
                    borderRadius="15px"
                    size="lg"
                    isRequired
                    isDisabled={formState.isSubmitting}
                    type="text"
                    w="100%"
                    maxW="400px"
                    defaultValue={data.name}
                    {...register("first_name", { required: true })}
                  />
                ) : (
                  <Text fontSize="lg">{data.name}</Text>
                )}
              </FormControl>
              <FormControl id="companyName">
                <FormLabel color="subtle">Company Name</FormLabel>
                {isEditable ? (
                  <Input
                    borderRadius="15px"
                    size="lg"
                    isDisabled={formState.isSubmitting}
                    type="text"
                    w="100%"
                    maxW="400px"
                    defaultValue={data.company_name}
                    {...register("company_name", { required: false })}
                  />
                ) : (
                  <Text fontSize="lg">{data.company_name}</Text>
                )}
              </FormControl>
              <FormControl id="mobileNumber">
                <FormLabel color="subtle">Mobile Number</FormLabel>
                {isEditable ? (
                  <Input
                    borderRadius="15px"
                    size="lg"
                    isDisabled={formState.isSubmitting}
                    type="text"
                    w="100%"
                    maxW="400px"
                    defaultValue={data.contact_number}
                    {...register("contact_number", { required: false })}
                  />
                ) : (
                  <Text fontSize="lg">{data.contact_number}</Text>
                )}
              </FormControl>

              {data.public_address && (
                <FormControl id="public_address">
                  <FormLabel color="subtle">Public Address</FormLabel>
                  {isEditable ? (
                    <Input
                      borderRadius="15px"
                      size="lg"
                      isDisabled
                      type="email"
                      w="100%"
                      maxW="400px"
                      value={data.public_address}
                    />
                  ) : (
                    <Text fontSize="lg">{data.public_address}</Text>
                  )}
                </FormControl>
              )}

              {data.email_verified && (
                <FormControl id="email">
                  <FormLabel color="subtle">Email ID</FormLabel>
                  {isEditable ? (
                    <Input
                      borderRadius="15px"
                      size="lg"
                      isDisabled
                      type="email"
                      w="100%"
                      maxW="400px"
                      value={data.email}
                    />
                  ) : (
                    <Text fontSize="lg">{data.email}</Text>
                  )}
                </FormControl>
              )}

              {!data.email_verified && data.public_address && (
                <FormControl id="email">
                  <FormLabel color="subtle">
                    <Flex w={"100%"}>
                      Email
                      <Tooltip
                        label="Email verification is pending"
                        placement="top"
                      >
                        <InfoIcon color={"accent"} ml={1} fontSize="sm" />
                      </Tooltip>
                    </Flex>
                  </FormLabel>
                  <Stack
                    spacing={6}
                    direction={["column", "column", "column", "row"]}
                  >
                    <Input
                      borderRadius="15px"
                      size="lg"
                      isDisabled={data.verification_email_sent}
                      type="email"
                      w="100%"
                      maxW="400px"
                      defaultValue={metaMaskEmail}
                      onChange={(e) => setMetaMaskEmail(e.target.value)}
                    />
                    <Button
                      variant={"brand"}
                      onClick={!emailSend ? updateEmail : onResendEmail}
                      disabled={!metaMaskEmail}
                      px={10}
                      minW={"150px"}
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : emailSend ? (
                        "Resend Email"
                      ) : (
                        "Verify Email"
                      )}
                    </Button>
                  </Stack>
                  {emailSend && (
                    <Text color="success" my={2}>
                      <Icon as={FiCheck} /> email sent successfully. Check your
                      inbox for verification link.
                    </Text>
                  )}
                  <Text my={2} color="#FF2400" fontSize="sm">
                    {error}
                  </Text>
                </FormControl>
              )}
            </VStack>
          </form>
        </Box>
      )}
      {!data?.public_address && <ChangePasswordForm />}
    </Box>
  );
};

type PasswordChangeFormData = {
  password: string;
  new_password: string;
  confirm_password: string;
};

const ChangePasswordForm: React.FC = () => {
  const history = useHistory();
  const toast = useToast();

  const { handleSubmit, register, formState } =
    useForm<PasswordChangeFormData>();

  const onSubmit = async ({
    password,
    new_password,
    confirm_password,
  }: PasswordChangeFormData) => {
    if (new_password !== confirm_password) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      await API.post(API_PATH.API_CHANGE_PASSWORD, { password, new_password });
      Auth.deauthenticateUser();
      history.push("/signin?isPasswordReset=true");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box w="100%" bgColor="white" borderRadius="20px" p={4} px={6} mt={8}>
      <Text fontSize="xl">Security</Text>

      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Box py={6}>
          <ViewableInputGroup
            key="password"
            label="Old Password"
            isRequired
            {...register("password", { required: true })}
          />
          <ViewableInputGroup
            key="new_password"
            label="New Password"
            isRequired
            {...register("new_password", { required: true })}
          />
          <ViewableInputGroup
            key="confirm_password"
            label="Confirm Password"
            isRequired
            {...register("confirm_password", { required: true })}
          />

          <Button
            variant="brand"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Change Password
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const ViewableInputGroup: React.FC<
  InputProps & { label: string; key: string }
> = ({ label, key, ...props }) => {
  const [isViewable, setViewable] = useState(false);
  return (
    <FormControl id={key} mb={4}>
      <FormLabel color="subtle">{label}</FormLabel>
      <InputGroup size="lg" w="100%" maxW="400px">
        <Input
          borderRadius="15px"
          type={isViewable ? "text" : "password"}
          {...props}
        />
        <InputRightElement>
          <Icon
            cursor="pointer"
            color="gray.500"
            as={isViewable ? AiOutlineEyeInvisible : AiOutlineEye}
            onClick={() => setViewable(!isViewable)}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default Profile;
