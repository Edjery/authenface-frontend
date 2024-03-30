import { Box, Heading } from "@chakra-ui/react";
import Websites from "../components/Websites";
import InactiveModal from "../components/common/InactiveModal";
import { APPLICATION_NAME } from "../info-matrix";

const HomePage = () => {
  return (
    <Box mx={5} my={10}>
      <Heading>Welcome to {APPLICATION_NAME}</Heading>
      <Websites />
      <InactiveModal />
    </Box>
  );
};

export default HomePage;
