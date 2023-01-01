import { MuscleGroup, workOutSession } from "@prisma/client";
import TreinoCard from "./TreinoCard";
import { useState } from "react";
import { trpc } from "../utils/trpc";


function SelectedWorkouts({
  day,
  numberMonth,
  year,
  workOut,
}: {
  day: number;
  numberMonth: number;
  year: number;
  workOut?: workOutSession;
}) {
  const [cardio, setCardio] = useState(workOut ? workOut.cardio : false);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    MuscleGroup[]
  >(workOut ? workOut.muscleGroup : []);

  const context = trpc.useContext();
  const criarTreino = trpc.treinos.createTreino.useMutation({
    onSuccess: () => {
      context.datas.getDatas.invalidate();
    },
  });

  const handleSave = () => {
    const novo: MuscleGroup[] = selectedMuscleGroups;

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

  const muscleGroups = Object.values(MuscleGroup);
  

  return (
    <>
      <div className="flex w-full flex-col items-start gap-4 ">
        <p className="font-semibold">
          Selecione os grupos musculares treinados:
        </p>

        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-3">
          {muscleGroups.map((muscleGroup) => {
            return (
              <TreinoCard
                wasChecked={selectedMuscleGroups.includes(muscleGroup)}
                handleCheckboxChange={handleCheckboxChange}
                key={muscleGroup}
                value={muscleGroup}
                nome={muscleGroup}
              />
            );
          })}
        </div>
        <div>
          <div className="mr-4 flex items-center">
            <input
              onChange={handleCardioChange}
              checked={cardio ? cardio : false}
              id="inline-checked-checkbox"
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
            />
            <label className="ml-2 text-lg  font-semibold text-gray-900 ">
              Fez Cardio?
            </label>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-lg font-medium  "
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
            Salvar treino
          </span>
        </button>
      </div>
    </>
  );
}

export default SelectedWorkouts;
