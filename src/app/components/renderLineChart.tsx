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

const data = [
  {
    name: "1662988800",
    Percentage: 88,
  },
  {
    name: "1663593600",
    Percentage: 100,
  },
  {
    name: "1664587200",
    Percentage: 78,
  },
  {
    name: "1665460000",
    Percentage: 95,
  },
  {
    name: "1666152000",
    Percentage: 90,
  },
  {
    name: "1666756800",
    Percentage: 60,
  },
  {
    name: "1669104000",
    Percentage: 87,
  },
];

const DateFormatter = (date: string) => {
  const newDate = new Date(parseInt(date) * 1000);
  const toReturn =
    newDate.getDate() + "/" + newDate.getMonth() + "/" + newDate.getFullYear();
  console.log(toReturn);
  return toReturn;
};

const ComposedChartWithoutSSR = dynamic(
  () => import("recharts").then((recharts) => recharts.ComposedChart),
  { ssr: false },
);

export default class RenderLineChart extends PureComponent {
  render() {
    return (
      <ComposedChartWithoutSSR
        width={800}
        height={300}
        data={data}
        margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF" stopOpacity={0.2} />
            <stop offset="30%" stopColor="#399be3" stopOpacity={0.2} />
            <stop offset="30%" stopColor="red" stopOpacity={0.15} />
            <stop offset="60%" stopColor="#FFF" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          domain={[0, "dataMax+1000"]}
          scale="time"
          // @ts-expect-error "string" is a valid input.
          type="string"
          tickFormatter={DateFormatter}
        />
        <YAxis />
        <Tooltip />
        <CartesianGrid vertical={false} stroke="#DDD" />
        <ReferenceLine y={70} stroke="#000" isFront={true}>
          <Label position="bottom" value="H3 Cut Off" />
        </ReferenceLine>
        <Tooltip active={false} />

        <Area
          type="monotone"
          dataKey="Percentage"
          unit="%"
          fillOpacity={1}
          strokeWidth={2}
          fill="url(#colorUv)"
        />
      </ComposedChartWithoutSSR>
    );
  }
}
