import React from "react";
import { Flex, Box, ComponentWithAs, IconProps, Icon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface InputCheckboxProps {
  width?: number;
  height?: number;
  checkedColor?: string;
  unCheckedColor?: string;
  checked: boolean;
  checkedIcon?: ComponentWithAs<"svg", IconProps> | null;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  width = 16,
  height = 16,
  checkedColor = "#805AD5",
  unCheckedColor = "gray.200",
  checked,
  checkedIcon = CheckIcon,
  name,
  onChange,
}) => {
  return (
    <Flex alignItems="center" justifyContent={"center"}>
      <input
        id={"sol-checkbox"}
        name={name}
        type={"checkbox"}
        checked={checked}
        onChange={onChange}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          WebkitAppearance: "none",
          appearance: "none",
          backgroundColor: `${unCheckedColor}`,
          borderRadius: "2px",
          border: "2px solid #718096",
        }}
      />
      {checked && (
        <Box
          style={{
            position: "relative",
            display: "inline-block",
            width: `${width}px`,
            height: `${height}px`,
            marginLeft: `${-width}px`,
            pointerEvents: "none",
          }}
        >
          <Icon
            as={checkedIcon}
            position="absolute"
            top={`${height / 2}px`}
            left={`${width / 2}px`}
            transform="translate(-50%, -50%)"
            color="white"
            w={3}
            h={3}
          />
        </Box>
      )}
      <style>
        {`#sol-checkbox:checked {
            appearance: none;
            background-color: ${checkedColor};
            border: 2px solid ${checkedColor} !important;
        }`}
      </style>
    </Flex>
  );
};

export default InputCheckbox;
