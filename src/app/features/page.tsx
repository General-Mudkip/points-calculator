import { Footer } from "../components/homepage/footer"
import Image from "next/image"
import Navbar from "../components/homepage/navbar"

import thirdLevelImage from "public/thirdLevel.jpg"
import analyticsImage from "public/analytics.jpg"
import totalPointsImage from "public/totalPoints.jpg"

const imageStyle = {
    scale: "100%"
}

const Features = () => {
    return (
        <div className="mt-12 flex min-h-[85vh] flex-col lg:mt-40">
            <Navbar />

            <div>
                <div className="flex flex-col items-center">
                    <h1 className="text-center text-6xl font-semibold underline decoration-sky-500 lg:text-8xl">
                        Features
                    </h1>
                    <span className="mt-6 px-4 text-center text-lg text-gray-800 lg:w-[48rem] lg:text-xl">
                        BetterExams Points comes with many features that aim to make your experience as worry-free and amazing as possible.
                    </span>
                    <div className="mt-24 flex w-screen flex-col justify-center px-4 text-center lg:mt-14 lg:flex-row lg:justify-around lg:px-20">
                        <div className="flex flex-col lg:w-[50rem] lg:p-16">
                            <h1 className="text-4xl font-semibold">Extensive Statistics</h1>
                            <p className="mt-2 text-lg">
                                Log and analyse various key figures. BetterExams Points automatically calculates your total points, both over time, and
                                the all-time average.

                            </p>
                        </div>
                        <div className="mt-8 rounded-md shadow-xl lg:mt-0">
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

                    <div className="mt-20 flex w-screen flex-col justify-center px-4 text-center lg:mt-14 lg:flex-row lg:justify-around lg:px-20">
                        <div className="mt-8 hidden rounded-md shadow-xl lg:mt-0 lg:block">
                            <Image
                                src={thirdLevelImage}
                                priority={true}
                                placeholder="blur"
                                width="800"
                                style={imageStyle}
                                alt="Picture of a third level prediction based on user points"
                            />
                        </div>
                        <div className="flex flex-col lg:w-[50rem] lg:p-16">
                            <h1 className="text-4xl font-semibold">Aim For The Sky</h1>
                            <p className="mt-2 text-lg">
                                Easily set points goals and see how close you are to achieving the required points for your chosen CAO course.
                            </p>
                        </div>
                        <div className="mt-8 rounded-md shadow-xl lg:mt-0 lg:hidden">
                            <Image
                                src={thirdLevelImage}
                                priority={true}
                                placeholder="blur"
                                width="800"
                                style={imageStyle}
                                alt="Picture of a third level prediction based on user points"
                            />
                        </div>
                    </div>

                    <div className="my-20 flex w-screen flex-col justify-center px-4 text-center lg:mt-14 lg:flex-row lg:justify-around lg:px-20">
                        <div className="flex flex-col lg:w-[50rem] lg:p-16">
                            <h1 className="text-4xl font-semibold">Track Your Total Points</h1>
                            <p className="mt-2 text-lg">
                                Visualise your total points value, based on your average test result for each subject.
                            </p>
                        </div>
                        <div className="mt-8 rounded-md shadow-xl lg:mt-0">
                            <Image
                                src={totalPointsImage}
                                priority={true}
                                placeholder="blur"
                                width="800"
                                style={imageStyle}
                                alt="Picture of the total points over time chart"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Features
