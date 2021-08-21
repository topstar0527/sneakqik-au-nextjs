import React from "react";
import dynamic from 'next/dynamic'
import { useSelector } from "react-redux";

const BrandIntentModal = dynamic(() => import('../BrandIntentModal'));
const ForgotPasswordForm = dynamic(() => import('./ForgotPasswordForm'));
const PleaseVerifyYourEmail = dynamic(() => import('./PleaseVerifyYourEmail'));
const ResetPassword = dynamic(() => import('./ResetPassword'));
const SignInForm = dynamic(() => import('./SignInForm'));
const SignUpForm = dynamic(() => import('./SignUpForm'));


export default function AuthenticationForm() {
  const authState = useSelector((state: any) => state.auth);

  let RenderForm = SignInForm;

  if (authState.currentForm === "signUp") {
    RenderForm = SignUpForm;
  }

  if (authState.currentForm === "signIn") {
    RenderForm = SignInForm;
  }

  if (authState.currentForm === "forgotPass") {
    RenderForm = ForgotPasswordForm;
  }

  if (authState.currentForm === "resetPass") {
    RenderForm = ResetPassword;
  }

  if (authState.currentForm === "verifyEmail") {
    RenderForm = PleaseVerifyYourEmail;
  }

  if (authState.currentForm === "intentModal") {
    RenderForm = BrandIntentModal;
  }

  return <RenderForm />;
}
