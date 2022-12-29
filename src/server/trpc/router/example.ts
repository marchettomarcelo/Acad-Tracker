import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure.mutation(async ({ ctx }) => {
    const response = await ctx.prisma.workOutSession.create({
      data: {
        cardio: true,
        muscleGroup: ["CHEST", "BACK", "LEGS"],
        dateId: "12341234sd",
        userId: "clc9oadwx0009yzg48x3ibpsc",
      },
    });
    return response;
  }),
});
