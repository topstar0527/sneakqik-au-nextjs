import * as Yup from "yup";

export const SignInFormSchema = Yup.object({
  email: Yup.string().email("Please input valid email address").required("Email is required"),
  password: Yup.string().min(8, "Too short. Use at least 8 characters").required("Password is required"),
  keepMeSignIn: Yup.bool().required(),
}).required();

export type SignInFormType = Yup.InferType<typeof SignInFormSchema>;
