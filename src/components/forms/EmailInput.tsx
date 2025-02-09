import React, { useState, useEffect } from "react";
import {
  Input,
  InputProps,
  VStack,
  Text,
  InputLeftElement,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import { FiAtSign } from "react-icons/fi";
import { isEmail } from "helpers/helperFunction";
import { debounce } from "lodash";

const EmailInput: React.FC<
  InputProps & {
    onError: (error: string) => void;
    showLeftIcon?: boolean;
    rightElement?: any;
  }
> = ({ children, onError, rightElement, showLeftIcon = false, ...props }) => {
  const { value, isRequired, title = "Email" } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const [triggerValidation, setTriggerValidation] = useState(false);

  useEffect(() => {
    if (triggerValidation) {
      if (isRequired && !value) {
        const error = `${title} is required`;
        onError(error);
        setErrorMessage(error);
      } else if (value && !isEmail(value.toString())) {
        const error = "Please enter a valid email address";
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
    <VStack
      w="100%"
      maxW="600px"
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
    >
      <InputGroup alignItems="center" maxW="600px">
        {showLeftIcon && (
          <InputLeftElement
            height="48px"
            children={<Icon as={FiAtSign} color="gray.300" />}
          />
        )}
        <Input
          size="lg"
          type="email"
          w="100%"
          maxW="600px"
          variant={errorMessage ? "error" : "brand"}
          onInput={handleInput}
          {...props}
        />
        {rightElement ? rightElement : null}
      </InputGroup>
      {errorMessage && (
        <Text color={"red"} fontSize={"xs"}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};

export default EmailInput;
