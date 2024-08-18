"use client";

import { useStore } from "@/store";
import { Goal } from "@/types";
import { useState, useEffect } from "react";
import ProgressChart from "./ProgressChart";
import Button from "./Button";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

interface GoalCardProps {
  goal: Goal;
}

const GoalCard = ({ goal }: GoalCardProps) => {
  const { supabaseUrl } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch goal data from Supabase (if needed for additional details)
    // Update the isLoading state based on data availability
  }, []);

  const handleEditGoal = () => {
    // Navigate to edit goal page
  };

  const handleDeleteGoal = async () => {
    // Implement logic to delete the goal
    // Use the useStore hook to send a request to Supabase to delete the goal.
    // Handle success and error scenarios accordingly.
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="font-bold text-lg mb-2">{goal.name}</h2>
      <p className="text-gray-500 text-sm mb-2">
        Type: {goal.type}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        Target: {goal.target}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        Start Date: {new Date(goal.startDate).toLocaleDateString()}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        End Date: {new Date(goal.endDate).toLocaleDateString()}
      </p>
      <ProgressChart goal={goal} />
      <div className="mt-4 flex justify-between gap-2">
        <Button
          label="Edit Goal"
          onClick={handleEditGoal}
          className="flex items-center gap-2"
        >
          <BiEditAlt />
        </Button>
        <Button
          label="Delete Goal"
          onClick={handleDeleteGoal}
          className="flex items-center gap-2"
          variant="danger"
        >
          <BiTrashAlt />
        </Button>
      </div>
    </div>
  );
};

export default GoalCard;