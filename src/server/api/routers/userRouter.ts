import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { db } from "~/server/db"

export const userRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ input }) => {
            return db.user.findFirst({
                where: {
                    id: input.userId
                }
            })
        }),

    getCollegeCourse: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ input }) => {
            return db.user.findFirst({
                where: {
                    id: input.userId
                },
                select: {
                    collegeCourseName: true,
                    collegeCoursePoints: true
                }
            })
        })
})
