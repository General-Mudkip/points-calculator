"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { PureComponent } from "react"

interface TestData {
    id: number
    subjectId: number
    userId: string
    name: string
    date: Date
    percentage: number
    maxMarks: number
    achievedMarks: number
}

interface ChartProps {
    testData: TestData[]
}

interface Subject {
    totalPoints: number
    testCount: number
}

const dataToUse = (testData: TestData[]) =>
    testData.map((item) => {
        const date = new Date(item.date)
        const formattedDate = date.getTime() / 1000

        return {
            name: item.name,
            date: formattedDate,
            percentage: item.percentage,
            subjectId: item.subjectId,
        }
    })
        .sort((a, b) => a.date - b.date)

// Sums up the points intelligently (max 6 subjects) and returns an integer.
const SumPoints = (data: TestData[]) => {
    // TODO: Add data to an object that can be passed to the chart
    const testData = dataToUse(data)

    for (let i = 1; i < testData.length + 1; i++) {
        const Subjects = new Map<number, Subject>

        const currentSlice = [...testData].slice(0, i)
        const date = currentSlice.slice(-1)[0]!.date // Just allow me to access [-1] javascript...

        for (const test of currentSlice) {
            if (Subjects.has(test.subjectId)) {
                const currentSubject = Subjects.get(test.subjectId)!
                const newTotal = currentSubject.totalPoints += test.percentage
                const newCount = currentSubject.testCount += 1
                Subjects.set(test.subjectId, { totalPoints: newTotal, testCount: newCount })
            } else {
                Subjects.set(test.subjectId, { totalPoints: test.percentage, testCount: 1 })
            }
        }

        const pointsArray: number[] = [];
        for (const subject of Subjects) {
            const averagePercent = subject[1].totalPoints / subject[1].testCount
            pointsArray.push(parseFloat(averagePercent.toFixed(2))) // JS Nonsense!
        }

        console.log("CHART:", pointsArray.sort((a, b) => a + b).slice(0, 6))
    }

}


export default class RenderPointChangeChart extends PureComponent<ChartProps> {
    constructor(props: ChartProps) {
        super(props)
    }

    render() {
        if (this.props.testData[0]?.id === undefined) {
            return <Skeleton className="h-[350px] w-[530x]" />
        }

        if (this.props.testData.length < 2) {
            return (
                <div className="flex h-[350px] items-center justify-center rounded-lg border-2 border-gray-600 text-center align-middle">
                    {this.props.testData.length === 0 ? (
                        <span>Add two tests to see your progress!</span>
                    ) : (
                        <span>Add one more test to see your progress!</span>
                    )}
                </div>
            )
        }

        SumPoints(this.props.testData)

        const createDataToUse = (props: ChartProps) => {
            let finalArray: TestData[];
            for (const test of props.testData) {
            }
            return props
        }

        return (
            <div>
                Hi.
            </div>
        )
    }
}
