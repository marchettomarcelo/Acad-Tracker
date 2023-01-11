import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

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

export const datasRouter = router({
  getMesespublic: publicProcedure.query(async () => {
    const monthYear = [];

    const years = [2023];
    for (let i = 0; i < years.length; i++) {
      const year = years[i];

      for (let j = 0; j < 12; j++) {
        monthYear.push({ year, month: months[j] });
      }
    }
    return monthYear;
  }),

  getDatas: protectedProcedure
    .input(
      z.object({
        month: z.string(),
        year: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const indexMes = months.indexOf(input.month);

      const numeroDias = new Date(input.year, indexMes, 0).getDate();

      const workoutsInMonth = await ctx.prisma.dailyActivity.findMany({
        where: {
          date: {
            gte: new Date(input.year, indexMes, 1),
            lte: new Date(input.year, indexMes, numeroDias),
          },
        },
      });

      const monthYearDays = [];

      for (let day = 1; day <= numeroDias; day++) {
        const date = new Date(input.year, indexMes, day);
        const dayOfWeek = date.toLocaleString("default", { weekday: "long" });

        // see if there is an workout for this day
        const workout = workoutsInMonth?.find((workout) => {
          const workoutDate = new Date(workout.date);
          return workoutDate.getDate() === day;
        });

        monthYearDays.push({
          month: input.month,
          year: input.year,
          day,
          dayOfWeek,
          numberDayOfWeek: date.getDay(),
          numberMonth: indexMes,
          workout: workout ? workout : null,
        });
      }

      return monthYearDays;
    }),
});
