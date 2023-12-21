"use client";
import {
  ReferenceLine,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Label,
} from "recharts";

import dynamic from "next/dynamic";
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
  };
}

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

const ComposedChartWithoutSSR = dynamic(
  () => import("recharts").then((recharts) => recharts.ComposedChart),
  { ssr: false },
);

// TODO: Fix the dates, they're being wack af :(
export default class RenderLineChart extends PureComponent<RenderLineChartProps> {
  constructor(props: RenderLineChartProps) {
    super(props);
  }

  render() {
    if (
      this.props.testData === undefined &&
      this.props.subjectData === undefined
    ) {
      return <Skeleton className="h-[300px] w-[800px]" />;
    }

    const targetPercent = 100 - this.props.subjectData.targetGrade * 10;
    const gradeString: string =
      (this.props.subjectData.setLevel === "Higher" ? "H" : "O") +
      this.props.subjectData.targetGrade +
      " Cut-Off";

    console.log(100 - targetPercent);

    return (
      <ComposedChartWithoutSSR
        width={800}
        height={300}
        data={this.props.testData
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
          .sort((a, b) => a.date - b.date)}
        margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF" stopOpacity={0.2} />
            <stop
              offset={`${100 - targetPercent}%`}
              stopColor="#399be3"
              stopOpacity={0.2}
            />
            <stop
              offset={`${100 - targetPercent}%`}
              stopColor="red"
              stopOpacity={0.15}
            />
            <stop
              offset={`${140 - targetPercent}%`}
              stopColor="#FFF"
              stopOpacity={0.2}
            />
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
        <ReferenceLine y={targetPercent} stroke="#000" isFront={true}>
          <Label position="bottom" value={gradeString} />
        </ReferenceLine>
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
      </ComposedChartWithoutSSR>
    );
  }
}
