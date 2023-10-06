import React, { useState, useEffect } from "react";
import { Flex, Box, Text, VStack } from "@chakra-ui/react";

import Loader from "components/styled-components/Loader";
import UserManagementContainer from "./UserManagementContainer";
import { Profile } from "common/types";

const Organisation: React.FC<{ profileData?: Profile }> = ({ profileData }) => {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (
      profileData &&
      ["pro", "custom"].includes(profileData.current_package)
    ) {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, [profileData]);

  return (
    <Box
      sx={{
        w: ["100%", "100%", "calc(100% - 2rem)"],
        h: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        pt: 4,
        pb: 1,
        px: [2, 2, 2, 8],
        mx: [0, 0, 4],
        my: 2,
        minH: "78vh",
      }}
    >
      <VStack alignItems="flex-start" spacing={0} pl={4}>
        <Text color="subtle" fontWeight="600" fontSize="sm">
          ADMIN CONTROLS
        </Text>
      </VStack>
      {!profileData ? (
        <Flex
          sx={{
            w: "100%",
            mx: [0, 0, 0, 4],
            my: 24,
            justifyContent: "center",
          }}
        >
          <Loader />
        </Flex>
      ) : (
        <UserManagementContainer hasAccess={hasAccess} />
      )}
      {/* <Tabs
        mt={[3, 3, 5]}
        mx={0}
        px={0}
        w={"100%"}
        variant="soft-rounded"
        colorScheme="green"
      >
        <Flex
          width={"90%"}
          overflowX={["scroll", "scroll", "scroll", "visible"]}
          flexDir={"row"}
          justifyContent="flex-start"
          align={"center"}
          ml={0}
          px={4}
        >
          <TabList my={3} width={"fit-content"} zIndex={0}>
            <Tab minW={["150px", "150px", "250px"]} bgColor={"#F5F5F5"} mr={5}>
              User Management
            </Tab>
            <Tab
              minW={["150px", "150px", "250px"]}
              bgColor={"#F5F5F5"}
              mx={[2, 3, 5]}
            >
              Organisation Settings
            </Tab>
          </TabList>
        </Flex>
        {isLoading ? (
          <Flex
            sx={{
              w: "100%",
              mx: [0, 0, 0, 4],
              my: 24,
              justifyContent: "center",
            }}
          >
            <Loader />
          </Flex>
        ) : (
          <TabPanels width={"100%"}>
            <TabPanel width={"100%"} p={0}></TabPanel>
            <TabPanel width={"100%"} p={0}>
              <OrganisationSettingsContainer />
            </TabPanel>
          </TabPanels>
        )}
      </Tabs> */}
    </Box>
  );
};

export default Organisation;
