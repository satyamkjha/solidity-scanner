import React from "react";
import { Button, ButtonProps, ComponentWithAs } from "@chakra-ui/react";
import Loader from "./Loader";

const StyledButton: ComponentWithAs<"button", ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button {...props} spinner={<Loader color={"#3300FF"} size={25} />}>
      {children}
    </Button>
  );
};

export default StyledButton;
