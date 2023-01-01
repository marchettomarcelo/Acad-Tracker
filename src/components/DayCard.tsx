import { useState } from "react";
import TreinoCard from "./TreinoCard";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { MuscleGroup } from "@prisma/client";
import SelectedWorkouts from "./SelectedWorkouts";
import { trpc } from "../utils/trpc";

export default function DayCard({
  day,
  dayOfWeek,
  numberMonth,
  year,
}: {
  day: number;
  dayOfWeek: string;
  numberMonth: number;
  year: number;
}) {

  const [open, setOpen] = useState(false);
  const [cardio, setCardio] = useState(false);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
  MuscleGroup[]
  >([]);
  
  const criarTreino = trpc.treinos.createTreino.useMutation();

  const handleSave = () => {
    type certo = (
      | "CHEST"
      | "BACK"
      | "BICEPS"
      | "TRICEPS"
      | "SHOULDERS"
      | "LEGS"
      | "ABS"
      | "FOREARMS"
    )[];

    const novo: certo = selectedMuscleGroups;

    criarTreino.mutate({
      day,
      cardio,
      year,
      muscleGoups: novo,
      monthIndex: numberMonth,
    });
  };

  const handleCardioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardio(e.target.checked);
  };

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
    <div className=" flex  flex-col  rounded-md border p-6  shadow-md">
      <div className="flex flex-row justify-between">
        <h1>
          {dayOfWeek.toUpperCase()}, {day}
        </h1>
        <PencilSquareIcon
          onClick={() => setOpen(!open)}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
      {/* <button onClick={() => console.log(selectedMuscleGroups)}>oasd</button> */}
      {open && (
        <div className="flex flex-col items-center">
          <hr className="border-1 my-6 h-0.5 w-full rounded-md bg-black" />
          <SelectedWorkouts
            handleCheckboxChange={handleCheckboxChange}
            handleCardioChange={handleCardioChange}
          />
          <button
            onClick={handleSave}
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-lg font-medium  "
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
              Salvar treino
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
