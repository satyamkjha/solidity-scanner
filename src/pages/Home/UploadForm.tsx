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
import { CheckIcon, RepeatIcon, CloseIcon } from "@chakra-ui/icons";
import { AiOutlineProject } from "react-icons/ai";
import { ProjectIcon, SolidityFileIcon, UploadIcon } from "components/icons";
import API from "helpers/api";
import { useProfile } from "hooks/useProfile";
import { useDropzone } from "react-dropzone";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";

type UrlItemProps = { url: string; name: string; file: File; status: string };

const UrlItem: React.FC<{ item: UrlItemProps }> = ({ item }) => {
  return (
    <VStack width="100%" my={4}>
      <HStack justify={"space-between"} width="100%">
        <HStack align={"flex-end"}>
          <SolidityFileIcon size={25} />
          <Text
            fontSize={"14px"}
            color={item.status === "failed" ? "#FF5630" : "#000000"}
          >
            {item.name}
          </Text>
        </HStack>
        <HStack align={"flex-end"}>
          {item.status === "failed" && <RepeatIcon color="accent" />}
          <Text
            color={
              item.status === "uploading"
                ? "gray.500"
                : item.status === "uploaded"
                ? "low"
                : item.status === "failed"
                ? "accent"
                : "gray.500"
            }
          >
            {item.status === "uploading" && "Uploading..."}
            {item.status === "uploaded" && "Successful"}
            {item.status === "failed" && "Reload"}
          </Text>
          {item.status === "uploading" && <Spinner color={"gray.500"} />}
          {item.status === "uploaded" && <CheckIcon color="low" />}
          {item.status === "failed" && <CloseIcon color={"gray.500"} />}
          <Text fontSize={"15px"}>|</Text>
          {/* <CloseButton onClick={() => {}} /> */}
        </HStack>
      </HStack>

      <Progress
        width="100%"
        variant={item.status === "failed" ? "informational" : "low"}
        size="xs"
        isIndeterminate={item.status === "uploading" ? true : false}
      />
    </VStack>
  );
};

const UploadForm: React.FC = () => {
  const history = useHistory();
  const { data: profileData } = useProfile();

  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [urlList, setUrlList] = useState<UrlItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ maxFiles: 5 });

  let baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 20px",
    borderWidth: 2,
    borderRadius: "20px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#ffffff",
    color: "#000000",
    outline: "none",
    width: "100%",
    marginTop: "20px",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(error ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, error]
  );

  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      firstCheck();
    }
  }, [acceptedFiles]);

  const firstCheck = () => {
    let flag = true;
    acceptedFiles.forEach((files) => {
      if (!checkFileExt(files.name)) {
        setErrorMsg(
          "You can only upload solidity files with .sol extension for scanning."
        );
        setError(true);
        flag = false;
        return;
      }
    });
    if (flag) {
      setStep(1);
      getPreassignedURLList();
      setErrorMsg(null);
      setError(false);
    }
  };

  const getPreassignedURLList = async () => {
    let results = await acceptedFiles.map(async (file) => {
      return getPreassignedURL(file.name, file);
    });
    Promise.all(results).then((res) => {
      if (res.length === acceptedFiles.length) setUrlList([...res]);
    });
  };

  const uploadFiles = async () => {
    let results: any[] = [];
    urlList.forEach((item) => {
      results.push(
        new Promise((resolve, reject) => {
          postDataToS3(item.file, item.url).then(
            (res) => {
              resolve({
                url: item.url,
                name: item.name,
                file: item.file,
                status: "uploaded",
              });
            },
            () => {
              postDataToS3(item.file, item.url).then(
                (res) => {
                  resolve({
                    url: item.url,
                    name: item.name,
                    file: item.file,
                    status: "uploaded",
                  });
                },
                () => {
                  reject({
                    url: item.url,
                    name: item.name,
                    file: item.file,
                    status: "failed",
                  });
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
          if (item.status === "uploaded") count++;
        });
        setUrlList([...res]);
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

  useEffect(() => {
    if (urlList.length === acceptedFiles.length && urlList.length > 0) {
      uploadFiles();
    }
  }, [urlList]);

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
      status: "uploading",
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
          backgroundColor="#FCFCFC"
          px={7}
          py={5}
          justifyContent={"flex-start"}
          alignItems="center"
          borderRadius={20}
          border="1px solid #ECECEC"
        >
          <Text
            w="100%"
            sx={{
              fontSize: ["xl", "xl", "2xl"],
              fontWeight: 600,
              textAlign: "left",
              mb: 4,
            }}
          >
            Upload contract
          </Text>

          <Text
            w="100%"
            sx={{ fontSize: "sm", color: "subtle", textAlign: "left", mb: 2 }}
          >
            Upload your Solidity files (.sol extension) as a project. Utilize
            the “Project Name” field to refer to your scan results in the
            “Projects” section.
          </Text>
          <Divider color="gray.700" borderWidth="1px" mb={3} />
          <Text
            w="100%"
            sx={{ fontSize: "sm", color: "subtle", textAlign: "left", mb: 2 }}
          >
            NOTE: Please follow the constraints below to avoid scan failure:
          </Text>
          <Text
            w="100%"
            sx={{ color: "subtle", textAlign: "left", mb: 2, fontSize: "xs" }}
          >
            1. Files to be uploaded should be Solidity(.sol) files, preferably
            compiled successfully. Incorrect syntax might render incorrect
            results.
          </Text>
          <Text
            w="100%"
            sx={{ color: "subtle", textAlign: "left", mb: 3, fontSize: "xs" }}
          >
            2. A Maximum number of files that can be uploaded is 5 and file size
            cannot exceed 5MB.
          </Text>

          <Flex
            flexDir={"column"}
            justifyContent={"flex-start"}
            alignItems="flex-start"
            width={"100%"}
          >
            <VStack alignItems={"flex-start"} width="100%">
              <Text mb={0} fontSize="sm">
                Project Name
              </Text>

              <InputGroup mt={0} alignItems="center">
                <InputLeftElement
                  height="48px"
                  children={<Icon as={AiOutlineProject} color="gray.300" />}
                />
                <Input
                  isRequired
                  placeholder="Enter Project Name"
                  variant="brand"
                  size="lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </VStack>

            {step === 0 ? (
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <UploadIcon size={80} />
                <p style={{ marginTop: "20px" }}>
                  Drag and drop or{" "}
                  <span style={{ color: "#3300FF" }}> Browse</span> to upload
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    marginBottom: "10px",
                    color: "#D3D3D3",
                  }}
                >
                  You can upload upto 5 files with extension ".sol" whose size
                  must not exceed above 5 MB
                </p>
                <p style={{ fontSize: "15px", color: "#FF2400" }}>{errorMsg}</p>
                {/* </>
                  )} */}
              </div>
            ) : (
              <Box
                sx={{ w: "100%", borderRadius: "20px", p: 10, my: 2 }}
                justifyContent="flex-start"
                alignItems={"flex-start"}
                background={"#FFFFFF"}
                border={"1.5px dashed #D6D6D6"}
              >
                {urlList.map((item) => (
                  <UrlItem item={item} />
                ))}
              </Box>
            )}

            <Button
              type="submit"
              variant="brand"
              mt={4}
              w="100%"
              isLoading={isLoading}
              spinner={<Loader color={"#3300FF"} size={25} />}
              disabled={
                isLoading ||
                step < 2 ||
                name === "" ||
                (profileData.actions_supported &&
                  !profileData.actions_supported.file_scan)
              }
              onClick={startFileScan}
            >
              Start Scan
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default UploadForm;
