"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { Workout } from "@/types";
import { BsFillCalendarDateFill, BsFillClockFill, BsFillEmojiAngryFill, BsFillEmojiHeartEyesFill, BsFillEmojiNeutralFill, BsFillEmojiSmileFill } from "react-icons/bs";
import Input from "./Input";
import Button from "./Button";

interface WorkoutFormProps {
  workout?: Workout;
  onSubmit: (workout: Workout) => void;
  onClose: () => void;
}

const WorkoutForm = ({ workout, onSubmit, onClose }: WorkoutFormProps) => {
  const { supabaseUrl } = useStore();
  const [name, setName] = useState(workout?.name || "");
  const [type, setType] = useState(workout?.type || "Cardio");
  const [duration, setDuration] = useState(workout?.duration || 0);
  const [intensity, setIntensity] = useState(workout?.intensity || 0);
  const [date, setDate] = useState(workout?.date ? new Date(workout?.date) : new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      onSubmit({
        id: workout?.id,
        name,
        type,
        duration,
        intensity,
        date: date.toISOString(),
      });
      onClose();
    } catch (error) {
      console.error("Error submitting workout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntensityChange = (value: number) => {
    setIntensity(value);
  };

  const intensityEmoji = intensity === 0 ? <BsFillEmojiNeutralFill /> : intensity === 1 ? <BsFillEmojiSmileFill /> : intensity === 2 ? <BsFillEmojiHeartEyesFill /> : intensity === 3 ? <BsFillEmojiAngryFill /> : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-md p-6 shadow-lg w-full max-w-md">
        <h2 className="font-bold text-xl mb-4">{workout ? "Edit Workout" : "Add Workout"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Name"
              type="text"
              value={name}
              onChange={(value) => setName(value)}
              isRequired
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="shadow-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 block w-full sm:text-sm border-gray-300"
            >
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
            </select>
          </div>
          <div className="mb-4">
            <Input
              label="Duration (minutes)"
              type="number"
              value={duration}
              onChange={(value) => setDuration(parseInt(value))}
              isRequired
            />
          </div>
          <div className="mb-4">
            <label htmlFor="intensity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Intensity
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                id="intensity"
                min="0"
                max="3"
                value={intensity}
                onChange={(event) => handleIntensityChange(parseInt(event.target.value))}
                className="w-full"
              />
              <span>{intensityEmoji}</span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date.toISOString().slice(0, 10)}
              onChange={(event) => setDate(new Date(event.target.value))}
              className="shadow-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 block w-full sm:text-sm border-gray-300"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button label="Cancel" variant="secondary" onClick={onClose} />
            <Button type="submit" label={workout ? "Save" : "Add"} loading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;