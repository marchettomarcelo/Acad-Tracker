import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { MuscleGroup } from "@prisma/client";

export const treinosRouter = router({
  createTreino: protectedProcedure
    .input(
      z.object({
        cardio: z.boolean(),
        // muscle group has a type of MuscleGroup[]
        muscleGoups: z.array(z.nativeEnum(MuscleGroup)),
        year: z.number(),
        monthIndex: z.number(),
        day: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.workOutSession.create({
        data: {
          cardio: input.cardio,
          muscleGroup: input.muscleGoups,
          userId: ctx.session.user.id,

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

      const response = await ctx.prisma.workOutSession.findMany({
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.workOutSession.update({
        where: {
          id: input.workOutId,
        },
        data: {
          cardio: input.cardio,
          muscleGroup: input.muscleGoups,
        },
      });
      return response;
    }),
});
