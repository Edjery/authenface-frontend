import { HStack, Heading } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack padding="10px" justifyContent="space-between">
      <Heading>AuthenFace</Heading>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
