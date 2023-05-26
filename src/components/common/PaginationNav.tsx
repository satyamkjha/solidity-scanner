import React from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@chakra-ui/icons";

const PaginationNav: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: any;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const onEllipsisClick = (action: string) => {
    if (action === "next") {
      handlePageChange(Math.min(currentPage + 3, totalPages));
    } else if (action === "previous") {
      handlePageChange(Math.max(currentPage - 3, 1));
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            variant={i === currentPage ? "brand" : "outline"}
            color={i === currentPage ? "black" : "subtle"}
            bgColor={"white"}
            borderRadius={"8px"}
            padding={4}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          buttons.push(
            <Button
              key={i}
              variant={i === currentPage ? "brand" : "outline"}
              color={i === currentPage ? "black" : "subtle"}
              bgColor={"white"}
              borderRadius={"8px"}
              padding={4}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Button>
          );
        }
        buttons.push(
          <Button
            key="ellipsis"
            variant={"outline"}
            color={"subtle"}
            bgColor={"white"}
            borderRadius={"8px"}
            padding={4}
            onClick={() => onEllipsisClick("next")}
          >
            ...
          </Button>
        );
        buttons.push(
          <Button
            key={totalPages}
            variant={totalPages === currentPage ? "brand" : "outline"}
            color={totalPages === currentPage ? "black" : "subtle"}
            bgColor={"white"}
            borderRadius={"8px"}
            padding={4}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      } else if (currentPage >= totalPages - 1) {
        buttons.push(
          <Button
            key="prev_ellipsis"
            variant={"outline"}
            color={"subtle"}
            bgColor={"white"}
            borderRadius={"8px"}
            padding={4}
            onClick={() => onEllipsisClick("previous")}
          >
            ...
          </Button>
        );
        for (let i = totalPages - 2; i <= totalPages; i++) {
          buttons.push(
            <Button
              key={i}
              variant={i === currentPage ? "brand" : "outline"}
              color={i === currentPage ? "black" : "subtle"}
              bgColor={"white"}
              borderRadius={"8px"}
              padding={4}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Button>
          );
        }
      } else {
        buttons.push(
          <Button
            key="prev_ellipsis"
            variant={"outline"}
            color={"subtle"}
            bgColor={"white"}
            borderRadius={"8px"}
            padding={4}
            onClick={() => onEllipsisClick("previous")}
          >
            ...
          </Button>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(
            <Button
              key={i}
              variant={i === currentPage ? "brand" : "outline"}
              color={i === currentPage ? "black" : "subtle"}
              bgColor={"white"}
              borderRadius={"8px"}
              padding={4}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Button>
          );
        }
        buttons.push(
          <Button
            key="next_ellipsis"
            variant={"outline"}
            color={"subtle"}
            bgColor={"white"}
            borderRadius={"8px"}
            padding={4}
            onClick={() => onEllipsisClick("next")}
          >
            ...
          </Button>
        );
        buttons.push(
          <Button
            key={totalPages}
            variant={totalPages === currentPage ? "brand" : "outline"}
            color={totalPages === currentPage ? "black" : "subtle"}
            bgColor={"white"}
            borderRadius={"8px"}
            padding={4}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }
    }

    return buttons;
  };

  return (
    <Stack direction="row" align="center" spacing={3}>
      <Button
        variant={"outline"}
        bgColor={"white"}
        borderRadius={"8px"}
        padding={0}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        <ArrowLeftIcon color={"black"} fontSize={"10px"} />
      </Button>
      <Button
        variant={"outline"}
        bgColor={"white"}
        borderRadius={"8px"}
        padding={0}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeftIcon color={"black"} fontSize={"20px"} />
      </Button>

      {renderPageButtons()}

      <Button
        variant={"outline"}
        bgColor={"white"}
        borderRadius={"8px"}
        padding={0}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRightIcon color={"black"} fontSize={"20px"} />
      </Button>
      <Button
        variant={"outline"}
        bgColor={"white"}
        borderRadius={"8px"}
        padding={0}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        <ArrowRightIcon color={"black"} fontSize={"10px"} />
      </Button>
    </Stack>
  );
};

export default PaginationNav;
