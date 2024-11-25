// File: src/views/admin/products/components/appraisal/AppraisalForm.js

import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Button,
  Progress,
  Flex,
  useToast,
  useColorModeValue,
  Text,
  Image,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  IconButton,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaCheck, FaTags, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";

// Import sub-components
import CategoryDetails from "./CategoryDetails";
import DiamondAppraisalParameters from "./DiamondAppraisalParameters";
import MetalAppraisalParameters from "./MetalAppraisalParameters";

// Dropzone for image uploads
import { useDropzone } from "react-dropzone";
import { Stepper } from "../StepperComponent";

const AppraisalForm = ({ onClose }) => {
  const toast = useToast();


  // Step definitions
  const steps = [
    { title: "Jewellery Details", description: "Jewellery Details" },
    { title: "Appraised Data", description: "Appraisal information" },
    { title: "Seller Details", description: "Seller information" },
    { title: "SEO Optimization", description: "SEO" }, // New Step
    { title: "Review & Submit", description: "Review and submit" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Revoke object URLs to avoid memory leaks
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  // Define the fields associated with each step
  const getStepFields = (step) => {
    switch (step) {
      case 1:
        return ["name", "description", "pictures", "tags", "category"];
      case 2:
        return ["categoryDetails", "diamonds", "metals"];
      case 3:
        return ["sellerName", "sellerId", "postWithoutSeller"];
      case 4:
        return [
          "metaTitle",
          "metaDescription",
          "slug",
          "metaKeywords",
          "canonicalUrl",
          "ogTitle",
          "ogDescription",
          "ogImage",
          "twitterTitle",
          "twitterDescription",
          "twitterImage",
          "schemaData",
        ]; // SEO Fields
      case 5:
        return ["price"]; // Price Field
      default:
        return [];
    }
  };

  // Define a helper function to create a Yup schema for the current step
  const getCurrentStepValidationSchema = (step) => {
    switch (step) {
      case 1:
        return Yup.object({
          name: Yup.string().required("Jewellery Name is required"),
          description: Yup.string().required("Jewellery Description is required"),
          pictures: Yup.array()
            .min(1, "At least one picture is required")
            .of(
              Yup.mixed()
                .test(
                  "fileSize",
                  "Each file should be less than 5MB",
                  (value) => value && value.size <= 5242880
                )
                .test(
                  "fileType",
                  "Unsupported File Format. Allowed formats: JPG, PNG",
                  (value) =>
                    value &&
                    ["image/jpeg", "image/png"].includes(value.type)
                )
            ),
          tags: Yup.string(), // Optional
          category: Yup.string().required("Category is required"),
        });
      case 2:
        return Yup.object({
          categoryDetails: Yup.object().required("Category details are required"),
          diamonds: Yup.array()
            .of(
              Yup.object({
                caratWeight: Yup.number()
                  .required("Carat Weight is required")
                  .min(0.1, "Must be at least 0.1 ct"),
                colorGrade: Yup.string().required("Color Grade is required"),
                clarityGrade: Yup.string().required("Clarity Grade is required"),
                cutGrade: Yup.string().required("Cut Grade is required"),
                // Add more diamond-specific fields as needed
              })
            )
            .min(1, "At least one diamond appraisal is required"),
          metals: Yup.array()
            .of(
              Yup.object({
                metalType: Yup.string().required("Metal Type is required"),
                purity: Yup.number()
                  .required("Purity is required")
                  .min(10, "Purity must be at least 10%"),
                weight: Yup.number()
                  .required("Weight is required")
                  .min(0.1, "Must be at least 0.1 grams"),
                // Add more metal-specific fields as needed
              })
            )
            .min(1, "At least one metal appraisal is required"),
        });
      case 3:
        return Yup.object({
          sellerName: Yup.string().when("postWithoutSeller", {
            is: false,
            then: (schema) => schema.required("Seller Name is required"),
          }),
          sellerId: Yup.string().when("postWithoutSeller", {
            is: false,
            then: (schema) => schema.required("Seller ID is required"),
          }),
          postWithoutSeller: Yup.boolean(),
        });
      case 4:
        return Yup.object({
          metaTitle: Yup.string()
            .max(60, "Meta Title must be at most 60 characters")
            .required("Meta Title is required"),
          metaDescription: Yup.string()
            .max(160, "Meta Description must be at most 160 characters")
            .required("Meta Description is required"),
          slug: Yup.string()
            .matches(/^[a-z0-9-]+$/, "Slug must be lowercase, alphanumeric, and hyphenated")
            .required("URL Slug is required"),
          metaKeywords: Yup.string(),
          canonicalUrl: Yup.string().url("Must be a valid URL"),
          ogTitle: Yup.string().max(60, "OG Title must be at most 60 characters"),
          ogDescription: Yup.string().max(160, "OG Description must be at most 160 characters"),
          ogImage: Yup.mixed(),
          twitterTitle: Yup.string().max(60, "Twitter Title must be at most 60 characters"),
          twitterDescription: Yup.string().max(160, "Twitter Description must be at most 160 characters"),
          twitterImage: Yup.mixed(),
          schemaData: Yup.string(),
        });
      case 5:
        return Yup.object({
          price: Yup.number()
            .typeError("Price must be a number")
            .positive("Price must be positive")
            .required("Price is required"),
        });
      default:
        return Yup.object({});
    }
  };

  // Initial form values
  const initialValues = {
    // Step 1
    name: "",
    description: "",
    pictures: [],
    tags: "",
    category: "",
    categoryDetails: {},
    // Step 2
    diamonds: [
      {
        caratWeight: "",
        colorGrade: "",
        clarityGrade: "",
        cutGrade: "",
        // Add more fields as needed
      },
    ],
    metals: [
      {
        metalType: "",
        purity: "",
        weight: "",
        // Add more fields as needed
      },
    ],
    // Step 3
    sellerName: "",
    sellerId: "",
    postWithoutSeller: false,

     // SEO Fields
  metaTitle: "",
  metaDescription: "",
  slug: "",
  metaKeywords: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: null,
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: null,
  schemaData: "",

  // Price Field
  price: "",
  };

  // Handle form submission
  const handleSubmit = async (values, actions) => {
    // Prepare form data
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("tags", values.tags);

    // Append pictures
    values.pictures.forEach((file, index) => {
      formData.append(`pictures[${index}]`, file);
    });

    // Append diamonds
    values.diamonds.forEach((diamond, index) => {
      formData.append(`diamonds[${index}][caratWeight]`, diamond.caratWeight);
      formData.append(`diamonds[${index}][colorGrade]`, diamond.colorGrade);
      formData.append(`diamonds[${index}][clarityGrade]`, diamond.clarityGrade);
      formData.append(`diamonds[${index}][cutGrade]`, diamond.cutGrade);
      // Append more diamond fields as needed
    });

    // Append metals
    values.metals.forEach((metal, index) => {
      formData.append(`metals[${index}][metalType]`, metal.metalType);
      formData.append(`metals[${index}][purity]`, metal.purity);
      formData.append(`metals[${index}][weight]`, metal.weight);
      // Append more metal fields as needed
    });

    formData.append("postWithoutSeller", values.postWithoutSeller);
    if (!values.postWithoutSeller) {
      formData.append("sellerName", values.sellerName);
      formData.append("sellerId", values.sellerId);
    }

    // Append price
    formData.append("price", values.price);

    try {
      console.log("Submitting Product Data:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      actions.setSubmitting(true);

      // Make API request (replace with your API endpoint)
      const response = await fetch("/api/products/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product.");
      }

      // Handle success
      toast({
        title: "Product Added.",
        description: "The product has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form and steps
      actions.resetForm();
      setImagePreviews([]);
      setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error("Add Product Error:", error);

      // Handle errors
      toast({
        title: "Failed to Add Product.",
        description: error.message || "An error occurred while adding the product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  // Dropzone for image uploads
  const DropzoneArea = ({ onDrop }) => {
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      acceptedFiles,
      fileRejections,
    } = useDropzone({
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
      },
      onDrop,
      multiple: true,
      maxSize: 5242880, // 5MB
    });

    return (
      <Box>
        <Flex
          {...getRootProps()}
          borderWidth="2px"
          borderRadius="md"
          borderColor={isDragActive ? "teal.500" : "gray.300"}
          borderStyle="dashed"
          p={6}
          textAlign="center"
          cursor="pointer"
          bg={isDragActive ? "teal.50" : "gray.50"}
          transition="background-color 0.2s, border-color 0.2s"
          align="center"
          justify="center"
          flexDir="column"
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt size={40} color={isDragActive ? "teal" : "gray"} />
          <Text fontSize="md" color={isDragActive ? "teal.500" : "gray.500"} mt={4}>
            {isDragActive
              ? "Drop the images here ..."
              : "Drag & drop images here, or click to select files"}
          </Text>
          <Text fontSize="sm" color="gray.400">
            (Only *.jpeg and *.png images will be accepted, up to 5MB each)
          </Text>
        </Flex>
        {/* Display errors if any */}
        <Box mt={2}>
          {fileRejections.length > 0 &&
            fileRejections.map(({ file, errors }, index) => (
              <Box key={index} color="red.500" mt={1}>
                <Text fontSize="sm">
                  {file.path} - {Math.round(file.size / 1024)} KB
                </Text>
                {errors.map((e) => (
                  <Text key={e.code} fontSize="xs">
                    {e.message}
                  </Text>
                ))}
              </Box>
            ))}
        </Box>
      </Box>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getCurrentStepValidationSchema(currentStep)}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <VStack spacing={8} align="stretch">
            {/* Replace existing stepper with the Stepper component */}
            <Stepper currentStep={currentStep} steps={steps} />
            {/* Step 1: Jewellery Details */}
            {currentStep === 1 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <HStack spacing={6}>
                  {/* Jewellery Name */}
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="name">Jewellery Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="e.g., Diamond Necklace"
                          leftIcon={<FaTags />}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Tags */}
                  <Field name="tags">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.tags && form.touched.tags}>
                        <FormLabel htmlFor="tags">Tags</FormLabel>
                        <Input
                          {...field}
                          id="tags"
                          placeholder="e.g., gold, diamond"
                          leftIcon={<FaTags />}
                        />
                        <FormErrorMessage>{form.errors.tags}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                {/* Jewellery Description */}
                <Field name="description">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.description && form.touched.description}
                      mt={4}
                    >
                      <FormLabel htmlFor="description">Jewellery Description</FormLabel>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Describe the jewellery in detail."
                      />
                      <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Category Selection */}
                <Field name="category">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.category && form.touched.category}
                      mt={4}
                    >
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Select
                        {...field}
                        id="category"
                        placeholder="Select Category"
                      >
                        <option value="Rings">Rings</option>
                        <option value="Necklaces">Necklaces</option>
                        <option value="Bracelets">Bracelets</option>
                        <option value="Earrings">Earrings</option>
                        <option value="Bangles">Bangles</option>
                        <option value="Pendants">Pendants</option>
                        <option value="Anklets">Anklets</option>
                        <option value="Brooches">Brooches</option>
                        <option value="Others">Others</option>
                      </Select>
                      <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Add Pictures */}
                <Field name="pictures">
                  {({ form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.pictures && form.touched.pictures}
                      mt={4}
                    >
                      <FormLabel htmlFor="pictures">Add Pictures</FormLabel>
                      <DropzoneArea
                        onDrop={(acceptedFiles) => {
                          // Set field value
                          form.setFieldValue("pictures", acceptedFiles);

                          // Update image previews
                          const previews = acceptedFiles.map((file) =>
                            URL.createObjectURL(file)
                          );
                          setImagePreviews(previews);
                        }}
                      />
                      <FormErrorMessage>{form.errors.pictures}</FormErrorMessage>
                      {/* Image previews */}
                      <Flex mt={4} wrap="wrap">
                        {imagePreviews.map((src, index) => (
                          <Box
                            key={index}
                            position="relative"
                            mr={2}
                            mb={2}
                          >
                            <Image
                              src={src}
                              alt={`Picture ${index + 1}`}
                              boxSize="100px"
                              objectFit="cover"
                              borderRadius="md"
                              boxShadow="sm"
                            />
                            <IconButton
                              icon={<FaTrash />}
                              colorScheme="red"
                              variant="ghost"
                              size="sm"
                              position="absolute"
                              top="0"
                              right="0"
                              onClick={() => {
                                const newFiles = [...formik.values.pictures];
                                newFiles.splice(index, 1);
                                form.setFieldValue("pictures", newFiles);

                                const newPreviews = [...imagePreviews];
                                newPreviews.splice(index, 1);
                                setImagePreviews(newPreviews);
                              }}
                              aria-label={`Remove Picture ${index + 1}`}
                            />
                          </Box>
                        ))}
                      </Flex>
                    </FormControl>
                  )}
                </Field>
              </Box>
            )}

            {/* Step 2: Appraised Data */}
            {currentStep === 2 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <CategoryDetails
                  category={formik.values.category}
                  categoryDetails={formik.values.categoryDetails}
                  handleCategoryDetailsChange={(field, value) => {
                    formik.setFieldValue(`categoryDetails.${field}`, value);
                  }}
                />
                <FieldArray name="diamonds">
                  {({ push, remove }) => (
                    <Box>
                      {formik.values.diamonds.map((diamond, index) => (
                        <DiamondAppraisalParameters
                          key={index}
                          index={index}
                          remove={remove}
                        />
                      ))}

                      {/* Add More Diamonds Button */}
                      <Button
                        onClick={() =>
                          push({
                            caratWeight: "",
                            colorGrade: "",
                            clarityGrade: "",
                            cutGrade: "",
                            // Initialize more fields as needed
                          })
                        }
                        leftIcon={<FaTags />}
                        colorScheme="teal"
                        variant="solid"
                        mt={4}
                      >
                        Add More Diamonds
                      </Button>
                    </Box>
                  )}
                </FieldArray>

                {/* FieldArray for Metals */}
                <FieldArray name="metals">
                  {({ push, remove }) => (
                    <Box mt={8}>
                      {formik.values.metals.map((metal, index) => (
                        <MetalAppraisalParameters
                          key={index}
                          index={index}
                          remove={remove}
                        />
                      ))}

                      {/* Add More Metals Button */}
                      <Button
                        onClick={() =>
                          push({
                            metalType: "",
                            purity: "",
                            weight: "",
                            // Initialize more fields as needed
                          })
                        }
                        leftIcon={<FaTags />}
                        colorScheme="teal"
                        variant="solid"
                      >
                        Add More Metals
                      </Button>
                    </Box>
                  )}
                </FieldArray>
              </Box>
            )}

            {/* Step 3: Seller Details */}
            {currentStep === 3 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <Flex direction="column" gap={4}>
                  {/* Post Without Seller */}
                  <Field name="postWithoutSeller">
                    {({ field }) => (
                      <FormControl>
                        <Checkbox
                          {...field}
                          id="postWithoutSeller"
                          isChecked={field.value}
                          onChange={() =>
                            formik.setFieldValue(
                              "postWithoutSeller",
                              !formik.values.postWithoutSeller
                            )
                          }
                        >
                          Post without a Seller
                        </Checkbox>
                      </FormControl>
                    )}
                  </Field>

                  {/* Seller Name */}
                  <Field name="sellerName">
                    {({ field, form }) => (
                      <FormControl
                        isRequired={!form.values.postWithoutSeller}
                        isInvalid={
                          form.errors.sellerName && form.touched.sellerName
                        }
                      >
                        <FormLabel htmlFor="sellerName">Seller Name</FormLabel>
                        <Input
                          {...field}
                          id="sellerName"
                          placeholder="e.g., John Doe"
                          isDisabled={formik.values.postWithoutSeller}
                        />
                        <FormErrorMessage>
                          {form.errors.sellerName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Seller ID */}
                  <Field name="sellerId">
                    {({ field, form }) => (
                      <FormControl
                        isRequired={!form.values.postWithoutSeller}
                        isInvalid={
                          form.errors.sellerId && form.touched.sellerId
                        }
                      >
                        <FormLabel htmlFor="sellerId">Seller ID</FormLabel>
                        <Input
                          {...field}
                          id="sellerId"
                          placeholder="e.g., SELL12345"
                          isDisabled={formik.values.postWithoutSeller}
                        />
                        <FormErrorMessage>
                          {form.errors.sellerId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
              </Box>
            )}

            {/* Step 4: SEO Optimization */}
            {currentStep === 4 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <VStack spacing={4} align="stretch">
                  {/* Meta Title */}
                  <Field name="metaTitle">
                    {({ field, form }) => (
                      <FormControl isRequired isInvalid={form.errors.metaTitle && form.touched.metaTitle}>
                        <FormLabel htmlFor="metaTitle">Meta Title</FormLabel>
                        <Input {...field} id="metaTitle" placeholder="Enter meta title" />
                        <FormErrorMessage>{form.errors.metaTitle}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Meta Description */}
                  <Field name="metaDescription">
                    {({ field, form }) => (
                      <FormControl isRequired isInvalid={form.errors.metaDescription && form.touched.metaDescription}>
                        <FormLabel htmlFor="metaDescription">Meta Description</FormLabel>
                        <Textarea {...field} id="metaDescription" placeholder="Enter meta description" />
                        <FormErrorMessage>{form.errors.metaDescription}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* URL Slug */}
                  <Field name="slug">
                    {({ field, form }) => (
                      <FormControl isRequired isInvalid={form.errors.slug && form.touched.slug}>
                        <FormLabel htmlFor="slug">URL Slug</FormLabel>
                        <Input {...field} id="slug" placeholder="e.g., diamond-necklace" />
                        <FormErrorMessage>{form.errors.slug}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Meta Keywords */}
                  <Field name="metaKeywords">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.metaKeywords && form.touched.metaKeywords}>
                        <FormLabel htmlFor="metaKeywords">Meta Keywords</FormLabel>
                        <Input {...field} id="metaKeywords" placeholder="e.g., gold, diamond" />
                        <FormErrorMessage>{form.errors.metaKeywords}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Canonical URL */}
                  <Field name="canonicalUrl">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.canonicalUrl && form.touched.canonicalUrl}>
                        <FormLabel htmlFor="canonicalUrl">Canonical URL</FormLabel>
                        <Input {...field} id="canonicalUrl" placeholder="https://example.com/product-page" />
                        <FormErrorMessage>{form.errors.canonicalUrl}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Open Graph Title */}
                  <Field name="ogTitle">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.ogTitle && form.touched.ogTitle}>
                        <FormLabel htmlFor="ogTitle">Open Graph Title</FormLabel>
                        <Input {...field} id="ogTitle" placeholder="Enter OG title" />
                        <FormErrorMessage>{form.errors.ogTitle}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Open Graph Description */}
                  <Field name="ogDescription">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.ogDescription && form.touched.ogDescription}>
                        <FormLabel htmlFor="ogDescription">Open Graph Description</FormLabel>
                        <Textarea {...field} id="ogDescription" placeholder="Enter OG description" />
                        <FormErrorMessage>{form.errors.ogDescription}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Open Graph Image */}
                  <Field name="ogImage">
                    {({ form }) => (
                      <FormControl isInvalid={form.errors.ogImage && form.touched.ogImage}>
                        <FormLabel htmlFor="ogImage">Open Graph Image</FormLabel>
                        <Input
                          type="file"
                          id="ogImage"
                          accept="image/jpeg, image/png"
                          onChange={(event) => {
                            form.setFieldValue("ogImage", event.currentTarget.files[0]);
                          }}
                        />
                        <FormErrorMessage>{form.errors.ogImage}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Twitter Title */}
                  <Field name="twitterTitle">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.twitterTitle && form.touched.twitterTitle}>
                        <FormLabel htmlFor="twitterTitle">Twitter Title</FormLabel>
                        <Input {...field} id="twitterTitle" placeholder="Enter Twitter title" />
                        <FormErrorMessage>{form.errors.twitterTitle}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Twitter Description */}
                  <Field name="twitterDescription">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.twitterDescription && form.touched.twitterDescription}>
                        <FormLabel htmlFor="twitterDescription">Twitter Description</FormLabel>
                        <Textarea {...field} id="twitterDescription" placeholder="Enter Twitter description" />
                        <FormErrorMessage>{form.errors.twitterDescription}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Twitter Image */}
                  <Field name="twitterImage">
                    {({ form }) => (
                      <FormControl isInvalid={form.errors.twitterImage && form.touched.twitterImage}>
                        <FormLabel htmlFor="twitterImage">Twitter Image</FormLabel>
                        <Input
                          type="file"
                          id="twitterImage"
                          accept="image/jpeg, image/png"
                          onChange={(event) => {
                            form.setFieldValue("twitterImage", event.currentTarget.files[0]);
                          }}
                        />
                        <FormErrorMessage>{form.errors.twitterImage}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Schema.org Structured Data */}
                  <Field name="schemaData">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.schemaData && form.touched.schemaData}>
                        <FormLabel htmlFor="schemaData">Schema.org Structured Data</FormLabel>
                        <Textarea {...field} id="schemaData" placeholder="Enter JSON-LD for structured data" />
                        <FormErrorMessage>{form.errors.schemaData}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
              </Box>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <VStack spacing={4} align="stretch">
                  {/* Price Input */}
                  <Field name="price">
                    {({ field, form }) => (
                      <FormControl isRequired isInvalid={form.errors.price && form.touched.price}>
                        <FormLabel htmlFor="price">Price</FormLabel>
                        <Input
                          {...field}
                          id="price"
                          placeholder="Enter price in USD"
                          type="number"
                          min="0"
                        />
                        <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  
                  {/* Existing Review Content */}
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Review Product Details
                  </Text>
                  <VStack align="stretch" spacing={4}>
                    {/* Jewellery Details */}
                    <Box>
                      <Text fontWeight="semibold">Jewellery Name:</Text>
                      <Text>{formik.values.name}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold">Description:</Text>
                      <Text>{formik.values.description}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold">Tags:</Text>
                      <Text>{formik.values.tags}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold">Category:</Text>
                      <Text>{formik.values.category}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold">Pictures:</Text>
                      <Flex mt={2} wrap="wrap">
                        {imagePreviews.map((src, index) => (
                          <Image
                            key={index}
                            src={src}
                            alt={`Picture ${index + 1}`}
                            boxSize="100px"
                            objectFit="cover"
                            mr={2}
                            mb={2}
                            borderRadius="md"
                            boxShadow="sm"
                          />
                        ))}
                      </Flex>
                    </Box>

                    {/* Diamonds Appraisal Details */}
                    <Box>
                      <Text fontWeight="semibold" mb={2}>
                        Diamonds Appraisal:
                      </Text>
                      {formik.values.diamonds.map((diamond, index) => (
                        <Box key={index} mb={2} pl={4} borderLeft="2px solid teal.400">
                          <Text fontWeight="medium">
                            Diamond {index + 1}:
                          </Text>
                          <Text>Carat Weight: {diamond.caratWeight} ct</Text>
                          <Text>Color Grade: {diamond.colorGrade}</Text>
                          <Text>Clarity Grade: {diamond.clarityGrade}</Text>
                          <Text>Cut Grade: {diamond.cutGrade}</Text>
                          {/* Add more diamond details as needed */}
                        </Box>
                      ))}
                    </Box>

                    {/* Metals Appraisal Details */}
                    <Box>
                      <Text fontWeight="semibold" mb={2}>
                        Metals Appraisal:
                      </Text>
                      {formik.values.metals.map((metal, index) => (
                        <Box key={index} mb={2} pl={4} borderLeft="2px solid teal.400">
                          <Text fontWeight="medium">
                            Metal {index + 1}:
                          </Text>
                          <Text>Metal Type: {metal.metalType}</Text>
                          <Text>Purity: {metal.purity}%</Text>
                          <Text>Weight: {metal.weight} grams</Text>
                          {/* Add more metal details as needed */}
                        </Box>
                      ))}
                    </Box>

                    {/* Seller Details */}
                    <Box>
                      <Text fontWeight="semibold">Post Without Seller:</Text>
                      <Text>
                        {formik.values.postWithoutSeller ? "Yes" : "No"}
                      </Text>
                    </Box>
                    {!formik.values.postWithoutSeller && (
                      <>
                        <Box>
                          <Text fontWeight="semibold">Seller Name:</Text>
                          <Text>{formik.values.sellerName}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="semibold">Seller ID:</Text>
                          <Text>{formik.values.sellerId}</Text>
                        </Box>
                      </>
                    )}
                    {/* Price Review */}
                    <Box>
                      <Text fontWeight="semibold">Price:</Text>
                      <Text>${formik.values.price}</Text>
                    </Box>
                  </VStack>
                </VStack>
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
                leftIcon={<FaArrowLeft />}
              >
                Back
              </Button>
            )}
            {currentStep < steps.length && (
              <Button
                onClick={() => {
                  formik.validateForm().then((errors) => {
                    const currentStepFields = getStepFields(currentStep);
                    let stepErrors = {};

                    if (currentStep === 2) {
                      // Handle nested array errors
                      currentStepFields.forEach((field) => {
                        if (errors[field]) {
                          stepErrors[field] = errors[field];
                        }
                      });
                    } else {
                      currentStepFields.forEach((field) => {
                        if (errors[field]) {
                          stepErrors[field] = errors[field];
                        }
                      });
                    }

                    const hasErrors = Object.keys(stepErrors).length > 0;

                    if (!hasErrors) {
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
                rightIcon={<FaArrowRight />}
                isDisabled={formik.isSubmitting}
              >
                Next
              </Button>
            )}
            {currentStep === steps.length && (
              <Button
                type="submit"
                colorScheme="teal"
                isLoading={formik.isSubmitting}
                isDisabled={!formik.isValid || formik.isSubmitting}
                rightIcon={<FaCheck />}
              >
                Submit
              </Button>
            )}
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

export default AppraisalForm;
