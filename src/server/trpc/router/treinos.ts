import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { DaysActivity, MuscleGroup } from "@prisma/client";

export const treinosRouter = router({
  createTreino: protectedProcedure
    .input(
      z.object({
        daysActivity: z.nativeEnum(DaysActivity),

        cardio: z.boolean(),

        muscleGoups: z.array(z.nativeEnum(MuscleGroup)),

        monthIndex: z.number(),
        day: z.number(),
        year: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.dailyActivity.create({
        data: {
          cardio: input.cardio,
          muscleGroup: input.muscleGoups,
          userId: ctx.session.user.id,
          daysActivity: input.daysActivity,
          date: new Date(input.year, input.monthIndex, input.day),
        },
      });
      return response;
    }),

  getTreinos: protectedProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const meses = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];
      const mes = meses.indexOf(input.month);

      const response = await ctx.prisma.dailyActivity.findMany({
        where: {
          userId: ctx.session.user.id,
          date: {
            gte: new Date(input.year, mes, 1),
            lte: new Date(input.year, mes + 1, 0),
          },
        },
      });
      return response;
    }),

  editTreino: protectedProcedure
    .input(
      z.object({
        workOutId: z.string(),
        cardio: z.boolean(),
        muscleGoups: z.array(z.nativeEnum(MuscleGroup)),
        daysActivity: z.nativeEnum(DaysActivity),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.dailyActivity.update({
        where: {
          id: input.workOutId,
        },
        data: {
          daysActivity: input.daysActivity,
          cardio: input.cardio,
          muscleGroup: input.muscleGoups,
        },
      });
      return response;
    }),
});
