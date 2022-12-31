import { useState } from "react";

export default function DayCard({
  day,
  dayOfWeek,
}: {
  day: number;
  dayOfWeek: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className=" cursor-pointer rounded-md border px-4 py-6 shadow-md"
      onClick={() => setOpen(!open)}
    >
      <h1>
        {dayOfWeek.toUpperCase()}, {day}
      </h1>

      {open && <div>opa</div>}
    </div>
  );
}
