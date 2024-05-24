import CardWrapper from "@/components/shared/card-wrapper";
import NewVerificationForm from "./_components/new-verification-form";

export default function NewVerificationPage() {
  return (
    <CardWrapper
      title="Verify Email"
      description="This is an email verification page"
    >
      <NewVerificationForm />
    </CardWrapper>
  );
}
