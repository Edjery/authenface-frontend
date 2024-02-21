import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <VStack fontSize="xl" as="b" mt={10}>
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/profile">Profile</Link>
    </VStack>
  );
};

export default SideBar;
