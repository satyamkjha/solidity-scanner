import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  Button,
  Image,
  Link as ChakraLink,
  useDisclosure,
  HStack,
  VStack,
} from "@chakra-ui/react";

import {
  ScheduleScan,
  VulnCheck,
  Integration,
  User,
  File,
  Work,
  Smile,
  PublishReport,
} from "components/icons";

import Header from "components/header";
import Footer from "components/footer";
import ContactUs from "components/contactus";

export const QuickScan: React.FC = () => {
  return <>
  <Header />
  </>;
};
