// File: src/components/MiniCalendar.js

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Textarea,
  Stack,
  useTheme, // Import useTheme
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AddIcon,
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
} from 'date-fns';

function MiniCalendar({ initialEvents = [] }) {
  const theme = useTheme(); // Access the theme

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(initialEvents);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '',
    description: '',
  });

  // Use theme colors
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
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
    setSelectedDate(day);
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.date), day)
    );
    setSelectedDateEvents(dayEvents);
    setIsEventModalOpen(true);
  };

  // Handle input changes for new event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventData({ ...newEventData, [name]: value });
  };

  // Save new event
  const handleSaveEvent = () => {
    if (newEventData.title.trim() === '') {
      // Optionally show a validation message
      return;
    }
    const newEvent = {
      title: newEventData.title,
      date: selectedDate,
      description: newEventData.description,
    };
    setEvents([...events, newEvent]);
    setNewEventData({ title: '', description: '' });
    setIsNewEventModalOpen(false);
    setIsEventModalOpen(false);
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

    while (day <= endDate) {
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
            cursor="pointer"
            _hover={{ bg: hoverBg }}
            onClick={() => onDateClick(cloneDay)}
            minH="80px"
          >
            <Flex direction="column" h="100%">
              <Text fontSize="sm" mb={1}>
                {format(day, 'd')}
              </Text>
              {dayEvents.slice(0, 2).map((event, index) => (
                <Box
                  key={index}
                  bg={eventBg}
                  color={eventTextColor}
                  px={2}
                  py={1}
                  borderRadius="md"
                  mb={1}
                  fontSize="xs"
                  isTruncated
                >
                  {event.title}
                </Box>
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
    <Box bg={bg} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Event Details Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        size="md"
      >
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>
            {selectedDate
              ? format(selectedDate, 'do MMMM yyyy')
              : 'Select a Date'}
            <Button
              leftIcon={<AddIcon />}
              colorScheme={primaryColor}
              variant="solid"
              size="sm"
              ml={4}
              onClick={() => {
                setIsNewEventModalOpen(true);
              }}
            >
              Add Event
            </Button>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDateEvents.length === 0 ? (
              <Text>No events for this day.</Text>
            ) : (
              selectedDateEvents.map((event, index) => (
                <Box key={index} mb={4}>
                  <Text fontWeight="bold" fontSize="lg">
                    {event.title}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {format(new Date(event.date), 'PPPP')}
                  </Text>
                  <Text mt={2}>{event.description}</Text>
                </Box>
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsEventModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* New Event Modal */}
      <Modal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        size="md"
      >
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input
                placeholder="Event Title"
                name="title"
                value={newEventData.title}
                onChange={handleInputChange}
              />
              <Textarea
                placeholder="Event Description"
                name="description"
                value={newEventData.description}
                onChange={handleInputChange}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={primaryColor} mr={3} onClick={handleSaveEvent}>
              Save
            </Button>
            <Button onClick={() => setIsNewEventModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MiniCalendar;
