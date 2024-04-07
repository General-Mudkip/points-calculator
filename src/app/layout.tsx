import "~/styles/globals.css"

import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { Analytics } from "@vercel/analytics/react"
import { TRPCReactProvider } from "~/trpc/react"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans"
})

export const metadata = {
    title: "BetterExams Points",
    description: "A grade tracking app and points calculator.",
    icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`font-sans ${inter.variable}`}>
                    <TRPCReactProvider cookies={cookies().toString()}>
                        {children}
                    </TRPCReactProvider>
                </body>
                <Analytics />
            </html>
        </ClerkProvider>
    )
}
