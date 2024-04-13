import "~/styles/globals.css"

import Sidebar from "../components/sidebar/sidebar"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata = {
    title: "Dashboard | BetterExams Points",
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
            <div className="flex w-screen flex-row justify-center">
                <Sidebar />
                <div className="mx-auto mt-32 flex w-[95%] items-center justify-center bg-white p-4 text-black lg:mx-0 lg:ml-80 lg:mt-24 lg:pl-4 lg:pt-0 xl:mb-8 xl:px-24">
                    {children}
                </div>
            </div>
        </ClerkProvider>
    )
}
