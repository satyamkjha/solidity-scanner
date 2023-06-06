import {
  Modal,
  ModalOverlay,
  Flex,
  Divider,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Image,
  Text,
  Heading,
  Switch,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { API_PATH } from "helpers/routeManager";
import { useConfig } from "hooks/useConfig";
import API from "helpers/api";
import PaymentMethodCard from "./PaymentMethodCard";
import CoinPaymentSelect from "./CoinPaymentsSelect";
import CouponCodeSection from "./CouponCodeSection";
import { Plan, PricingData } from "common/types";
import PricingDetails from "pages/Pricing/components/PricingDetails";
import CurrentPlanDescriptionContainer from "./CurrentPlanDescriptionContainer";
import SubscriptionDataContainer from "./SubscriptionDataContainer";
import PricingDetailsList from "pages/Pricing/components/PricingDetailsList";
import { pricing_table_data, pricing_data } from "common/values";
import { TickMark } from "components/icons";

const TickComp: React.FC<{ color: string }> = ({ color }) => (
  <Box w="fit-content" display="block" ml="auto" mr="auto">
    <TickMark size={20} color={color} />
  </Box>
);

const PlanDetailsModal: React.FC<{
  open: boolean;
  onModalClose: any;
  currentPackage: string;
  packageRechargeDate: string;
  subscription: boolean;
  plan: Plan;
}> = ({
  open: isOpen,
  onModalClose,
  currentPackage,
  plan,
  packageRechargeDate,
  subscription,
}) => {
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

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
                w={["100%", "100%", "60%"]}
                flexDir="column"
                justifyContent={"flex-start"}
                alignItems="flex-start"
              >
                <CurrentPlanDescriptionContainer
                  packageName={currentPackage}
                  plan={plan}
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
              <PricingDetailsList
                selectedPackage={currentPackage}
                plan={plan}
              />
            </Flex>
            <Divider mb={10} />
            <TableContainer width="100%">
              {pricing_table_data.map((table) => (
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
                    {table.data.map((row) => (
                      <Tr>
                        <Td border="1px solid #D6D6D6">{row.title}</Td>
                        <Td
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
