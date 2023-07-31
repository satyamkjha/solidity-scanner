import React, { useState, useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import { MailSent } from "components/icons";

import { Helmet } from "react-helmet";
import Auth from "helpers/auth";

const CheckEmail: React.FC = () => {
  const [email, setEmail] = useState<string | null>("");
  useEffect(() => {
    if (localStorage.getItem("current-registered-email")) {
      setEmail(localStorage.getItem("current-registered-email"));
      localStorage.removeItem("current-registered-email");
    }
    let intervalId: NodeJS.Timeout;
    const checkIfAuthenticated = () => {
      intervalId = setInterval(async () => {
        if (Auth.isUserAuthenticated()) {
          // history.push("/home");
        }
      }, 2000);
    };
    checkIfAuthenticated();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Event snippet for Signup Completion - Nov conversion page */}
        <script>
          {`  gtag('event', 'conversion', {'send_to': 'AW-11015092885/e-hACNzf-4IYEJX1s4Qp'});`}
        </script>
      </Helmet>
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        w="100%"
        height="100%"
        my={36}
        px={5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <MailSent size={130} />
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
    </>
  );
};

export default CheckEmail;
