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
import { useRouter } from 'next/navigation'
import { api } from "~/utils/api"
import { PencilRuler } from "lucide-react"
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
        // [adamlearns] The error message doesn't match the validation (it only
        // requires a single character).
        .min(1, { message: "Subject names must be at least 2 characters." })
        .max(30, { message: "Subject names must be less than 30 characters." }),
    targetGrade: z.coerce
        .number()
        .min(1, { message: "Target grade must be above zero." })
        // [adamlearns] Same comment as above. The message says "less than 8",
        // but "8" is allowed.
        .max(8, { message: "Target grade must be less than 8." }),
    setLevel: z.union([z.literal("Higher"), z.literal("Ordinary")])
})

type subjectType = {
    data: {
        id: number
        name: string
        userId: string
        createdAt: Date
        targetGrade: number
        setLevel: string
        averageGrade: number | null
    }

}

export function EditSubject(subject: subjectType) {
    const { toast } = useToast()
    const [open, setOpen] = React.useState(false)
    const { user, isSignedIn, isLoaded } = useUser()
    const utils = api.useUtils()

    const router = useRouter()

    const editSubject = api.subject.editSubject.useMutation()
    const deleteSubject = api.subject.deleteSubject.useMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subjectName: subject.data.name,
            targetGrade: subject.data.targetGrade,
            // @ts-expect-error subject.setLevel is guaranteed to be either "Higher" or "Ordinary"
            setLevel: subject.data.setLevel
        }
    })

    if (!isSignedIn) { return <></> }

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoaded && isSignedIn) {
            toast({
                title: "Processing...",
                description: "Please wait a moment."
            })
            setOpen(false)
            editSubject.mutate(
                {
                    id: subject.data.id,
                    userId: user.id,
                    name: values.subjectName,
                    targetGrade: values.targetGrade,
                    setLevel: values.setLevel
                },
                {
                    onSuccess: () => {
                        toast({
                            title: "Subject Edited!",
                            description: `You successfully edited ${values.subjectName}.`
                        })
                        void utils.subject.invalidate()
                    }
                }
            )
        } else {
            toast({
                title: "Error!",
                description: `You must be logged in to edit a subject.`,
                variant: "destructive"
            })
        }
    }

    function submitDelete() {
        if (isLoaded && isSignedIn) {
            toast({
                title: "Processing...",
                description: "Please wait a moment."
            })
            setOpen(false)
            deleteSubject.mutate(
                {
                    subjectId: subject.data.id,
                    userId: subject.data.userId,
                },
                {
                    onSuccess: () => {
                        toast({
                            title: "Subject Deleted!",
                            description: "You successfully deleted the subject."
                        })
                        void utils.subject.invalidate()
                        void router.push("/dashboard")
                    }
                }
            )
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Toaster />
            <DialogTrigger asChild>
                <button className="flex w-auto items-center gap-x-2 rounded-lg p-2 text-gray-600 duration-150 hover:bg-gray-100 active:bg-gray-200">
                    <PencilRuler />
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Subject</DialogTitle>
                    <DialogDescription>
                        You're currently editing a subject.
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

                        <Button type="submit">Submit Changes</Button>
                        <Button
                            className="mt-2 rounded-md bg-red-600 p-2 text-white ml-4 hover:bg-red-700"
                            type="button"
                            onClick={() => submitDelete()}
                        >
                            Delete Subject
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default EditSubject
