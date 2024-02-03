import { Link, VStack } from "@chakra-ui/react";

const SideBar = () => {
  return (
    <VStack fontSize="xl" as="b">
      <Link>Home</Link>
      <Link>Snapshots</Link>
      <Link>Profile</Link>
    </VStack>
  );
};

export default SideBar;
