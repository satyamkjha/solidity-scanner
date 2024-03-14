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
import { FaLink } from "react-icons/fa";
import { debounce } from "lodash";

const LinkInput: React.FC<
  InputProps & {
    onError: (error: string) => void;
    showLeftIcon?: boolean;
    iconChild?: any;
  }
> = ({ children, onError, showLeftIcon = false, iconChild, ...props }) => {
  const { value, isRequired, title = "Link" } = props;

  const [errorMessage, setErrorMessage] = useState("");
  const [triggerValidation, setTriggerValidation] = useState(false);

  useEffect(() => {
    if (triggerValidation) {
      const validateLink = (link: string) => {
        const linkRegexMap: { [key: string]: RegExp } = {
          Discord: /^https:\/\/discord\.gg\/[a-zA-Z0-9]+$/,
          Telegram: /^https:\/\/t\.me\/[a-zA-Z0-9_]+$/,
          LinkedIn: /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
          Twitter: /^https:\/\/twitter\.com\/[a-zA-Z0-9_]+\/?$/,
        };

        const regex = linkRegexMap[title];

        if (!regex.test(link)) {
          return `Please enter a valid ${title} link`;
        } else {
          return "";
        }
      };

      if (isRequired && !value) {
        const error = `${title} is required`;
        onError(error);
        setErrorMessage(error);
      } else if (value) {
        const error = validateLink(value.toString());
        setErrorMessage(error);
        onError(error);
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
              iconChild ? iconChild : <Icon as={FaLink} color="gray.300" />
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

export default LinkInput;
