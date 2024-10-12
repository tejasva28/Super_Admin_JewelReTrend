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
  Input,
  Textarea,
} from '@chakra-ui/react';
import unapprovedProducts from './variables/unapprovedData'; // Adjust the import path

export default function AppraisedDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id, 10);
  const product = unapprovedProducts.find((p) => p.id === productId);

  // State to manage the status and edit mode
  const [status, setStatus] = useState(product?.status || 'pending');
  const [isEditing, setIsEditing] = useState(false);

  // State to hold edited product details
  const [editedProduct, setEditedProduct] = useState({ ...product });

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save
  const handleSave = () => {
    // TODO: Implement save logic (e.g., API call)
    // For now, we'll just log the edited product
    console.log('Saved product:', editedProduct);

    // Update the main product object
    Object.assign(product, editedProduct);

    setIsEditing(false);
  };

  // Handle Cancel
  const handleCancel = () => {
    // Revert changes
    setEditedProduct({ ...product });
    setIsEditing(false);
  };

  // Render product details
  return (
    <Container maxW="container.lg" py="6" pt="24">
      <Stack spacing="6">
        {/* Header with product name and Edit/Save/Cancel buttons */}
        <Flex justifyContent="space-between" alignItems="center">
          {isEditing ? (
            <Input
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              fontSize="2xl"
              fontWeight="bold"
              maxW="400px"
            />
          ) : (
            <Heading as="h1" size="xl">
              {product.name}
            </Heading>
          )}
          <Flex>
            {isEditing ? (
              <>
                <Button colorScheme="green" mr={2} onClick={handleSave}>
                  Save
                </Button>
                <Button colorScheme="red" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </Flex>
        </Flex>

        {/* Product Image */}
        <Box display="flex" justifyContent="center">
          {isEditing ? (
            <Box>
              <Image
                src={editedProduct.image}
                alt={editedProduct.name}
                maxW="400px"
                borderRadius="md"
                boxShadow="md"
              />
              <Input
                name="image"
                value={editedProduct.image}
                onChange={handleInputChange}
                mt={2}
                placeholder="Image URL"
              />
            </Box>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              maxW="400px"
              borderRadius="md"
              boxShadow="md"
            />
          )}
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
              {isEditing ? (
                <>
                  <Flex alignItems="center">
                    <Text flex="0 0 150px">
                      <strong>Category:</strong>
                    </Text>
                    <Input
                      name="category"
                      value={editedProduct.category}
                      onChange={handleInputChange}
                    />
                  </Flex>
                  <Flex alignItems="center">
                    <Text flex="0 0 150px">
                      <strong>Approved:</strong>
                    </Text>
                    <Select
                      name="approved"
                      value={editedProduct.approved ? 'yes' : 'no'}
                      onChange={(e) =>
                        setEditedProduct((prev) => ({
                          ...prev,
                          approved: e.target.value === 'yes',
                        }))
                      }
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Select>
                  </Flex>
                </>
              ) : (
                <>
                  <Text>
                    <strong>Category:</strong> {product.category}
                  </Text>
                  <Text>
                    <strong>Approved:</strong> {product.approved ? 'Yes' : 'No'}
                  </Text>
                </>
              )}
            </Stack>
          </Box>

          {/* Seller Details */}
          <Box borderWidth="1px" borderRadius="md" p="6" boxShadow="sm">
            <Heading as="h2" size="md" mb="4">
              Seller Details
            </Heading>
            <Stack spacing="2">
              {isEditing ? (
                <Flex alignItems="center">
                  <Text flex="0 0 150px">
                    <strong>Seller Name:</strong>
                  </Text>
                  <Input
                    name="sellerName"
                    value={editedProduct.sellerName}
                    onChange={handleInputChange}
                  />
                </Flex>
              ) : (
                <Text>
                  <strong>Seller Name:</strong> {product.sellerName}
                </Text>
              )}
            </Stack>
          </Box>

          {/* Additional Details */}
          <Box borderWidth="1px" borderRadius="md" p="6" boxShadow="sm">
            <Heading as="h2" size="md" mb="4">
              Additional Details
            </Heading>
            <Stack spacing="2">
              {isEditing ? (
                <Flex alignItems="center">
                  <Text flex="0 0 150px">
                    <strong>Appraiser:</strong>
                  </Text>
                  <Input
                    name="appraiser"
                    value={editedProduct.appraiser}
                    onChange={handleInputChange}
                  />
                </Flex>
              ) : (
                <Text>
                  <strong>Appraiser:</strong> {product.appraiser}
                </Text>
              )}
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
            {isEditing ? (
              <Select
                name="status"
                value={editedProduct.status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  handleInputChange(e);
                }}
                maxW="200px"
                borderColor={`${getStatusColor(status)}.500`}
                _hover={{ bg: `${getStatusColor(status)}.200` }}
                _focus={{ borderColor: `${getStatusColor(status)}.300` }}
                borderRadius="md"
              >
                <option value="live">Live</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </Select>
            ) : (
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={`${getStatusColor(status)}.500`}
              >
                Status: {status}
              </Text>
            )}

            {/* Price Display */}
            {isEditing ? (
              <Flex alignItems="center">
                <Text fontSize="2xl" fontWeight="bold" mr={2}>
                  $
                </Text>
                <Input
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  type="number"
                  fontSize="2xl"
                  fontWeight="bold"
                  maxW="150px"
                />
              </Flex>
            ) : (
              <Text fontSize="2xl" fontWeight="bold">
                ${product.price}
              </Text>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
