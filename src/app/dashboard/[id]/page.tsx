"use client";
import { api } from "~/utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "~/app/components/analytics/table/table";
import { columns } from "~/app/components/analytics/table/columns";
import AddTest from "~/app/components/analytics/addTest";
import RenderLineChart from "~/app/components/analytics/renderLineChart";

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
          <h1 className=" text-5xl font-bold">{subjectQuery.data?.name}</h1>
        )}
      </div>

      <RenderLineChart data={testQuery.data ?? []} />

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

      <AddTest subjectId={parseInt(params.id)} />
    </div>
  );
}
