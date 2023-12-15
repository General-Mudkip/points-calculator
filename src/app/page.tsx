import RenderLineChart from "./components/renderLineChart";
import Sidebar from "./components/sidebar/sidebar";

const data = [
  {
    name: "Page A",
    uv: 88,
  },
  {
    name: "Page B",
    uv: 100,
  },
  {
    name: "Page C",
    uv: 78,
  },
  {
    name: "Page D",
    uv: 95,
  },
  {
    name: "Page E",
    uv: 90,
  },
  {
    name: "Page F",
    uv: 66,
  },
  {
    name: "Page G",
    uv: 87,
  },
];

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="flex flex-row">
        <Sidebar />
        <div>
          <h1 className="text-4xl font-bold">English Results</h1>
          <RenderLineChart />
        </div>
      </div>
    </main>
  );
}
