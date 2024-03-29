import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import popUpError from "../helpers/popUpError";
import IAuthUser from "./auth/interface/IAuthUser";
import accountImgSchema from "../schema/accountImgSchema";
import accountInfoSchema from "../schema/accountInfoSchema";
import accountPassSchema from "../schema/accountPassSchema";
import IUser from "../services/interfaces/IUser";
import userService from "../services/userService";
import IAccountImg from "../components/Interface/IAccountImg";
import IAccountInfo from "../components/Interface/IAccountInfo";
import IAccountPass from "../components/Interface/IAccountPass";
import InactiveModal from "../components/common/InactiveModal";

// TODO: add cohesion

const EditProfile = () => {
  const auth = useAuthUser<IAuthUser>();
  const userId = auth?.id !== undefined ? auth.id : undefined;

  const [accountInfo, setAccountInfo] = useState<IAccountInfo | undefined>();
  const [accountPass, setAccountPass] = useState<IAccountPass | undefined>();
  const [accountImg, setAccountImg] = useState<IAccountImg | undefined>();

  const [editInfo, setEditInfo] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [editImg, setEditImg] = useState(false);

  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const [data, setData] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IUser = await userService.get(userId);
        setData(data);

        setAccountInfo({ name: data.name, email: data.email });
        setAccountPass({ password: "", confirmPassword: "" });
        setAccountImg({ image: null });

        console.log("Successfully Fetched Data");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (
    values: IAccountInfo | IAccountPass | IAccountImg
  ) => {
    const response = await userService.update(userId, values);
    if (response) navigate("/profile/edit");
  };

  return (
    <Box p={6} rounded="md" bg={colorMode === "dark" ? "blue.800" : "blue.100"}>
      <Heading>Edit Profile</Heading>
      {data !== undefined && accountInfo ? (
        <Formik
          initialValues={accountInfo}
          validationSchema={accountInfoSchema}
          onSubmit={(values) => {
            handleSubmit(values);
            setEditInfo(!editInfo);
          }}
          onReset={() => {
            setEditInfo(!editInfo);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <VStack spacing={5} my={5}>
                <FormControl id="name">
                  <FormLabel>Name:</FormLabel>
                  <Field
                    as={Input}
                    name="name"
                    type="text"
                    variant="filled"
                    isInvalid={errors.name && touched.name}
                    disabled={!editInfo}
                  />
                  <Text color="tomato">
                    {errors.name && touched.name ? errors.name : ""}
                  </Text>
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email:</FormLabel>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    variant="filled"
                    isInvalid={errors.email && touched.email}
                    disabled={!editInfo}
                  />
                  <Text color="tomato">
                    {errors.email && touched.email ? errors.email : ""}
                  </Text>
                </FormControl>
                <HStack>
                  <Button
                    onClick={() => setEditInfo(!editInfo)}
                    isDisabled={editInfo}
                  >
                    Edit
                  </Button>

                  <Button type="reset" isDisabled={!editInfo}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="full"
                    isDisabled={!editInfo}
                  >
                    Submit
                  </Button>
                </HStack>
              </VStack>
            </Form>
          )}
        </Formik>
      ) : null}

      {data !== undefined && accountPass ? (
        <Formik
          initialValues={accountPass}
          validationSchema={accountPassSchema}
          onSubmit={(values) => {
            if (values.password != values.confirmPassword) {
              popUpError("Password did not match");
            } else {
              handleSubmit(values);
            }
            setEditPass(!editPass);
          }}
          onReset={() => {
            setEditPass(!editPass);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <VStack spacing={5} my={5}>
                <FormControl id="password">
                  <FormLabel>Password:</FormLabel>
                  <Field
                    as={Input}
                    name="password"
                    type="password"
                    variant="filled"
                    isInvalid={errors.password && touched.password}
                    disabled={!editPass}
                  />
                  <Text color="tomato">
                    {errors.password && touched.password ? errors.password : ""}
                  </Text>
                </FormControl>
                <FormControl id="confirmPassword">
                  <FormLabel>Confirm Password:</FormLabel>
                  <Field
                    as={Input}
                    name="confirmPassword"
                    type="password"
                    variant="filled"
                    isInvalid={
                      errors.confirmPassword && touched.confirmPassword
                    }
                    disabled={!editPass}
                  />
                  <Text color="tomato">
                    {errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : ""}
                  </Text>
                </FormControl>

                <HStack>
                  <Button
                    maxWidth={60}
                    onClick={() => setEditPass(!editPass)}
                    isDisabled={editPass}
                    width="full"
                  >
                    Change Password
                  </Button>

                  <Button type="reset" isDisabled={!editPass}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="full"
                    isDisabled={!editPass}
                  >
                    Submit
                  </Button>
                </HStack>
              </VStack>
            </Form>
          )}
        </Formik>
      ) : null}

      {data !== undefined && accountImg ? (
        <Formik
          initialValues={accountImg}
          validationSchema={accountImgSchema}
          onSubmit={(values) => {
            handleSubmit(values);
            setEditImg(!editImg);
          }}
          onReset={() => {
            setEditImg(!editImg);
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <VStack spacing={5} my={5}>
                <FormControl id="image">
                  <FormLabel>User Image:</FormLabel>
                  <Input
                    name="image"
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files && event.target.files[0];
                      setFieldValue("image", file);
                    }}
                    variant="unstyled"
                    required
                    disabled={!editImg}
                  />
                  <Text color="tomato">
                    {errors.image && touched.image ? errors.image : ""}
                  </Text>
                </FormControl>

                <HStack>
                  <Button
                    maxWidth={60}
                    onClick={() => setEditImg(!editImg)}
                    isDisabled={editImg}
                    width="100%"
                  >
                    Change Image
                  </Button>

                  <Button type="reset" isDisabled={!editImg}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="full"
                    isDisabled={!editImg}
                  >
                    Submit
                  </Button>
                </HStack>
              </VStack>
            </Form>
          )}
        </Formik>
      ) : null}

      <InactiveModal />
    </Box>
  );
};

export default EditProfile;
