import {
  Heading,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { PricingData } from "common/types";
import { TickMark } from "components/icons";

const TickComp: React.FC<{ color: string }> = ({ color }) => (
  <Box w="fit-content" display="block" ml="auto" mr="auto">
    <TickMark size={20} color={color} />
  </Box>
);

const PricingTable: React.FC<PricingData> = ({
  pricing_data,
  pricing_table_data,
}) => {
  return (
    <Box
      display={"flex"}
      flexDir="column"
      alignItems="center"
      justifyContent={"flex-start"}
      w={"95%"}
      maxW="1920px"
      textAlign="center"
      px={[0, 0, 10]}
      mt={20}
      pt={10}
      borderRadius={20}
      background={"#FFFFFF"}
    >
      <Heading as="h1" fontSize="3xl" mb={16}>
        Exploring SolidityScan's{" "}
        <Box as="span" color="#3300FF">
          Capabilities{" "}
        </Box>
        and{" "}
        <Box textDecoration="underline" as="span" color="#3300FF">
          Analysis Features{" "}
        </Box>
      </Heading>
      <Flex
        justifyContent="flex-start"
        flexDir="row"
        overflowX="scroll"
        alignItems="flex-start"
        width="100%"
      >
        <TableContainer width="100%" minW={"1200px"} overflowX="hidden">
          {pricing_table_data.map((table) => (
            <Table mb={20} border="none" variant="unstyled" width="100%">
              <Thead width="100%">
                <Tr width="100%">
                  <Th w="28%">
                    <Heading fontSize="xl"> {table.title} </Heading>
                  </Th>
                  <Th w="12%" textAlign="center">
                    Trial
                  </Th>
                  {/* {Object.keys(pricing_data["ondemand"])
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map((plan) => {
                      if (plan !== "custom") {
                        return (
                          <Th w="12%" textAlign="center">
                            {pricing_data["ondemand"][plan].name}
                          </Th>
                        );
                      }
                      return <></>;
                    })}
                  {Object.keys(pricing_data["monthly"])
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map((plan) => {
                      if (plan !== "custom") {
                        return (
                          <Th w="12%" textAlign="center">
                            {pricing_data["monthly"][plan].name}
                          </Th>
                        );
                      }
                      return <></>;
                    })} */}
                  <Th w="12%" textAlign="center">
                    On Demand
                  </Th>
                  <Th w="12%" textAlign="center">
                    Individual
                  </Th>
                  <Th w="12%" textAlign="center">
                    Pro
                  </Th>
                  <Th w="12%" textAlign="center">
                    Enterprise
                  </Th>
                </Tr>
              </Thead>
              <Tbody border="1px solid #D6D6D6">
                {table.data.map((row) => (
                  <Tr>
                    <Td border="1px solid #D6D6D6">{row.title}</Td>
                    <Td
                      bgColor={row.trial ? "#FFFFFF" : "#FCFCFF"}
                      textAlign="center"
                      border="1px solid #D6D6D6"
                    >
                      {typeof row.trial !== "boolean" ? (
                        row.trial
                      ) : row.trial ? (
                        <TickComp color="#5C5C5C" />
                      ) : (
                        ""
                      )}
                    </Td>
                    <Td
                      bgColor={row.ondemand ? "#FFFFFF" : "#FCFCFF"}
                      textAlign="center"
                      border="1px solid #D6D6D6"
                    >
                      {typeof row.ondemand !== "boolean" ? (
                        row.ondemand
                      ) : row.ondemand ? (
                        <TickComp color="#4DA560" />
                      ) : (
                        ""
                      )}
                    </Td>
                    <Td
                      bgColor={row.individual ? "#FFFFFF" : "#FCFCFF"}
                      textAlign="center"
                      border="1px solid #D6D6D6"
                    >
                      {typeof row.individual !== "boolean" ? (
                        row.individual
                      ) : row.individual ? (
                        <TickComp color="#EF3D15" />
                      ) : (
                        ""
                      )}
                    </Td>
                    <Td
                      bgColor={row.pro ? "#FFFFFF" : "#FCFCFF"}
                      textAlign="center"
                      border="1px solid #D6D6D6"
                    >
                      {typeof row.pro !== "boolean" ? (
                        row.pro
                      ) : row.pro ? (
                        <TickComp color="#5355F6" />
                      ) : (
                        ""
                      )}
                    </Td>
                    <Td
                      bgColor={row.custom ? "#FFFFFF" : "#FCFCFF"}
                      textAlign="center"
                      border="1px solid #D6D6D6"
                    >
                      {typeof row.custom !== "boolean" ? (
                        row.custom
                      ) : row.custom ? (
                        <TickComp color="#000000" />
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
    </Box>
  );
};

export default PricingTable;
