import CardWrapper from "@/components/shared/card-wrapper";
import UserAvatar from "@/components/shared/user-avatar";
import { getCurrentUser } from "@/lib/utils";
import LogoutButton from "./_components/logout-button";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <CardWrapper
      title="Welcome!"
      description="This is a protected page for logged in users"
    >
      <div className="space-y-4">
        <UserAvatar src={user?.image} />
        <div>Name: {user?.name}</div>
        <div>Email: {user?.email}</div>
        <LogoutButton />
      </div>
    </CardWrapper>
  );
}
