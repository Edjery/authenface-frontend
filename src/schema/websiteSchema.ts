import * as yup from "yup";

const websiteFormSchema = yup.object({
  id: yup.number().nullable(),
  name: yup.string().nullable(),
  url: yup.string().required("Website URL is required").trim(),
  account_name: yup.string().required("Account Name is required").trim(),
  user: yup.number().nullable(),
  created_at: yup.string().nullable(),
});

export default websiteFormSchema;
