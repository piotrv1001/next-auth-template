import CardWrapper from "@/components/shared/card-wrapper";
import RegisterForm from "./_components/register-form";
import ContinueDivider from "@/components/shared/continue-divider";
import GoogleLoginForm from "@/components/shared/google-login-form";

export default function RegisterPage() {
  return (
    <CardWrapper
      title="Create an account"
      description="Enter your email and password to create an account"
    >
      <div className="gap-y-4 items-center flex flex-col">
        <RegisterForm />
        <ContinueDivider />
        <GoogleLoginForm />
      </div>
    </CardWrapper>
  );
}