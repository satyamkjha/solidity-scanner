import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import React from "react";
import { CredshieldsIcon } from "./icons";
import ManualAuditForm from "./modals/manualAuditForm";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

export default function ManualAuditCard() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isDesktopView] = useMediaQuery("(min-width: 1024px)");
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <>
      <Flex
        width="100%"
        justifyContent="center"
        bg={"bg.subtle"}
        borderRadius={"15px"}
      >
        <Box
          w={"100%"}
          bgImage={`url("${assetsURL}background/manualAuditbg.svg")`}
          bgSize="contain"
          bgPosition={"right"}
          bgRepeat={"no-repeat"}
          borderRadius={15}
          px={[4, 4, 4, 8]}
          py={6}
        >
          <Text fontSize="sm" fontWeight={600} letterSpacing={0.7}>
            REQUEST MANUAL AUDIT
          </Text>
          <Text
            fontSize="sm"
            fontWeight={400}
            color="detail"
            mt={4}
            lineHeight={"150%"}
          >
            Need a manual review by a dedicated team of security researchers?
            Fill up the form by clicking the button below and the CredShields
            audit team will reach out to you.
          </Text>
          <HStack
            w="100%"
            mt={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <CredshieldsIcon size={isDesktopView ? 90 : 70} />
            <Button px={5} variant="dark" onClick={onOpen}>
              <Text fontSize="xs"> Request Manual Audit</Text>
            </Button>
          </HStack>
        </Box>
      </Flex>
      <ManualAuditForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}
