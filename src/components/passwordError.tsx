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
    let uniqueArr: string[] = [];
    for (var i = 0; i < arr1.length; i++) {
      let flag = 0;
      for (var j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          arr2.splice(j, 1);
          j--;
          flag = 1;
        }
      }

      if (flag === 0) {
        uniqueArr.push(arr1[i]);
      }
    }
    arr2.forEach((item) => {
      uniqueArr.push(item);
    });
    return uniqueArr;
  }

  return (
    <>
      {passwordError &&
        (passwordError.length < 8 || passwordError.contains.length < 4) && (
          <Text color={"subtle"} fontSize={"sm"} mt={2} textAlign="left">
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
