"use client";

import { z } from "zod";

const yesOrNoSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
  question: z.string().optional(),
  frequency: z.string().optional(),
  reminder: z.string().optional(),
  notes: z.string().optional(),
  type: z.string().optional(),
});

const measurableSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
  question: z.string().optional(),
  unit: z.string().optional(),
  target: z.string().optional(),
  targetType: z.string().optional(),
  frequency: z.string().optional(),
  reminder: z.string().optional(),
  notes: z.string().optional(),
});

const settingsSchema = z.object({
  subheading: z.boolean(),
});

export type YesOrNoSchema = z.infer<typeof yesOrNoSchema>;
export type MeasurableSchema = z.infer<typeof measurableSchema>;
export type settingsSchema = z.infer<typeof settingsSchema>;

export { yesOrNoSchema, measurableSchema, settingsSchema };
