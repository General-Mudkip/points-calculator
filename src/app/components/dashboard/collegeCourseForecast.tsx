import { api } from "~/utils/api"
import { useUser } from "@clerk/nextjs"

interface propsType {
    forecastPoints: number
}

const CollegeCourseForecast = ({ forecastPoints }: propsType) => {
    const { user } = useUser()

    if (!user) {
        return <div></div>
    }

    const userQuery = api.user.getCollegeCourse.useQuery({
        userId: user.id
    })

    const courseName = userQuery.data?.collegeCourseName
    const coursePoints = userQuery.data?.collegeCoursePoints

    if (courseName === "None set yet!") {
        return (
            <div>
                You haven't set the college course you're aiming for yet! Do so by clicking the 'Edit' button above.
            </div>
        )
    }

    const pointsStat = () => {
        const pointsDifference = forecastPoints - (coursePoints ?? 0)
        if (pointsDifference > 0) {
            return (
                <span className="font-bold text-green-600">+{pointsDifference} points above</span>
            )
        }

        return (
            <span className="font-bold text-red-600">{pointsDifference} points below</span>
        )
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div>
                You're currently {pointsStat()} the <span className="font-bold">minimum</span> points required to get into {courseName},
                based on your all-time average.
            </div>

            <div className="text-[0.75em] text-slate-600">
                Keep in mind that the points requirements provided by the CAO are the <span className="italic">minimum</span> points
                needed for a course; not necessarily the average. In reality, you should be aiming for a couple dozen points above
                the listed requirement to ensure you can get in.
            </div>
        </div>
    )
}

export default CollegeCourseForecast
