import { signIn, useSession } from "next-auth/react";

export default function ProtectedPage({ Page }: any) {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-black">
          You need to be signed in to view this page.
        </p>
        <button
          className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    );
  } else {
    return <Page />;
  }
}
