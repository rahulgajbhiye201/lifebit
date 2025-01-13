"use client";

import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { YesOrNoSchema, MeasurableSchema } from "@/schema/zod";
import { UseFormReturn } from "react-hook-form";

interface FrequencyProps {
  form: UseFormReturn<YesOrNoSchema | MeasurableSchema>;
}

const Frequency: React.FC<FrequencyProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="frequency"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Frequency</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value); // Update the field value on change
              }}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a frequency" />
              </SelectTrigger>
              <SelectContent className="dark text-foreground">
                <SelectGroup defaultValue="daily">
                  <SelectItem value="daily">Daily</SelectItem>
                  {/* <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Frequency;
