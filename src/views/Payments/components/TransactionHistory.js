// File: TransactionHistory.js
import React, { useMemo, useState, useContext } from 'react';
import debounce from 'lodash.debounce';
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Input,
  Select,
  useColorModeValue,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

// Import the TransactionContext
import { TransactionContext } from './TransactionContext.js';

export default function TransactionHistory() {
  const { transactions } = useContext(TransactionContext);
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState('');

  const bg = useColorModeValue("white", "navy.900");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const headerBg = useColorModeValue("gray.50", "navy.800");

  const debouncedSetGlobalFilter = useMemo(
    () => debounce((value) => setGlobalFilter(value), 300),
    []
  );

  React.useEffect(() => {
    return () => {
      debouncedSetGlobalFilter.cancel();
    };
  }, [debouncedSetGlobalFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Pending':
        return 'yellow';
      case 'Failed':
        return 'red';
      case 'In Review':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (info) => {
        const dateValue = info.getValue();
        return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
      },
    },
    {
      accessorKey: 'referenceId',
      header: 'Reference ID',
      cell: (info) => (
        <Text
          color="blue.500"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          onClick={() => navigate(`/transactions/${info.getValue()}`)} // Navigate to detailed view
        >
          {info.getValue()}
        </Text>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (info) => {
        const type = info.getValue();
        // You can use color coding or icons based on type if desired
        return <Text fontWeight="medium">{type}</Text>;
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (info) => {
        const value = info.getValue();
        const formatted = value < 0 ? `-₹${Math.abs(value).toFixed(2)}` : `₹${value.toFixed(2)}`;
        return <Text color={value < 0 ? "red.500" : "green.500"}>{formatted}</Text>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <Badge colorScheme={getStatusColor(status)}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: (info) => (
        <Text>
          {info.getValue()}
        </Text>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (info) => {
        const transaction = info.row.original;
        return (
          <Flex gap="4px">
            <Button
              size="sm"
              variant="outline"
              colorScheme="blue"
              onClick={() => navigate(`/transactions/${transaction.referenceId}`)}
            >
              View
            </Button>
            <Button
              size="sm"
              variant="outline"
              colorScheme="green"
              onClick={() => handleDownloadReceipt(transaction.referenceId)}
            >
              Download
            </Button>
          </Flex>
        );
      },
    },
  ], [navigate]);

  const handleDownloadReceipt = (referenceId) => {
    // Implement your receipt download logic here
    // For example, navigate to a receipt download URL
    navigate(`/transactions/${referenceId}/receipt`);
  };

  const data = useMemo(() => transactions, [transactions]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Box bg={bg} borderRadius="20px" p="22px">
      <Flex mb="24px" justifyContent="space-between" alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
        <Heading as="h3" size="lg" color={textColor} mb={{ base: '8px', md: '0' }}>
          Transaction History
        </Heading>
        <Input
          placeholder="Search transactions..."
          onChange={(e) => debouncedSetGlobalFilter(e.target.value)}
          maxW="300px"
          variant="filled"
        />
      </Flex>

      {/* Future enhancements: Add filters for date range, type, status, etc. */}
      {/* Example:
      <Flex mb="16px" gap="16px" flexDirection={{ base: 'column', md: 'row' }}>
        <Input type="date" placeholder="Start Date" />
        <Input type="date" placeholder="End Date" />
        <Select placeholder="Filter by Type">
          <option value="Sale">Sale</option>
          <option value="Refund">Refund</option>
          ...
        </Select>
        <Select placeholder="Filter by Status">
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          ...
        </Select>
      </Flex>
      */}

      <Box overflowX="auto">
        <Table variant="simple" color={textColor}>
          <Thead bg={headerBg}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    color={textColor}
                    fontSize="sm"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    borderColor={borderColor}
                    cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.length === 0 ? (
              <Tr>
                <Td colSpan={columns.length} textAlign="center" py="20px">
                  No transactions found.
                </Td>
              </Tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      fontSize="sm"
                      borderColor={borderColor}
                      whiteSpace="nowrap"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

      <Flex
        mt="4"
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Flex align="center" mb={{ base: '8px', md: '0' }}>
          <Text fontSize="sm" mr="8px">
            Rows per page:
          </Text>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            width="80px"
            size="sm"
            aria-label="Select number of rows per page"
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex align="center" mb={{ base: 2, md: 0 }}>
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            mr="2"
            variant="outline"
          >
            {'<<'}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            mr="2"
            variant="outline"
          >
            Previous
          </Button>
          <Text fontSize="sm" mr="2">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Text>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="sm"
            mr="2"
            variant="outline"
          >
            Next
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="outline"
          >
            {'>>'}
          </Button>
        </Flex>

        <Text fontSize="sm" textAlign={{ base: 'center', md: 'right' }}>
          Total Transactions: {data.length}
        </Text>
      </Flex>
    </Box>
  );
}
