import { Footer } from "../components/homepage/footer"
import Image from "next/image"
import Navbar from "../components/homepage/navbar"

import thirdLevelImage from "public/thirdLevel.jpg"
import analyticsImage from "public/analytics.jpg"

const imageStyle = {
    scale: "100%"
}

const Features = () => {
    return (
        <div className="mt-12 flex min-h-[85vh] flex-col lg:mt-40">
            <Navbar />

            <div>
                <div className="mx-4 flex flex-col items-center">
                    <h1 className="text-center text-6xl font-semibold underline decoration-sky-500 lg:text-8xl">
                        Features
                    </h1>
                    <span className="sm:48 mt-6 text-center text-lg text-gray-800 lg:w-[48rem] lg:text-xl">
                        BetterExams Points comes with many features that aim to make your experience as worry-free and amazing as possible.
                    </span>
                    <div className="mt-14 flex w-screen flex-row justify-around px-20">
                        <div className="flex w-[50rem] flex-col p-16">
                            <h1 className="text-4xl font-semibold">Extensive Statistics</h1>
                            <p className="mt-2 text-lg">
                                Log and analyse various key figures. BetterExams Points automatically calculates your total points, both over time, and
                                the all-time average.

                            </p>
                        </div>
                        <div className="rounded-md shadow-xl">
                            <Image
                                src={analyticsImage}
                                priority={true}
                                placeholder="blur"
                                width="800"
                                style={imageStyle}
                                alt="Picture of the dashboard home page"
                            />
                        </div>
                    </div>
                    <div className="my-14 flex w-screen flex-row justify-around px-20">
                        <div className="rounded-md shadow-xl">
                            <Image
                                src={thirdLevelImage}
                                priority={true}
                                placeholder="blur"
                                width="800"
                                style={imageStyle}
                                alt="Picture of the dashboard home page"
                            />
                        </div>
                        <div className="flex w-[50rem] flex-col p-16">
                            <h1 className="text-4xl font-semibold">Track Your Total Points</h1>
                            <p className="mt-2 text-lg">
                                Easily see how close you are to achieving the required points for your chosen CAO points. Set goals and track
                                your progress over time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Features
