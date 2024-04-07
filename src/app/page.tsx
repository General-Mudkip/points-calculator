import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navbar } from "./components/homepage/navbar"

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-y-10 bg-white text-black">
            <Navbar />
            <Button>
                <Link href="/dashboard">Continue to Dashboard</Link>
            </Button>
        </div>
    )
}

export default HomePage
