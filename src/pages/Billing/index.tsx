import React, { useState } from "react";
import { useQueryClient } from "react-query";
import CryptoIcon from "react-crypto-icons";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js/types/components/buttons";

import {
  Flex,
  Box,
  Text,
  Icon,
  Button,
  Divider,
  Link,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useToast,
  VStack,
  Image,
  Heading,
  HStack,
} from "@chakra-ui/react";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCalendar, AiFillCheckCircle } from "react-icons/ai";

import { useProfile } from "hooks/useProfile";
import { useAcceptedCoins } from "hooks/usePricing";

import API from "helpers/api";
import { daysRemaining, dateToDDMMMMYYYY } from "common/functions";
import { Plan } from "common/types";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { placements } from "@popperjs/core";
import ContactUs from "components/contactus";
import { usePricingPlans } from "hooks/usePricingPlans";

const Billing: React.FC = () => {
  const { data } = useProfile();
  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";
  const { data: plans } = usePricingPlans();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <Box
      sx={{
        w: "100%",
        bg: "bg.subtle",
        borderRadius: "20px",
        py: 4,
        px: 8,
        mx: [0, 0, 4],
        my: 4,
        minH: "78vh",
      }}
    >
      <Flex
        sx={{
          w: "100%",
          flexDir: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          my: 4,
        }}
      >
        <Text sx={{ color: "text", fontWeight: 600 }}>BILLING</Text>
        {!data || !plans ? (
          <Flex w="100%" h="70vh" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            {data.current_package === "trial" ||
            data.current_package === "expired" ||
            data.current_package === "ondemand" ? (
              <>
                <Flex
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  flexWrap="wrap"
                  width={"100%"}
                  height={"fit-content"}
                  padding={2}
                  mt={5}
                >
                  {Object.keys(plans.monthly).map((plan) => {
                    if (plan !== "trial")
                      return (
                        <PricingPlan
                          selectedPlan={selectedPlan}
                          setSelectedPlan={setSelectedPlan}
                          plan={plan}
                          planData={plans.monthly[plan]}
                        />
                      );
                  })}
                </Flex>
                <Text sx={{ color: "text", fontWeight: 600 }} ml={5}>
                  {plans.monthly[selectedPlan].name}
                </Text>
                <Text
                  as="span"
                  ml={5}
                  mt={3}
                  fontWeight={300}
                  fontSize="smaller"
                >
                  {plans.monthly[selectedPlan].description}
                </Text>
                <Flex
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  flexWrap="wrap"
                  width={"100%"}
                  height={"fit-content"}
                  padding={2}
                  mt={5}
                >
                  <HStack ml={5} justify={"flex-start"} width={"30%"}>
                    <HiCheckCircle size={30} color={successColor} />

                    <Image
                      src="/pricing/coin.svg"
                      alt="Product screenshot"
                      p={4}
                    />
                    <Text fontSize={"md"} ml={5}>
                      {plans.monthly[selectedPlan].scan_count} Scan Credit
                    </Text>
                  </HStack>

                  <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
                    <HiCheckCircle size={30} color={successColor} />

                    <Image
                      src="/pricing/score-icon.svg"
                      alt="Product screenshot"
                      p={4}
                    />
                    <Text fontSize={"md"} ml={5}>
                      Security Score
                    </Text>
                  </HStack>

                  <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
                    {selectedPlan === "trial" ? (
                      <HiXCircle size={30} color={greyColor} />
                    ) : (
                      <HiCheckCircle size={30} color={successColor} />
                    )}
                    <Image
                      h={"70px"}
                      w={"70px"}
                      src="/pricing/result-icon.svg"
                      alt="Product screenshot"
                      p={4}
                    />
                    <Text fontSize={"md"} ml={5}>
                      Detailed Result
                    </Text>
                  </HStack>
                  <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
                    {plans.monthly[selectedPlan].github ? (
                      <HiCheckCircle size={30} color={successColor} />
                    ) : (
                      <HiXCircle size={30} color={greyColor} />
                    )}
                    <Image
                      src="/pricing/github.svg"
                      alt="Product screenshot"
                      p={4}
                    />
                    <Text fontSize={"md"} ml={5}>
                      Private Github
                    </Text>
                  </HStack>

                  <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
                    {plans.monthly[selectedPlan].report ? (
                      <HiCheckCircle size={30} color={successColor} />
                    ) : (
                      <HiXCircle size={30} color={greyColor} />
                    )}
                    <Image
                      src="/pricing/report.svg"
                      alt="Product screenshot"
                      p={4}
                    />
                    <Text fontSize={"md"} ml={5}>
                      Generate Reports
                    </Text>
                  </HStack>
                  <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
                    {plans.monthly[selectedPlan].publishable_report ? (
                      <HiCheckCircle size={30} color={successColor} />
                    ) : (
                      <HiXCircle size={30} color={greyColor} />
                    )}
                    <Image
                      src="/pricing/publish.svg"
                      alt="Product screenshot"
                      p={4}
                    />
                    <Text fontSize={"md"} ml={5}>
                      Publishable Reports
                    </Text>
                  </HStack>
                  <HStack ml={5} justifyContent={"flex-start"} width={"30%"}>
                    {selectedPlan === 'custom' ? (
                      <HiCheckCircle size={30} color={successColor} />
                    ) : (
                      <HiXCircle size={30} color={greyColor} />
                    )}
                    <Image
                      src="/pricing/publish.svg"
                      alt="Product screenshot"
                      p={4}
                    />
                    <Text fontSize={"md"} ml={5}>
                      White Glove Services
                    </Text>
                  </HStack>
                </Flex>
              </>
            ) : (
              <>
                <Flex width="100%" pt={8}>
                  <Box sx={{ w: "100%" }}>
                    <CurrentPlan
                      name={plans.monthly[data.current_package].name}
                      packageName={data.current_package}
                      packageRechargeDate={data.package_recharge_date}
                      packageValidity={data.package_validity}
                      plan={plans.monthly[data.current_package]}
                    />
                  </Box>
                  {/* <Box sx={{ w: "%" }}></Box> */}
                </Flex>
              </>
            )}
          </>
        )}
      </Flex>
    </Box>
  );
};

const PricingPlan: React.FC<{
  plan: string;
  planData: Plan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string>>;
  selectedPlan: string;
}> = ({ plan, planData, selectedPlan, setSelectedPlan }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [open, setOpen] = useState(false);

  const createStripePayment = async () => {
    let duration = "";
    if (selectedPlan === "ondemand") {
      duration = "ondemand";
    } else {
      duration = "monthly";
    }
    const { data } = await API.post<{
      status: string;
      checkout_url: string;
    }>("/api-create-stripe-order/", {
      package: selectedPlan,
      duration: duration,
    });
    window.open(`${data.checkout_url}`, "_blank");
  };
  const selected = selectedPlan === plan;

  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"flex-start"}
        flexDir={["column"]}
        w="180px"
        backgroundColor={"white"}
        borderRadius="xl"
        mr={5}
        mb={5}
        border={selected ? "1px solid #3E15F4" : ""}
        onClick={() => setSelectedPlan(plan)}
        overflow={"hidden"}
        zIndex={selected ? 100 : 0}
        filter={
          selected ? "drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15));" : ""
        }
      >
        <Text
          w={"100%"}
          color={selected ? "white" : "accent"}
          backgroundColor={selected ? "accent" : "white"}
          py={4}
          textAlign="center"
          fontSize={"sm"}
        >
          {planData.discount
            ? `Save upto ${planData.discount}`
            : planData.name === "Beginner"
            ? "Starter"
            : ""}
          {planData.discount === null && planData.name === "On Demand"
            ? "Pay as you go"
            : ""}
        </Text>

        {!selected && <Divider w={"90%"} />}
        <Text mt={10} mx={5} fontSize={"sm"}>
          {planData.name}
        </Text>
        <Heading fontSize={"x-large"} mt={1} mb={!selected ? 10 : 4}>
          {planData.amount === "Free" ? "Free" : `$ ${planData.amount}`}
        </Heading>
        {selected && (
          <Button
            my={5}
            variant="brand"
            onClick={() => {
              if (plan === "custom") setOpen(true);
              else onOpen();
            }}
          >
            {plan === "custom" ? "Contact Us" : "Select Plan"}
          </Button>
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent backgroundColor="bg.subtle">
          <ModalCloseButton />
          <ModalBody py={12}>
            <Flex w="100%">
              <Box width="65%" m={2}>
                <Flex
                  cursor="pointer"
                  width="100%"
                  bg="#F6F9FC"
                  pb={6}
                  borderRadius="15px"
                  h="fit-content"
                  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
                >
                  <Box
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w="100%"
                  >
                    <Box
                      flexDir={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      w="100%"
                      height={"fit-content"}
                    >
                      <Image
                        src="/stripe-pay.png"
                        alt="pay"
                        borderRadius="15px"
                        w={"360px"}
                        h={"90px"}
                      />
                    </Box>
                    <Flex
                      flexDir={"row"}
                      justifyContent="center"
                      alignItems="center"
                      w="100%"
                      height={"fit-content"}
                      px={4}
                    >
                      <Button
                        onClick={createStripePayment}
                        style={{
                          padding: "1.3rem",
                          backgroundColor: "#5a1cff",
                          color: "#FFFFFF",
                          borderRadius: "30px",
                        }}
                        w={"300px"}
                      >
                        Pay with
                        <Image
                          src="/stripe.png"
                          alt="pay"
                          ml={"2.5px"}
                          w={"70px"}
                          h={"45px"}
                        />
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  color="subtle"
                  px={5}
                  mt={6}
                  sx={{
                    height: 0.5,
                    borderColor: "#EDF2F7",
                    borderStyle: "solid",
                    borderLeftWidth: ["130px", "180px", "240px"],
                    borderRightWidth: ["130px", "180px", "240px"],
                  }}
                >
                  <Text fontWeight={600} color="subtle">
                    OR
                  </Text>
                </Flex>
                <Flex
                  cursor="pointer"
                  width="100%"
                  bg="#F6F9FC"
                  mt={6}
                  py={6}
                  px={8}
                  borderRadius="15px"
                  // h="320px"
                  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
                >
                  <CoinPayments packageName={selectedPlan} onClose={onClose} />
                </Flex>
              </Box>
              <Box
                width="35%"
                bg="white"
                m={2}
                pb={6}
                overflow="hidden"
                borderRadius="15px"
                border="1px solid"
                borderColor="gray.300"
              >
                <Text
                  w={"100%"}
                  color={selected ? "white" : "accent"}
                  backgroundColor={selected ? "accent" : "white"}
                  py={3}
                  textAlign="center"
                  fontSize={"sm"}
                >
                  {planData.discount
                    ? `Save upto ${planData.discount}`
                    : planData.name === "Beginner"
                    ? "Starter"
                    : ""}
                  {planData.discount === null && planData.name === "On Demand"
                    ? "Pay as you go"
                    : ""}
                </Text>
                <Text mx={6} mt={4} sx={{ fontWeight: 500 }}>
                  {planData.name}
                </Text>
                <Heading
                  mx={6}
                  fontSize={"x-large"}
                  mt={1}
                  mb={!selected ? 10 : 4}
                >
                  {planData.amount === "Free" ? "Free" : `$ ${planData.amount}`}
                </Heading>
                <Text mx={6} fontSize={"xs"}>
                  {planData.description}
                </Text>
                <Flex
                  ml={5}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexDirection="column"
                >
                  <HStack mt={5} justify={"flex-start"}>
                    <HiCheckCircle size={20} color={successColor} />

                    <Text fontSize={"sm"} ml={5}>
                      {planData.scan_count} Scan Credit
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    <HiCheckCircle size={20} color={successColor} />

                    <Text fontSize={"sm"} ml={5}>
                      Security Score
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {planData.name === "trial" ? (
                      <HiXCircle size={20} color={greyColor} />
                    ) : (
                      <HiCheckCircle size={20} color={successColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      Detailed Result
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {planData.github ? (
                      <HiCheckCircle size={20} color={successColor} />
                    ) : (
                      <HiXCircle size={20} color={greyColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      Private Github
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {planData.report ? (
                      <HiCheckCircle size={20} color={successColor} />
                    ) : (
                      <HiXCircle size={20} color={greyColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      Generate Report
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {planData.publishable_report ? (
                      <HiCheckCircle size={20} color={successColor} />
                    ) : (
                      <HiXCircle size={20} color={greyColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      Publishable Report
                    </Text>
                  </HStack>
                  <HStack mt={2} justify={"flex-start"}>
                    {plan === 'custom' ? (
                      <HiCheckCircle size={20} color={successColor} />
                    ) : (
                      <HiXCircle size={20} color={greyColor} />
                    )}

                    <Text fontSize={"sm"} ml={5}>
                      White Glove Services
                    </Text>
                  </HStack>
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ContactUs isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

const CurrentPlan: React.FC<{
  name: string;
  packageName: string;
  packageRechargeDate: string;
  packageValidity: number;
  plan: Plan;
}> = ({ name, packageRechargeDate, packageValidity, plan }) => {
  const successColor = "#289F4C";
  const greyColor = "#BDBDBD";
  return (
    <Box
      sx={{
        w: "100%",
        background: "white",
        borderRadius: 15,
        p: 8,
        border: "1px solid #38CB89",
      }}
    >
      <Flex justifyContent={"space-between"} alignItems="center">
        <Flex alignItems="center">
          <Icon as={AiFillCheckCircle} color="#38CB89" fontSize="xl" mr={2} />
          <Text>Current Plan</Text>
        </Flex>
        <Flex alignItems="center" width={"25%"}>
          <Icon as={AiOutlineCalendar} color="gray.500" fontSize="2xl" mr={2} />
          <Text>
            <Text as="span" fontSize="2xl" fontWeight={700}>
              {daysRemaining(new Date(packageRechargeDate), packageValidity)}
            </Text>{" "}
            days remaining
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        flexDirection="row"
        py={2}
      >
        <Box ml={7} mt={5} width="40%">
          {/* <Text sx={{ fontWeight: 500 }} fontSize="2xl" mt={8}>
            {name}
          </Text> */}
          <Text fontSize={"xl"}>{plan.name}</Text>
          <Text as="span" mt={5} mb={10} fontWeight={300} fontSize="smaller">
            {plan.description}
          </Text>
          <Divider mt={3} w={"60%"} />

          <HStack>
            <Heading
              verticalAlign={"center"}
              fontSize={"x-large"}
              mt={3}
              mb={4}
            >
              {plan.amount === "Free" ? "Free" : `$ ${plan.amount}/mo`}
            </Heading>
            {plan.discount && (
              <Text
                color={"accent"}
                backgroundColor={"white"}
                textAlign="left"
                fontWeight={600}
                fontSize={"sm"}
                mb={10}
                ml={10}
              >
                (Save upto {plan.discount})
              </Text>
            )}
          </HStack>
          <Box mb={2}>
            <Text fontWeight={400} fontSize="md" mb={1} color="#4E5D78">
              Subscribed on
            </Text>
            <Text fontWeight={500} fontSize="xl">
              {dateToDDMMMMYYYY(new Date(packageRechargeDate))}
            </Text>
          </Box>
        </Box>
        <Flex
          width="25%"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
        >
          <HStack mt={5} justify={"flex-start"}>
            <HiCheckCircle size={20} color={successColor} />

            <Text fontSize={"sm"} ml={5}>
              {plan.scan_count} Scan Credit
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            <HiCheckCircle size={20} color={successColor} />

            <Text fontSize={"sm"} ml={5}>
              Security Score
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.name === "trial" ? (
              <HiXCircle size={20} color={greyColor} />
            ) : (
              <HiCheckCircle size={20} color={successColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              Detailed Result
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.github ? (
              <HiCheckCircle size={20} color={successColor} />
            ) : (
              <HiXCircle size={20} color={greyColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              Private Github
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.report ? (
              <HiCheckCircle size={20} color={successColor} />
            ) : (
              <HiXCircle size={20} color={greyColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              Generate Report
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.publishable_report ? (
              <HiCheckCircle size={20} color={successColor} />
            ) : (
              <HiXCircle size={20} color={greyColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
              Publishable Report
            </Text>
          </HStack>
          <HStack mt={2} justify={"flex-start"}>
            {plan.name === 'Custom' ? (
              <HiCheckCircle size={20} color={successColor} />
            ) : (
              <HiXCircle size={20} color={greyColor} />
            )}

            <Text fontSize={"sm"} ml={5}>
             White Glove Services
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

const CoinPayments: React.FC<{ packageName: string; onClose: () => void }> = ({
  packageName,
  onClose,
}) => {
  const { data, isLoading } = useAcceptedCoins();
  console.log(data);
  const [coin, setCoin] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const width = 600;
    const height = 800;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    let duration = "";
    if (packageName === "ondemand") {
      duration = "ondemand";
    } else {
      duration = "monthly";
    }
    try {
      setLoading(true);

      const { data } = await API.post<{
        checkout_url: string;
        status: string;
        status_url: string;
      }>("api-create-order-cp/", {
        package: packageName,
        currency: coin,
        duration: duration,
      });
      setLoading(false);
      const popup = window.open(
        data.checkout_url,
        "",
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
      );
      onClose();
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <VStack width="100%" spacing={6} mt={4} alignItems="inherit">
      <Flex alignItems="flex-end" justifyContent="space-between">
        <img
          src="/coinpayments-logo.svg"
          width="200px"
          alt="CoinPayments Logo"
        />
        {data && coin !== "" && (
          <Flex alignItems="center">
            <CryptoIcon size={32} name={coin.toLowerCase()} />
            <Text ml={2} color="brand-dark" fontWeight={700} fontSize="3xl">
              {packageName === "ondemand"
                ? parseFloat(data[coin].ondemand[packageName]).toPrecision(2)
                : parseFloat(data[coin].monthly[packageName]).toPrecision(2)}
              <Text as="span" fontSize="md" fontWeight={700} ml={2}>
                {coin}
              </Text>
            </Text>
          </Flex>
        )}
      </Flex>
      <FormControl id="contract_platform">
        <FormLabel fontSize="sm">Select coin</FormLabel>
        <Select
          placeholder="Select coin"
          value={coin}
          isRequired
          isDisabled={isLoading}
          onChange={(e) => setCoin(e.target.value)}
        >
          {data &&
            Object.keys(data).map((key) => (
              <option key={key} value={key}>
                {data[key].name}
              </option>
            ))}
        </Select>
      </FormControl>
      <Flex justifyContent="flex-end">
        <Button
          variant="brand"
          isDisabled={coin === "" || isLoading}
          isLoading={loading}
          onClick={handleSubmit}
        >
          Make Payment
        </Button>
      </Flex>
    </VStack>
  );
};

const PricingDetails: React.FC<{ details: string[]; inModal?: boolean }> = ({
  details,
  inModal,
}) => {
  return (
    <>
      {details.map((detail) => (
        <Flex
          alignItems="center"
          fontWeight={400}
          fontSize={inModal ? "sm" : "md"}
          my={2}
        >
          <Icon as={AiOutlineCheckCircle} color="brand-dark" mr={2} />
          <Text>{detail}</Text>
        </Flex>
      ))}
    </>
  );
};

export default Billing;
