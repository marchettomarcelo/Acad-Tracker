import Link from "next/link";
import { trpc } from "../../utils/trpc";

function Home() {
  const dias = trpc.dashboard.getTrainedRestSkippedDays.useQuery({
    year: 2023,
  });
  console.log(dias.data);
  return (
    <main className="p-4">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <p>Aqui vai ter uma dashboard com o progresso do ano.</p>

      <Link href={"/dashboard/progresso"}>
        <button className="rounded border  border-black p-2">
          {" "}
          Resgistrar treinos
        </button>
      </Link>
    </main>
  );
}

export default Home;
