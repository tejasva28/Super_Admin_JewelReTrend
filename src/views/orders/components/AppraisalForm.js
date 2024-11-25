// File: src/views/jobs/components/AppraisalForm.js

import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Progress,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  RadioGroup,
  Radio,
  HStack,
  IconButton,
  Image,
  useToast,
  Textarea,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  Checkbox,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUpload,
  FaSignature,
  FaCheck,
} from 'react-icons/fa';
import FormStepper from './FormStepper';
import CategoryDetails from './category/CategoryDetails';

export default function AppraisalForm({ job, updateJobStatus, navigate }) {
  const toast = useToast();

  const steps = [
    {
      title: 'Location & Shop Verification',
      description: 'Step 1: Verify Location and Shop',
    },
    {
      title: "Seller's Info Verification",
      description: 'Step 2: Verify Seller Information',
    },
    {
      title: 'Jewelry Appraisal Details',
      description: 'Step 3: Provide Appraisal Details',
    },
    {
      title: 'Confirmation & Submission',
      description: 'Step 4: Confirm and Submit',
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    // Location and Shop Verification
    locationAccess: false,
    shopImages: {
      front: null,
      interior: null,
    },
    // Seller's Information Verification
    sellerDetailsVerification: {
      name: { correct: 'Yes', correctName: '' },
      shopName: { correct: 'Yes', correctShopName: '' },
      shopAddress: { correct: 'Yes', correctAddress: '' },
      registrationNumber: { correct: 'Yes', correctRegistrationNumber: '' },
      registrationDocument: null,
    },
    // Jewelry Appraisal Details
    jewelryDetails: {
      jewelryId: '',
      category: '',
      categoryDetails: {},
      metalDetails: {
        metalType: '',
        metalPurity: '',
        hallmarkPresent: 'No',
        hallmarkImage: null,
        purityTestPerformed: 'No',
        testMethod: '',
        purityPercentage: '',
      },
      gemstoneDetails: [
        {
          stoneType: '',
          caratWeight: '',
          cutQuality: '',
          colorGrade: '',
          clarityGrade: '',
          shape: '',
          fluorescence: '',
          certification: 'No',
          certificateAuthority: '',
          certificateNumber: '',
          certificateCopy: null,
        },
      ],
      totalCaratWeight: '',
      numberOfStones: '',
      settingCraftsmanship: {
        settingType: '',
        craftsmanshipQuality: '',
        defectsOrWear: 'No',
        defectsDescription: '',
        defectsImages: [],
      },
      conditionAuthenticity: {
        overallCondition: '',
        authenticityVerified: 'Yes',
        authenticityDetails: '',
        previousRepairs: 'No',
        repairsDescription: '',
      },
      additionalDetails: {
        totalWeight: '',
        age: '',
        brandDesigner: '',
        antiqueVintage: 'No',
        historicalDetails: '',
      },
      valuation: {
        marketValue: '',
        resaleValue: '',
        appraiserRemarks: '',
      },
    },
    // Photos and Media
    jewelryImages: [],
    jewelryVideo: null,
    // Appraiser's Confirmation
    appraiserName: '',
    appraiserSignature: null,
    appraisalDate: '',
  });

  const stepsCount = steps.length;

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => Math.min(prev + 1, stepsCount - 1));
    }
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFormSubmit = async () => {
    try {
      // Send formData to backend API
      const response = await fetch('https://your-backend-api.com/api/appraisals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication headers if needed
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        updateJobStatus(job.jobId, 'Completed');

        toast({
          title: 'Appraisal Completed.',
          description: 'All details have been submitted successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/jobs-completed');
      } else {
        const errorData = await response.json();
        toast({
          title: 'Submission Failed.',
          description: errorData.message || 'An error occurred.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Submission Failed.',
        description: error.message || 'An error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Function to handle file uploads
  const handleFileChange = (e, field, subfield = null, subsubfield = null) => {
    const files = e.target.files;
    if (files.length > 0) {
      if (subfield && subsubfield) {
        const fileURL = URL.createObjectURL(files[0]);
        setFormData((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            [subfield]: {
              ...prev[field][subfield],
              [subsubfield]: fileURL,
            },
          },
        }));
      } else if (subfield) {
        const fileURL = URL.createObjectURL(files[0]);
        setFormData((prev) => ({
          ...prev,
          [field]: {
            ...prev[field],
            [subfield]: fileURL,
          },
        }));
      } else {
        if (field === 'jewelryImages' || field === 'defectsImages') {
          const fileURLs = Array.from(files).map((file) =>
            URL.createObjectURL(file)
          );
          setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ...fileURLs],
          }));
        } else {
          const fileURL = URL.createObjectURL(files[0]);
          setFormData((prev) => ({
            ...prev,
            [field]: fileURL,
          }));
        }
      }
    }
  };

  // Function to handle nested state changes
  const handleNestedChange = (e, section, field, subfield = null) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: subfield
          ? {
              ...prev[section][field],
              [subfield]: value,
            }
          : value,
      },
    }));
  };

  // Function to handle changes in category details
  const handleCategoryDetailsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      jewelryDetails: {
        ...prev.jewelryDetails,
        categoryDetails: {
          ...prev.jewelryDetails.categoryDetails,
          [field]: value,
        },
      },
    }));
  };

  // Function to handle gemstone details array
  const handleGemstoneChange = (index, field, value) => {
    const newGemstones = [...formData.jewelryDetails.gemstoneDetails];
    newGemstones[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      jewelryDetails: {
        ...prev.jewelryDetails,
        gemstoneDetails: newGemstones,
      },
    }));
  };

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
    if (activeStep === 0) {
      // Validate Step 1
      if (!formData.locationAccess) {
        newErrors.locationAccess = 'Location access is required.';
      }
      if (!formData.shopImages.front) {
        newErrors.shopFront = 'Shop front image is required.';
      }
      if (!formData.shopImages.interior) {
        newErrors.shopInterior = 'Shop interior image is required.';
      }
    } else if (activeStep === 1) {
      // Validate Step 2
      if (!formData.sellerDetailsVerification.registrationDocument) {
        newErrors.registrationDocument = 'Registration document is required.';
      }
    } else if (activeStep === 2) {
      // Validate Step 3
      if (!formData.jewelryDetails.jewelryId) {
        newErrors.jewelryId = 'Jewelry ID is required.';
      }
      if (!formData.jewelryDetails.category) {
        newErrors.category = 'Category is required.';
      }
      // Add more validations as needed
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const reviewBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      p="6"
      borderRadius="md"
      shadow="md"
      borderWidth="1px"
      borderColor={borderColor}
    >
      {/* Stepper */}
      <FormStepper steps={steps} activeStep={activeStep} />

      {/* Step Content */}
      <VStack align="start" spacing="6" w="100%">
        {/* Step 1: Location & Shop Verification */}
        {activeStep === 0 && (
          <>
            <Text fontWeight="600" fontSize="lg">
              Step 1: Location & Shop Verification
            </Text>
            {/* Location Access */}
            <FormControl isInvalid={errors.locationAccess}>
              <FormLabel>
                Please allow location access to verify your current location.
              </FormLabel>
              <Button
                colorScheme={formData.locationAccess ? 'green' : 'blue'}
                leftIcon={<FaMapMarkerAlt />}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    locationAccess: !prev.locationAccess,
                  }))
                }
                aria-label={
                  formData.locationAccess
                    ? 'Deny Location Access'
                    : 'Allow Location Access'
                }
              >
                {formData.locationAccess ? 'Access Granted' : 'Allow Access'}
              </Button>
              <FormErrorMessage>{errors.locationAccess}</FormErrorMessage>
            </FormControl>

            {/* Shop Front Image */}
            <FormControl isInvalid={errors.shopFront}>
              <FormLabel>
                Please upload a clear photo of the front of the shop, including the
                shop's signage.
              </FormLabel>
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                p="4"
                textAlign="center"
                bg={reviewBg}
              >
                {formData.shopImages.front ? (
                  <Image
                    src={formData.shopImages.front}
                    alt="Shop Front"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="md"
                    mx="auto"
                  />
                ) : (
                  <IconButton
                    icon={<FaUpload />}
                    onClick={() => document.getElementById('shopFront').click()}
                    aria-label="Upload Shop Front"
                    variant="outline"
                  />
                )}
                <Input
                  type="file"
                  id="shopFront"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleFileChange(e, 'shopImages', 'front')}
                />
              </Box>
              <FormErrorMessage>{errors.shopFront}</FormErrorMessage>
            </FormControl>

            {/* Shop Interior Image */}
            <FormControl isInvalid={errors.shopInterior}>
              <FormLabel>
                Please upload a clear photo of the inside of the shop.
              </FormLabel>
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                p="4"
                textAlign="center"
                bg={reviewBg}
              >
                {formData.shopImages.interior ? (
                  <Image
                    src={formData.shopImages.interior}
                    alt="Shop Interior"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="md"
                    mx="auto"
                  />
                ) : (
                  <IconButton
                    icon={<FaUpload />}
                    onClick={() => document.getElementById('shopInterior').click()}
                    aria-label="Upload Shop Interior"
                    variant="outline"
                  />
                )}
                <Input
                  type="file"
                  id="shopInterior"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleFileChange(e, 'shopImages', 'interior')}
                />
              </Box>
              <FormErrorMessage>{errors.shopInterior}</FormErrorMessage>
            </FormControl>
          </>
        )}

        {/* Step 2: Seller's Information Verification */}
        {activeStep === 1 && (
          <>
            <Text fontWeight="600" fontSize="lg">
              Step 2: Seller's Information Verification
            </Text>
            <Text>Please verify the accuracy of the seller's provided details.</Text>

            {/* Seller's Name Verification */}
            <FormControl>
              <FormLabel>Is the seller's name correct?</FormLabel>
              <RadioGroup
                value={formData.sellerDetailsVerification.name.correct}
                onChange={(value) =>
                  handleNestedChange(
                    { target: { value } },
                    'sellerDetailsVerification',
                    'name',
                    'correct'
                  )
                }
              >
                <HStack spacing="24px">
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </HStack>
              </RadioGroup>
              {formData.sellerDetailsVerification.name.correct === 'No' && (
                <Input
                  mt="2"
                  placeholder="Provide the correct name"
                  value={formData.sellerDetailsVerification.name.correctName}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'sellerDetailsVerification',
                      'name',
                      'correctName'
                    )
                  }
                />
              )}
            </FormControl>

            {/* Repeat similar blocks for shopName, shopAddress, registrationNumber */}
            {/* For brevity, only the seller's name verification is shown here. You should implement similar sections for the other details. */}

            {/* Upload Supporting Document */}
            <FormControl isInvalid={errors.registrationDocument}>
              <FormLabel>
                Please upload a photo or scan of the registration document.
              </FormLabel>
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                p="4"
                textAlign="center"
                bg={reviewBg}
              >
                {formData.sellerDetailsVerification.registrationDocument ? (
                  <Image
                    src={formData.sellerDetailsVerification.registrationDocument}
                    alt="Registration Document"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="md"
                    mx="auto"
                  />
                ) : (
                  <IconButton
                    icon={<FaUpload />}
                    onClick={() =>
                      document.getElementById('registrationDocument').click()
                    }
                    aria-label="Upload Registration Document"
                    variant="outline"
                  />
                )}
                <Input
                  type="file"
                  id="registrationDocument"
                  accept="image/*,application/pdf"
                  hidden
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      'sellerDetailsVerification',
                      'registrationDocument'
                    )
                  }
                />
              </Box>
              <FormErrorMessage>{errors.registrationDocument}</FormErrorMessage>
            </FormControl>
          </>
        )}

        {/* Step 3: Jewelry Appraisal Details */}
        {activeStep === 2 && (
          <>
            <Text fontWeight="600" fontSize="lg">
              Step 3: Jewelry Appraisal Details
            </Text>

            {/* Jewelry Identification */}
            <FormControl isInvalid={errors.jewelryId}>
              <FormLabel>Jewelry ID/Code</FormLabel>
              <Input
                placeholder="Enter Jewelry ID"
                value={formData.jewelryDetails.jewelryId}
                onChange={(e) =>
                  handleNestedChange(e, 'jewelryDetails', 'jewelryId')
                }
              />
              <FormErrorMessage>{errors.jewelryId}</FormErrorMessage>
            </FormControl>

            {/* Category Selection */}
            <FormControl isInvalid={errors.category}>
              <FormLabel>Jewelry Category</FormLabel>
              <Select
                placeholder="Select Category"
                value={formData.jewelryDetails.category}
                onChange={(e) =>
                  handleNestedChange(e, 'jewelryDetails', 'category')
                }
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
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            </FormControl>

            {/* Category-Specific Details */}
            {formData.jewelryDetails.category && (
              <Box w="100%" borderWidth="1px" p="4" borderRadius="md">
                <Text fontWeight="600" mb="2">
                  {formData.jewelryDetails.category} Details
                </Text>
                <CategoryDetails
                  category={formData.jewelryDetails.category}
                  categoryDetails={formData.jewelryDetails.categoryDetails}
                  handleCategoryDetailsChange={handleCategoryDetailsChange}
                />
              </Box>
            )}

            {/* Metal Details */}
            <Box w="100%" borderWidth="1px" p="4" borderRadius="md" mt="4">
              <Text fontWeight="600" mb="2">
                Metal Details
              </Text>
              {/* Metal Type */}
              <FormControl>
                <FormLabel>Metal Type</FormLabel>
                <Select
                  placeholder="Select Metal Type"
                  value={formData.jewelryDetails.metalDetails.metalType}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'metalDetails',
                      'metalType'
                    )
                  }
                >
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Silver">Silver</option>
                  <option value="Palladium">Palladium</option>
                </Select>
              </FormControl>
              {/* Metal Purity */}
              <FormControl>
                <FormLabel>Metal Purity</FormLabel>
                <Input
                  placeholder="e.g., 24K, 22K, 18K"
                  value={formData.jewelryDetails.metalDetails.metalPurity}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'metalDetails',
                      'metalPurity'
                    )
                  }
                />
              </FormControl>
              {/* Hallmark Presence */}
              <FormControl>
                <FormLabel>Is there a hallmark/stamp?</FormLabel>
                <RadioGroup
                  value={
                    formData.jewelryDetails.metalDetails.hallmarkPresent || 'No'
                  }
                  onChange={(value) =>
                    handleNestedChange(
                      { target: { value } },
                      'jewelryDetails',
                      'metalDetails',
                      'hallmarkPresent'
                    )
                  }
                >
                  <HStack spacing="24px">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </HStack>
                </RadioGroup>
                {formData.jewelryDetails.metalDetails.hallmarkPresent ===
                  'Yes' && (
                  <FormControl mt="2">
                    <FormLabel>Upload Photo of Hallmark</FormLabel>
                    <Box
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      p="4"
                      textAlign="center"
                      bg={reviewBg}
                    >
                      {formData.jewelryDetails.metalDetails.hallmarkImage ? (
                        <Image
                          src={formData.jewelryDetails.metalDetails.hallmarkImage}
                          alt="Hallmark"
                          boxSize="150px"
                          objectFit="cover"
                          borderRadius="md"
                          mx="auto"
                        />
                      ) : (
                        <IconButton
                          icon={<FaUpload />}
                          onClick={() =>
                            document.getElementById('hallmarkImage').click()
                          }
                          aria-label="Upload Hallmark Image"
                          variant="outline"
                        />
                      )}
                      <Input
                        type="file"
                        id="hallmarkImage"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          handleFileChange(
                            e,
                            'jewelryDetails',
                            'metalDetails',
                            'hallmarkImage'
                          )
                        }
                      />
                    </Box>
                  </FormControl>
                )}
              </FormControl>
              {/* Metal Testing Results */}
              <FormControl>
                <FormLabel>Purity Test Performed</FormLabel>
                <RadioGroup
                  value={
                    formData.jewelryDetails.metalDetails.purityTestPerformed ||
                    'No'
                  }
                  onChange={(value) =>
                    handleNestedChange(
                      { target: { value } },
                      'jewelryDetails',
                      'metalDetails',
                      'purityTestPerformed'
                    )
                  }
                >
                  <HStack spacing="24px">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </HStack>
                </RadioGroup>
                {formData.jewelryDetails.metalDetails.purityTestPerformed ===
                  'Yes' && (
                  <>
                    <FormControl mt="2">
                      <FormLabel>Test Method</FormLabel>
                      <Input
                        placeholder="e.g., Acid Test, XRF Analysis"
                        value={
                          formData.jewelryDetails.metalDetails.testMethod || ''
                        }
                        onChange={(e) =>
                          handleNestedChange(
                            e,
                            'jewelryDetails',
                            'metalDetails',
                            'testMethod'
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Purity Percentage</FormLabel>
                      <Input
                        placeholder="e.g., 99.9%"
                        value={
                          formData.jewelryDetails.metalDetails.purityPercentage ||
                          ''
                        }
                        onChange={(e) =>
                          handleNestedChange(
                            e,
                            'jewelryDetails',
                            'metalDetails',
                            'purityPercentage'
                          )
                        }
                      />
                    </FormControl>
                  </>
                )}
              </FormControl>
            </Box>

            {/* Gemstone Details */}
            <Box w="100%" borderWidth="1px" p="4" borderRadius="md" mt="4">
              <Text fontWeight="600" mb="2">
                Diamond and Gemstone Details
              </Text>
              <FormControl>
                <FormLabel>Total Carat Weight</FormLabel>
                <Input
                  placeholder="Combined weight of all stones"
                  value={formData.jewelryDetails.totalCaratWeight}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'totalCaratWeight'
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Number of Stones</FormLabel>
                <Input
                  placeholder="Total number of stones"
                  value={formData.jewelryDetails.numberOfStones}
                  onChange={(e) =>
                    handleNestedChange(e, 'jewelryDetails', 'numberOfStones')
                  }
                />
              </FormControl>
              {formData.jewelryDetails.gemstoneDetails.map((gem, index) => (
                <Box key={index} borderWidth="1px" p="4" mt="4" borderRadius="md">
                  <Text fontWeight="600" mb="2">
                    Gemstone {index + 1}
                  </Text>
                  <FormControl>
                    <FormLabel>Type of Stone</FormLabel>
                    <Input
                      placeholder="e.g., Diamond, Ruby"
                      value={gem.stoneType}
                      onChange={(e) =>
                        handleGemstoneChange(index, 'stoneType', e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Carat Weight</FormLabel>
                    <Input
                      placeholder="Carat weight"
                      value={gem.caratWeight}
                      onChange={(e) =>
                        handleGemstoneChange(index, 'caratWeight', e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cut Quality</FormLabel>
                    <Select
                      placeholder="Select Cut Quality"
                      value={gem.cutQuality}
                      onChange={(e) =>
                        handleGemstoneChange(index, 'cutQuality', e.target.value)
                      }
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Color Grade</FormLabel>
                    <Input
                      placeholder="e.g., D-Z for diamonds"
                      value={gem.colorGrade}
                      onChange={(e) =>
                        handleGemstoneChange(index, 'colorGrade', e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Clarity Grade</FormLabel>
                    <Input
                      placeholder="e.g., FL, IF, VVS1, VVS2"
                      value={gem.clarityGrade}
                      onChange={(e) =>
                        handleGemstoneChange(index, 'clarityGrade', e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Shape</FormLabel>
                    <Input
                      placeholder="e.g., Round, Princess, Oval"
                      value={gem.shape}
                      onChange={(e) =>
                        handleGemstoneChange(index, 'shape', e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Fluorescence</FormLabel>
                    <Select
                      placeholder="Select Fluorescence"
                      value={gem.fluorescence}
                      onChange={(e) =>
                        handleGemstoneChange(index, 'fluorescence', e.target.value)
                      }
                    >
                      <option value="None">None</option>
                      <option value="Faint">Faint</option>
                      <option value="Medium">Medium</option>
                      <option value="Strong">Strong</option>
                    </Select>
                  </FormControl>
                  {/* Certification */}
                  <FormControl>
                    <FormLabel>Is there a certificate?</FormLabel>
                    <RadioGroup
                      value={gem.certification || 'No'}
                      onChange={(value) =>
                        handleGemstoneChange(index, 'certification', value)
                      }
                    >
                      <HStack spacing="24px">
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                      </HStack>
                    </RadioGroup>
                    {gem.certification === 'Yes' && (
                      <>
                        <FormControl mt="2">
                          <FormLabel>Certification Authority</FormLabel>
                          <Input
                            placeholder="e.g., GIA, IGI, AGS"
                            value={gem.certificateAuthority}
                            onChange={(e) =>
                              handleGemstoneChange(
                                index,
                                'certificateAuthority',
                                e.target.value
                              )
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Certificate Number</FormLabel>
                          <Input
                            placeholder="Certificate Number"
                            value={gem.certificateNumber}
                            onChange={(e) =>
                              handleGemstoneChange(
                                index,
                                'certificateNumber',
                                e.target.value
                              )
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Upload Certificate Copy</FormLabel>
                          <Box
                            borderWidth="1px"
                            borderColor={borderColor}
                            borderRadius="md"
                            p="4"
                            textAlign="center"
                            bg={reviewBg}
                          >
                            {gem.certificateCopy ? (
                              <Image
                                src={gem.certificateCopy}
                                alt="Certificate Copy"
                                boxSize="150px"
                                objectFit="cover"
                                borderRadius="md"
                                mx="auto"
                              />
                            ) : (
                              <IconButton
                                icon={<FaUpload />}
                                onClick={() =>
                                  document
                                    .getElementById(`certificateCopy${index}`)
                                    .click()
                                }
                                aria-label="Upload Certificate Copy"
                                variant="outline"
                              />
                            )}
                            <Input
                              type="file"
                              id={`certificateCopy${index}`}
                              accept="image/*,application/pdf"
                              hidden
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files.length > 0) {
                                  const fileURL = URL.createObjectURL(files[0]);
                                  const newGemstones = [
                                    ...formData.jewelryDetails.gemstoneDetails,
                                  ];
                                  newGemstones[index]['certificateCopy'] = fileURL;
                                  setFormData((prev) => ({
                                    ...prev,
                                    jewelryDetails: {
                                      ...prev.jewelryDetails,
                                      gemstoneDetails: newGemstones,
                                    },
                                  }));
                                }
                              }}
                            />
                          </Box>
                        </FormControl>
                      </>
                    )}
                  </FormControl>
                </Box>
              ))}
              <Button
                mt="4"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    jewelryDetails: {
                      ...prev.jewelryDetails,
                      gemstoneDetails: [
                        ...prev.jewelryDetails.gemstoneDetails,
                        {
                          stoneType: '',
                          caratWeight: '',
                          cutQuality: '',
                          colorGrade: '',
                          clarityGrade: '',
                          shape: '',
                          fluorescence: '',
                          certification: 'No',
                          certificateAuthority: '',
                          certificateNumber: '',
                          certificateCopy: null,
                        },
                      ],
                    },
                  }));
                }}
              >
                Add Another Gemstone
              </Button>
            </Box>

            {/* Setting and Craftsmanship */}
            <Box w="100%" borderWidth="1px" p="4" borderRadius="md" mt="4">
              <Text fontWeight="600" mb="2">
                Setting and Craftsmanship
              </Text>
              <FormControl>
                <FormLabel>Setting Type</FormLabel>
                <Input
                  placeholder="e.g., Prong, Bezel, Pave"
                  value={formData.jewelryDetails.settingCraftsmanship.settingType}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'settingCraftsmanship',
                      'settingType'
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Craftsmanship Quality</FormLabel>
                <Select
                  placeholder="Select Quality"
                  value={
                    formData.jewelryDetails.settingCraftsmanship
                      .craftsmanshipQuality
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'settingCraftsmanship',
                      'craftsmanshipQuality'
                    )
                  }
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Are there any defects or wear?</FormLabel>
                <RadioGroup
                  value={
                    formData.jewelryDetails.settingCraftsmanship.defectsOrWear ||
                    'No'
                  }
                  onChange={(value) =>
                    handleNestedChange(
                      { target: { value } },
                      'jewelryDetails',
                      'settingCraftsmanship',
                      'defectsOrWear'
                    )
                  }
                >
                  <HStack spacing="24px">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </HStack>
                </RadioGroup>
                {formData.jewelryDetails.settingCraftsmanship.defectsOrWear ===
                  'Yes' && (
                  <>
                    <FormControl mt="2">
                      <FormLabel>Describe Defects</FormLabel>
                      <Textarea
                        placeholder="Describe any defects or wear"
                        value={
                          formData.jewelryDetails.settingCraftsmanship
                            .defectsDescription || ''
                        }
                        onChange={(e) =>
                          handleNestedChange(
                            e,
                            'jewelryDetails',
                            'settingCraftsmanship',
                            'defectsDescription'
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Upload Photos Highlighting Defects</FormLabel>
                      <Box
                        borderWidth="1px"
                        borderColor={borderColor}
                        borderRadius="md"
                        p="4"
                        textAlign="center"
                        bg={reviewBg}
                      >
                        <IconButton
                          icon={<FaUpload />}
                          onClick={() =>
                            document.getElementById('defectsImages').click()
                          }
                          aria-label="Upload Defect Images"
                          variant="outline"
                        />
                        <Input
                          type="file"
                          id="defectsImages"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={(e) =>
                            handleFileChange(
                              e,
                              'jewelryDetails',
                              'settingCraftsmanship',
                              'defectsImages'
                            )
                          }
                        />
                      </Box>
                      {/* Display uploaded images */}
                      {formData.jewelryDetails.settingCraftsmanship.defectsImages &&
                        formData.jewelryDetails.settingCraftsmanship.defectsImages
                          .length > 0 && (
                          <Flex wrap="wrap" gap="2" mt="2">
                            {formData.jewelryDetails.settingCraftsmanship.defectsImages.map(
                              (img, index) => (
                                <Image
                                  key={index}
                                  src={img}
                                  alt={`Defect Image ${index + 1}`}
                                  boxSize="100px"
                                  objectFit="cover"
                                  borderRadius="md"
                                />
                              )
                            )}
                          </Flex>
                        )}
                    </FormControl>
                  </>
                )}
              </FormControl>
            </Box>

            {/* Condition and Authenticity */}
            <Box w="100%" borderWidth="1px" p="4" borderRadius="md" mt="4">
              <Text fontWeight="600" mb="2">
                Condition and Authenticity
              </Text>
              <FormControl>
                <FormLabel>Overall Condition</FormLabel>
                <Select
                  placeholder="Select Condition"
                  value={
                    formData.jewelryDetails.conditionAuthenticity
                      .overallCondition
                  }
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'conditionAuthenticity',
                      'overallCondition'
                    )
                  }
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Repair">Needs Repair</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Are all components authentic?</FormLabel>
                <RadioGroup
                  value={
                    formData.jewelryDetails.conditionAuthenticity
                      .authenticityVerified || 'Yes'
                  }
                  onChange={(value) =>
                    handleNestedChange(
                      { target: { value } },
                      'jewelryDetails',
                      'conditionAuthenticity',
                      'authenticityVerified'
                    )
                  }
                >
                  <HStack spacing="24px">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </HStack>
                </RadioGroup>
                {formData.jewelryDetails.conditionAuthenticity
                  .authenticityVerified === 'No' && (
                  <FormControl mt="2">
                    <FormLabel>Provide Details</FormLabel>
                    <Textarea
                      placeholder="Explain authenticity issues"
                      value={
                        formData.jewelryDetails.conditionAuthenticity
                          .authenticityDetails || ''
                      }
                      onChange={(e) =>
                        handleNestedChange(
                          e,
                          'jewelryDetails',
                          'conditionAuthenticity',
                          'authenticityDetails'
                        )
                      }
                    />
                  </FormControl>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>
                  Has the jewelry been repaired or modified?
                </FormLabel>
                <RadioGroup
                  value={
                    formData.jewelryDetails.conditionAuthenticity
                      .previousRepairs || 'No'
                  }
                  onChange={(value) =>
                    handleNestedChange(
                      { target: { value } },
                      'jewelryDetails',
                      'conditionAuthenticity',
                      'previousRepairs'
                    )
                  }
                >
                  <HStack spacing="24px">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </HStack>
                </RadioGroup>
                {formData.jewelryDetails.conditionAuthenticity
                  .previousRepairs === 'Yes' && (
                  <FormControl mt="2">
                    <FormLabel>Describe Changes</FormLabel>
                    <Textarea
                      placeholder="Describe any repairs or modifications"
                      value={
                        formData.jewelryDetails.conditionAuthenticity
                          .repairsDescription || ''
                      }
                      onChange={(e) =>
                        handleNestedChange(
                          e,
                          'jewelryDetails',
                          'conditionAuthenticity',
                          'repairsDescription'
                        )
                      }
                    />
                  </FormControl>
                )}
              </FormControl>
            </Box>

            {/* Additional Details */}
            <Box w="100%" borderWidth="1px" p="4" borderRadius="md" mt="4">
              <Text fontWeight="600" mb="2">
                Additional Details
              </Text>
              <FormControl>
                <FormLabel>Total Weight of Jewelry (grams)</FormLabel>
                <Input
                  placeholder="Total weight in grams"
                  value={formData.jewelryDetails.additionalDetails.totalWeight}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'additionalDetails',
                      'totalWeight'
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Age of Jewelry</FormLabel>
                <Input
                  placeholder="Approximate age or year of manufacture"
                  value={formData.jewelryDetails.additionalDetails.age}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'additionalDetails',
                      'age'
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Brand or Designer</FormLabel>
                <Input
                  placeholder="If applicable"
                  value={formData.jewelryDetails.additionalDetails.brandDesigner}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'additionalDetails',
                      'brandDesigner'
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Is the jewelry antique or vintage?</FormLabel>
                <RadioGroup
                  value={
                    formData.jewelryDetails.additionalDetails.antiqueVintage ||
                    'No'
                  }
                  onChange={(value) =>
                    handleNestedChange(
                      { target: { value } },
                      'jewelryDetails',
                      'additionalDetails',
                      'antiqueVintage'
                    )
                  }
                >
                  <HStack spacing="24px">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </HStack>
                </RadioGroup>
                {formData.jewelryDetails.additionalDetails.antiqueVintage ===
                  'Yes' && (
                  <FormControl mt="2">
                    <FormLabel>Provide Historical Details</FormLabel>
                    <Textarea
                      placeholder="Provide historical details"
                      value={
                        formData.jewelryDetails.additionalDetails
                          .historicalDetails || ''
                      }
                      onChange={(e) =>
                        handleNestedChange(
                          e,
                          'jewelryDetails',
                          'additionalDetails',
                          'historicalDetails'
                        )
                      }
                    />
                  </FormControl>
                )}
              </FormControl>
            </Box>

            {/* Valuation */}
            <Box w="100%" borderWidth="1px" p="4" borderRadius="md" mt="4">
              <Text fontWeight="600" mb="2">
                Valuation
              </Text>
              <FormControl>
                <FormLabel>Market Value</FormLabel>
                <Input
                  placeholder="Estimate current market value"
                  value={formData.jewelryDetails.valuation.marketValue}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'valuation',
                      'marketValue'
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Suggested Resale Value</FormLabel>
                <Input
                  placeholder="Considering condition and market demand"
                  value={formData.jewelryDetails.valuation.resaleValue}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'valuation',
                      'resaleValue'
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Appraiser's Remarks</FormLabel>
                <Textarea
                  placeholder="Additional comments, observations, or recommendations"
                  value={formData.jewelryDetails.valuation.appraiserRemarks}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      'jewelryDetails',
                      'valuation',
                      'appraiserRemarks'
                    )
                  }
                />
              </FormControl>
            </Box>

            {/* Photos and Media */}
            <FormControl>
              <FormLabel>Upload High-Quality Images</FormLabel>
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                p="4"
                textAlign="center"
                bg={reviewBg}
              >
                <IconButton
                  icon={<FaUpload />}
                  onClick={() => document.getElementById('jewelryImages').click()}
                  aria-label="Upload Jewelry Images"
                  variant="outline"
                />
                <Input
                  type="file"
                  id="jewelryImages"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => handleFileChange(e, 'jewelryImages')}
                />
              </Box>
              {/* Display uploaded images */}
              {formData.jewelryImages.length > 0 && (
                <Flex wrap="wrap" gap="2" mt="2">
                  {formData.jewelryImages.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Jewelry Image ${index + 1}`}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  ))}
                </Flex>
              )}
            </FormControl>

            {/* Optional Video */}
            <FormControl>
              <FormLabel>Upload a short video showcasing the jewelry</FormLabel>
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                p="4"
                textAlign="center"
                bg={reviewBg}
              >
                {formData.jewelryVideo ? (
                  <video width="200" height="150" controls>
                    <source src={formData.jewelryVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <IconButton
                    icon={<FaUpload />}
                    onClick={() => document.getElementById('jewelryVideo').click()}
                    aria-label="Upload Jewelry Video"
                    variant="outline"
                  />
                )}
                <Input
                  type="file"
                  id="jewelryVideo"
                  accept="video/*"
                  hidden
                  onChange={(e) => handleFileChange(e, 'jewelryVideo')}
                />
              </Box>
            </FormControl>
          </>
        )}

        {/* Step 4: Confirmation & Submission */}
        {activeStep === 3 && (
          <>
            <Text fontWeight="600" fontSize="lg">
              Step 4: Confirmation & Submission
            </Text>
            <Text>
              "I hereby certify that all the information provided is accurate and true
              to the best of my knowledge after thorough examination."
            </Text>

            <FormControl>
              <FormLabel>Appraiser's Name</FormLabel>
              <Input
                placeholder="Enter your name"
                value={formData.appraiserName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    appraiserName: e.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Appraiser's Signature</FormLabel>
              <Box
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                p="4"
                textAlign="center"
                bg={reviewBg}
              >
                {formData.appraiserSignature ? (
                  <Image
                    src={formData.appraiserSignature}
                    alt="Signature"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="md"
                    mx="auto"
                  />
                ) : (
                  <IconButton
                    icon={<FaSignature />}
                    onClick={() =>
                      document.getElementById('appraiserSignature').click()
                    }
                    aria-label="Upload Signature"
                    variant="outline"
                  />
                )}
                <Input
                  type="file"
                  id="appraiserSignature"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleFileChange(e, 'appraiserSignature')}
                />
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel>Date of Appraisal</FormLabel>
              <Input
                type="date"
                value={formData.appraisalDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    appraisalDate: e.target.value,
                  }))
                }
              />
            </FormControl>
          </>
        )}

        {/* Navigation Buttons */}
        <Progress
          value={((activeStep + 1) / stepsCount) * 100}
          size="sm"
          colorScheme="blue"
          mt="4"
        />
        <Flex justifyContent="space-between" w="100%" mt="4">
          {activeStep > 0 && (
            <Button
              leftIcon={<FaChevronLeft />}
              onClick={handlePrev}
              aria-label="Previous Step"
            >
              Back
            </Button>
          )}
          {activeStep < stepsCount - 1 && (
            <Button
              colorScheme="blue"
              onClick={handleNext}
              rightIcon={<FaChevronRight />}
              aria-label="Next Step"
            >
              Next
            </Button>
          )}
          {activeStep === stepsCount - 1 && (
            <Button
              colorScheme="green"
              onClick={handleFormSubmit}
              leftIcon={<FaCheck />}
              aria-label="Submit Form"
              isDisabled={
                !formData.appraiserName ||
                !formData.appraiserSignature ||
                !formData.appraisalDate
              }
            >
              Submit Appraisal
            </Button>
          )}
        </Flex>
      </VStack>
    </Box>
  );
}
