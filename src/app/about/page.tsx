import { Footer } from "../components/homepage/footer"
import Navbar from "../components/homepage/navbar"

const About = () => {
    return (
        <div className="mt-12 flex min-h-[85vh] flex-col lg:mt-40">
            <Navbar />
            <div className="mx-4 flex flex-col items-center">
                <h1 className="text-center text-6xl font-semibold underline decoration-sky-500 lg:text-8xl">
                    About
                </h1>
                <span className="sm:48 mt-6 text-center text-lg text-gray-800 lg:w-[48rem] lg:text-xl">
                    BetterExams points was made by <a href="https://mudkip.live" className="underline decoration-sky-500">Bence R</a> for a university portfolio project.
                </span>
            </div>

            <Footer />
        </div>
    )
}

export default About 
