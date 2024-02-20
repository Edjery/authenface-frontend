import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import websiteFormSchema from "../schema/websiteSchema";
import websiteService from "../services/websiteService";
import IWebsite from "../services/interfaces/IWebsite";

interface Props {
  userId: number | undefined;
  websiteId: number | undefined;
  isOpen: boolean;
  onClose: () => void;
  onFormSubmit: (formData: IWebsite) => void;
}

const WebsiteFormModal = ({
  userId,
  websiteId,
  isOpen,
  onClose,
  onFormSubmit,
}: Props) => {
  const initialValues: IWebsite = {
    id: websiteId,
    name: "",
    url: "",
    account_name: "",
    user: userId,
    created_at: "",
  };

  const loadData = async () => {
    if (websiteId) {
      const website = websiteService.get(websiteId);
      if (website) {
        initialValues.name = website.name;
        initialValues.url = website.url;
        initialValues.account_name = website.account_name;
      }
    }
  };

  loadData();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        validationSchema={websiteFormSchema}
        onSubmit={(values) => {
          console.log("values:", values);
          onClose();
          onFormSubmit(values);
        }}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <ModalContent>
              <ModalHeader textAlign="center">Edit Website</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box mt={5}>
                  <Field
                    as={Input}
                    name="name"
                    type="text"
                    placeholder="Website Name"
                    isInvalid={errors.name && touched.name}
                  />
                  <Text color="tomato">
                    {errors.name && touched.name ? errors.name : ""}
                  </Text>
                </Box>
                <Box mt={5}>
                  <Field
                    as={Input}
                    type="text"
                    name="url"
                    placeholder="Website Url"
                    isInvalid={errors.url && touched.url}
                  />
                  <Text color="tomato">
                    {errors.url && touched.url ? errors.url : ""}
                  </Text>
                </Box>
                <Box mt={5}>
                  <Field
                    as={Input}
                    type="text"
                    name="account_name"
                    placeholder="Account Username/Email"
                    isInvalid={errors.account_name && touched.account_name}
                  />
                  <Text color="tomato">
                    {errors.account_name && touched.account_name
                      ? errors.account_name
                      : ""}
                  </Text>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  mr={3}
                  colorScheme="blue"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default WebsiteFormModal;
