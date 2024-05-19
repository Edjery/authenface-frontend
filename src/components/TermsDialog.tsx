import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TermsDialog = ({ open, onClose }: Props) => {
  return (
    <Modal isOpen={open} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Terms and Conditions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <Text mb={4}>Welcome to True Visage!</Text>
            <Text mb={4}>
              These terms and conditions govern the use of the True Visage API
              and related services provided by Self-Employed. By accessing or
              using our API, you agree to comply with these terms. If you do
              not agree, please do not use our API.
            </Text>
            <Text mb={4}>
              <strong>Terminology</strong> In these terms, "Client," "You," and
              "Your" refer to you, the individual or entity using our API.
              "Company," "We," "Our," and "Us" refer to Self-Employed.
              "Parties" refer to both you and us.
            </Text>
            <Text mb={4}>
              <strong>License</strong> Self-Employed and its licensors own all
              intellectual property rights for the materials on True Visage.
              You may access these materials for personal use, subject to the
              restrictions in these terms.
            </Text>
            <Text mb={4}>
              <strong>Restrictions</strong> You must not:
            </Text>
            <ul>
              <li>Republish material from True Visage</li>
              <li>Sell, rent, or sub-license material from True Visage</li>
              <li>Reproduce, duplicate, or copy material from True Visage</li>
              <li>Redistribute content from True Visage</li>
            </ul>
            <Text my={4}>
              <strong>User Consent and Data Requests</strong> By using the True
              Visage API, you acknowledge and agree that:
            </Text>
            <ul>
              <li>
                You may be requested to provide data, including images, for
                processing.
              </li>
              <li>
                You have obtained necessary consents from individuals whose
                data (including images) you provide.
              </li>
              <li>
                You will not use the API for any activity that violates any
                person's privacy or infringes on any intellectual property
                rights.
              </li>
            </ul>
            <Text my={4}>
              <strong>Comments and User-Generated Content</strong> Users may
              post comments and share information on True Visage. We do not
              filter, edit, or review comments before they appear on the site.
              Comments reflect the views of their authors, not Self-Employed.
              We are not liable for comments' content or any resulting
              liability.
            </Text>
            <Text mb={4}>
              <strong>Hyperlinking to Our Content</strong> The following
              organizations may link to our website without prior approval:
            </Text>
            <ul>
              <li>Cybersecurity agencies</li>
              <li>Search engines</li>
              <li>Online directories</li>
            </ul>
            <Text mb={4}>
              Other organizations may link to our website with approval. Links
              must not be deceptive, imply false sponsorship, or fit poorly
              within the context of the linking site.
            </Text>
            <Text mb={4}>
              <strong>Content Liability</strong> We are not responsible for
              content on your website. You agree to protect and defend us
              against all claims arising from your website. No link should
              appear on your website that may be interpreted as libelous,
              obscene, or criminal.
            </Text>
            <Text mb={4}>
              <strong>Reservation of Rights</strong> We reserve the right to
              request the removal of any link to our website. By linking to our
              site, you agree to these terms.
            </Text>
            <Text mb={4}>
              <strong>Disclaimer</strong> We do not guarantee the accuracy or
              completeness of the information on this website. We exclude all
              representations, warranties, and conditions to the maximum extent
              permitted by law.
            </Text>
            <Text mb={4}>
              By using the True Visage API and services, you agree to these
              terms and conditions. If you have any questions, please contact us.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TermsDialog;

