"use client"
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
    const { isSignedIn } = useUser()
    const router = useRouter()

    if (isSignedIn) {
        router.push("/dashboard")
    } else {
        return <SignIn redirectUrl="/dashboard" />;
    }
}
