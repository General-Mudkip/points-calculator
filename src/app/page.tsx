import Sidebar from "./components/sidebar/sidebar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="flex flex-row">
        <Sidebar />
        Hello!
      </div>
    </main>
  );
}
