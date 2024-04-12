import Image from "next/image"
import Link from "next/link"
import dashboardImage from "public/BEP_home.jpg"

const imageStyle = {
    scale: "100%"
}

export const Hero = () => {
    return (
        <div className="flex flex-col items-center gap-y-8  px-8 text-center">
            <h1 className="justify-center text-center align-middle text-6xl font-bold lg:text-8xl">
                <span className="underline decoration-sky-500">Your</span> Future Gradebook.
            </h1>
            <span className="text-xl text-gray-800  lg:text-2xl">
                The only test tracker designed specifically for Leaving Certificate students in Ireland
            </span>

            <div className="flex flex-row gap-x-4 pt-4">
                <Link
                    href="/dashboard/signup"
                    className="flex justify-center items-center rounded-xl bg-sky-500 px-4 align-middle text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-zinc-500"
                >
                    <span className="">Get Started</span>
                </Link>

                <Link href="/features" className="rounded-xl flex items-center border-2 border-stone-700 px-4 py-3 text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-zinc-400">
                    Learn More
                </Link>
            </div>

            <div className="relative mb-16 mt-12 rounded-3xl border-2 border-slate-200 p-2 shadow-2xl">
                <Image
                    src={dashboardImage}
                    priority={true}
                    placeholder="blur"
                    width="1750"
                    style={imageStyle}
                    alt="Picture of the dashboard home page"
                />
            </div>
        </div>
    )
}
