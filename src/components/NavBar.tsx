import { HStack, Link, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Text>AuthenFace</Text>
      <Link>
        <Text>Home</Text>
      </Link>
      <Link>
        <Text>Snapshots</Text>
      </Link>
      <Link>
        <Text>Profile</Text>
      </Link>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
