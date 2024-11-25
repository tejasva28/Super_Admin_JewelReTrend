// File: src/components/OrderNotifications.js

import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const OrderNotifications = ({ isOpen, onClose, notifications }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  // Ensure notifications is an array
  const notificationsArray = Array.isArray(notifications) ? notifications : [];

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerCloseButton />
        <DrawerHeader>Order Notifications</DrawerHeader>

        <DrawerBody>
          {notificationsArray.length === 0 ? (
            <Text color={secondaryTextColor}>No notifications for this order.</Text>
          ) : (
            <VStack align="start" spacing="4">
              {notificationsArray
                .slice()
                .reverse() // Show latest notifications first
                .map((notification, index) => (
                  <HStack key={index} align="start">
                    <Icon
                      as={FaInfoCircle}
                      color={
                        notification.type === 'success'
                          ? 'green.500'
                          : notification.type === 'error'
                          ? 'red.500'
                          : 'blue.500'
                      }
                      mt="1"
                    />
                    <VStack align="start" spacing="1">
                      <Text color={textColor}>{notification.message}</Text>
                      <Text fontSize="sm" color={secondaryTextColor}>
                        {new Date(notification.timestamp).toLocaleString()}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

OrderNotifications.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      type: PropTypes.string, // Optional: 'success', 'error', 'info'
    })
  ).isRequired,
};

OrderNotifications.defaultProps = {
  notifications: [],
};

export default OrderNotifications;
