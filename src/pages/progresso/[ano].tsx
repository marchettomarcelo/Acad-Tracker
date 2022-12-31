import { Month } from "@prisma/client";
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
    <div>
      ano{ano} mes{mes}
    </div>
  );
}
