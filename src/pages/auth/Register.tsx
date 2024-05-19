import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { Link, useNavigate } from "react-router-dom";
import TermsDialog from "../../components/TermsDialog";
import popUpError from "../../helpers/popUpError";
import registerSchema from "../../schema/registerSchema";
import userService from "../../services/userService";
import IAuthUser from "./interface/IAuthUser";
import IAccountValues from "./interface/IRegisterValues";

const Register = () => {
  const initialValues: IAccountValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userImage: null,
  };
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSignIn = (token: string, userData: IAuthUser) => {
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

  const handleSubmit = async (values: IAccountValues) => {
    const response = await userService.register(values);
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
        validationSchema={registerSchema}
        onSubmit={(values) => {
          if (acceptTerms) {
            handleSubmit(values);
          } else {
            popUpError("You need to agree to the terms and conditions to register")
          }
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <VStack spacing={5}>
              <FormControl id="name">
                <FormLabel>Name:</FormLabel>
                <Field
                  as={Input}
                  name="name"
                  type="text"
                  variant="filled"
                  isInvalid={errors.name && touched.name}
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
              <FormControl id="userImage">
                <FormLabel>User Image:</FormLabel>
                <Input
                  name="userImage"
                  type="file"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files && event.target.files[0];
                    setFieldValue("userImage", file);
                  }}
                  variant="unstyled"
                  required
                />
                <Text color="tomato">
                  {errors.userImage && touched.userImage
                    ? errors.userImage
                    : ""}
                </Text>
              </FormControl>

              <FormControl>
                <Checkbox
                  isChecked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                >
                  <Text>
                    I agree to the{' '}
                    <Text as="span" textDecoration="underline" onClick={() => setTermsOpen(true)} cursor="pointer">
                      Terms and Conditions
                    </Text>
                  </Text>
                </Checkbox>
              </FormControl>

              <Button mt={5} type="submit" colorScheme="blue" width="full">
                Register
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
      <Box mt={5} textDecoration="underline">
        <Link to="/login">Already have an account? Sign in</Link>
      </Box>
      <TermsDialog open={termsOpen} onClose={() => setTermsOpen(false)} />
    </Box>
  );
};

export default Register;
