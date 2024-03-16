import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";

const maxWidth = 600;

const InactiveModal = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <Modal isOpen={!isAuthenticated()} onClose={handleLogout}>
      <ModalOverlay />
      <ModalContent maxW={maxWidth}>
        <ModalBody>
          <Text>
            Oops! It seems you've been signed out due to inactivity. Please sign
            in again to continue using the application.
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InactiveModal;
