import React, { useEffect, useState } from "react";
import {
  Input,
  InputProps,
  VStack,
  Text,
  InputGroup,
  Icon,
  InputLeftElement,
} from "@chakra-ui/react";
import { hasSpecialCharacters } from "helpers/helperFunction";
import { FaUserAlt } from "react-icons/fa";
import { debounce } from "lodash";

const NameInput: React.FC<
  InputProps & {
    onError: (error: string) => void;
    showLeftIcon?: boolean;
    iconChild?: any;
  }
> = ({ children, onError, showLeftIcon = false, iconChild, ...props }) => {
  const { value, isRequired, title = "Name" } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const [triggerValidation, setTriggerValidation] = useState(false);

  useEffect(() => {
    if (triggerValidation) {
      if (isRequired && !value) {
        const error = `${title} is required`;
        onError(error);
        setErrorMessage(error);
      } else if (
        value &&
        (value.toString().length < 2 ||
          value.toString().length > 50 ||
          hasSpecialCharacters(value.toString()))
      ) {
        const error = `${title} is invalid`;
        onError(error);
        setErrorMessage(error);
      } else {
        onError("");
        setErrorMessage("");
      }
    } else {
      if (isRequired && !value) {
        const error = `${title} is required`;
        onError(error);
        setErrorMessage("");
      } else if (!value) {
        onError("");
        setErrorMessage("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRequired, value, title, triggerValidation]);

  const triggerValidationDebounced = debounce(() => {
    setTriggerValidation(true);
  }, 1000);

  const handleInput = (event: any) => {
    triggerValidationDebounced();
  };

  return (
    <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
      <InputGroup alignItems="center">
        {showLeftIcon && (
          <InputLeftElement
            height="48px"
            children={
              iconChild ? iconChild : <Icon as={FaUserAlt} color="gray.300" />
            }
          />
        )}
        <Input
          name="name"
          borderRadius="15px"
          size="lg"
          type="text"
          w="100%"
          maxW="600px"
          variant={errorMessage ? "error" : "brand"}
          onInput={handleInput}
          {...props}
        />
      </InputGroup>
      {errorMessage && (
        <Text color={"red"} fontSize={"xs"}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};

export default NameInput;
