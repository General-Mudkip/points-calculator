import Link from "next/link"

export const Footer = () => {
    return (
        <div className="mt-auto flex h-24 w-screen flex-row items-center justify-center gap-x-4 border-t-2 border-slate-200 p-4">
            <Link href="/" className="text-xl underline decoration-sky-500 decoration-2 underline-offset-2 transition-all duration-200 hover:text-sky-600">
                Contact
            </Link>
            <Link href="https://github.com/General-Mudkip/points-calculator" className="text-xl underline decoration-sky-500 decoration-2 underline-offset-2 transition-all duration-200 hover:text-sky-600">
                GitHub
            </Link>
        </div>
    )
}
