import { Button, ButtonGroup, Flex, Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem, } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";


export default function Search({ setSearch, handleReport, handleExcelReport,pathname }) {
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
          <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='green'>
                Report
              </MenuButton>
              <MenuList>
                <MenuItem   onClick={handleReport} colorScheme='twitter'>PDF </MenuItem>
                <MenuItem  onClick={handleExcelReport} colorScheme='twitter'>Excel</MenuItem>
                
              </MenuList>
          </Menu>

      
        {/* <Button colorScheme="green" onClick={handleReport}>
          PDF Report
        </Button> */}
      </ButtonGroup>
      <Input
        placeholder="Search"
        w={300}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Flex>
  );
}
