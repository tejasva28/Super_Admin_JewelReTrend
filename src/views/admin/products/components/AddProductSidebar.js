// File: src/views/admin/products/components/AddProductSidebar.js

import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlus, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AppraisalForm from "./appraisal/AppraisalForm"; // Import the new AppraisalForm component

const AddProductSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent bg={useColorModeValue("white", "gray.800")}>
        {/* Enhanced Close Button */}
        <DrawerCloseButton
          color={useColorModeValue("gray.800", "white")}
          fontSize="lg"
          mt={2}
        />
        <DrawerHeader
          bgGradient="linear(to-r, teal.400, blue.500)"
          color="white"
          borderBottomWidth="1px"
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
        >
          Add New Product
        </DrawerHeader>

        <DrawerBody>
          {/* Render the AppraisalForm inside the DrawerBody */}
          <AppraisalForm onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProductSidebar;
