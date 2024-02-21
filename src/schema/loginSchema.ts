import * as yup from "yup";

const loginSchema = yup.object({
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required"),
});

export default loginSchema;
