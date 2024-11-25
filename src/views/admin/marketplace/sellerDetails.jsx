import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Badge,
  Divider,
  Grid,
  Button,
  Flex,
  Icon,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle, FaSave, FaEdit } from "react-icons/fa";
import ColumnChart from "../marketplace/components/ColumnChart";
import sellersData from "./variables/sellersData"; // Import the dummy data

export default function SellerDetails() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [sellerDetails, setSellerDetails] = useState(null);
  // const [loading, setLoading] = useState(true); // Optional: Remove loading state if not needed

  // Add the Chakra Color Mode variables
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue("md", "dark-lg");

  // Fetch seller details from the dummy data
  useEffect(() => {
    // Comment out the API call
    // fetch(`/api/sellers/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setSellerDetails(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching seller details:", error);
    //     setLoading(false);
    //   });

    // Use the dummy data instead
    const seller = sellersData[id]; // 'id' should correspond to the index
    setSellerDetails(seller);
    // setLoading(false); // Optional: Remove if not using loading state
  }, [id]);

  // Optional: Remove loading check if not needed
  // if (loading) {
  //   return (
  //     <Container maxW="container.md" py="6" pt="24">
  //       <Text fontSize="xl">Loading...</Text>
  //     </Container>
  //   );
  // }

  if (!sellerDetails) {
    return (
      <Container maxW="container.md" py="6" pt="24">
        <Text fontSize="xl" color="red.500">
          Seller not found.
        </Text>
      </Container>
    );
  }

  // Chart Data and Options for Monthly Sales
  const chartData = [
    {
      name: "Monthly Sales",
      data: sellerDetails.monthlySales,
    },
  ];

  const chartOptions = {
    chart: {
      id: "monthly-sales-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["January", "February", "March", "April"],
      title: {
        text: "Months",
      },
    },
    yaxis: {
      title: {
        text: "Sales (INR)",
      },
    },
    title: {
      text: "Monthly Sales (INR)",
      align: "left",
    },
    colors: ["#3182CE"], // Blue color for bars
  };

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Toggle between edit and save mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Container maxW="container.xl" py="6" pt="24">
      <Stack spacing="8">
        {/* Header Section */}
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="2xl" color={textColor}>
            {isEditing ? (
              <Input
                value={sellerDetails.name}
                name="name"
                onChange={handleChange}
                size="lg"
                color={textColor}
              />
            ) : (
              `${sellerDetails.name} - ${sellerDetails.shopName}`
            )}
          </Heading>
          <Button
            colorScheme={isEditing ? "green" : "blue"}
            size="lg"
            variant="solid"
            leftIcon={isEditing ? <FaSave /> : <FaEdit />}
            onClick={toggleEdit}
          >
            {isEditing ? "Save Changes" : "Edit Seller Details"}
          </Button>
        </Flex>

        <Divider />

        {/* General and Seller Details */}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "2fr 1fr" }}
          gap="6"
        >
          {/* General Information Card */}
          <Box borderWidth="1px" borderRadius="lg" p="6">
            <Heading as="h2" size="lg" mb="4" color={textColor}>
              Seller Information
            </Heading>
            <Stack spacing="3">
              <Text>
                <strong>Category:</strong>{" "}
                {isEditing ? (
                  <Input
                    value={sellerDetails.category}
                    name="category"
                    onChange={handleChange}
                  />
                ) : (
                  sellerDetails.category
                )}
              </Text>
              <Text>
                <strong>Address:</strong>{" "}
                {isEditing ? (
                  <Textarea
                    value={sellerDetails.address}
                    name="address"
                    onChange={handleChange}
                  />
                ) : (
                  sellerDetails.address
                )}
              </Text>
              <Text>
                <strong>Pin Code:</strong>{" "}
                {isEditing ? (
                  <Input
                    value={sellerDetails.pinCode}
                    name="pinCode"
                    onChange={handleChange}
                  />
                ) : (
                  sellerDetails.pinCode
                )}
              </Text>
              <Text>
                <strong>GST No:</strong>{" "}
                {isEditing ? (
                  <Input
                    value={sellerDetails.gstNo}
                    name="gstNo"
                    onChange={handleChange}
                  />
                ) : (
                  sellerDetails.gstNo
                )}
              </Text>
              <Text>
                <strong>Verified:</strong>{" "}
                {sellerDetails.verified ? (
                  <Badge colorScheme="green" fontSize="lg">
                    <Icon as={FaCheckCircle} mr="2" />
                    Verified
                  </Badge>
                ) : (
                  <Badge colorScheme="red" fontSize="lg">
                    <Icon as={FaTimesCircle} mr="2" />
                    Not Verified
                  </Badge>
                )}
              </Text>
            </Stack>
          </Box>

          {/* Monthly Sales Bar Chart Card */}
          <Box borderWidth="1px" borderRadius="lg" p="6">
            <Heading as="h2" size="lg" mb="4" color={textColor}>
              Monthly Sales Overview
            </Heading>
            <ColumnChart chartData={chartData} chartOptions={chartOptions} />
          </Box>
        </Grid>

        <Divider />

        {/* Product Information */}
        <Box borderWidth="1px" borderRadius="lg" p="6">
          <Heading as="h2" size="lg" mb="4" color={textColor}>
            Product Details
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            gap="6"
          >
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Live Products
              </Text>
              {isEditing ? (
                <Input
                  value={sellerDetails.liveProducts}
                  name="liveProducts"
                  onChange={handleChange}
                />
              ) : (
                <Text fontSize="2xl" color="teal.500">
                  {sellerDetails.liveProducts}
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Total Products
              </Text>
              {isEditing ? (
                <Input
                  value={sellerDetails.totalProducts}
                  name="totalProducts"
                  onChange={handleChange}
                />
              ) : (
                <Text fontSize="2xl" color="teal.500">
                  {sellerDetails.totalProducts}
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="xl" fontWeight="bold">
                GST Number
              </Text>
              <Text fontSize="2xl" color="teal.500">
                {sellerDetails.gstNo}
              </Text>
            </Box>

            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Verified Status
              </Text>
              <Text
                fontSize="2xl"
                color={sellerDetails.verified ? "green.500" : "red.500"}
              >
                {sellerDetails.verified ? "Verified" : "Not Verified"}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                JRT Special
              </Text>
              <Text
                fontSize="2xl"
                color={sellerDetails.isJRTSpecial ? "green.500" : "red.500"}
              >
                {sellerDetails.isJRTSpecial ? "Special" : "Normal"}
              </Text>
            </Box>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}
