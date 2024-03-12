/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PointsChartTooltip = ({ active, payload }: any) => {
    const DateFormatter = (date: number) => {
        const newDate = new Date(date * 1000)
        const toReturn =
            newDate.getDate() +
            "/" +
            (newDate.getMonth() + 1) +
            "/" +
            newDate.getFullYear()
        return toReturn
    }

    if (active && payload && payload.length > 0) {
        return (
            <div className="rounded-lg bg-white p-3 shadow-lg">

                <p className="italic pt-1">
                    {DateFormatter(payload[0].payload.testDate)}
                </p>

                <p className="label">Total Points: {payload[0].payload.points}</p>
            </div>
        )
    }

    return null
}
