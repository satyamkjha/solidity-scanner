import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Logo, MailSent, MailLock } from "components/icons";

import API from "helpers/api";
import Auth from "helpers/auth";

import { AuthResponse } from "common/types";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";
import { getRecentQuickScan, setRecentQuickScan } from "helpers/helperFunction";

const CustomFlex = motion(Flex);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Verify: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState<"success" | "failed" | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  const query = useQuery();
  let email = query.get("email")?.toString();
  const token = query.get("token")?.toString();

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true);
      try {
        const { data } = await API.post<AuthResponse>(
          API_PATH.API_VERIFY_EMAIL,
          {
            email,
            token,
          }
        );
        if (data && data.status === "success") {
          setVerification("success");
          setLoading(false);
          Auth.authenticateUser();
          const import_scan_details = getRecentQuickScan();
          if (import_scan_details) {
            setRecentQuickScan({ ...import_scan_details, new_user: true });
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setVerification("failed");
        setErrorMessage(error.response.data.message);
      }
    };
    verifyEmail();
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
        <Logo />
      </Flex>
      {loading && (
        <Flex align="center" direction="column" my={36}>
          <Loader />
        </Flex>
      )}

      {verification === "success" && (
        <CustomFlex
          align="center"
          direction="column"
          my={36}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MailSent size={130} />
          <Text fontSize="2xl" fontWeight={600} mb={4} mt={8}>
            Email has been verified
          </Text>
          <Link to="/home">
            <Button variant="brand" width="350px" my={2}>
              Go to dashboard
            </Button>
          </Link>
        </CustomFlex>
      )}
      {verification === "failed" && (
        <CustomFlex
          align="center"
          direction="column"
          my={36}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MailLock size={130} />
          <Text fontSize="2xl" fontWeight={600} mb={4} mt={8} color="red">
            {errorMessage}
          </Text>
        </CustomFlex>
      )}
    </>
  );
};

export default Verify;
