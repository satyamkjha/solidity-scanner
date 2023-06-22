import React, { useEffect, useState, useMemo } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Spinner,
  HStack,
  VStack,
  Progress,
  CloseButton,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import {
  BlockCredit,
  ProjectIcon,
  SolidityFileIcon,
  UploadIcon,
} from "components/icons";
import API from "helpers/api";
import { useProfile } from "hooks/useProfile";
import { useDropzone } from "react-dropzone";
import { API_PATH } from "helpers/routeManager";
import Loader from "components/styled-components/Loader";

const UploadForm: React.FC = () => {
  const history = useHistory();
  const { data: profileData } = useProfile();

  let count: number = 0;

  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [urlList, setUrlList] = useState<
    { url: string; name: string; file: File }[]
  >([]);
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
            ) : step === 1 ? (
              <Box
                sx={{ w: "100%", borderRadius: "20px", p: 10, my: 2 }}
                justifyContent="flex-start"
                alignItems={"flex-start"}
                background={"#FFFFFF"}
                border={"1.5px dashed #D6D6D6"}
              >
                <HStack justify={"space-between"}>
                  <HStack align={"flex-end"} my={4}>
                    <SolidityFileIcon size={25} />
                    <Text fontSize={"14px"}>{acceptedFiles[0].name}</Text>
                    <Text fontSize={"15px"}>|</Text>
                    <Text fontSize={"10px"} color={"gray.500"}>
                      0{acceptedFiles.length} files
                    </Text>
                  </HStack>
                  <CloseButton
                    onClick={() => {
                      setStep(0);
                      setUrlList([]);
                    }}
                  />
                </HStack>
                <Progress variant={"blue"} size="xs" isIndeterminate />
                <HStack mt={4} justify={"space-between"}>
                  <Text color={"gray.500"}>Uploading...</Text>
                  <Loader size={30} />
                </HStack>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    w: "100%",
                    borderRadius: "20px",
                    px: 20,
                    pt: 2,
                    pb: 10,
                    my: 2,
                  }}
                  justifyContent="flex-start"
                  alignItems={"flex-start"}
                  background={"#FFFFFF"}
                  border={"1.5px dashed #D6D6D6"}
                  maxH="300px"
                  overflowY={"scroll"}
                >
                  <VStack h="fit-content" spacing={2} width="100%">
                    <HStack width="100%" justify={"flex-end"}>
                      <CloseButton
                        onClick={() => {
                          setStep(0);
                          setUrlList([]);
                        }}
                      />
                    </HStack>
                    <HStack>
                      <ProjectIcon size={30} />
                      <Text>{name}</Text>
                    </HStack>
                    <Text fontSize={"10px"} color={"gray.500"}>
                      0{acceptedFiles.length} files
                    </Text>
                    {acceptedFiles.map((file) => (
                      <Box
                        width={"100%"}
                        justifyContent={"center"}
                        alignItems="center"
                        textAlign={"center"}
                        fontSize="13px"
                        borderRadius={4}
                        color="gray.500"
                        backgroundColor="#F8FAFC"
                        py={3}
                      >
                        {file.name}
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </>
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
