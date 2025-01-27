// File: src/views/admin/products/components/appraisal/DropzoneArea.js

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

const DropzoneArea = ({ onDrop }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    onDrop,
    multiple: true,
    maxSize: 5242880, // 5MB
  });

  return (
    <Box>
      <Flex
        {...getRootProps()}
        borderWidth="2px"
        borderRadius="md"
        borderColor={isDragActive ? "teal.500" : "gray.300"}
        borderStyle="dashed"
        p={6}
        textAlign="center"
        cursor="pointer"
        bg={isDragActive ? "teal.50" : "gray.50"}
        transition="background-color 0.2s, border-color 0.2s"
        flexDir="column"
        align="center"
        justify="center"
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt size={40} color={isDragActive ? "teal" : "gray"} />
        <Text mt={4} color={isDragActive ? "teal.500" : "gray.500"}>
          {isDragActive
            ? "Drop the images here..."
            : "Drag & drop images, or click to select files"}
        </Text>
        <Text fontSize="sm" color="gray.400">
          (Only *.jpeg and *.png images up to 5MB)
        </Text>
      </Flex>
      <Box mt={2}>
        {fileRejections.length > 0 &&
          fileRejections.map(({ file, errors }, index) => (
            <Box key={index} color="red.500" mt={1}>
              <Text fontSize="sm">
                {file.path} - {Math.round(file.size / 1024)} KB
              </Text>
              {errors.map((e) => (
                <Text key={e.code} fontSize="xs">
                  {e.message}
                </Text>
              ))}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default DropzoneArea;
