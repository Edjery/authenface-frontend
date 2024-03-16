import * as yup from "yup";

const accountPassSchema = yup.object({
  password: yup.string().required("Required"),
  confirmPassword: yup.string().required("Required"),
});

export default accountPassSchema;
