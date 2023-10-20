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
  return (
    <ButtonGroup variant="solid" p={5} position="absolute" bottom={0}>
      <IconButton onClick={prevPage}>
        <ChevronLeftIcon boxSize={6} />
      </IconButton>
      {pageNumber.map((number, key) => (
        <Button key={key} onClick={() => currentNumber(number)}>
          {number}
        </Button>
      ))}
      <IconButton onClick={nextPage}>
        <ChevronRightIcon boxSize={6} />
      </IconButton>
    </ButtonGroup>
  );
};

export default Pagination;
