import { router } from "../trpc";
import { authRouter } from "./auth";
import { datasRouter } from "./dias";
import { infraRouter } from "./infra";

export const appRouter = router({
  infra: infraRouter,
  auth: authRouter,
  datas: datasRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
