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
import { AddProjectFormInfographics } from "./AddProjectFormInfographics";
import { infographicsData } from "common/values";
import FilescanForm from "./FilescanForm";

const AddProjectForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
  formType: string;
  profileData: Profile;
}> = ({ isOpen, onClose, formType, profileData }) => {
  const [changeView] = useMediaQuery("(min-width: 768px)");
  const [step, setStep] = useState(changeView ? 1 : 0);
  const [uploadType, setUploadType] = useState<"single" | "multiple">("single");
  const assetsURL = getAssetsURL();

  const getInstructionsList = () =>
    infographicsData[
      formType === "block"
        ? "block"
        : formType === "filescan"
        ? step === 1
          ? `filescan_step_${step}`
          : `filescan_step_${step}_${uploadType}`
        : step === 1
        ? `project_${formType}`
        : `project_step_${step}`
    ];

  const getInfoGraphicImgUrl = () =>
    `${assetsURL}homepage_infographics/${
      formType === "block"
        ? "block"
        : formType === "filescan"
        ? step === 1
          ? `filescan_step_${step}`
          : `filescan_step_${step}_${uploadType}`
        : step === 1
        ? `project_${formType}`
        : `project_step_${step}`
    }.svg`;

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
        pt={[0, 2, 2]}
        pb={[0, 2, 2]}
        alignSelf="center"
        m={0}
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
                onClose={onClose}
              />
            )}
            {formType === "block" && (
              <ContractForm
                step={step}
                setStep={setStep}
                profileData={profileData}
                changeView={changeView}
                onClose={onClose}
              />
            )}
            {formType === "filescan" && (
              <FilescanForm
                page={step}
                setPage={setStep}
                profileData={profileData}
                uploadType={uploadType}
                setUploadType={setUploadType}
                changeView={changeView}
                onClose={onClose}
              />
            )}
          </Flex>
          {changeView && (
            <Flex
              display={["none", "none", "flex"]}
              bg="bg.subtle"
              w={["100%", "100%", "42%"]}
              h="75vh"
              justifyContent="flex-start"
              alignItems="center"
              flexDir="column"
              p={7}
              borderRadius={20}
            >
              <AddProjectFormInfographics
                imgUrl={getInfoGraphicImgUrl()}
                instructions={getInstructionsList()}
              />
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProjectForm;
