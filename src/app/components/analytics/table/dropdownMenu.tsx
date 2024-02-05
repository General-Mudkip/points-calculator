import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { DeleteTestButton } from "./deleteTestButton"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import React, { useState } from "react"
import EditTest from "./editTest"
import { DialogContext } from "./dialogContext"

type testType = {
    testId: number
    subjectId: number
    testName: string
    testDate: string
    maxMarks: number
    percentage: number
    achievedMarks: number
}

export function DropDownMenu(test: testType) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isEditOpen, setEditOpen] = React.useState(false)

    return (
        <DialogContext.Provider
            value={{ open: isEditOpen, setOpen: setEditOpen }}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                        Edit Test
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        Delete Test
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are You Sure?</DialogTitle>
                        <DialogDescription>
                            This will permanently delete the test.
                        </DialogDescription>
                    </DialogHeader>

                    <button onClick={() => setIsDeleteDialogOpen(false)}>
                        <DeleteTestButton
                            testId={test.testId}
                            subjectId={test.subjectId}
                        />
                    </button>
                </DialogContent>
            </Dialog>

            <EditTest
                testId={test.testId}
                testDate={test.testDate}
                testName={test.testName}
                achievedMarks={test.achievedMarks}
                maxMarks={test.achievedMarks}
                percentage={test.percentage}
                subjectId={test.subjectId}
            />
        </DialogContext.Provider>
    )
}
