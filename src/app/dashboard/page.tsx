"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@clerk/nextjs"
import { LayoutPanelLeft } from "lucide-react"
import { api } from "~/utils/api"
import RenderPointsChart from "../components/analytics/chart/homeChart"
import AverageSubjectCard from "../components/dashboard/subjectAverages"
import RenderPointChangeChart from "../components/analytics/chart/pointsChart"

export default function Home() {
    const { user } = useUser()

    if (!user) {
        return <div></div>
    }

    const testQuery = api.test.getAllTests.useQuery({
        userId: user.id
    })

    const subjectQuery = api.subject.getAllSubjects.useQuery({
        userId: user.id
    })

    const PointsChart = () => {
        if (testQuery.isFetched && subjectQuery.isFetched) {
            return (
                <Card className="row-span-2 md:col-span-2">
                    <CardHeader>
                        <CardTitle>All Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RenderPointsChart
                            testData={testQuery.data ?? []}
                            subjectData={subjectQuery.data ?? []}
                        />
                    </CardContent>
                </Card>
            )
        } else {
            return <Skeleton className="row-span-2 md:col-span-2 h-[350px] w-[530x]" />
        }
    }


    if (!testQuery.isFetched && !subjectQuery.isFetched) {
        return <div></div>
    }

    return (
        <main className="flex w-full flex-col items-center bg-white text-black">
            <h1 className="flex w-full items-center gap-x-4 text-5xl font-bold">
                <LayoutPanelLeft size={48} /> Home
            </h1>

            <hr className=" my-12 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RenderPointChangeChart testData={testQuery.data ?? []} />
                <PointsChart />
                <AverageSubjectCard subjectData={subjectQuery.data ?? []} testData={testQuery.data ?? []} />
            </div>
        </main>
    )
}
