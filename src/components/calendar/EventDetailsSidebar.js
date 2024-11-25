// File: src/components/calendar/EventDetailsSidebar.js

import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Badge,
  Avatar,
  Text,
  Divider,
  useColorModeValue,
  Box,
  Icon,
  Stack,
} from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  PhoneIcon,
  EmailIcon,
  EditIcon,
  CalendarIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location icon
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function EventDetailsSidebar({ isOpen, onClose, event }) {
  const navigate = useNavigate();

  // Color mode values for light and dark themes
  const headerBg = useColorModeValue('blue.600', 'blue.900');
  const bodyBg = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.400');

  if (!event) {
    return null; // Prevent rendering if event is null
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader bg={headerBg} color="white" borderBottomWidth="1px">
          Event Details
        </DrawerHeader>

        <DrawerBody bg={bodyBg}>
          <VStack align="stretch" spacing={6}>
            {/* Header Section */}
            <HStack spacing={4}>
              <Avatar
                size="xl"
                name={event.customerName}
                src={event.avatarUrl || 'https://bit.ly/broken-link'}
              />
              <Box flex="1">
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  {event.title}
                </Text>
                <HStack mt={2} color={subTextColor}>
                  <CalendarIcon />
                  <Text fontSize="md">
                    {format(new Date(event.date), 'PPPP')} at {event.time}
                  </Text>
                </HStack>
              </Box>
            </HStack>

            <Divider />

            {/* Status and Description */}
            <Box>
              <HStack justifyContent="space-between" align="center">
                <Text fontSize="lg" fontWeight="semibold">
                  Status
                </Text>
                <Badge
                  colorScheme={
                    event.status === 'Completed'
                      ? 'green'
                      : event.status === 'In Progress'
                      ? 'yellow'
                      : 'red'
                  }
                  fontSize="1em"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {event.status}
                </Badge>
              </HStack>
              {event.description && (
                <Box mt={4}>
                  <Text fontSize="lg" fontWeight="semibold" mb={2}>
                    Description
                  </Text>
                  <Text fontSize="md" color={textColor}>
                    {event.description}
                  </Text>
                </Box>
              )}
            </Box>

            <Divider />

            {/* Customer Information */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Customer Information
              </Text>
              <Stack spacing={3}>
                {event.customerName && (
                  <HStack>
                    <Icon as={InfoIcon} color="gray.500" />
                    <Text fontSize="md">{event.customerName}</Text>
                  </HStack>
                )}
                {event.customerPhone && (
                  <HStack>
                    <PhoneIcon color="gray.500" />
                    <Text fontSize="md">{event.customerPhone}</Text>
                  </HStack>
                )}
                {event.customerEmail && (
                  <HStack>
                    <EmailIcon color="gray.500" />
                    <Text fontSize="md">{event.customerEmail}</Text>
                  </HStack>
                )}
              </Stack>
            </Box>

            <Divider />

            {/* Shop Information */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Shop Details
              </Text>
              <Stack spacing={3}>
                {event.shopName && (
                  <HStack>
                    <Icon as={InfoIcon} color="gray.500" />
                    <Text fontSize="md">{event.shopName}</Text>
                  </HStack>
                )}
                {event.address && (
                  <HStack>
                    <Icon as={FaMapMarkerAlt} color="gray.500" /> {/* Use the imported icon */}
                    <Text fontSize="md">{event.address}</Text>
                  </HStack>
                )}
              </Stack>
            </Box>
          </VStack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button
            colorScheme="blue"
            leftIcon={<ExternalLinkIcon />}
            onClick={() => navigate(`/job-details/${event.jobId}`)}
            mr={3}
            aria-label={`View detailed page for job ${event.jobId}`}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            leftIcon={<EditIcon />}
            onClick={() => navigate(`/edit-job/${event.jobId}`)}
            aria-label={`Edit job ${event.jobId}`}
          >
            Edit
          </Button>
          <Button variant="ghost" onClick={onClose} ml={2}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

EventDetailsSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    jobId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    customerName: PropTypes.string,
    customerEmail: PropTypes.string,
    customerPhone: PropTypes.string,
    shopName: PropTypes.string,
    address: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

export default EventDetailsSidebar;
