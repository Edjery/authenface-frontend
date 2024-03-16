import { Box, Heading } from "@chakra-ui/react";
import Websites from "../components/Websites";
import InactiveModal from "../components/InactiveModal";

const HomePage = () => {
  return (
    <Box mx={5} my={10}>
      <Heading>Welcome to AuthenFace</Heading>
      <Websites />
      <InactiveModal />
    </Box>
  );
};

export default HomePage;
