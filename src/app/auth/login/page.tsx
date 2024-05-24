import CardWrapper from "@/components/shared/card-wrapper";
import ContinueDivider from "@/components/shared/continue-divider";
import GoogleLoginForm from "@/components/shared/google-login-form";
import NoAccountLink from "./_components/no-account-link";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <CardWrapper
      title="Login"
      description="Enter your email and password to login to your account"
    >
      <div className="gap-y-4 items-center flex flex-col">
        <LoginForm />
        <ContinueDivider />
        <GoogleLoginForm />
        <NoAccountLink />
      </div>
    </CardWrapper>
  );
}
