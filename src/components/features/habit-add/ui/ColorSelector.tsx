"use client";

import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectContent,
  SelectItem,
} from "@/components/ui/color-select";

import { YesOrNoSchema, MeasurableSchema } from "@/schema/zod";
import { UseFormReturn } from "react-hook-form";

interface ColorSelectorProps {
  form: UseFormReturn<YesOrNoSchema | MeasurableSchema>;
}

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const colors = [
  { label: "Sky Blue", hex: "#87ceeb" },
  { label: "Light Sky Blue", hex: "#a3d9f7" },
  { label: "Pale Sky Blue", hex: "#c3e8ff" },
  { label: "Very Pale Sky Blue", hex: "#e0f7ff" },

  { label: "Peach", hex: "#ffdab9" },
  { label: "Light Peach", hex: "#ffe5b4" },
  { label: "Soft Peach", hex: "#ffe9c2" },
  { label: "Very Light Peach", hex: "#fff2d9" },

  { label: "Mint Green", hex: "#98ff98" },
  { label: "Light Mint Green", hex: "#b4ffb4" },
  { label: "Pale Mint Green", hex: "#d4ffd4" },
  { label: "Very Light Mint Green", hex: "#e8ffe8" },

  { label: "Light Lavender", hex: "#d8b6e2" },
  { label: "Soft Lavender", hex: "#f2d0e2" },
  { label: "Very Soft Lavender", hex: "#f8e3f0" },
  { label: "Lavender", hex: "#e6e6fa" },

  { label: "Coral", hex: "#ff7f50" },
  { label: "Light Coral", hex: "#ff9b8b" },
  { label: "Pale Coral", hex: "#ffbfbf" },
  { label: "Very Pale Coral", hex: "#ffe0e0" },
];

const ColorSelector: React.FC<ColorSelectorProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="color"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Color</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value); // Update the field value on change
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger style={{ backgroundColor: field.value }} />
            </FormControl>
            <SelectContent className="dark p-2 text-foreground">
              <SelectGroup className="grid grid-cols-4 gap-2">
                {colors.map((item) => (
                  <SelectItem
                    key={item.hex}
                    value={item.hex}
                    style={{ backgroundColor: item.hex }}
                    className="size-10 rounded-full"
                  />
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default ColorSelector;
