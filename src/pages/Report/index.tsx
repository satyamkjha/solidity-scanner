import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyResponsivePie from "components/pieChart";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Image,
  HStack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Checkbox,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useToast,
} from "@chakra-ui/react";
import { useReport } from "hooks/useReport";
import { ResponsivePie } from "@nivo/pie";
import { Logo, SeverityIcon } from "components/icons";
import { IssueItem } from "common/types";
import VulnerabilityProgress from "components/VulnerabilityProgress";
import { useIssueDetail } from "hooks/useIssueDetail";
import { sentenceCapitalize } from "helpers/helperFunction";
import { AiOutlineProject } from "react-icons/ai";
import { FaFileCode, FaInternetExplorer } from "react-icons/fa";
import API from "helpers/api";
import ReportContainer from "./reportContainer";

interface UpdateProps {
  issue: IssueItem;
  wontfix: String[];
  falsePositive: String[];
  setFalsePositive: React.Dispatch<React.SetStateAction<String[]>>;
  setWontFix: React.Dispatch<React.SetStateAction<String[]>>;
}

const UpdateRowComp = ({
  issue,
  wontfix,
  falsePositive,
  setWontFix,
  setFalsePositive,
}: UpdateProps) => {
  const [fps, setFps] = useState<boolean>(issue.status === "FALSE_POSITIVE");
  const [wntFx, setwntFx] = useState<boolean>(issue.status === "WONT_FIX");

  return (
    <>
      <Flex
        as="div"
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={"column"}
        textAlign={["left", "left"]}
        py={3}
        px={[1, 10]}
        borderBottomWidth={1}
        borderBottomColor={"#E4E4E4"}
      >
        <Flex
          as="div"
          w="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDir={"row"}
          textAlign={["left", "left"]}
        >
          <Text
            fontSize="md"
            fontWeight={"normal"}
            color={"gray.600"}
            width={"10%"}
          >
            {issue.bug_id}
          </Text>
          <Text
            mr={2}
            fontSize="md"
            fontWeight={"normal"}
            color={"gray.600"}
            width={"35%"}
          >
            {issue.file_path}
          </Text>
          <Text
            fontSize="md"
            fontWeight={"normal"}
            color={"gray.600"}
            width={"11%"}
          >
            {`L${issue.line_number_start} - L${issue.line_number_end}`}
          </Text>
          <Flex
            as="div"
            width={"14%"}
            height={"30px"}
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
          >
            <SeverityIcon variant={issue.severity} />
            <Text
              fontSize="md"
              fontWeight={"normal"}
              color={"gray.600"}
              ml={2}
              width={"100%"}
            >
              {sentenceCapitalize(issue.severity)}
            </Text>
          </Flex>
          <Text
            fontSize="md"
            fontWeight={"normal"}
            color={"gray.600"}
            width={"14%"}
          >
            {/* {sentenceCapitalize(issue.status.toLowerCase().replace("_", " "))} */}
            {issue.status === "FALSE_POSITIVE" && "False Positive"}
            {issue.status === "WONT_FIX" && "Won't Fix"}
            {issue.status === "DISCOVERED" && "Discovered"}
            {issue.status === "FIXED" && "Fixed"}
          </Text>

          <Flex
            as="div"
            width={"10%"}
            height={"30px"}
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
          >
            {issue.status !== "FIXED" && (
              <Checkbox
                isChecked={fps}
                onChange={() => {
                  if (wntFx) {
                    setwntFx(!wntFx);
                  }
                  setFps(!fps);
                  let newfalsePositive = falsePositive.filter(
                    (hash) => hash !== issue.issue_hash
                  );
                  let newwontfix = wontfix.filter(
                    (hash) => hash !== issue.issue_hash
                  );
                  newfalsePositive.push(issue.issue_hash);
                  setFalsePositive([...newfalsePositive]);
                  setWontFix([...newwontfix]);
                }}
                size={"lg"}
              ></Checkbox>
            )}
          </Flex>
          <Flex
            as="div"
            width={"6%"}
            height={"30px"}
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
          >
            {issue.status !== "FIXED" && (
              <Checkbox
                isChecked={wntFx}
                onChange={() => {
                  if (fps) {
                    setFps(!fps);
                  }
                  setwntFx(!wntFx);
                  let newfalsePositive = falsePositive.filter(
                    (hash) => hash !== issue.issue_hash
                  );
                  let newwontfix = wontfix.filter(
                    (hash) => hash !== issue.issue_hash
                  );
                  newwontfix.push(issue.issue_hash);
                  setFalsePositive([...newfalsePositive]);
                  setWontFix([...newwontfix]);
                }}
                size={"lg"}
              ></Checkbox>
            )}
          </Flex>
        </Flex>
        {/* {wntFx && (
          
            <Flex
              as="div"
              w="100%"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDir={"column"}
              textAlign={["left", "left"]}
              pt={8}
            >
              <Textarea placeholder='Put your comments here' />
              <Flex
              as="div"
              w="100%"
              alignItems="flex-start"
              justifyContent="flex-end"
              flexDir={"row"}
              pt={2}
            ><Button>Comment</Button></Flex>
            </Flex>
          
        )} */}
      </Flex>
    </>
  );
};

export default function ReportPage() {
  const { reportId, projectId } =
    useParams<{ reportId: string; projectId: string }>();
  const { data, refetch } = useReport(projectId, reportId);

  const toast = useToast();

  const [wontfix, setWontFix] = useState<String[]>([]);
  const [falsePositive, setFalsePositive] = useState<String[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateReport = async () => {
    const { data } = await API.post<{
      success: boolean;
    }>("/api-update-report/", {
      project_id: projectId,
      report_id: reportId,
      updates: {
        wontfix: wontfix,
        fps: falsePositive,
      },
    });

    console.log(data);

    if (data.success) {
      toast({
        title: "Report updated.",
        description:
          "Report has been successfullt upadted with the new changes",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      refetch();
    }
  };

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      {data && (
        <Container
          py={12}
          maxW={["100vw", "100vw", "90vw", "80vw", "80vw"]}
          color="black"
        >
          <Flex
            as="div"
            w="100%"
            alignItems="center"
            justifyContent="flex-start"
            flexDir={"row"}
            textAlign={["left", "left"]}
            mb={10}
          >
            <Logo />
            <Box
              ml={10}
              height={"10px"}
              width="calc(100% - 410px)"
              backgroundColor={"#38CB89"}
            />
            <Button ml={5} variant="accent-outline" onClick={onOpen}>
              Update Report
            </Button>
          </Flex>

          {/* <Button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </Button> */}
          <ReportContainer summary_report={data.summary_report} />

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              overflowY={"scroll"}
              overflowX={"scroll"}
              bg="bg.subtle"
              h={"90vh"}
              maxW="90vw"
            >
              <ModalHeader>Update Report</ModalHeader>
              <ModalCloseButton />
              <ModalBody h={"fit-content"}>
                <Accordion>
                  {data &&
                    Object.keys(data.summary_report.issues).map(
                      (key, index) => (
                        <AccordionItem>
                          <AccordionButton>
                            <Box py={2} flex="1" textAlign="left">
                              {`${index + 1}. ${
                                data.summary_report.issues[key][0].issue_name
                              }`}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            <Flex
                              as="section"
                              w="100%"
                              alignItems="flex-start"
                              justifyContent="flex-start"
                              flexDir={"row"}
                              textAlign={["left", "left"]}
                              py={3}
                              px={[1, 10]}
                              backgroundColor={"#F5F5F5"}
                            >
                              <Text
                                fontSize="md"
                                fontWeight={"extrabold"}
                                color={"gray.600"}
                                width={"10%"}
                              >
                                Bug ID
                              </Text>
                              <Text
                                fontSize="md"
                                fontWeight={"extrabold"}
                                color={"gray.600"}
                                width={"35%"}
                              >
                                File Location
                              </Text>
                              <Text
                                fontSize="md"
                                fontWeight={"extrabold"}
                                color={"gray.600"}
                                width={"11%"}
                              >
                                Line No
                              </Text>
                              <Text
                                fontSize="md"
                                fontWeight={"extrabold"}
                                color={"gray.600"}
                                width={"14%"}
                              >
                                Severity
                              </Text>
                              <Text
                                fontSize="md"
                                fontWeight={"extrabold"}
                                color={"gray.600"}
                                width={"14%"}
                              >
                                Status
                              </Text>
                              <Text
                                fontSize="sm"
                                fontWeight={"extrabold"}
                                color={"gray.600"}
                                width={"10%"}
                              >
                                False Positive
                              </Text>
                              <Text
                                fontSize="sm"
                                fontWeight={"extrabold"}
                                color={"gray.600"}
                                width={"6%"}
                              >
                                Won't Fix
                              </Text>
                            </Flex>

                            {data.summary_report.issues[key].map((issue) => {
                              return (
                                <UpdateRowComp
                                  wontfix={wontfix}
                                  falsePositive={falsePositive}
                                  setFalsePositive={setFalsePositive}
                                  setWontFix={setWontFix}
                                  issue={issue}
                                />
                              );
                            })}
                          </AccordionPanel>
                        </AccordionItem>
                      )
                    )}
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button
                  w={"100px"}
                  variant="accent-outline"
                  mr={3}
                  onClick={() => {
                    updateReport();
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      )}
    </>
  );
}
