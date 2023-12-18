import AddTestButton from "../components/analytics/addTest";
import RenderLineChart from "../components/analytics/renderLineChart";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="flex flex-row">
        <div>
          <h1 className="text-4xl font-bold">English Results</h1>
          <RenderLineChart />
          <AddTestButton />
        </div>
      </div>
    </main>
  );
}
