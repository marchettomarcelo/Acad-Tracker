import { MuscleGroup } from "@prisma/client";
import TreinoCard from "./TreinoCard";

function SelectedWorkouts({
  handleCheckboxChange,
}: {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const muscleGroups = Object.values(MuscleGroup);
  return (
    <div className="grid grid-cols-1 gap-2 p-2 lg:grid-cols-3">
      {muscleGroups.map((muscleGroup) => {
        return (
          <TreinoCard
            handleCheckboxChange={handleCheckboxChange}
            key={muscleGroup}
            value={muscleGroup}
            nome={muscleGroup}
          />
        );
      })}
    </div>
  );
}

export default SelectedWorkouts;
