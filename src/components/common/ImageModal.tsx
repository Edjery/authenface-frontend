import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  alt: string;
  src: string;
  maxWidth: string;
}

const ImageModal = ({ isOpen, onClose, alt, src, maxWidth }: Props) => {
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

export default ImageModal;
