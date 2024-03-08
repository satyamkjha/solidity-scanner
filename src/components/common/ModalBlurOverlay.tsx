import React from "react";
import { ModalOverlay } from "@chakra-ui/react";

export default function ModalBlurOverlay() {
  return <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px)" />;
}
