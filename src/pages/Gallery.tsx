import { Box, Heading } from "@chakra-ui/react";
import InactiveModal from "../components/InactiveModal";
import Snapshots from "../components/Snapshots";

const Gallery = () => {
  return (
    <Box mx={5} my={10}>
      <Heading>Snapshots</Heading>
      <Snapshots />
      <InactiveModal />
    </Box>
  );
};

export default Gallery;
