/* eslint-disable */

import {
  Flex,
  Box,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Select,
  Input,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrashAlt, FaSave } from 'react-icons/fa';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

const columnHelper = createColumnHelper();

export default function CheckTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  const [data, setData] = React.useState(() => [...tableData]); // State to hold table data
  const [editRowId, setEditRowId] = React.useState(null); // ID of the row being edited

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const rowHoverBg = useColorModeValue('gray.100', 'gray.700');
  const stripedBg = useColorModeValue('gray.50', 'gray.800');

  const accessOptions = ['Admin', 'Manager', 'Operations', 'Accounts']; // Access options

  // Handle change in Access level
  const handleAccessChange = (id, newAccess) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.employeeId === id ? { ...row, access: newAccess } : row
      )
    );
  };

  // Handle change in input fields (Name, Email, etc.)
  const handleInputChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.employeeId === id ? { ...row, [field]: value } : row
      )
    );
  };

  // Toggle edit mode for a row
  const handleEditClick = (id) => {
    setEditRowId(id);
  };

  // Handle save and exit edit mode
  const handleSaveClick = () => {
    setEditRowId(null);
  };

  // Delete row
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((row) => row.employeeId !== id));
  };

  const columns = [
    // Name column with picture and editable input
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '12px', lg: '14px' }}
          color="gray.500"
        >
          Name
        </Text>
      ),
      cell: (info) => {
        const row = info.row.original;
        return editRowId === row.employeeId ? (
          <Input
            value={row.name}
            onChange={(e) => handleInputChange(row.employeeId, 'name', e.target.value)}
          />
        ) : (
          <Flex align="center">
            <Image
              borderRadius="full"
              boxSize="40px"
              src={row.picture} // Ensure you have the picture URL in your data
              alt={row.name}
              me="12px"
            />
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {row.name}
            </Text>
          </Flex>
        );
      },
    }),
    // Email column with editable input
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '12px', lg: '14px' }}
          color="gray.500"
        >
          Email
        </Text>
      ),
      cell: (info) => {
        const row = info.row.original;
        return editRowId === row.employeeId ? (
          <Input
            value={row.email}
            onChange={(e) => handleInputChange(row.employeeId, 'email', e.target.value)}
          />
        ) : (
          <Text color={textColor} fontSize="sm" fontWeight="500">
            {row.email}
          </Text>
        );
      },
    }),
    // Number column with editable input
    columnHelper.accessor('number', {
      id: 'number',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '12px', lg: '14px' }}
          color="gray.500"
        >
          Number
        </Text>
      ),
      cell: (info) => {
        const row = info.row.original;
        return editRowId === row.employeeId ? (
          <Input
            value={row.number}
            onChange={(e) => handleInputChange(row.employeeId, 'number', e.target.value)}
          />
        ) : (
          <Text color={textColor} fontSize="sm" fontWeight="500">
            {row.number}
          </Text>
        );
      },
    }),
    // Employee ID column (non-editable)
    columnHelper.accessor('employeeId', {
      id: 'employeeId',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '12px', lg: '14px' }}
          color="gray.500"
        >
          Employee ID
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="500">
          {info.getValue()}
        </Text>
      ),
    }),
    // Access column with editable dropdown
    columnHelper.accessor('access', {
      id: 'access',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '12px', lg: '14px' }}
          color="gray.500"
        >
          Access
        </Text>
      ),
      cell: (info) => {
        const row = info.row.original;
        const accessLevel = row.access;

        return editRowId === row.employeeId ? (
          <Select
            value={accessLevel}
            onChange={(e) =>
              handleAccessChange(row.employeeId, e.target.value)
            }
            bg={getAccessColor(accessLevel)}
            color="white"
            fontWeight="500"
          >
            {accessOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        ) : (
          <Text color={getAccessColor(accessLevel)} fontWeight="500">
            {accessLevel}
          </Text>
        );
      },
    }),
    // Actions column (Edit & Delete)
    columnHelper.accessor('actions', {
      id: 'actions',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '12px', lg: '14px' }}
          color="gray.500"
        >
          Actions
        </Text>
      ),
      cell: (info) => {
        const row = info.row.original;

        return (
          <Flex justify="center" align="center">
            {editRowId === row.employeeId ? (
              <Button
                size="sm"
                colorScheme="green"
                onClick={handleSaveClick}
                leftIcon={<FaSave />}
              >
                Save
              </Button>
            ) : (
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => handleEditClick(row.employeeId)}
                leftIcon={<FaEdit />}
              >
                Edit
              </Button>
            )}
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => handleDelete(row.employeeId)}
              leftIcon={<FaTrashAlt />}
              ml="4"
            >
              Delete
            </Button>
          </Flex>
        );
      },
    }),
  ];

  // Function to return background color based on access level
  const getAccessColor = (accessLevel) => {
    switch (accessLevel) {
      case 'Admin':
        return 'red.400';
      case 'Manager':
        return 'blue.400';
      case 'Operations':
        return 'green.400';
      case 'Accounts':
        return 'yellow.400';
      default:
        return 'gray.400';
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Menu />
      </Flex>
      <Box>
        <Table variant="striped" colorScheme="gray" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: '12px', lg: '14px' }}
                        color="gray.500"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <Icon as={FaSortUp} />,
                          desc: <Icon as={FaSortDown} />,
                          none: <Icon as={FaSort} />,
                        }[header.column.getIsSorted() || 'none']}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.map((row, idx) => {
                return (
                  <Tr key={row.id} _hover={{ bgColor: rowHoverBg }} bg={idx % 2 === 0 ? stripedBg : ''}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
