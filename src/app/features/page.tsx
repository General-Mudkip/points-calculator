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
        <div className="mt-12 flex flex-col min-h-[85vh] lg:mt-40">
            <Navbar />

            <div>
                <div className="flex flex-col mx-4 items-center">
                    <h1 className="text-center text-6xl underline decoration-sky-500 font-semibold lg:text-8xl">
                        Features
                    </h1>
                    <span className="text-lg mt-6 text-gray-800 lg:w-[48rem] text-center lg:text-xl sm:48">
                        BetterExams Points comes with many features that aim to make your experience as worry-free and amazing as possible.
                    </span>
                    <div className="flex flex-row justify-around mt-14 w-screen px-20">
                        <div className="flex flex-col p-16 w-[50rem]">
                            <h1 className="text-4xl font-semibold">Extensive Statistics</h1>
                            <p className="mt-2 text-lg">
                                Log and analyse various key figures. BetterExams Points automatically calculates your total points, both over time, and
                                the all-time average.

                            </p>
                        </div>
                        <div className="shadow-xl rounded-md">
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
                    <div className="flex flex-row justify-around my-14 w-screen px-20">
                        <div className="shadow-xl rounded-md">
                            <Image
                                src={thirdLevelImage}
                                priority={true}
                                placeholder="blur"
                                width="800"
                                style={imageStyle}
                                alt="Picture of the dashboard home page"
                            />
                        </div>
                        <div className="flex flex-col p-16 w-[50rem]">
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
