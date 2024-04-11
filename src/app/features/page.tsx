import Navbar from "../components/homepage/navbar"

const Features = () => {
    return (
        <div className="mt-12 lg:mt-40">
            <Navbar />

            <div className="">
                <div className="flex flex-col mx-4">
                    <h1 className="text-center text-6xl underline decoration-sky-500 font-semibold lg:text-8xl">
                        Features
                    </h1>
                    <span className="text-lg mt-6 text-gray-800 lg:w-[48rem] text-center lg:text-xl sm:48">
                        BetterExams Points comes with many features that aim to make your experience as worry-free and amazing as possible.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Features
