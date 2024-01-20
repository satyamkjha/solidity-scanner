import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import {
  HStack,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Flex,
  Image,
  Divider,
  Input,
  useDisclosure,
  Button,
  PopoverCloseButton,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ArrowBackIcon,
  ExternalLinkIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { contractChain } from "common/values";
import { getAssetsURL } from "helpers/helperFunction";
import { StylesConfig, GroupBase } from "react-select";
import Select from "react-select";
import FormatOptionLabelWithImage from "components/FormatOptionLabelWithImage";
import { FaPen } from "react-icons/fa";
import RadioButton from "components/styled-components/RadioButton";
import { BlockchainComp } from "./BlockchainComp";

export const ChainSelector: React.FC<{
  theme: "dark" | "light";
  view: "quickscan" | "homepage";
  platform: string;
  index: number;
  onClose: () => void;
  setPlatform: React.Dispatch<React.SetStateAction<string>>;
  chain: {
    label: string;
    value: string;
    icon: string;
    website: string;
  } | null;
  setChain: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
      icon: string;
      website: string;
    } | null>
  >;
  platformValue: string;
  platformData: {
    label: string;
    iconUrl: string;
    chains: {
      value: string;
      label: string;
      icon: string;
      isDisabled: boolean;
      website: string;
    }[];
  };
}> = ({
  theme,
  platform,
  setPlatform,
  chain,
  index,
  setChain,
  platformData,
  platformValue,
  onClose,
  view,
}) => {
  const assetsUrl = getAssetsURL();

  const customStylesChain: StylesConfig<
    PropsWithChildren<{
      value: string;
      label: string;
      icon: string;
    }>,
    boolean,
    GroupBase<
      PropsWithChildren<{
        value: string;
        label: string;
        icon: string;
      }>
    >
  > = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid #f3f3f3",
      backgroundColor: state.isSelected
        ? "#FFFFFF"
        : state.isFocused
        ? "#E6E6E6"
        : "#FFFFFF",
      color: "#000000",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      color: "#FFFFFF",
      borderRadius: 10,
      border: "0px solid #ffffff",
      overflowY: "hidden",
      width: "250px",
      position: "absolute",
      zIndex: 500,
    }),
    control: (state: any) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      flexDirection: "row",
      backgroundColor: "transparent",
      width: "100%",
      padding: 3,
      color: "#FFFFFF",
      maxWidth: "500px",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderRadius: 15,
      margin: 0,
      fontSize: 15,
      border:
        theme === "dark"
          ? platform === platformValue
            ? "1px solid #FFFFFF"
            : "1px solid #686d75"
          : platform === platformValue
          ? "1px solid #8A94A6"
          : "1px solid #8A94A680",
    }),
    container: (provided: any, state: any) => ({
      ...provided,
      width: "200px",
      maxWidth: "500px",
      marginRight: "10px",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      opacity: state.isDisabled ? 0.3 : 1,
      transition: "opacity 300ms",
      color: theme === "dark" ? "#FFFFFF" : "#000000",
    }),
  };

  const [currentChain, setCurrentChain] = useState<{
    value: string;
    label: string;
    icon: string;
    website: string;
  }>();

  useEffect(() => {
    if (platform === platformValue && chain) {
      setCurrentChain(chain);
    }
  }, []);

  return (
    <Flex
      w="100%"
      h="fit-content"
      justifyContent={[
        "flex-start",
        "flex-start",
        "flex-start",
        "space-between",
      ]}
      alignItems={["flex-start", "flex-start", "flex-start", "center"]}
      flexDir={["column", "column", "column", "row"]}
      color="white"
      cursor={"pointer"}
      borderRadius={[10, 10, 0]}
      background={
        platform === platformValue
          ? theme === "dark"
            ? "#272727"
            : "#eeeded"
          : "transparent"
      }
      _hover={{
        background:
          theme === "dark"
            ? platform === platformValue
              ? "#272727"
              : "#2c2c2c"
            : platform === platformValue
            ? "#eeeded"
            : "#f6f6f6",
      }}
      onClick={() => setPlatform(platformValue)}
      px={view === "homepage" ? 3 : [3, 3, 7]}
      py={view === "homepage" ? 3 : [5]}
    >
      <HStack
        w={["100%", "100%", "100%", "fit-content"]}
        maxW={["100%", "100%", "100%", "calc(100% - 210px)"]}
        spacing={5}
      >
        <Image
          src={`${assetsUrl}${platformData.iconUrl}.svg`}
          height="40px"
          width="40px"
        />
        <VStack
          textAlign="left"
          w="calc(100%)"
          spacing={1}
          alignItems={"flex-start"}
        >
          <Text
            w="100%"
            color={theme === "dark" ? "white" : "gray.600"}
            fontWeight={600}
            fontSize="md"
          >
            {platformData.label}
          </Text>
          {currentChain && (
            <Text
              isTruncated
              cursor="pointer"
              onClick={() => window.open(currentChain?.website, "_blank")}
              color="#8A94A6"
              fontWeight={400}
              fontSize="sm"
              w={view === "homepage" ? "120px" : "100%"}
            >
              {currentChain?.website} <ExternalLinkIcon />
            </Text>
          )}
        </VStack>

        <Popover placement="bottom-start">
          <PopoverTrigger>
            <WarningIcon fontSize={20} color="#FFD000" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody color="black" textAlign="left">
              <HStack>
                <WarningIcon fontSize={20} color="#FFD000" />{" "}
                <Text fontWeight={700}> Blockscout server unavailable</Text>
              </HStack>
              <Text>
                User Roles dolor sit amet consectetur. Lorem pharetra sed
                consequat velit arcu. Dictum volutpat arcu pellentesque risus mi
                non. Ornare phasellus lorem{" "}
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <HStack
        w={["100%", "100%", "100%", "fit-content"]}
        justifyContent={[
          "space-between",
          "space-between",
          "space-between",
          "flex-end",
        ]}
        mt={[5, 5, 5, 0]}
        maxW={["100%", "100%", "100%", "200px"]}
      >
        <Select
          formatOptionLabel={FormatOptionLabelWithImage}
          isSearchable={false}
          isDisabled={platform !== platformValue}
          options={platformData.chains}
          value={currentChain}
          menuPlacement={index === 0 ? "bottom" : "top"}
          placeholder="Select Chain"
          styles={customStylesChain}
          onChange={(newValue: any) => {
            if (newValue) {
              setChain(newValue);
              setCurrentChain(newValue);
              onClose();
            }
          }}
        />
        <RadioButton theme={theme} isActive={platform === platformValue} />
      </HStack>
    </Flex>
  );
};
