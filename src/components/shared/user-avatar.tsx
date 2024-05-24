import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  src?: string | null;
};

export default function UserAvatar({ src }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src ?? ""} alt="User image" />
      <AvatarFallback className="bg-primary text-white">
        <FaUser />
      </AvatarFallback>
    </Avatar>
  );
}
