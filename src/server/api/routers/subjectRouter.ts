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
        targetGrade: z.number(),
        setLevel: z.string(),
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

  editSubject: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        targetGrade: z.number(),
        setLevel: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return db.subject.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          targetGrade: input.targetGrade,
          setLevel: input.setLevel,
        },
      });
    }),

  setAverage: publicProcedure
    .input(
      z.object({
        subjectId: z.number(),
        average: z.number(),
      }),
    )
    .mutation(({ input }) => {
      return db.subject.update({
        where: {
          id: input.subjectId,
        },
        data: {
          averageGrade: input.average,
        },
      });
    }),
});
