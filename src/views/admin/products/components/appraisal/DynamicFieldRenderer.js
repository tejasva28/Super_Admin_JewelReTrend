// File: src/views/admin/products/components/appraisal/DynamicFieldRenderer.js

import React from "react";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Input,
  Checkbox,
  HStack,
  FormErrorMessage,
  Box,
  Select,
} from "@chakra-ui/react";
import { Field } from "formik";

export default function DynamicFieldRenderer({ fields = [], formik }) {
  if (!fields || fields.length === 0) return null;

  return (
    <Box mt={4}>
      {fields.map((df) => {
        const { name: fieldName, type, required, options } = df;
        switch (type) {
          case "NUMBER":
            return (
              <Field name={fieldName} key={fieldName}>
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isRequired={required}
                    isInvalid={form.errors[fieldName] && form.touched[fieldName]}
                  >
                    <FormLabel>{formatFieldLabel(fieldName)}</FormLabel>
                    <NumberInput
                      value={field.value || ""}
                      onChange={(val) => form.setFieldValue(fieldName, val)}
                    >
                      <NumberInputField />
                    </NumberInput>
                    <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            );

          case "BOOLEAN":
            return (
              <Field name={fieldName} key={fieldName}>
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isRequired={required}
                    isInvalid={form.errors[fieldName] && form.touched[fieldName]}
                  >
                    <HStack>
                      <Checkbox
                        isChecked={field.value || false}
                        onChange={(e) =>
                          form.setFieldValue(fieldName, e.target.checked)
                        }
                      >
                        {formatFieldLabel(fieldName)}
                      </Checkbox>
                    </HStack>
                    <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            );

          case "STRING":
          default:
            if (options && options.length > 0) {
              // Render as Select dropdown
              return (
                <Field name={fieldName} key={fieldName}>
                  {({ field, form }) => (
                    <FormControl
                      mt={4}
                      isRequired={required}
                      isInvalid={form.errors[fieldName] && form.touched[fieldName]}
                    >
                      <FormLabel>{formatFieldLabel(fieldName)}</FormLabel>
                      <Select
                        {...field}
                        placeholder={`Select ${formatFieldLabel(fieldName)}`}
                      >
                        {options.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              );
            } else {
              // Render as regular Input
              return (
                <Field name={fieldName} key={fieldName}>
                  {({ field, form }) => (
                    <FormControl
                      mt={4}
                      isRequired={required}
                      isInvalid={form.errors[fieldName] && form.touched[fieldName]}
                    >
                      <FormLabel>{formatFieldLabel(fieldName)}</FormLabel>
                      <Input {...field} placeholder={`Enter ${formatFieldLabel(fieldName)}`} />
                      <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              );
            }
        }
      })}
    </Box>
  );
}

/**
 * Helper function to format field names into readable labels.
 * e.g., "ringSize" -> "Ring Size"
 */
function formatFieldLabel(fieldName) {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
