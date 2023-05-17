import React from "react";
import { Flex } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface InputCheckboxProps {
  width?: string;
  height?: string;
  checkedColor?: string;
  unCheckedColor?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  width = "16px",
  height = "16px",
  checkedColor = "#805AD5",
  unCheckedColor = "gray.200",
  checked,
  onChange,
}) => {
  return (
    <Flex alignItems="center" mr={checked ? "2px" : 0}>
      <input
        id={"sol-checkbox"}
        type={"checkbox"}
        checked={checked}
        onChange={onChange}
        style={{
          width: `${width}`,
          height: `${height}`,
          WebkitAppearance: "none",
          appearance: "none",
          backgroundColor: `${unCheckedColor}`,
          borderRadius: "2px",
          border: "2px solid #718096",
        }}
      />
      {checked && (
        <CheckIcon
          color="white"
          ml={"-14px"}
          w={3}
          h={3}
          pointerEvents="none"
        />
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
