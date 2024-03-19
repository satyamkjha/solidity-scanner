import {
  Modal,
  ModalOverlay,
  Flex,
  Divider,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { Plan, PricingData } from "common/types";
import CurrentPlanDescriptionContainer from "./CurrentPlanDescriptionContainer";
import SubscriptionDataContainer from "./SubscriptionDataContainer";
import PricingDetailsList from "pages/Pricing/components/PricingDetailsList";
import { pricing_table_data } from "common/values";
import { TickMark } from "components/icons";

const PlanDetailsModal: React.FC<{
  open: boolean;
  onModalClose: any;
  currentPackage: string;
  duration: string;
  isCancellable: boolean;
  packageRechargeDate: string;
  subscription: boolean;
  plan: Plan;
  pricing: PricingData;
}> = ({
  open: isOpen,
  onModalClose,
  currentPackage,
  duration,
  pricing,
  plan,
  packageRechargeDate,
  subscription,
  isCancellable,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent
        maxW={["90vw", "90vw", "70vw"]}
        minW={"300px"}
        h="90vh"
        bg="white"
        minH={"fit-content"}
      >
        <ModalHeader background="#FFFFFF" textAlign={"center"}>
          Plan Details
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody
          h={"100%"}
          overflowY={"scroll"}
          w={"100%"}
          px={[6, 6, 6, 12]}
        >
          <Flex
            w={"100%"}
            flexDir={"column"}
            justifyContent={"flex-start"}
            alignItems="flex-start"
          >
            <Divider />
            <Flex
              mt={5}
              w={"100%"}
              flexDir={["column", "column", "row"]}
              justifyContent={["flex-start", "flex-start", "space-between"]}
              alignItems="flex-start"
            >
              <Flex
                w={["100%", "100%", "50%"]}
                flexDir="column"
                justifyContent={"flex-start"}
                alignItems="flex-start"
              >
                <CurrentPlanDescriptionContainer
                  packageName={currentPackage}
                  plan={plan}
                  duration={duration}
                />
              </Flex>
              <Flex
                mt={5}
                flexWrap="wrap"
                alignItems="flex-start"
                w={["100%", "100%", "40%"]}
                flexDir={"row"}
              >
                {subscription && (
                  <SubscriptionDataContainer
                    isCancellable={isCancellable}
                    packageName={currentPackage}
                    packageRechargeDate={packageRechargeDate}
                  />
                )}
              </Flex>
            </Flex>
            <Divider mt={5} />
            <Flex
              my={10}
              w="100%"
              maxW={"800px"}
              flexDir={"row"}
              flexWrap={"wrap"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              <PricingDetailsList page={"billing"} plan={plan} />
            </Flex>
            <Divider mb={10} />
            <TableContainer width="100%">
              {pricing.pricing_table_data.map((table) => (
                <Table mb={20} border="none" variant="unstyled" width="100%">
                  <Thead width="100%">
                    <Tr width="100%">
                      <Th w="70%">
                        <Heading fontSize="xl"> {table.title} </Heading>
                      </Th>
                      <Th w="30%"></Th>
                    </Tr>
                  </Thead>
                  <Tbody border="1px solid #D6D6D6">
                    {table.data.map((row: any) => (
                      <Tr>
                        <Td minW="350px" w="70%" border="1px solid #D6D6D6">
                          {row.title}
                        </Td>
                        <Td
                          w="30%"
                          minW="150px"
                          bgColor={row[currentPackage] ? "#FFFFFF" : "#FCFCFF"}
                          textAlign="center"
                          border="1px solid #D6D6D6"
                        >
                          {typeof row[currentPackage] !== "boolean" ? (
                            row[currentPackage]
                          ) : row[currentPackage] ? (
                            <Box
                              w="fit-content"
                              display="block"
                              ml="auto"
                              mr="auto"
                            >
                              <TickMark size={20} color={"#4DA560"} />
                            </Box>
                          ) : (
                            ""
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ))}
            </TableContainer>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlanDetailsModal;
