import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//clsx - used to conditionally apply className
//twMerge - utility function to merge Tailwind CSS classes in JS without style conflicts

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
