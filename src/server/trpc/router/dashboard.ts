import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Session } from "inspector";

export const dashboardRouter = router({
  getTrainedRestSkippedDays: protectedProcedure
    .input(
      z.object({
        year: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      // // count how many days were trained, skipped or rest
      // const trainedDays = await ctx.prisma.dailyActivity.findMany({
      //   where: {
      //     date: {
      //       gte: new Date(input.year, 0, 1),
      //       lte: new Date(input.year, 11, 31),
      //     },
      //     user: {
      //       id: ctx.session.user.id,
      //     },
      //   },
      // });

      // if (!trainedDays) {
      //   return [];
      // }

      const status = { trained: 0, skipped: 0, rest: 0 };

      const activityCounts = await ctx.prisma.dailyActivity.findMany({
        where: {
          user: {
            id: ctx.session.user.id,
          },
          date: {
            gte: new Date("2023-01-01T00:00:00.000Z"),
            lte: new Date("2023-12-31T23:59:59.999Z"),
          },
        },
      });

      for (let i = 0; i < activityCounts.length; i++) {
        if (activityCounts[i]?.daysActivity === "WORKOUT") {
          status.trained++;
        }
        if (activityCounts[i]?.daysActivity === "SKIPPED") {
          status.skipped++;
        }
        if (activityCounts[i]?.daysActivity === "REST") {
          status.rest++;
        }
      }

      return status;
    }),
});
