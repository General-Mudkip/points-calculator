"use client";
import { Suspense } from "react";
import { api } from "~/utils/api";
import Loading from "./loading";

export default function SubjectPage({ params }: { params: { id: string } }) {
  const subjectQuery = api.subject.getSubjectById.useQuery({
    subjectId: parseInt(params.id),
  });

  return (
    <div className="flex min-h-screen w-[95%] flex-col items-center bg-white p-32 pt-48 text-black">
      <Suspense fallback={<Loading />}>
        <h1 className="mb-12 place-self-start text-5xl font-bold">
          {subjectQuery.data?.name}
        </h1>

        <div className="h-[300px] w-[800px] bg-red-300 text-center">CHART</div>
      </Suspense>
    </div>
  );
}
