"use client";
import { useUser } from "@clerk/nextjs";
import RenderPointsChart from "../components/analytics/chart/homeChart";
import { api } from "~/utils/api";

export default function Home({ params }: { params: { id: string } }) {
  const { user } = useUser();

  if (!user) {
    return <div></div>;
  }

  const subjectQuery = api.subject.getSubjectById.useQuery({
    subjectId: parseInt(params.id),
  });

  const testQuery = api.test.getAllTests.useQuery({
    userId: user.id,
  });

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white text-black">
      <div className="flex flex-row">
        <div>
          <h1 className="text-4xl font-bold">Home</h1>
          <RenderPointsChart
            testData={testQuery.data ?? []}
            //@ts-expect-error Don't worry... about a thing
            subjectData={subjectQuery.data ?? {}}
          />
        </div>
      </div>
    </main>
  );
}
