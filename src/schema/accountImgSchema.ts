import * as yup from "yup";

const accountImgSchema = yup.object({
  image: yup.mixed().required("Please upload an image"),
});

export default accountImgSchema;
