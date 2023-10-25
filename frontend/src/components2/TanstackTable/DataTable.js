/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 10 / 25 / 23
    Author : John Ogama
    Activities
    Purpose : 
      create Data Component for Pagination

  
    Date : 10 / 25 / 23
    Author : Nole
    Activities
    Purpose : 
      Update pagination add 5 rows display
 
*/

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  ButtonGroup,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Option,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import decoder from "jwt-decode";
import axios from "axios";
import Logs from "components/Utils/logs_helper";
import Card from "components/Card/Card";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";

export default function DataTable({
  dataGrid,
  columns,
  handleReport,
  handleExcelReport,
  pathname,
  handleDelete,
  idType,
}) {
  const [filtering, setFiltering] = useState("");

  const data = useMemo(() => {
    return dataGrid;
  }, [dataGrid]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },

    onGlobalFilterChange: setFiltering,
  });

  return (
    <Card>
      <Box>
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
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="green"
              >
                Report
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleReport} colorScheme="twitter">
                  PDF{" "}
                </MenuItem>
                <MenuItem onClick={handleExcelReport} colorScheme="twitter">
                  Excel
                </MenuItem>
              </MenuList>
            </Menu>
          </ButtonGroup>
          <Input
            w={{ base: "100%", md: 500 }}
            placeholder="Search"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
          <Flex alignItems="center" gap={5}>
            <Button
              isDisabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              {"<"}
            </Button>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
            <Button
              isDisabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              {">"}
            </Button>

            <Select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(e.target.value);
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
      </Box>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              <Th>Actions</Th>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(
                    header.column?.columnDef?.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {console.log("id123", row.original)}
              <Td>
                <ButtonGroup>
                  <Button
                    colorScheme="red"
                    onClick={(e) => handleDelete(e, row.original[idType])}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button colorScheme="blue">
                    <Link
                      to={{
                        pathname: `${pathname}/${row.original[idType]}`,
                        // state: { positionID: row.original.id },
                      }}
                    >
                      <EditIcon />
                    </Link>
                  </Button>
                </ButtonGroup>{" "}
              </Td>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column?.columnDef?.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
}
