import React, { useState, useEffect } from "react";
import {
  Input,
  InputProps,
  VStack,
  Text,
  InputLeftElement,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { passwordStrength, DiversityType } from "check-password-strength";
import { debounce } from "lodash";

const PasswordInput: React.FC<
  InputProps & {
    onError: (error: string) => void;
    showLeftIcon?: boolean;
    showError?: boolean;
    enableSpecialCharCheck?: boolean;
  }
> = ({
  children,
  onError,
  showError = true,
  showLeftIcon = false,
  enableSpecialCharCheck = true,
  ...props
}) => {
  const { value, isRequired, title = "Password" } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [show, setShow] = useState(false);

  const charTypes: DiversityType[] = [
    "lowercase",
    "uppercase",
    "symbol",
    "number",
  ];

  useEffect(() => {
    if (triggerValidation) {
      const checkPasswordStrength = (password: string | undefined) => {
        if (isRequired && !password) {
          return `${title} is required`;
        }

        if (!isRequired && !password) {
          return "";
        }

        const strength = passwordStrength(password || "");

        const missingCharTypes = charTypes.filter(
          (type) => !strength.contains.includes(type)
        );

        if (enableSpecialCharCheck && strength.id === 0) {
          return "Weak password. Please use a stronger one.";
        } else if (enableSpecialCharCheck && missingCharTypes.length > 0) {
          return `Password must include ${missingCharTypes.join(
            ", "
          )} character(s).`;
        } else {
          return "";
        }
      };

      const error = checkPasswordStrength(value ? value.toString() : undefined);
      setErrorMessage(error);
      onError(error);
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
      w={"100%"}
      maxW="600px"
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
    >
      <InputGroup alignItems="center" maxW="600px">
        {showLeftIcon && (
          <InputLeftElement
            height="48px"
            color="gray.300"
            children={<Icon as={FaLock} color="gray.300" />}
          />
        )}
        <Input
          name="password"
          size="lg"
          type={show ? "text" : "password"}
          w="100%"
          maxW="600px"
          variant={errorMessage && showError ? "error" : "brand"}
          onInput={handleInput}
          {...props}
        />
        <InputRightElement
          height="48px"
          color="gray.300"
          children={
            show ? (
              <ViewOffIcon
                color={"gray.500"}
                mr={5}
                boxSize={5}
                onClick={() => setShow(false)}
              />
            ) : (
              <ViewIcon
                color={"gray.500"}
                mr={5}
                boxSize={5}
                onClick={() => setShow(true)}
              />
            )
          }
        />
      </InputGroup>
      {errorMessage && showError && (
        <Text color={"red"} fontSize={"xs"}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};

export default PasswordInput;
