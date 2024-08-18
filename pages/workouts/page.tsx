"use client";

import { useStore } from "@/store";
import { useState, useEffect } from "react";
import { Workout } from "@/types";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutCard from "@/components/WorkoutCard";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/api";

export default async function Page() {
  const { supabaseUrl } = useStore();
  const { data: session } = useSession();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!session) return;

      try {
        const { data: workouts, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("userId", session.user.id);

        if (error) {
          console.error("Error fetching workouts:", error);
          return;
        }

        setWorkouts(workouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [session, supabaseUrl]);

  const handleAddWorkout = () => {
    setIsAddingWorkout(true);
    setSelectedWorkout(null);
  };

  const handleCloseForm = () => {
    setIsAddingWorkout(false);
    setSelectedWorkout(null);
  };

  const handleEditWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsAddingWorkout(true);
  };

  const handleSubmitWorkout = async (workout: Workout) => {
    if (!session) return;

    try {
      if (workout.id) {
        // Update existing workout
        const { error } = await supabase
          .from("workouts")
          .update({
            name: workout.name,
            type: workout.type,
            duration: workout.duration,
            intensity: workout.intensity,
            date: workout.date,
          })
          .eq("id", workout.id);

        if (error) {
          console.error("Error updating workout:", error);
          return;
        }
      } else {
        // Create new workout
        const { error } = await supabase
          .from("workouts")
          .insert({
            name: workout.name,
            type: workout.type,
            duration: workout.duration,
            intensity: workout.intensity,
            date: workout.date,
            userId: session.user.id,
          });

        if (error) {
          console.error("Error creating workout:", error);
          return;
        }
      }

      // Refresh workout list
      const { data: updatedWorkouts, error: updateError } = await supabase
        .from("workouts")
        .select("*")
        .eq("userId", session.user.id);

      if (updateError) {
        console.error("Error updating workout list:", updateError);
        return;
      }

      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Workouts</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddWorkout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Workout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} onEdit={handleEditWorkout} />
        ))}
      </div>
      {isAddingWorkout && (
        <WorkoutForm
          workout={selectedWorkout}
          onSubmit={handleSubmitWorkout}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}