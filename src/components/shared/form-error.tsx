import { AlertTriangleIcon } from "lucide-react";

type FormErrorProps = {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if(!message) return null
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive w-full">
      <AlertTriangleIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  )
}