import {
  Thead,
  Th,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  toast,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import Modal1 from "components2/Modal/Modal";
import Card from "components/Card/Card";
import FourGraphs from "components/FourGraphs/FourGraphs";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Defaults from "components/Utils/_defaults";
import Logs from "components/Utils/logs_helper";
import { deletePosition } from "api/api";
import { useToast } from "@chakra-ui/react";
import { getViewAllPosition } from "api/api";

export default function PositionCategory() {
  const toast = useToast();
  const [editItem, setEditItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({
    department: "",
    position: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const [positionData, setPositionData] = useState([]);
  const [errors, setErrors] = useState({
    error_name: "",
    error_message: "",
  });
  const positionDataRes = async () => {
    try {
      const res = await getViewAllPosition();
      setPositionData(res.result);
      console.log("positionData", positionData);
    } catch (error) {
      const errorStatus = err.code;
      console.log("What is error : " + err);
      if (errorStatus.includes("ERR_NETWORK")) {
        const useEffectLogs = new Logs(
          "DB",
          "Position",
          "useEffect /positions",
          err,
          ""
        );
        alert(useEffectLogs.getMessage());
      }
      console.log("position error", error.message);
    }
  };

  useEffect(() => {
    positionDataRes();
  }, []);

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditing(true);
  };
  const handleCreate = () => {
    setIsCreating(true);
  };
  const handleSave = (updatedData) => {
    const updatedArray = positionData.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );
    setPositionData(updatedArray);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setIsCreating(false);
    setIsEditing(false);
    setNewItem({ categoryName: "", description: "" });
    setEditItem(null);
  };
  const handleSave1 = () => {
    const newId = data.length + 1;
    const newData = { id: newId, ...newItem };
    setData([...data, newData]);
    setIsCreating(false);
    setNewItem({ categoryName: "", description: "" });
  };

  const handleDelete = async (id) => {
    try {
      const res = await deletePosition(id);
      toast({
        title: res.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log("del", res);
    } catch (error) {
      const errorStatus = err.code;
      console.log("What is error : " + err);
      if (errorStatus.includes("ERR_NETWORK")) {
        const useEffectLogs = new Logs(
          "DB",
          "Position",
          "useEffect /positions/delete",
          err,
          ""
        );
        alert(useEffectLogs.getMessage());
      }
      console.log("position error", error.message);
    }
  };

  return (
    <>
      <Stack>
        <Card>
          <TableContainer>
            <Button colorScheme="green" onClick={handleCreate}>
              Create
            </Button>
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>actions</Th>
                  <Th>Department</Th>
                  <Th>Position</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
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
              </Tbody>
            </Table>
            <Modal
              isOpen={isCreating ? isCreating : isEditing}
              onClose={handleCloseModal}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{isCreating ? "Add Item" : "Editing"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    {isCreating ? (
                      <Select placeholder="Select Department" mb={4}>
                        {positionData.map((item) => (
                          <option value={item.departmentName}>
                            {item.departmentName}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        value={positionData?.departmentName}
                        onChange={(e) =>
                          setEditItem({
                            ...positionData,
                            department: e.target.value,
                          })
                        }
                      />
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Position</FormLabel>
                    {isCreating ? (
                      <>
                        <Input
                          value={positionData.position}
                          onChange={(e) =>
                            setNewItem({
                              ...positionData,
                              position: e.target.value,
                            })
                          }
                        />
                      </>
                    ) : (
                      <Input
                        value={editItem?.position}
                        onChange={(e) =>
                          setEditItem({ ...editItem, position: e.target.value })
                        }
                      />
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    {isCreating ? (
                      <Input
                        value={newItem.description}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Input
                        value={editItem?.description}
                        onChange={(e) =>
                          setEditItem({
                            ...editItem,
                            description: e.target.value,
                          })
                        }
                      />
                    )}
                  </FormControl>
                </ModalBody>
                {isCreating ? (
                  <Button onClick={handleSave1}>Save</Button>
                ) : (
                  <Button onClick={() => handleSave(editItem)}>Save</Button>
                )}
              </ModalContent>
            </Modal>
          </TableContainer>
        </Card>
      </Stack>
    </>
  );
}
