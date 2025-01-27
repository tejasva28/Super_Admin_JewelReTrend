// File: src/views/admin/products/Products.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
} from "@chakra-ui/react";
import { MdVisibility } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Card from "components/card/Card.js";
import TotalSpent from "./components/TotalSpent";
import ProductDetailsSidebar from "./ProductDetailsSidebar";    // We'll create this next
import AddProductSidebar from "./components/AddProductSidebar"; // We'll create this next

export default function Products() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const tableHoverBg = useColorModeValue("gray.100", "gray.600");
  const textColorSecondary = useColorModeValue("gray.600", "gray.400");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  // For the "Add Product" sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // For the "Product Details" sidebar
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  // Fetch all products on mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/product/all`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products.");
        setLoading(false);
      });
  }, [API_BASE_URL]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Sidebar handlers
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Product details drawer handlers
  const openDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };
  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedProduct(null);
  };

  // Loading / Error states
  if (loading) {
    return (
      <Box pt={{ base: "80px", md: "80px", xl: "80px" }}>
        <Text>Loading products...</Text>
      </Box>
    );
  }
  if (error) {
    return (
      <Box pt={{ base: "80px", md: "80px", xl: "80px" }}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
   <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid mb="20px" gridTemplateColumns="1fr" gap={{ base: "20px", xl: "20px" }}>
        {/* Example top bar/stats */}
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        </SimpleGrid>

        {/* Products Table */}
        <Card mb="20px">
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th px={{ base: "4", md: "16" }} py="8">Photo</Th>
                  <Th>Jewellery Name</Th>
                  <Th>Status</Th>
                  <Th>Category</Th>
                  <Th>Seller Name</Th>
                  <Th>Price</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentProducts.map((product) => (
                  <Tr key={product.id} _hover={{ bg: tableHoverBg }}>
                    {/* Show the first image, or "No Image" if none */}
                    <Td p="4">
                      {product.pictures && product.pictures.length > 0 ? (
                        <Image
                          src={`http://localhost:8080${product.pictures[0]}`}
                          alt={product.title}
                          w={{ base: "16", md: "32" }}
                          maxW="full"
                          maxH="full"
                        />
                      ) : (
                        <Text>No Image</Text>
                      )}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.title}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.status || "pending"}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.jewelleryType}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.sellerName}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.calculatedPrice}
                    </Td>
                    <Td px="6" py="4">
                      <Flex>
                        <Button
                          leftIcon={<MdVisibility />}
                          colorScheme="blue"
                          variant="outline"
                          size="sm"
                          mr="2"
                          onClick={() => openDetails(product)} // <-- Open the details drawer
                        >
                          Details
                        </Button>
                        {/* Example: you could also do onClick={() => navigate(`/product/${product.id}`)} */}
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Pagination */}
            <Flex
              mt={4}
              justify="space-between"
              align="center"
              direction={{ base: "column", md: "row" }}
            >
              <Button
                leftIcon={<ChevronLeftIcon />}
                onClick={prevPage}
                isDisabled={currentPage === 1}
              >
                Previous
              </Button>
              <Text color={textColorSecondary}>
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                rightIcon={<ChevronRightIcon />}
                onClick={nextPage}
                isDisabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Flex>
          </Box>
        </Card>

        {/* Additional sections or grids if needed */}
      </Grid>

      {/* Floating button to add product */}
      <Button
        position="fixed"
        bottom="20px"
        right="20px"
        colorScheme="teal"
        borderRadius="full"
        size="lg"
        onClick={openSidebar}
      >
        Add Product
      </Button>

      {/* Add Product Sidebar */}
      <AddProductSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Product Details Sidebar */}
      <ProductDetailsSidebar
        isOpen={isDetailsOpen}
        onClose={closeDetails}
        product={selectedProduct}
      />
    </Box>
  );
}
