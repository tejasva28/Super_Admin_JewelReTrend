import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Text } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  // Chakra color mode
  let textColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="left" direction="column">
      {/* Replace the logo with a text */}
      <Text fontSize="3xl" fontWeight="bold" my="32px" color={textColor}>
        JEWEL 
        <br/>
        ReTrend
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
