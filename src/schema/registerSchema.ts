import * as yup from "yup";

const registerSchema = yup.object({
  email: yup.string().email().required("Email is Required"),
  password: yup.string().required("Password is Required"),
  confirmPassword: yup.string().required("Confirm Password is Required"),
});

export default registerSchema;
