"use client";

import Image from "next/image";
import { User } from "lucide-react";

type UserAvatarProps = {
  name?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  size?: number; // avatar size in px
};

const avatarMap = {
  MALE: "/icons/man.png",
  FEMALE: "/icons/woman.png",
  OTHER: "/icons/user.png",
};

export default function UserAvatar({
  name,
  gender = "OTHER",
  size = 28,
}: UserAvatarProps) {
  const avatarSrc = avatarMap[gender] || avatarMap.OTHER;

  return (
    <div
      className="flex items-center justify-center rounded-full bg-pink-50 border border-pink-200 overflow-hidden"
      style={{ width: size, height: size }}
    >
      {name ? (
        <Image
          src={avatarSrc}
          alt={name}
          width={size}
          height={size}
          className="object-cover"
        />
      ) : (
        <User size={size * 0.6} className="text-pink-500" />
      )}
    </div>
  );
}
