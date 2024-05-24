"use client";

import { signIn } from "next-auth/react";
import GoogleLoginButton from "./google-login-button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function GoogleLoginForm() {
  const handleGoogleLogin = () => {
    signIn("google", {
      DEFAULT_LOGIN_REDIRECT,
    });
  };

  return <GoogleLoginButton onClick={handleGoogleLogin} />;
}
