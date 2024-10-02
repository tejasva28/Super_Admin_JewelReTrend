import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  HStack,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/Product_card";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // New: Declare color values outside the map function
  const tableHeaderBg = useColorModeValue("gray.50", "gray.700");
  const tableHoverBg = useColorModeValue("gray.100", "gray.600");
  const textColorSecondary = useColorModeValue("gray.600", "gray.400");

  // Sample product data
  const products = [
    {
      name: 'Apple MacBook Pro 17"',
      color: "Silver",
      category: "Laptop",
      price: "$2999",
    },
    {
      name: "Microsoft Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: "$1999",
    },
    {
      name: "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      name: "Apple Watch",
      color: "Black",
      category: "Watches",
      price: "$199",
    },
    {
      name: "Apple iMac",
      color: "Silver",
      category: "PC",
      price: "$2999",
    },
    {
      name: "Apple AirPods",
      color: "White",
      category: "Accessories",
      price: "$399",
    },
    {
      name: "iPad Pro",
      color: "Gold",
      category: "Tablet",
      price: "$699",
    },
    {
      name: "Magic Keyboard",
      color: "Black",
      category: "Accessories",
      price: "$99",
    },
    {
      name: "Smart Folio iPad Air",
      color: "Blue",
      category: "Accessories",
      price: "$79",
    },
    {
      name: "AirTag",
      color: "Silver",
      category: "Accessories",
      price: "$29",
    },
  ];

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
       {/* Projects Table */}
       <Card>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg={tableHeaderBg}>
              <Tr>
                <Th p={4}>
                  <Checkbox />
                </Th>
                <Th>Product Name</Th>
                <Th>Color</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product, index) => (
                <Tr
                  key={index}
                  _hover={{ bg: tableHoverBg }}
                >
                  <Td p={4}>
                    <Checkbox />
                  </Td>
                  <Td fontWeight="bold">{product.name}</Td>
                  <Td>{product.color}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.price}</Td>
                  <Td>
                    <Button variant="link" colorScheme="blue" size="sm">
                      Edit
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
                1000
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
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        
        {/* Left Column */}
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          {/* <Banner /> */}
          <Flex direction="column" >
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >

              {/* <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  href="#art"
                >
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  href="#music"
                >
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  href="#collectibles"
                >
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight="500" href="#sports">
                  Sports
                </Link>
              </Flex> */}
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 4 }} gap="20px" minChildWidth="200px">
              <NFT
                name="Abstract Colors"
                author="By Esthera Jackson"
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Nft1}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                name="ETH AI Brain"
                author="By Nick Wilson"
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Nft2}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                name="Mesh Gradients"
                author="By Will Smith"
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Nft3}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                name="Mesh Gradients"
                author="By Will Smith"
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Nft3}
                currentbid="0.91 ETH"
                download="#"
              />
            </SimpleGrid>

            <Text
              mt="45px"
              mb="36px"
              color={textColor}
              fontSize="2xl"
              ms="24px"
              fontWeight="700"
            >
              Recently Added
            </Text>
            <SimpleGrid columns={{ base: 1, md: 4 }} gap="20px">
              <NFT
                name="Ring"
                author="By Peter Will"
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Nft4}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                name="Colorful Heaven"
                author="By Mark Benjamin"
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Nft5}
                currentbid="0.91 ETH"
                download="#"
              />
              <NFT
                name="3D Cubes Art"
                author="By Manny Gates"
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                image={Nft6}
                currentbid="0.91 ETH"
                download="#"
              />
            </SimpleGrid>
          </Flex>
        </Flex>

        {/* Right Column */}
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          {/* <Card px="0px" mb="20px">
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card> */}
          {/* <Card p="0px">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-between"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text color={textColor} fontSize="xl" fontWeight="600">
                History
              </Text>
              <Button variant="action">See all</Button>
            </Flex>

            <HistoryItem
              name="Colorful Heaven"
              author="By Mark Benjamin"
              date="30s ago"
              image={Nft5}
              price="0.91 ETH"
            />
            <HistoryItem
              name="Abstract Colors"
              author="By Esthera Jackson"
              date="58s ago"
              image={Nft1}
              price="0.91 ETH"
            />
            <HistoryItem
              name="ETH AI Brain"
              author="By Nick Wilson"
              date="1m ago"
              image={Nft2}
              price="0.91 ETH"
            />
            <HistoryItem
              name="Swipe Circles"
              author="By Peter Will"
              date="1m ago"
              image={Nft4}
              price="0.91 ETH"
            />
            <HistoryItem
              name="Mesh Gradients"
              author="By Will Smith"
              date="2m ago"
              image={Nft3}
              price="0.91 ETH"
            />
            <HistoryItem
              name="3D Cubes Art"
              author="By Manny Gates"
              date="3m ago"
              image={Nft6}
              price="0.91 ETH"
            />
          </Card> */}
        </Flex>
      </Grid>

     
    </Box>
  );
}
