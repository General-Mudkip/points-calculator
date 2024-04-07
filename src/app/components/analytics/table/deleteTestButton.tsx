import { toast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"
import { api } from "~/utils/api"

export function DeleteTestButton({
    testId,
    subjectId
}: {
    testId: number
    subjectId: number
}) {
    const deleteTestMutation = api.test.deleteTest.useMutation()
    const updateAverage = api.subject.setAverage.useMutation()

    const { user, isSignedIn } = useUser()

    if (!isSignedIn) {
        return <></>
    }

    const testsArray = api.test.getAllTestsBySubject.useQuery({
        subjectId: subjectId,
        userId: user.id
    })

    const utils = api.useUtils()

    function deleteTest() {

        function calculateAverage() {
            const testCount = testsArray.data?.length

            const testArrayWithoutOld = testsArray.data?.filter((tes) => tes.id != testId) ?? []

            const totalPercentage = testArrayWithoutOld.reduce(
                (total, test) => total + test.percentage,
                0
            )

            console.log(testsArray.data, testArrayWithoutOld)

            if (testCount != undefined && totalPercentage != undefined) {
                const newAverage = parseFloat(
                    ((totalPercentage) / (testCount - 1)).toFixed(2)
                )

                updateAverage.mutate(
                    {
                        subjectId: subjectId,
                        average: newAverage
                    },
                    {
                        onSuccess: () => {
                            toast({
                                title: "Test Deleted!",
                                description: `Successfully deleted the test.`
                            })
                            void utils.test.getAllTestsBySubject.invalidate()
                            void utils.subject.invalidate()
                        }
                    }
                )
            }
        }

        deleteTestMutation.mutate(
            {
                testId
            },
            {
                onSuccess: () => {
                    void utils.test.getAllTestsBySubject.invalidate({
                        subjectId: subjectId
                    })
                    void calculateAverage()
                }
            }
        )

        setTimeout(() => {
            void utils.test.getAllTestsBySubject.invalidate({
                subjectId: subjectId
            });
            calculateAverage()
        }, 1500)
    }

    return (
        <button
            onClick={() => deleteTest()}
            className="mt-2 rounded-md bg-red-600 p-2 text-white hover:bg-red-700"
        >
            Delete Test
        </button>
    )
}
