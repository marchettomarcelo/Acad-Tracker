import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Month } from "@prisma/client";

export const datasRouter = router({
  getDias: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.date.findMany();
  }),

  getMeses: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.date.findMany({
      select: {
        month: true,
        year: true,
      },

      distinct: ["month", "year"],
    });

    return data;
  }),

  getDatas: protectedProcedure
    .input(
      z.object({
        month: z.nativeEnum(Month),
        year: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.date.findMany({
        where: {
          month: input.month,
          year: input.year,
        },
      });

      return data;
    }),
});
