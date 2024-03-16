import * as yup from "yup";

const accountInfoSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
});

export default accountInfoSchema;
