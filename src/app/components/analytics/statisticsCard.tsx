import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type GradeLookupRecord = Record<string, string>;

const gradePointsLookup: GradeLookupRecord = {
  H1: "100",
  H2: "88",
  H3: "77",
  H4: "66",
  H5: "56",
  H6: "46",
  H7: "37",
  H8: "0",
  O1: "56",
  O2: "46",
  O3: "37",
  O4: "28",
  O5: "20",
  O6: "12",
  O7: "0",
  O8: "0",
};

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

interface statsCardProps {
  testData: {
    id: number;
    subjectId: number;
    userId: string;
    name: string;
    date: Date;
    percentage: number;
    maxMarks: number;
    achievedMarks: number;
  }[];
  subjectData: {
    id: number;
    name: string;
    userId: string;
    createdAt: Date;
    targetGrade: number;
    setLevel: string;
    averageGrade: number | null;
  };
}

interface statProps {
  name: string;
  value: string;
}

const Stat = (props: statProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-500">{props.name}</h3>
      <h3 className="text-2xl font-semibold">{props.value}</h3>
    </div>
  );
};

const StatisticsCard = (props: statsCardProps) => {
  if (props.subjectData.name === undefined) {
    return (
      <Card>
        <CardContent>
          <Skeleton className="h-[350px] w-[530x]" />
        </CardContent>
      </Card>
    );
  }

  const grade: string =
    (props.subjectData.setLevel === "Higher" ? "H" : "O") +
    props.subjectData.targetGrade;

  const averageGrade =
    props.testData.reduce((acc, obj) => acc + obj.percentage, 0) /
    props.testData.length;

  return (
    <Card className="w-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          Here are some statistics on {props.subjectData.name}.
        </CardDescription>

        <CardContent className="p-4">
          <div className="grid gap-x-2 gap-y-4 lg:grid-cols-2">
            <Stat name="Target Grade" value={grade} />
            <Stat
              name="Target Points"
              value={gradePointsLookup[grade] ?? "0"}
            />
            <Stat name="Average Grade" value={averageGrade.toString()} />

            <Stat
              name="Projected Points"
              value={
                gradePointsLookup[
                  determineGrade(averageGrade, props.subjectData.setLevel)
                ] ?? "0"
              }
            />
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default StatisticsCard;
