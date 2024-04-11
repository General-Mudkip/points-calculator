import { Hero } from "./components/homepage/hero"
import { Footer } from "./components/homepage/footer"
import Navbar from "./components/homepage/navbar"

const HomePage = () => {
    return (
        <div className="mt-12 lg:mt-40">
            <Navbar />
            <Hero />
            <Footer />
        </div>
    )
}

export default HomePage
