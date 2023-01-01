import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const datasRouter = router({
  getMeses: protectedProcedure.query(async () => {
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
        month: z.string(),
        year: z.number(),
      })
    )
    .query(async ({ input }) => {
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

        // see if there is an workout for this day
        const workout = await prisma?.workOutSession.findFirst({
          where: {
            date: {
              equals: new Date(input.year, months.indexOf(input.month), day),
            },
          },
        });

        monthYearDays.push({
          month: input.month,
          year: input.year,
          day,
          dayOfWeek,
          numberDayOfWeek: date.getDay(),
          numberMonth: months.indexOf(input.month),
          workout: workout ? workout : null,
        });
      }

      return monthYearDays;
    }),
});
