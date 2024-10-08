import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  return (
    <Card
      mb={{ base: "0px", lg: "20px" }}
      align="center"
      w="100%"
      maxW="100%"
      mx="auto"
      p="0"
      overflow="hidden"
    >
      {/* Banner Background */}
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        bgPosition="center"
        borderRadius="16px 16px 0 0"
        h="180px"
        w="100%"
      />

      {/* Avatar - Centered */}
      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
        zIndex="1"
        position="relative"
      />

      {/* Name and Job */}
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {job}
      </Text>

      {/* Stats (Posts, Followers, Following) */}
      <Flex justify="space-around" w="100%" mt="26px" px="20px">
        <Flex align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {posts}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Posts
          </Text>
        </Flex>
        <Flex align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {followers}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Followers
          </Text>
        </Flex>
        <Flex align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {following}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Following
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
