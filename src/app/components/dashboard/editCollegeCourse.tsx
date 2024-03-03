import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import { useForm } from "react-hook-form"
import { PencilRuler } from "lucide-react"

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

import { z } from "zod"
import { api } from "~/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUser } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    courseName: z
        .string()
        .min(1, { message: "Course name must be at least 2 characters." })
        .max(45, { message: "Course name must be less than 45 characters." }),
    coursePoints: z.coerce
        .number()
        .min(0, { message: "Course points must be above 0." })
        .max(1000, { message: "Course points cannot be above 1000." })
})

export function EditCourse() {
    const { toast } = useToast()
    const [open, setOpen] = React.useState(false)
    const { user, isLoaded } = useUser()
    const utils = api.useUtils()

    if (!user) {
        return <div></div>
    }

    const editCourse = api.user.editCollegeCourse.useMutation()
    const userQuery = api.user.getById.useQuery({
        userId: user.id
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseName: userQuery.data?.collegeCourseName,
            coursePoints: userQuery.data?.collegeCoursePoints
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoaded) {
            toast({
                title: "Processing...",
                description: "Please wait a moment."
            })
            setOpen(false)
            editCourse.mutate(
                {
                    // TODO: Use isLoaded and isSignedIn to verify
                    userId: user!.id,
                    courseName: values.courseName,
                    coursePoints: values.coursePoints,
                },
                {
                    onSuccess: () => {
                        toast({
                            title: "Course Edited!",
                            description: "You have successfully edited your aim course."
                        })
                        void utils.user.getCollegeCourse.invalidate() // Causes other components to refetch the request.
                    }
                }
            )
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Toaster />
            <DialogTrigger asChild>
                <button className="flex w-auto text-lg items-center gap-x-2 rounded-lg p-2 text-gray-600 duration-150 hover:bg-gray-100 active:bg-gray-200">
                    <PencilRuler />
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                    <DialogDescription>
                        You're currently editing your aim course.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="courseName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Accounting"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="coursePoints"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Points</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="565"
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

export default EditCourse
