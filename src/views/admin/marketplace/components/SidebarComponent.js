// File: src/views/admin/marketplace/components/SidebarComponent.js

import React, { useState } from "react";
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
  Box,
  Text,
  useColorModeValue,
  FormErrorMessage,
  SimpleGrid,
  Icon,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import { Stepper } from "./StepperComponents"; // Ensure the path is correct
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaIdCard,
  FaFileAlt,
  FaInfoCircle,
} from "react-icons/fa";

const SidebarComponent = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const toast = useToast();

  // Define steps with titles and descriptions (Removed Step 4)
  const stepsData = [
    { title: "Basic Information", description: "Contact details" },
    { title: "Proprietor Details", description: "Business details" },
    { title: "Document Upload", description: "Verification documents" },
    // Step 4 is removed
    // { title: "Verification", description: "Declaration" },
  ];

  // Define the fields associated with each step
  const getStepFields = (step) => {
    switch (step) {
      case 1:
        return ["firmName", "email", "phoneNumber", "address"];
      case 2:
        return ["proprietorName", "locationOfOperation", "panNumber"];
      case 3:
        return [
          "companyPanImage",
          "ownerPanImage",
          "aadharCardImage",
          "gumastaImage",
          "gstCertificateImage",
        ];
      // Step 4 fields are commented out
      // case 4:
      //   return ["otp", "declaration"];
      default:
        return [];
    }
  };

  // Define a helper function to create a Yup schema for the current step
  const getCurrentStepValidationSchema = (step) => {
    switch (step) {
      case 1:
        return Yup.object({
          firmName: Yup.string().required("Firm Name is required"),
          email: Yup.string()
            .email("Please enter a valid email address.")
            .required("Contact Email is required."),
          phoneNumber: Yup.string()
            .matches(
              /^\+91\d{10}$/,
              "Phone number must be in the format +91 followed by 10 digits, e.g., +919876543210"
            )
            .required("Phone Number is required."),
          address: Yup.string().required("Business Address is required."),
        });
      case 2:
        return Yup.object({
          proprietorName: Yup.string().required("Proprietor's Name is required."),
          locationOfOperation: Yup.string().required(
            "Location of Operation is required."
          ),
          panNumber: Yup.string()
            .matches(
              /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              "Please enter a valid PAN Number, e.g., ABCDE1234F."
            )
            .required("PAN Number is required."),
        });
      case 3:
        return Yup.object({
          companyPanImage: Yup.mixed()
            .required("Company PAN Image is required.")
            .test(
              "fileSize",
              "File too large, should be less than 5MB.",
              (value) => value && value.size <= 5242880
            )
            .test(
              "fileType",
              "Unsupported File Format. Allowed formats: JPG, PNG, PDF.",
              (value) =>
                value &&
                ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
            ),
          ownerPanImage: Yup.mixed()
            .required("Owner PAN Image is required.")
            .test(
              "fileSize",
              "File too large, should be less than 5MB.",
              (value) => value && value.size <= 5242880
            )
            .test(
              "fileType",
              "Unsupported File Format. Allowed formats: JPG, PNG, PDF.",
              (value) =>
                value &&
                ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
            ),
          aadharCardImage: Yup.mixed()
            .required("Aadhaar Card Image is required.")
            .test(
              "fileSize",
              "File too large, should be less than 5MB.",
              (value) => value && value.size <= 5242880
            )
            .test(
              "fileType",
              "Unsupported File Format. Allowed formats: JPG, PNG, PDF.",
              (value) =>
                value &&
                ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
            ),
          gumastaImage: Yup.mixed()
            .required("Gumasta Image is required.")
            .test(
              "fileSize",
              "File too large, should be less than 5MB.",
              (value) => value && value.size <= 5242880
            )
            .test(
              "fileType",
              "Unsupported File Format. Allowed formats: JPG, PNG, PDF.",
              (value) =>
                value &&
                ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
            ),
          gstCertificateImage: Yup.mixed()
            .required("GST Certificate Image is required.")
            .test(
              "fileSize",
              "File too large, should be less than 5MB.",
              (value) => value && value.size <= 5242880
            )
            .test(
              "fileType",
              "Unsupported File Format. Allowed formats: JPG, PNG, PDF.",
              (value) =>
                value &&
                ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
            ),
        });
      // Validation schema for Step 4 is commented out
      // case 4:
      //   return Yup.object({
      //     otp: Yup.string()
      //       .matches(/^\d{6}$/, "OTP must be exactly 6 digits.")
      //       .required("OTP is required."),
      //     declaration: Yup.boolean()
      //       .oneOf([true], "You must accept the declaration.")
      //       .required("Declaration must be accepted."),
      //   });
      default:
        return Yup.object({});
    }
  };

  // Initial form values
  const initialValues = {
    // Step 1
    firmName: "",
    email: "",
    phoneNumber: "",
    address: "",
    // Step 2
    proprietorName: "",
    locationOfOperation: "",
    panNumber: "",
    // Step 3
    companyPanImage: null,
    ownerPanImage: null,
    aadharCardImage: null,
    gumastaImage: null,
    gstCertificateImage: null,
    // Step 4 fields are commented out
    // otp: "",
    // declaration: false,
  };

  // Handle form submission
  const handleSubmit = async (values, actions) => {
    // Extract all form data
    const formData = new FormData();

    // Append text fields
    formData.append("firmName", values.firmName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("address", values.address);
    formData.append("proprietorName", values.proprietorName);
    formData.append("locationOfOperation", values.locationOfOperation);
    formData.append("panNumber", values.panNumber);

    // Append file fields
    formData.append("companyPanImage", values.companyPanImage);
    formData.append("ownerPanImage", values.ownerPanImage);
    formData.append("aadharCardImage", values.aadharCardImage);
    formData.append("gumastaImage", values.gumastaImage);
    formData.append("gstCertificateImage", values.gstCertificateImage);

    try {
      // Log form data
      console.log("Submitting Form Data:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
  
      actions.setSubmitting(true);
  
      // Make API request using relative path
      const response = await fetch("https://cb80-2409-40c4-2021-c703-5050-35ab-1aa9-b4e8.ngrok-free.app/api/vendors/register", {
        method: "POST",
        body: formData,
      });
  
      // Log response status
      console.log("Response Status:", response.status);
  
      let result;
      let errorMessage = "Registration failed.";
  
      // Attempt to parse the response as JSON
      try {
        result = await response.json();
        console.log("Parsed JSON Response:", result);
      } catch (parseError) {
        // If parsing fails, try to read the response as text
        const text = await response.text();
        console.error("Error Parsing JSON:", parseError);
        console.log("Response Text:", text);
        errorMessage = text || errorMessage;
      }
  
      if (!response.ok) {
        // Throw an error with the message
        throw new Error(result?.message || errorMessage);
      }
  
      // Handle success response
      toast({
        title: "Seller Registered.",
        description: "The seller has been successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      // Reset form and steps
      actions.resetForm();
      setCurrentStep(1);
      onClose();
    } catch (error) {
      // Log the error
      console.error("Registration Error:", error);
  
      // Handle errors
      toast({
        title: "Registration Failed.",
        description: error.message || "An error occurred during registration.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      // Reset loading state
      actions.setSubmitting(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent bg={useColorModeValue("white", "gray.800")}>
        {/* Enhanced Close Button */}
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
          Register New Seller
        </DrawerHeader>

        <DrawerBody>
          {/* Enhanced Stepper */}
          <Box mb={6}>
            <Stepper currentStep={currentStep} steps={stepsData} />
          </Box>

          {/* Formik Form */}
          <Formik
            // Removed key={currentStep} to preserve Formik state across steps
            initialValues={initialValues}
            validationSchema={getCurrentStepValidationSchema(currentStep)}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <VStack spacing={8} align="stretch">
                  {currentStep === 1 && (
                    <Box
                      p={6}
                      borderWidth="1px"
                      borderRadius="lg"
                      
                      // bg={useColorModeValue("gray.50", "gray.700")}
                    >
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {/* Firm Name */}
                        <Field name="firmName">
                          {({ field, form }) => (
                            <FormControl
                              isRequired
                              isInvalid={form.errors.firmName && form.touched.firmName}
                            >
                              <FormLabel htmlFor="firmName">Firm Name</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaUser color="gray.300" />}
                                />
                                <Input
                                  {...field}
                                  id="firmName"
                                  placeholder="e.g., Ramesh's Electronics"
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.firmName}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* Contact Email */}
                        <Field name="email">
                          {({ field, form }) => (
                            <FormControl
                              isRequired
                              isInvalid={form.errors.email && form.touched.email}
                            >
                              <FormLabel htmlFor="email">Contact Email</FormLabel>
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
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* Phone Number */}
                        <Field name="phoneNumber">
                          {({ field, form }) => (
                            <FormControl
                              isRequired
                              isInvalid={form.errors.phoneNumber && form.touched.phoneNumber}
                            >
                              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaPhone color="gray.300" />}
                                />
                                <Input
                                  {...field}
                                  id="phoneNumber"
                                  type="tel"
                                  placeholder="e.g., +919876543210"
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* Business Address */}
                        <Field name="address">
                          {({ field, form }) => (
                            <FormControl
                              isRequired
                              isInvalid={form.errors.address && form.touched.address}
                              gridColumn={{ base: "1 / -1", md: "span 2" }}
                            >
                              <FormLabel htmlFor="address">Business Address</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaMapMarkerAlt color="gray.300" />}
                                />
                                <Input
                                  {...field}
                                  id="address"
                                  placeholder="e.g., 123 MG Road, Bangalore"
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </SimpleGrid>
                    </Box>
                  )}

                  {currentStep === 2 && (
                    <Box
                      p={6}
                      borderWidth="1px"
                      borderRadius="lg"
                      // bg={useColorModeValue("gray.50", "gray.700")}
                    >
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {/* Proprietor's Name */}
                        <Field name="proprietorName">
                          {({ field, form }) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.proprietorName && form.touched.proprietorName
                              }
                            >
                              <FormLabel htmlFor="proprietorName">
                                Proprietor/Director/Partner Name
                              </FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaUser color="gray.300" />}
                                />
                                <Input
                                  {...field}
                                  id="proprietorName"
                                  placeholder="e.g., Sunita Sharma"
                                />
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.proprietorName}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* Location of Operation */}
                        <Field name="locationOfOperation">
                          {({ field, form }) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.locationOfOperation &&
                                form.touched.locationOfOperation
                              }
                            >
                              <FormLabel htmlFor="locationOfOperation">
                                Location of Operation
                              </FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaMapMarkerAlt color="gray.300" />}
                                />
                                <Input
                                  {...field}
                                  id="locationOfOperation"
                                  placeholder="e.g., Mumbai"
                                />
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.locationOfOperation}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* PAN Number */}
                        <Field name="panNumber">
                          {({ field, form }) => (
                            <FormControl
                              isRequired
                              isInvalid={form.errors.panNumber && form.touched.panNumber}
                            >
                              <FormLabel htmlFor="panNumber">
                                PAN Number
                                <Tooltip
                                  label="Permanent Account Number issued by the Income Tax Department"
                                  aria-label="PAN Info"
                                >
                                  <Icon as={FaInfoCircle} ml={1} color="gray.500" />
                                </Tooltip>
                              </FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaIdCard color="gray.300" />}
                                />
                                <Input
                                  {...field}
                                  id="panNumber"
                                  placeholder="e.g., ABCDE1234F"
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.panNumber}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </SimpleGrid>
                    </Box>
                  )}

                  {currentStep === 3 && (
                    <Box
                      p={6}
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="md"
                      // bg={useColorModeValue("gray.50", "gray.700")}
                    >
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {/* Company PAN Image */}
                        <Field name="companyPanImage">
                          {({ form }) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.companyPanImage && form.touched.companyPanImage
                              }
                            >
                              <FormLabel htmlFor="companyPanImage">Company PAN Image</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaFileAlt color="gray.300" />}
                                />
                                <Input
                                  id="companyPanImage"
                                  type="file"
                                  name="companyPanImage"
                                  accept="image/*,application/pdf"
                                  onChange={(event) => {
                                    form.setFieldValue(
                                      "companyPanImage",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.companyPanImage}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* Owner PAN Image */}
                        <Field name="ownerPanImage">
                          {({ form }) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.ownerPanImage && form.touched.ownerPanImage
                              }
                            >
                              <FormLabel htmlFor="ownerPanImage">Owner PAN Image</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaFileAlt color="gray.300" />}
                                />
                                <Input
                                  id="ownerPanImage"
                                  type="file"
                                  name="ownerPanImage"
                                  accept="image/*,application/pdf"
                                  onChange={(event) => {
                                    form.setFieldValue(
                                      "ownerPanImage",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.ownerPanImage}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* Aadhaar Card Image */}
                        <Field name="aadharCardImage">
                          {({ form }) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.aadharCardImage && form.touched.aadharCardImage
                              }
                            >
                              <FormLabel htmlFor="aadharCardImage">Aadhaar Card Image</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaFileAlt color="gray.300" />}
                                />
                                <Input
                                  id="aadharCardImage"
                                  type="file"
                                  name="aadharCardImage"
                                  accept="image/*,application/pdf"
                                  onChange={(event) => {
                                    form.setFieldValue(
                                      "aadharCardImage",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.aadharCardImage}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* Gumasta Image */}
                        <Field name="gumastaImage">
                          {({ form }) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.gumastaImage && form.touched.gumastaImage
                              }
                            >
                              <FormLabel htmlFor="gumastaImage">Gumasta Image</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaFileAlt color="gray.300" />}
                                />
                                <Input
                                  id="gumastaImage"
                                  type="file"
                                  name="gumastaImage"
                                  accept="image/*,application/pdf"
                                  onChange={(event) => {
                                    form.setFieldValue(
                                      "gumastaImage",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                              </InputGroup>
                              <FormErrorMessage>{form.errors.gumastaImage}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        {/* GST Certificate Image */}
                        <Field name="gstCertificateImage">
                          {({ form }) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.gstCertificateImage &&
                                form.touched.gstCertificateImage
                              }
                            >
                              <FormLabel htmlFor="gstCertificateImage">GST Certificate Image</FormLabel>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  children={<FaFileAlt color="gray.300" />}
                                />
                                <Input
                                  id="gstCertificateImage"
                                  type="file"
                                  name="gstCertificateImage"
                                  accept="image/*,application/pdf"
                                  onChange={(event) => {
                                    form.setFieldValue(
                                      "gstCertificateImage",
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.gstCertificateImage}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </SimpleGrid>
                    </Box>
                  )}
                </VStack>

                {/* Navigation Buttons */}
                <HStack mt={8} justify="space-between">
                  {currentStep > 1 && (
                    <Button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      variant="outline"
                      colorScheme="teal"
                      leftIcon={<Icon as={FaArrowLeft} />}
                    >
                      Back
                    </Button>
                  )}
                  {currentStep < stepsData.length && (
                    <Button
                      onClick={() => {
                        formik.validateForm().then((errors) => {
                          const currentStepFields = getStepFields(currentStep);
                          const stepErrors = currentStepFields.some(
                            (field) => errors[field]
                          );

                          if (!stepErrors) {
                            setCurrentStep(currentStep + 1);
                          } else {
                            // Mark all fields in the current step as touched to display errors
                            formik.setTouched(
                              currentStepFields.reduce((acc, field) => {
                                acc[field] = true;
                                return acc;
                              }, {}),
                              true
                            );
                            toast({
                              title: "Form Incomplete.",
                              description: "Please fill out all required fields.",
                              status: "error",
                              duration: 3000,
                              isClosable: true,
                            });
                          }
                        });
                      }}
                      colorScheme="teal"
                      rightIcon={<Icon as={FaArrowRight} />}
                      isDisabled={formik.isSubmitting}
                    >
                      Next
                    </Button>
                  )}
                  {currentStep === stepsData.length && (
                    <Button
                      type="submit"
                      colorScheme="teal"
                      isLoading={formik.isSubmitting}
                      isDisabled={!formik.isValid || formik.isSubmitting}
                      rightIcon={<Icon as={FaCheck} />}
                    >
                      Submit
                    </Button>
                  )}
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
