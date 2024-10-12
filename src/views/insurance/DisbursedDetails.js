// File: src/views/admin/team/DisbursedDetails.js

import React, { useState } from 'react';
import {
  Box,
  Text,
  Container,
  Heading,
  Stack,
  Divider,
  Grid,
  Badge,
  Button,
  Flex,
  useColorModeValue,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

// Import the disbursed data
import disbursedData from '/Users/tejasva/Downloads/horizon-ui-chakra-main/src/views/insurance/variables/DisbursedData.js'; // Adjust the path if necessary

export default function DisbursedDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the disbursed record
  const disbursement = disbursedData.find(
    (item) => item.id.toString() === id
  );

  // Initialize state for disbursement details
  const [disbursementDetails, setDisbursementDetails] = useState({
    customerName: disbursement?.customerName || '',
    phoneNumber: disbursement?.phoneNumber || '',
    purchasedProduct: disbursement?.purchasedProduct || '',
    email: disbursement?.email || '',
    incidentDetails: disbursement?.incidentDetails || '',
    totalValue: disbursement?.totalValue || '',
    sanctionedValue: disbursement?.sanctionedValue || '',
    remarks: disbursement?.remarks || '',
    status: disbursement?.status || 'Pending',
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Color mode for styling
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!disbursement) {
    return (
      <Container maxW="container.md" py="6" pt="24">
        <Text fontSize="xl" color="red.500">
          Disbursed Insurance not found.
        </Text>
        <Button mt={4} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  // Function to get badge color based on status
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'green';
      case 'removed':
        return 'red';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  // Handler to toggle status between 'Approved' and 'Removed'
  const handleStatusToggle = () => {
    const newStatus = disbursementDetails.status === 'Approved' ? 'Removed' : 'Approved';
    setDisbursementDetails({ ...disbursementDetails, status: newStatus });
    // TODO: Update the status in the data source or backend API
  };

  // Handler to toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handler to save changes
  const handleSaveChanges = () => {
    // TODO: Implement save logic (e.g., API call)
    // For now, we'll assume changes are saved successfully
    console.log('Saved disbursement:', disbursementDetails);
    setIsEditing(false);
  };

  // Handler to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisbursementDetails({ ...disbursementDetails, [name]: value });
  };

  return (
    <Container maxW="container.lg" py="6" pt="24">
      <Stack spacing="6">
        {/* Header with disbursement name and Edit button */}
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            {disbursementDetails.customerName}
          </Heading>
          <Button colorScheme="blue" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </Flex>

        <Divider />

        {/* Details Sections */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="6">
          {/* General Details */}
          <Box bg={cardBg} p="6" borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor}>
            <Heading as="h2" size="md" mb="4">
              General Details
            </Heading>
            <Stack spacing="4">
              {isEditing ? (
                <>
                  <FormControl>
                    <FormLabel>ID</FormLabel>
                    <Input
                      name="id"
                      value={disbursementDetails.id}
                      isReadOnly
                      disabled
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Purchased Product</FormLabel>
                    <Input
                      name="purchasedProduct"
                      value={disbursementDetails.purchasedProduct}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Incident Details</FormLabel>
                    <Input
                      name="incidentDetails"
                      value={disbursementDetails.incidentDetails}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Total Value ($)</FormLabel>
                    <Input
                      name="totalValue"
                      type="number"
                      value={disbursementDetails.totalValue}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Sanctioned Value ($)</FormLabel>
                    <Input
                      name="sanctionedValue"
                      type="number"
                      value={disbursementDetails.sanctionedValue}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </>
              ) : (
                <Stack spacing="2">
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      ID:
                    </Text>
                    <Text>{disbursementDetails.id}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Purchased Product:
                    </Text>
                    <Text>{disbursementDetails.purchasedProduct}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Incident Details:
                    </Text>
                    <Text>{disbursementDetails.incidentDetails}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Total Value ($):
                    </Text>
                    <Text>{disbursementDetails.totalValue}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Sanctioned Value ($):
                    </Text>
                    <Text>{disbursementDetails.sanctionedValue}</Text>
                  </Flex>
                </Stack>
              )}
            </Stack>
          </Box>

          {/* Contact Details */}
          <Box bg={cardBg} p="6" borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor}>
            <Heading as="h2" size="md" mb="4">
              Contact Details
            </Heading>
            <Stack spacing="4">
              {isEditing ? (
                <>
                  <FormControl>
                    <FormLabel>Customer Name</FormLabel>
                    <Input
                      name="customerName"
                      value={disbursementDetails.customerName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      name="phoneNumber"
                      value={disbursementDetails.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={disbursementDetails.email}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </>
              ) : (
                <Stack spacing="2">
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Customer Name:
                    </Text>
                    <Text>{disbursementDetails.customerName}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Phone Number:
                    </Text>
                    <Text>{disbursementDetails.phoneNumber}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Email:
                    </Text>
                    <Text>{disbursementDetails.email}</Text>
                  </Flex>
                </Stack>
              )}
            </Stack>
          </Box>

          {/* Additional Details */}
          <Box bg={cardBg} p="6" borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor} gridColumn={{ base: 'span 1', md: 'span 2' }}>
            <Heading as="h2" size="md" mb="4">
              Additional Details
            </Heading>
            <Stack spacing="4">
              {isEditing ? (
                <>
                  <FormControl>
                    <FormLabel>Remarks</FormLabel>
                    <Textarea
                      name="remarks"
                      value={disbursementDetails.remarks}
                      onChange={handleInputChange}
                      placeholder="Enter remarks"
                    />
                  </FormControl>
                </>
              ) : (
                <Flex>
                  <Text fontWeight="bold" minWidth="150px">
                    Remarks:
                  </Text>
                  <Text>{disbursementDetails.remarks}</Text>
                </Flex>
              )}
            </Stack>
          </Box>
        </Grid>

        {/* Actions Section */}
        <Flex justifyContent="space-between" mt={6}>
          <Button onClick={() => navigate(-1)}>Back to List</Button>
          {isEditing ? (
            <Button colorScheme="green" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          ) : (
            <Button
              colorScheme={disbursementDetails.status === 'Approved' ? 'red' : 'green'}
              onClick={handleStatusToggle}
            >
              {disbursementDetails.status === 'Approved' ? 'Remove' : 'Approve'}
            </Button>
          )}
        </Flex>
      </Stack>
    </Container>
  );
}
