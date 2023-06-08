import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

const CancelPaymentDialog: React.FC<{
  orderId: string;
  paymentPlatform: string;
  isOpen: boolean;
  onClose: () => void;
  onPaymentCancel: any;
}> = ({ orderId, paymentPlatform, isOpen, onClose, onPaymentCancel }) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const toast = useToast();

  const cancelPayment = async () => {
    const { data } = await API.delete(API_PATH.API_INVALIDATE_ORDER_BETA, {
      data: {
        payment_platform: paymentPlatform,
        order_id: orderId,
      },
    });
    if (data.status === "success") {
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      onPaymentCancel();
      onClose();
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      returnFocusOnClose={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent w="80%">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Cancel Payment
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to cancel the payment invoice?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button w="150px" ref={cancelRef} onClick={onClose} py={6}>
              No, my bad
            </Button>
            <Button
              w="150px"
              variant="brand"
              onClick={() => {
                cancelPayment();
              }}
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CancelPaymentDialog;
