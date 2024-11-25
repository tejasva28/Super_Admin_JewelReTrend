// File: src/views/jobs/components/appraisal/DiamondAppraisalParameters.js

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
  CheckboxGroup,
  Checkbox,
  VStack,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { Field } from 'formik';

const DiamondAppraisalParameters = ({ index, remove, errors, touched }) => {
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
        Diamond {index + 1}
      </Text>

      {/* Remove Button */}
      {index > 0 && (
        <Tooltip label="Remove Diamond" aria-label="Remove Diamond">
          <IconButton
            icon={<FaTrash />}
            colorScheme="red"
            variant="ghost"
            position="absolute"
            top="2"
            right="2"
            onClick={() => remove(index)}
            aria-label="Remove Diamond"
          />
        </Tooltip>
      )}

      <Flex direction="column" gap={4}>
        {/* Carat Weight */}
        <Field name={`diamonds[${index}].caratWeight`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.diamonds &&
                form.errors.diamonds[index] &&
                form.errors.diamonds[index].caratWeight &&
                form.touched.diamonds &&
                form.touched.diamonds[index] &&
                form.touched.diamonds[index].caratWeight
              }
            >
              <FormLabel htmlFor={`diamonds[${index}].caratWeight`}>
                Carat Weight (ct)
              </FormLabel>
              <Input
                {...field}
                id={`diamonds[${index}].caratWeight`}
                placeholder="e.g., 0.5"
                type="number"
                step="0.01"
              />
              <FormErrorMessage>
                {form.errors.diamonds &&
                  form.errors.diamonds[index] &&
                  form.errors.diamonds[index].caratWeight}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Color Grade */}
        <Field name={`diamonds[${index}].colorGrade`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.diamonds &&
                form.errors.diamonds[index] &&
                form.errors.diamonds[index].colorGrade &&
                form.touched.diamonds &&
                form.touched.diamonds[index] &&
                form.touched.diamonds[index].colorGrade
              }
            >
              <FormLabel htmlFor={`diamonds[${index}].colorGrade`}>
                Color Grade
              </FormLabel>
              <Select
                {...field}
                id={`diamonds[${index}].colorGrade`}
                placeholder="Select Color Grade"
              >
                {['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'].map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {form.errors.diamonds &&
                  form.errors.diamonds[index] &&
                  form.errors.diamonds[index].colorGrade}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Clarity Grade */}
        <Field name={`diamonds[${index}].clarityGrade`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.diamonds &&
                form.errors.diamonds[index] &&
                form.errors.diamonds[index].clarityGrade &&
                form.touched.diamonds &&
                form.touched.diamonds[index] &&
                form.touched.diamonds[index].clarityGrade
              }
            >
              <FormLabel htmlFor={`diamonds[${index}].clarityGrade`}>
                Clarity Grade
              </FormLabel>
              <Select
                {...field}
                id={`diamonds[${index}].clarityGrade`}
                placeholder="Select Clarity Grade"
              >
                {['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2'].map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {form.errors.diamonds &&
                  form.errors.diamonds[index] &&
                  form.errors.diamonds[index].clarityGrade}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Cut Grade */}
        <Field name={`diamonds[${index}].cutGrade`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.diamonds &&
                form.errors.diamonds[index] &&
                form.errors.diamonds[index].cutGrade &&
                form.touched.diamonds &&
                form.touched.diamonds[index] &&
                form.touched.diamonds[index].cutGrade
              }
            >
              <FormLabel htmlFor={`diamonds[${index}].cutGrade`}>
                Cut Grade
              </FormLabel>
              <Select
                {...field}
                id={`diamonds[${index}].cutGrade`}
                placeholder="Select Cut Grade"
              >
                {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {form.errors.diamonds &&
                  form.errors.diamonds[index] &&
                  form.errors.diamonds[index].cutGrade}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Shape */}
        <Field name={`diamonds[${index}].shape`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.diamonds &&
                form.errors.diamonds[index] &&
                form.errors.diamonds[index].shape &&
                form.touched.diamonds &&
                form.touched.diamonds[index] &&
                form.touched.diamonds[index].shape
              }
            >
              <FormLabel htmlFor={`diamonds[${index}].shape`}>Shape</FormLabel>
              <Select
                {...field}
                id={`diamonds[${index}].shape`}
                placeholder="Select Shape"
              >
                {['Round', 'Oval', 'Marquise', 'Princess', 'Emerald', 'Asscher', 'Radiant', 'Pear', 'Cushion', 'Other'].map((shape) => (
                  <option key={shape} value={shape}>
                    {shape}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {form.errors.diamonds &&
                  form.errors.diamonds[index] &&
                  form.errors.diamonds[index].shape}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Certification */}
        <Field name={`diamonds[${index}].certification`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.diamonds &&
                form.errors.diamonds[index] &&
                form.errors.diamonds[index].certification &&
                form.touched.diamonds &&
                form.touched.diamonds[index] &&
                form.touched.diamonds[index].certification
              }
            >
              <FormLabel htmlFor={`diamonds[${index}].certification`}>
                Certification
              </FormLabel>
              <Select
                {...field}
                id={`diamonds[${index}].certification`}
                placeholder="Select Certification"
              >
                {['GIA Certified', 'AGS Certified', 'IGI Certified', 'Other Reputable', 'No Certification'].map((cert) => (
                  <option key={cert} value={cert}>
                    {cert}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {form.errors.diamonds &&
                  form.errors.diamonds[index] &&
                  form.errors.diamonds[index].certification}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Fluorescence */}
        <Field name={`diamonds[${index}].fluorescence`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.diamonds &&
                form.errors.diamonds[index] &&
                form.errors.diamonds[index].fluorescence &&
                form.touched.diamonds &&
                form.touched.diamonds[index] &&
                form.touched.diamonds[index].fluorescence
              }
            >
              <FormLabel htmlFor={`diamonds[${index}].fluorescence`}>
                Fluorescence
              </FormLabel>
              <Select
                {...field}
                id={`diamonds[${index}].fluorescence`}
                placeholder="Select Fluorescence"
              >
                {['None', 'Faint', 'Medium', 'Strong'].map((fluor) => (
                  <option key={fluor} value={fluor}>
                    {fluor}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {form.errors.diamonds &&
                  form.errors.diamonds[index] &&
                  form.errors.diamonds[index].fluorescence}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>

        {/* Additional Factors */}
        <Field name={`diamonds[${index}].additionalFactors`}>
          {({ field, form }) => (
            <FormControl>
              <FormLabel>Additional Factors</FormLabel>
              <CheckboxGroup
                colorScheme="blue"
                value={field.value}
                onChange={(values) =>
                  form.setFieldValue(`diamonds[${index}].additionalFactors`, values)
                }
              >
                <VStack align="start">
                  {['Perfect Symmetry', 'High Market Demand', 'Unique Design'].map((factor) => (
                    <Checkbox key={factor} value={factor}>
                      {factor}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </FormControl>
          )}
        </Field>

        {/* Final Price */}
        <Field name={`diamonds[${index}].finalPrice`}>
          {({ field, form }) => (
            <FormControl
              isRequired
              isInvalid={
                form.errors.diamonds &&
                form.errors.diamonds[index] &&
                form.errors.diamonds[index].finalPrice &&
                form.touched.diamonds &&
                form.touched.diamonds[index] &&
                form.touched.diamonds[index].finalPrice
              }
            >
              <FormLabel htmlFor={`diamonds[${index}].finalPrice`}>
                Final Price (₹)
              </FormLabel>
              <Input
                {...field}
                id={`diamonds[${index}].finalPrice`}
                placeholder="Enter Final Price"
                type="number"
                step="0.01"
              />
              <FormErrorMessage>
                {form.errors.diamonds &&
                  form.errors.diamonds[index] &&
                  form.errors.diamonds[index].finalPrice}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
    </Box>
  );
};

export default DiamondAppraisalParameters;
