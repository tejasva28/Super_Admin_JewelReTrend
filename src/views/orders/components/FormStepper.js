// File: src/components/FormStepper.js

import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

export default function FormStepper({ steps, activeStep }) {
  const stepperOrientation =
    useBreakpointValue({ base: 'vertical', md: 'horizontal' }) || 'vertical';

  const stepBg = useColorModeValue('white', 'gray.800');
  const stepBorderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Stepper
      size="sm"
      colorScheme="blue"
      index={activeStep}
      orientation={stepperOrientation}
      mb="6"
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}
