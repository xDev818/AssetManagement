import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  IconButton,
  Tbody,
  Td,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Pagination = ({
  nextPage,
  prevPage,
  currentNumber,
  pageNumber,
}) => {
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  const renderPageNumbers = () => {
    const pageNumbersToDisplay = [];
    const totalPages = pageNumber.length;

    if (totalPages > 7) {
      console.log("totalPages: " + totalPages);
      // Insert an ellipsis before the middle child
      const middleIndex = Math.floor(totalPages / 2);
      pageNumbersToDisplay.push(pageNumber[0]);

      if (middleIndex > 1) {
        console.log("middle index", middleIndex);
        pageNumbersToDisplay.push("...");
      }

      for (
        let i = Math.max(1, middleIndex - 1);
        i <= Math.min(middleIndex + 1, totalPages - 1);
        i++
      ) {
        pageNumbersToDisplay.push(pageNumber[i]);
      }

      if (middleIndex < totalPages - 2) {
        pageNumbersToDisplay.push("...");
      }

      pageNumbersToDisplay.push(pageNumber[totalPages - 1]);
    } else {
      pageNumbersToDisplay.push(...pageNumber);
    }

    return pageNumbersToDisplay.map((number, key) => (
      <Button
        key={key}
        onClick={() => {
          if (typeof number === "number") {
            currentNumber(number);
          }
        }}
        size={buttonSize}
        isDisabled={number === "..."}
      >
        {number}
      </Button>
    ));
  };

  return (
    <>
      <ButtonGroup
        variant="solid"
        p={5}
        position="absolute"
        bottom={0}
        display={{ base: "none", md: "block" }}
      >
        <IconButton onClick={prevPage} size={buttonSize}>
          <ChevronLeftIcon boxSize={6} />
        </IconButton>
        {renderPageNumbers()}
        <IconButton onClick={nextPage} size={buttonSize}>
          <ChevronRightIcon boxSize={6} />
        </IconButton>
      </ButtonGroup>

      <ButtonGroup
        variant="solid"
        p={5}
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        bottom={-3}
        display={{ base: "block", md: "none" }}
      >
        <IconButton onClick={prevPage} size={buttonSize}>
          <ChevronLeftIcon boxSize={6} />
        </IconButton>
        <IconButton onClick={nextPage} size={buttonSize}>
          <ChevronRightIcon boxSize={6} />
        </IconButton>
      </ButtonGroup>
    </>
  );
};

export default Pagination;