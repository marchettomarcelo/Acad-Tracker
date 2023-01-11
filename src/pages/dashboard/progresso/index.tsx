import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import ProtectedPage from "../../../utils/ProtectedPage";

import MonthsCard from "../../../components/MonthsCard";

const Home: NextPage = () => {
  const availableMonths = trpc.datas.getMesespublic.useQuery();

  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4">
        {availableMonths.data?.map(({ year, month }, index) => {
          return (
            <Link
              href={`/dashboard/progresso/${year}?mes=${month}`}
              key={index}
            >
              {year && month && <MonthsCard year={year} month={month} />}
            </Link>
          );
        })}
      </div>

      <main className="flex flex-col items-center">
        <h1 className="text-lg font-bold">Você esta logado</h1>
        <button
          className=" w-1/4 rounded border bg-slate-50 px-4 py-2 font-bold shadow-lg"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </main>
    </>
  );
};

function ProtectedHome() {
  return <ProtectedPage Page={Home} />;
}

export default ProtectedHome;
