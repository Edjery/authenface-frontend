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
import registerSchema from "../../schema/registerSchema";
import userService from "../../services/userService";

export interface registerValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userImage: File | null;
}
interface dataRespo {
  message: string;
  token: string;
}

const Register = () => {
  const { colorMode } = useColorMode();
  const initialValues: registerValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userImage: null,
  };

  const handleSubmit = async (values: registerValues) => {
    console.log(values);

    const response = await userService.register(values);
    console.log(response);
    if (response) {
      handleSignIn(response);
      console.log("successfully registered");
    }
  };

  const handleSignIn = (response: any) => {
    const signIn = useSignIn();
    signIn({
      auth: {
        token: response.token,
      },
      userState: {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
      },
    });
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
