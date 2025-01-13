"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

import { HabitData } from "@/lib/indexedDB";

interface HistoryProps {
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

const History: React.FC<HistoryProps> = ({ habitData }) => {
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

  return (
    <Card style={{ color: habitData.color }} className="rounded-none">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">History</CardTitle>
        </div>
        <div className="w-36">
          <Select>
            <SelectTrigger value="week">Week</SelectTrigger>
            <SelectContent className="dark text-foreground">
              <SelectGroup defaultValue="week">
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
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="habit" fill="var(--color-habit)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default History;
