"use client";
import { api } from "~/utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "~/app/components/analytics/table/table";
import { columns } from "~/app/components/analytics/table/columns";
import AddTest from "~/app/components/analytics/addTest";
import RenderLineChart from "~/app/components/analytics/chart/renderLineChart";
import EditSubject from "~/app/components/analytics/editSubject";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SubjectPage({ params }: { params: { id: string } }) {
  const subjectQuery = api.subject.getSubjectById.useQuery({
    subjectId: parseInt(params.id),
  });

  const testQuery = api.test.getAllTestsBySubject.useQuery({
    subjectId: parseInt(params.id),
  });

  return (
    <div className="flex min-h-screen w-[95%] flex-col items-center gap-y-12 bg-white p-32 pt-48 text-black">
      <div className="place-self-start">
        {subjectQuery.isLoading ? (
          <Skeleton className="h-[48px] w-[240px] rounded-lg" />
        ) : (
          <div className="flex flex-row place-items-center">
            <h1 className="mr-4 text-5xl font-bold">
              {subjectQuery.data?.name}
            </h1>
            {subjectQuery.data ? (
              <EditSubject data={subjectQuery.data} />
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>

      <hr />

      <div className="grid grid-cols-2 gap-4">
        <Card className="">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>Track your progress over time.</CardDescription>
          </CardHeader>

          <CardContent>
            <RenderLineChart
              testData={testQuery.data ?? []}
              // @ts-expect-error Typescript being tempermental
              subjectData={subjectQuery.data ?? []}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Tests</CardTitle>
            <CardDescription>Create, edit, and delete tests.</CardDescription>
          </CardHeader>
          <CardContent>
            {subjectQuery.data?.name === undefined ? (
              <Skeleton className="h-[150px] w-[400px]" />
            ) : (
              <>
                <DataTable
                  columns={columns}
                  data={
                    testQuery.data?.map((item) => {
                      const date = new Date(item.date);
                      const formattedDate = `${date.getDate()}/${
                        date.getMonth() + 1
                      }/${date.getFullYear()}`;

                      return {
                        testName: item.name,
                        subjectId: item.subjectId,
                        testId: item.id,
                        testDate: formattedDate,
                        achievedMarks: item.achievedMarks,
                        maxMarks: item.maxMarks,
                        percentage: item.percentage,
                      };
                    }) ?? []
                  }
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <AddTest subjectId={parseInt(params.id)} />
    </div>
  );
}
