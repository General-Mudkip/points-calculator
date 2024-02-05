"use client";
import { api } from "~/utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "~/app/components/analytics/table/table";
import { columns } from "~/app/components/analytics/table/columns";
import AddTest from "~/app/components/analytics/addTest";
import RenderLineChart from "~/app/components/analytics/chart/subjectChart";
import EditSubject from "~/app/components/analytics/editSubject";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import StatisticsCard from "~/app/components/analytics/statisticsCard";

export default function SubjectPage({ params }: { params: { id: string } }) {
    const subjectQuery = api.subject.getSubjectById.useQuery({
        subjectId: parseInt(params.id),
    });

    const testQuery = api.test.getAllTestsBySubject.useQuery({
        subjectId: parseInt(params.id),
    });

    return (
        <div className="flex flex-col items-center gap-y-12">
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

            <hr className="w-full" />

            <div className="flex w-full flex-col items-center justify-center gap-y-4 xl:grid xl:grid-cols-2 xl:gap-4">
                <Card className="h-full w-full">
                    <CardHeader>
                        <CardTitle>Progress</CardTitle>
                        <CardDescription>
                            Track your progress over time.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <RenderLineChart
                            testData={testQuery.data ?? []}
                            //@ts-expect-error Don't worry... about a thing
                            subjectData={subjectQuery.data ?? []}
                        />
                    </CardContent>
                </Card>

                <Card className="w-[90vw] sm:w-auto">
                    <CardHeader>
                        <CardTitle>Your Tests</CardTitle>
                        <CardDescription>
                            Create, edit, and delete tests.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {subjectQuery.data?.name === undefined ? (
                            <Skeleton className="h-80 w-[570px]" />
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
                                                achievedMarks:
                                                    item.achievedMarks,
                                                maxMarks: item.maxMarks,
                                                percentage: item.percentage,
                                            };
                                        }) ?? []
                                    }
                                />
                            </>
                        )}
                        <AddTest subjectId={parseInt(params.id)} />
                    </CardContent>
                </Card>

                <StatisticsCard
                    //@ts-expect-error Don't worry... about a thing
                    subjectData={subjectQuery.data ?? []}
                    testData={testQuery.data ?? []}
                />
            </div>
        </div>
    );
}
