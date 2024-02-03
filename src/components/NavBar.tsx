import { HStack, Heading } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack mt={5} mx={10} justifyContent="space-between">
      <Heading>AuthenFace</Heading>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
