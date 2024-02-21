import { Box, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return (
    <Box mx={5} my={10}>
      <Heading>Profile</Heading>
    </Box>
  );
};
export default Profile;
