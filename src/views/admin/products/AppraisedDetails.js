import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Image,
  Container,
  Heading,
  Stack,
  Divider,
  Grid,
  Button,
  Select,
  Flex,
} from '@chakra-ui/react';
import unapprovedProducts from './variables/unapprovedData'; // Adjust the import path

export default function AppraisedDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id, 10);
  const product = unapprovedProducts.find((p) => p.id === productId);

  // State to manage the status
  const [status, setStatus] = useState(product?.status || 'pending');

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (!product) {
    return (
      <Container maxW="container.md" py="6" pt="24">
        <Text fontSize="xl" color="red.500">
          Product not found.
        </Text>
      </Container>
    );
  }

  // Render product details
  return (
    <Container maxW="container.lg" py="6" pt="24">
      <Stack spacing="6">
        {/* Header with product name and Edit button */}
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            {product.name}
          </Heading>
          <Button colorScheme="blue" onClick={() => navigate(`/edit/${product.id}`)}>
            Edit
          </Button>
        </Flex>

        {/* Product Image */}
        <Box display="flex" justifyContent="center">
          <Image
            src={product.image}
            alt={product.name}
            maxW="400px"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>

        <Divider />

        {/* Details Sections */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="6">
          {/* General Details */}
          <Box borderWidth="1px" borderRadius="md" p="6" boxShadow="sm">
            <Heading as="h2" size="md" mb="4">
              General Details
            </Heading>
            <Stack spacing="2">
              <Text>
                <strong>Category:</strong> {product.category}
              </Text>
              <Text>
                <strong>Status:</strong> {product.status}
              </Text>
              <Text>
                <strong>Approved:</strong> {product.approved ? 'Yes' : 'No'}
              </Text>
            </Stack>
          </Box>

          {/* Seller Details */}
          <Box borderWidth="1px" borderRadius="md" p="6" boxShadow="sm">
            <Heading as="h2" size="md" mb="4">
              Seller Details
            </Heading>
            <Stack spacing="2">
              <Text>
                <strong>Seller Name:</strong> {product.sellerName}
              </Text>
            </Stack>
          </Box>

          {/* Additional Details */}
          <Box borderWidth="1px" borderRadius="md" p="6" boxShadow="sm">
            <Heading as="h2" size="md" mb="4">
              Additional Details
            </Heading>
            <Stack spacing="2">
              <Text>
                <strong>Appraiser:</strong> {product.appraiser}
              </Text>
            </Stack>
          </Box>
        </Grid>

        {/* Status and Price Section */}
        <Box borderWidth="1px" borderRadius="md" p="6" boxShadow="sm">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Status Selector */}
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              maxW="200px"
              borderColor={`${getStatusColor(status)}.500`}
              _hover={{ bg: `${getStatusColor(status)}.200` }}
              _focus={{ borderColor: `${getStatusColor(status)}.300` }}
              borderRadius="md"
            >
              <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="live">
                Live
              </option>
              <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="pending">
                Pending
              </option>
              <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="rejected">
                Rejected
              </option>
            </Select>

            {/* Price Display */}
            <Text fontSize="2xl" fontWeight="bold">
              ${product.price}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}