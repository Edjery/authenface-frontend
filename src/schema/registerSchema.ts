import * as yup from "yup";

const registerSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  confirmPassword: yup.string().required("Required"),
  userImage: yup.mixed().required("Please upload an image"),
});

export default registerSchema;
