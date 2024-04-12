import { CheckCircle2Icon } from "lucide-react"
import { Navbar } from "../components/homepage/navbar"
import Link from "next/link"
import { Footer } from "../components/homepage/footer"

const Pricing = () => {
    return (
        <>
            <div className="mt-12 lg:mt-40 flex flex-col min-h-[85vh]">
                <Navbar />
                <div className="">
                    <div className="flex flex-col mx-4 items-center">
                        <h1 className="text-center text-6xl underline decoration-sky-500 font-semibold lg:text-8xl">
                            Pricing
                        </h1>
                        <span className="text-lg my-8 text-gray-800 lg:w-[48rem] text-center lg:text-xl sm:48">
                            There's only one tier we offer.
                        </span>


                        <div className="flex justify-center flex-row">
                            <div className="group border-2 p-4 border-slate-200 border-t-[9px] border-t-sky-500 rounded-xl h-96 w-64 flex flex-col shadow-xl shadow-sky-200 lg:hover:scale-105 transition-all duration-500 lg:h-[29rem] lg:w-[20rem] lg:hover:shadow-2xl lg:hover:shadow-sky-200">
                                <h2 className="text-2xl font-semibold "> Free </h2>
                                <h1 className="text-3xl font-semibold mt-1 transition-all duration-300 lg:text-4xl lg:group-hover:text-4xl">€0<span className="text-xl ml-1 text-zinc-700 lg:text-2xl lg:mt-4">per month</span></h1>

                                <span className="mt-4 mb-2 text-sm lg:text-xl">BetterExams points is, and will forever remain, completely free to use.</span>
                                <ul className="gap-y-2 flex flex-col lg:mt-4 lg:gap-y-3">
                                    <li className="flex flex-row lg:text-lg"><CheckCircle2Icon size={22} className="mr-2" /> Unlimited access to the dashboard.</li>
                                    <li className="flex flex-row lg:text-lg"><CheckCircle2Icon size={20} className="mr-2" /> Free updates, forever.</li>
                                    <li className="flex flex-row lg:text-lg"><CheckCircle2Icon size={20} className="mr-2" /> Priority support.</li>
                                </ul>

                                <Link
                                    href="/dashboard/signup"
                                    className="flex mt-6 h-9 justify-center items-center rounded-xl bg-sky-500 px-4 align-middle text-lg font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-zinc-300 lg:mt-8"
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
