import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-y-10 bg-white text-black">
            <h1 className="font-sans text-7xl ">
                BetterExams <span className="font-bold">Points</span>
            </h1>
            <Button>
                <Link href="/dashboard">Continue to Dashboard</Link>
            </Button>
        </div>
    );
};

export default HomePage;
