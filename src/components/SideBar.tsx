import { Link, VStack } from "@chakra-ui/react";

const SideBar = () => {
  return (
    <VStack>
      <Link>Home</Link>
      <Link>Snapshots</Link>
      <Link>Profile</Link>
    </VStack>
  );
};

export default SideBar;
