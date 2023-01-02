import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
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
      borderColor = "border-yellow-500";
    } else {
      borderColor = "border-green-500";
    }
  }

  function handleEdit() {
    // only one day can be edited at a time so if the user clicks on a different day while editing, the previous day should be set to false

    setEdit(!edit);
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
          {workOut?.rest ? (
            <ClockIcon className="h-6 w-6" stroke="#FBBF24" strokeWidth={2} />
          ) : workOut?.skipped ? (
            <NoSymbolIcon
              className="h-6 w-6"
              stroke="#EF4444"
              strokeWidth={2}
            />
          ) : workOut ? (
            <CheckCircleIcon
              className="h-6 w-6 "
              stroke="#22C55E"
              strokeWidth={2}
            />
          ) : null}

          <PencilSquareIcon
            onClick={handleEdit}
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
