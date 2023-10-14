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
} from "@chakra-ui/react";

import { useState } from "react";
import Modal1 from "components2/Modal/Modal";

export default function PositionCategory() {
  const [editItem, setEditItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({ categoryName: "", description: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      statusName: "Available",
      description: "Available / Good Condition",
    },
    {
      id: 2,
      statusName: "Broken / Not Fixable",
      description: "Broken",
    },
    {
      id: 3,
      statusName: "Defective",
      description: "Defective",
    },
    {
      id: 4,
      statusName: "Depreciated",
      description: "Depreciated based on accounting booksxyz",
    },
  ]);
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
    <TableContainer>
      <Button colorScheme="green" onClick={handleCreate}>
        Create
      </Button>
      <Table size="lg">
        <Thead>
          <Tr>
            <Th>Actions</Th>
            <Th>Status</Th>
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
                  <Button colorScheme="blue" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
              <Td>{item.statusName}</Td>
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
              <FormLabel>Status</FormLabel>
              {isCreating ? (
                <>
                  <Input
                    value={newItem.statusName}
                    onChange={(e) =>
                      setNewItem({ ...newItem, statusName: e.target.value })
                    }
                  />
                </>
              ) : (
                <Input
                  value={editItem?.statusName}
                  onChange={(e) =>
                    setEditItem({ ...editItem, statusName: e.target.value })
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
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                />
              ) : (
                <Input
                  value={editItem?.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
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
  );
}
