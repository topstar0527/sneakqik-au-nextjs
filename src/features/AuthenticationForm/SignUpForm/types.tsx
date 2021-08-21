import * as Yup from "yup";

export const SignUpFormSchema = Yup.object({
  email: Yup.string().email("Please input valid email address").required("Email is required"),
  password: Yup.string().min(8, "Too short. Use at least 8 characters").required("Password is required"),
  isSubscribed: Yup.bool().required(),
  terms: Yup.bool().oneOf([true, false], "Please accept the SneakQIK Terms of Service before continuing"),
}).required();

export type SignUpFormType = Yup.InferType<typeof SignUpFormSchema>;
