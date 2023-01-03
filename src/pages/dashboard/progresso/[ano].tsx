import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import DayCard from "../../../components/DayCard";
import { useState } from "react";
import ProtectedPage from "../../../utils/ProtectedPage";
import { type NextPage } from "next";

const MonthProgress: NextPage = () => {
  const router = useRouter();

  const { ano, mes } = router.query;
  console.log(router.query);
  const year = Number(ano);
  const month = mes as string;

  const daysOfTheMonth = trpc.datas.getDatas.useQuery(
    { month, year },
    {
      enabled: !!year && !!month,
    }
  );

  const [editMode, setEditMode] = useState(false);

  return (
    <main className="flex w-full flex-col items-center gap-4">
      <header className="mt-4 flex w-10/12 flex-col items-start lg:w-1/2">
        <h1 className="text-xl font-bold">
          Progresso do mês {month} de {year}
        </h1>
        <Link href={"/dashboard/progresso"}>
          <p className="font-semibold text-blue-600">&lt;- Voltar</p>
        </Link>
      </header>

      <div className="mb-8 flex w-10/12 flex-col gap-8 lg:w-1/2">
        {daysOfTheMonth.data?.map(
          ({ day, dayOfWeek, numberMonth, year, workout }, index) => {
            return (
              <DayCard
                editMode={editMode}
                setEditMode={setEditMode}
                day={day}
                dayOfWeek={dayOfWeek}
                key={index}
                numberMonth={numberMonth}
                year={year}
                workOut={workout || undefined}
              />
            );
          }
        )}
      </div>
    </main>
  );
};

function ProtectedMonthProgress() {
  return <ProtectedPage Page={MonthProgress} />;
}

export default ProtectedMonthProgress;
