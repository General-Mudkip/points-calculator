"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"
import { api } from "../../../utils/api"
import { PlusCircle } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

const formSchema = z.object({
    subjectName: z
        .string()
        .min(1, { message: "Subject names must be at least 2 characters." })
        .max(30, { message: "Subject names must be less than 30 characters." }),
    targetGrade: z.coerce
        .number()
        .min(1, { message: "Target grade must be above zero." })
        .max(8, { message: "Target grade must be less than 8." }),
    setLevel: z.union([z.literal("Higher"), z.literal("Ordinary")])
})

export function AddSubject() {
    const { toast } = useToast()
    const [open, setOpen] = React.useState(false)
    const { user, isSignedIn, isLoaded } = useUser()
    const utils = api.useUtils()

    const submitSubject = api.subject.createSubject.useMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoaded && isSignedIn) {
            toast({
                title: "Processing...",
                description: "Please wait a moment."
            })
            setOpen(false)
            submitSubject.mutate(
                {
                    name: values.subjectName,
                    userId: user.id,
                    targetGrade: values.targetGrade,
                    setLevel: values.setLevel
                },
                {
                    onSuccess: () => {
                        toast({
                            title: "Subject Created!",
                            description: `You created a new subject called ${values.subjectName}.`
                        })
                        void utils.subject.getAllSubjects.invalidate()
                    }
                }
            )
        } else {
            toast({
                title: "Error!",
                description: `You must be logged in to create a subject.`,
                variant: "destructive"
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Toaster />
            <DialogTrigger asChild>
                <button className="flex w-full items-center gap-x-2 rounded-lg p-2 text-gray-600 font-normal duration-150 hover:bg-gray-100 active:bg-gray-200">
                    <PlusCircle />
                    Add Subject
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Subject</DialogTitle>
                    <DialogDescription>
                        Create a new subject to track.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="subjectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="📖 English"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="setLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject Level</FormLabel>

                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Higher">
                                                Higher
                                            </SelectItem>
                                            <SelectItem value="Ordinary">
                                                Ordinary
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        What level are you currently doing the
                                        subject at? You can always change this
                                        later.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="targetGrade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Target Grade</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="5"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The number in H1, H2, O4, etc.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Create Subject</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default AddSubject
