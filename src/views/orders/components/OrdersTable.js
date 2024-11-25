// File: src/views/orders/components/OrdersTable.js

import React, { useState, useMemo } from 'react';
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Input,
  Select,
  Checkbox,
  IconButton,
  VStack,
  HStack,
  useToast,
  Spacer,
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
import { TriangleDownIcon, TriangleUpIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Card from "components/card/Card";
import PropTypes from "prop-types";
import { debounce } from "lodash";

// Define the column helper outside the component
const columnHelper = createColumnHelper();

// Custom filter function for date range
const dateBetweenFilterFn = (row, columnId, filterValue) => {
  const rowDate = new Date(row.getValue(columnId));
  const { start, end } = filterValue;
  if (start && end) {
    return rowDate >= new Date(start) && rowDate <= new Date(end);
  } else if (start) {
    return rowDate >= new Date(start);
  } else if (end) {
    return rowDate <= new Date(end);
  }
  return true;
};

export default function OrdersTable({ tableData }) {
  const navigate = useNavigate();
  const toast = useToast();

  // Define color modes at the top level
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const headerBg = useColorModeValue("gray.100", "gray.700");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  const [globalFilter, setGlobalFilter] = useState('');

  // Debounce the global filter to improve performance
  const debouncedSetGlobalFilter = useMemo(
    () => debounce((value) => setGlobalFilter(value), 300),
    []
  );

  // Cleanup the debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSetGlobalFilter.cancel();
    };
  }, [debouncedSetGlobalFilter]);

  // Define the columns with filters
  const columns = useMemo(() => [
    // Selection Column
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          isChecked={table.getIsAllPageRowsSelected()}
          isIndeterminate={table.getIsSomePageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          aria-label="Select all orders"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          isChecked={row.getIsSelected()}
          isIndeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label={`Select order ${row.original.orderId}`}
          fontWeight={'bold'}
        />
      ),
    }),
    // Order ID with Text Filter
    columnHelper.accessor('orderId', {
      header: 'Order ID',
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      filterFn: 'includesString',
    }),
    // Order Date with Date Range Filter
    columnHelper.accessor('orderDate', {
      header: 'Order Date',
      cell: (info) => new Date(info.getValue()).toLocaleString(),
      enableColumnFilter: true,
      filterFn: 'dateBetween',
    }),
    // Order Status with Select Filter
    columnHelper.accessor('orderStatus', {
      header: 'Order Status',
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      filterFn: 'equals',
    }),
    // Payment Status with Select Filter
    columnHelper.accessor('paymentStatus', {
      header: 'Payment Status',
      cell: (info) => info.getValue(),
      enableColumnFilter: true,
      filterFn: 'equals',
    }),
    // Actions
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
            onClick={() => navigate(`/order-details/${row.original.orderId}`)}
            aria-label={`View details for order ${row.original.orderId}`}
            mr="2"
          >
            Details
          </Button>
        </Flex>
      ),
    }),
  ], [navigate]);

  const data = useMemo(() => tableData, [tableData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    globalFilterFn: 'includesString',
    filterFns: {
      includesString: (row, columnId, filterValue) =>
        row.getValue(columnId).toLowerCase().includes(filterValue.toLowerCase()),
      equals: (row, columnId, filterValue) =>
        row.getValue(columnId) === filterValue,
      dateBetween: dateBetweenFilterFn,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Function to Export Data to CSV
  const exportToCSV = () => {
    const visibleColumns = columns.filter(col => col.id !== 'select' && col.id !== 'actions');
    const headers = visibleColumns.map(col => col.header);

    const rows = table.getFilteredRowModel().rows.map(row => {
      return visibleColumns.map(col => {
        const value = row.getValue(col.id);
        // Format date fields
        if (col.id === 'orderDate') {
          return new Date(value).toLocaleString();
        }
        return `"${value}"`; // Wrap in quotes to handle commas
      });
    });

    let csvContent =
      headers.join(",") + "\n" +
      rows.map(row => row.join(",")).join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link to download the Blob
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "orders_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" py="6" overflowX="auto">
      {/* Top Bar with Title and Export Button */}
      <Flex
        px="25px"
        mb="4px"
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
          Order Management
        </Text>
        <Button
          leftIcon={<MdDownload />}
          colorScheme="teal"
          variant="solid"
          size="sm"
          onClick={exportToCSV}
          aria-label="Export orders to CSV"
        >
          Export CSV
        </Button>
      </Flex>

      {/* Filter Section */}
      <Box px="25px" mb="16px">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
          gap="4"
        >
          {/* Global Search */}
          <Input
            placeholder="Search Orders..."
            onChange={(e) => debouncedSetGlobalFilter(e.target.value)}
            maxW="300px"
            aria-label="Global search"
            variant="filled"
            bg={inputBg}
            borderRadius="md"
            _placeholder={{ color: "gray.500" }}
            size="sm"
          />

          {/* Column Filters */}
          <HStack spacing="4" wrap="wrap">
            {/* Order Status Filter */}
            <Box>
              <Select
                placeholder="All Statuses"
                value={table.getColumn('orderStatus').getFilterValue() || ''}
                onChange={(e) => table.getColumn('orderStatus').setFilterValue(e.target.value || undefined)}
                size="sm"
                width="150px"
                aria-label="Filter Order Status"
                variant="filled"
                bg={inputBg}
                borderRadius="md"
              >
                {/* Dynamically populate options */}
                {[...new Set(tableData.map(item => item.orderStatus))].sort().map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Payment Status Filter */}
            <Box>
              <Select
                placeholder="All Payment Statuses"
                value={table.getColumn('paymentStatus').getFilterValue() || ''}
                onChange={(e) => table.getColumn('paymentStatus').setFilterValue(e.target.value || undefined)}
                size="sm"
                width="150px"
                aria-label="Filter Payment Status"
                variant="filled"
                bg={inputBg}
                borderRadius="md"
              >
                {/* Dynamically populate options */}
                {[...new Set(tableData.map(item => item.paymentStatus))].sort().map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Order Date Range Filter */}
            <HStack spacing="2">
              <Input
                type="date"
                value={table.getColumn('orderDate').getFilterValue()?.start || ''}
                onChange={(e) => {
                  const start = e.target.value;
                  const end = table.getColumn('orderDate').getFilterValue()?.end || '';
                  table.getColumn('orderDate').setFilterValue({ start, end });
                }}
                placeholder="Start Date"
                size="sm"
                width="120px"
                aria-label="Filter Start Date"
                variant="filled"
                bg={inputBg}
                borderRadius="md"
                _placeholder={{ color: "gray.500" }}
              />
              <Input
                type="date"
                value={table.getColumn('orderDate').getFilterValue()?.end || ''}
                onChange={(e) => {
                  const end = e.target.value;
                  const start = table.getColumn('orderDate').getFilterValue()?.start || '';
                  table.getColumn('orderDate').setFilterValue({ start, end });
                }}
                placeholder="End Date"
                size="sm"
                width="120px"
                aria-label="Filter End Date"
                variant="filled"
                bg={inputBg}
                borderRadius="md"
                _placeholder={{ color: "gray.500" }}
              />
            </HStack>
          </HStack>
        </Flex>
      </Box>

      {/* Table */}
      <Box px="25px">
        <Table variant="simple" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id} bg={headerBg}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                    onClick={header.column.getToggleSortingHandler()}
                    position="relative"
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
                  No orders found.
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
        mb="8px"
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
          Total Orders: {tableData.length}
        </Text>
      </Flex>
    </Card>
  );
}

OrdersTable.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.string.isRequired,
      orderDate: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      orderStatus: PropTypes.string.isRequired,
      paymentStatus: PropTypes.string.isRequired,
      // ...other fields
    })
  ).isRequired,
};
