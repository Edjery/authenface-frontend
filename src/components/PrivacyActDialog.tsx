import { Box, Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PrivacyActDialog = ({ open, onClose }: Props) => {
  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Data Privacy Notice</ModalHeader>
        <ModalBody>
          <Box p={4}>
            <Text mb={4}>
              Welcome! To continue using this website, please be aware of the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines. This act is a comprehensive privacy legislation that aims to protect the fundamental human right of privacy while ensuring the free flow of information to promote innovation and growth.
            </Text>
            <Text mb={4}>
              The act mandates that the processing of personal data by any organization, both in the private and public sectors, must adhere to the principles of transparency, legitimate purpose, and proportionality.
            </Text>
            <Text mb={4}>
              For more detailed information, you can read the full text of the law by following this link:{" "}
              <Link href="https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html" isExternal color="teal.500">
                Republic Act 10173
              </Link>.
            </Text>
            <Text mb={4}>
              By continuing to use this website, you acknowledge that you have been informed about this data privacy legislation and agree to comply with its provisions.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            I Understand
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrivacyActDialog;
