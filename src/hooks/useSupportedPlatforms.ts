import { useQuery } from "react-query";
import API from "helpers/api";
import { Profile } from "common/types";

const getSupportedChains = async () => {
  const { data } = await API.get("/api-get-supported-chains/");
  return data;
};

export const useSupportedChains = () => {
  return useQuery<{ [key: string]: string[] }>("supported_chains", () =>
    getSupportedChains()
  );
};

// import React from "react";
// import { Link as RouterLink } from "react-router-dom";
// import {
//   Box,
//   Container,
//   Button,
//   Text,
//   Flex,
//   SimpleGrid,
//   ButtonProps,
//   Link,
//   ScaleFade,
//   useDisclosure,
//   HStack,
//   Image,
//   Heading,
//   ListIcon,
// } from "@chakra-ui/react";

// import Header from "components/header";
// import Footer from "components/footer";
// import { PricingCard } from "./components/pricingCard";
// import { useState } from "react";
// import ContactUs from "components/contactus";
// import { HiCheckCircle } from "react-icons/hi";

// export default function PricingPage() {
//   const [tab, setTab] = useState<string>("weekly");
//   const { isOpen, onClose, onOpen } = useDisclosure();

//   return (
//     <>
//       <Header />
//       <Container maxW="100vw" color="black">
//         <Flex
//           maxW="7xl"
//           mx="auto"
//           flexDirection="column"
//           alignItems="center"
//           py={7}
//           px={4}
//           background="rgba(82, 255, 0, 0.04)"
//           backgroundImage="url(./pattern.png)"
//           borderRadius="3xl"
//         >
//           <Text
//             fontSize="4xl"
//             fontWeight="700"
//             my={1}
//             color="#323B4B"
//             textAlign="center"
//             lineHeight="title"
//           >
//             Pricing
//           </Text>
//           <Text
//             color="#323B4B"
//             width={["100%", "50%"]}
//             lineHeight="title"
//             fontWeight="500"
//             textAlign="center"
//             fontSize="lg"
//             fontFamily="Inter"
//             my={3}
//           >
//             Signup for a trial and get two scans free.
//           </Text>
//           {/* <Flex
//             flexDirection="row"
//             alignItems="center"
//             mt={7}
//             px={2}
//             py={2}
//             background="#FFFFFF"
//             borderRadius="full"
//             maxW="85vw"
//           > */}
//           {/* <ActionButton
//               onClick={() => setTab("weekly")}
//               fontSize="lg"
//               py={1}
//               px={10}
//               borderRadius="full"
//               mr={1}
//               variant={tab === "weekly" ? "brand" : "ghost"}
//             >
//               Weekly
//             </ActionButton> */}
//           {/* <ActionButton
//               onClick={() => setTab("monthly")}
//               fontSize="lg"
//               py={1}
//               px={10}
//               borderRadius="full"
//               mx={1}
//               variant={tab === "monthly" ? "brand" : "ghost"}
//             >
//               Monthly
//             </ActionButton> */}
//           {/* <ActionButton
//               onClick={() => setTab("yearly")}
//               fontSize="lg"
//               py={1}
//               px={10}
//               borderRadius="full"
//               ml={1}
//               variant={tab === "yearly" ? "brand" : "ghost"}
//             >
//               Yearly
//             </ActionButton> */}
//           {/* </Flex> */}
//         </Flex>
//         <ScaleFade initialScale={0.9} in={tab === "weekly"}>
//           <Box
//             px={16}
//             as="section"
//             py="14"
//             display="flex"
//             flexDirection="row"
//             justifyContent={"center"}
//             alignContent={"center"}
//           >
//             <Flex
//               as={"div"}
//               flexDirection="column"
//               justifyContent={"flex-end"}
//               alignContent={"center"}
//               my={'50px'}
//             >
//               <Box
//                 as="div"
//                 py={"48px"}
//                 px={"100px"}
//                 display="flex"
//                 flexDirection="row"
//               >
//                 <Text
//                   fontSize="2xl"
//                   fontWeight="700"
//                   my={1}
//                   textAlign="center"
//                   lineHeight="title"
//                 >
//                   Packages
//                 </Text>
//               </Box>
//               <Box
//                 as="div"
//                 py={"35px"}
//                 px={"50px"}
//                 display="flex"
//                 flexDirection="row"
//                 borderTopLeftRadius={"xl"}
//                 border="2px solid #D6D6D6"
//                 borderRightWidth={0}
//                 borderBottomWidth={0}
//               >
//                 <HStack spacing={1}>
//                   <Image src="/pricing/coin.svg" mx="auto" mr={4} />
//                   <Text
//                     fontSize="lg"
//                     textAlign="center"
//                     lineHeight="title"
//                     fontWeight={"300"}
//                   >
//                     Scan Credit
//                   </Text>
//                 </HStack>
//               </Box>
//               <Box
//                 as="div"
//                 py={"36px"}
//                 px={"50px"}
//                 display="flex"
//                 flexDirection="row"
//                 borderLeft="2px solid #D6D6D6"
//                 backgroundColor={"#FAFAFB"}
//               >
//                 <HStack spacing={1}>
//                   <Image src="/pricing/github.svg" mx="auto" mr={4} />
//                   <Text
//                     fontSize="lg"
//                     textAlign="center"
//                     lineHeight="title"
//                     fontWeight={"300"}
//                   >
//                     Private Github
//                   </Text>
//                 </HStack>
//               </Box>
//               <Box
//                 as="div"
//                 py={"35px"}
//                 px={"50px"}
//                 display="flex"
//                 flexDirection="row"
//                 borderLeft="2px solid #D6D6D6"
//               >
//                 <HStack spacing={1}>
//                   <Image src="/pricing/report.svg" mx="auto" mr={4} />
//                   <Text
//                     fontSize="lg"
//                     textAlign="center"
//                     lineHeight="title"
//                     fontWeight={"300"}
//                   >
//                     Generate Report
//                   </Text>
//                 </HStack>
//               </Box>
//               <Box
//                 as="div"
//                 py={"36px"}
//                 px={"50px"}
//                 display="flex"
//                 flexDirection="row"
//                 borderLeft="2px solid #D6D6D6"
//                 borderBottom="2px solid #D6D6D6"
//                 backgroundColor={"#FAFAFB"}
//                 borderBottomLeftRadius={"xl"}
//               >
//                 <HStack spacing={1}>
//                   <Image src="/pricing/publish.svg" mx="auto" mr={4} />
//                   <Text
//                     fontSize="lg"
//                     textAlign="center"
//                     lineHeight="title"
//                     fontWeight={"300"}
//                   >
//                     Publishable Reports
//                   </Text>
//                 </HStack>
//               </Box>
//             </Flex>
//             <SimpleGrid
//               columns={4}
//               maxW="7xl"
//               spacing={0}
//               justifyItems="center"
//               alignItems="center"

//             >
//               <PricingColumn />
//               <PricingColumn />
//               <PricingColumn />
//               <PricingColumn />
//             </SimpleGrid>
//           </Box>
//         </ScaleFade>
//       </Container>
//       <ContactUs isOpen={isOpen} onClose={onClose} />
//       <Footer />
//     </>
//   );
// }

// export const ActionButton = (props: ButtonProps) => (
//   <Button
//     variant="brand"
//     size="lg"
//     w="full"
//     fontWeight="extrabold"
//     py={{ md: "8" }}
//     {...props}
//   />
// );

// export const PricingColumn = () => {
//   const successColor = "#289F4C";
//   const greyColor = "#808080";

//   const [mouse, setMouse] = useState(false);

//   return (
//     <Flex
//       as={"div"}
//       onMouseOver={() => setMouse(true)}
//       onMouseOut={() => setMouse(false)}
//       flexDirection="column"
//       justifyContent={"flex-start"}
//       alignContent={"flex-start"}
//       overflow={"hidden"}
//       _hover={{
//         margin: '0px'
//       }}
//       my={'50px'}

//       border={`2px solid ${mouse ? "#3E15F4" : "#D6D6D6"}`}
//       _notLast={{
//         borderRightWidth: mouse ? "2px" : "0px",
//       }}
//       _last={{
//         borderTopRightRadius: mouse ? "24px" : "12px",
//         borderBottomRightRadius: mouse ? "24px" : "12px",
//       }}
//       _first={{
//         borderTopLeftRadius: mouse ? "24px" : "12px",
//         borderBottomLeftRadius: mouse ? "24px" : "0px",
//       }}
//       borderRadius={mouse ? "24px" : "0px"}
//       zIndex={10}
//     >

//       {mouse ? (
//         <>
//         <ScaleFade initialScale={0.9} in={mouse}>
//         <Box
//         as="div"
//         py={"10px"}
//         px={"15px"}
//         display="flex"
//         flexDirection="row"
//         justifyContent={"center"}
//         alignItems={"center"}
//         backgroundColor={'#3300FF'}
//         transition='height 2s ease-in'
//       >
//         <HStack>
//         <Text
//                     fontSize="sm"
//                     textAlign="center"
//                     lineHeight="title"
//                     fontWeight={"300"}
//                     color={'#FFFFFF'}
//                   >
//                     Save upto
//                   </Text>
//                   <Heading
//                     fontSize="xl"
//                     textAlign="center"
//                     lineHeight="title"
//                     fontWeight={"700"}
//                     color={'#FFFFFF'}
//                   >
//                     50%
//                   </Heading>
//                   </HStack>
//       </Box>

//         <Box
//           as="div"
//           py={"25px"}
//           px={"50px"}
//           display="flex"
//           flexDirection="column"
//           borderBottom="2px solid #D6D6D6"
//         >

//           <Text
//             fontSize="lg"
//             textAlign="center"
//             lineHeight="title"
//             fontWeight={"300"}
//           >
//             Ultra Noob
//           </Text>
//           <Heading
//             fontSize="2xl"
//             textAlign="center"
//             lineHeight="title"
//             fontWeight={900}
//           >
//             Free
//           </Heading>
//         </Box>
//         <Box
//           as="div"
//           py={"40px"}
//           px={"15px"}
//           display="flex"
//           flexDirection="row"
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <Text
//             fontSize='sm'
//             textAlign="center"
//             lineHeight="title"
//             fontWeight={"300"}
//           >
//            Development SME or Security Research SME or NFT SME or Medium Size Teams
//           </Text>
//         </Box>
//         <Box
//           as="div"
//           py={"15px"}
//           px={"50px"}
//           display="flex"
//           flexDirection="row"
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <Text
//                       fontSize="sm"
//                       textAlign="center"
//                       lineHeight="title"
//                       fontWeight={"300"}
//                       color={'#3300FF'}
//                     >
//                       Choose
//                     </Text>
//         </Box>
//           </ScaleFade>

//         </>
//       ): (
//         <ScaleFade initialScale={0.9} in={!mouse}>
//         <Box
//           as="div"
//           py={"25px"}
//           px={"50px"}
//           display="flex"
//           flexDirection="column"
//           borderBottom="2px solid #D6D6D6"
//         >
//           <Text
//             fontSize="md"
//             textAlign="center"
//             lineHeight="title"
//             fontWeight={"300"}
//           >
//             Free
//           </Text>
//           <Text
//             fontSize="lg"
//             textAlign="center"
//             lineHeight="title"
//             fontWeight={"300"}
//           >
//             Ultra Noob
//           </Text>
//           <Heading
//             fontSize="2xl"
//             textAlign="center"
//             lineHeight="title"
//             fontWeight={900}
//           >
//             Free
//           </Heading>
//         </Box>
//         <Box
//           as="div"
//           py={"40px"}
//           px={"50px"}
//           display="flex"
//           flexDirection="row"
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <HiCheckCircle size={30} color={successColor} />
//         </Box>
//         <Box
//           as="div"
//           py={"40px"}
//           px={"50px"}
//           display="flex"
//           flexDirection="row"
//           backgroundColor={"#FAFAFB"}
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <HiCheckCircle size={30} color={successColor} />
//         </Box>
//         <Box
//           as="div"
//           py={"40px"}
//           px={"50px"}
//           display="flex"
//           flexDirection="row"
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <HiCheckCircle size={30} color={successColor} />
//         </Box>
//         <Box
//           as="div"
//           py={"40px"}
//           px={"50px"}
//           display="flex"
//           flexDirection="row"
//           backgroundColor={"#FAFAFB"}
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <HiCheckCircle size={30} color={successColor} />
//         </Box>
//         </ScaleFade>
//       )}

//     </Flex>
//   );
// };
