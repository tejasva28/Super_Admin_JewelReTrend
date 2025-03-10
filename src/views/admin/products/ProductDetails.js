import React, { useState } from "react";
import {
  // ...existing imports...
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function ProductDetailsSidebar({ isOpen, onClose, product }) {
  // ...existing code...

  // Add state for image slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper functions for image navigation
  const nextImage = () => {
    if (product?.pictures && currentImageIndex < product.pictures.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Replace the existing Image section with this:
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      {/* ...existing DrawerOverlay and DrawerContent... */}
      <DrawerBody p={6}>
        <Stack spacing={6}>
          {/* ...existing header code... */}

          {/* Updated Product Image Section */}
          <Box position="relative">
            <Flex justify="center" align="center" position="relative">
              {isEditing ? (
                <Stack spacing={2} align="center" width="full">
                  <Box position="relative" width="full" maxW="400px">
                    <Image
                      src={editedProduct.pictures?.[currentImageIndex]}
                      alt={editedProduct.name}
                      maxW="400px"
                      borderRadius="md"
                      boxShadow="md"
                    />
                    {editedProduct.pictures?.length > 1 && (
                      <>
                        <IconButton
                          icon={<ChevronLeftIcon />}
                          position="absolute"
                          left="0"
                          top="50%"
                          transform="translateY(-50%)"
                          onClick={prevImage}
                          isDisabled={currentImageIndex === 0}
                          variant="ghost"
                          colorScheme="blackAlpha"
                          aria-label="Previous image"
                        />
                        <IconButton
                          icon={<ChevronRightIcon />}
                          position="absolute"
                          right="0"
                          top="50%"
                          transform="translateY(-50%)"
                          onClick={nextImage}
                          isDisabled={
                            currentImageIndex === (editedProduct.pictures?.length || 0) - 1
                          }
                          variant="ghost"
                          colorScheme="blackAlpha"
                          aria-label="Next image"
                        />
                      </>
                    )}
                  </Box>
                  <Input
                    name="pictures"
                    value={editedProduct.pictures || ""}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                  />
                  {/* Image thumbnails */}
                  <Flex gap={2} overflowX="auto" py={2}>
                    {editedProduct.pictures?.map((pic, index) => (
                      <Image
                        key={index}
                        src={pic}
                        alt={`Thumbnail ${index + 1}`}
                        boxSize="60px"
                        objectFit="cover"
                        cursor="pointer"
                        borderRadius="md"
                        border={currentImageIndex === index ? "2px solid" : "none"}
                        borderColor="blue.500"
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </Flex>
                </Stack>
              ) : (
                <Box position="relative" width="full" maxW="400px">
                  <Image
                    src={product.pictures?.[currentImageIndex]}
                    alt={product.name}
                    maxW="400px"
                    borderRadius="md"
                    boxShadow="md"
                  />
                  {product.pictures?.length > 1 && (
                    <>
                      <IconButton
                        icon={<ChevronLeftIcon />}
                        position="absolute"
                        left="0"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={prevImage}
                        isDisabled={currentImageIndex === 0}
                        variant="ghost"
                        colorScheme="blackAlpha"
                        aria-label="Previous image"
                      />
                      <IconButton
                        icon={<ChevronRightIcon />}
                        position="absolute"
                        right="0"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={nextImage}
                        isDisabled={
                          currentImageIndex === (product.pictures?.length || 0) - 1
                        }
                        variant="ghost"
                        colorScheme="blackAlpha"
                        aria-label="Next image"
                      />
                    </>
                  )}
                  {/* Image thumbnails */}
                  <Flex gap={2} overflowX="auto" py={2} justifyContent="center">
                    {product.pictures?.map((pic, index) => (
                      <Image
                        key={index}
                        src={pic}
                        alt={`Thumbnail ${index + 1}`}
                        boxSize="60px"
                        objectFit="cover"
                        cursor="pointer"
                        borderRadius="md"
                        border={currentImageIndex === index ? "2px solid" : "none"}
                        borderColor="blue.500"
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>

          {/* ...rest of the existing code... */}
        </Stack>
      </DrawerBody>
      {/* ...existing code... */}
    </Drawer>
  );
}
