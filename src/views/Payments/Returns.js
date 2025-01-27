
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ReturnRequests from './components/TransactionHistory';
import { fetchReturnRequests } from '../../api/returns';

const Returns = () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getReturnRequests = async () => {
      try {
        const data = await fetchReturnRequests();
        setReturnRequests(data);
      } catch (error) {
        console.error('Failed to fetch return requests:', error);
      } finally {
        setLoading(false);
      }
    };

    getReturnRequests();
  }, []);

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      bg={cardBg}
      borderRadius="md"
      boxShadow="md"
      p={{ base: 4, md: 6 }}
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
    >
      <Flex
        mb="4"
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Heading as="h3" fontSize="xl" mb={{ base: 2, md: 0 }} color={textColor}>
          Returns
        </Heading>
        <Button colorScheme="blue" onClick={() => navigate('/new-return')}>
          New Return
        </Button>
      </Flex>

      {loading ? (
        <Flex justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <ReturnRequests returnRequests={returnRequests} />
      )}
    </Box>
  );
};

export default Returns;