import { api } from "~/utils/api";

export function DeleteTestButton({
    testId,
    subjectId,
}: {
    testId: number;
    subjectId: number;
}) {
    const deleteTestMutation = api.test.deleteTest.useMutation();
    const utils = api.useUtils();

    function deleteTest() {
        deleteTestMutation.mutate(
            {
                testId,
            },
            {
                onSuccess: () =>
                    void utils.test.getAllTestsBySubject.invalidate({
                        subjectId: subjectId,
                    }),
            },
        );

        // onSuccess is not working properly. TODO: Debug.
        setTimeout(() => {
            void utils.test.getAllTestsBySubject.invalidate({
                subjectId: subjectId,
            });
        }, 1500);
    }

    return (
        <button
            onClick={() => deleteTest()}
            className="mt-2 rounded-md bg-red-600 p-2 text-white"
        >
            Delete Test
        </button>
    );
}
