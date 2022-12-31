import { Month } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function MonthProgress() {
  const router = useRouter();
  const { ano, mes } = router.query;

  const year = Number(ano);
  const month = Month[mes as Month];

  const daysOfTheMonth = trpc.datas.getDatas.useQuery(
    { month, year },
    {
      enabled: !!ano && !!mes,
    }
  );
  console.log(daysOfTheMonth.data);
  return (
    <main className="flex flex-col items-center">
      <header className="mt-4 flex w-1/2 flex-col items-start">
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
