// File: src/views/jobs/components/JobsCompleted.js

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
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MdVisibility } from 'react-icons/md';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

// Initialize the column helper
const columnHelper = createColumnHelper();

export default function JobsCompleted({ tableData, desiredAttributes }) {
  const navigate = useNavigate();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const headerBg = useColorModeValue('gray.100', 'gray.700');
  const primaryColor = useColorModeValue('blue', 'blue');

  // State for global filter
  const [globalFilter, setGlobalFilter] = useState('');

  // Debounced global filter to improve performance
  const debouncedSetGlobalFilter = useMemo(
    () => debounce((value) => setGlobalFilter(value), 300),
    []
  );

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSetGlobalFilter.cancel();
    };
  }, [debouncedSetGlobalFilter]);

  // Define columns based on desiredAttributes
  const columns = useMemo(() => {
    const cols = [];

    // Selection Column for row selection
    cols.unshift(
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            isChecked={table.getIsAllPageRowsSelected()}
            isIndeterminate={table.getIsSomePageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            isChecked={row.getIsSelected()}
            isIndeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Select row ${row.original.jobId}`}
          />
        ),
      })
    );

    if (desiredAttributes.includes('jobId')) {
      cols.push(
        columnHelper.accessor('jobId', {
          id: 'jobId',
          header: () => 'Job ID',
          cell: (info) => info.getValue(),
        })
      );
    }

    if (desiredAttributes.includes('name')) {
      cols.push(
        columnHelper.accessor('name', {
          id: 'name',
          header: () => 'Customer Name',
          cell: (info) => info.getValue(),
        })
      );
    }

    if (desiredAttributes.includes('productName')) {
      cols.push(
        columnHelper.accessor('productName', {
          id: 'productName',
          header: () => 'Product Name',
          cell: (info) => info.getValue(),
        })
      );
    }

    // Actions Column
    cols.push(
      columnHelper.display({
        id: 'viewDetails',
        header: () => 'Actions',
        cell: ({ row }) => (
          <Button
            leftIcon={<MdVisibility />}
            colorScheme={primaryColor}
            variant="outline"
            size="sm"
            onClick={() => navigate(`/job-details/${row.original.jobId}`)}
            aria-label={`View details for job ${row.original.jobId}`}
          >
            View Details
          </Button>
        ),
      })
    );

    return cols;
  }, [desiredAttributes, navigate, primaryColor]);

  const data = useMemo(() => tableData, [tableData]);

  // Initialize the table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    globalFilterFn: 'includesString', // Built-in filter function
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Enable filtering
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    debugTable: false,
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX="auto"
    >
      {/* Header Section */}
      <Flex
        px="25px"
        mb="8px"
        justifyContent="space-between"
        align="center"
        flexDirection={{ base: 'column', md: 'row' }} // Responsive layout
      >
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
          mb={{ base: '8px', md: '0' }} // Margin bottom on mobile
        >
          Completed Jobs
        </Text>
        <Menu />
      </Flex>

      {/* Global Filter Input */}
      <Flex px="25px" mb="16px" align="center">
        <Input
          placeholder="Search completed jobs..."
          onChange={(e) => debouncedSetGlobalFilter(e.target.value)}
          maxW="300px"
          aria-label="Global search"
        />
      </Flex>

      {/* Table Section */}
      <Box>
        <Table
          variant="simple" // Changed from "striped" to "simple" to remove grey stripes
          mb="24px"
          mt="12px"
          sx={{
            'thead th': {
              position: 'sticky',
              top: '0',
              bg: headerBg,
              zIndex: 1,
            },
            'tbody tr:hover': {
              bg: useColorModeValue('green.50', 'green.700'), // Changed hover color for better contrast
            },
            'tbody tr:nth-of-type(even)': {
              bg: 'transparent', // Removed alternating row colors
            },
          }}
        >
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
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* Sorting Indicators */}
                      {header.column.getCanSort() ? (
                        header.column.getIsSorted() === 'asc' ? (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : null
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
                  No completed jobs found.
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

      {/* Pagination Controls */}
      <Flex
        px="25px"
        justifyContent="space-between"
        align="center"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        {/* Page Size Selector */}
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

        {/* Page Navigation Buttons */}
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

        {/* Total Records */}
        <Text fontSize="sm" mt={{ base: '4px', md: '0' }}>
          Total Records: {tableData.length}
        </Text>
      </Flex>
    </Card>
  );
}

// Define PropTypes for JobsCompleted
JobsCompleted.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      jobId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      // Add other necessary fields
    })
  ).isRequired,
  desiredAttributes: PropTypes.arrayOf(
    PropTypes.oneOf(['jobId', 'name', 'productName'])
  ).isRequired,
};