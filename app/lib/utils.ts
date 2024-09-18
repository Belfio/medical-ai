import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { categories } from "./const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomId() {
  return uuidv4();
}

export function getCategoryName(categoryId: number | string) {
  return categories.find((c) => String(c.categoryId) === String(categoryId))
    ?.categoryName;
}

export function getCategoryId(categoryName: string) {
  return categories.find((c) => c.categoryName === categoryName)?.categoryId;
}
