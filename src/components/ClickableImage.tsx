import { Image } from "@chakra-ui/react";
import { useState } from "react";
import ImageModal from "./ImageModal";

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
      <ImageModal
        isOpen={isOpen}
        onClose={closeModal}
        alt={alt}
        src={src}
        maxWidth="900px"
      />
    </>
  );
};

export default ClickableImage;
