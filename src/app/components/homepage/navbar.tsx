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
    return (
        <>
            <Link
                href="/features"
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
            >
                <span>Features</span>
            </Link>
            <Link
                href="/about"
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
            >
                <span>About</span>
            </Link>
            <Link
                href="/pricing"
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
            >
                <span>Pricing</span>
            </Link>
            <Link
                href="/dashboard"
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
            >
                <span>Dashboard</span>
            </Link>

            <div className="flex-1" />

            <Link
                href="/dashboard/login"
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
            >
                <span className="">Log In</span>
            </Link>


            <Link
                href="/dashboard/signup"
                className="group mr-8 flex items-center justify-center rounded-2xl bg-sky-300 px-4 py-3 text-center text-xl text-slate-900 transition-all duration-300 hover:bg-sky-500 hover:text-white"
            >
                <span className="">Sign Up</span>
            </Link>
        </>
    )
}


const Sidebar = () => {

    return (
        <div className="mb-24">
            <nav className="absolute left-0 top-0 hidden h-24 w-screen flex-row items-center gap-x-4 border-b-2 border-b-slate-300 lg:flex">
                <Link className="mb-8 mt-6 flex h-20 items-center px-8" href="/">
                    <h1 className="font-sans text-4xl">
                        BetterExams <span className="font-bold">Points</span>
                    </h1>
                </Link>

                <Links />
            </nav>

            <Sheet>
                <SheetTrigger className="fixed left-0 top-0 z-50 flex w-screen flex-row items-center border-b-2 border-b-gray-400 bg-white p-4 align-middle lg:hidden">
                    <Menu size={38} />
                    <h1 className="mb-1 flex flex-row gap-x-2 pl-4 text-3xl">
                        BetterExams <span className="font-bold">Points</span>
                    </h1>
                </SheetTrigger>
                <SheetContent side="left" className="w-4/5">
                    <SheetHeader>
                        <SheetTitle>
                            <div className="flex h-20 w-full flex-row">
                                <Link href="/">
                                    <h1 className="text-3xl">
                                        BetterExams <span className="font-bold">Points</span>
                                    </h1>
                                </Link>
                            </div>

                        </SheetTitle>
                    </SheetHeader>

                    <div className="-mt-4 mb-4 h-1 bg-zinc-200" />

                    <div className="flex flex-col gap-y-3 px-2">

                        <Link
                            href="/dashboard/signup"
                            className="group flex items-center justify-center rounded-2xl bg-sky-300 px-4 py-3 text-center text-2xl text-slate-900 transition-all duration-300 hover:bg-sky-500 hover:text-white"
                        >
                            <span className="">Sign Up</span>
                        </Link>


                        <Link
                            href="/dashboard/login"
                            className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                        >
                            <span className="">Log In</span>
                        </Link>

                        <div className="h-1 bg-zinc-200" />

                        <Link
                            href="/features"
                            className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                        >
                            <span>Features</span>
                        </Link>
                        <Link
                            href="/about"
                            className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                        >
                            <span>About</span>
                        </Link>
                        <Link
                            href="/pricing"
                            className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                        >
                            <span>Pricing</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-2xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                        >
                            <span>Dashboard</span>
                        </Link>

                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar

