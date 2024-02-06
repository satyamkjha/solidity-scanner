import React, { useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import {
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  HStack,
  Image,
} from "@chakra-ui/react";
import { FiAtSign } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Logo } from "components/icons";
import API from "helpers/api";
import { AuthResponse } from "common/types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { API_PATH } from "helpers/routeManager";
import { getReCaptchaHeaders, getAssetsURL } from "helpers/helperFunction";
import Loader from "components/styled-components/Loader";
import { passwordStrength } from "check-password-strength";
import { isEmail } from "helpers/helperFunction";
import PasswordError from "components/passwordError";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DownloadQSReport: React.FC = () => {
  const { handleSubmit } = useForm<FormData>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const assetsURL = getAssetsURL();
  const [reportName, setReportName] = useState("");
  const [s3Url, sets3url] = useState("");
  const { transactionId } = useParams<{
    transactionId: string;
  }>();
  const onSubmit = async () => {
    try {
      //   let reqHeaders = await getReCaptchaHeaders("forgot_password_set");
      setIsLoading(true);
      const { data } = await API.post(API_PATH.API_GET_QUICK_SCAN_REPORT_PDF, {
        transaction_id: transactionId,
        email,
      });

      if (data.status === "success") {
        sets3url(data.download_url);
        setReportName(data.contract_address);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        maxW="80vw"
        mx="auto"
        py={8}
      >
        <Logo />
      </Flex>

      {s3Url === "" ? (
        <Flex align="center" direction="column" textAlign="center" my={40}>
          <Heading fontSize="2xl">Audit Report Email Verification</Heading>
          <Text color="subtle" my={3}>
            Enter your email ID and confirm to unlock your audit report!
          </Text>

          <Stack spacing={6} mt={8} width={["300px", "400px", "600px"]}>
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputGroup alignItems="center" mb={5}>
                <InputLeftElement
                  height="48px"
                  children={<Icon as={FiAtSign} color="gray.300" />}
                />
                <Input
                  isRequired
                  type="email"
                  placeholder="Your email"
                  variant="brand"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>

              <Button
                mt={"120px"}
                type="submit"
                maxW="400px"
                variant="brand"
                isLoading={isLoading}
                spinner={<Loader color={"#3300FF"} size={25} />}
                w="100%"
                isDisabled={
                  email.length < 1 || email.length > 50 || !isEmail(email)
                }
              >
                Confirm Email
              </Button>
              <Text color="subtle" mt={7}>
                having issues ?{" "}
                <span style={{ color: "#000000" }}>
                  <b> Contact us</b>
                </span>
              </Text>
            </form>
          </Stack>
        </Flex>
      ) : (
        <Flex
          align="center"
          direction="column"
          textAlign="center"
          my={[20, 20, 40]}
        >
          <Heading fontSize="2xl">Audit Report Email Verification</Heading>
          <Text color="subtle" my={3}>
            Email Verified Successfully! Please download your Audit Report.
          </Text>

          <Stack
            textAlign="center"
            spacing={10}
            mt={8}
            alignItems={"center"}
            width={["300px", "500px", "800px"]}
          >
            <Text color="subtle" mt={7}>
              One Time Audit Report for
              <span style={{ color: "#000000" }}>
                <b> {email}</b>
              </span>
            </Text>
            <Stack
              h={["fit-content", "fit-content", "120px"]}
              borderRadius={8}
              bgColor="#F7F9FC"
              padding={10}
              w="100%"
              spacing={10}
              direction={["column", "column", "row"]}
              alignItems={"center"}
              justifyContent={["flex-start", "flex-start", "space-between"]}
            >
              <HStack w={["90%", "90%", "50%"]}>
                <Image src={`${assetsURL}icons/pdf-icon.svg`} />
                <Text isTruncated color="#000000" fontWeight={700} mt={7}>
                  {reportName}
                </Text>
              </HStack>
              <Button
                w="250px"
                onClick={() => window.open(s3Url, "_blank")}
                variant="black-outline"
                fill="#000000"
              >
                Download Audit Report PDF
              </Button>
            </Stack>
            <Text color="subtle" mt={7}>
              having issues ?{" "}
              <span style={{ color: "#000000" }}>
                <b> Contact us</b>
              </span>
            </Text>
          </Stack>
        </Flex>
      )}
    </>
  );
};

export default DownloadQSReport;
