import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import SwitchField from "components/fields/SwitchField";
import Menu from "components/menu/MainMenu";

const switchFields = [
  { id: "1", label: "Item update notifications", isChecked: true },
  { id: "2", label: "Item comment notifications", reversed: true },
  { id: "3", label: "Buyer review notifications", isChecked: true },
  { id: "4", label: "Rating reminders notifications", reversed: true },
  { id: "5", label: "Meetups near you notifications", reversed: true },
  { id: "6", label: "Company news notifications", reversed: true },
  { id: "7", label: "New launches and projects", isChecked: true },
  { id: "8", label: "Monthly product changes", reversed: true },
  { id: "9", label: "Subscribe to newsletter", isChecked: true },
  { id: "10", label: "Email me when someone follows me", reversed: true },
];

export default function Notifications(props) {
  const { ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card mb="20px" mt="40px" mx="auto" maxW="100%" w="100%" {...rest}>
      <Flex align="center" w="100%" justify="space-between" mb="30px">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          Notifications
        </Text>
        <Menu />
      </Flex>
      <Flex
        direction="column"
        w="100%"
        maxWidth="800px"
        mx="auto"
        mt="40px"
      >
        {switchFields.map((field) => (
          <SwitchField
            key={field.id}
            isChecked={field.isChecked || false}
            reversed={field.reversed || false}
            fontSize="sm"
            mb="20px"
            id={field.id}
            label={field.label}
          />
        ))}
      </Flex>
    </Card>
  );
}
