import { WarningIcon } from "@chakra-ui/icons";
import { HStack, VStack, Text, Button, Box, Flex, Icon, Image, Stack, useMediaQuery } from "@chakra-ui/react";
import { FilesState, MultiFileTemplateDetail } from "common/types";
import { issueActions } from "common/values";
import { sentenceCapitalize } from "helpers/helperFunction";
import React, { Dispatch, SetStateAction } from "react";
import { BiCodeCurly } from "react-icons/bi";
import { MultiFileExplorer } from "./result";
import TrialWall from "./trialWall";

import Select from "react-select";


export const DetailedResult: React.FC<{
    type: "block" | "project";
    is_latest_scan: boolean;
    files: FilesState | null;
    confidence: boolean[];
    setConfidence: Dispatch<SetStateAction<boolean[]>>;
    details_enabled: boolean;
    updateBugStatus: any
  }> = ({
    type,
    is_latest_scan,
    files,
    confidence,
    setConfidence,
    details_enabled,
    updateBugStatus,
  }) => {

    const [isDesktopView] = useMediaQuery("(min-width: 1024px)");

    const customStyles = {
        option: (provided: any, state: any) => ({
          ...provided,
          borderBottom: "1px solid #f3f3f3",
          backgroundColor: state.isSelected
            ? "#FFFFFF"
            : state.isFocused
            ? "#E6E6E6"
            : "#FFFFFF",
          color: "#000000",
        }),
        menu: (provided: any, state: any) => ({
          ...provided,
          color: state.selectProps.menuColor,
          borderRadius: 10,
          border: "0px solid #ffffff",
          overflowY: "hidden",
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          width: isDesktopView ? 300: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#FAFBFC",
          padding: 5,
          borderRadius: 20,
        }),
        singleValue: (provided: any, state: any) => {
          const opacity = state.isDisabled ? 0.3 : 1;
          const transition = "opacity 300ms";
    
          return { ...provided, opacity, transition };
        },
      };
    
    return (
        <VStack
          w={["100%", "100%", "100%", "60%"]}
          h={["100%"]}
          alignItems="flex-start"
          spacing={5}
          pl={[0, 0, 0, 10]}
        >
          <HStack
            width={"100%"}
            justify={"space-between"}
            display={["none", "none", "none", "flex"]}
          >
            <Text fontWeight={600}>Confidence Parameter</Text>
            <HStack>
              <Button
                variant={confidence[2] ? "solid" : "outline"}
                py={0}
                onClick={() =>
                  setConfidence([confidence[0], confidence[1], !confidence[2]])
                }
              >
                <WarningIcon color={"low"} mr={2} /> Certain
              </Button>
              <Button
                variant={confidence[1] ? "solid" : "outline"}
                py={0}
                onClick={() =>
                  setConfidence([confidence[0], !confidence[1], confidence[2]])
                }
              >
                <WarningIcon color={"medium"} mr={2} /> Firm
              </Button>
              <Button
                variant={confidence[0] ? "solid" : "outline"}
                py={0}
                onClick={() =>
                  setConfidence([!confidence[0], confidence[1], confidence[2]])
                }
              >
                <WarningIcon color={"high"} mr={2} /> Tentative
              </Button>
            </HStack>
          </HStack>
          {files && files.bug_status !== "fixed" && is_latest_scan && (
            <Stack
              justify="space-between"
              alignItems={"center"}
              width={"100%"}
              direction={["column", "column", "column", "row"]}
            >
              <Text fontWeight={600}>Take Action</Text>
              <Select
                formatOptionLabel={formatOptionLabel}
                options={issueActions}
                value={issueActions.find((item) => files?.bug_status === item.value)}
                placeholder="Select Action"
                styles={customStyles}
                onChange={(newValue) => {
                  if (newValue) {
                    updateBugStatus(newValue.value);
                  }
                }}
              />
            </Stack>
          )}
          {files &&
            ((files.bug_status !== "pending_fix" && !is_latest_scan) ||
              files.bug_status === "fixed") && (
              <HStack justify="flex-end" width={"100%"}>
                <HStack bg={"gray.100"} px={10} py={2} borderRadius={30}>
                  <Text mr={2} color={"gray.600"} fontWeight={500}>
                    The issue has been marked as
                  </Text>
                  <Image mr={3} src={`/icons/${files.bug_status}.svg`} />
                  <Text fontWeight={700}>
                    {sentenceCapitalize(
                      files.bug_status.toLowerCase().replace("_", " ")
                    )}
                  </Text>
                </HStack>
              </HStack>
            )}

          <Box
            sx={{
              w: "100%",
              position: "sticky",
              top: 8,
            }}
          >
            {!details_enabled ? (
              <TrialWall />
            ) : files ? (
              <MultiFileExplorer files={files} type={type} />
            ) : (
              <Flex
                sx={{
                  w: "100%",
                  bg: "bg.subtle",
                  flexDir: "column",
                  alignItems: "center",
                }}
                py={36}
              >
                <Icon as={BiCodeCurly} fontSize="40px" color="subtle" mb={4} />
                <Text color="subtle">
                  Please select a file from an issue to see vulnerability
                  details.
                </Text>
              </Flex>
            )}
          </Box>
        </VStack>
    )
};

const formatOptionLabel: React.FC<{
    value: string;
    label: string;
    icon: string;
  }> = ({ label, icon }) => (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Image mr={3} src={`/icons/${icon}.svg`} />
      <div>{label}</div>
    </div>
  );

export default DetailedResult