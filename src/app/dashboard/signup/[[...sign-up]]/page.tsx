"use client"
import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
    const { isSignedIn } = useUser()
    const router = useRouter()

    if (isSignedIn) {
        router.push("/dashboard")
    } else {
        return <SignUp redirectUrl="/dashboard" />;
    }
}
