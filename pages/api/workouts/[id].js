"use server";

import { createServerComponent } from "next/server";
import { supabase } from "@/utils/api";
import { Workout } from "@/types";

export const GET = createServerComponent(async ({ params }) => {
  try {
    const { data: workout, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", params.id);

    if (error) {
      throw error;
    }

    if (!workout) {
      return new Response("Workout not found", { status: 404 });
    }

    return new Response(JSON.stringify(workout as Workout), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching workout:", error);
    return new Response("Error fetching workout", { status: 500 });
  }
});