import Navbar from "../components/homepage/navbar"

const About = () => {
    return (
        <div className="mt-12 lg:mt-40">
            <Navbar />
            <div className="">
                <div className="flex flex-col mx-4">
                    <h1 className="text-center text-6xl underline decoration-sky-500 font-semibold lg:text-8xl">
                        About
                    </h1>
                    <span className="text-lg mt-6 text-gray-800 lg:w-[48rem] text-center lg:text-xl sm:48">
                        BetterExams points was made by <a href="https://mudkip.live" className="underline decoration-sky-500">Bence R</a> for a university portfolio project.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default About 
