import React, { useState } from "react";
import SmallMessageModal from "./smallMessageModal";
import { Button, Textarea } from "@chakra-ui/react";

const ConfirmActionForm: React.FC<{
  onClose(): any;
  isOpen: boolean;
  onActionConfirm: any;
  modalHeader: string;
  modelText: any;
  addComment?: boolean;
  confirmBtnText?: string;
}> = ({
  isOpen,
  onClose,
  onActionConfirm,
  modalHeader,
  modelText,
  addComment,
  confirmBtnText,
}) => {
  const [comment, setComment] = useState<string>("");
  return (
    <SmallMessageModal
      isOpen={isOpen}
      onClose={onClose}
      modalHeader={modalHeader}
      modalBody={
        <>
          {modelText}
          {addComment && (
            <Textarea
              variant={"brand"}
              placeholder="Your Comment"
              borderRadius={"16px"}
              fontSize={"15px"}
              borderColor={"gray.100"}
              borderWidth={"2px"}
              noOfLines={4}
              mt={10}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && !e.shiftKey) {
                  if (addComment) {
                    onActionConfirm(comment);
                    setComment("");
                    onClose();
                  } else {
                    onActionConfirm();
                    onClose();
                  }
                }
              }}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              height={"120px"}
              _hover={{ borderColor: "gray.200" }}
              size="sm"
              _focus={{
                borderColor: "#52FF00",
                boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
              }}
            />
          )}
          <Button
            h={"50px"}
            mt={"auto"}
            mb={2}
            variant="brand"
            px={12}
            borderRadius={10}
            fontSize={"md"}
            fontWeight={500}
            disabled={addComment ? !comment : false}
            onClick={() => {
              if (addComment) {
                onActionConfirm(comment);
                setComment("");
                onClose();
              } else {
                onClose();
                onActionConfirm();
              }
            }}
          >
            {confirmBtnText || "Confirm"}
          </Button>
        </>
      }
    />
  );
};

export default ConfirmActionForm;
