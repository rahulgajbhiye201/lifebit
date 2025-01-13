"use client";
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { HabitData } from "@/lib/indexedDB";

interface ToolbarButtonProps {
  dialogTitle: string;
  dialogDescription: string;
  dialogTrigger: React.ReactElement;
  dialogHeaderHidden: boolean;
  dialogContent: ({
    habitData,
    setDialogOpen,
  }: {
    habitData?: HabitData;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
  dialogFooter?: React.ReactElement;
  habitData?: HabitData;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = React.memo(
  ({
    dialogContent,
    dialogTitle,
    dialogDescription,
    dialogHeaderHidden,
    dialogFooter,
    dialogTrigger,
    habitData,
  }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    // Memoize dialogContent rendering logic
    const memoizedDialogContent = useMemo(
      () => dialogContent({ habitData, setDialogOpen }),
      [dialogContent, habitData, setDialogOpen],
    );

    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">{dialogTrigger}</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-1/3 dark text-foreground">
          <DialogHeader className={dialogHeaderHidden ? "hidden" : ""}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>

          {memoizedDialogContent}

          {dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  },
);

export default ToolbarButton;
