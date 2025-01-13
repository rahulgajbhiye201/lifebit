import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToolbarButton from "@/components/ui/ToolbarButton";
import { Settings } from "lucide-react";

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

const DialogContentComponent: React.FC = () => {
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
                </div>
                <FormMessage />
              </div>
            )}
          />
          <Button type="submit" className="mt-4 w-fit place-self-end">
            Save Habit
          </Button>
        </form>
      </Form>
  );
};
const AppSettings = () => {
  return (
    <ToolbarButton
      dialogTrigger={<Settings />}
      dialogContent={DialogContentComponent}
      dialogDescription="Add a Habit"
      dialogTitle="Add a Habit"
      dialogHeaderHidden={true}
    />
  );
};

export default AppSettings;
