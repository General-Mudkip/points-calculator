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
    }, 2000);
  }

  return <button onClick={() => deleteTest()}>Delete Test</button>;
}
