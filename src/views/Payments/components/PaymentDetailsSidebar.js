// File: src/views/payments/components/PaymentDetailsSidebar.js

import React, { useState, useContext, useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  Flex,
  Textarea,
  useColorModeValue,
  Divider,
  useToast,
  Input,
} from "@chakra-ui/react";
import {
  FaCheck,
  FaTimes,
  FaEdit,
  FaEnvelope,
  FaPen,
} from "react-icons/fa";
import { PaymentContext } from './PaymentContext'; // Corrected import path

const PaymentDetailsSidebar = ({ isOpen, onClose, payment }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const sectionBorderColor = useColorModeValue("gray.200", "gray.700");
  const inputBgColor = useColorModeValue("white", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");

  const { updatePaymentStatus, addAdminComment } = useContext(PaymentContext);

  const toast = useToast();

  const [newComment, setNewComment] = useState("");

  // Reset newComment when payment changes
  useEffect(() => {
    setNewComment("");
  }, [payment]);

  // Early return if payment is null
  if (!payment) {
    return null;
  }

  // Handlers for actions
  const handleApprove = () => {
    console.log(`Approved payment ${payment.transactionId}`);
    toast({
      title: "Payment Approved",
      description: `Payment #${payment.transactionId} has been approved.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Update status in context or backend
    updatePaymentStatus(payment.transactionId, "Approved");
  };

  const handleReject = () => {
    console.log(`Rejected payment ${payment.transactionId}`);
    toast({
      title: "Payment Rejected",
      description: `Payment #${payment.transactionId} has been rejected.`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    // Update status in context or backend
    updatePaymentStatus(payment.transactionId, "Rejected");
  };

  const handleEdit = () => {
    console.log(`Editing payment ${payment.transactionId}`);
    toast({
      title: "Edit Payment",
      description: `You can now edit Payment #${payment.transactionId}.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    // Navigate to edit page or open edit modal
  };

  const handleSendMessage = () => {
    // Implement communication logic
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the user.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addAdminComment(payment.transactionId, newComment);
    setNewComment("");
    toast({
      title: "Comment Added",
      description: "Your comment has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Optionally, send the comment to the backend here
  };

  // Colors based on status
  const badgeColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "yellow";
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent
        bg={bgColor}
        p={4}
        borderLeftRadius="lg"
        boxShadow="lg"
      >
        {/* Header */}
        <DrawerCloseButton
          color={textColor}
          fontSize="lg"
          mt={2}
        />
        <DrawerHeader
          bgGradient="linear(to-r, teal.400, blue.500)"
          color="white"
          borderRadius="md"
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          py={6}
          mb={4}
        >
          Payment Details - Transaction #{payment.transactionId || 'N/A'}
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={6} align="stretch">

            {/* Status and Top Actions */}
            <Flex
              justify="space-between"
              align="center"
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              position="relative"
            >
              <Badge
                colorScheme={badgeColor(payment.status)}
                fontSize="md"
                px={2}
                py={1}
                borderRadius="md"
              >
                {payment.status || 'N/A'}
              </Badge>
              <HStack spacing={2}>
                {payment.status !== "Approved" && (
                  <>
                    <Button
                      leftIcon={<FaCheck />}
                      colorScheme="green"
                      variant="solid"
                      onClick={handleApprove}
                      size="sm"
                    >
                      Approve
                    </Button>
                    <Button
                      leftIcon={<FaTimes />}
                      colorScheme="red"
                      variant="solid"
                      onClick={handleReject}
                      size="sm"
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  leftIcon={<FaEdit />}
                  colorScheme="blue"
                  variant="solid"
                  onClick={handleEdit}
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  leftIcon={<FaEnvelope />}
                  colorScheme="purple"
                  variant="solid"
                  onClick={handleSendMessage}
                  size="sm"
                >
                  Communicate
                </Button>
              </HStack>
            </Flex>

            <Divider />

            {/* Payment Information */}
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              position="relative"
            >
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Payment Information
              </Text>
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Text fontWeight="medium">Transaction ID:</Text>
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => {/* Navigate to transaction details */}}
                  >
                    {payment.transactionId || 'N/A'}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="medium">Date:</Text>
                  <Text>{payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="medium">Transaction Type:</Text>
                  <Text>{payment.transactionType || 'N/A'}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="medium">Amount:</Text>
                  <Text>
                    {typeof payment.amount === 'number' 
                      ? `₹${payment.amount.toFixed(2)}`
                      : 'N/A'}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="medium">Status:</Text>
                  <Badge
                    colorScheme={badgeColor(payment.status)}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {payment.status || 'N/A'}
                  </Badge>
                </HStack>
                <Box>
                  <Text fontWeight="medium" mb={1}>Description:</Text>
                  <Textarea
                    value={payment.description || ''}
                    isReadOnly
                    size="sm"
                    resize="none"
                    borderColor={sectionBorderColor}
                    bg={bgColor}
                  />
                </Box>
              </VStack>
            </Box>

            <Divider />

            {/* User Information */}
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              position="relative"
            >
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                User Information
              </Text>
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Text fontWeight="medium">User Name:</Text>
                  <Text>{payment.user?.name || 'N/A'}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="medium">Email Address:</Text>
                  <Text>{payment.user?.email || 'N/A'}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="medium">Contact Number:</Text>
                  <Text>{payment.user?.contactNumber || 'N/A'}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="medium">Billing Address:</Text>
                  <Text>{payment.user?.billingAddress || 'N/A'}</Text>
                </HStack>
                {/* Add more user-related information as needed */}
              </VStack>
            </Box>

            <Divider />

            {/* Admin Comments */}
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              position="relative"
            >
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Admin Comments
              </Text>
              <VStack align="stretch" spacing={3}>
                {payment.adminComments && payment.adminComments.length > 0 ? (
                  payment.adminComments.map((comment, index) => (
                    <Flex key={index} align="start">
                      <Box
                        bg="purple.100"
                        p={3}
                        borderRadius="md"
                        maxW="80%"
                      >
                        <Text fontSize="sm" color="gray.500" mb={1}>
                          {comment.admin} - {comment.timestamp}
                        </Text>
                        <Text>{comment.content}</Text>
                      </Box>
                    </Flex>
                  ))
                ) : (
                  <Text>No comments yet.</Text>
                )}
                <HStack>
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    bg={inputBgColor}
                    borderColor={sectionBorderColor}
                  />
                  <Button
                    colorScheme="teal"
                    onClick={handleAddComment}
                    isDisabled={!newComment.trim()}
                    leftIcon={<FaPen />}
                  >
                    Add
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Additional Sections as Needed */}
            {/* For example, Payment History, Attachments, etc. */}

          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default PaymentDetailsSidebar;
