"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { LayoutPanelLeft } from "lucide-react"
import { api } from "~/utils/api"
import RenderTestsChart from "../components/analytics/chart/homeChart"
import AverageSubjectCard from "../components/dashboard/subjectAverages"
import RenderPointChangeChart from "../components/analytics/chart/pointsChart"
import AddSubject from "../components/sidebar/addSubject"

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
        const hasSubjects = (subjectQuery.data?.length ?? 0 > 0)
        const hasTests = (testQuery.data?.length ?? 0 > 0)

        return (
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Useful Charts</CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        hasSubjects ? (
                            <>
                                {
                                    hasTests ? (
                                        <Tabs defaultValue="tests" >
                                            <TabsList>
                                                <TabsTrigger value="tests">All Tests</TabsTrigger>
                                                <TabsTrigger value="points">Points Over Time</TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="tests" className="p-2">
                                                <p className="pb-2 pl-4 italic text-slate-800">
                                                    A chart of all of the tests you have added across all subjects.
                                                </p>
                                                <RenderTestsChart
                                                    testData={testQuery.data ?? []}
                                                    subjectData={subjectQuery.data ?? []}
                                                />
                                            </TabsContent>
                                            <TabsContent value="points" className="p-2">
                                                <p className="pb-2 pl-4 italic text-slate-800">
                                                    Based on the average grade for each subject at the time the respective test was added.
                                                </p>
                                                <RenderPointChangeChart
                                                    testData={testQuery.data ?? []}
                                                    subjectData={subjectQuery.data ?? []}
                                                    collegePoints={userQuery.data?.collegeCoursePoints ?? 0}
                                                />
                                            </TabsContent>
                                        </Tabs>
                                    ) : (
                                        <div className="flex h-[350px] flex-col items-center justify-center">
                                            <span className="text-2xl font-semibold">No Tests Created Yet!</span>
                                            <span className="mb-4 text-xl">Add one to get started.</span>
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            <div className="flex h-[350px] w-[800px] flex-col items-center justify-center">
                                <span className="text-2xl font-semibold">No Subjects Created Yet!</span>
                                <span className="mb-4 text-xl">Add one to get started.</span>

                                <div className="flex flex-row w-40 items-center justify-center">
                                    <AddSubject />
                                </div>
                            </div>
                        )
                    }
                </CardContent>
            </Card >

        )
    }

    return (
        <main className="flex w-full flex-col items-center bg-white text-black">
            <h1 className="flex w-full items-center gap-x-4 text-5xl font-bold">
                <LayoutPanelLeft size={48} /> Home
            </h1>

            <span className="flex w-full pt-4 text-lg">Welcome back, {user.firstName ?? "User"}.</span>

            <hr className="mb-12 mt-8 w-full" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ChartsTabs />
                <AverageSubjectCard subjectData={subjectQuery.data ?? []} testData={testQuery.data ?? []} />
            </div>
        </main>
    )
}
