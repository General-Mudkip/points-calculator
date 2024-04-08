import { Navbar } from "./components/homepage/navbar"
import { Hero } from "./components/homepage/hero"
import { Footer } from "./components/homepage/footer"

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-y-10 bg-white text-black">
            <Navbar />
            <Hero />
            <Footer />
        </div>
    )
}

export default HomePage
