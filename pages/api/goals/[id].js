"use server";

import { createServerComponent } from "next/server";
import { supabase } from "@/utils/api";
import { Goal } from "@/types";

export const GET = createServerComponent(async ({ params }) => {
  try {
    const { data: goal, error } = await supabase
      .from("goals")
      .select("*")
      .eq("id", params.id);

    if (error) {
      throw error;
    }

    if (!goal) {
      return new Response("Goal not found", { status: 404 });
    }

    return new Response(JSON.stringify(goal as Goal), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching goal:", error);
    return new Response("Error fetching goal", { status: 500 });
  }
});