import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Month } from "@prisma/client";

export const datasRouter = router({
  getDias: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.date.findMany();
  }),

  getMeses: protectedProcedure.query(async ({ ctx }) => {
    const months = [
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

    const year = 2023;

    const monthYear = months.map((month) => ({ month, year }));

    return monthYear;
  }),

  getDatas: protectedProcedure
    .input(
      z.object({
        month: z.nativeEnum(Month),
        year: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const months = [
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

      const daysInMonth = new Date(
        input.year,
        months.indexOf(input.month) + 1,
        0
      ).getDate();

      const monthYearDays = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(input.year, months.indexOf(input.month), day);
        const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
        monthYearDays.push({
          month: input.month,
          year: input.year,
          day,
          dayOfWeek,
        });
      }

      console.log(monthYearDays);
    }),
});
