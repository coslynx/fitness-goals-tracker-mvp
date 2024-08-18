"use client";

import { useStore } from "@/store";
import { useState, useEffect } from "react";
import { Goal } from "@/types";
import GoalForm from "@/components/GoalForm";
import GoalCard from "@/components/GoalCard";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/api";

export default async function Page() {
  const { supabaseUrl } = useStore();
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!session) return;

      try {
        const { data: goals, error } = await supabase
          .from("goals")
          .select("*")
          .eq("userId", session.user.id);

        if (error) {
          console.error("Error fetching goals:", error);
          return;
        }

        setGoals(goals);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, [session, supabaseUrl]);

  const handleAddGoal = () => {
    setIsAddingGoal(true);
    setSelectedGoal(null);
  };

  const handleCloseForm = () => {
    setIsAddingGoal(false);
    setSelectedGoal(null);
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsAddingGoal(true);
  };

  const handleSubmitGoal = async (goal: Goal) => {
    if (!session) return;

    try {
      if (goal.id) {
        // Update existing goal
        const { error } = await supabase
          .from("goals")
          .update({
            name: goal.name,
            description: goal.description,
            type: goal.type,
            target: goal.target,
            startDate: goal.startDate,
            endDate: goal.endDate,
          })
          .eq("id", goal.id);

        if (error) {
          console.error("Error updating goal:", error);
          return;
        }
      } else {
        // Create new goal
        const { error } = await supabase
          .from("goals")
          .insert({
            name: goal.name,
            description: goal.description,
            type: goal.type,
            target: goal.target,
            startDate: goal.startDate,
            endDate: goal.endDate,
            userId: session.user.id,
          });

        if (error) {
          console.error("Error creating goal:", error);
          return;
        }
      }

      // Refresh goal list
      const { data: updatedGoals, error: updateError } = await supabase
        .from("goals")
        .select("*")
        .eq("userId", session.user.id);

      if (updateError) {
        console.error("Error updating goal list:", updateError);
        return;
      }

      setGoals(updatedGoals);
    } catch (error) {
      console.error("Error submitting goal:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Goals</h1>
      <div className="flex justify-end mb-4">
        <button onClick={handleAddGoal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Goal
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onEdit={handleEditGoal} />
        ))}
      </div>
      {isAddingGoal && (
        <GoalForm
          goal={selectedGoal}
          onSubmit={handleSubmitGoal}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}