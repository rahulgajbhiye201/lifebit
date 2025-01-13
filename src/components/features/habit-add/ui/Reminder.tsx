"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../../../ui/input";
import React from "react";

import { YesOrNoSchema, MeasurableSchema } from "@/schema/zod";
import { UseFormReturn } from "react-hook-form";

interface ReminderProps {
  form: UseFormReturn<YesOrNoSchema | MeasurableSchema>;
}

const Reminder: React.FC<ReminderProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="reminder"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Reminder</FormLabel>
          <FormControl>
            <Input
              className="w-max [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-foreground"
              type="time"
              onChange={(event) => {
                field.onChange(event.target.value); // Update the field value on change
              }}
              value={field.value}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Reminder;
