"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import moment from "moment";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    accessorKey: "testDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (a, b) => {
      const dateA = moment(a.original.testDate, "DD/MM/YYYY").toDate();
      const dateB = moment(b.original.testDate, "DD/MM/YYYY").toDate();
      return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
    },
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
    accessorKey: "percentage",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "percent",
        maximumFractionDigits: 2,
      }).format(row.original.percentage / 100);

      return <div className="text-left font-medium">{formatted}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Percentage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const test = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(test.percentage.toString())
              }
            >
              Copy test percentage
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Test</DropdownMenuItem>
            <DropdownMenuItem>Delete Test</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
