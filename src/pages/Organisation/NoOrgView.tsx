import React from "react";
import {
  Flex,
  Text,
  Button,
  VStack,
  Image,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { getAssetsURL } from "helpers/helperFunction";
import { useConfig } from "hooks/useConfig";
import UpgradePackage from "components/upgradePackage";
import CreateOrganisationForm from "./CreateOrganisationForm";
import { useUserRole } from "hooks/useUserRole";
import AddEmailModal from "components/modals/AddEmailModal";

const NoOrgView: React.FC<{
  hasAccess: boolean;
  refetch(): any;
}> = ({ hasAccess, refetch }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const config: any = useConfig();
  const assetsUrl = getAssetsURL(config);
  const { profileData } = useUserRole();

  return (
    <>
      <Flex
        m={6}
        mb={[2, 2, 2, 6]}
        align="center"
        flexDir={["column-reverse", "column-reverse", "column-reverse", "row"]}
      >
        <Flex
          bgColor={"white"}
          borderRadius={"5px"}
          align={"center"}
          justifyContent={"center"}
          mt={[6, 6, 6, 0]}
          p={[5, 5, 5, 0]}
          w={["100%", "100%", "100%", "fit-content"]}
        >
          <Text
            fontWeight={100}
            borderColor="detail"
            borderRadius="21px"
            border={"1px solid"}
            px={4}
            py={1.5}
            color="detail"
          >
            No Organisation created
          </Text>
        </Flex>
        <Button
          onClick={onOpen}
          variant={"cta-outline"}
          borderWidth={"1px"}
          fontWeight={500}
          _hover={{
            color: "#3300FF",
          }}
          px={10}
          py={2}
          ml={[0, 0, 0, "auto"]}
          isDisabled={!hasAccess}
        >
          {"Create Organisation"}
        </Button>
      </Flex>
      <Flex
        mx={[4, 4, 4, 6]}
        mb={6}
        px={[4, 4, 4, 6]}
        pt={8}
        pb={6}
        backgroundColor="#FCFCFC"
        border={"2px solid #EAEAEA"}
        borderRadius="15px"
        flexDir={"column"}
        h={"65vh"}
      >
        <Flex position={"relative"} w="100%" h="100%" justifyContent={"center"}>
          <VStack
            w="100%"
            spacing={4}
            mb={[6, 6, 6, 0]}
            top={0}
            left={0}
            opacity={hasAccess ? 1 : 0.5}
          >
            <Image
              src={assetsUrl + "background/organisation_cover.svg"}
              h={"250px"}
              mb={2}
            />
            <Text fontWeight={400} w={"90%"} textAlign={"center"}>
              No Organization has been created yet, Click Create Organization to
              set-up an Organization and start inviting members to your team
            </Text>
            <Link
              display={hasAccess ? "block" : "none"}
              onClick={onOpen}
              fontWeight={400}
              color="blue"
            >
              Create Organisation
            </Link>
          </VStack>
          {!hasAccess && (
            <UpgradePackage
              text={
                <>
                  Upgrade to our<strong> Pro </strong>plan or a
                  <strong> Custom </strong>
                  plan to use this feature and much more
                </>
              }
              iconSize={85}
            />
          )}
        </Flex>
      </Flex>
      {profileData && profileData.email_verified && (
        <CreateOrganisationForm
          refetch={refetch}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}

      {profileData && !profileData.email_verified && (
        <AddEmailModal
          onClose={onClose}
          isOpen={isOpen}
          profileData={profileData}
          description={"Please add your Email to Create an Organistion"}
        />
      )}
    </>
  );
};

export default NoOrgView;
