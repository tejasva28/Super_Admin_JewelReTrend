
import React, { useState } from "react";
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
} from "@chakra-ui/react";
import unapprovedProducts from "../products/variables/unapprovedData"; // Import the unapproved products data

export default function Appraiser() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const tableHoverBg = useColorModeValue("gray.100", "gray.600");

  const [products, setProducts] = useState(unapprovedProducts);

  const approveProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, approved: true, status: "live" } : product
      )
    );
  };

  const rejectProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

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
                <Th>Category</Th>
                <Th>Seller Name</Th>
                <Th>Appraiser</Th>
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
                    />
                  </Td>
                  <Td>{product.name}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.sellerName}</Td>
                  <Td>{product.appraiser}</Td>
                  <Td>
                    <Flex gap="10px">
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => approveProduct(product.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => rejectProduct(product.id)}
                      >
                        Reject
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
