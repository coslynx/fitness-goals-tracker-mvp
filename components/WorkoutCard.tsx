"use client";

import { useStore } from "@/store";
import { Workout } from "@/types";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import Button from "./Button";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const { supabaseUrl } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch workout data from Supabase (if needed for additional details)
    // Update the isLoading state based on data availability
  }, []);

  const handleEditWorkout = () => {
    // Navigate to edit workout page
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="font-bold text-lg mb-2">{workout.name}</h2>
      <p className="text-gray-500 text-sm mb-2">
        Type: {workout.type}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        Duration: {workout.duration} minutes
      </p>
      <p className="text-gray-500 text-sm mb-2">
        Intensity: {workout.intensity}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        Date: {new Date(workout.date).toLocaleDateString()}
      </p>
      <div className="mt-4">
        <Button
          label="Edit Workout"
          onClick={handleEditWorkout}
          className="flex items-center gap-2"
        >
          <BiEditAlt />
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;