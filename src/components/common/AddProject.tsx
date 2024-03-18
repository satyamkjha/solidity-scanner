import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Profile } from "common/types";
import AddProjectForm from "pages/Home/AddProjectForm";
import { getAssetsURL } from "helpers/helperFunction";

export const AddProject: React.FC<{
  profileData: Profile;
}> = ({ profileData }) => {
  const assetsURL = getAssetsURL();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [formType, setFormType] = useState("");

  const menuList = [
    {
      text: "Github Application",
      formType: "github",
    },
    {
      text: "GitLab",
      formType: "gitlab",
    },
    {
      text: "Bitbucket",
      formType: "bitbucket",
    },
    {
      text: "Verified Contracts",
      formType: "block",
    },
    {
      text: "Upload Contract",
      formType: "filescan",
    },
  ];

  useEffect(() => {
    if (formType !== "") {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFormType, formType]);

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="brand"
        leftIcon={<AddIcon />}
        w={"170px"}
      >
        Add Project
      </MenuButton>
      <MenuList
        p={4}
        width="250px"
        borderWidth="0px"
        sx={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.35) !important",
        }}
        borderRadius="15px"
      >
        {menuList.map((item) => (
          <MenuItem
            borderColor="border"
            py={2}
            borderRadius="10px"
            mt={2}
            onClick={() => setFormType(item.formType)}
            fontWeight={600}
          >
            <Image
              height="30px"
              width="30px"
              mr={2}
              src={`${assetsURL}icons/integrations/${item.formType}.svg`}
            />{" "}
            {item.text}
          </MenuItem>
        ))}
      </MenuList>
      <AddProjectForm
        formType={formType}
        isOpen={isOpen}
        onClose={() => {
          setFormType("");
          onClose();
        }}
      />
    </Menu>
  );
};
