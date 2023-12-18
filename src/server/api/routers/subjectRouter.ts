import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const subjectRouter = createTRPCRouter({
  getSubjectById: publicProcedure
    .input(z.object({ subjectId: z.number() }))
    .query(({ input }) => {
      return db.subject.findUnique({
        where: {
          id: input.subjectId,
        },
      });
    }),

  getAllSubjects: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => {
      return db.subject.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),

  createSubject: publicProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
        targetGrade: z.optional(z.number()),
        setLevel: z.optional(z.string()),
      }),
    )
    .mutation(({ input }) => {
      return db.subject.create({
        data: {
          name: input.name,
          userId: input.userId,
          targetGrade: input.targetGrade,
          setLevel: input.setLevel,
        },
      });
    }),
});
