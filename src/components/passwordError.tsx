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

  function unique(arr1: string[], arr2: string[]): string[] {
    const uniqueSet = new Set(arr1);

    for (const item of arr2) {
      if (!uniqueSet.has(item)) {
        uniqueSet.add(item);
      }
    }
    return [...uniqueSet];
  }

  return (
    <>
      {passwordError &&
        passwordError.length < 8 &&
        passwordError.contains.length < 4 && (
          <Text color={"subtle"} size={"xs"}>
            Your password should contain a
            {unique(passwordError.contains, charTypes).map(
              (item) => ` ${item}, `
            )}
            {passwordError.length < 8 &&
              ` and should have ${8 - passwordError.length} more characters`}
          </Text>
        )}
    </>
  );
};

export default PasswordError;
