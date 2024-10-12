// File: src/views/admin/calendar/CalendarPage.js

import React from 'react';
import MiniCalendar from 'components/calendar/MiniCalendar';
import { Box, Heading, Text, Stack, useColorModeValue } from '@chakra-ui/react';
import { format, isAfter, isSameDay } from 'date-fns';

function CalendarPage() {
  const events = [
    {
      date: '2024-10-15',
      title: 'Meeting with Team',
      description: 'Discuss project progress',
    },
    {
      date: '2024-10-18',
      title: 'Project Deadline',
      description: 'Submit final report',
    },
    // Add more events as needed
  ];

  // Use the hook at the top level
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  // Filter events to include only today's and future events
  const today = new Date();
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return isSameDay(eventDate, today) || isAfter(eventDate, today);
  });

  return (
    <>
      <Box p={8} borderRadius="lg" maxW="container.xl" mx="auto" mt={10} bg={bgColor}>
        {/* MiniCalendar Component */}
        <MiniCalendar initialEvents={events} />

        {/* Event Log */}
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Upcoming Events
          </Heading>
          {upcomingEvents.length === 0 ? (
            <Text>No upcoming events.</Text>
          ) : (
            <Stack spacing={4}>
              {upcomingEvents.map((event, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg={bgColor} // Use the bgColor here
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {event.title}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {format(new Date(event.date), 'PPPP')}
                  </Text>
                  <Text mt={2}>{event.description}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CalendarPage;
