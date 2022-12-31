import { useState } from "react";
import TreinoCard from "./TreinoCard";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { MuscleGroup } from "@prisma/client";
import SelectedWorkouts from "./SelectedWorkouts";

export default function DayCard({
  day,
  dayOfWeek,
}: {
  day: number;
  dayOfWeek: string;
}) {
  const [open, setOpen] = useState(false);
  // make list of muscle groups from MuscleGroup enum
  const muscleGroups = Object.values(MuscleGroup);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    MuscleGroup[]
  >([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked && !selectedMuscleGroups.includes(value as MuscleGroup)) {
      setSelectedMuscleGroups([...selectedMuscleGroups, value as MuscleGroup]);
    } else {
      setSelectedMuscleGroups(
        selectedMuscleGroups.filter((muscleGroup) => muscleGroup !== value)
      );
    }
  };

  return (
    <div className=" flex  flex-col  rounded-md border px-4 py-6 shadow-md">
      <div className="flex flex-row justify-between">
        <h1>
          {dayOfWeek.toUpperCase()}, {day}
        </h1>
        <PencilSquareIcon
          onClick={() => setOpen(!open)}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
      <button onClick={() => console.log(selectedMuscleGroups)}>oasd</button>
      {open && <SelectedWorkouts handleCheckboxChange={handleCheckboxChange} />}
    </div>
  );
}
