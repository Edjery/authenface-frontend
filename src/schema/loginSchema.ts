import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

export default loginSchema;
