import {
  Box,
  Flex,
  Heading,
  // Icon,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
  FlexProps,
  BoxProps,
} from "@chakra-ui/react";
import * as React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";

export interface PricingCardData {
  features: string[];
  name: string;
  price?: string;
  nonfeatures?: string[];
}

interface PricingCardProps extends CardProps {
  custom?: boolean;
  data: PricingCardData;
  icon?: React.ElementType;
  button: React.ReactElement;
}

export const PricingCard = (props: PricingCardProps) => {
  const { data, icon, button, custom, ...rest } = props;
  const { features, price, name, nonfeatures } = data;
  const accentColor = "#19A398";
  const successColor = "#289F4C";
  const greyColor = "#808080";

  return (
    <Card rounded={{ sm: "xl" }} {...rest}>
      <VStack spacing={6}>
        {/* <Icon aria-hidden as={icon} fontSize="4xl" color={accentColor} /> */}
        <Heading size="md" fontWeight="extrabold">
          {name}
        </Heading>
      </VStack>
      <Flex
        align="flex-end"
        justify="center"
        fontWeight="extrabold"
        color={accentColor}
        my="8"
      >
        {!custom && (
          <>
            <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
              {price}
            </Heading>
            <Text fontWeight="inherit" fontSize="2xl">
              / mo
            </Text>
          </>
        )}
      </Flex>
      <List spacing="6" mb="8" maxW="28ch" mx="auto">
        {features.map((feature, index) => (
          <ListItem
            fontWeight="medium"
            fontSize="lg"
            key={index}
            color="#4E5D78"
          >
            <ListIcon
              fontSize="xl"
              as={HiCheckCircle}
              marginEnd={2}
              color={successColor}
            />
            {feature}
          </ListItem>
        ))}
        {nonfeatures?.map((nonfeature, index) => (
          <ListItem
            fontWeight="medium"
            fontSize="lg"
            key={index}
            color="#8A94A6"
          >
            <ListIcon
              fontSize="xl"
              as={HiXCircle}
              marginEnd={2}
              color={greyColor}
            />
            {nonfeature}
          </ListItem>
        ))}
      </List>
      {button}
    </Card>
  );
};

export interface CardProps extends BoxProps {
  isPopular?: boolean;
}

export const Card = (props: CardProps) => {
  const { children, isPopular, ...rest } = props;
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      position="relative"
      px="6"
      pb="6"
      pt="16"
      overflow="hidden"
      shadow="lg"
      maxW="md"
      width="100%"
      {...rest}
    >
      {isPopular && <CardBadge>Popular</CardBadge>}
      {children}
    </Box>
  );
};

export const CardBadge = (props: FlexProps) => {
  const { children, ...flexProps } = props;
  return (
    <Flex
      bg="accent"
      position="absolute"
      right={-20}
      top={6}
      width="240px"
      transform="rotate(45deg)"
      py={2}
      justifyContent="center"
      alignItems="center"
      {...flexProps}
    >
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="wider"
        color={useColorModeValue("white", "gray.800")}
      >
        {children}
      </Text>
    </Flex>
  );
};
