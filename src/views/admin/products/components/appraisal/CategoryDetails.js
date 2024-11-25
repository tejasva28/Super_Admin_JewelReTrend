// File: src/views/jobs/components/appraisal/CategoryDetails.js

import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  RadioGroup,
  Radio,
  HStack,
} from '@chakra-ui/react';

export default function CategoryDetails({
  category,
  categoryDetails = {},
  handleCategoryDetailsChange,
}) {
  if (!category) return null;

  const handleChange = (e, field) => {
    handleCategoryDetailsChange(field, e.target.value);
  };

  switch (category) {
    case 'Rings':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Ring Size</FormLabel>
            <Input
              placeholder="e.g., US size 6"
              value={categoryDetails.ringSize || ''}
              onChange={(e) => handleChange(e, 'ringSize')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Band Width (mm)</FormLabel>
            <Input
              type="number"
              placeholder="Band Width in millimeters"
              value={categoryDetails.bandWidth || ''}
              onChange={(e) => handleChange(e, 'bandWidth')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Design Details</FormLabel>
            <Textarea
              placeholder="Describe unique features (e.g., engraving, solitaire, etc.)"
              value={categoryDetails.designDetails || ''}
              onChange={(e) => handleChange(e, 'designDetails')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Is there an engraving?</FormLabel>
            <RadioGroup
              value={categoryDetails.engraving || 'No'}
              onChange={(value) =>
                handleCategoryDetailsChange('engraving', value)
              }
            >
              <HStack spacing="24px">
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </HStack>
            </RadioGroup>
            {categoryDetails.engraving === 'Yes' && (
              <FormControl mt="2" isRequired>
                <FormLabel>Provide Engraving Details</FormLabel>
                <Input
                  placeholder="Details of engraving"
                  value={categoryDetails.engravingDetails || ''}
                  onChange={(e) => handleChange(e, 'engravingDetails')}
                />
              </FormControl>
            )}
          </FormControl>
        </Box>
      );
    case 'Necklaces':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Necklace Length</FormLabel>
            <Input
              placeholder="Length in inches or centimeters"
              value={categoryDetails.necklaceLength || ''}
              onChange={(e) => handleChange(e, 'necklaceLength')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Chain Type</FormLabel>
            <Input
              placeholder="e.g., Snake, Rolo, Curb"
              value={categoryDetails.chainType || ''}
              onChange={(e) => handleChange(e, 'chainType')}
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Pendant Description (if applicable)</FormLabel>
            <Textarea
              placeholder="Describe the pendant if applicable"
              value={categoryDetails.pendantDescription || ''}
              onChange={(e) => handleChange(e, 'pendantDescription')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Chain Strength</FormLabel>
            <Select
              placeholder="Select Chain Strength"
              value={categoryDetails.chainStrength || ''}
              onChange={(e) => handleChange(e, 'chainStrength')}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </Select>
          </FormControl>
        </Box>
      );
    case 'Bracelets':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Bracelet Type</FormLabel>
            <Input
              placeholder="e.g., Bangle, Tennis, Cuff, Chain"
              value={categoryDetails.braceletType || ''}
              onChange={(e) => handleChange(e, 'braceletType')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Bracelet Size</FormLabel>
            <Input
              placeholder="Length in inches or wrist size"
              value={categoryDetails.braceletSize || ''}
              onChange={(e) => handleChange(e, 'braceletSize')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Clasp Type</FormLabel>
            <Input
              placeholder="e.g., Lobster Clasp, Toggle, Hook"
              value={categoryDetails.claspType || ''}
              onChange={(e) => handleChange(e, 'claspType')}
            />
          </FormControl>
        </Box>
      );
    case 'Earrings':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Earring Type</FormLabel>
            <Input
              placeholder="e.g., Stud, Hoop, Drop, Dangle"
              value={categoryDetails.earringType || ''}
              onChange={(e) => handleChange(e, 'earringType')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Back Type</FormLabel>
            <Select
              placeholder="Select Back Type"
              value={categoryDetails.backType || ''}
              onChange={(e) => handleChange(e, 'backType')}
            >
              <option value="Screw Back">Screw Back</option>
              <option value="Push-Back">Push-Back</option>
              <option value="Clip-On">Clip-On</option>
            </Select>
          </FormControl>
        </Box>
      );
    case 'Bangles':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Bangle Type</FormLabel>
            <Select
              placeholder="Select Bangle Type"
              value={categoryDetails.bangleType || ''}
              onChange={(e) => handleChange(e, 'bangleType')}
            >
              <option value="Solid">Solid</option>
              <option value="Hollow">Hollow</option>
              <option value="Adjustable">Adjustable</option>
            </Select>
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Bangle Size</FormLabel>
            <Input
              placeholder="Diameter in millimeters or inches"
              value={categoryDetails.bangleSize || ''}
              onChange={(e) => handleChange(e, 'bangleSize')}
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Clasp Type (if applicable)</FormLabel>
            <Input
              placeholder="e.g., Clasp Type"
              value={categoryDetails.claspType || ''}
              onChange={(e) => handleChange(e, 'claspType')}
            />
          </FormControl>
        </Box>
      );
    case 'Pendants':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Pendant Design</FormLabel>
            <Textarea
              placeholder="Describe the design or shape"
              value={categoryDetails.pendantDesign || ''}
              onChange={(e) => handleChange(e, 'pendantDesign')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Pendant Size</FormLabel>
            <Input
              placeholder="Length and width in millimeters"
              value={categoryDetails.pendantSize || ''}
              onChange={(e) => handleChange(e, 'pendantSize')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Bail Type</FormLabel>
            <Select
              placeholder="Select Bail Type"
              value={categoryDetails.bailType || ''}
              onChange={(e) => handleChange(e, 'bailType')}
            >
              <option value="Hinged Bail">Hinged Bail</option>
              <option value="Fixed Bail">Fixed Bail</option>
            </Select>
          </FormControl>
        </Box>
      );
    case 'Anklets':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Anklet Type</FormLabel>
            <Select
              placeholder="Select Anklet Type"
              value={categoryDetails.ankletType || ''}
              onChange={(e) => handleChange(e, 'ankletType')}
            >
              <option value="Chain">Chain</option>
              <option value="Beaded">Beaded</option>
              <option value="Adjustable">Adjustable</option>
            </Select>
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Length</FormLabel>
            <Input
              placeholder="Length in inches or centimeters"
              value={categoryDetails.length || ''}
              onChange={(e) => handleChange(e, 'length')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Design Details</FormLabel>
            <Textarea
              placeholder="Any charms or beads?"
              value={categoryDetails.designDetails || ''}
              onChange={(e) => handleChange(e, 'designDetails')}
            />
          </FormControl>
        </Box>
      );
    case 'Brooches':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Brooch Type</FormLabel>
            <Select
              placeholder="Select Brooch Type"
              value={categoryDetails.broochType || ''}
              onChange={(e) => handleChange(e, 'broochType')}
            >
              <option value="Pin">Pin</option>
              <option value="Clasp">Clasp</option>
              <option value="Safety Catch">Safety Catch</option>
            </Select>
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Size (mm)</FormLabel>
            <Input
              type="number"
              placeholder="Size in millimeters"
              value={categoryDetails.size || ''}
              onChange={(e) => handleChange(e, 'size')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Pin Type</FormLabel>
            <Select
              placeholder="Select Pin Type"
              value={categoryDetails.pinType || ''}
              onChange={(e) => handleChange(e, 'pinType')}
            >
              <option value="Safety Pin">Safety Pin</option>
              <option value="Clasp Pin">Clasp Pin</option>
            </Select>
          </FormControl>
        </Box>
      );
    case 'Others':
      return (
        <Box>
          <FormControl isRequired>
            <FormLabel>Specify Type</FormLabel>
            <Input
              placeholder="Provide the type of jewelry"
              value={categoryDetails.specifyType || ''}
              onChange={(e) => handleChange(e, 'specifyType')}
            />
          </FormControl>
          <FormControl isRequired mt="4">
            <FormLabel>Design Details</FormLabel>
            <Textarea
              placeholder="Describe unique features"
              value={categoryDetails.designDetails || ''}
              onChange={(e) => handleChange(e, 'designDetails')}
            />
          </FormControl>
        </Box>
      );
    default:
      return null;
  }
}
