import React, { useState } from "react";
import {
  HStack,
  PinInput,
  PinInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import StyledButton from "components/styled-components/StyledButton";

export const TwoFAField: React.FC<{
  buttonText: "Sign In" | "Verify";
  isLoading: boolean;
  verify2FA: (otp: string) => Promise<void>;
}> = ({ isLoading, buttonText, verify2FA }) => {
  const [otp, setOtp] = useState("");

  return (
    <VStack alignItems="center" spacing={7}>
      <Text textAlign={"center"} color="subtle" fontSize={"md"}>
        Verify the code from the authenticator app.
      </Text>
      <HStack width="100%" justifyContent={"center"}>
        <PinInput
          value={otp}
          onChange={(e) => setOtp(e)}
          type="number"
          onComplete={(e) => verify2FA(e)}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <StyledButton
        w="250px"
        type="submit"
        variant="brand"
        isLoading={isLoading}
        disabled={otp.length !== 6}
        onClick={() => verify2FA(otp)}
      >
        {buttonText}
      </StyledButton>
    </VStack>
  );
};
