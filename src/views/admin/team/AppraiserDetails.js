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
import tableDataComplex from './variables/tableDataComplex'; // Adjust the path if necessary

const AppraiserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the appraiser
  const appraiser = tableDataComplex.find(
    (appraiser) => appraiser.id.toString() === id
  );

  // Initialize state for appraiser details
  const [appraiserDetails, setAppraiserDetails] = useState({
    name: appraiser?.name || '',
    address: appraiser?.address || '',
    status: appraiser?.status || '',
    appraiser: appraiser?.appraiser || '',
    photographer: appraiser?.photographer || '',
    city: appraiser?.city || '',
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state for status separately if needed
  const [status, setStatus] = useState(appraiser?.status || '');

  // Color mode for styling
  const cardBg = useColorModeValue('white', 'gray.700');

  if (!appraiser) {
    return (
      <Container maxW="container.md" py="6" pt="24">
        <Text fontSize="xl" color="red.500">
          Appraiser not found.
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
    setAppraiserDetails({ ...appraiserDetails, status: newStatus });
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
    setAppraiserDetails({ ...appraiserDetails, [name]: value });
  };

  return (
    <Container maxW="container.lg" py="6" pt="24">
      <Stack spacing="6">
        {/* Header with appraiser name and Edit button */}
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            {appraiserDetails.name}
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
                      value={appraiserDetails.name}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                      name="address"
                      value={appraiserDetails.address}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Input
                      name="status"
                      value={appraiserDetails.status}
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
                    <Text>{appraiser.id}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      Address:
                    </Text>
                    <Text>{appraiserDetails.address}</Text>
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
                      name="appraiser"
                      value={appraiserDetails.appraiser}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Photographer</FormLabel>
                    <Input
                      name="photographer"
                      value={appraiserDetails.photographer}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input
                      name="city"
                      value={appraiserDetails.city}
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
                    <Text>{appraiserDetails.appraiser}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      Photographer:
                    </Text>
                    <Text>{appraiserDetails.photographer}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" minWidth="120px">
                      City:
                    </Text>
                    <Text>{appraiserDetails.city}</Text>
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

export default AppraiserDetails;
