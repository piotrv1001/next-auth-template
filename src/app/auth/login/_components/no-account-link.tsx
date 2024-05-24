import Link from "next/link";

export default function NoAccountLink() {
  return (
    <div className="mt-4 text-center text-sm">
      Don&apos;t have an account?{" "}
      <Link className="underline" href="/auth/register">
        Sign up
      </Link>
    </div>
  );
}
