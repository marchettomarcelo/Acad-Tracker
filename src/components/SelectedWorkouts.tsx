import { MuscleGroup } from "@prisma/client";
import TreinoCard from "./TreinoCard";

function SelectedWorkouts({
  handleCheckboxChange,
  handleCardioChange,
  selectedMuscleGroups,
  cardio,
}: {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCardioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedMuscleGroups: MuscleGroup[];
  cardio: boolean;
}) {
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
      </div>
    </>
  );
}

export default SelectedWorkouts;
