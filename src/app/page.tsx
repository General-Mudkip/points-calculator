import { Navbar } from "./components/homepage/navbar"
import { Hero } from "./components/homepage/hero"
import { Footer } from "./components/homepage/footer"

const HomePage = () => {
    return (
        <div className="flex min-h-screen w-screen flex-col  gap-y-10 bg-white text-black">
            <Navbar />
            <Hero />
            <Footer />
        </div>
    )
}

export default HomePage
