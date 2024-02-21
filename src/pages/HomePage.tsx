import { Box, Heading } from "@chakra-ui/react";
import Websites from "../components/Websites";

const HomePage = () => {
  return (
    <Box mx={5} my={10}>
      <Heading>Welcome to AuthenFace</Heading>
      <Websites />
    </Box>
  );
};

export default HomePage;
