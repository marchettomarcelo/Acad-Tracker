import Link from "next/link";
import { trpc } from "../../utils/trpc";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

function Home() {
  const { isLoading, data, error } =
    trpc.dashboard.getTrainedRestSkippedDays.useQuery({
      year: 2023,
    });

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="col-span-2 flex flex-col p-6">
        <h1 className="text-3xl font-medium">
          Aqui está o seu progresso do ano:
        </h1>
      </div>
      <div className="col-span-2 flex flex-col items-end justify-end rounded-md border-b-2 border-r-2 border-t border-l border-green-300 border-r-green-400 border-l-gray-100 border-t-gray-100 p-6 shadow-lg">
        <h2 className="text-2xl font-medium">
          {" "}
          Treinos feitos: {data?.trained}
        </h2>
      </div>
      <div className="border-gradient border-t-gray-10 flex flex-col items-end justify-end rounded-md border-b-2 border-r-2  border-t border-l border-red-400 border-r-red-300 border-l-gray-100 border-t-gray-100 p-6 shadow-lg">
        <h2 className="text-xl font-medium">
          {" "}
          Treinos perdidos: {data?.skipped}
        </h2>
      </div>
      <div className="border-t-gray-10 flex flex-col items-end justify-end rounded-md border-b-2 border-r-2 border-t border-l border-yellow-400 border-r-yellow-300 border-l-gray-100 border-t-gray-100 p-6 shadow-lg">
        <h2 className="text-xl font-medium"> Dias descansados: {data?.rest}</h2>
      </div>
      <Link
        href={"/dashboard/progresso"}
        className=" col-span-2 flex flex-col items-end justify-end rounded-md border-b-2 border-r-2 border-t border-l  border-l-gray-100 border-t-gray-100 p-6 shadow-lg"
      >
        <div className="flex flex-row gap-2">
          <h3 className="text-lg">Registrar treino</h3>
          <ClipboardDocumentCheckIcon className="h-6 w-6" />
        </div>
      </Link>
    </div>
  );
}

export default Home;
