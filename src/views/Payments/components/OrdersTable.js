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
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdVisibility } from "react-icons/md";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Card from "components/card/Card";
import PropTypes from "prop-types";
import { debounce } from "lodash";

const columnHelper = createColumnHelper();

export default function OrdersTable({ tableData }) {
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const headerBg = useColorModeValue("gray.100", "gray.700");

  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedSetGlobalFilter = useMemo(
    () => debounce((value) => setGlobalFilter(value), 300),
    []
  );

  React.useEffect(() => {
    return () => {
      debouncedSetGlobalFilter.cancel();
    };
  }, [debouncedSetGlobalFilter]);

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
        />
      ),
    }),
    // Order ID
    columnHelper.accessor('orderId', {
      header: 'Order ID',
      cell: (info) => info.getValue(),
    }),
    // Order Date
    columnHelper.accessor('orderDate', {
      header: 'Order Date',
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),
    // Order Status
    columnHelper.accessor('orderStatus', {
      header: 'Order Status',
      cell: (info) => info.getValue(),
    }),
    // Payment Status
    columnHelper.accessor('paymentStatus', {
      header: 'Payment Status',
      cell: (info) => info.getValue(),
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
            View Details
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
          Order Management
        </Text>
        {/* You can add additional menu or actions here */}
      </Flex>

      {/* Global Filter */}
      <Flex px="25px" mb="16px" align="right">
        <Input
          placeholder="Search orders..."
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
