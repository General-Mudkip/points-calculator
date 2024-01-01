"use client";
import { useUser } from "@clerk/nextjs";
import RenderPointsChart from "../components/analytics/chart/homeChart";
import { api } from "~/utils/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return <div></div>;
  }

  const testQuery = api.test.getAllTests.useQuery({
    userId: user.id,
  });

  const subjectQuery = api.subject.getAllSubjects.useQuery({
    userId: user.id,
  });

  const PointsChart = () => {
    if (testQuery.isFetched && subjectQuery.isFetched) {
      return (
        <RenderPointsChart
          testData={testQuery.data ?? []}
          subjectData={subjectQuery.data ?? []}
        />
      );
    } else {
      return <Skeleton className="h-[350px] w-[530x]" />;
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white text-black">
      <h1 className="place-self-start text-4xl font-bold">Home</h1>
      <PointsChart />
    </main>
  );
}
