// File: src/views/payments/components/PaymentSettlementTable.js

import React, { useState, useMemo } from 'react';
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  IconButton,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Input,
  Select,
  Badge,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdVisibility, MdDownload } from "react-icons/md";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import Card from "components/card/Card";
import { debounce } from "lodash";
import PaymentDetailsSidebar from './PaymentDetailsSidebar'; // Import the sidebar component

// Dummy data structure for transactions
// You should replace this with actual data fetching logic.
const dummyTransactions = [
  {
    date: "2024-10-20T09:15:00Z",
    transactionId: "TXN123456",
    type: "Sale",
    amount: 1500.00,
    status: "Completed",
    description: "Sale of Product #A100",
  },
  {
    date: "2024-10-21T11:20:00Z",
    transactionId: "TXN123457",
    type: "Refund",
    amount: -200.00,
    status: "Pending",
    description: "Refund for Order #B200",
  },
  {
    date: "2024-10-22T14:30:00Z",
    transactionId: "TXN123458",
    type: "Fee",
    amount: -50.00,
    status: "Completed",
    description: "Platform fee for October",
  },
  {
    date: "2024-10-23T16:00:00Z",
    transactionId: "TXN123459",
    type: "Adjustment",
    amount: 100.00,
    status: "In Review",
    description: "Adjustment for Order #C300 discrepancy",
  },
  {
    date: "2024-10-24T08:45:00Z",
    transactionId: "TXN123460",
    type: "Payout",
    amount: 800.00,
    status: "Completed",
    description: "Weekly payout",
  },
];

const columnHelper = createColumnHelper();

export default function PaymentSettlementTable() {
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // Define 'transactions' using useState
  const [transactions, setTransactions] = useState(dummyTransactions);

  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const debouncedSetGlobalFilter = useMemo(
    () => debounce((value) => setGlobalFilter(value), 300),
    []
  );

  React.useEffect(() => {
    return () => {
      debouncedSetGlobalFilter.cancel();
    };
  }, [debouncedSetGlobalFilter]);

  // Define color and icon logic for transaction types and statuses
  const getTypeColor = (type) => {
    switch (type) {
      case 'Sale':
        return 'green';
      case 'Refund':
        return 'red';
      case 'Fee':
        return 'orange';
      case 'Adjustment':
        return 'blue';
      case 'Payout':
        return 'purple';
      default:
        return 'gray';
    }
  };

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

  // Columns for the Payment Settlement (Recent Transactions) Table
  const columns = useMemo(() => [
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('transactionId', {
      header: 'Transaction ID',
      cell: (info) => (
        <Text color="blue.500" cursor="pointer" _hover={{ textDecoration: "underline" }}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Transaction Type',
      cell: (info) => {
        const type = info.getValue();
        return (
          <Badge colorScheme={getTypeColor(type)}>
            {type}
          </Badge>
        );
      },
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => {
        const value = info.getValue();
        const formatted = value < 0 ? `-₹${Math.abs(value).toFixed(2)}` : `₹${value.toFixed(2)}`;
        return <Text color={value < 0 ? "red.500" : "green.500"}>{formatted}</Text>;
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <Badge colorScheme={getStatusColor(status)}>
            {status}
          </Badge>
        );
      },
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => {
        const desc = info.getValue();
        return (
          <Text noOfLines={1} title={desc}>
            {desc}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Flex>
          <Button
            leftIcon={<MdVisibility />}
            colorScheme="blue"
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedRequest(row.original);
              setSidebarOpen(true);
              // Implement the logic to open the PaymentDetailsSidebar here
              // For example, you might pass the selected payment to a sidebar component
            }}
            aria-label={`View details for transaction ${row.original.transactionId}`}
            mr="2"
          >
            View Details
          </Button>
          <IconButton
            Icon={<MdDownload />}
            colorScheme="green"
            variant="outline"
            size="sm"
            onClick={() => {
              // Implement "Download Receipt" action
              // This could involve triggering a file download or opening a receipt modal
              alert(`Download receipt for ${row.original.transactionId}`);
            }}
            aria-label={`Download receipt for transaction ${row.original.transactionId}`}
          />
        </Flex>
      ),
    }),
  ], []);

  const table = useReactTable({
    data: transactions, // 'transactions' is now defined
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
    <Card flexDirection="column" w="100%" px="0px" overflowX="auto">
      {/* Header */}
      <Flex
        px="25px"
        mb="8px"
        justifyContent="space-between"
        align="center"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
          mb={{ base: '8px', md: '0' }}
        >
          Recent Transactions
        </Text>
      </Flex>

      {/* Global Filter */}
      <Flex px="25px" mb="16px" align="right">
        <Input
          placeholder="Search transactions..."
          onChange={(e) => debouncedSetGlobalFilter(e.target.value)}
          maxW="300px"
          aria-label="Global search"
        />
      </Flex>

      {/* Table */}
      <Box>
        <Table variant="simple" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex justifyContent="space-between" align="center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'asc' ? (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        ) : (
                          <TriangleDownIcon aria-label="sorted descending" />
                        )
                      ) : null}
                    </Flex>
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
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor="transparent"
                      aria-label={cell.column.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <Flex
        px="25px"
        justifyContent="space-between"
        align="center"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Flex align="center" mb={{ base: '8px', md: '0' }}>
          <Text mr="8px" color="gray.500" fontSize="sm">
            Rows per page:
          </Text>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
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

        <Flex align="center">
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            mr="4px"
            aria-label="First Page"
          >
            {'<<'}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            mr="4px"
            aria-label="Previous Page"
          >
            Previous
          </Button>
          <Text fontSize="sm" mr="4px">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Text>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="sm"
            mr="4px"
            aria-label="Next Page"
          >
            Next
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            size="sm"
            aria-label="Last Page"
          >
            {'>>'}
          </Button>
        </Flex>

        <Text fontSize="sm" mt={{ base: '4px', md: '0' }}>
          Total Transactions: {transactions.length}
        </Text>
      </Flex>

      {/* Payment Details Sidebar */}
      <PaymentDetailsSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        payment={selectedRequest}
      />
    </Card>
  );
}
