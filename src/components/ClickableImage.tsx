import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
}

const ClickableImage = ({ src, alt }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        onClick={openModal}
        cursor="pointer"
        maxWidth={20}
      />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent maxW="900">
          <ModalBody>
            <Box w="100%" h="100%">
              <Image
                src={src}
                alt={alt}
                w="100%"
                h="100%"
                objectFit="contain"
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClickableImage;
