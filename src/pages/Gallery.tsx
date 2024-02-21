import { Box, Heading } from "@chakra-ui/react";
import Snapshots from "../components/Snapshots";

const Gallery = () => {
  return (
    <Box mx={5} my={10}>
      <Heading>Snapshots</Heading>
      <Snapshots />
    </Box>
  );
};

export default Gallery;
