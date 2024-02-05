import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { db } from "~/server/db"

export const testRouter = createTRPCRouter({
    getTest: publicProcedure
        .input(z.object({ testId: z.number() }))
        .query(({ input }) => {
            return db.test.findUnique({
                where: {
                    id: input.testId
                }
            })
        }),

    getAllTests: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ input }) => {
            return db.test.findMany({
                where: {
                    userId: input.userId
                }
            })
        }),

    getAllTestsBySubject: publicProcedure
        .input(z.object({ subjectId: z.number() }))
        .query(({ input }) => {
            return db.test.findMany({
                where: {
                    subjectId: input.subjectId
                }
            })
        }),

    createTest: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                subjectId: z.number(),
                name: z.string(),
                date: z.date(),
                percentage: z.number(),
                maxMarks: z.number(),
                achievedMarks: z.number()
            })
        )
        .mutation(({ input }) => {
            return db.test.create({
                data: {
                    userId: input.userId,
                    subjectId: input.subjectId,
                    name: input.name,
                    date: input.date,
                    percentage: input.percentage,
                    maxMarks: input.maxMarks,
                    achievedMarks: input.achievedMarks
                }
            })
        }),

    editTest: publicProcedure
        .input(
            z.object({
                testId: z.number(),
                userId: z.string(),
                subjectId: z.number(),
                name: z.string(),
                date: z.date(),
                percentage: z.number(),
                maxMarks: z.number(),
                achievedMarks: z.number()
            })
        )
        .mutation(({ input }) => {
            return db.test.update({
                where: {
                    id: input.testId
                },
                data: {
                    subjectId: input.subjectId,
                    name: input.name,
                    date: input.date,
                    percentage: input.percentage,
                    maxMarks: input.maxMarks,
                    achievedMarks: input.achievedMarks
                }
            })
        }),

    deleteTest: publicProcedure
        .input(
            z.object({
                testId: z.number()
            })
        )
        .mutation(({ input }) => {
            return db.test.delete({
                where: {
                    id: input.testId
                }
            })
        })
})
