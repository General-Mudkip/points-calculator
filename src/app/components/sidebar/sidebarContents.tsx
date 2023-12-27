"use client";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { api } from "../../../utils/api";
import Link from "next/link";
import { LayoutPanelLeft } from "lucide-react";
import AddSubject from "./addSubject";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

const SidebarContents = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const subjectQuery = api.subject.getAllSubjects.useQuery({
    userId: user?.id,
  });

  const bottomMenu = [
    {
      href: "",
      name: "Help",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
        >
          <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
        </svg>
      ),
    },
    {
      href: "",
      name: "Contact",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
        >
          <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-1 flex-col overflow-auto pl-3 lg:px-8">
        <Link
          href="/dashboard"
          className="mb-2 flex w-full items-center gap-x-4 rounded-lg p-2 text-gray-800 duration-150 hover:bg-gray-100 active:bg-gray-200"
        >
          <LayoutPanelLeft className="text-gray-500" />
          Home
        </Link>
        <h2 className="text-xl font-semibold">Subjects</h2>
        <ul className="flex-1 text-lg font-medium">
          {subjectQuery.isFetched ? (
            subjectQuery.data?.map((subject, idx) => {
              return (
                <li key={idx}>
                  <Link
                    href={`/dashboard/${subject.id}`}
                    className="flex w-full items-center gap-x-4 rounded-lg p-2 text-gray-600 duration-150 hover:bg-gray-100 active:bg-gray-200"
                  >
                    <div className="text-gray-500"></div>
                    {subject.name}
                  </Link>
                </li>
              );
            })
          ) : (
            <div className="flex-1">
              <Skeleton className="my-4 h-[36px] w-full gap-x-4 rounded-lg p-2" />
              <Skeleton className="my-4 h-[36px] w-full gap-x-4 rounded-lg p-2" />
              <Skeleton className="my-4 h-[36px] w-full gap-x-4 rounded-lg p-2" />
              <Skeleton className="my-4 h-[36px] w-full gap-x-4 rounded-lg p-2" />
            </div>
          )}
          <hr className="my-1" />
          <li>
            <AddSubject />
          </li>
        </ul>

        <div>
          <ul className="text-lg font-medium">
            {bottomMenu.map((subject, idx) => (
              <li key={idx}>
                <Link
                  href={`/dashboard/${subject.name.toLowerCase()}`}
                  className="flex items-center gap-x-2 rounded-lg p-2 text-gray-600 duration-150 hover:bg-gray-100 active:bg-gray-200"
                >
                  <div className="text-gray-500">{subject.icon}</div>
                  {subject.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="justify-left my-4 flex h-[90px] w-[319px] flex-col gap-2 border-t-2 border-t-gray-300 px-8 pt-4">
        <UserButton afterSignOutUrl="/" showName={true} />

        <span className="text-left">
          <SignOutButton />
        </span>
      </div>
    </div>
  );
};

export default SidebarContents;
