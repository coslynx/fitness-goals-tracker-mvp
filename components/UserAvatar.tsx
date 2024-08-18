"use client";

import { useStore } from "@/store";
import { User } from "@/types";
import { useState } from "react";
import Image from "next/image";

interface UserAvatarProps {
  user: User;
  size?: number;
  className?: string;
}

const UserAvatar = ({ user, size = 40, className }: UserAvatarProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { supabaseUrl } = useStore();

  return (
    <div
      className={`
        relative
        rounded-full
        overflow-hidden
        ${className}
      `}
      style={{ width: size, height: size }}
    >
      {user.avatarUrl ? (
        <Image
          src={user.avatarUrl}
          alt="User Avatar"
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setIsLoading(false)}
        />
      ) : (
        <div
          className={`
            flex
            items-center
            justify-center
            w-full
            h-full
            bg-gray-200
            text-gray-500
            font-medium
            text-xl
          `}
        >
          {user.name?.charAt(0)}
        </div>
      )}
      {isLoading && (
        <div
          className={`
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-gray-200
            opacity-50
          `}
        >
          {/* Add a loading indicator here */}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;