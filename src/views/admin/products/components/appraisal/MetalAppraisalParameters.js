// File: src/views/jobs/components/appraisal/MetalAppraisalParameters.js

import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  Flex,
  IconButton,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { Field } from 'formik';

const MetalAppraisalParameters = ({ index, remove, errors, touched }) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="sm"
      mb={4}
      position="relative"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Metal {index + 1}
      </Text>

      {/* Remove Button */}
      {index > 0 && (
        <Tooltip label="Remove Metal" aria-label="Remove Metal">
          <IconButton
            icon={<FaTrash />}
            colorScheme="red"
            variant="ghost"
            position="absolute"
            top="2"
            right="2"
            onClick={() => remove(index)}
            aria-label="Remove Metal"
          />
        </Tooltip>
      )}

      <Flex direction="column" gap={4}>
        {/* Metal Type */}
        <Field name={`metals[${index}].metalType`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.metals &&
                form.errors.metals[index] &&
                form.errors.metals[index].metalType &&
                form.touched.metals &&
                form.touched.metals[index] &&
                form.touched.metals[index].metalType
              }
            >
              <FormLabel htmlFor={`metals[${index}].metalType`}>Metal Type</FormLabel>
              <Select
                {...field}
                id={`metals[${index}].metalType`}
                placeholder="Select Metal Type"
              >
                {['Gold', 'Silver', 'Platinum', 'Palladium'].map((metal) => (
                  <option key={metal} value={metal}>
                    {metal}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {form.errors.metals &&
                  form.errors.metals[index] &&
                  form.errors.metals[index].metalType}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Purity */}
        <Field name={`metals[${index}].purity`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.metals &&
                form.errors.metals[index] &&
                form.errors.metals[index].purity &&
                form.touched.metals &&
                form.touched.metals[index] &&
                form.touched.metals[index].purity
              }
            >
              <FormLabel htmlFor={`metals[${index}].purity`}>Purity (%)</FormLabel>
              <Input
                {...field}
                id={`metals[${index}].purity`}
                placeholder="e.g., 24"
                type="number"
                step="0.1"
              />
              <FormErrorMessage>
                {form.errors.metals &&
                  form.errors.metals[index] &&
                  form.errors.metals[index].purity}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Weight */}
        <Field name={`metals[${index}].weight`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.metals &&
                form.errors.metals[index] &&
                form.errors.metals[index].weight &&
                form.touched.metals &&
                form.touched.metals[index] &&
                form.touched.metals[index].weight
              }
            >
              <FormLabel htmlFor={`metals[${index}].weight`}>Weight (grams)</FormLabel>
              <Input
                {...field}
                id={`metals[${index}].weight`}
                placeholder="e.g., 10"
                type="number"
                step="0.1"
              />
              <FormErrorMessage>
                {form.errors.metals &&
                  form.errors.metals[index] &&
                  form.errors.metals[index].weight}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
    </Box>
  );
};

export default MetalAppraisalParameters;
