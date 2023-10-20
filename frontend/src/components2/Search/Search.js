import { Button, ButtonGroup, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Search({ setSearch, handleReport, pathname }) {
  return (
    <Flex
      justifyContent="space-between"
      gap="5"
      flexDirection={{ sm: "column", md: "row" }}
    >
      <ButtonGroup spacing={6}>
        <Button colorScheme="messenger">
          <Link
            to={{
              pathname: pathname,
              state: { positionID: "" },
            }}
          >
            New
          </Link>
        </Button>
        <Button colorScheme="green" onClick={handleReport}>
          PDF Report
        </Button>
      </ButtonGroup>
      <Input
        placeholder="Search"
        w={300}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Flex>
  );
}
