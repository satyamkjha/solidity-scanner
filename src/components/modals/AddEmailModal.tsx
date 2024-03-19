import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Divider,
  Text,
  useToast,
  InputGroup,
  Input,
  Box,
} from "@chakra-ui/react";
import { Profile, AuthResponse } from "common/types";
import { MailSent } from "components/icons";
import { useQueryClient } from "react-query";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";
import { getReCaptchaHeaders, isEmail } from "helpers/helperFunction";

const AddEmailModal: React.FC<{
  onClose(): any;
  isOpen: boolean;
  description: string;
  profileData: Profile;
}> = ({ isOpen, onClose, description, profileData }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [verificationEmailSent, setVerificationEmailSent] = useState(
    profileData.verification_email_sent
  );
  const [email, setEmail] = useState(
    profileData.verification_email_sent ? profileData.email : ""
  );

  const updateEmail = async () => {
    setIsLoading(true);
    const { data } = await API.put(API_PATH.API_UPDATE_EMAIL, {
      email,
    });
    setIsLoading(false);
    if (data.status === "success") {
      setVerificationEmailSent(true);
      toast({
        title: "Verification email sent",
        description: `We've sent a link to your email ${email}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      queryClient.invalidateQueries("profile");
    } else {
      setVerificationEmailSent(false);
      setEmail("");
    }
  };

  const onResendEmail = async () => {
    setIsLoading(true);
    let reqHeaders = await getReCaptchaHeaders("send_email");
    const { data } = await API.post<AuthResponse>(
      API_PATH.API_SEND_EMAIL,
      {
        email,
      },
      {
        headers: reqHeaders,
      }
    );

    if (data.status === "success") {
      setVerificationEmailSent(true);
      toast({
        title: "Verification email sent",
        description: `We've sent a link to your email ${email}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "65vw"]}
          minW={"300px"}
          minH={"600px"}
          alignItems={"center"}
          borderRadius="15px"
          mb={10}
          py={5}
          px={[2, 2, 5, 5]}
        >
          <ModalHeader textAlign={"center"} fontSize={["lg", "lg", "xl"]}>
            Add Your Email
          </ModalHeader>
          <ModalCloseButton
            m={[6, 6, 6, 7]}
            onClick={() => {
              onClose();
            }}
          />
          <Divider
            w={"90%"}
            mb={10}
            color="#ECECEC"
            borderBottomWidth={"2px"}
          />
          <ModalBody h={"100%"} w={"100%"} px={[2, 2, 6, 12]}>
            <Flex
              justifyContent={"space-between"}
              w={"100%"}
              h={"50vh"}
              direction="column"
              alignItems={"center"}
            >
              {verificationEmailSent ? (
                <Flex
                  w={["100%", "100%", "80%"]}
                  direction="column"
                  alignItems={"center"}
                  textAlign="center"
                  justifyContent={"flex-start"}
                >
                  <MailSent size={180} />
                  <Text fontSize="2xl" fontWeight={600} mb={4} mt={8}>
                    Verify your email
                  </Text>
                  <Text textAlign="center" color="subtle">
                    We've sent a link to your {email} email address.
                  </Text>
                  <Text textAlign="center" mt={3} color="subtle">
                    Haven't received your email ? Have you checked your{" "}
                    <Box as="span" color={"black"} fontWeight={700}>
                      Spam/Promotions
                    </Box>{" "}
                    Folder?
                  </Text>
                </Flex>
              ) : (
                <Flex
                  w={["100%", "100%", "80%"]}
                  direction="column"
                  alignItems={"center"}
                  textAlign="center"
                  justifyContent={"flex-start"}
                >
                  <Text fontSize="md" fontWeight={500}>
                    Add your Email
                  </Text>
                  <Text fontSize="sm" color="#4E5D78" fontWeight={300}>
                    {description}
                  </Text>
                  <InputGroup mt={10} alignItems="center" mb={4}>
                    <Input
                      isRequired
                      type="email"
                      placeholder="Enter your email here"
                      variant={"brand"}
                      bgColor="#f7f9fa"
                      size="lg"
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                        }
                      }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Flex>
              )}

              <Button
                h={"50px"}
                mt={"auto"}
                mb={10}
                w="fit-content"
                variant="brand"
                px={12}
                isLoading={isLoading}
                borderRadius={10}
                fontSize={"md"}
                fontWeight={500}
                onClick={() => {
                  if (profileData.verification_email_sent) {
                    onResendEmail();
                  } else {
                    updateEmail();
                  }
                }}
                disabled={!isEmail(email)}
              >
                {profileData.verification_email_sent
                  ? "Resend Verfification Link"
                  : "Add Your Email"}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEmailModal;
