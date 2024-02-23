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
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import registerSchema from "../../schema/registerSchema";
import axiosInstance from "../../services/apiClient";
import { Bounce, toast } from "react-toastify";

interface registerValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [currentError, setCurrentError] = useState("");
  const { colorMode } = useColorMode();
  const { login } = useContext(AuthContext);
  const initialValues: registerValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();

  const handleSubmit = async (values: registerValues) => {
    try {
      console.log("what the ");
      const response = await axiosInstance.post("register", values);
      console.log("Success:", response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.error("Error:", error.response.data);
          for (const key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              toast.error(error.response.data[key].toString(), {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              });
            }
          }
        } else {
          console.error("Error:", error.message);
        }
      }
    }

    // login(values.email);
    // navigate("/");
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
