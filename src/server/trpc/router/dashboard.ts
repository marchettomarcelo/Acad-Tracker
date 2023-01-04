import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const dashboardRouter = router({
  getTrainedRestSkippedDays: protectedProcedure
    .input(
      z.object({
        year: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      // count how many days were trained, skipped or rest
      const trainedDays = await ctx.prisma.workOutSession.findMany({
        where: {
          date: {
            gte: new Date(input.year, 0, 1),
            lte: new Date(input.year, 11, 31),
          },
          user: {
            id: ctx.session.user.id,
          },
        },
      });

      if (!trainedDays) {
        return [];
      }

      const status = { trained: 0, skipped: 0, rest: 0 };

      // count how many days were skipped in trainedDays
      for (let i = 0; i < trainedDays.length; i++) {
        if (trainedDays[i]?.skipped) {
          status.skipped++;
        } else if (trainedDays[i]?.rest) {
          status.rest++;
        }
      }

      status.trained = trainedDays.length - status.skipped - status.rest;

      return status;
    }),
});
