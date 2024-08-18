"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { Goal } from "@/types";
import Input from "./Input";
import Button from "./Button";
import { BsFillCalendarDateFill, BsFillEmojiNeutralFill, BsFillEmojiSmileFill } from "react-icons/bs";

interface GoalFormProps {
  goal?: Goal;
  onSubmit: (goal: Goal) => void;
  onClose: () => void;
}

const GoalForm = ({ goal, onSubmit, onClose }: GoalFormProps) => {
  const { supabaseUrl } = useStore();
  const [name, setName] = useState(goal?.name || "");
  const [description, setDescription] = useState(goal?.description || "");
  const [type, setType] = useState(goal?.type || "Weight Loss");
  const [target, setTarget] = useState(goal?.target || 0);
  const [startDate, setStartDate] = useState(
    goal?.startDate ? new Date(goal?.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    goal?.endDate ? new Date(goal?.endDate) : new Date()
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      onSubmit({
        id: goal?.id,
        name,
        description,
        type,
        target,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
      onClose();
    } catch (error) {
      console.error("Error submitting goal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date: Date, field: "startDate" | "endDate") => {
    if (field === "startDate") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-md p-6 shadow-lg w-full max-w-md">
        <h2 className="font-bold text-xl mb-4">
          {goal ? "Edit Goal" : "Add Goal"}
        </h2>
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
            <Input
              label="Description"
              type="text"
              value={description}
              onChange={(value) => setDescription(value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="shadow-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 block w-full sm:text-sm border-gray-300"
            >
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Distance Running">Distance Running</option>
              <option value="Strength Training">Strength Training</option>
              <option value="Flexibility">Flexibility</option>
            </select>
          </div>
          <div className="mb-4">
            <Input
              label="Target"
              type="number"
              value={target}
              onChange={(value) => setTarget(parseInt(value))}
              isRequired
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate.toISOString().slice(0, 10)}
              onChange={(event) => handleDateChange(new Date(event.target.value), "startDate")}
              className="shadow-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 block w-full sm:text-sm border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate.toISOString().slice(0, 10)}
              onChange={(event) => handleDateChange(new Date(event.target.value), "endDate")}
              className="shadow-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 block w-full sm:text-sm border-gray-300"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button label="Cancel" variant="secondary" onClick={onClose} />
            <Button type="submit" label={goal ? "Save" : "Add"} loading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;