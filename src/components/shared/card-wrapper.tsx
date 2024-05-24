"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardWrapperProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function CardWrapper({
  title,
  description,
  children,
}: CardWrapperProps) {
  return (
    <Card className="w-full max-w-lg shadow-md border border-secondary">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
