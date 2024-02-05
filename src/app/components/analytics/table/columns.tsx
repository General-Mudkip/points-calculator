"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown } from "lucide-react"

import { DateTime } from "luxon"

import { Button } from "@/components/ui/button"

import { z } from "zod"

import { DropDownMenu } from "./dropdownMenu"

const formSchema = z.object({
    testName: z.string(),
    subjectId: z.number(),
    testId: z.number(),
    testDate: z.string(),
    achievedMarks: z.coerce.number(),
    maxMarks: z.coerce.number(),
    percentage: z.coerce.number()
})

export const columns: ColumnDef<z.infer<typeof formSchema>>[] = [
    {
        header: () => <div className="text-right">Name</div>,
        accessorKey: "testName"
    },
    {
        accessorKey: "testDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (a, b) => {
            const dateA = DateTime.fromFormat(
                a.original.testDate,
                "d/M/yyyy"
            ).toJSDate()
            const dateB = DateTime.fromFormat(
                b.original.testDate,
                "d/M/yyyy"
            ).toJSDate()

            return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
        }
    },
    {
        header: "Marks",
        accessorKey: "achievedMarks",
        cell: ({ row }) => {
            const marks =
                row.original.achievedMarks + "/" + row.original.maxMarks
            return <div className="text-left font-medium">{marks}</div>
        }
    },

    {
        accessorKey: "percentage",
        cell: ({ row }) => {
            const formatted = new Intl.NumberFormat("en-US", {
                style: "percent",
                maximumFractionDigits: 2
            }).format(row.original.percentage / 100)

            return <div className="text-left font-medium">{formatted}</div>
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Percentage
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const test = row.original

            return (
                <DropDownMenu
                    testId={test.testId}
                    subjectId={test.subjectId}
                    testName={test.testName}
                    testDate={test.testDate}
                    maxMarks={test.maxMarks}
                    percentage={test.percentage}
                    achievedMarks={test.achievedMarks}
                />
            )
        }
    }
]
