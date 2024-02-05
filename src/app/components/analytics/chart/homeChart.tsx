"use client";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  BarChart,
} from "recharts";

import { PureComponent } from "react";
import { CustomTooltip } from "./tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface RenderLineChartProps {
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
  }[];
}

const monthsLookup: Record<number, string> = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const DateFormatter = (date: string) => {
  const newDate = new Date(parseInt(date) * 1000);
  const toReturn =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear();
  return toReturn;
};

export default class RenderPointsChart extends PureComponent<RenderLineChartProps> {
  constructor(props: RenderLineChartProps) {
    super(props);
  }

  render() {
    if (this.props.testData[0]?.id === undefined) {
      return <Skeleton className="h-[350px] w-[530x]" />;
    }

    if (this.props.testData.length < 2) {
      return (
        <div className="flex h-[350px] w-[530x] items-center justify-center rounded-lg border-2 border-gray-600 text-center align-middle">
          {this.props.testData.length === 0 ? (
            <span>Add two tests to see your progress!</span>
          ) : (
            <span>Add one more test to see your progress!</span>
          )}
        </div>
      );
    }

    const dataToUse = this.props.testData
      .map((item) => {
        const date = new Date(item.date);
        const formattedDate = date.getTime() / 1000;

        return {
          name: item.name,
          date: formattedDate,
          percentage: item.percentage,
          achievedMarks: item.achievedMarks,
          maxMarks: item.maxMarks,
        };
      })
      .sort((a, b) => a.date - b.date);
    /* 
    function getMinDate(testData: RenderLineChartProps["testData"]) {
      const minDate = dataToUse[0]?.date
        ? DateTime.fromSeconds(dataToUse[0].date)
        : DateTime.fromSeconds(0);
      const monthsSinceEarliest = Math.floor(
        minDate.diffNow().as("months") * -1,
      );
      console.log(monthsSinceEarliest);
      const toReturn: Record<string, testObj[]> = {};

      for (let i = 0; i <= monthsSinceEarliest; i++) {
        const currentMonth = DateTime.now().minus({ months: i });
        const month = currentMonth.monthShort;
        const year = currentMonth.year;
        const key = `${month} ${year}`;
        toReturn[key] = [];
      }

      for (const test of testData) {
        const date = DateTime.fromJSDate(test.date);
        const month = date.monthShort;
        const year = date.year;
        const key = `${month} ${year}`;
        console.log(test);
        toReturn[key]?.push({
          id: test.id,
          subjectName: test.name,
          percentage: test.percentage,
        });
      }

      console.log(toReturn);
    } */

    /*     getMinDate(this.props.testData); */

    return (
      <ResponsiveContainer height={350} width="100%">
        <BarChart
          width={800}
          height={350}
          data={dataToUse}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#399be3" stopOpacity={0.2} />
              <stop offset={`70%`} stopColor="#FFF" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            scale="time"
            domain={([dataMin, dataMax]) => {
              const newMax = dataMax * 1.001;
              const newMin = dataMin * 0.999;
              return [newMin, newMax];
            }}
            type="number"
            tickFormatter={DateFormatter}
          />
          <YAxis
            unit={"%"}
            ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid vertical={false} stroke="#DDD" />
          <Tooltip active={false} />

          <Area
            type="monotone"
            dataKey="percentage"
            unit="%"
            fillOpacity={1}
            strokeWidth={2}
            dot={{ stroke: "#399be3", strokeWidth: 2, fill: "#FFF" }}
            fill="url(#colorUv)"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
