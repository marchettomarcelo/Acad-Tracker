import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { workOutSession } from "@prisma/client";
import SelectedWorkouts from "./SelectedWorkouts";

export default function DayCard({
  day,
  dayOfWeek,
  numberMonth,
  year,
  workOut,
}: {
  day: number;
  dayOfWeek: string;
  numberMonth: number;
  year: number;
  workOut?: workOutSession;
}) {
  const [edit, setEdit] = useState(false);

  let borderColor = "";
  if (workOut) {
    if (workOut.skipped === true) {
      borderColor = "border-red-500";
    } else if (workOut.rest === true) {
      console.log("rest");
      borderColor = "border-yellow-500";
    } else {
      borderColor = "border-green-500";
    }
  }

  return (
    <div
      className={`flex  flex-col  rounded-md border p-6 shadow-md ${borderColor}`}
    >
      <div className="flex flex-row justify-between">
        <h1>
          {dayOfWeek.toUpperCase()}, {day}
        </h1>

        <div className="flex flex-row gap-4">
          {workOut && !workOut.rest && !workOut.skipped && (
            <CheckCircleIcon
              className="h-6 w-6 "
              stroke="#22C55E"
              strokeWidth={2}
            />
          )}
          <PencilSquareIcon
            onClick={() => setEdit(!edit)}
            className="h-6 w-6 cursor-pointer"
          />
        </div>
      </div>
      {edit && (
        <div className="flex flex-col items-center">
          <hr className="border-1 my-6 h-0.5 w-full rounded-md bg-black" />
          <SelectedWorkouts
            day={day}
            numberMonth={numberMonth}
            year={year}
            workOut={workOut}
          />
        </div>
      )}
    </div>
  );
}
