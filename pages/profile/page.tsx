"use client";

import { useStore } from "@/store";
import { User } from "@/types";
import { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/api";

export default async function Page() {
  const { supabaseUrl } = useStore();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return;

      try {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id);

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }

        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [session, supabaseUrl]);

  if (!session || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 font-medium">Please log in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <ProfileCard user={user} />
    </div>
  );
}