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

const FilescanForm: React.FC<{
  profileData: Profile;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  uploadType: "single" | "multiple";
  setUploadType: React.Dispatch<React.SetStateAction<"single" | "multiple">>;
}> = ({ profileData, page, setPage, uploadType, setUploadType }) => {
  const history = useHistory();
  const role: string = useUserRole();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [urlList, setUrlList] = useState<
    { url: string; name: string; file: File }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  let isViewer = role === "viewer";

  const getPreassignedURLList = async (acceptedFiles: File[]) => {
    let results = await acceptedFiles.map(async (file) => {
      return getPreassignedURL(file.name, file);
    });
    Promise.all(results).then((res) => {
      if (res.length === acceptedFiles.length) setUrlList([...res]);
    });
  };

  const uploadFiles = async (acceptedFiles: File[]) => {
    let results: any[] = [];
    urlList.forEach((item) => {
      results.push(
        new Promise((resolve, reject) => {
          postDataToS3(item.file, item.url).then(
            (res) => {
              resolve(res);
            },
            () => {
              postDataToS3(item.file, item.url).then(
                (res) => {
                  resolve(res);
                },
                () => {
                  reject(false);
                }
              );
            }
          );
        })
      );
    });
    Promise.all(results).then(
      (res) => {
        let count = 0;
        // res here is an array of boolean. Using this check if all the files are uploaded or not. Also give an option to remove a file if needed.

        res.forEach((item) => {
          if (item) count++;
        });
        // Add a flag to allow to go to step 2. Do not use count. Here in this step you also need to give an option to delete or remmove a file.
        if (count === acceptedFiles.length) {
          setStep(2);
        } else {
          setStep(0);
        }
      },
      () => {
        setStep(0);
      }
    );
  };

  //   useEffect(() => {
  //     if (urlList.length === acceptedFiles.length && urlList.length > 0) {
  //       uploadFiles();
  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [urlList]);

  const checkFileExt = (fileName: string) => {
    let fileExt = fileName.split(".");
    if (fileExt[fileExt.length - 1] === "sol") {
      return true;
    }
    return false;
  };

  const getPreassignedURL = async (fileName: string, file: File) => {
    const { data } = await API.get<{ status: string; result: { url: string } }>(
      `${API_PATH.API_GET_PREASSIGNED_URL}?file_name=${fileName}`
    );
    return {
      url: data.result.url,
      name: fileName,
      file: file,
    };
  };

  const postDataToS3 = async (fileData: File, urlString: string) => {
    const { status } = await API.put(urlString, fileData, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    if (status === 200) {
      return true;
    }
    return false;
  };

  const onSubmit = () => {
    if (page === 1) {
      setPage(2);
    } else {
      startFileScan();
    }
  };

  const startFileScan = async () => {
    let urlData = urlList.map((item) => item.url);
    try {
      setIsLoading(true);
      await API.post(API_PATH.API_PROJECT_SCAN, {
        file_urls: urlData,
        project_name: name,
        project_visibility: "public",
        project_type: "new",
      });

      history.push("/projects");
      setTimeout(() => setIsLoading(false), 1000);
    } catch (e) {
      setTimeout(() => setIsLoading(false), 1000);
      console.log(e);
    }
  };

  return (
    <>
      {profileData && (
        <Flex
          flexDir="column"
          px={2}
          h="75vh"
          justifyContent={"flex-start"}
          alignItems="center"
          borderRadius={20}
          opacity={isViewer ? 0.5 : 1}
        >
          <VStack h="230px">
            <Text
              w="100%"
              sx={{
                fontSize: ["xl", "xl", "2xl"],
                fontWeight: 600,
                textAlign: "center",
                mb: 4,
              }}
            >
              Upload contract
            </Text>

            <Text
              w="100%"
              sx={{ fontSize: "sm", color: "subtle", textAlign: "left", mb: 2 }}
            >
              Upload your Solidity files (.sol extension) as a project and scan
              to detect vulnerabilities in your project.
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

          <Flex
            flexDir={"column"}
            justifyContent={"space-between"}
            alignItems="flex-start"
            width={"100%"}
            h="calc(100% - 240px)"
          >
            {page === 1 ? (
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
            ) : (
              <></>
            )}

            <Button
              type="submit"
              variant="brand"
              mt={4}
              w="100%"
              isLoading={isLoading}
              spinner={<Loader color={"#3300FF"} size={25} />}
              disabled={
                page === 2 &&
                (isLoading ||
                  step < 2 ||
                  name === "" ||
                  (profileData.actions_supported &&
                    !profileData.actions_supported.file_scan) ||
                  isViewer)
              }
              onClick={onSubmit}
            >
              {page === 1 ? "Proceed" : "Start Scan"}
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default FilescanForm;
