import React from "react";

const InactiveModal = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={maxWidth}>
        <ModalBody>
          <Box w="100%" h="100%">
            <Image src={src} alt={alt} w="100%" h="100%" objectFit="contain" />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InactiveModal;
