import CardWrapper from "@/components/shared/card-wrapper";
import ResetForm from "./_components/reset-form";

export default function ResetPage() {
  return (
    <CardWrapper
      title="Reset Password"
      description="Enter your email to reset your password"
    >
      <ResetForm />
    </CardWrapper>
  );
}
