"use client";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ColumnDef } from "@tanstack/react-table";

import { z } from "zod";

const formSchema = z.object({
  testName: z.string(),
  testId: z.number(),
  testDate: z.string(),
  achievedMarks: z.coerce.number(),
  maxMarks: z.coerce.number(),
  percentage: z.coerce.number(),
});

export const columns: ColumnDef<z.infer<typeof formSchema>>[] = [
  {
    header: () => <div className="text-right">Name</div>,
    accessorKey: "testName",
  },
  {
    header: "Date",
    accessorKey: "testDate",
  },
  {
    header: "Marks",
    accessorKey: "achievedMarks",
    cell: ({ row }) => {
      const marks = row.original.achievedMarks + "/" + row.original.maxMarks;
      return <div className="text-left font-medium">{marks}</div>;
    },
  },

  {
    header: "Percentage",
    accessorKey: "percentage",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "percent",
        maximumFractionDigits: 2,
      }).format(row.original.percentage / 100);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
];
