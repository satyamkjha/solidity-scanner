import React from "react";
import { Text } from "@chakra-ui/react";

const PasswordError: React.FC<{
  passwordError: {
    contains: string[];
    id: number;
    value: string;
    length: number;
  } | null;
}> = ({ passwordError }) => {
  const charTypes = ["lowercase", "uppercase", "symbol", "number"];
  function unique(arr1: string[], arr2: string[]) {
    const different: string[] = [];

    for (const value of arr2) {
      if (!arr1.includes(value)) {
        different.push(value);
      }
    }

    return different;
  }

  return (
    <>
      {passwordError &&
        (passwordError.length < 8 || passwordError.contains.length < 4) && (
          <Text color={"subtle"} fontSize={"sm"} mb={2} textAlign="left">
            Your password should contain a
            {unique(passwordError.contains, charTypes).map(
              (item, index, array) =>
                index === array.length - 1 ? ` ${item}` : ` ${item},`
            )}
            {passwordError.length < 8 &&
              ` and should have ${8 - passwordError.length} more characters`}
          </Text>
        )}
    </>
  );
};

export default PasswordError;
