import CardWrapper from "@/components/shared/card-wrapper";
import { Button } from "@/components/ui/button";
import { FingerprintIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <CardWrapper
      title="Welcome!"
      description="This is a Next.js Authentiation Template"
    >
      <div className="flex flex-col gap-y-6 items-center">
        <FingerprintIcon size={88} className="text-primary" />
        <div className="flex items-center gap-x-2 w-full">
          <Link href="/auth/login" className="flex-1">
            <Button variant="secondary" className="w-full">
              Login
            </Button>
          </Link>
          <Link href="/auth/register" className="flex-1">
            <Button variant="secondary" className="w-full">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </CardWrapper>
  );
}
