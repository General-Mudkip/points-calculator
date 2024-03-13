"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { LayoutPanelLeft } from "lucide-react"
import { api } from "~/utils/api"
import RenderTestsChart from "../components/analytics/chart/homeChart"
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

    const userQuery = api.user.getById.useQuery({
        userId: user.id
    })

    if (!testQuery.isFetched || !subjectQuery.isFetched || !userQuery.isFetched) {
        return <div></div>
    }

    const ChartsTabs = () => {
        return (
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Useful Charts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="tests">
                        <TabsList>
                            <TabsTrigger value="tests">All Tests</TabsTrigger>
                            <TabsTrigger value="points">Points Over Time</TabsTrigger>
                        </TabsList>

                        <TabsContent value="tests" className="p-2">
                            <p className="text-slate-800 italic pb-2 pl-4">
                                A chart of all of the tests you have added across all subjects.
                            </p>
                            <RenderTestsChart
                                testData={testQuery.data ?? []}
                                subjectData={subjectQuery.data ?? []}
                            />
                        </TabsContent>
                        <TabsContent value="points" className="p-2">
                            <p className="text-slate-800 italic pb-2 pl-4">
                                Based on the average grade for each subject at the time the respective test was added.
                            </p>
                            <RenderPointChangeChart
                                testData={testQuery.data ?? []}
                                subjectData={subjectQuery.data ?? []}
                                collegePoints={userQuery.data?.collegeCoursePoints ?? 0}
                            />
                        </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>

        )
    }

    return (
        <main className="flex w-full flex-col items-center bg-white text-black">
            <h1 className="flex w-full items-center gap-x-4 text-5xl font-bold">
                <LayoutPanelLeft size={48} /> Home
            </h1>

            <hr className=" my-12 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChartsTabs />
                <AverageSubjectCard subjectData={subjectQuery.data ?? []} testData={testQuery.data ?? []} />
            </div>
        </main>
    )
}
