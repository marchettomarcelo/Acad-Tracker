import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { workOutSession } from "@prisma/client";
import SelectedWorkouts from "./SelectedWorkouts";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

export default function DayCard({
  day,
  dayOfWeek,
  numberMonth,
  year,
  workOut,
  editMode,
  setEditMode,
}: {
  day: number;
  dayOfWeek: string;
  numberMonth: number;
  year: number;
  workOut?: workOutSession;

  editMode: boolean;
  setEditMode: (value: React.SetStateAction<boolean>) => void;
}) {
  const [edit, setEdit] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

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
    setEditMode(!editMode);
  }

  const icone = () => {
    if (editMode && edit) {
      return (
        <XCircleIcon
          className="h-6 w-6 cursor-pointer"
          stroke="#000000"
          onClick={handleEdit}
          strokeWidth={2}
        />
      );
    }
    if (workOut?.rest) {
      return <ClockIcon className="h-6 w-6" stroke="#FBBF24" strokeWidth={2} />;
    } else if (workOut?.skipped) {
      return (
        <NoSymbolIcon className="h-6 w-6" stroke="#EF4444" strokeWidth={2} />
      );
    } else if (workOut) {
      return (
        <CheckCircleIcon
          className="h-6 w-6 "
          stroke="#22C55E"
          strokeWidth={2}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className={`flex  flex-col  rounded-md border p-6 shadow-md ${borderColor}`}
      ref={parent}
    >
      <div className="flex flex-row justify-between">
        <h1>
          {dayOfWeek.toUpperCase()}, {day}
        </h1>

        <div className="flex flex-row gap-4">
          {icone()}

          {!editMode && (
            <PencilSquareIcon
              onClick={handleEdit}
              className="h-6 w-6 cursor-pointer"
            />
          )}
        </div>
      </div>
      {edit && (
        <div className="flex flex-col items-center">
          <hr className="border-1 my-6 h-0.5 w-full rounded-md bg-black" />
          <SelectedWorkouts
            setEditMode={setEditMode}
            setEdit={setEdit}
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
