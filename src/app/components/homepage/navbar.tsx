"use client"
import { useRouter } from "next/navigation"

const LoginButtons = () => {
    const router = useRouter()

    return (
        <>
            <button
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
                onClick={() => router.push("/dashboard/login")}
            >
                <span className="">Log In</span>
            </button>


            <button
                className="group mr-8 flex items-center justify-center rounded-2xl bg-green-400 px-4 py-3 text-center text-xl text-slate-900 transition-all duration-200 hover:bg-green-500 hover:text-white"
                onClick={() => router.push("/dashboard/signup")}
            >
                <span className="">Sign Up</span>
            </button>
        </>
    )
}

export const Navbar = () => {
    const router = useRouter()

    return (
        <div className="absolute top-0 flex h-24 w-full flex-row items-center gap-x-4 border-b-2 border-b-slate-300">
            <h1 className="my-6 px-6 font-sans text-4xl">
                BetterExams <span className="font-bold">Points</span>
            </h1>
            <button
                onClick={() => router.push("/features")}
                className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800"
            >
                <span>Features</span>
            </button>
            <a className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800">
                <span>About</span>
            </a>
            <a className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800">
                <span>Pricing</span>
            </a>
            <a className="group flex items-center justify-center rounded-2xl px-4 py-3 text-center text-xl text-gray-600 transition-all duration-200 hover:bg-slate-200 hover:text-gray-800">
                <span>Dashboard</span>
            </a>
            <div className="flex-1" />
            <LoginButtons />
        </div>
    )
}
