import { Month } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function MonthProgress() {
  const router = useRouter();
  const { ano, mes } = router.query;

  // try to pasrse ano and mes to number and string
  const year = Number(ano);
  const month = mes as Month;

  const daysOfTheMonth = trpc.datas.getDatas.useQuery(
    { month, year },
    {
      enabled: !!year && !!month,
    }
  );
  console.log(daysOfTheMonth.data);
  return (
    <main className="flex flex-col items-center">
      <header className="mt-4 flex w-10/12 flex-col items-start lg:w-1/2">
        <h1 className="text-xl font-bold">
          Progresso do mês {month} de {year}
        </h1>
        <Link href={"http://localhost:3000/progresso"}>
          <p className="font-semibold text-blue-600">&lt;- Voltar</p>
        </Link>
      </header>
    </main>
  );
}
