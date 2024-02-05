import "~/styles/globals.css"

import Sidebar from "../components/sidebar/sidebar"

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
        <div className="flex flex-row">
            <Sidebar />
            <div className="mx-auto mt-24 w-[95%] items-center bg-white p-4 text-black lg:mx-0 lg:ml-80 lg:pl-4 lg:pt-0 xl:mb-8 xl:px-24">
                {children}
            </div>
        </div>
    )
}
