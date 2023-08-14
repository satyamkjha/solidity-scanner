import React, { useState } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Divider,
  Radio,
  RadioGroup,
  VStack,
  HStack,
  Checkbox,
  Text,
  useToast,
} from "@chakra-ui/react";
import { onLogout } from "common/functions";
import { useQueryClient } from "react-query";
import { API_PATH } from "helpers/routeManager";
import API from "helpers/api";
import { useHistory } from "react-router-dom";
import StyledButton from "components/styled-components/StyledButton";

const DeleteAccountForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
}> = ({ isOpen, onClose }) => {
  const history = useHistory();

  const queryClient = useQueryClient();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.delete(API_PATH.API_DELETE_ACCOUNT, {
        data: {
          reason: optionList[radioOption],
          comment: comment,
          can_contact_user: check,
        },
      });
      if (data.status === "success") {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        onClose();
        onLogout(history, queryClient);
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const optionList = [
    "I could not implement my business process using SolidityScan",
    "Customer support could not clarity my questions or resolve my issue ",
    "I like SolidityScan, will be back soon ",
    "Do not wish to specify/Others ",
  ];

  const [comment, setComment] = useState<string>();
  const [check, setCheck] = useState<boolean>(true);
  const [radioOption, setRadioOption] = useState<number>(3);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["90vw", "90vw", "45vw"]}
          minW={"300px"}
          minH={"600px"}
          alignItems={"center"}
          borderRadius="15px"
          mb={10}
          p={5}
        >
          <ModalHeader textAlign={"center"} fontSize={["lg", "lg", "xl"]}>
            Delete Account
          </ModalHeader>
          <ModalCloseButton
            m={[6, 6, 6, 7]}
            onClick={() => {
              onClose();
            }}
          />
          <Divider
            w={"90%"}
            mb={10}
            color="#ECECEC"
            borderBottomWidth={"2px"}
          />
          <ModalBody h={"100%"} w={"100%"} px={[6, 6, 6, 12]}>
            <Flex
              justifyContent={"center"}
              w={"100%"}
              h={"50vh"}
              direction="column"
              alignItems={"center"}
              textAlign="center"
            >
              <RadioGroup w="100%">
                <VStack
                  w="100%"
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                >
                  {optionList.map((item, index) => (
                    <Radio
                      onChange={(e) => setRadioOption(index)}
                      variant="brand"
                      value={index.toString()}
                    >
                      {item}
                    </Radio>
                  ))}

                  {/* <Radio variant="brand" value="2">
                    Customer support could not clarity my questions or resolve
                    my issue
                  </Radio>
                  <Radio variant="brand" value="3">
                    I like SolidityScan, will be back soon
                  </Radio>
                  <Radio variant="brand" value="4">
                    Do not wish to specify/Others
                  </Radio> */}
                </VStack>
              </RadioGroup>
              <Textarea
                variant={"brand"}
                placeholder="Add Comment (Optional)"
                borderRadius={"16px"}
                fontSize={"15px"}
                backgroundColor={"#F6F6F6"}
                noOfLines={4}
                mt={10}
                p={5}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                height={"120px"}
                size="sm"
                _focus={{
                  boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
                }}
              />
              <HStack
                width={"100%"}
                mt={3}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Checkbox
                  isChecked={check}
                  colorScheme={"purple"}
                  onChange={() => {
                    setCheck(!check);
                  }}
                />
                <Text fontSize={"sm"}>
                  You can contact me if you’d like to learn more why I delete my
                  account
                </Text>
              </HStack>
              <Text
                width="100%"
                p={5}
                borderWidth={1}
                borderColor="#FFC661"
                background="#FFF8ED"
                color="#4E5D78"
                my={7}
                fontSize={"sm"}
                fontWeight={300}
                borderRadius={10}
              >
                Deleting account can’t be undone and the data can’t be restored
              </Text>
              <StyledButton
                h={"50px"}
                mt={"auto"}
                mb={2}
                w="80%"
                variant="brand"
                px={12}
                isLoading={isLoading}
                borderRadius={10}
                fontSize={"md"}
                fontWeight={500}
                disabled={false}
                onClick={deleteAccount}
              >
                Delete Account
              </StyledButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteAccountForm;
