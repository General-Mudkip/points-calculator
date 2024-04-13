import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { db } from "~/server/db"

export const testRouter = createTRPCRouter({
    getTest: publicProcedure
        .input(
            z.object({
                testId: z.number(),
                userId: z.string()
            })
        )
        .query(({ input }) => {
            return db.test.findUnique({
                where: {
                    id: input.testId,
                    userId: input.userId
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

    // [adamlearns] It seems that perhaps the client could specify ANY number
    // here, in which case they could get subjects that other users have added.
    // I don't know for sure if there's some sort of user-level isolation in the
    // database, and it wouldn't matter much for the subjects themselves, but it
    // may matter more for the test results (e.g. imagine seeing other students'
    // results just by crafting a custom API call)
    getAllTestsBySubject: publicProcedure
        .input(
            z.object({
                subjectId: z.number(),
                userId: z.string()
            })
        )
        .query(({ input }) => {
            return db.test.findMany({
                where: {
                    subjectId: input.subjectId,
                    userId: input.userId
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
                testId: z.number(),
                userId: z.string()
            })
        )
        .mutation(({ input }) => {
            return db.test.delete({
                where: {
                    id: input.testId,
                    userId: input.userId
                }
            })
        }),

    deleteAllTests: publicProcedure
        .input(
            z.object({
                subjectId: z.number(),
                userId: z.string()
            })
        )
        .mutation(({ input }) => {
            return db.test.deleteMany({
                where: {
                    subjectId: input.subjectId,
                    userId: input.userId
                }
            })
        })
})
