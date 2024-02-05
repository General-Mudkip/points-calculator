/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return twMerge(clsx(inputs))
}
