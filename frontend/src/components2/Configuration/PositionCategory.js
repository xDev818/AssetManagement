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
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import Modal1 from "components2/Modal/Modal";
import Card from "components/Card/Card";
import FourGraphs from "components/FourGraphs/FourGraphs";
import axios from "axios";

export default function PositionCategory() {
  const [editItem, setEditItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({
    department: "",
    position: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      department: "Accessories",
      position: "IT Support L1",
      description: "Accessories",
    },
    {
      id: 2,
      department: "Consumables",
      position: "IT Support L1",
      description: "Consumables",
    },
    {
      id: 3,
      department: "Hardware",
      position: "IT Support L1",
      description: "Hardware",
    },
    {
      id: 4,
      department: "Software",
      position: "IT Support L1",
      description: "Software",
    },
  ]);
  
  // const positionData = async () => {
  //   const res = await axios.get("http://localhost:5001/api/positions");
  //   const data = await res.data;

  //   console.log(data);
  // };

  // useEffect(() => {
  //   positionData();
  // }, []);

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditing(true);
  };
  const handleCreate = () => {
    setIsCreating(true);
  };
  const handleSave = (updatedData) => {
    const updatedArray = data.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );
    setData(updatedArray);
    setIsEditing(false);
  };
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
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

  console.log(editItem?.categoryName);
  console.log("data", data);
  if (isCreating) {
    console.log("creating");
  }
  if (isEditing) {
    console.log("editing");
  }
  return (
    <>
      <Stack mt={100}>
        <FourGraphs />
        <Card>
          <TableContainer>
            <Button colorScheme="green" onClick={handleCreate}>
              Create
            </Button>
            <Table size="lg">
              <Thead>
                <Tr>
                  <Th>Actions</Th>
                  <Th>Department</Th>
                  <Th>Position</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
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
                    <Td>{item.department}</Td>
                    <Td>{item.position}</Td>
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
                        <option value="ITHelpSupport">ITHelpSupport</option>
                        <option value="IT">IT</option>
                        <option value="Project Manager">Project Manager</option>
                      </Select>
                    ) : (
                      <Input
                        value={editItem?.department}
                        onChange={(e) =>
                          setEditItem({
                            ...editItem,
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
                          value={newItem.position}
                          onChange={(e) =>
                            setNewItem({ ...newItem, position: e.target.value })
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
