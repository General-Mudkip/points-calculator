import { PrismaClient } from "@prisma/client"
import { PrismaLibSQL } from "@prisma/adapter-libsql"
import { createClient } from "@libsql/client"

import { env } from "~/env"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`
})

const adapter = new PrismaLibSQL(libsql)

export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
        //@ts-expect-error This is what the Turso and Prisma docs say to do. Not sure why erroring.
        adapter
    })

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
