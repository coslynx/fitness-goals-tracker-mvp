"use client";

import { useStore } from "@/store";
import { useState, useEffect } from "react";
import GoalCard from "@/components/GoalCard";
import WorkoutCard from "@/components/WorkoutCard";
import FeedItem from "@/components/FeedItem";
import { User, Goal, Workout, FeedItemProps } from "@/types";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/api";

export default async function Page() {
  const { supabaseUrl } = useStore();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [feedItems, setFeedItems] = useState<FeedItemProps[]>([]);

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

    const fetchGoalData = async () => {
      if (!user) return;

      try {
        const { data: goals, error } = await supabase
          .from("goals")
          .select("*")
          .eq("userId", user.id);

        if (error) {
          console.error("Error fetching goal data:", error);
          return;
        }

        setGoals(goals);
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    const fetchWorkoutData = async () => {
      if (!user) return;

      try {
        const { data: workouts, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("userId", user.id);

        if (error) {
          console.error("Error fetching workout data:", error);
          return;
        }

        setWorkouts(workouts);
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    const fetchFeedData = async () => {
      try {
        const { data: feedItems, error } = await supabase
          .from("feed")
          .select("*, user:users(*)");

        if (error) {
          console.error("Error fetching feed data:", error);
          return;
        }

        setFeedItems(feedItems);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      }
    };

    fetchUserData();
    fetchGoalData();
    fetchWorkoutData();
    fetchFeedData();
  }, [session, user, supabaseUrl]);

  if (!session || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 font-medium">Please log in.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* User Profile */}
      <div className="col-span-1">
        <h2 className="font-bold text-xl mb-4">Your Profile</h2>
        <div className="grid grid-cols-1 gap-4">
          {user && (
            <div className="bg-white shadow-md rounded-md p-4 mb-4">
              <h2 className="font-bold text-lg mb-2">
                {user.name}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                {user.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Goals */}
      <div className="col-span-1">
        <h2 className="font-bold text-xl mb-4">Your Goals</h2>
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>

      {/* Workouts */}
      <div className="col-span-1">
        <h2 className="font-bold text-xl mb-4">Your Workouts</h2>
        <div className="grid grid-cols-1 gap-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>

      {/* Social Feed */}
      <div className="col-span-3 md:col-span-1">
        <h2 className="font-bold text-xl mb-4">Social Feed</h2>
        <div className="grid grid-cols-1 gap-4">
          {feedItems.map((feedItem) => (
            <FeedItem key={feedItem.id} {...feedItem} />
          ))}
        </div>
      </div>
    </div>
  );
}