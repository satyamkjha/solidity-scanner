import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  useDisclosure,
  SkeletonText,
  Skeleton,
  Image,
  Divider,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import ManualAuditForm from "components/modals/manualAuditForm";
import { useConfig } from "hooks/useConfig";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { isInViewport } from "common/functions";

export default function ManualAudit() {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex
      w="100%"
      h="fit-content"
      justifyContent="center"
      alignItems={"center"}
    >
      <Flex
        mx={[0, 0, 0, "auto"]}
        my={[0, 0, 0, 10]}
        p={[5, 10, 20]}
        maxW={"1200px"}
        justifyContent="flex-start"
        alignItems={["center", "center", "center", "flex-start"]}
        flexDir="column"
        sx={{
          w: "90%",
          backgroundColor: "#000000",
          backgroundImage: `url('${assetsURL}background/manual_audit_bg_desktop.svg')`,
          borderRadius: 20,
          overflow: "hidden",
          mb: 10,
        }}
      >
        <Image
          src={`${assetsURL}logo/credshields_white_logo.svg`}
          height={"100px"}
          width={"240px"}
        />
        <Text
          fontSize="md"
          color="white"
          my={10}
          textAlign={["center", "center", "center", "left"]}
        >
          Application ecosystems are evolving everyday, and so are the security
          practises around them. From web-applications to smart contract code
          review to a security audit of your cloud infra. Our services ensure
          your security is in safe-hands.
        </Text>
        <Flex
          flexDir={[
            "column-reverse",
            "column-reverse",
            "column-reverse",
            "row",
          ]}
          justifyContent={[
            "flex-start",
            "flex-start",
            "flex-start",

            "space-between",
          ]}
          alignItems={["center", "center", "center", "flex-end"]}
          width="100%"
        >
          <Flex
            flexDir={["column", "column", "row"]}
            justifyContent={["center", "center", "center", "flex-start"]}
            alignItems="center"
            w="100%"
          >
            <Button
              variant="white"
              width="220px"
              onClick={onOpen}
              mr={[0, 0, 10]}
              mt={10}
            >
              Request manual audit
            </Button>
            <Button
              variant="white-ghost"
              py={7}
              width="220px"
              onClick={() => window.open("https://credshields.com/", "_blank")}
              rightIcon={<ExternalLinkIcon />}
              mt={10}
              borderRadius={7}
            >
              View CredShields
            </Button>
          </Flex>
          <Flex
            flexDir={"column"}
            p={5}
            justifyContent="flex-start"
            alignItems={["center", "center", "flex-start"]}
            backgroundColor="rgba(114, 114, 114, 0.19)"
            borderRadius={5}
            w={["100%", "100%", "fit-content"]}
          >
            <Text
              fontSize={"md"}
              fontFamily="monospace"
              textAlign={["center", "center", "left"]}
            >
              Products by team CredShields
            </Text>
            <Flex
              flexDir={["column", "column", "row"]}
              justifyContent="flex-start"
              alignItems="center"
              mt={7}
              w="fit-content"
            >
              <Image
                src={`${assetsURL}logo/solidity_scan_white_logo.svg`}
                height={"30px"}
                width={"190px"}
                maxW="190px"
              />
              <Divider
                display={["block", "block", "none"]}
                borderWidth={1}
                w="90%"
                my={5}
                borderColor="#3E3645"
              />
              <Divider
                display={["none", "none", "block"]}
                orientation={"vertical"}
                borderWidth={1}
                h="30px"
                mx={5}
                borderColor="#3E3645"
              />
              <Image
                onClick={() => window.open("https://rustscan.com/", "_blank")}
                src={`${assetsURL}logo/rustscan_white_logo.svg`}
                height={"30px"}
                width={"160px"}
                maxW="160px"
              />
            </Flex>
          </Flex>
        </Flex>
        <ManualAuditForm isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Flex>
  );
}

export function ManualAuditSkeleton() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      py={24}
      px={[0, 0, 0, 24]}
      my={10}
      w="100%"
      flexDir={"column"}
    >
      <SkeletonText
        startColor="lightgray"
        endColor="#eeeeee"
        noOfLines={[4, 4, 2]}
        spacing="4"
        skeletonHeight="5"
        w={["100%", "100%", "60%"]}
      />
      <Skeleton
        w={"180px"}
        h={"50px"}
        mt={16}
        startColor="lightgray"
        endColor="#eeeeee"
        borderRadius={"15px"}
      ></Skeleton>
    </Flex>
  );
}
