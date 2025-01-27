import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Button,
  Flex,
  useToast,
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
  Spinner,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaCheck, FaTrash } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Suppose you have a custom Stepper, Dropzone, and Dynamic field logic
import { Stepper } from "./StepperComponent";
import DropzoneArea from "./DropzoneArea";
import DynamicFieldRenderer from "./DynamicFieldRenderer";
import { LOCAL_DEFINITIONS, mergeDefinitions } from "./JewelleryTypeDefinitions";

// If you have a base URL from .env, or you can hard-code
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

/**
 * Multi-step form that collects all product details + images, then
 * sends a single multipart/form-data request to /api/admin/products.
 */
const AppraisalForm = ({ onClose }) => {
  const toast = useToast();

  // Steps for the wizard
  const steps = [
    { title: "Basic Details" },
    { title: "Jewellery Type Details" },
    { title: "Appraisal" },
    { title: "Seller Details" },
    { title: "SEO" },
    { title: "Review & Submit" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState([]);

  // For dynamic definitions
  const [allDefinitions, setAllDefinitions] = useState({});
  const [loadingDefs, setLoadingDefs] = useState(true);

  // 1) Fetch & merge definitions on mount
  useEffect(() => {
    const fetchDefinitions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/jewellery-types`);
        if (!res.ok) {
          throw new Error("Failed to fetch definitions from server");
        }
        const data = await res.json();
        const merged = mergeDefinitions(LOCAL_DEFINITIONS, data);
        setAllDefinitions(merged);
      } catch (err) {
        console.error(err);
        // fallback if error
        setAllDefinitions(LOCAL_DEFINITIONS);
        toast({
          title: "Could not load type definitions",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoadingDefs(false);
      }
    };
    fetchDefinitions();
  }, [toast]);

  // Clean up image previews on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  // ------------------- Step-based Validation -------------------
  const getStepValidationSchema = (step, values = {}) => {
    switch (step) {
      case 1:
        return Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
          pictures: Yup.array()
            .of(
              Yup.mixed()
                .test("fileSize", "File must be < 5MB", (file) => file && file.size <= 5242880)
                .test(
                  "fileType",
                  "Only JPG/PNG are accepted",
                  (file) => file && ["image/jpeg", "image/png"].includes(file.type)
                )
            )
            .min(1, "At least one image is required"),
        });
      case 2:
        return Yup.object({
          jewelleryType: Yup.string().required("Jewellery type is required"),
          ...((values.jewelleryType &&
            allDefinitions[values.jewelleryType] &&
            allDefinitions[values.jewelleryType].fields.reduce((acc, f) => {
              if (f.type === "NUMBER") {
                acc[f.name] = Yup.number().required("Required");
              } else if (f.type === "BOOLEAN") {
                acc[f.name] = Yup.boolean().required("Required");
              } else {
                acc[f.name] = Yup.string().required("Required");
              }
              return acc;
            }, {})) ||
            {}),
        });
      case 3:
        return Yup.object({
          goldWeight: Yup.number().typeError("Must be a number").min(0).required("Gold weight is required"),
          diamondWeight: Yup.number().min(0).required("Diamond weight is required"),
          goldPricePerGram: Yup.number().min(0).required("Gold price/gram is required"),
          laborPerGram: Yup.number().min(0).required("Labor per gram is required"),
          clarity: Yup.string().required("Clarity is required"),
          color: Yup.string().required("Color is required"),
          offsetLabor: Yup.boolean().required("Required"),
          providedPrice: Yup.number().nullable().min(0, "Must be >= 0").notRequired(),
        });
      case 4:
        return Yup.object({
          sellerName: Yup.string().required("Seller name is required"),
          sellerContact: Yup.string().required("Seller contact is required"),
        });
      case 5:
        return Yup.object({
          seoTitle: Yup.string().required("SEO title is required"),
          seoDescription: Yup.string().required("SEO description is required"),
          seoKeywords: Yup.string().required("SEO keywords are required"),
        });
      case 6:
      default:
        return Yup.object({});
    }
  };

  // Determine which fields we check for errors per step
  const getStepFields = (step, values = {}) => {
    switch (step) {
      case 1:
        return ["title", "description", "pictures"];
      case 2: {
        let fields = ["jewelleryType"];
        if (values.jewelleryType && allDefinitions[values.jewelleryType]) {
          fields = fields.concat(
            allDefinitions[values.jewelleryType].fields.map((f) => f.name)
          );
        }
        return fields;
      }
      case 3:
        return [
          "goldWeight",
          "diamondWeight",
          "goldPricePerGram",
          "laborPerGram",
          "clarity",
          "color",
          "offsetLabor",
          "providedPrice",
        ];
      case 4:
        return ["sellerName", "sellerContact"];
      case 5:
        return ["seoTitle", "seoDescription", "seoKeywords"];
      case 6:
        return [];
      default:
        return [];
    }
  };

  // ------------------- Initial Form Values -------------------
  const initialValues = {
    // Step 1
    title: "",
    description: "",
    pictures: [],
    // Step 2
    jewelleryType: "",
    // Step 3
    goldWeight: 15.5,
    diamondWeight: 0.0,
    goldPricePerGram: 50.0,
    laborPerGram: 5.0,
    clarity: "VVS1",
    color: "D",
    offsetLabor: true,
    providedPrice: null, // Let server calculate if not provided
    // Step 4
    sellerName: "Alice Johnson",
    sellerContact: "alice@example.com",
    // Step 5
    seoTitle: "Elegant Gold Necklace - Best Quality",
    seoDescription: "Buy the most elegant gold necklace at unbeatable prices.",
    seoKeywords: "gold, necklace, elegant, jewelry",
  };

  // ------------------- Final Submit Handler -------------------
  const handleSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);

      // 1) Construct productData object
      const productData = {
        title: values.title,
        description: values.description,
        sellerName: values.sellerName,
        sellerContact: values.sellerContact,
        seoTitle: values.seoTitle,
        seoDescription: values.seoDescription,
        seoKeywords: values.seoKeywords,
        goldWeight: parseFloat(values.goldWeight),
        diamondWeight: parseFloat(values.diamondWeight),
        goldPricePerGram: parseFloat(values.goldPricePerGram),
        laborPerGram: parseFloat(values.laborPerGram),
        clarity: values.clarity,
        color: values.color,
        offsetLabor: values.offsetLabor,
        providedPrice: values.providedPrice === "" ? null : parseFloat(values.providedPrice),
      };

      // 2) Convert productData to JSON, then into a Blob
      const productDataBlob = new Blob([JSON.stringify(productData)], {
        type: "application/json",
      });

      // 3) Prepare FormData (multipart/form-data)
      const formData = new FormData();
      // Append product data as a JSON blob
      formData.append("productData", productDataBlob);

      // Append images
      values.pictures.forEach((file) => {
        formData.append("images", file); // The field name should match your backend
      });

      // 4) Perform fetch
      const response = await fetch(`${BASE_URL}/api/product`, {
        method: "POST",
        // DO NOT set Content-Type manually
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to create product");
      }

      // Suppose the backend returns an ID as text
      const productId = await response.text();
      console.log("Product created successfully with ID:", productId);

      toast({
        title: "Product Added",
        description: `The product has been successfully created (ID: ${productId}).`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      actions.resetForm();
      setCurrentStep(1);
      setImagePreviews([]);
      onClose && onClose();
    } catch (error) {
      console.error("Error submitting the product:", error);
      toast({
        title: "Failed to Add Product",
        description: error.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (loadingDefs) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" />
        <Text ml={3}>Loading jewellery type definitions...</Text>
      </Flex>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={(values) => getStepValidationSchema(currentStep, values)}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          {/* Stepper displaying current step */}
          <Stepper steps={steps} currentStep={currentStep} />

          <VStack spacing={8} align="stretch">
            {/* STEP 1: Basic Details */}
            {currentStep === 1 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <Field name="title">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel>Product Title</FormLabel>
                      <Input {...field} placeholder="Enter product title" />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="description">
                  {({ field, form }) => (
                    <FormControl
                      mt={4}
                      isRequired
                      isInvalid={form.errors.description && form.touched.description}
                    >
                      <FormLabel>Description</FormLabel>
                      <Textarea {...field} placeholder="Enter product description" />
                      <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Images */}
                <Field name="pictures">
                  {({ form }) => (
                    <FormControl
                      mt={4}
                      isRequired
                      isInvalid={form.errors.pictures && form.touched.pictures}
                    >
                      <FormLabel>Images</FormLabel>
                      <DropzoneArea
                        onDrop={(acceptedFiles) => {
                          form.setFieldValue("pictures", acceptedFiles);
                          const previews = acceptedFiles.map((f) =>
                            URL.createObjectURL(f)
                          );
                          setImagePreviews(previews);
                        }}
                      />
                      <FormErrorMessage>{form.errors.pictures}</FormErrorMessage>

                      {/* Thumbnails */}
                      {imagePreviews.length > 0 && (
                        <Flex mt={4} wrap="wrap">
                          {imagePreviews.map((src, i) => (
                            <Box key={i} position="relative" mr={2} mb={2}>
                              <Image
                                src={src}
                                alt={`Preview ${i + 1}`}
                                boxSize="100px"
                                objectFit="cover"
                                borderRadius="md"
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
                                  newFiles.splice(i, 1);
                                  form.setFieldValue("pictures", newFiles);

                                  const newPreviews = [...imagePreviews];
                                  newPreviews.splice(i, 1);
                                  setImagePreviews(newPreviews);
                                }}
                                aria-label={`Remove Image ${i + 1}`}
                              />
                            </Box>
                          ))}
                        </Flex>
                      )}
                    </FormControl>
                  )}
                </Field>
              </Box>
            )}

            {/* STEP 2: Jewellery Type */}
            {currentStep === 2 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                {/* Jewellery Type */}
                <Field name="jewelleryType">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.jewelleryType && form.touched.jewelleryType}
                    >
                      <FormLabel>Jewellery Type</FormLabel>
                      <Select {...field} placeholder="Select type">
                        {Object.keys(allDefinitions).map((typeName) => (
                          <option key={typeName} value={typeName}>
                            {typeName}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{form.errors.jewelleryType}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Dynamic Fields */}
                <DynamicFieldRenderer
                  fields={
                    allDefinitions[formik.values.jewelleryType]
                      ? allDefinitions[formik.values.jewelleryType].fields
                      : []
                  }
                  formik={formik}
                />
              </Box>
            )}

            {/* STEP 3: Appraisal */}
            {currentStep === 3 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <HStack spacing={4} align="flex-start">
                  <Field name="goldWeight">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.goldWeight && form.touched.goldWeight}
                      >
                        <FormLabel>Gold Weight (g)</FormLabel>
                        <Input {...field} type="number" min="0" />
                        <FormErrorMessage>{form.errors.goldWeight}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="diamondWeight">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.diamondWeight && form.touched.diamondWeight}
                      >
                        <FormLabel>Diamond Weight (ct)</FormLabel>
                        <Input {...field} type="number" min="0" />
                        <FormErrorMessage>{form.errors.diamondWeight}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                <HStack spacing={4} mt={4}>
                  <Field name="goldPricePerGram">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.goldPricePerGram && form.touched.goldPricePerGram}
                      >
                        <FormLabel>Gold Price/Gram</FormLabel>
                        <Input {...field} type="number" min="0" />
                        <FormErrorMessage>{form.errors.goldPricePerGram}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="laborPerGram">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.laborPerGram && form.touched.laborPerGram}
                      >
                        <FormLabel>Labor Cost/Gram</FormLabel>
                        <Input {...field} type="number" min="0" />
                        <FormErrorMessage>{form.errors.laborPerGram}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                <HStack spacing={4} mt={4}>
                  <Field name="clarity">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.clarity && form.touched.clarity}
                      >
                        <FormLabel>Diamond Clarity</FormLabel>
                        <Select {...field} placeholder="Select Clarity">
                          <option value="IF">IF</option>
                          <option value="VVS1">VVS1</option>
                          <option value="VVS2">VVS2</option>
                          <option value="VS1">VS1</option>
                          <option value="VS2">VS2</option>
                          <option value="SI1">SI1</option>
                          <option value="SI2">SI2</option>
                          <option value="I1">I1</option>
                        </Select>
                        <FormErrorMessage>{form.errors.clarity}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="color">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.color && form.touched.color}
                      >
                        <FormLabel>Diamond Color</FormLabel>
                        <Select {...field} placeholder="Select Color">
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                          <option value="G">G</option>
                          <option value="H">H</option>
                          <option value="I">I</option>
                          <option value="J">J</option>
                          <option value="K">K</option>
                          <option value="L">L</option>
                        </Select>
                        <FormErrorMessage>{form.errors.color}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                <Field name="offsetLabor">
                  {({ field, form }) => (
                    <FormControl mt={4} isInvalid={form.errors.offsetLabor && form.touched.offsetLabor}>
                      <Checkbox
                        isChecked={field.value}
                        onChange={() => form.setFieldValue("offsetLabor", !field.value)}
                      >
                        Offset Labor (Labor cost included elsewhere)
                      </Checkbox>
                      <FormErrorMessage>{form.errors.offsetLabor}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="providedPrice">
                  {({ field, form }) => (
                    <FormControl
                      mt={4}
                      isInvalid={form.errors.providedPrice && form.touched.providedPrice}
                    >
                      <FormLabel>Provided Price (optional override)</FormLabel>
                      <Input {...field} type="number" placeholder="If given, skip calculation" />
                      <FormErrorMessage>{form.errors.providedPrice}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            )}

            {/* STEP 4: Seller */}
            {currentStep === 4 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <Field name="sellerName">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.sellerName && form.touched.sellerName}
                    >
                      <FormLabel>Seller Name</FormLabel>
                      <Input {...field} placeholder="Seller's name" />
                      <FormErrorMessage>{form.errors.sellerName}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="sellerContact">
                  {({ field, form }) => (
                    <FormControl
                      mt={4}
                      isRequired
                      isInvalid={form.errors.sellerContact && form.touched.sellerContact}
                    >
                      <FormLabel>Seller Contact</FormLabel>
                      <Input {...field} placeholder="Seller's contact info" />
                      <FormErrorMessage>{form.errors.sellerContact}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            )}

            {/* STEP 5: SEO */}
            {currentStep === 5 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <Field name="seoTitle">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.seoTitle && form.touched.seoTitle}
                    >
                      <FormLabel>SEO Title</FormLabel>
                      <Input {...field} placeholder="Short SEO-friendly title" />
                      <FormErrorMessage>{form.errors.seoTitle}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="seoDescription">
                  {({ field, form }) => (
                    <FormControl
                      mt={4}
                      isRequired
                      isInvalid={form.errors.seoDescription && form.touched.seoDescription}
                    >
                      <FormLabel>SEO Description</FormLabel>
                      <Textarea {...field} placeholder="Short SERP snippet" />
                      <FormErrorMessage>{form.errors.seoDescription}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="seoKeywords">
                  {({ field, form }) => (
                    <FormControl
                      mt={4}
                      isRequired
                      isInvalid={form.errors.seoKeywords && form.touched.seoKeywords}
                    >
                      <FormLabel>SEO Keywords</FormLabel>
                      <Input {...field} placeholder="Enter comma-separated keywords" />
                      <FormErrorMessage>{form.errors.seoKeywords}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            )}

            {/* STEP 6: Review & Submit */}
            {currentStep === 6 && (
              <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  Review & Submit
                </Text>
                <VStack align="flex-start" spacing={3}>
                  <Box>
                    <Text fontWeight="semibold">Title:</Text>
                    <Text>{formik.values.title}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">Description:</Text>
                    <Text>{formik.values.description}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">Jewellery Type:</Text>
                    <Text>{formik.values.jewelleryType}</Text>
                  </Box>
                  {/* ... etc. You can display more fields as desired */}
                </VStack>
              </Box>
            )}
          </VStack>

          {/* Navigation Buttons */}
          <HStack mt={8} justify="space-between">
            {currentStep > 1 && (
              <Button
                variant="outline"
                colorScheme="teal"
                leftIcon={<FaArrowLeft />}
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            )}

            {currentStep < steps.length && (
              <Button
                colorScheme="teal"
                rightIcon={<FaArrowRight />}
                onClick={() => {
                  formik.validateForm().then((errors) => {
                    const stepFields = getStepFields(currentStep, formik.values);
                    const stepErrors = {};
                    stepFields.forEach((field) => {
                      if (errors[field]) {
                        stepErrors[field] = errors[field];
                      }
                    });

                    if (!Object.keys(stepErrors).length) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      // Mark step's fields as touched
                      const touchedObj = {};
                      stepFields.forEach((f) => (touchedObj[f] = true));
                      formik.setTouched(touchedObj, true);

                      toast({
                        title: "Form Incomplete",
                        description: "Please fill out all required fields.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  });
                }}
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

/** 
 * Helper to format a camelCase field name into a more readable label, e.g. "ringSize" => "Ring Size".
 * (Used by your DynamicFieldRenderer, if needed)
 */
function formatFieldLabel(fieldName) {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export default AppraisalForm;
