// File: src/components/calendar/MiniCalendar.js

import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
  IconButton,
  Button,
  HStack,
  Badge,
  Avatar,
  Divider,
  useTheme,
  useDisclosure,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AddIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  differenceInCalendarWeeks,
} from 'date-fns';
import { v4 as uuidv4 } from 'uuid'; // For unique job IDs
import { useNavigate } from 'react-router-dom';
import EventDetailsSidebar from './EventDetailsSidebar';
import NewEventSidebar from './NewEventSidebar';
import PropTypes from 'prop-types';
import { useToast } from '@chakra-ui/react';
import axios from 'axios'; // For API requests

function MiniCalendar({ initialEvents = [] }) {
  const theme = useTheme(); // Access the theme
  const navigate = useNavigate(); // Initialize navigate
  const toast = useToast(); // Initialize toast

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the event to display

  // Use Chakra UI's useDisclosure for Event Details Sidebar
  const {
    isOpen: isEventDetailsOpen,
    onOpen: onEventDetailsOpen,
    onClose: onEventDetailsClose,
  } = useDisclosure();

  // Use Chakra UI's useDisclosure for New Event Sidebar
  const {
    isOpen: isNewEventOpen,
    onOpen: onNewEventOpen,
    onClose: onNewEventClose,
  } = useDisclosure();

  const [newEventData, setNewEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    address: '',
    shopName: '',
    status: 'Pending', // Default status
  });

  // Use theme colors
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('blue.50', 'blue.700'); // Changed hover color for better contrast
  const modalBg = useColorModeValue('white', 'gray.800');

  // Access theme's primary color (adjust 'brand' to your theme's color key)
  const primaryColor = theme.colors.brand ? 'brand' : 'blue';

  // Event colors using theme's primary color
  const eventBg = useColorModeValue(`${primaryColor}.500`, `${primaryColor}.300`);
  const eventTextColor = useColorModeValue('white', 'gray.800');
  const todayBg = useColorModeValue(`${primaryColor}.100`, `${primaryColor}.900`);

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Handle date click
  const onDateClick = (day) => {
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.date), day)
    );

    if (dayEvents.length > 0) {
      setSelectedEvent(dayEvents[0]); // For simplicity, select the first event
      onEventDetailsOpen();
    }
  };

  // Handle input changes for new event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventData({ ...newEventData, [name]: value });
  };

  // Handle location access with reverse geocoding
  const handleLocationAccess = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_API_KEY`
            );
            if (response.data.status === 'OK') {
              const address = response.data.results[0]?.formatted_address || 'Unknown Location';
              setNewEventData((prevData) => ({
                ...prevData,
                address: address,
              }));
            } else {
              toast({
                title: 'Location Error',
                description: 'Unable to retrieve address from coordinates.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            toast({
              title: 'Error',
              description: 'An error occurred while fetching the address.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        },
        (error) => {
          console.error('Error accessing location:', error);
          toast({
            title: 'Location Access Denied',
            description: 'Unable to retrieve your location.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      toast({
        title: 'Geolocation Unsupported',
        description: 'Geolocation is not supported by your browser.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Save new event
  const handleSaveEvent = (values) => {
    const { title, date, time, shopName, address, status, description } = values;

    const newEvent = {
      title,
      date, // 'YYYY-MM-DD' format
      time, // 'HH:MM' format
      description,
      jobId: uuidv4(), // Generate a unique jobId
      customerName: 'N/A', // Placeholder, can be modified as needed
      address,
      shopName,
      status,
    };
    setEvents([...events, newEvent]);
    setNewEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      address: '',
      shopName: '',
      status: 'Pending',
    });
    onNewEventClose();

    toast({
      title: 'Event Created',
      description: 'Your event has been successfully created.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  // Render header with month navigation
  const renderHeader = () => {
    return (
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={prevMonth}
          variant="ghost"
          aria-label="Previous Month"
        />
        <Text fontSize="2xl" fontWeight="bold">
          {format(currentMonth, 'MMMM yyyy')}
        </Text>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={nextMonth}
          variant="ghost"
          aria-label="Next Month"
        />
      </Flex>
    );
  };

  // Render days of the week
  const renderDays = () => {
    const days = [];
    const dateFormat = 'E';
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <Box key={i} textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            {format(addDays(startDate, i), dateFormat)}
          </Text>
        </Box>
      );
    }
    return (
      <Grid templateColumns="repeat(7, 1fr)" mb={2}>
        {days}
      </Grid>
    );
  };

  // Render the cells of the calendar
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    const numberOfWeeks = differenceInCalendarWeeks(endDate, startDate) + 1;

    for (let w = 0; w < numberOfWeeks; w++) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;

        const dayEvents = events.filter((event) =>
          isSameDay(new Date(event.date), day)
        );

        days.push(
          <GridItem
            key={day.toString()}
            p={2}
            borderWidth="1px"
            borderColor={borderColor}
            bg={isSameDay(day, new Date()) ? todayBg : 'transparent'}
            color={isSameMonth(day, monthStart) ? textColor : 'gray.500'}
            cursor={dayEvents.length > 0 ? "pointer" : "default"}
            _hover={dayEvents.length > 0 ? { bg: hoverBg } : {}}
            onClick={() => dayEvents.length > 0 && onDateClick(cloneDay)}
            minH="80px"
          >
            <Flex direction="column" h="100%">
              <Text fontSize="sm" mb={1}>
                {format(day, 'd')}
              </Text>
              {dayEvents.slice(0, 2).map((event, index) => (
                <HStack key={index} spacing={1} mb={1}>
                  <InfoIcon w={3} h={3} color="teal.500" />
                  <Text fontSize="xs" isTruncated>
                    {event.title}
                  </Text>
                </HStack>
              ))}
              {dayEvents.length > 2 && (
                <Text fontSize="xs" color="gray.500">
                  +{dayEvents.length - 2} more
                </Text>
              )}
            </Flex>
          </GridItem>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Grid templateColumns="repeat(7, 1fr)" key={day.toString()}>
          {days}
        </Grid>
      );
      days = [];
    }
    return <Box>{rows}</Box>;
  };

  return (
    <Box bg={bg} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor} position="relative">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Add Event Button */}
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="solid"
        position="fixed"
        bottom="20px"
        right="20px"
        onClick={onNewEventOpen}
        aria-label="Add New Event"
      >
        Add Event
      </Button>

      {/* Event Details Sidebar */}
      <EventDetailsSidebar
        isOpen={isEventDetailsOpen}
        onClose={onEventDetailsClose}
        event={selectedEvent}
      />

      {/* New Event Sidebar */}
      <NewEventSidebar
        isOpen={isNewEventOpen}
        onClose={onNewEventClose}
        onSave={handleSaveEvent}
        handleLocationAccess={handleLocationAccess}
      />
    </Box>
  );
}

MiniCalendar.propTypes = {
  initialEvents: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      customerName: PropTypes.string,
      shopName: PropTypes.string,
      address: PropTypes.string,
      status: PropTypes.string,
      description: PropTypes.string,
      avatarUrl: PropTypes.string, // Optional
    })
  ),
};

export default MiniCalendar;
