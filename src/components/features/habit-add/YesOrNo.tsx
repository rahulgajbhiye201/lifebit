import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addData } from "@/components/features/habits/db/habits";
import { yesOrNoSchema } from "@/schema/zod";
import { IHabitData } from "@/schema";

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

interface YesOrNoProps {
  habitData?: IHabitData;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const YesOrNo: React.FC<YesOrNoProps> = ({ setDialogOpen, habitData }) => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof yesOrNoSchema>>({
    resolver: zodResolver(yesOrNoSchema),

    // Default values: if adding then empty string else editing then the previous data.
    defaultValues: habitData
      ? { ...habitData }
      : {
          type: "yesOrNo",
          name: "",
          color: "#87ceeb",
          reminder: "",
          frequency: "daily",
          notes: "",
          question: "",
        },
  });

  // Default type "yesOrNo"
  const onSubmit = async (values: z.infer<typeof yesOrNoSchema>) => {
    habitData
      ? await dispatch(
          editHabitData({
            ...values,
            type: "yesOrNo",
            id: habitData.id,
            order: 0,
          }),
        )
      : await addData({ ...values, type: "yesOrNo" });

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
            <div>
              <div className="flex flex-row items-center gap-2">
                <div className="w-full">
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Early Bird, Exercise"
                        {...field}
                      />
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
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Did you wake up early today? Did you exercise today?"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Frequency & Reminder */}
        <div className="flex flex-row gap-4">
          <Frequency form={form} />
          <Reminder form={form} />
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
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

export default YesOrNo;
