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
}: {
  day: number;
  numberMonth: number;
  year: number;
  workOut?: workOutSession;
}) {
  // --- State ---
  const [cardio, setCardio] = useState(workOut ? workOut.cardio : false);
  const [status, setStatus] = useState(
    workOut
      ? { skipped: workOut.skipped, rest: workOut.rest }
      : { skipped: false, rest: true, treino: false }
  );

  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<
    MuscleGroup[]
  >(workOut ? workOut.muscleGroup : []);

  // --- Trpc related stuff ---
  const context = trpc.useContext();
  const criarTreino = trpc.treinos.createTreino.useMutation({
    onSuccess: () => {
      context.datas.getDatas.invalidate();
    },
  });

  const editarTreino = trpc.treinos.editTreino.useMutation({
    onSuccess: () => {
      context.datas.getDatas.invalidate();
    },
  });

  // --- helper function to save the workout ---
  const handleSave = () => {
    const novo: MuscleGroup[] = selectedMuscleGroups;

    criarTreino.mutate({
      day,
      cardio,
      skipped: status.skipped,
      rest: status.rest,
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
  const handleStatusChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    // set value to true and the other to false
    setStatus({ rest: checked, skipped: !checked, treino: !checked });
  };
  const handleStatusChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("skipped");
    const { checked } = e.target;
    // set value to true and the other to false
    setStatus({ rest: !checked, skipped: checked, treino: !checked });
  };
  const handleStatusChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    // set value to true and the other to false
    setStatus({ rest: !checked, skipped: !checked, treino: checked });
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

  // --- gamb ---
  const muscleGroups = Object.values(MuscleGroup);

  return (
    <>
      <div className="flex w-full flex-col items-start gap-4 ">
        <h3 className=" font-semibold text-gray-900 ">O que você fez hoje?</h3>
        <ul className="w-full items-center rounded-lg border border-black  bg-white text-sm font-medium text-gray-900   sm:flex">
          <li className="w-full ">
            <div className="flex items-center pl-3">
              <input
                id="horizontal-list-radio-license"
                type="radio"
                checked={status.rest || true}
                onChange={handleStatusChange1}
                name="list-radio"
                value="rest"
                className="h-4 w-4 bg-gray-100"
              />
              <label className="ml-2 w-full py-3 text-sm font-medium text-gray-900 ">
                Descansou
              </label>
            </div>
          </li>
          <li className="w-full border-black ">
            <div className="flex items-center border-black pl-3">
              <input
                id="horizontal-list-radio-id"
                type="radio"
                value="skipped"
                name="list-radio"
                className="h-4 w-4"
                onChange={handleStatusChange2}
                checked={status.skipped || false}
              />
              <label className="ml-2 w-full py-3 text-sm font-medium text-gray-900 ">
                Skip
              </label>
            </div>
          </li>
          <li className="w-full border-black ">
            <div className="flex items-center border-black pl-3">
              <input
                id="horizontal-list-radio-id"
                type="radio"
                value="treino"
                name="list-radio"
                className="h-4 w-4"
                onChange={handleStatusChange3}
                checked={status.treino || false}
              />
              <label className="ml-2 w-full py-3 text-sm font-medium text-gray-900 ">
                Treinou
              </label>
            </div>
          </li>
        </ul>

        {status?.treino && (
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
              onClick={() =>
                editarTreino.mutate({
                  workOutId: workOut.id,
                  cardio,
                  muscleGoups: selectedMuscleGroups,
                  skipped: status.skipped,
                  rest: status.rest,
                })
              }
              className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-300 to-orange-300 p-0.5 text-lg font-medium  "
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 ">
                Editar treino
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
