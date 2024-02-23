import { Box, Button, HStack, Heading } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Box mx={5} my={10}>
      <HStack justify="space-between">
        <Heading>Profile</Heading>
        <Button colorScheme="red">Logout</Button>
      </HStack>
    </Box>
  );
};
export default Profile;
