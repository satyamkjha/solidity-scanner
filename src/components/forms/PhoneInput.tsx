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
import { FaPhoneAlt } from "react-icons/fa";
import { debounce } from "lodash";

const PhoneInput: React.FC<
  InputProps & {
    onError: (err: string) => void;
    showLeftIcon?: boolean;
    iconChild?: any;
  }
> = ({ children, onError, showLeftIcon = false, iconChild, ...props }) => {
  const { value, isRequired, title = "Contact Number" } = props;
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
        (value.toString().length < 8 || value.toString().length > 15)
      ) {
        const error = `${title} is Invalid`;
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
    <VStack alignItems={"flex-start"} justifyContent={"flex-start"}>
      <InputGroup alignItems="center">
        {showLeftIcon && (
          <InputLeftElement
            height="48px"
            children={
              iconChild ? iconChild : <Icon as={FaPhoneAlt} color="gray.300" />
            }
          />
        )}
        <Input
          size="lg"
          type="number"
          w="100%"
          maxW="600px"
          variant={errorMessage ? "error" : "brand"}
          onInput={handleInput}
          {...props}
        />
      </InputGroup>
      {errorMessage && (
        <Text color={"red"} fontSize={"sm"}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};

export default PhoneInput;
