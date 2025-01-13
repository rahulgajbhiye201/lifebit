import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addData, HabitData } from "@/components/features/habits/db/habits";
import { measurableSchema } from "@/schema/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Custom Components
import ColorSelector from "./ui/ColorSelector";
import Frequency from "./ui/Frequency";
import Reminder from "./ui/Reminder";

import { useAppDispatch } from "@/lib/store";
import { editHabitData } from "@/components/features/habits/habitsSlice";

interface MeasurableProps {
  habitData?: HabitData;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Measurable: React.FC<MeasurableProps> = ({
  setDialogOpen,
  habitData,
}) => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof measurableSchema>>({
    resolver: zodResolver(measurableSchema),

    // Default values: if adding then empty string else editing then the previous data.
    defaultValues: habitData
      ? { ...habitData }
      : { type: "measurable", name: "", color: "#87ceeb" },
  });

  // Type "measurable"
  const onSubmit = async (values: z.infer<typeof measurableSchema>) => {
    habitData
      ? await dispatch(
          editHabitData({ ...values, type: "measurable", id: habitData.id }),
        )
      : await addData({ ...values, type: "measurable" });

    setDialogOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="dark flex flex-col gap-2 text-foreground"
      >
        {/* Name & Color */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="space-y-1">
              <div className="flex flex-row items-center gap-2">
                <div className="w-full">
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Running, Reading" {...field} />
                    </FormControl>
                  </FormItem>
                </div>
                <div className="w-10">
                  <ColorSelector form={form} />
                </div>
              </div>
              <FormMessage />
            </div>
          )}
        />

        {/* Question */}
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. How many miles did you run today? How many pages did you read today?"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Unit */}
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="e.g. miles, kilometer" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Target & Frequency*/}
        <div className="flex flex-row items-center gap-2 space-y-1">
          <div className="w-full">
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Target</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 15, 20" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            {/* Frequency */}
            <Frequency form={form} />
          </div>
        </div>

        {/* Target Type */}
        <FormField
          control={form.control}
          name="targetType"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Target Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Did you exercise today?" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Reminder */}
        <Reminder form={form} />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="(Optional)" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 w-fit place-self-end">
          Save Habit
        </Button>
      </form>
    </Form>
  );
};

export default Measurable;
