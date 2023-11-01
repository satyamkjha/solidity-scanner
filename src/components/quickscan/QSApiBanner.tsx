import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Divider,
  VStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import QSApiModal from "./QSApiModal";

export const QSApiBanner: React.FC = () => {
  const history = useHistory();
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      mx={[5, 10, 10, 20]}
      mt={20}
      sx={{
        w: "100%",
        background: `linear-gradient(98deg, #04080D -22.88%, #2900DE 218.68%)`,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Flex
        sx={{
          px: [4, 4, 10],
          py: [8, 8, 10],
          w: "100%",
          flexDir: ["column", "column", "row"],
          alignItems: "center",
          justifyContent: ["flex-start", "flex-start", "space-between"],
        }}
      >
        <Flex
          sx={{
            w: ["100%", "95%", "50%"],
            alignItems: ["center", "center", "flex-start"],
            justifyContent: "flex-start",
            textAlign: ["center", "center", "left"],
            flexDir: "column",
          }}
        >
          <Heading
            as="h2"
            fontSize="3xl"
            lineHeight="1.4"
            mb={4}
            color="white"
            textAlign={["center", "center", "left"]}
          >
            Get QuickScan API
          </Heading>
          <Text
            color="white"
            textAlign={["center", "center", "left"]}
            fontSize="lg"
            fontWeight={100}
          >
            Lorem ipsum dolor sit amet consectetur. Consequat mauris risus in
            rhoncus. Et sed condimentum faucibus lacus
          </Text>
          <Flex
            mt={[5, 5, 10]}
            mb={[5, 5, 0]}
            sx={{
              w: "100%",
              flexDir: ["column", "column", "row"],
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Button onClick={() => onOpen()} variant="brand" minWidth="250px">
              Request for API
            </Button>
            <Button
              onClick={() => {}}
              variant="white-outline"
              minWidth="250px"
              ml={[0, 0, 5]}
              mt={[5, 5, 0]}
            >
              Learn More
            </Button>
          </Flex>
        </Flex>
        <Image
          w={["90%", "90%", "40%"]}
          height="auto"
          src={`${assetsURL}quickscan/QSAPIBanner.svg`}
        />
      </Flex>
      <QSApiModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default QSApiBanner;
