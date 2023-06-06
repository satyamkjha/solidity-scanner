import { CloseIcon } from "@chakra-ui/icons";
import { Flex, VStack, Heading, Button, Text, Image } from "@chakra-ui/react";
import { Plan, Transaction } from "common/types";
import { getAssetsURL, sentenceCapitalize } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";

const LatestInvoice: React.FC<{
  planData: Plan;
  selectedPlan: string;
  transactionData: Transaction;
}> = ({ planData, selectedPlan, transactionData }) => {
  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";
  const config: any = useConfig();
  const assetsURL = getAssetsURL(config);

  return (
    <Flex
      w={"100%"}
      backgroundColor={"white"}
      borderRadius="15px"
      mt={4}
      px={[5, 5, 10]}
      py={[5, 5, 8]}
      boxShadow={"0px 2px 10px rgba(0, 0, 0, 0.15)"}
      flexDir="column"
    >
      <Flex w="100%" align="center">
        <Text fontWeight="600">Complete your purchase</Text>
        <CloseIcon ml="auto" color="#B0B7C3" cursor="pointer" />
      </Flex>
      <VStack w={["100%"]} align="flex-start" mt={6}>
        <Flex alignItems="center" justifyContent="center">
          <Image
            width="35px"
            height="35px"
            src={`${assetsURL}pricing/${selectedPlan}-heading.svg`}
          />
          <Text fontSize={"2xl"} fontWeight={700}>
            {sentenceCapitalize(planData.name)}
          </Text>
        </Flex>
        <Text as="span" mt={10} fontWeight={300} fontSize="smaller">
          {planData.description}
        </Text>
        <Heading mt={3} fontSize={"x-large"}>
          {planData.amount === "Free" ? "Free" : `$ ${planData.amount}`}
        </Heading>
      </VStack>
      <Button
        variant="brand"
        mt={"auto"}
        mx={[2, 2, 2, 14]}
        onClick={() => {
          window.open(`${transactionData.invoice_url}`, "_blank");
        }}
      >
        Make Payment
      </Button>
    </Flex>
  );
};

export default LatestInvoice;
