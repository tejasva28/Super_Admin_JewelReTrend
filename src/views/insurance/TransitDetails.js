// File: src/views/admin/team/TransitDetails.js

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

// Import the transit data
import transitData from '/Users/tejasva/Downloads/horizon-ui-chakra-main/src/views/insurance/variables/transitData.js'; // Adjust the path based on your project structure

export default function TransitDetails() {
  const { transitID } = useParams();
  const navigate = useNavigate();

  // Find the transit record
  const transitRecord = transitData.find(
    (item) => item.transitID.toString() === transitID
  );

  // Initialize state for transit details
  const [transitDetails, setTransitDetails] = useState({
    transitID: transitRecord?.transitID || '',
    customerName: transitRecord?.customerName || '',
    productID: transitRecord?.productID || '',
    productName: transitRecord?.productName || '',
    productAmount: transitRecord?.productAmount || '',
    amountCover: transitRecord?.amountCover || '',
    transitAction: transitRecord?.transitAction || 'Pending',
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Color mode for styling
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!transitRecord) {
    return (
      <Container maxW="container.md" py="6" pt="24">
        <Text fontSize="xl" color="red.500">
          Transit Insurance Details not found.
        </Text>
        <Button mt={4} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  // Function to get badge color based on transitAction
  const getActionBadge = (action) => {
    switch (action.toLowerCase()) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Handler to toggle transitAction between 'Approved' and 'Rejected'
  const handleActionToggle = () => {
    const newAction =
      transitDetails.transitAction === 'Approved' ? 'Rejected' : 'Approved';
    setTransitDetails({ ...transitDetails, transitAction: newAction });
    // TODO: Update the action in the data source or backend API
  };

  // Handler to toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handler to save changes
  const handleSaveChanges = () => {
    // TODO: Implement save logic (e.g., API call)
    // For now, we'll assume changes are saved successfully
    console.log('Saved transit details:', transitDetails);
    setIsEditing(false);
  };

  // Handler to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransitDetails({ ...transitDetails, [name]: value });
  };

  return (
    <Container maxW="container.lg" py="6" pt="24">
      <Stack spacing="6">
        {/* Header with transit record ID and Edit button */}
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            Transit Insurance Details - {transitDetails.transitID}
          </Heading>
          <Button colorScheme="blue" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </Flex>

        <Divider />

        {/* Details Sections */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="6">
          {/* General Details */}
          <Box
            bg={cardBg}
            p="6"
            borderRadius="md"
            shadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Heading as="h2" size="md" mb="4">
              General Details
            </Heading>
            <Stack spacing="4">
              {isEditing ? (
                <>
                  <FormControl>
                    <FormLabel>Transit ID</FormLabel>
                    <Input
                      name="transitID"
                      value={transitDetails.transitID}
                      isReadOnly
                      disabled
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Product ID</FormLabel>
                    <Input
                      name="productID"
                      value={transitDetails.productID}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      name="productName"
                      value={transitDetails.productName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Product Amount (INR)</FormLabel>
                    <Input
                      name="productAmount"
                      type="number"
                      value={transitDetails.productAmount}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Amount Cover (INR)</FormLabel>
                    <Input
                      name="amountCover"
                      type="number"
                      value={transitDetails.amountCover}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </>
              ) : (
                <Stack spacing="2">
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Transit ID:
                    </Text>
                    <Text>{transitDetails.transitID}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Product ID:
                    </Text>
                    <Text>{transitDetails.productID}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Product Name:
                    </Text>
                    <Text>{transitDetails.productName}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Product Amount (INR):
                    </Text>
                    <Text>₹{transitDetails.productAmount.toLocaleString()}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="150px">
                      Amount Cover (INR):
                    </Text>
                    <Text>₹{transitDetails.amountCover.toLocaleString()}</Text>
                  </Flex>
                </Stack>
              )}
            </Stack>
          </Box>

          {/* Customer Details */}
          <Box
            bg={cardBg}
            p="6"
            borderRadius="md"
            shadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Heading as="h2" size="md" mb="4">
              Customer Details
            </Heading>
            <Stack spacing="4">
              {isEditing ? (
                <>
                  <FormControl>
                    <FormLabel>Customer Name</FormLabel>
                    <Input
                      name="customerName"
                      value={transitDetails.customerName}
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
                    <Text>{transitDetails.customerName}</Text>
                  </Flex>
                </Stack>
              )}
            </Stack>
          </Box>

          {/* Additional Details */}
          <Box
            bg={cardBg}
            p="6"
            borderRadius="md"
            shadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            gridColumn={{ base: 'span 1', md: 'span 2' }}
          >
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
                      value={transitDetails.remarks || ''}
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
                  <Text>{transitDetails.remarks || 'N/A'}</Text>
                </Flex>
              )}
              <Flex alignItems="center">
                <Text fontWeight="bold" minWidth="150px">
                  Transit Action:
                </Text>
                <Badge
                  colorScheme={getActionBadge(transitDetails.transitAction)}
                  variant="solid"
                  fontSize="0.8em"
                >
                  {transitDetails.transitAction}
                </Badge>
              </Flex>
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
              colorScheme={
                transitDetails.transitAction === 'Approved' ? 'red' : 'green'
              }
              onClick={handleActionToggle}
            >
              {transitDetails.transitAction === 'Approved'
                ? 'Reject'
                : 'Approve'}
            </Button>
          )}
        </Flex>
      </Stack>
    </Container>
  );
}
