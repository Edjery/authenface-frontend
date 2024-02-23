import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Bounce, toast } from "react-toastify";
import registerSchema from "../../schema/registerSchema";
import axiosInstance from "../../services/apiClient";
import userService from "../../services/userService";

export interface registerValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { colorMode } = useColorMode();
  const initialValues: registerValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: registerValues) => {
    userService.register(values);
  };

  return (
    <Box p={6} rounded="md" bg={colorMode === "dark" ? "blue.800" : "blue.100"}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          console.log("values:", values);
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <VStack spacing={5}>
              <FormControl id="email">
                <FormLabel>Email:</FormLabel>
                <Field
                  as={Input}
                  name="email"
                  type="text"
                  variant="filled"
                  isInvalid={errors.email && touched.email}
                />
                <Text color="tomato">
                  {errors.email && touched.email ? errors.email : ""}
                </Text>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password:</FormLabel>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  variant="filled"
                  isInvalid={errors.password && touched.password}
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
                  isInvalid={errors.confirmPassword && touched.confirmPassword}
                />
                <Text color="tomato">
                  {errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""}
                </Text>
              </FormControl>
              <Button mt={5} type="submit" colorScheme="blue" width="full">
                Register
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default Register;
