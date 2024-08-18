import { GOAL_TYPES, WORKOUT_TYPES, INTENSITY_LEVELS } from './constants';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

export const validateGoal = (goal: any) => {
  const errors: any = {};

  if (!goal.name || goal.name.trim() === '') {
    errors.name = 'Goal name is required.';
  }

  if (!goal.type || !GOAL_TYPES.includes(goal.type)) {
    errors.type = 'Invalid goal type.';
  }

  if (!goal.target || goal.target <= 0) {
    errors.target = 'Target value must be a positive number.';
  }

  if (!goal.startDate || !isValidDate(goal.startDate)) {
    errors.startDate = 'Invalid start date.';
  }

  if (!goal.endDate || !isValidDate(goal.endDate)) {
    errors.endDate = 'Invalid end date.';
  }

  if (goal.startDate && goal.endDate && new Date(goal.startDate) >= new Date(goal.endDate)) {
    errors.endDate = 'End date must be after start date.';
  }

  return errors;
};

export const validateWorkout = (workout: any) => {
  const errors: any = {};

  if (!workout.name || workout.name.trim() === '') {
    errors.name = 'Workout name is required.';
  }

  if (!workout.type || !WORKOUT_TYPES.includes(workout.type)) {
    errors.type = 'Invalid workout type.';
  }

  if (!workout.duration || workout.duration <= 0) {
    errors.duration = 'Duration must be a positive number.';
  }

  if (!workout.intensity || !INTENSITY_LEVELS.includes(workout.intensity)) {
    errors.intensity = 'Invalid intensity level.';
  }

  if (!workout.date || !isValidDate(workout.date)) {
    errors.date = 'Invalid date.';
  }

  return errors;
};

const isValidDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};