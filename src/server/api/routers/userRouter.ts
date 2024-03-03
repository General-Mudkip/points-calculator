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
        }),

    editCollegeCourse: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                courseName: z.string(),
                coursePoints: z.number()
            })
        )
        .mutation(({ input }) => {
            return db.user.update({
                where: {
                    id: input.userId
                },
                data: {
                    collegeCourseName: input.courseName,
                    collegeCoursePoints: input.coursePoints
                }
            })
        })
})
