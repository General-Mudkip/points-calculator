"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { PureComponent } from "react"
import { Area, CartesianGrid, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Label } from "recharts"
import { PointsChartTooltip } from "./pointsChartTooltip"

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

interface SubjectData {
    id: number
    name: string
    userId: string
    createdAt: Date
    targetGrade: number
    setLevel: string
    averageGrade: number | null
}

interface ChartProps {
    testData: TestData[]
    subjectData: SubjectData[]
    collegePoints: number
}

interface PointsChartProps {
    points: number
    testDate: number
}

interface Subject {
    totalPoints: number
    testCount: number
    setLevel: SubjectData
}

type GradeLookupRecord = Record<string, number>
const gradePointsLookup: GradeLookupRecord = {
    H1: 100,
    H2: 88,
    H3: 77,
    H4: 66,
    H5: 56,
    H6: 46,
    H7: 37,
    H8: 0,
    O1: 56,
    O2: 46,
    O3: 37,
    O4: 28,
    O5: 20,
    O6: 12,
    O7: 0,
    O8: 0
}

const determineGrade = (avg: number, level: string) => {
    let grade: string
    if (avg >= 90) {
        grade = "1"
    } else if (avg >= 80) {
        grade = "2"
    } else if (avg >= 70) {
        grade = "3"
    } else if (avg >= 60) {
        grade = "4"
    } else if (avg >= 50) {
        grade = "5"
    } else if (avg >= 40) {
        grade = "6"
    } else if (avg >= 30) {
        grade = "7"
    } else {
        grade = "8"
    }
    return (level === "Higher" ? "H" : "O") + grade
}

const determinePoints = (avg: number, subject: SubjectData) => {
    const grade = determineGrade(avg, subject.setLevel)

    if (subject.name.toLowerCase().includes("math") && !subject.name.toLowerCase().includes("applied")) {
        return (gradePointsLookup[grade] ?? 0) + 25
    }
    return gradePointsLookup[grade]
}


const sortByDate = (testData: TestData[]) =>
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


interface SumPointsProps {
    data: TestData[]
    subjectData: SubjectData[]
}

// Sums up the points intelligently (max 6 subjects) and returns an integer.
const SumPoints = ({ data, subjectData }: SumPointsProps) => {
    const testData = sortByDate(data)
    const pointsOverTimeData: PointsChartProps[] = [];
    // Each iteration searches a slice of the test array of length i. i.e iteration 1 has the first
    // test, iteration 3 will have the first 3, etc.
    for (let i = 1; i < testData.length + 1; i++) {
        const SubjectsMap = new Map<number, Subject>

        const currentSlice = [...testData].slice(0, i)
        const date = currentSlice.slice(-1)[0]!.date // Just allow me to access [-1] javascript...

        for (const test of currentSlice) {
            // Add points of test to total and increase counter
            if (SubjectsMap.has(test.subjectId)) {
                const currentSubject = SubjectsMap.get(test.subjectId)!
                const newTotal = currentSubject.totalPoints += test.percentage
                const newCount = currentSubject.testCount += 1
                SubjectsMap.set(test.subjectId, {
                    totalPoints: newTotal,
                    testCount: newCount,
                    setLevel: currentSubject.setLevel
                })
            } else { // Otherwise just create a new entry
                const thisTestSubject = subjectData.find(subject => subject.id === test.subjectId)
                SubjectsMap.set(test.subjectId, {
                    totalPoints: test.percentage,
                    testCount: 1,
                    setLevel: thisTestSubject!
                })
            }
        }

        const pointsArray: number[] = [];
        for (const subject of SubjectsMap) {
            const averagePercent = subject[1].totalPoints / subject[1].testCount // Calculate mean
            pointsArray.push(
                //@ts-expect-error It will work
                determinePoints(parseFloat((averagePercent).toFixed(2)),
                    subject[1].setLevel ?? "H1")
            ) // JS Nonsense!
        }

        pointsArray.sort((a, b) => b - a)

        pointsOverTimeData.push({
            points: pointsArray.slice(0, 6).reduce((a, b) => a + b),
            testDate: date
        })
    }

    console.log(pointsOverTimeData)

    return pointsOverTimeData
}

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

        const chartData = SumPoints({ data: this.props.testData, subjectData: this.props.subjectData })
        console.log(this.props.collegePoints)

        return (
            <ResponsiveContainer className="col-span-2" height={350} width="100%">
                <AreaChart
                    width={800}
                    height={350}
                    data={chartData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#399be3"
                                stopOpacity={0.2}
                            />
                            <stop
                                offset={`70%`}
                                stopColor="#FFF"
                                stopOpacity={0.2}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis
                        scale="time"
                        dataKey="testDate"
                        type="number"
                        domain={([dataMin, dataMax]) => {
                            const newMax = dataMax * 1.001
                            const newMin = dataMin * 0.999
                            return [newMin, newMax]
                        }}
                        tickFormatter={DateFormatter}
                    />
                    <Tooltip content={<PointsChartTooltip />} />
                    <YAxis
                        domain={[0, 625]}
                        tickCount={12}
                    />
                    <Tooltip active={false} />
                    <CartesianGrid vertical={false} stroke="#DDD" />
                    <ReferenceLine
                        y={this.props.collegePoints}
                        stroke="#000"
                        isFront={true}
                        strokeDasharray="3 3"
                    >
                        <Label position="top" value={`${this.props.collegePoints} Points`} />
                    </ReferenceLine >

                    <Area
                        dataKey="points"
                        type="monotone"
                        isAnimationActive={false}
                        fillOpacity={1}
                        strokeWidth={2}
                        dot={{
                            stroke: "#399be3",
                            strokeWidth: 2,
                            fill: "#FFF"
                        }}
                        fill="url(#colorUv)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}
