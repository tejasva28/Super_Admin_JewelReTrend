// File: src/views/admin/team/AppraiserDetails.js

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
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

// Import the appraiser data
import photographerData from './variables/photographerData'; // Adjust the path if necessary

const PhotographerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the appraiser
  const photographer = photographerData.find(
    (photographer) => photographer.id.toString() === id
  );

  // Initialize state for appraiser details
  const [photographerDetails, setPhotographerDetails] = useState({
    name: photographer?.name || '',
    address: photographer?.address || '',
    status: photographer?.status || '',
    appraiser: photographer?.photographer || '',
    photographer: photographer?.photographer || '',
    city: photographer?.city || '',
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state for status separately if needed
  const [status, setStatus] = useState(photographer?.status || '');

  // Color mode for styling
  const cardBg = useColorModeValue('white', 'gray.700');

  if (!photographer) {
    return (
      <Container maxW="container.md" py="6" pt="24">
        <Text fontSize="xl" color="red.500">
        Photographer not found.
        </Text>
        <Button mt={4} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  // Handler to toggle status between 'Approved' and 'Removed'
  const handleStatusToggle = () => {
    const newStatus = status === 'Approved' ? 'Removed' : 'Approved';
    setStatus(newStatus);
    setPhotographerDetails({ ...photographerDetails, status: newStatus });
    // Update the status in the data source if necessary
  };

  // Handler to toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handler to save changes
  const handleSaveChanges = () => {
    // Here you would update the data source or backend API
    setIsEditing(false);
  };

  // Handler to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhotographerDetails({ ...photographerDetails, [name]: value });
  };

  return (
    <Container maxW="container.lg" py="6" pt="24">
      <Stack spacing="6">
        {/* Header with photographer name and Edit button */}
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            {photographerDetails.name}
          </Heading>
          <Button colorScheme="blue" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </Flex>

        <Divider />

        {/* Details Sections */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="6">
          {/* General Details */}
          <Box bg={cardBg} p="6" borderRadius="md" shadow="sm">
            <Heading as="h2" size="md" mb="4">
              General Details
            </Heading>
            <Stack spacing="4">
              {isEditing ? (
                <>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={photographerDetails.name}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                      name="address"
                      value={photographerDetails.address}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Input
                      name="status"
                      value={photographerDetails.status}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </>
              ) : (
                <Stack spacing="2">
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      ID:
                    </Text>
                    <Text>{photographer.id}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      Address:
                    </Text>
                    <Text>{photographerDetails.address}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      Status:
                    </Text>
                    <Badge
                      colorScheme={
                        status.toLowerCase() === 'approved'
                          ? 'green'
                          : status.toLowerCase() === 'removed'
                          ? 'red'
                          : 'yellow'
                      }
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="md"
                      textTransform="capitalize"
                    >
                      {status}
                    </Badge>
                  </Flex>
                </Stack>
              )}
            </Stack>
          </Box>

          {/* Additional Details */}
          <Box bg={cardBg} p="6" borderRadius="md" shadow="sm">
            <Heading as="h2" size="md" mb="4">
              Contact Details
            </Heading>
            <Stack spacing="4">
              {isEditing ? (
                <>
                  <FormControl>
                    <FormLabel>Appraiser</FormLabel>
                    <Input
                      name="photographer"
                      value={photographerDetails.appraiser}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Photographer</FormLabel>
                    <Input
                      name="photographer"
                      value={photographerDetails.photographer}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input
                      name="city"
                      value={photographerDetails.city}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </>
              ) : (
                <Stack spacing="2">
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      Appraiser:
                    </Text>
                    <Text>{photographerDetails.appraiser}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      Photographer:
                    </Text>
                    <Text>{photographerDetails.photographer}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      City:
                    </Text>
                    <Text>{photographerDetails.city}</Text>
                  </Flex>
                </Stack>
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
              colorScheme={status === 'Approved' ? 'red' : 'green'}
              onClick={handleStatusToggle}
            >
              {status === 'Approved' ? 'Remove' : 'Approve'}
            </Button>
          )}
        </Flex>
      </Stack>
    </Container>
  );
};

export default PhotographerDetails;
