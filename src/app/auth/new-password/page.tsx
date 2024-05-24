import CardWrapper from "@/components/shared/card-wrapper";
import NewPasswordForm from "./_components/new-password-form";

export default function NewPasswordPage() {
  return (
    <CardWrapper
      title="New Password"
      description="Enter your new password to reset your password"
    >
      <NewPasswordForm />
    </CardWrapper>
  );
}
