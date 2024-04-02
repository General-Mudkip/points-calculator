"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

import { Calendar as CalendarIcon } from "lucide-react"

import { DialogContext } from "./dialogContext"

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"
import { api } from "~/utils/api"
import { DateTime } from "luxon"

export const formSchema = z
    .object({
        testName: z
            .string()
            .min(1, { message: "Test names must be at least 2 characters." })
            .max(60, {
                message: "Test names must be less than 60 characters."
            }),
        testDate: z.date({
            required_error: "Test date is required."
        }),
        achievedMark: z.coerce
            .number()
            .min(0, { message: "Marks must be above zero." }),

        // [adamlearns] Found a bug. When adding a test, I typed in 50 for
        // "achieved marks", nothing for "max marks", and 50 for the percentage,
        // and upon adding it, the UI showed "50/0".
        maxMarks: z.coerce
            .number()
            .min(0, { message: "Marks must be above zero." }),

        // [adamlearns] This shouldn't be something that the user can specify,
        // or if it is, then it should modify achievedMark when set.
        percentage: z.coerce
            .number()
            .min(0, {
                message:
                    "You can't get less than 0% on a test. Unless you try really hard."
            })
            .max(100, {
                message: "Congrats, but you can't get more than 100% on a test."
            })
    })
    .superRefine((val, ctx) => {
        if (val.achievedMark && val.maxMarks) {
            if (val.achievedMark > val.maxMarks) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "You can't get more than the maximum marks.",
                    path: ["achievedMark"]
                })
            }
        }
        return val
    })

// [adamlearns] I see this type or something very similar being redefined in
// several locations. I would consider exporting this type and then reusing it
// everywhere to make things easier to understand and more resilient to changes
// to any of the individual types. For example, suppose you changed subjectId to
// be a string here, you would need to update many locations in the code.
type testType = {
    testId: number
    subjectId: number
    testName: string
    testDate: string
    maxMarks: number
    percentage: number
    achievedMarks: number
}

export function EditTest(test: testType) {
    const { toast } = useToast()
    const { user, isSignedIn, isLoaded } = useUser()
    const utils = api.useUtils()

    const { open, setOpen } = React.useContext(DialogContext)

    const submitTest = api.test.editTest.useMutation()
    const updateAverage = api.subject.setAverage.useMutation()

    const testsArray = api.test.getAllTestsBySubject.useQuery({
        subjectId: test.subjectId
    })

    const formattedDate = DateTime.fromFormat(test.testDate, "d/M/yyyy").toJSDate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            testDate: formattedDate,
            percentage: test.percentage,
            achievedMark: test.achievedMarks,
            maxMarks: test.maxMarks,
            testName: test.testName
        }
    })

    function calculateAverage(newGrade: number) {
        const testCount = testsArray.data?.length

        const totalPercentage = testsArray.data?.reduce(
            (total, test) => total + test.percentage,
            0
        )

        // [adamlearns] Nit: checking "testCount" below is unnecessary since the
        // only way to have a totalPercentage > 0 is to have tests (maybe
        // TypeScript requires the check, in which case ignore me 😛)
        if (totalPercentage && testCount) {
            const newAverage = parseFloat(
                ((totalPercentage + newGrade) / (testCount + 1)).toFixed(2)
            )

            updateAverage.mutate(
                {
                    subjectId: test.subjectId,
                    average: newAverage
                },
                {
                    onSuccess: () => {
                        toast({
                            title: "Test Edited!",
                            description: `You successfully edited the test.`
                        })
                        void utils.test.getAllTestsBySubject.invalidate()
                        void utils.subject.invalidate()
                    }
                }
            )
        }
    }


    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoaded && isSignedIn) {
            toast({
                title: "Processing...",
                description: "Please wait a moment."
            })
            setOpen(false)
            submitTest.mutate({
                testId: test.testId,
                userId: user.id,
                subjectId: test.subjectId,
                name: values.testName,
                date: values.testDate,
                achievedMarks: values.achievedMark,
                maxMarks: values.maxMarks,
                percentage: values.percentage
            })
            calculateAverage(values.percentage)
        } else {
            toast({
                title: "Error!",
                description: `You must be logged in to edit a test.`,
                variant: "destructive"
            })
        }
    }

    function calculatePercentAchieved(achievedMark: string) {
        const maxMarks = form.getValues("maxMarks")
        if (achievedMark && maxMarks) {
            const percentage = parseFloat(
                ((parseFloat(achievedMark) / maxMarks) * 100).toFixed(2)
            )
            form.setValue("percentage", percentage)
        }
    }

    function calculatePercentMax(maxMarks: string) {
        const achievedMark = form.getValues("achievedMark")
        if (achievedMark && maxMarks) {
            const percentage = parseFloat(
                ((achievedMark / parseFloat(maxMarks)) * 100).toFixed(2)
            )
            form.setValue("percentage", percentage)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Toaster />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Test</DialogTitle>
                    <DialogDescription>
                        You're currently editing a test.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="testName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Test Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Winter Exams"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="testDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Test Date *</FormLabel>
                                    <Popover modal={true}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                        "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mx-1 h-4 w-4" />
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                    new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="achievedMark"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Achieved Marks</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="174"
                                            onChangeCapture={(e) =>
                                                calculatePercentAchieved(
                                                    e.currentTarget.value
                                                )
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxMarks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum Marks</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="200"
                                            onChangeCapture={(e) =>
                                                calculatePercentMax(
                                                    e.currentTarget.value
                                                )
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="percentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Percentage</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="87"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit Changes</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default EditTest
