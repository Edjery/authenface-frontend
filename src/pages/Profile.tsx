import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AccountInfo from "../components/AccountInfo";
import InactiveModal from "../components/InactiveModal";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <Box mx={5} my={10}>
      <HStack justifyContent="space-between">
        <Heading>Profile</Heading>
        <Button>
          <EditIcon onClick={() => navigate("/profile/edit")} />
        </Button>
      </HStack>
      <AccountInfo />
      <InactiveModal />
    </Box>
  );
};
export default Profile;
