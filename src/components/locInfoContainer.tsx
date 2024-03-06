import React from "react";
import { HStack, Image, Text, Box, VStack, Progress } from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useUserRole } from "hooks/useUserRole";

export const LOCInfoContainer: React.FC<{
  remainingLoc?: number;
  view: "insufficient_scan_modal" | "header" | "topup_page";
}> = ({ remainingLoc, view }) => {
  const assetsURL = getAssetsURL();
  const { profileData } = useUserRole();
  remainingLoc = remainingLoc || profileData?.loc_remaining;

  return (
    <HStack justifyContent="flex-start" alignItems="center" w="100%">
      {view !== "topup_page" && (
        <Image
          height="50px"
          width="50px"
          src={`${assetsURL}common/loc-code.svg`}
          mx="auto"
        />
      )}
      <VStack
        w="calc(100% - 50px)"
        justifyContent="center"
        alignItems="flex-start"
        spacing={0}
      >
        <HStack justifyContent="space-between" w="100%">
          {profileData?.current_package === "trial" ? (
            <HStack spacing={1}>
              <Text fontWeight={600} fontSize="sm">
                Gas Bugs Only
              </Text>
              <Text color="subtle" fontSize="xs">
                (Free Trial)
              </Text>
            </HStack>
          ) : (
            <HStack spacing={0}>
              <Text fontWeight={700} fontSize="lg">
                {remainingLoc}
              </Text>
              <Text color="subtle" fontSize="sm">
                /{profileData?.total_loc}
              </Text>
              {view === "topup_page" && (
                <Text color="subtle" fontSize="sm">
                  &nbsp; &nbsp;
                  {"|"}&nbsp;&nbsp;Remaining{" "}
                  <span
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {" "}
                    Lines of Code
                  </span>
                </Text>
              )}
            </HStack>
          )}

          {view === "header" && (
            <Image src={`${assetsURL}icons/info.svg`} mx="auto" />
          )}
        </HStack>
        <Box w="100%" pt={view === "topup_page" ? 4 : 0} pb={1}>
          <Progress
            variant="loc"
            size="xs"
            value={remainingLoc}
            max={profileData?.total_loc}
          />
        </Box>
        {view !== "topup_page" && (
          <Text color="subtle" fontSize="xs">
            Used <strong> Lines of Code</strong>
          </Text>
        )}
      </VStack>
    </HStack>
  );
};
