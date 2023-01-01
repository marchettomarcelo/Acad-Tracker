import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
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
  const bgColor = workOut && "bg-green-100";
  return (
    <div
      className={`flex  flex-col  rounded-md border p-6 shadow-md ${bgColor}`}
    >
      <div className="flex flex-row justify-between">
        <h1>
          {dayOfWeek.toUpperCase()}, {day}
        </h1>
        <PencilSquareIcon
          onClick={() => setEdit(!edit)}
          className="h-6 w-6 cursor-pointer"
        />
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
