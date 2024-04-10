import Image from "next/image"
import dashboardImage from "public/BEP_home.jpg"

const imageStyle = {
    scale: "100%"
}

export const Hero = () => {
    return (
        <div className="mt-48 lg:mt-96 flex flex-col items-center justify-center text-center gap-y-8 px-8">
            <span className="text-7xl lg:text-8xl font-bold justify-center align-middle text-center">
                <span className="underline decoration-sky-500">Your</span> Future Gradebook.
            </span>
            <span className="text-xl lg:text-2xl text-gray-800">
                The only test tracker designed specifically for Leaving Certificate students in Ireland
            </span>

            <div className="flex flex-row gap-x-4 pt-4">
                <button className="rounded-xl bg-sky-500 px-4 py-3 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-zinc-500">
                    Get Started
                </button>

                <button className="rounded-xl border-2 border-stone-700 px-4 py-3 text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-zinc-400">
                    Learn More
                </button>
            </div>

            {
                // TODO: Make this all responsive. Repurpose the sidebar code from the dashboard?
            }

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
