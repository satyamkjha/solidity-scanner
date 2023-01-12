import { CheckCircleIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { useToast, Flex, Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { ReportsListItem, Profile, Scan } from "common/types";
import { useReports } from "hooks/useReports";
import React, { useState } from "react";
import Icon from "react-crypto-icons";
import { AiFillCopy, AiOutlineLock } from "react-icons/ai";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { MdPeopleOutline, MdSettings } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";

const ReportBlock: React.FC<{ report: ReportsListItem; profile: Profile }> = ({
    report,
    profile,
  }) => {
    const [isDownloadLoading, setDownloadLoading] = useState(false);
    const history = useHistory();
  
    const toast = useToast();
  
    return (
      <Flex
        alignItems={["flex-start", 'center' ]}
        justifyContent="space-between"
        sx={{
          cursor: "pointer",
          w: "100%",
          bg: "white",
          my: 2,
          p: 3,
          px: [3, 5],
          borderRadius: "10px",
          transition: "0.3s box-shadow",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          _hover: {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
        height="fit-content"
      >
        <Box
            display={["none", "block"]}
            sx={{
              width: "60px",
              height: "60px",
              p: 2,
              bg: "#F7F7F7",
              color: "#4E5D78",
              borderRadius: "50%",
              textAlign: "center",
              mr: 7,
              mt: 2
            }}
          >
            <Text fontSize="xl" fontWeight="600">
              {report.date_published.slice(0, 2)}
            </Text>
            <Text fontSize="12px" mt="-4px">
              {report.date_published.slice(3, 6)}
            </Text>
          </Box>
        <Flex
          justifyContent={"flex-start"}
          width={["calc(100% - 60px)", "calc(100% - 160px)"]}
          alignItems="center"
          flexWrap={"wrap"}
          height="fit-content"
        >
  
          <HStack width={["210px"]} my={3}>
            {report.is_approved ? (
              <CheckCircleIcon color={"#03C04A"} />
            ) : (
              <TimeIcon color={"#FF5C00"} />
            )}
            <Text
              color={report.is_approved ? "#03C04A" : "#FF5C00"}
              sx={{ fontSize: "md", fontWeight: 600, ml: 2 }}
            >
              {report.is_approved ? "Approved" : "Waiting for Approval"}
            </Text>
          </HStack>
  
          <HStack width={["130px"]} my={3} >
            {report.is_approved ? (
               <BsPeople />
            ) : (
              <AiOutlineLock />
            )}
            <Text sx={{ fontSize: "md", fontWeight: 600, ml: 2 }}>
              {report.is_approved ? "Public" : "Private"}
            </Text>
          </HStack>
          {report.is_approved && (
            <HStack  my={3} width={["260px"]}
            mr={5}><AiFillCopy color="#3E15F4" />
            <Text
              
              align="left"
              
              fontSize="md"
              color="#3E15F4"
              onClick={(e) => {
                e.stopPropagation();
                console.log("asdkbkalsd");
                navigator.clipboard
                  .writeText(
                    `http://${document.location.host}/published-report/project/${report.report_id}`
                  )
                  .then(
                    () =>
                      toast({
                        title: "Copied Report URL",
                        description: "",
                        status: "success",
                        duration: 1000,
                        isClosable: true,
                      }),
                    () =>
                      toast({
                        title: "Could not Copy Report URL",
                        description: "",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      })
                  );
              }}
            >
              
              Copy link to Published Report
              
            </Text></HStack>
          )}
        </Flex>
        <Flex
          flexDir={["column"]}
          justifyContent={"flex-start"}
          alignItems={"center"}
          width={["60px"]}
          height={"100%"}
        >
          <Box
            display={["block", "none"]}
            sx={{
              width: "60px",
              height: "60px",
              p: 2,
              bg: "#F7F7F7",
              color: "#4E5D78",
              borderRadius: "50%",
              textAlign: "center",
              
            }}
          >
            <Text fontSize="xl" fontWeight="600">
              {report.date_published.slice(0, 2)}
            </Text>
            <Text fontSize="12px" mt="-4px">
              {report.date_published.slice(3, 6)}
            </Text>
          </Box>
          <IconButton
            my={5}
            mr={[0, 5, 5]}
            aria-label="View Report"
            backgroundColor={"#F5F2FF"}
            icon={<ViewIcon color={"#806CCF"} />}
            onClick={(e) => {
              e.stopPropagation();
              if (report.is_approved) {
                window.open(
                  `http://${document.location.host}/published-report/project/${report.report_id}`,
                  "_blank"
                );
              } else {
                window.open(
                  `http://${document.location.host}/report/project/${report.project_id}/${report.report_id}`,
                  "_blank"
                );
              }
            }}
          />
        </Flex>
      </Flex>
    );
  };

const PublishedReports: React.FC<{ profile: Profile, scan_report: Scan, type: string }> = ({ profile, scan_report, type }) => {
    const { data } = useReports(type, scan_report.project_id);
  
    return (
      <Box
        sx={{
          w: "100%",
          borderRadius: "20px",
          p: [0, 0, 4],
        }}
      >
        {data &&
          data?.reports.map((report) => (
            <ReportBlock profile={profile} report={report} />
          ))}
      </Box>
    );
  };

  export default PublishedReports