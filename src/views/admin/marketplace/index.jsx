import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Badge,
  HStack,
  Text,
  useColorModeValue,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import Card from "components/card/Card.js";
import AddSellerForm from "./components/AddSeller"; // Import the new form component
import sellersData from "./variables/sellersData"; // Import the dummy data

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("gray.600", "gray.400");
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const tableHoverBg = useColorModeValue("gray.100", "gray.600");

  // Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for sellers data and loading status
  const [sellersDataState, setSellersDataState] = useState([]);

  // Fetch sellers data from the dummy data
  useEffect(() => {
    // Comment out the API call
    // fetch("/api/sellers")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setSellersData(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching sellers data:", error);
    //     setLoading(false);
    //   });

    // Use the dummy data instead
    setSellersDataState(sellersData);
  }, []);

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Sellers Table */}
      <Card>
        <Box overflowX="auto">
          <Table variant="simple" fontSize="16px">
            <Thead bg={tableHeaderBg}>
              <Tr>
                <Th p={4}>
                  <Checkbox />
                </Th>
                <Th>Name</Th>
                <Th>Shop Name</Th>
                <Th>Category</Th>
                <Th>Pin Code</Th>
                {/* <Th>JRT Special</Th> */}
                <Th>Verified</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sellersDataState.map((seller, index) => (
                <Tr key={index} _hover={{ bg: tableHoverBg }}>
                  <Td p={4}>
                    <Checkbox />
                  </Td>
                  <Td fontWeight="bold">{seller.name}</Td>
                  <Td>{seller.shopName}</Td>
                  <Td>{seller.category}</Td>
                  <Td>{seller.pinCode}</Td>
                  {/* <Td>
                    {seller.isJRTSpecial ? (
                      <Badge colorScheme="yellow">Special</Badge>
                    ) : (
                      <Badge colorScheme="gray">Normal</Badge>
                    )}
                  </Td> */}
                  <Td>
                    {seller.verified ? (
                      <Badge colorScheme="green">Verified</Badge>
                    ) : (
                      <Badge colorScheme="red">Not Verified</Badge>
                    )}
                  </Td>
                  <Td>
                    <Button
                      as={RouterLink}
                      to={`/seller/${index}`}
                      variant="link"
                      colorScheme="blue"
                      size="sm"
                    >
                      View Details
                    </Button>
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
            <Text
              fontSize="sm"
              color={textColorSecondary}
              mb={{ base: 4, md: 0 }}
            >
              Showing{" "}
              <Text as="span" fontWeight="bold">
                1-10
              </Text>{" "}
              of{" "}
              <Text as="span" fontWeight="bold">
                {sellersDataState.length}
              </Text>
            </Text>
            <HStack spacing={2}>
              <Button size="sm" variant="outline" disabled>
                Previous
              </Button>
              <Button size="sm" variant="solid">
                1
              </Button>
              <Button size="sm" variant="outline">
                2
              </Button>
              <Button size="sm" variant="outline">
                3
              </Button>
              <Button size="sm" variant="outline">
                Next
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Card>


      {/* Add Seller Modal */}
      <AddSellerForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
