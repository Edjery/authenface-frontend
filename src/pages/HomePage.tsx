import { Box, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import Websites from "../components/Websites";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return (
    <Box mx={5} my={10}>
      <Heading>Welcome to AuthenFace</Heading>
      <Websites />
    </Box>
  );
};

export default HomePage;
