// File: src/views/admin/sessions/SessionsPage.js

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  IconButton,
  useColorModeValue,
  Badge,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import {
  MdDevices,
  MdLocationOn,
  MdAccessTime,
  MdPowerSettingsNew,
  MdInfoOutline,
} from 'react-icons/md';
import sessions from '../sessions/sessionData';

function SessionsPage() {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box p={8} borderRadius="lg" maxW="container.md" mx="auto" mt={10}>
      <Heading size="lg" mb={6}>
        Active Sessions
      </Heading>
      <Stack spacing={4}>
        {sessions.map((session) => (
          <Box
            key={session.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg={bgColor}
            borderColor={borderColor}
            shadow="sm"
            position="relative"
          >
            {session.current && (
              <Badge
                position="absolute"
                top={2}
                right={2}
                colorScheme="green"
                variant="solid"
              >
                Current Session
              </Badge>
            )}
            <Stack direction="row" alignItems="center" spacing={4}>
              <Avatar
                icon={<MdDevices fontSize="1.5rem" />}
                bg="teal.500"
                color="white"
              />
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  {session.deviceName}
                </Text>
                <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                  <MdLocationOn color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {session.location}
                  </Text>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                  <MdAccessTime color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    Last active: {session.lastActive}
                  </Text>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                  <MdInfoOutline color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    IP: {session.ipAddress} &bull; Browser: {session.browser}
                  </Text>
                </Stack>
              </Box>
              {!session.current && (
                <Tooltip label="Log out of this session">
                  <IconButton
                    icon={<MdPowerSettingsNew />}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => {
                      // Handle log out from this session
                    }}
                    aria-label="Log out"
                  />
                </Tooltip>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
      <Box textAlign="center" mt={8}>
        <Button
          colorScheme="red"
          onClick={() => {
            // Handle log out from all other sessions
          }}
        >
          Log out of all other sessions
        </Button>
      </Box>
    </Box>
  );
}

export default SessionsPage;
