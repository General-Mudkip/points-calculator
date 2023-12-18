"use client";
import { api } from "~/utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "~/app/components/analytics/table";
import { columns } from "~/app/components/analytics/columns";

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
      <div className="h-[300px] w-[800px] bg-red-300 text-center">CHART</div>
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
              testId: item.id,
              testDate: formattedDate,
              achievedMarks: item.achievedMarks,
              maxMarks: item.maxMarks,
              percentage: item.percentage,
            };
          }) ?? []
        }
      />
    </div>
  );
}
