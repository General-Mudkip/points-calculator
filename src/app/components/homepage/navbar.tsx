export const Navbar = () => {
    return (
        <div className="absolute top-0 flex w-full flex-row border-b-2 border-b-black bg-slate-200 px-4 align-middle">
            <h1 className="py-6 pr-6 font-sans text-5xl">
                BetterExams <span className="font-bold">Points</span>
            </h1>
            <span className="h-full w-[2px] bg-black py-12" />
            <a className="h-full justify-center px-8 text-center align-middle text-2xl hover:bg-slate-300">
                Features
            </a>
            <span className="h-full w-[2px] bg-black py-12" />
        </div>
    )
}
