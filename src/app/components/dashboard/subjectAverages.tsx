import { Card, CardTitle, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import CollegeCourseForecast from "./collegeCourseForecast"
import { EditCourse } from "./editCollegeCourse"

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

interface avgCardProps {
    subjectData: SubjectData[],
    testData: TestData[]
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

const gradeString = (level: string, grade: number) => {
    return (level === "Higher" ? "H" : "O") + grade
}

interface StatProps {
    title: string,
    stat: string,
}

const Stat = ({ title, stat }: StatProps) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-500">
                {title}
            </h3>
            <h3 className="text-2xl font-semibold">{stat}</h3>
        </div>
    )
}

const sortSubjects = (props: avgCardProps) => {
    // Need to create a copy of props.subjectData or else it'll mutate the original, causing
    // the sidebar to also become sorted.
    const sortedSubjects = [...props.subjectData].sort((a, b) => (b.averageGrade ?? 0) - (a.averageGrade ?? 0))
    return sortedSubjects
}

const sumPoints = (props: avgCardProps) => {
    const sortedSubjects = sortSubjects(props).slice(0, 6)
    let summedPoints = 0

    for (const subject of sortedSubjects) {
        if (subject.averageGrade != undefined) {
            summedPoints += determinePoints(subject.averageGrade, subject) ?? 0
        }
    }

    return summedPoints
}


const recentSumPoints = (props: avgCardProps) => {
    const summedPoints: number[] = []

    props.subjectData.forEach((subject) => {
        const tempTests: TestData[] = []
        props.testData.forEach((test) => {
            if (test.subjectId == subject.id) {
                tempTests.push(test)
            }
        })

        if (tempTests.length > 0) {
            let highestGrade: TestData = tempTests[0]!
            for (const test of tempTests) {
                if (test.date > highestGrade.date) {
                    highestGrade = test
                }
            }
            summedPoints.push(determinePoints(highestGrade.percentage ?? 0, subject) ?? 0)
        }
    })

    const sortedPointsArray = summedPoints.sort((a, b) => b - a).splice(0, 6)

    if (sortedPointsArray.length > 0) {
        return sortedPointsArray.reduce((a, b) => a + b)
    }

    return 0
}

const SubjectAveragesCard = (props: avgCardProps) => {
    if (props.subjectData.length === 0) {
        return <div></div>
    }

    const sortedSubjects = sortSubjects(props)
    const countedSubjects = sortedSubjects.slice(0, 6)

    // TODO: Seperate out the table and forecast cards into their own components.
    return (
        <>
            <Card className="row-span-2">
                <CardHeader>
                    <CardTitle>Your Subjects</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-32">Subject</TableHead>
                                <TableHead>Average Score</TableHead>
                                <TableHead>Most Recent Score</TableHead>
                                <TableHead>Target Grade</TableHead>
                                <TableHead>Projected Grade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props.subjectData.map((subject) => (
                                <TableRow className={countedSubjects.includes(subject) ? `bg-sky-100 hover:bg-gray-50` : `bg-transparent`}>
                                    <TableCell>{subject.name}</TableCell>
                                    <TableCell>
                                        {subject.averageGrade}
                                    </TableCell>
                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell>
                                        {gradeString(
                                            subject.setLevel,
                                            subject.targetGrade
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {determineGrade(
                                            subject.averageGrade ?? 0,
                                            subject.setLevel
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <span className="pt-3">Your top 6 subjects are <span className="bg-sky-100">highlighted</span>.</span>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Points Forecast</CardTitle>
                    <CardDescription>Predictions based on your past average test results.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-4">
                        <Stat title="Based on All-Time Averages" stat={sumPoints(props).toString()} />
                        <Stat title="Based on Most Recent Tests" stat={recentSumPoints(props).toString()} />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex flex-row gap-x-2 align-baseline"><span className="self-center">Third Level Ambitions</span> <EditCourse /></CardTitle>
                    <CardDescription>
                        Track how you're doing when it comes to your goal course.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CollegeCourseForecast forecastPoints={sumPoints(props)} />
                </CardContent>
            </Card>
        </>
    )
}

export default SubjectAveragesCard
