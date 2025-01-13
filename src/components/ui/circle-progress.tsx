import * as React from "react";
import { IHabitData } from "@/schema";

interface CircularProgressProps {
  habitData: IHabitData;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ habitData }) => {
  const { timeline } = habitData;

  let value = 0;
  timeline?.map((item) => item.isDone === true && value++);

  const size = 16;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center text-muted-foreground"
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute left-0 top-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle */}
        <circle
          stroke={"#171717"} // Background color
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        {/* Progress Circle */}
        <circle
          stroke={habitData.color} // Progress color
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
    </div>
  );
};

export { CircularProgress };
