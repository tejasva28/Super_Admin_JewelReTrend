// File: src/components/TransitTimeline.js

import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Text,
  VStack,
  Circle,
  Icon,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaCheckCircle,
  FaRegCircle,
  FaSpinner,
  FaShippingFast,
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TransitTimeline = ({ transitDetails, shipmentInfo }) => {
  // Define Color Modes for Styling
  const textColor = useColorModeValue('gray.800', 'white');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack spacing="8" align="stretch">
      {/* Shipping Transit Details */}
      <Box
        bg={sectionBg}
        p="6"
        borderRadius="md"
        boxShadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Flex align="center" mb="4">
          <Icon as={FaShippingFast} boxSize="6" color={accentColor} mr="2" />
          <Heading as="h3" size="md" color={textColor}>
            Shipping Transit Details
          </Heading>
        </Flex>
        <VStack align="stretch" spacing="4">
          {Array.isArray(transitDetails) && transitDetails.length > 0 ? (
            transitDetails.map((transit, index) => (
              <Flex key={index} align="center">
                <Circle
                  size="8"
                  bg={
                    transit.status === 'completed'
                      ? 'green.500'
                      : transit.status === 'in-progress'
                      ? 'yellow.500'
                      : 'gray.300'
                  }
                  color="white"
                  mr="4"
                >
                  {/* Icon based on status */}
                  {transit.status === 'completed' && <FaCheckCircle />}
                  {transit.status === 'in-progress' && (
                    <FaSpinner className="spinner" />
                  )}
                  {transit.status === 'pending' && <FaRegCircle />}
                </Circle>
                <Box>
                  <Text fontWeight="600">{transit.event}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {transit.location} •{' '}
                    {new Date(transit.timestamp).toLocaleString()}
                  </Text>
                </Box>
              </Flex>
            ))
          ) : (
            <Text>No transit details available for this order.</Text>
          )}
        </VStack>
      </Box>

      {/* Detailed Shipment Information */}
      {shipmentInfo ? ( // Check if shipmentInfo exists
        <Box
          bg={sectionBg}
          p="6"
          borderRadius="md"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex align="center" mb="4">
            <Icon as={FaShippingFast} boxSize="6" color={accentColor} mr="2" />
            <Heading as="h3" size="md" color={textColor}>
              Shipment Details
            </Heading>
          </Flex>
          <VStack align="start" spacing="3" mb="4">
            <Text>
              <strong>Delivery Partner:</strong> {shipmentInfo.deliveryPartnerName}
            </Text>
            <Text>
              <strong>Insurance Cover:</strong> {shipmentInfo.insuranceCover}
            </Text>
            <Text>
              <strong>Delivery Address:</strong> {shipmentInfo.deliveryAddress}
            </Text>
          </VStack>
          {/* Map Display */}
          {shipmentInfo.currentLocation ? ( // Check if currentLocation exists
            <Box borderRadius="md" overflow="hidden">
              <MapContainer
                center={[
                  shipmentInfo.currentLocation.latitude,
                  shipmentInfo.currentLocation.longitude,
                ]}
                zoom={13}
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    shipmentInfo.currentLocation.latitude,
                    shipmentInfo.currentLocation.longitude,
                  ]}
                >
                  <Popup>
                    Current Location: {shipmentInfo.deliveryAddress}
                  </Popup>
                </Marker>
              </MapContainer>
            </Box>
          ) : (
            <Text>No current location available.</Text>
          )}
        </Box>
      ) : (
        <Box
          bg={sectionBg}
          p="6"
          borderRadius="md"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex align="center" mb="4">
            <Icon as={FaShippingFast} boxSize="6" color={accentColor} mr="2" />
            <Heading as="h3" size="md" color={textColor}>
              Shipment Details
            </Heading>
          </Flex>
          <Text>No shipment information available for this order.</Text>
        </Box>
      )}
    </VStack>
  );
};

// Define PropTypes for TransitTimeline
TransitTimeline.propTypes = {
  transitDetails: PropTypes.arrayOf(
    PropTypes.shape({
      event: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['completed', 'in-progress', 'pending']).isRequired,
    })
  ).isRequired,
  shipmentInfo: PropTypes.shape({
    deliveryPartnerName: PropTypes.string.isRequired,
    insuranceCover: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    currentLocation: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  }),
};

// Optional: Define default props if shipmentInfo might be missing
TransitTimeline.defaultProps = {
  shipmentInfo: null,
};

export default TransitTimeline;
