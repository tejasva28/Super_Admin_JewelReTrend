// src/views/admin/marketplace/components/SidebarComponent.js

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
  FormControl,
  FormLabel,
  Input,
  HStack,
  useToast,
  Tooltip,
  Text,
  Box,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  Icon,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaInfoCircle,
} from "react-icons/fa";

const SidebarComponent = ({ isOpen, onClose }) => {
  const toast = useToast();

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter the team member's name."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    phone: Yup.string()
      .matches(
        /^\+\d{1,3}\d{7,14}$/,
        "Please enter a valid phone number with country code."
      )
      .required("Phone number is required."),
    access: Yup.string().required("Please select an access role."),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    access: "",
  };

  const handleSubmit = async (values, actions) => {
    // TODO: Integrate with backend API to submit form data

    // Simulate API call (Remove this when integrating with backend)
    setTimeout(() => {
      actions.setSubmitting(false);
      toast({
        title: "Team Member Added",
        description: `${values.name} has been successfully added to the team.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      actions.resetForm();
      onClose();
    }, 2000);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg={useColorModeValue("white", "gray.800")}>
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
          Add New Team Member
        </DrawerHeader>

        <DrawerBody>
          <Box mt={4} mb={6}>
        
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur
            validateOnChange
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <VStack spacing={6} align="stretch">
                  {/* Personal Information Section */}
                  <Heading as="h3" size="md" mb={4}>
                    Personal Information
                  </Heading>

                  {/* Name */}
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FaUser color="gray.300" />}
                          />
                          <Input
                            {...field}
                            id="name"
                            placeholder="e.g., Ramesh Kumar"
                            focusBorderColor="teal.500"
                            aria-label="Full Name"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Email */}
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FaEnvelope color="gray.300" />}
                          />
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="e.g., ramesh.kumar@example.com"
                            focusBorderColor="teal.500"
                            aria-label="Email Address"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Phone Number */}
                  <Field name="phone">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.phone && form.touched.phone}
                      >
                        <FormLabel htmlFor="phone">
                          Phone Number
                          <Tooltip
                            label="Include country code, e.g., +1234567890"
                            aria-label="Phone Tooltip"
                          >
                            <Icon as={FaInfoCircle} ml={1} color="gray.500" />
                          </Tooltip>
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FaPhone color="gray.300" />}
                          />
                          <Input
                            {...field}
                            id="phone"
                            type="tel"
                            placeholder="e.g., +1234567890"
                            focusBorderColor="teal.500"
                            aria-label="Phone Number"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Access Roles Section */}
                  <Heading as="h3" size="md" mt={8} mb={4}>
                    Assign Role
                  </Heading>
                  <Field name="access">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.access && form.touched.access}
                      >
                        <FormLabel>Access Role</FormLabel>
                        <Select
                          {...field}
                          placeholder="Select access role"
                          focusBorderColor="teal.500"
                        >
                          <option value="Photographer">Photographer</option>
                          <option value="Appraiser">Appraiser</option>
                          <option value="Admin">Admin</option>
                          <option value="Promoter">Promoter</option>
                          <option value="Operations">Operations</option>
                        </Select>
                        {form.errors.access && form.touched.access ? (
                          <FormErrorMessage>{form.errors.access}</FormErrorMessage>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>
                </VStack>

                {/* Submit Button */}
                <HStack mt={8} justify="flex-end">
                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={formik.isSubmitting}
                    isDisabled={!formik.isValid || formik.isSubmitting}
                    rightIcon={<Icon as={FaCheck} />}
                    size="lg"
                  >
                    Onboard Team
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarComponent;
