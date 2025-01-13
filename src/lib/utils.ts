import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToAmPm(time24: string | undefined): string {
  // Return an empty string for empty input
  if (!time24) {
    return "";
  }
  // Validate input format
  if (!/^\d{2}:\d{2}$/.test(time24)) {
    throw new Error("Invalid time format. Expected HH:MM in 24-hour format.");
  }

  // Split the input into hours and minutes
  const [hoursStr, minutesStr] = time24.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Validate hour and minute values
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(
      "Invalid time values. Hours must be 0-23 and minutes 0-59.",
    );
  }

  // Determine the period (AM/PM)
  const period = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  const adjustedHours = hours % 12 || 12; // Convert 0 or 12 to 12 for AM/PM

  // Format and return the result
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// Utility function to get an array of Date objects from today to 7 days ago
export const getLastSevenDates = (): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};

// Function to format dates as "Day - DD"
export const formatDates = (dates: Date[]) => {
  return dates.map((date) => {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., Mon
    const dayOfMonth = date.getDate(); // e.g., 18
    const month = date.getMonth();
    const year = date.getFullYear();
    return { dayOfWeek, dayOfMonth, month, year };
  });
};
