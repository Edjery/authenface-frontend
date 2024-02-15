import { Box, Button, Heading } from "@chakra-ui/react";
import Websites from "./Websites";

const MainHomeBody = () => {
  return (
    <Box mx={5} my={10}>
      <Heading>Welcome to AuthenFace</Heading>
      <Websites />
    </Box>
  );
};

export default MainHomeBody;
