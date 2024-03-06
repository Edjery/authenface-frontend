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
import { Field, Form, Formik } from "formik";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../../schema/loginSchema";
import userService from "../../services/userService";
import ILoginValues from "./interface/ILoginValues";
import IUserData from "./interface/IUserData";

const Login = () => {
  const initialValues: ILoginValues = { email: "", password: "" };
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSignIn = (token: string, userData: IUserData) => {
    signIn({
      auth: {
        token: token,
      },
      userState: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
      },
    });
  };

  const handleSubmit = async (values: ILoginValues) => {
    const response = await userService.login(values);
    if (response) {
      handleSignIn(response.data.token, response.data.userData);
      navigate("/");
      console.log("login success");
    }
  };

  return (
    <Box p={6} rounded="md" bg={colorMode === "dark" ? "blue.800" : "blue.100"}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          // console.log("values:", values);
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
              <Button mt={5} type="submit" colorScheme="blue" width="full">
                Login
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
      <Box mt={5} textDecoration={"underline"}>
        <Link to="/login">Click here to register</Link>
      </Box>
    </Box>
  );
};
export default Login;
