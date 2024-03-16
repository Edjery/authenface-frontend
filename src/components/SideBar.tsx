import { Box, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Stack
      my={10}
      spacing={5}
      fontSize="xl"
      fontWeight="bold"
      textAlign="center"
      justify="center"
      direction={{ base: "row", lg: "column" }}
    >
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/profile">Profile</Link>
    </Stack>
  );
};

export default SideBar;
