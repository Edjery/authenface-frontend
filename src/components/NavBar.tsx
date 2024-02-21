import { HStack, Heading } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack mt={5} mx={10} justifyContent="space-between">
      <Link to="/">
        <Heading>AuthenFace</Heading>
      </Link>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
