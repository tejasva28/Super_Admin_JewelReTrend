// File: src/components/calendar/NewEventSidebar.js

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
  Input,
  Textarea,
  Select,
  Stack,
  FormControl,
  FormLabel,
  Flex,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

function NewEventSidebar({ isOpen, onClose, onSave, handleLocationAccess }) {
  const headerBg = useColorModeValue('teal.500', 'teal.700');
  const headerTextColor = useColorModeValue('white', 'white');
  const bodyBg = useColorModeValue('gray.50', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.600');
  const buttonBg = useColorModeValue('teal.500', 'teal.600');
  const buttonHoverBg = useColorModeValue('teal.600', 'teal.700');

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      title: '',
      date: '',
      time: '',
      shopName: '',
      address: '',
      status: 'Pending',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Event Title is required'),
      date: Yup.date()
        .required('Date is required'),
      time: Yup.string()
        .required('Time is required'),
      shopName: Yup.string()
        .required('Shop Name is required'),
      address: Yup.string()
        .required('Address is required'),
      status: Yup.string()
        .oneOf(['Pending', 'Completed'])
        .required('Status is required'),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
      returnFocusOnClose={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader bg={headerBg} color={headerTextColor} borderBottomWidth="1px">
          Add New Event
        </DrawerHeader>

        <DrawerBody bg={bodyBg}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} p={4}>
              <FormControl isRequired isInvalid={formik.touched.title && formik.errors.title}>
                <FormLabel>Event Title</FormLabel>
                <Input
                  placeholder="Event Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  bg={inputBg}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.500') }}
                />
                <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={formik.touched.date && formik.errors.date}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  bg={inputBg}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.500') }}
                />
                <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={formik.touched.time && formik.errors.time}>
                <FormLabel>Time</FormLabel>
                <Input
                  type="time"
                  name="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  bg={inputBg}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.500') }}
                />
                <FormErrorMessage>{formik.errors.time}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={formik.touched.shopName && formik.errors.shopName}>
                <FormLabel>Shop Name</FormLabel>
                <Input
                  placeholder="Shop Name"
                  name="shopName"
                  value={formik.values.shopName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  bg={inputBg}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.500') }}
                />
                <FormErrorMessage>{formik.errors.shopName}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={formik.touched.address && formik.errors.address}>
                <FormLabel>Address</FormLabel>
                <Flex>
                  <Input
                    placeholder="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    bg={inputBg}
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.500') }}
                  />
                  <Button
                    ml={2}
                    onClick={handleLocationAccess}
                    colorScheme="teal"
                    aria-label="Get Current Location"
                    bg={buttonBg}
                    _hover={{ bg: buttonHoverBg }}
                  >
                    Get Location
                  </Button>
                </Flex>
                <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={formik.touched.status && formik.errors.status}>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  bg={inputBg}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.500') }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Select>
                <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Event Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  bg={inputBg}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.500') }}
                />
              </FormControl>
            </Stack>
          </form>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button
            colorScheme="teal"
            onClick={formik.handleSubmit}
            mr={3}
            aria-label="Save New Event"
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            aria-label="Cancel Adding Event"
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

NewEventSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  handleLocationAccess: PropTypes.func.isRequired,
};

export default NewEventSidebar;
