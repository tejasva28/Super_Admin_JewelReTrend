// File: src/views/admin/products/ProductDetailsSidebar.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useColorModeValue,
  Text,
  Image,
  Heading,
  Stack,
  Divider,
  Grid,
  Box,
  Select,
  Flex,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

export default function ProductDetailsSidebar({ isOpen, onClose, product }) {
  // 1. Define hooks at the top (unconditional)
  const drawerBg = useColorModeValue("white", "gray.800");
  const closeBtnColor = useColorModeValue("gray.800", "white");

  // We store a local copy of the product for editing
  const [editedProduct, setEditedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // 2. Whenever `product` changes (e.g., user selects a new product), reset local states
  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
      setIsEditing(false);
      setSaveError(null);
    }
  }, [product]);

  // 3. If no product, just show a placeholder
  if (!product) {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent bg={drawerBg}>
          <DrawerCloseButton color={closeBtnColor} />
          <DrawerHeader>No Product Selected</DrawerHeader>
          <DrawerBody>
            <Text color="red.500">Please select a product first.</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  // Helper to get color based on status
  const getStatusColor = (statusValue) => {
    switch ((statusValue || "").toLowerCase()) {
      case "live":
        return "green";
      case "pending":
        return "yellow";
      case "rejected":
        return "red";
      default:
        return "gray";
    }
  };

  // Input change handler (edit mode)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes to the backend
  const handleSave = () => {
    setSaveError(null);

    // Example PUT request to update product
    axios
      .put(`${API_BASE_URL}/product/${editedProduct.id}`, editedProduct)
      .then((response) => {
        console.log("Product updated:", response.data);
        // Optionally update local state after saving
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        setSaveError("Failed to save changes. Please try again.");
      });
  };

  // Cancel = revert changes
  const handleCancel = () => {
    setEditedProduct({ ...product });
    setIsEditing(false);
    setSaveError(null);
  };

  // If still loading local data, or editedProduct is null
  if (!editedProduct) {
    return null; // or a loading spinner
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent bg={drawerBg}>
        <DrawerCloseButton color={closeBtnColor} fontSize="lg" mt={2} />
        <DrawerHeader
          bgGradient="linear(to-r, teal.400, blue.500)"
          color="white"
          borderBottomWidth="1px"
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
        >
          View / Edit Product
        </DrawerHeader>

        <DrawerBody p={6}>
          <Stack spacing={6}>
            {/* Error message if save failed */}
            {saveError && (
              <Text color="red.500" fontWeight="bold">
                {saveError}
              </Text>
            )}

            {/* Header: Product Name + Edit / Save / Cancel */}
            <Flex justifyContent="space-between" alignItems="center">
              {isEditing ? (
                <Input
                  name="title"
                  value={editedProduct.title || ""}
                  onChange={handleInputChange}
                  fontSize="2xl"
                  fontWeight="bold"
                  maxW="400px"
                />
              ) : (
                <Heading as="h1" size="xl">
                  {editedProduct.title}
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

            {/* Product Image (just showing the first URL if multiple) */}
            <Flex justifyContent="center">
              {isEditing ? (
                <Stack spacing={2} align="center">
                  <Image
                    src={
                      editedProduct.pictures && editedProduct.pictures.length > 0
                        ? `http://localhost:8080${editedProduct.pictures[0]}`
                        : ""
                    }
                    alt={editedProduct.title}
                    maxW="400px"
                    borderRadius="md"
                    boxShadow="md"
                  />
                  <Text>Update Image URLs (comma-separated, for example):</Text>
                  <Input
                    name="pictures"
                    value={Array.isArray(editedProduct.pictures) ? editedProduct.pictures.join(",") : ""}
                    onChange={(e) => {
                      // Convert CSV -> array
                      const arr = e.target.value.split(",").map((s) => s.trim());
                      setEditedProduct((prev) => ({ ...prev, pictures: arr }));
                    }}
                  />
                </Stack>
              ) : (
                <Image
                  src={
                    editedProduct.pictures && editedProduct.pictures.length > 0
                      ? `http://localhost:8080${editedProduct.pictures[0]}`
                      : ""
                  }
                  alt={editedProduct.title}
                  maxW="400px"
                  borderRadius="md"
                  boxShadow="md"
                />
              )}
            </Flex>

            <Divider />

            {/* Main Grid: 1) General Details 2) Seller Details 3) Additional Details */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              {/* General Details */}
              <Box borderWidth="1px" borderRadius="md" p={6} boxShadow="sm">
                <Heading as="h2" size="md" mb={4}>
                  General Details
                </Heading>
                <Stack spacing={2}>
                  {isEditing ? (
                    <>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          SKU ID:
                        </Text>
                        <Input
                          name="skuId"
                          value={editedProduct.skuId || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          Category:
                        </Text>
                        <Input
                          name="category"
                          value={editedProduct.category || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          Weight:
                        </Text>
                        <Input
                          name="weight"
                          value={editedProduct.weight || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          Last Updated:
                        </Text>
                        <Input
                          name="lastUpdated"
                          value={editedProduct.lastUpdated || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Text>
                        <strong>SKU ID:</strong> {editedProduct.skuId}
                      </Text>
                      <Text>
                        <strong>Category:</strong> {editedProduct.jewelleryType}
                      </Text>
                      <Text>
                        <strong>Weight:</strong> {editedProduct.weight}
                      </Text>
                      <Text>
                        <strong>Last Updated:</strong> {editedProduct.lastUpdated}
                      </Text>
                    </>
                  )}
                </Stack>
              </Box>

              {/* Seller Details */}
              <Box borderWidth="1px" borderRadius="md" p={6} boxShadow="sm">
                <Heading as="h2" size="md" mb={4}>
                  Seller Details
                </Heading>
                <Stack spacing={2}>
                  {isEditing ? (
                    <>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          Seller Name:
                        </Text>
                        <Input
                          name="sellerName"
                          value={editedProduct.sellerName || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          Address:
                        </Text>
                        <Textarea
                          name="sellerAddress"
                          value={editedProduct.sellerAddress || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          City:
                        </Text>
                        <Input
                          name="city"
                          value={editedProduct.city || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Text>
                        <strong>Seller Name:</strong> {editedProduct.sellerName}
                      </Text>
                      <Text>
                        <strong>Seller Address:</strong> {editedProduct.sellerAddress}
                      </Text>
                      <Text>
                        <strong>City:</strong> {editedProduct.city}
                      </Text>
                    </>
                  )}
                </Stack>
              </Box>

              {/* Additional Details */}
              <Box borderWidth="1px" borderRadius="md" p={6} boxShadow="sm">
                <Heading as="h2" size="md" mb={4}>
                  Additional Details
                </Heading>
                <Stack spacing={2}>
                  {isEditing ? (
                    <>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          Appraiser:
                        </Text>
                        <Input
                          name="appraiser"
                          value={editedProduct.appraiser || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                      <Flex alignItems="center">
                        <Text w="120px" fontWeight="semibold">
                          Photographer:
                        </Text>
                        <Input
                          name="photographer"
                          value={editedProduct.photographer || ""}
                          onChange={handleInputChange}
                        />
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Text>
                        <strong>Appraiser:</strong> {editedProduct.appraiser}
                      </Text>
                      <Text>
                        <strong>Photographer:</strong> {editedProduct.photographer}
                      </Text>
                    </>
                  )}
                </Stack>
              </Box>
            </Grid>

            {/* Status & Price Section */}
            <Box borderWidth="1px" borderRadius="md" p={6} boxShadow="sm">
              <Stack
                direction={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
              >
                {/* Status Selector */}
                {isEditing ? (
                  <Select
                    name="status"
                    value={editedProduct.status || ""}
                    onChange={(e) => {
                      handleInputChange(e);
                      // also update local status color
                    }}
                    maxW="200px"
                    borderColor={`${getStatusColor(editedProduct.status)}.500`}
                  >
                    <option value="live">Live</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </Select>
                ) : (
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={`${getStatusColor(editedProduct.status)}.500`}
                  >
                    Status: {editedProduct.status}
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
                      type="number"
                      value={editedProduct.price || ""}
                      onChange={handleInputChange}
                      fontSize="2xl"
                      fontWeight="bold"
                      maxW="150px"
                    />
                  </Flex>
                ) : (
                  <Text fontSize="2xl" fontWeight="bold">
                    ${editedProduct.price}
                  </Text>
                )}
              </Stack>
            </Box>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
