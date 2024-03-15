import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Heading } from "@chakra-ui/react";
import AccountInfo from "../components/AccountInfo";

const Profile = () => {
  return (
    <Box mx={5} my={10}>
      <HStack justifyContent="space-between">
        <Heading>Profile</Heading>
        <Button>
          <EditIcon />
        </Button>
      </HStack>
      <AccountInfo />
    </Box>
  );
};
export default Profile;
