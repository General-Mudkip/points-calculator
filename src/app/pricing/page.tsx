import { CheckCircle2Icon } from "lucide-react"
import { Navbar } from "../components/homepage/navbar"
import Link from "next/link"
import { Footer } from "../components/homepage/footer"

const Pricing = () => {
    return (
        <>
            <div className="mt-12 flex min-h-[85vh] flex-col lg:mt-40">
                <Navbar />
                <div className="">
                    <div className="mx-4 flex flex-col items-center">
                        <h1 className="text-center text-6xl font-semibold underline decoration-sky-500 lg:text-8xl">
                            Pricing
                        </h1>
                        <span className="sm:48 my-8 text-center text-lg text-gray-800 lg:w-[48rem] lg:text-xl">
                            There's only one tier we offer.
                        </span>


                        <div className="flex flex-row justify-center">
                            <div className="group flex h-96 w-64 flex-col rounded-xl border-2 border-t-[9px] border-slate-200 border-t-sky-500 p-4 shadow-xl shadow-sky-200 transition-all duration-500 lg:h-[29rem] lg:w-[20rem] lg:hover:scale-105 lg:hover:shadow-2xl lg:hover:shadow-sky-200">
                                <h2 className="text-2xl font-semibold "> Free </h2>
                                <h1 className="mt-1 text-3xl font-semibold transition-all duration-300 lg:text-4xl lg:group-hover:text-4xl">€0<span className="ml-1 text-xl text-zinc-700 lg:mt-4 lg:text-2xl">per month</span></h1>

                                <span className="mb-2 mt-4 text-sm lg:text-xl">BetterExams points is, and will forever remain, completely free to use.</span>
                                <ul className="flex flex-col gap-y-2 lg:mt-4 lg:gap-y-3">
                                    <li className="flex flex-row lg:text-lg"><CheckCircle2Icon size={22} className="mr-2" /> Unlimited access to the dashboard.</li>
                                    <li className="flex flex-row lg:text-lg"><CheckCircle2Icon size={20} className="mr-2" /> Free updates, forever.</li>
                                    <li className="flex flex-row lg:text-lg"><CheckCircle2Icon size={20} className="mr-2" /> Priority support.</li>
                                </ul>

                                <Link
                                    href="/dashboard/signup"
                                    className="mt-6 flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 align-middle text-lg font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-zinc-300 lg:mt-8"
                                >
                                    <span className="">Get Started</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Pricing
