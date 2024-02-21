import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import loginSchema from "../../schema/loginSchema";

interface loginValues {
  username: string;
  password: string;
}

const login = () => {
  const { login } = useContext(AuthContext);
  const initialValues: loginValues = { username: "", password: "" };
  const handleSubmit = (values: loginValues) => {
    console.log(values);
    const jwtToken = "fake-jwt-token";
    login(jwtToken);
  };

  return (
    <Box p={6} rounded="md">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log("values:", values);
          handleSubmit(values);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <VStack spacing={5}>
              <FormControl id="username">
                <FormLabel>Username:</FormLabel>
                <Field
                  as={Input}
                  name="username"
                  type="text"
                  variant="filled"
                  isInvalid={errors.username && touched.username}
                />
                <Text color="tomato">
                  {errors.username && touched.username ? errors.username : ""}
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
              <Button
                mt={5}
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default login;
