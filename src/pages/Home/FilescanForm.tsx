import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  HStack,
  VStack,
  Progress,
  CloseButton,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import { ProjectIcon, SolidityFileIcon, UploadIcon } from "components/icons";
import API from "helpers/api";
import { useDropzone } from "react-dropzone";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";
import { Profile } from "common/types";
import { useUserRole } from "hooks/useUserRole";
import UploadTypeCard from "./UploadTypeCard";
import UploadForm from "./UploadForm";
import { AddProjectFormInfographics } from "./AddProjectFormInfographics";
import { getAssetsURL } from "helpers/helperFunction";
import { infographicsData } from "common/values";

const FilescanForm: React.FC<{
  profileData: Profile;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  uploadType: "single" | "multiple";
  setUploadType: React.Dispatch<React.SetStateAction<"single" | "multiple">>;
  changeView: boolean;
}> = ({
  profileData,
  page,
  setPage,
  uploadType,
  setUploadType,
  changeView,
}) => {
  const role: string = useUserRole();
  let isViewer = role === "viewer";
  const assetsURL = getAssetsURL();

  return (
    <>
      {profileData && (
        <Flex
          flexDir="column"
          px={2}
          h={["90vh", "90vh", "75vh"]}
          justifyContent={"space-between"}
          alignItems="center"
          borderRadius={20}
          opacity={isViewer ? 0.5 : 1}
        >
          <Flex
            justifyContent="flex-start"
            flexDirection="column"
            alignItems="center"
          >
            <Text
              w="100%"
              sx={{
                fontSize: ["xl", "xl", "2xl"],
                fontWeight: 600,
                textAlign: changeView ? "left" : "center",
                mb: 4,
              }}
            >
              Upload contract
            </Text>
            {((!changeView && [1, 3].includes(page)) || changeView) && (
              <VStack h="150px">
                <Text
                  w="100%"
                  sx={{
                    fontSize: "sm",
                    color: "subtle",
                    textAlign: "left",
                    mb: 2,
                  }}
                >
                  Upload your Solidity files (.sol extension) as a project and
                  scan to detect vulnerabilities in your project.
                </Text>
                <Text
                  sx={{
                    fontSize: "sm",
                    color: "subtle",
                    textAlign: "left",
                    mb: 2,
                  }}
                >
                  See tutorials and additional restrictions in the User Guide
                  available on{" "}
                  <Box
                    as="span"
                    color="accent"
                    onClick={() =>
                      window.open("https://docs.solidityscan.com/", "_blank")
                    }
                  >
                    {" "}
                    docs.solidityscan.com
                  </Box>
                  .
                </Text>
              </VStack>
            )}
          </Flex>
          {page === 0 && (
            <AddProjectFormInfographics
              imgUrl={`${assetsURL}homepage_infographics/filescan_step_1.svg`}
              instructions={infographicsData["filescan_step_1"]}
            />
          )}

          {page === 1 && (
            <VStack alignItems={"flex-start"} width="100%" spacing={5}>
              <UploadTypeCard
                uploadMethod="multiple"
                uploadType={uploadType}
                setUploadType={setUploadType}
              />
              <UploadTypeCard
                uploadMethod="single"
                uploadType={uploadType}
                setUploadType={setUploadType}
              />
            </VStack>
          )}
          {(changeView ? page === 2 : page === 3) && (
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems="center"
              width={"100%"}
              h="calc(100% - 200px)"
            >
              <UploadForm profileData={profileData} uploadType={uploadType} />
            </Flex>
          )}

          {!changeView &&
            page === 2 &&
            (uploadType === "single" ? (
              <AddProjectFormInfographics
                imgUrl={`${assetsURL}homepage_infographics/filescan_step_2_single.svg`}
                instructions={infographicsData["filescan_step_2_single"]}
              />
            ) : (
              <AddProjectFormInfographics
                imgUrl={`${assetsURL}homepage_infographics/filescan_step_2_multiple.svg`}
                instructions={infographicsData["filescan_step_2_multiple"]}
              />
            ))}
          {((changeView && page !== 2) || (!changeView && page !== 3)) && (
            <Button
              type="submit"
              variant="brand"
              mt={4}
              w="100%"
              spinner={<Loader color={"#3300FF"} size={25} />}
              onClick={() => {
                if (changeView) {
                  setPage(2);
                } else {
                  setPage(page + 1);
                }
              }}
            >
              Proceed
            </Button>
          )}
        </Flex>
      )}
    </>
  );
};

export default FilescanForm;
