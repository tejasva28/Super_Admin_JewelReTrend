

import {
  Box,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

// Import the photographer data
import photographerData from '../variables/photographerData'; // Adjust the path if necessary

const columnHelper = createColumnHelper();

export default function PhotographerTable() {
  const navigate = useNavigate();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const data = React.useMemo(() => photographerData, []);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => (
          <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.600">
            NAME
          </Text>
        ),
        cell: (info) => (
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor('status', {
        header: () => (
          <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.600">
            STATUS
          </Text>
        ),
        cell: (info) => (
          <Flex align="center">
            <Icon
              w="20px"
              h="20px"
              me="3px"
              color={
                info.getValue() === 'Approved'
                  ? 'green.500'
                  : info.getValue() === 'Rejected'
                  ? 'red.500'
                  : 'gray.500'
              }
              as={
                info.getValue() === 'Approved'
                  ? MdCheckCircle
                  : info.getValue() === 'Rejected'
                  ? MdCancel
                  : MdCancel
              }
            />
            <Text color={textColor} fontSize="sm" fontWeight="400">
              {info.getValue()}
            </Text>
          </Flex>
        ),
      }),
      columnHelper.display({
        id: 'viewDetails',
        header: () => (
          <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.600">
            VIEW DETAILS
          </Text>
        ),
        cell: (info) => (
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() =>
              navigate(`/photographer/${info.row.original.id.toString()}`)
            }
          >
            View Details
          </Button>
        ),
      }),
    ],
    [navigate, textColor]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="20px"
      overflowX={{ sm: 'auto', lg: 'hidden' }}
    >
      <Flex
        px="20px"
        mb="16px"
        justifyContent="space-between"
        align="center"
      >
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Photographer List
        </Text>
        <Menu />
      </Flex>
      <Box overflowX="auto">
        <Table
          variant="simple"
          color="gray.500"
          mb="24px"
          mt="12px"
          w="100%"
        >
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                    textAlign="left"
                  >
                    <Flex
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.600"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize={{ sm: '12px' }}
                    minW={{ sm: '100px', md: '150px', lg: '150px' }}
                    borderColor="gray.200"
                    px="8px"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}

PhotographerTable.propTypes = {
};
