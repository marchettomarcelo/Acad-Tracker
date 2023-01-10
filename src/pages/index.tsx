import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";

function ProtectedHome() {
  const { data: session, status } = useSession();
  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">
        Seja bem vindo ao acad tracker, um site que vai te ajudar a ser menos
        frango.
      </h1>

      <button
        onClick={() => signIn()}
        className="w-10/12 rounded-md border border-black p-2 md:w-3/12"
      >
        Login / Cadastro
      </button>

      {status == "authenticated" && (
        <>
          <p className="font-normal ">
            Logado como: <strong>{session.user?.email}</strong>{" "}
          </p>
          <Link href={"/dashboard"} className="text-lg text-blue-600">
            Ver dashboard
          </Link>

          <p onClick={() => signOut()}>Logout</p>
        </>
      )}
    </main>
  );
}

export default ProtectedHome;

