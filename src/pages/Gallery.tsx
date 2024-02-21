import { Box, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import Snapshots from "../components/Snapshots";
import useAuth from "../hooks/useAuth";

const Gallery = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return (
    <Box mx={5} my={10}>
      <Heading>Snapshots</Heading>
      <Snapshots />
    </Box>
  );
};

export default Gallery;
