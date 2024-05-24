"use client";

import { logoutAction } from "@/actions/logout-action";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const onClick = () => {
    logoutAction();
  };
  return (
    <Button onClick={onClick} className="w-full">
      Log out
    </Button>
  );
}
