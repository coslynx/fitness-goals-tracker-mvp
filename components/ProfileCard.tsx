"use client";

import { useStore } from "@/store";
import { User } from "@/types";
import { useState, useEffect } from "react";
import UserAvatar from "./UserAvatar";
import Button from "./Button";
import { BsFillPencilFill } from "react-icons/bs";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const { supabaseUrl } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from Supabase (if needed for additional profile details)
    // Update the isLoading state based on data availability
  }, []);

  const handleEditProfile = () => {
    // Navigate to edit profile page
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center gap-4">
        <UserAvatar user={user} size={80} />
        <div>
          <h2 className="font-bold text-lg">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
      <div className="mt-4">
        {/* Display additional profile details (e.g., bio, location, etc.) */}
      </div>
      <div className="mt-4">
        <Button label="Edit Profile" onClick={handleEditProfile} className="flex items-center gap-2">
          <BsFillPencilFill />
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;