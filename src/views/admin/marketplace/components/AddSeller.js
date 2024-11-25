// src/views/admin/marketplace/components/AddSeller.js

import React from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import SidebarComponent from "./SidebarComponent"; // Ensure the path is correct

const AddSeller = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {/* Floating Add Seller Button */}
      <IconButton
        icon={<AddIcon />}
        colorScheme="teal"
        isRound
        size="lg"
        position="fixed"
        bottom="30px"
        right="30px"
        zIndex={1000}
        onClick={onOpen}
        aria-label="Add Seller"
      />

      {/* Sidebar (Drawer) */}
      <SidebarComponent isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default AddSeller;
