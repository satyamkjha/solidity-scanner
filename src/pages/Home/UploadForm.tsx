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
import { CheckIcon } from "@chakra-ui/icons";

const UploadForm: React.FC<{
  profileData: Profile;
  uploadType: "single" | "multiple";
}> = ({ profileData, uploadType }) => {
  const history = useHistory();
  const role: string = useUserRole();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [s3url, setS3Url] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  let isViewer = role === "viewer";
  const extension = uploadType === "single" ? "sol" : "zip";
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ maxFiles: 1, disabled: isViewer });

  let baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: "20px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#ffffff",
    color: "#000000",
    outline: "none",
    width: "100%",
    height: "calc(100% - 250px)",
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFocused, isDragAccept, isDragReject, error]
  );

  useEffect(() => {
    if (acceptedFiles.length === 1) {
      firstCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      uploadFile();
      setErrorMsg(null);
      setError(false);
    }
  };

  const uploadFile = async () => {
    setIsLoading(true);
    const res = await getPreassignedURL(
      acceptedFiles[0].name,
      acceptedFiles[0]
    );
    setS3Url(res);
    const success = await postDataToS3(acceptedFiles[0], res);
    if (success) {
      setStep(2);
    }
    setIsLoading(false);
  };

  const checkFileExt = (fileName: string) => {
    let fileExt = fileName.split(".");

    if (fileExt[fileExt.length - 1] === extension) {
      return true;
    }
    return false;
  };

  const getPreassignedURL = async (fileName: string, file: File) => {
    const { data } = await API.get<{ status: string; result: { url: string } }>(
      `${API_PATH.API_GET_PREASSIGNED_URL}?file_name=${fileName}`
    );
    return data.result.url;
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
    try {
      setIsLoading(true);
      await API.post(API_PATH.API_PROJECT_SCAN, {
        file_urls: [s3url],
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
      <Flex
        flexDir={"column"}
        justifyContent={"space-between"}
        alignItems="flex-start"
        width={"100%"}
        h="100%"
      >
        <>
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
                disabled={isViewer}
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </VStack>

          {step === 0 ? (
            <div {...getRootProps({ style: style as React.CSSProperties })}>
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
                You can upload only 1 file with extension ".{extension}" whose
                size must not exceed above{" "}
                {uploadType === "single" ? "5" : "15"} MB
              </p>
              <p style={{ fontSize: "15px", color: "#FF2400" }}>{errorMsg}</p>
              {/* </>
                  )} */}
            </div>
          ) : (
            <Flex
              sx={{
                w: "100%",
                borderRadius: "20px",
                p: 10,
                my: 2,
                height: "calc(100% - 250px)",
              }}
              justifyContent="center"
              alignItems={"center"}
              flexDir="column"
              background={"#FFFFFF"}
              border={"1.5px dashed #D6D6D6"}
            >
              <HStack justify={"space-between"} w="100%">
                <HStack align={"flex-end"} my={4}>
                  <SolidityFileIcon size={25} />
                  <Text fontSize={"14px"}>{acceptedFiles[0].name}</Text>
                </HStack>
                <CloseButton
                  onClick={() => {
                    setStep(0);
                    setS3Url("");
                  }}
                />
              </HStack>
              <Box w="100%">
                <Progress value={100} size="xs" isIndeterminate={step === 1} />
              </Box>
              {step === 2 ? (
                <HStack w="100%" mt={2} justify={"flex-start"}>
                  <Text color={"low"}>Successful</Text>
                  | <CheckIcon color="low" />
                </HStack>
              ) : (
                <HStack w="100%" mt={0} justify={"space-between"}>
                  <Text color={"gray.500"}>Uploading...</Text>
                  <Loader width="40px" size={30} />
                </HStack>
              )}
            </Flex>
          )}
        </>

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
              !profileData.actions_supported.file_scan) ||
            isViewer
          }
          onClick={startFileScan}
        >
          Start Scan
        </Button>
      </Flex>
    </>
  );
};

export default UploadForm;
