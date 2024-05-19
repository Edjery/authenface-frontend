import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PrivacyActDialog from "../components/PrivacyActDialog";
import Websites from "../components/Websites";
import InactiveModal from "../components/common/InactiveModal";
import { APPLICATION_NAME } from "../info-matrix";

const HomePage = () => {
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);

  const handlePrivacyDialogClose = () => {
    setPrivacyDialogOpen(false);
  };

  useEffect(() => {
    setPrivacyDialogOpen(true);
  }, []);
  
  return (
    <Box mx={5} my={10}>
      <Heading>Welcome to {APPLICATION_NAME}</Heading>
      <Websites />
      <InactiveModal />
      <PrivacyActDialog open={privacyDialogOpen} onClose={handlePrivacyDialogClose} />
    </Box>
  );
};

export default HomePage;
