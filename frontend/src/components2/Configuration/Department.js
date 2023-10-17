import {
  Box,
  Button,
  Stack,
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
  Tbody,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/Card/Card";
import FourGraphs from "components/FourGraphs/FourGraphs";
import React from "react";
import { useEffect } from "react";

export default function Department() {
  // useEffect(() => {
  //   const ResData = async () => {
  //     try {
  //       const res = await axios.get("/departments");
  //       const data = await res.data;
  //       console.log("res", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   ResData();
  // }, []);
  return (
    <Box px={3}>
      <Card>
        <TableContainer>
          <Button colorScheme="green">Create</Button>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>actions</Th>
                <Th>Department</Th>
                <Th>Position</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            {/* <Tbody>
                {positionData.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </Td>
                    <Td>{item.departmentName}</Td>
                    <Td>{item.positionName}</Td>
                    <Td>{item.description}</Td>
                  </Tr>
                ))}
              </Tbody> */}
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
