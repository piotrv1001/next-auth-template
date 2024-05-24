"use client";

import { newVerificationAction } from "@/actions/new-verification-action";
import FormError from "@/components/shared/form-error";
import FormSuccess from "@/components/shared/form-success";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const user = useUser();
  const isLoggedIn = !!user;

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return setError("Token not found");
      const res = await newVerificationAction(token);
      if (res?.status === "error") {
        setError(res.message);
      } else if (res?.status === "success") {
        setSuccess("Email verified successfully");
      }
    };
    verifyToken();
  }, [token]);

  return (
    <div className="flex items-center w-full justify-center flex-col gap-y-6">
      {!error && !success && <div>Verifying email...</div>}
      <FormSuccess message={success} />
      <FormError message={error} />
      {success && (
        <>
          {isLoggedIn ? (
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/auth/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
