"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarContents from "./sidebarContents";
import { Menu } from "lucide-react";

const Sidebar = () => {
  return (
    <div>
      <nav className="fixed left-0 top-0 hidden h-screen w-full space-y-4 border-r bg-white bg-scroll sm:w-80 lg:flex lg:flex-col">
        <div className="mb-8 mt-6 flex h-20 w-full items-center px-8">
          <h1 className="text-4xl">
            BetterExams <span className="text-5xl font-bold">Points</span>
          </h1>
        </div>

        <SidebarContents />
      </nav>

      <Sheet>
        <SheetTrigger className="fixed z-50 flex w-screen border-b-2 border-b-gray-400 bg-white p-4 lg:hidden">
          <Menu size={32} />{" "}
          <h1 className="text-2xl">
            BetterExams <span className="text-3xl font-bold">Points</span>
          </h1>
        </SheetTrigger>
        <SheetContent side="left" className="w-4/5">
          <SheetHeader>
            <SheetTitle>
              <div className="flex h-20 w-full flex-row">
                <h1 className="text-3xl">
                  BetterExams <span className="text-4xl font-bold">Points</span>
                </h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          <SidebarContents />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
