"use server";

import { createServerComponent } from "next/server";
import { supabase } from "@/utils/api";
import { User } from "@/types";

export const GET = createServerComponent(async ({ params }) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", params.id);

    if (error) {
      throw error;
    }

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user as User), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Error fetching user", { status: 500 });
  }
});