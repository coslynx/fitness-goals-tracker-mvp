import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getGoals = async (userId: string) => {
  try {
    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .eq('userId', userId);

    if (error) {
      throw error;
    }

    return goals;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoal = async (goal: any) => {
  try {
    const { error } = await supabase
      .from('goals')
      .insert([goal]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoal = async (goalId: string, goal: any) => {
  try {
    const { error } = await supabase
      .from('goals')
      .update(goal)
      .eq('id', goalId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

export const deleteGoal = async (goalId: string) => {
  try {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', goalId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

export const getWorkouts = async (userId: string) => {
  try {
    const { data: workouts, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('userId', userId);

    if (error) {
      throw error;
    }

    return workouts;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    throw error;
  }
};

export const createWorkout = async (workout: any) => {
  try {
    const { error } = await supabase
      .from('workouts')
      .insert([workout]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
};

export const updateWorkout = async (workoutId: string, workout: any) => {
  try {
    const { error } = await supabase
      .from('workouts')
      .update(workout)
      .eq('id', workoutId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string) => {
  try {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', workoutId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const getFeed = async () => {
  try {
    const { data: feedItems, error } = await supabase
      .from('feed')
      .select('*, user:users(*)');

    if (error) {
      throw error;
    }

    return feedItems;
  } catch (error) {
    console.error('Error fetching feed items:', error);
    throw error;
  }
};