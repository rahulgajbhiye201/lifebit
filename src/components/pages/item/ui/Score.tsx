"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { HabitData } from "@/lib/indexedDB";

interface ScoreProps {
  habitData: HabitData | undefined;
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  SelectGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

const Score: React.FC<ScoreProps> = ({ habitData }) => {
  // If habitData is still loading, return a loading spinner or placeholder
  if (!habitData) {
    return <div>Loading...</div>;
  }

  const chartConfig = {
    habit: {
      label: habitData.name,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Function to convert the date string to a month name
  const getMonthName = (dateString: string) => {
    const date = new Date(dateString.split("-").reverse().join("-")); // Convert DD-MM-YY to YYYY-MM-DD
    const monthName = date.toLocaleString("default", { month: "long" });
    return monthName;
  };

  // Create a mapping for the months
  const monthData = {};

  // Loop through the timeline to count entries for each month
  habitData.timeLine?.forEach(({ date }) => {
    const month = getMonthName(date);
    if (monthData[month]) {
      monthData[month] += 1;
    } else {
      monthData[month] = 1;
    }
  });

  // Transform the monthData into the chartData format
  const chartData = Object.entries(monthData).map(([month, habit]) => ({
    month,
    habit,
  }));

  console.log(chartData);

  return (
    <Card style={{ color: habitData.color }} className="rounded-none">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle className="text-2xl">Score</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <div className="w-36">
          <Select>
            <SelectTrigger value="day">Day</SelectTrigger>
            <SelectContent className="dark text-foreground">
              <SelectGroup defaultValue="day">
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickSize={31} type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="habit"
              type="linear"
              stroke="var(--color-habit)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default Score;
