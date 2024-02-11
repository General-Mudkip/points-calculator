import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

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

interface avgCardProps {
    subjectData: {
        id: number
        name: string
        userId: string
        createdAt: Date
        targetGrade: number
        setLevel: string
        averageGrade: number
    }[]
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

const determinePoints = (avg: number, level: string) => {
    const grade = determineGrade(avg, level)
    return gradePointsLookup[grade]
}

const gradeString = (level: string, grade: number) => {
    return (level === "Higher" ? "H" : "O") + grade
}

const sumPoints = (props: avgCardProps) => {
    const avgGradeArray: number[] = []

    for (const subject of props.subjectData) {
        if (subject.averageGrade != undefined) {
            if (
                subject.name.includes("Maths") &&
                !subject.name.includes("Applied") &&
                subject.setLevel === "Higher" &&
                subject.averageGrade > 40 // sorry
            ) {
                avgGradeArray.push(
                    determinePoints(subject.averageGrade, subject.setLevel) + 25
                )
            }
            avgGradeArray.push(
                determinePoints(subject.averageGrade, subject.setLevel)
            )
        }
    }

    avgGradeArray.sort((a, b) => b - a).splice(6)

    console.log(avgGradeArray)

    return avgGradeArray.reduce((a, b) => a + b, 0)
}

const SubjectAveragesCard = (props: avgCardProps) => {
    if (props.subjectData.length === 0) {
        return <div></div>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Subjects</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-32">Subject</TableHead>
                            <TableHead>Average Score</TableHead>
                            <TableHead>Target Grade</TableHead>
                            <TableHead>Projected Grade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.subjectData.map((subject) => (
                            <TableRow>
                                <TableCell>{subject.name}</TableCell>
                                <TableCell>{subject.averageGrade}</TableCell>
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
                <div className="mt-2">
                    <h1 className="text-2xl font-bold">Projected Points</h1>
                    <p>{sumPoints(props)}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default SubjectAveragesCard
