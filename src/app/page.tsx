import { Hero } from "./components/homepage/hero"
import { Footer } from "./components/homepage/footer"
import Navbar from "./components/homepage/navbar"

const HomePage = () => {
    return (
        <div className="mt-12 flex flex-col lg:mt-40 min-h-[85vh]">
            <Navbar />
            <Hero />
            <Footer />
        </div>
    )
}

export default HomePage
