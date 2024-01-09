import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface avgCardProps {
    subjectData: {
        id: number;
        name: string;
        userId: string;
        createdAt: Date;
        targetGrade: number;
        setLevel: string;
        averageGrade: number;
    }[];
}

interface subjectArray {
    id: number;
    name: string;
    userId: string;
    createdAt: Date;
    targetGrade: number;
    setLevel: string;
    averageGrade: number;
}

const determineGrade = (avg: number, level: string) => {
    let grade: string;
    if (avg >= 90) {
        grade = "1";
    } else if (avg >= 80) {
        grade = "2";
    } else if (avg >= 70) {
        grade = "3";
    } else if (avg >= 60) {
        grade = "4";
    } else if (avg >= 50) {
        grade = "5";
    } else if (avg >= 40) {
        grade = "6";
    } else if (avg >= 30) {
        grade = "7";
    } else {
        grade = "8";
    }
    return (level === "Higher" ? "H" : "O") + grade;
};

const gradeString = (level: string, grade: number) => {
    return (level === "Higher" ? "H" : "O") + grade;
};

const averageGrade = (subjectData: subjectArray[]) => {
    return parseFloat(
        (
            subjectData.reduce((a: number, b) => a + b.averageGrade, 0) /
            subjectData.length
        ).toFixed(2),
    );
};

const SubjectAveragesCard = (props: avgCardProps) => {
    if (props.subjectData.length === 0) {
        return <div></div>;
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
                                        subject.targetGrade,
                                    )}
                                </TableCell>
                                <TableCell>
                                    {determineGrade(
                                        subject.averageGrade ?? 0,
                                        subject.setLevel,
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="font-bold">
                            <TableCell>Average</TableCell>
                            <TableCell>
                                {averageGrade(props.subjectData)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default SubjectAveragesCard;
