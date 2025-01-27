// src/components/Appraiser.js

import React, { useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ProductContext } from "./ProductContext"; // Adjust the import path
import { useNavigate } from 'react-router-dom';

export default function Appraiser() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const tableHoverBg = useColorModeValue("gray.100", "gray.600");

  const { products, loading, error, approveProduct, rejectProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box pt={{ base: "80px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns="1fr"
        gap={{ base: "20px", xl: "20px" }}
      >
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg={tableHeaderBg}>
              <Tr>
                <Th>Photo</Th>
                <Th>Jewellery Names</Th>
                <Th>Status</Th>
                <Th>Category</Th>
                <Th>Seller Name</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id} _hover={{ bg: tableHoverBg }}>
                  <Td>
                    <Image
                      src={product.image}
                      alt={product.name}
                      w="32px"
                      h="32px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Td>
                  <Td>{product.name}</Td>
                  <Td>
                    <Text
                      color={
                        product.status === "live"
                          ? "green.500"
                          : product.status === "pending"
                          ? "yellow.500"
                          : "red.500"
                      }
                      fontWeight="bold"
                    >
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </Text>
                  </Td>
                  <Td>{product.category}</Td>
                  <Td>{product.sellerName}</Td>
                  <Td>${product.price.toFixed(2)}</Td>
                  <Td>
                    <Flex gap="10px">
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => approveProduct(product.id)}
                        isDisabled={product.status === "live"}
                      >
                        Approve
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => rejectProduct(product.id)}
                        isDisabled={product.status === "live"}
                      >
                        Reject
                      </Button>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        Details
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Grid>
    </Box>
  );
}
