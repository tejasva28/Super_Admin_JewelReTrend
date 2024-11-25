// src/views/admin/marketplace/components/StepperComponents.js

import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

/**
 * Step Component
 * Represents a single step in the stepper
 */
export const Step = ({ isComplete, isActive, title, description }) => {
  const activeColor = useColorModeValue("teal.500", "teal.300");
  const inactiveColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex direction="column" align="center" flex="1">
      <Box
        mb={2}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="40px"
        h="40px"
        borderRadius="50%"
        bg={isComplete || isActive ? activeColor : inactiveColor}
        color="white"
      >
        {isComplete ? (
          <Icon as={FaCheck} w={5} h={5} />
        ) : (
          <Text fontSize="md" fontWeight="bold">
            {title}
          </Text>
        )}
      </Box>
      <Text
        fontSize="sm"
        fontWeight={isActive ? "semibold" : "normal"}
        color={isActive ? activeColor : inactiveColor}
        textAlign="center"
      >
        {description}
      </Text>
    </Flex>
  );
};

/**
 * Stepper Component
 * Contains all the steps and handles the layout
 */
export const Stepper = ({ currentStep, steps }) => {
  const activeColor = useColorModeValue("teal.500", "teal.300");
  const inactiveColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box width="100%" mb={8}>
      <HStack spacing={0} position="relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <React.Fragment key={index}>
              <Step
                isComplete={isComplete}
                isActive={isActive}
                title={stepNumber}
                description={step.description}
              />
              {index !== steps.length - 1 && (
                <Box
                  flex="1"
                  height="2px"
                  bg={isComplete ? activeColor : inactiveColor}
                />
              )}
            </React.Fragment>
          );
        })}
      </HStack>
    </Box>
  );
};
