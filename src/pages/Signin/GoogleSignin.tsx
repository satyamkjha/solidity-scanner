import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Link } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignIn() {
  return (
    <Link
      href={
        process.env.REACT_APP_API_URL_PROD +
        "accounts/google/login/?process=login"
      }
      _hover={{
        textDecoration: "none",
      }}
    >
      <Button
        py={6}
        my={2}
        background="#F2F2F2"
        fontWeight={500}
        width={"fit-content"}
        alignSelf="center"
        px={10}
        color="#8B8B8B"
      >
        <Icon as={FcGoogle} mr={2} fontSize="28px" />
        Continue with Google
      </Button>
    </Link>
  );
}
