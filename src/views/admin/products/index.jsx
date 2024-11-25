// File: src/views/admin/products/Products.js

import React, { useState } from "react";
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
  HStack,
  Image,
} from "@chakra-ui/react";
import { MdVisibility } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import allProducts from "../products/variables/products";

// Custom components
import ProductCard from "components/card/Product_card";
import topProducts from "./variables/topProducts";
import Card from "components/card/Card.js";
import AddProductSidebar from "./components/AddProductSidebar"; // Import the new SidebarComponent
import TotalSpent from "./components/TotalSpent";

// Assets
import unapprovedProducts from './variables/unapprovedData';

export default function Products() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const tableHoverBg = useColorModeValue("gray.100", "gray.600");
  const textColorSecondary = useColorModeValue("gray.600", "gray.400");

  const productsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentProducts = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigate = useNavigate();

  const productCards = unapprovedProducts.map((product, index) => (
    <ProductCard
      key={index}
      productName={product.name}
      seller={product.sellerName}
      image={product.image}
      currentPrice={product.price}
      productId={product.id}
    />
  ));

  const ProductCards = topProducts.map((product, index) => (
    <ProductCard
      key={index}
      productName={product.name}
      seller={product.sellerName}
      image={product.image}
      currentPrice={product.price}
      productId={product.id}
    />
  ));
  console.log('unapprovedProducts:', unapprovedProducts);

  // State to control the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Box pt={{ base: "80px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns="1fr"
        gap={{ base: "20px", xl: "20px" }}
      >

<SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <TotalSpent />
        {/* <WeeklyRevenue /> */}
      </SimpleGrid>
        {/* Product Table */}
        <Card mb="20px">
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th px={{ base: "4", md: "16" }} py="3">
                    Photo
                  </Th>
                  <Th>Jewellery Names</Th>
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
                    <Td p="4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        w={{ base: "16", md: "32" }}
                        maxW="full"
                        maxH="full"
                      />
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.name}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.status}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.category}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      {product.sellerName}
                    </Td>
                    <Td px="6" py="4" fontWeight="semibold" color={textColor}>
                      ${product.price}
                    </Td>
                    <Td px="6" py="4">
                      <Flex>
                        <Button
                          leftIcon={<MdVisibility />}
                          colorScheme="blue"
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/products/${product.id}`)}
                          mr="2"
                        >
                          Details
                        </Button>
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

        {/* Product Cards */}
        <Flex direction="column">
          <Text
            mt="45px"
            mb="36px"
            color={textColor}
            fontSize="2xl"
            ms="24px"
            fontWeight="700"
          >
            Top Products
          </Text>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap="20px">
            {ProductCards}
          </SimpleGrid>

          <Text
            mt="45px"
            mb="36px"
            color={textColor}
            fontSize="2xl"
            ms="24px"
            fontWeight="700"
          >
            Approval Awaited
          </Text>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap="20px">
            {productCards}
          </SimpleGrid>
        </Flex>
      </Grid>

      {/* Add the floating 'Add Product' button */}
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

      {/* AddProductSidebar Component */}
      <AddProductSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </Box>
  );
}
