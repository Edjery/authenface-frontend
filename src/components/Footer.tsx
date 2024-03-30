import { HStack, Text } from "@chakra-ui/react";
import { APPLICATION_NAME } from "../info-matrix";

const Footer = () => {
  return (
    <HStack justifyContent="center" py={5}>
      <Text>{APPLICATION_NAME} © 2024. All rights reserved.</Text>
    </HStack>
  );
};

export default Footer;
