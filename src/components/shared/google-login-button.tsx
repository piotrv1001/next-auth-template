"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

type GoogleLoginButtonProps = {
  onClick: () => void;
};

export default function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <Button
      variant="secondary"
      size="lg"
      className="w-full flex justify-center gap-x-4"
      onClick={onClick}
    >
      <FcGoogle className="h-5 w-5" />
      <span>Google</span>
    </Button>
  );
}
