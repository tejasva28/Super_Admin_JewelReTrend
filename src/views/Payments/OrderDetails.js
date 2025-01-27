// File: src/views/orders/OrderDetails.js

import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Badge,
  VStack,
  HStack,
  Container,
  Divider,
  Heading,
  Icon,
  useColorModeValue,
  useToast,
  Spinner,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Circle,
  Center,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaUser,
  FaInfoCircle,
  FaBoxOpen,
  FaShippingFast,
  FaMoneyBillWave,
  FaDownload,
  FaEnvelope,
} from 'react-icons/fa';
import { OrdersContext } from './components/PaymentContext';

export default function OrderDetails() {
  // Extract `orderId` from URL Parameters
  const { orderId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // Chakra UI Modal Controls
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define Color Modes for Styling
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.800');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const inputBg = useColorModeValue('gray.100', 'gray.700');

  // Define Badge Colors Based on Order Status
  const badgeColorScheme = {
    Pending: 'yellow',
    Accepted: 'blue',
    'Handed Over': 'orange',
    Appraised: 'teal',
    Shipped: 'cyan',
    Delivered: 'green',
    Cancelled: 'red',
    Rejected: 'red',
  };

  // Consume OrdersContext to Access Orders Data and Functions
  const { ordersData, updateOrderStatus, loading } = useContext(OrdersContext);

  // Local State to Manage Order Status
  const [status, setStatus] = useState('Pending');

  // Local State for Feedback Form
  const [feedback, setFeedback] = useState('');
  const [feedbackError, setFeedbackError] = useState('');

  // Order Statuses for the Stepper
  const statuses = [
    { label: 'Pending', icon: FaInfoCircle },
    { label: 'Accepted', icon: FaCheckCircle },
    { label: 'Handed Over', icon: FaBoxOpen },
    { label: 'Appraised', icon: FaMoneyBillWave },
    { label: 'Shipped', icon: FaShippingFast },
    { label: 'Delivered', icon: FaCheckCircle },
  ];

  // Find the Specific Order Based on `orderId`
  const order = useMemo(() => {
    if (!Array.isArray(ordersData)) {
      console.warn('ordersData is not an array.');
      return null;
    }

    const foundOrder = ordersData.find(
      (o) => String(o.orderId).trim() === String(orderId).trim()
    );

    if (!foundOrder) {
      console.warn(`Order with orderId "${orderId}" not found.`);
    }

    return foundOrder || null;
  }, [ordersData, orderId]);

  // Update Local Status State When Order Data Changes
  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus || 'Pending');
    }
  }, [order]);

  // Handle Loading State
  if (loading) {
    return (
      <Container maxW="container.lg" py="6">
        <Flex
          p="6"
          bg={cardBg}
          borderRadius="md"
          shadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
          align="center"
          justify="center"
          direction="column"
        >
          <Spinner size="xl" />
          <Text mt="4">Loading order details...</Text>
        </Flex>
      </Container>
    );
  }

  // Handle Case When Order Is Not Found
  if (!order) {
    return (
      <Container maxW="container.lg" py="6">
        <Flex
          p="6"
          bg={cardBg}
          borderRadius="md"
          shadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
          align="center"
          justify="center"
          direction="column"
        >
          <Icon as={FaTimesCircle} boxSize="50px" color="red.500" />
          <Text mt="4" fontSize="lg" fontWeight="bold" color="red.500">
            Order not found.
          </Text>
        </Flex>
      </Container>
    );
  }

  // Action Handlers
  const handleAcceptOrder = () => {
    setStatus('Accepted');
    updateOrderStatus(orderId, 'Accepted');
    toast({
      title: 'Order Accepted.',
      description: 'You have accepted the order successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRejectOrder = () => {
    setStatus('Rejected');
    updateOrderStatus(orderId, 'Rejected');
    toast({
      title: 'Order Rejected.',
      description: 'You have rejected the order.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    navigate('/orders'); // Redirect to orders dashboard
  };

  const handleMarkAsHandedOver = () => {
    setStatus('Handed Over');
    updateOrderStatus(orderId, 'Handed Over');
    toast({
      title: 'Order Handed Over.',
      description: 'You have handed over the order to the dark store.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle Feedback Submission
  const handleSendFeedback = () => {
    if (feedback.trim() === '') {
      setFeedbackError('Feedback cannot be empty.');
      return;
    }

    // Placeholder for sending feedback logic
    console.log('Feedback submitted:', feedback);

    toast({
      title: 'Feedback Sent.',
      description: 'Your feedback has been sent successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Reset feedback form
    setFeedback('');
    setFeedbackError('');
    onClose();
  };

  // Determine the index of the current status
  const currentStatusIndex = statuses.findIndex((s) => s.label === status);

  return (
    <Container maxW="container.xl" py="6">
      <VStack spacing="8" align="stretch">
        {/* Top Bar with Order Details */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          bg={sectionBg}
          p="6"
          borderRadius="md"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
          flexWrap="wrap"
        >
          <HStack spacing="4">
            <Badge colorScheme={badgeColorScheme[status]} px="3" py="1" borderRadius="full">
              {status}
            </Badge>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Order #{order.orderId}
            </Text>
            <Text color="gray.500">
              Placed on: {new Date(order.orderDate).toLocaleString()}
            </Text>
          </HStack>
          <HStack spacing="4" mt={{ base: '4', md: '0' }}>
            <Button
              leftIcon={<FaDownload />}
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                // Placeholder for download invoice logic
                toast({
                  title: 'Download Invoice.',
                  description: 'Invoice download functionality not implemented yet.',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              Download Invoice
            </Button>
            <Button
              leftIcon={<FaEnvelope />}
              colorScheme="teal"
              onClick={onOpen}
            >
              Send Feedback
            </Button>
          </HStack>
        </Flex>

        {/* Progress Tracker */}
        <Box
          bg={sectionBg}
          p="6"
          borderRadius="md"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex justify="space-between" align="center" wrap="wrap" position="relative">
            {statuses.map((s, index) => (
              <Flex key={s.label} align="center" direction="column" flex="1">
                {/* Connector Line */}
                {index !== 0 && (
                  <Box
                    height="2px"
                    width="100%"
                    bg={index <= currentStatusIndex ? 'green.500' : 'gray.300'}
                    position="absolute"
                    top="20px"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex="-1"
                  />
                )}
                {/* Step Icon */}
                <Box position="relative" zIndex="1">
                  <Circle
                    size="40px"
                    bg={
                      index <= currentStatusIndex
                        ? badgeColorScheme[s.label]
                          ? `${badgeColorScheme[s.label]}.500`
                          : accentColor
                        : 'gray.300'
                    }
                    color="white"
                  >
                    <Icon as={s.icon} />
                  </Circle>
                  <Text
                    mt="2"
                    fontSize="sm"
                    textAlign="center"
                    color={index <= currentStatusIndex ? textColor : 'gray.500'}
                    fontWeight={index === currentStatusIndex ? 'bold' : 'normal'}
                  >
                    {s.label}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>

        {/* Order Information Sections */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="6">
          {/* Left Column */}
          <VStack spacing="6" align="stretch">
            {/* Customer Information */}
            <Box
              bg={cardBg}
              p="6"
              borderRadius="md"
              boxShadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Flex align="center" mb="4">
                <Icon as={FaUser} boxSize="6" color={accentColor} mr="2" />
                <Heading as="h3" size="md" color={textColor}>
                  Customer Information
                </Heading>
              </Flex>
              <VStack align="start" spacing="3">
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Name:
                  </Text>
                  <Text>{order.customerName}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Email:
                  </Text>
                  <Text>{order.customerEmail}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Phone:
                  </Text>
                  <Text>{order.customerPhone}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Billing Address:
                  </Text>
                  <Text>{order.billingAddress}</Text>
                </HStack>
              </VStack>
            </Box>

            {/* Shipping Information */}
            <Box
              bg={cardBg}
              p="6"
              borderRadius="md"
              boxShadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Flex align="center" mb="4">
                <Icon as={FaShippingFast} boxSize="6" color={accentColor} mr="2" />
                <Heading as="h3" size="md" color={textColor}>
                  Shipping Information
                </Heading>
              </Flex>
              <VStack align="start" spacing="3">
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Shipping Address:
                  </Text>
                  <Text>{order.shippingAddress}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Shipping Method:
                  </Text>
                  <Text>{order.shippingMethod}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Delivery Instructions:
                  </Text>
                  <Text>{order.deliveryInstructions || 'N/A'}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Estimated Delivery Date:
                  </Text>
                  <Text>{order.estimatedDeliveryDate}</Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>

          {/* Right Column */}
          <VStack spacing="6" align="stretch">
            {/* Payment Details */}
            <Box
              bg={cardBg}
              p="6"
              borderRadius="md"
              boxShadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Flex align="center" mb="4">
                <Icon as={FaMoneyBillWave} boxSize="6" color={accentColor} mr="2" />
                <Heading as="h3" size="md" color={textColor}>
                  Payment Details
                </Heading>
              </Flex>
              <VStack align="start" spacing="3">
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Transaction ID:
                  </Text>
                  <Text>{order.transactionId}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Payment Method:
                  </Text>
                  <Text>{order.paymentMethod}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Billing Address:
                  </Text>
                  <Text>{order.billingAddress}</Text>
                </HStack>
              </VStack>
            </Box>

            {/* Order Overview */}
            <Box
              bg={cardBg}
              p="6"
              borderRadius="md"
              boxShadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Flex align="center" mb="4">
                <Icon as={FaInfoCircle} boxSize="6" color={accentColor} mr="2" />
                <Heading as="h3" size="md" color={textColor}>
                  Order Overview
                </Heading>
              </Flex>
              <VStack align="start" spacing="3">
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Order Date:
                  </Text>
                  <Text>{new Date(order.orderDate).toLocaleString()}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="600" minW="150px">
                    Payment Status:
                  </Text>
                  <Badge colorScheme={badgeColorScheme[order.paymentStatus]}>
                    {order.paymentStatus}
                  </Badge>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Grid>

        {/* Items Ordered */}
        <Box
          bg={cardBg}
          p="6"
          borderRadius="md"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex align="center" mb="4">
            <Icon as={FaBoxOpen} boxSize="6" color={accentColor} mr="2" />
            <Heading as="h3" size="md" color={textColor}>
              Items Ordered
            </Heading>
          </Flex>
          <TableContainer>
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>SKU</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Price per Unit</Th>
                  <Th isNumeric>Total Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.items.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.productName}</Td>
                    <Td>{item.sku}</Td>
                    <Td isNumeric>{item.quantity}</Td>
                    <Td isNumeric>${item.pricePerUnit.toFixed(2)}</Td>
                    <Td isNumeric>${item.totalPrice.toFixed(2)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        {/* Order Summary */}
        <Box
          bg={sectionBg}
          p="6"
          borderRadius="md"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex align="center" mb="4">
            <Icon as={FaMoneyBillWave} boxSize="6" color={accentColor} mr="2" />
            <Heading as="h3" size="md" color={textColor}>
              Order Summary
            </Heading>
          </Flex>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="4">
            {/* Summary Items */}
            <VStack align="start" spacing="3">
              <HStack>
                <Text fontWeight="600" minW="150px">
                  Subtotal:
                </Text>
                <Text>${order.subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="600" minW="150px">
                  Shipping Charges:
                </Text>
                <Text>${order.shippingCharges.toFixed(2)}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="600" minW="150px">
                  Taxes:
                </Text>
                <Text>${order.taxes.toFixed(2)}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="600" minW="150px">
                  Discounts Applied:
                </Text>
                <Text>${order.discounts.toFixed(2)}</Text>
              </HStack>
            </VStack>
            {/* Grand Total */}
            <VStack align="end" spacing="3">
              <Divider />
              <HStack>
                <Text fontWeight="600" minW="150px" fontSize="lg">
                  Grand Total:
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${order.grandTotal.toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </Grid>
        </Box>

        {/* Message Box Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Send Feedback</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={feedbackError}>
                <FormLabel>Feedback Message</FormLabel>
                <Textarea
                  placeholder="Type your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  bg={inputBg}
                />
                {feedbackError && <FormErrorMessage>{feedbackError}</FormErrorMessage>}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSendFeedback}>
                Send
              </Button>
              <Button variant="ghost" onClick={() => { setFeedbackError(''); onClose(); }}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Action Buttons */}
        <Flex justifyContent="flex-end" mt="4">
          {status === 'Pending' && (
            <>
              <Button
                colorScheme="green"
                leftIcon={<FaCheckCircle />}
                onClick={handleAcceptOrder}
                aria-label="Accept Order"
                mr="4"
              >
                Accept Order
              </Button>
              <Button
                colorScheme="red"
                leftIcon={<FaTimesCircle />}
                aria-label="Reject Order"
                onClick={handleRejectOrder}
              >
                Reject Order
              </Button>
            </>
          )}

          {status === 'Accepted' && (
            <Button
              colorScheme="orange"
              leftIcon={<FaArrowRight />}
              onClick={handleMarkAsHandedOver}
              aria-label="Mark as Handed Over"
            >
              Mark as Handed Over
            </Button>
          )}

          {status === 'Handed Over' && (
            <Text fontSize="lg" fontWeight="bold" color="gray.500">
              Order has been handed over to the dark store for appraisal.
            </Text>
          )}

          {['Appraised', 'Shipped', 'Delivered'].includes(status) && (
            <Text fontSize="lg" fontWeight="bold" color="gray.500">
              Order is currently in the "{status}" stage. No further action is required.
            </Text>
          )}

          {status === 'Rejected' && (
            <Text color="red.500" fontSize="lg" fontWeight="bold">
              You have rejected this order.
            </Text>
          )}

          {status === 'Cancelled' && (
            <Text color="red.500" fontSize="lg" fontWeight="bold">
              This order has been cancelled.
            </Text>
          )}
        </Flex>
      </VStack>
    </Container>
  );
}
