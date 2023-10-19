import React, { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useMediaQuery,
} from "@chakra-ui/react";

import ApplicationForm from "./ApplicationForm";
import ContractForm from "./ContractForm";
import UploadForm from "./UploadForm";
import { getAssetsURL } from "helpers/helperFunction";
import { Profile } from "common/types";

export const AddProjectFormInfographics: React.FC<{ imgUrl: string }> = ({
  imgUrl,
}) => {
  return (
    <Flex
      display={"flex"}
      w={"100%"}
      h="100%"
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
    >
      <Image src={imgUrl} height="320px" width="400px" />
    </Flex>
  );
};

const AddProjectForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
  formType: string;
  profileData: Profile;
}> = ({ isOpen, onClose, formType, profileData }) => {
  const [changeView] = useMediaQuery("(min-width: 768px)");
  const [step, setStep] = useState(changeView ? 1 : 0);
  const assetsURL = getAssetsURL();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setStep(changeView ? 1 : 0);
      }}
    >
      <ModalOverlay />
      <ModalContent
        maxWidth={["450px", "500px", "1200px"]}
        w={"95%"}
        overflowY={"scroll"}
        overflowX={"scroll"}
        bg="white"
        minH={"fit-content"}
        pt={12}
        pb={7}
      >
        <ModalCloseButton />
        <ModalBody
          display="flex"
          justifyContent="space-between"
          flexDir="row"
          alignItems="flex-start"
          w="100%"
          p={[3, 5]}
          h="fit-content"
        >
          <Flex
            w={["100%", "100%", "55%"]}
            justifyContent="center"
            alignItems="center"
          >
            {["github", "gitlab", "bitbucket"].includes(formType) && (
              <ApplicationForm
                step={step}
                formType={formType}
                setStep={setStep}
                profileData={profileData}
              />
            )}
            {formType === "verified_contract" && (
              <ContractForm
                step={step}
                setStep={setStep}
                profileData={profileData}
              />
            )}
            {formType === "filescan" && (
              <UploadForm
                page={step}
                setPage={setStep}
                profileData={profileData}
              />
            )}
          </Flex>
          <Flex
            display={["none", "none", "flex"]}
            bg="bg.subtle"
            w={["100%", "100%", "42%"]}
            h="75vh"
            justifyContent="flex-start"
            alignItems="center"
            flexDir="column"
            p={10}
            borderRadius={20}
          >
            <AddProjectFormInfographics
              imgUrl={`${assetsURL}homepage_infographics/${
                formType === "verified_contract"
                  ? "verified_contract"
                  : formType === "filescan"
                  ? `filescan_step_${step}`
                  : step === 1
                  ? `project_${formType}`
                  : `project_step_${step}`
              }.svg`}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProjectForm;
