// src/views/admin/marketplace/components/.js

import React from "react";
import {
  IconButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import SidebarComponent from "./SidebarComponent"; // Ensure the path is correct

const AddTeam= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
<React.Fragment>
      {/* Floating Add Seller Button */}
      <IconButton
        colorScheme="teal"
        isRound
        size="lg"
        position="fixed"
        bottom="30px"
        right="30px"
        zIndex={1000}
        onClick={onOpen}
        aria-label="Add Seller"
        boxShadow="lg"
        _hover={{
          bg: useColorModeValue("teal.600", "teal.400"),
        }}
        _active={{
          bg: useColorModeValue("teal.700", "teal.500"),
        }}
      />

      {/* Sidebar (Drawer) */}
      <SidebarComponent isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};

export default AddTeam;

