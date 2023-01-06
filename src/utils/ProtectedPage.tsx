import { signIn, useSession } from "next-auth/react";
export default function ProtectedPage({ Page }: any) {
  useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  return <Page />;
}
