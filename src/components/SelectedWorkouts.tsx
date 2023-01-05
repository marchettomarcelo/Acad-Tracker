import { MuscleGroup, workOutSession } from "@prisma/client";
import TreinoCard from "./TreinoCard";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { stat } from "fs/promises";

function SelectedWorkouts({
  day,
  numberMonth,
  year,
  workOut,
  setEdit,

  setEditMode,
}: {
  setEdit: (value: React.SetStateAction<boolean>) => void;
  day: number;
  numberMonth: number;
  year: number;
  workOut?: workOutSession;
  setEditMode: (value: React.SetStateAction<boolean>) => void;
}) {
  // --- State ---
  const [cardio, setCardio] = useState(workOut ? workOut.cardio : false);
  const [selectedOption, setSelectedOption] = useState<
    "skipped" | "treinou" | "rest"
  >(workOut?.skipped ? "skipped" : workOut?.rest ? "rest" : "treinou");

  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    MuscleGroup[]
  >(workOut ? workOut.muscleGroup : []);

  // --- Trpc related stuff ---
  const context = trpc.useContext();
  const criarTreino = trpc.treinos.createTreino.useMutation({
    onSuccess: () => {
      context.datas.getDatas.invalidate();
      setEditMode(false);
      setEdit(false);
    },
  });

  const editarTreino = trpc.treinos.editTreino.useMutation({
    onSuccess: () => {
      context.datas.getDatas.invalidate();
      setEditMode(false);
      setEdit(false);
    },
  });

  // --- helper function to save the workout ---
  const handleSave = () => {
    const novo: MuscleGroup[] = selectedMuscleGroups;

    criarTreino.mutate({
      day,
      cardio,
      skipped: selectedOption === "skipped",
      rest: selectedOption === "rest",
      year,
      muscleGoups: novo,
      monthIndex: numberMonth,
    });
  };

  // --- helper function to chanfe state ---
  const handleCardioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardio(e.target.checked);
  };

  // --- helper function to change state ---
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as "skipped" | "treinou" | "rest");
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

  // --- helper function to edit the workout ---
  const handleEdit = () => {
    if (!workOut) {
      return;
    }
    editarTreino.mutate({
      workOutId: workOut?.id,
      cardio,
      muscleGoups: selectedMuscleGroups,
      skipped: selectedOption === "skipped",
      rest: selectedOption === "rest",
    });
  };

  // --- gamb ---
  const muscleGroups = Object.values(MuscleGroup);

  return (
    <>
      <div className="flex w-full flex-col items-start gap-4 ">
        <button onClick={() => console.log(selectedOption)}>opa</button>
        <h3 className=" font-semibold text-gray-900 ">O que você fez hoje?</h3>
        <ul
          id={day as unknown as string}
          className="w-full items-center rounded-lg border border-black  bg-white text-sm font-medium text-gray-900   sm:flex"
        >
          <li className="w-full ">
            <div className="flex items-center pl-3">
              <input
                key={1}
                id={day as unknown as string}
                type="radio"
                checked={selectedOption === "rest"}
                onChange={handleOptionChange}
                name="list-radio"
                value="rest"
                className="bg-gray h-4 w-4 cursor-pointer rounded border-gray-300"
              />
              <label className="ml-2 w-full py-3 text-sm font-medium text-gray-900 ">
                Descansou
              </label>
            </div>
          </li>
          <li className="w-full border-black ">
            <div className="flex items-center border-black pl-3">
              <input
                key={2}
                id={day as unknown as string}
                type="radio"
                value="skipped"
                name="list-radio"
                className="bg-gray h-4 w-4 cursor-pointer rounded border-gray-300"
                checked={selectedOption === "skipped"}
                onChange={handleOptionChange}
              />
              <label className="ml-2 w-full py-3 text-sm font-medium text-gray-900 ">
                Skip
              </label>
            </div>
          </li>
          <li className="w-full border-black ">
            <div className="flex items-center border-black pl-3">
              <input
                key={3}
                id={day as unknown as string}
                type="radio"
                value="treinou"
                name="list-radio"
                className="bg-gray h-4 w-4 cursor-pointer rounded border-gray-300"
                checked={selectedOption === "treinou"}
                onChange={handleOptionChange}
              />
              <label className="ml-2 w-full py-3 text-sm font-medium text-gray-900 ">
                Treinou
              </label>
            </div>
          </li>
        </ul>

        {selectedOption == "treinou" && (
          <>
            <p className="font-semibold">
              Selecione os grupos musculares treinados:
            </p>
            <div className="grid w-full grid-cols-1 gap-2  lg:grid-cols-3">
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
                <label className="ml-2   text-lg font-semibold text-gray-900 ">
                  Fez Cardio?
                </label>
              </div>
            </div>
          </>
        )}

        <div className="flex w-full flex-col items-center justify-center">
          {workOut ? (
            <button
              onClick={handleEdit}
              className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-300 to-pink-300 p-0.5 text-lg font-medium  "
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                Salvar Alterações
              </span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gray-300 to-blue-300 p-0.5 text-lg font-medium  "
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                Salvar treino
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default SelectedWorkouts;
