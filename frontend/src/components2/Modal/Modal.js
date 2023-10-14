import React from "react";
import {
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

export default function Modal1({
  isCreating,
  isEditing,
  handleCloseModal,
  editItem,
  newItem,
  setNewItem,
  setEditItem,
  handleSave,
  handleSave1,
}) {
  return (
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
            <FormLabel>Category Name</FormLabel>
            {isCreating ? (
              <Input
                value={newItem.categoryName}
                onChange={(e) =>
                  setNewItem({ ...newItem, categoryName: e.target.value })
                }
              />
            ) : (
              <Input
                value={editItem?.categoryName}
                onChange={(e) =>
                  setEditItem({ ...editItem, categoryName: e.target.value })
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
  );
}
