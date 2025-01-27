// File: src/views/admin/products/components/appraisal/StepperComponent.js

import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";

export const Stepper = ({ steps, currentStep }) => {
  return (
    <Flex justify="space-between" mb={4} align="center">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        return (
          <Flex key={step.title} flexDirection="column" align="center">
            <Box
              as={isCompleted ? FaCheckCircle : FaRegCircle}
              color={isActive || isCompleted ? "teal.500" : "gray.400"}
              boxSize="30px"
            />
            <Text fontSize="xs" mt={1} color={isActive ? "teal.500" : "gray.500"}>
              {step.title}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
