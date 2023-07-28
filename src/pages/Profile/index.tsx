import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  useToast,
  Stack,
  Tooltip,
  useDisclosure,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { getReCaptchaHeaders } from "helpers/helperFunction";
import { useQueryClient } from "react-query";
import {
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { sentenceCapitalize } from "helpers/helperFunction";
import { useProfile } from "hooks/useProfile";
import DeleteAccountForm from "./DeleteAccountForm";
import API from "helpers/api";
import Auth from "helpers/auth";
import { API_PATH } from "helpers/routeManager";
import { AuthResponse } from "common/types";
import { InfoIcon } from "@chakra-ui/icons";
import Loader from "components/styled-components/Loader";
import { onLogout } from "common/functions";
import { monthNames } from "common/values";
import { useUserOrgProfile } from "hooks/useUserOrgProfile";

const Profile: React.FC = () => {
  const toast = useToast();
  const [isEditable, setEditable] = useState(false);
  const [emailSend, setEmailSend] = useState(false);
  const [metaMaskEmail, setMetaMaskEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: orgProfile, refetch: refetchOrgProfile } =
    useUserOrgProfile(true);
  const [companyName, setCompanyName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const { data } = useProfile();
  const queryClient = useQueryClient();

  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    if (data) {
      setEmailSend(data.verification_email_sent);
      if (data.verification_email_sent && !data.email_verified)
        setMetaMaskEmail(data.email);
      setCompanyName(data.company_name);
      setContactNumber(data.contact_number);
      setFirstName(data.name);
      setIsOwner(data.logged_in_via === "normal_login");
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

  const checkFormValidation = () => {
    if (companyName && (companyName.length < 5 || companyName.length > 40)) {
      return false;
    }
    if (
      contactNumber &&
      (contactNumber.length < 8 || contactNumber.length > 15)
    ) {
      return false;
    }
    if (firstName && (firstName.length < 5 || firstName.length > 40)) {
      return false;
    }
    return true;
  };

  const onSave = async () => {
    if (!checkFormValidation()) {
      toast({
        title: "Form Data is not correct",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setUpdateLoading(true);
      const { data } = isOwner
        ? await API.post(API_PATH.API_UPDATE_PROFILE, {
            company_name: companyName,
            contact_number: contactNumber,
            first_name: firstName,
          })
        : await API.put(API_PATH.API_UPDATE_USER_ORGANISATION_PROFILE, {
            contact_number: contactNumber,
            first_name: firstName,
          });

      queryClient.invalidateQueries("profile");
      if (data.status === "success") {
        toast({
          title: "Profile Updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        setEditable(false);
      }
    } catch (e) {
      console.log(e);
      setUpdateLoading(false);
    }
    setUpdateLoading(false);
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
    let reqHeaders = await getReCaptchaHeaders("send_email");
    const { data } = await API.post<AuthResponse>(
      API_PATH.API_SEND_EMAIL,
      {
        email: metaMaskEmail,
      },
      {
        headers: reqHeaders,
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
            my: 24,
            justifyContent: "center",
          }}
        >
          <Loader />
        </Flex>
      )}

      {data && (
        <>
          {" "}
          <form
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <Flex w="100%" alignItems="center" justifyContent="space-between">
              <Text fontWeight={300} fontSize="xl">
                Profile Details
              </Text>
              {isEditable ? (
                <Button
                  variant="accent-ghost"
                  type="submit"
                  isLoading={updateLoading}
                  spinner={<Loader color={"#3300FF"} size={25} />}
                  onClick={(e) => {
                    e.preventDefault();
                    onSave();
                  }}
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
            <VStack w="100%" spacing={isEditable ? 4 : 8} my={4}>
              <FormControl id="name">
                <FormLabel color="subtle">Name</FormLabel>
                {isEditable ? (
                  <Input
                    borderRadius="15px"
                    size="lg"
                    isRequired
                    isDisabled={updateLoading}
                    type="text"
                    w="100%"
                    maxW="600px"
                    defaultValue={data.name}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    isDisabled={updateLoading || !isOwner}
                    type="text"
                    w="100%"
                    maxW="600px"
                    defaultValue={data.company_name}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
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
                    isDisabled={updateLoading}
                    type="number"
                    w="100%"
                    maxW="600px"
                    defaultValue={data.contact_number}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                    }}
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
                      maxW="600px"
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
                      maxW="600px"
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
                      maxW="600px"
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
                        <Loader />
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
          {!data.public_address && <ChangePasswordForm isOwner={isOwner} />}
          {isOwner && <DeleteAccountBox />}
          {orgProfile &&
            orgProfile.user_organization &&
            orgProfile.user_organization.status === "joined" && (
              <OrganisationBox
                isOwner={isOwner}
                organizations={orgProfile.user_organization}
                refetchOrgProfile={refetchOrgProfile}
              />
            )}
        </>
      )}
    </Box>
  );
};

const ChangePasswordForm: React.FC<{ isOwner: boolean }> = ({ isOwner }) => {
  const history = useHistory();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleSubmit } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { data } = isOwner
        ? await API.post(API_PATH.API_CHANGE_PASSWORD, {
            password: password,
            new_password: newPassword,
          })
        : await API.put(API_PATH.API_UPDATE_USER_ORGANISATION_PROFILE, {
            password: password,
            new_password: newPassword,
          });
      if (data.status === "success") {
        Auth.deauthenticateUser();
        history.push("/signin?isPasswordReset=true");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <Box w="100%" bgColor="white" borderRadius="20px" p={4} px={6} mt={8}>
      <Text fontWeight={300} fontSize="xl">
        Security
      </Text>
      <form
        style={{
          padding: "20px 0px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ViewableInputGroup
          key="password"
          label="Old Password"
          value={password}
          setValue={setPassword}
        />
        <ViewableInputGroup
          key="new_password"
          label="New Password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <ViewableInputGroup
          key="confirm_password"
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />

        <Button
          variant="brand"
          type="submit"
          onClick={onSubmit}
          isLoading={isLoading}
          spinner={<Loader color={"#3300FF"} size={25} />}
        >
          Change Password
        </Button>
      </form>
    </Box>
  );
};

const OrganisationBox: React.FC<{
  isOwner: boolean;
  organizations: {
    org_name: string;
    role: "admin" | "owner" | "editor" | "viewer";
    status: string;
    joined_at: string;
  };
  refetchOrgProfile(): any;
}> = ({ isOwner, organizations, refetchOrgProfile }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const history = useHistory();
  const queryClient = useQueryClient();
  const toast = useToast();

  let d = new Date(organizations.joined_at);

  const leaveOrg = async () => {
    const { data } = await API.get(API_PATH.API_LEAVE_ORGANISATION);
    if (data.status === "success") {
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      toast({
        title: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
    onClose();
    onLogout(history, queryClient);
  };

  const deleteOrg = async () => {
    const { data } = await API.delete(API_PATH.API_DELETE_ORGANISATION);
    if (data.status === "success") {
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      toast({
        title: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
    refetchOrgProfile();
    onClose();
  };

  return (
    <Box w="100%" bgColor="white" borderRadius="20px" p={4} px={6} mt={8}>
      <Text fontWeight={300} fontSize="xl">
        {isOwner ? "Close" : "Leave"} Organization
      </Text>
      <Text mt={5} fontWeight={700} fontSize="md">
        {organizations.org_name}
      </Text>
      <HStack mt={2}>
        <Text fontWeight={700} fontSize="sm">
          {sentenceCapitalize(organizations.role)}
        </Text>
        <Text fontWeight={700} fontSize="sm" color="#B0B7C3">
          |{" "}
          {`${isOwner ? "Created" : "Joined"} at ${d.getDate()} ${
            monthNames[d.getMonth()]
          } ${d.getFullYear()}`}
        </Text>
      </HStack>
      <Text mt={10} fontWeight={300} color="gray.500" fontSize="md">
        This action is permanent and cannot be undone.
      </Text>
      <Button
        variant={"outline"}
        mt={5}
        bg={"white"}
        w={["200px"]}
        borderColor="#FF5630"
        color="#FF5630"
        onClick={onOpen}
      >
        {isOwner ? "Close" : "Leave"} Organization
      </Button>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm {isOwner ? "Close" : "Leave"} Organisation
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to {isOwner ? "Close" : "Leave"}{" "}
              <Box as="span" sx={{ fontWeight: 600 }}>
                {organizations.org_name}
              </Box>{" "}
              Organisation ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} py={6}>
                No, My bad
              </Button>
              <Button
                variant="brand"
                onClick={() => {
                  if (isOwner) {
                    deleteOrg();
                  } else {
                    leaveOrg();
                  }
                }}
                ml={3}
              >
                {isOwner ? "Close" : "Leave"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

const DeleteAccountBox: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box w="100%" bgColor="white" borderRadius="20px" p={4} px={6} mt={8}>
      <Text fontWeight={300} fontSize="xl">
        Delete Account
      </Text>
      <Text mt={5} fontWeight={700} fontSize="md">
        Delete your account
      </Text>
      <Text mt={5} fontWeight={300} color="gray.500" fontSize="md">
        This action is permanent and cannot be undone.
      </Text>
      <Button
        variant={"outline"}
        mt={5}
        bg={"white"}
        w={["200px"]}
        borderColor="#FF5630"
        color="#FF5630"
        onClick={onOpen}
      >
        Delete Account
      </Button>
      <DeleteAccountForm onClose={onClose} isOpen={isOpen} />
    </Box>
  );
};

const ViewableInputGroup: React.FC<{
  label: string;
  key: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ label, key, value, setValue }) => {
  const [isViewable, setViewable] = useState(false);
  return (
    <>
      <Text color="subtle">{label}</Text>
      <InputGroup size="lg" w="100%" maxW="400px" mb={4}>
        <Input
          borderRadius="15px"
          type={isViewable ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
    </>
  );
};

export default Profile;
