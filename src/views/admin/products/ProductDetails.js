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
  Badge,
  Button,
  Select,
  Flex,
} from '@chakra-ui/react';
import allProducts from '../products/variables/products'; // Adjust the import path

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id, 10);
  const product = allProducts.find((p) => p.id === productId);

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
                <strong>SKU ID:</strong> {product.skuId}
              </Text>
              <Text>
                <strong>Category:</strong> {product.category}
              </Text>
              <Text>
                <strong>Weight:</strong> {product.weight}
              </Text>
              <Text>
                <strong>Stock Quantity:</strong> {product.stockQuantity}
              </Text>
              <Text>
                <strong>Last Updated:</strong> {product.lastUpdated}
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
              <Text>
                <strong>Seller Address:</strong> {product.sellerAddress}
              </Text>
              <Text>
                <strong>City:</strong> {product.city}
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
              <Text>
                <strong>Photographer:</strong> {product.photographer}
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
            //   bg={`${getStatusColor(status)}.100`}
              borderColor={`${getStatusColor(status)}.500`}
            //   color="black" // Text color for better visibility
              _hover={{ bg: `${getStatusColor(status)}.200` }} // Darker on hover
              _focus={{ borderColor: `${getStatusColor(status)}.300` }} // Focus border color
              borderRadius="md" // Smooth borders
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
