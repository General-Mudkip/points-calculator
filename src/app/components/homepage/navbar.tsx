"use client"
import { useRouter } from "next/navigation"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"

import { Menu } from "lucide-react"
import Link from "next/link"


export const Navbar = () => {

    return (
        <Sidebar />
    )
}

// TODO: Consolidate these links into a proper component.

const Links = () => {
    const router = useRouter()

    return (
        <>
            <button
                onClick={() => router.push("/")}
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
            >
                <span>Features</span>
            </button>
            <button
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                onClick={() => router.push("/")}
            >
                <span>About</span>
            </button>
            <button
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                onClick={() => router.push("/")}
            >
                <span>Pricing</span>
            </button>
            <button
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                onClick={() => router.push("/dashboard")}
            >
                <span>Dashboard</span>
            </button>

            <div className="flex-1" />

            <button
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                onClick={() => router.push("/dashboard/login")}
            >
                <span className="">Log In</span>
            </button>


            <button
                className="group mr-8 flex items-center justify-center rounded-2xl bg-sky-300 px-4 py-3 text-center text-xl text-slate-900 transition-all duration-300 hover:bg-sky-500 hover:text-white"
                onClick={() => router.push("/dashboard/signup")}
            >
                <span className="">Sign Up</span>
            </button>
        </>
    )
}


const Sidebar = () => {

    const router = useRouter()

    return (
        <div>
            <nav className="absolute top-0 left-0 h-24 w-[100vw] flex-row items-center gap-x-4 border-b-2 hidden border-b-slate-300 lg:flex">
                <Link className="mb-8 mt-6 flex h-20 items-center px-8" href="/">
                    <h1 className="font-sans text-4xl">
                        BetterExams <span className="font-bold">Points</span>
                    </h1>
                </Link>

                <Links />
            </nav>

            <Sheet>
                <SheetTrigger className="fixed z-50 left-0 flex w-screen items-center flex-row border-b-2 border-b-gray-400 bg-white p-4 align-middle lg:hidden">
                    <Menu size={38} />
                    <h1 className="flex mb-1 flex-row gap-x-2 pl-4 text-4xl">
                        BetterExams <span className="font-bold">Points</span>
                    </h1>
                </SheetTrigger>
                <SheetContent side="left" className="w-4/5">
                    <SheetHeader>
                        <SheetTitle>
                            <div className="flex h-20 w-full flex-row">
                                <h1 className="text-3xl">
                                    BetterExams <span className="font-bold">Points</span>
                                </h1>
                            </div>

                            <div className="flex flex-col px-2 gap-y-3">

                                <button
                                    className="group flex items-center justify-center rounded-2xl bg-sky-300 px-4 py-3 text-center text-2xl text-slate-900 transition-all duration-300 hover:bg-sky-500 hover:text-white"
                                    onClick={() => router.push("/dashboard/signup")}
                                >
                                    <span className="">Sign Up</span>
                                </button>


                                <button
                                    className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                                    onClick={() => router.push("/dashboard/login")}
                                >
                                    <span className="">Log In</span>
                                </button>

                                <div className="bg-zinc-200 h-1" />

                                <button
                                    onClick={() => router.push("/")}
                                    className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                                >
                                    <span>Features</span>
                                </button>
                                <button
                                    className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                                    onClick={() => router.push("/")}
                                >
                                    <span>About</span>
                                </button>
                                <button
                                    className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                                    onClick={() => router.push("/")}
                                >
                                    <span>Pricing</span>
                                </button>
                                <button
                                    className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    <span>Dashboard</span>
                                </button>

                            </div>
                        </SheetTitle>
                    </SheetHeader>

                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar

