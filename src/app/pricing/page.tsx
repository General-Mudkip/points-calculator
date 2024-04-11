import { CheckCircle2Icon } from "lucide-react"
import { Navbar } from "../components/homepage/navbar"
import Link from "next/link"

const Pricing = () => {
    return (
        <div className="mt-12 lg:mt-40">
            <Navbar />
            <div className="">
                <div className="flex flex-col mx-4 ">
                    <h1 className="text-center text-6xl underline decoration-sky-500 font-semibold lg:text-8xl">
                        Pricing
                    </h1>
                    <span className="text-lg my-8 text-gray-800 lg:w-[48rem] text-center lg:text-xl sm:48">
                        There's only one tier we offer.
                    </span>


                    <div className="flex justify-center flex-row">
                        <div className="border-2 p-4 border-slate-200 border-t-[9px] border-t-sky-500 rounded-xl h-96 w-64 flex flex-col">
                            <h2 className="text-2xl font-semibold"> Free </h2>
                            <h1 className="text-3xl font-semibold mt-1">€0<span className="text-xl ml-1 text-zinc-700">per month</span></h1>

                            <span className="mt-4 mb-2 text-sm">BetterExams points is, and will forever remain, completely free to use.</span>

                            <ul className="gap-y-2 flex flex-col">
                                <li className="flex flex-row"><CheckCircle2Icon size={24} className="mr-2" /> Unlimited access to the dashboard.</li>
                                <li className="flex flex-row"><CheckCircle2Icon size={20} className="mr-2" /> Free updates, forever.</li>
                                <li className="flex flex-row"><CheckCircle2Icon size={20} className="mr-2" /> Priority support.</li>
                            </ul>

                            <Link
                                href="/dashboard/signup"
                                className="flex mt-6 h-9 justify-center items-center rounded-xl bg-sky-500 px-4 align-middle text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-zinc-500"
                            >
                                <span className="">Get Started</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing
