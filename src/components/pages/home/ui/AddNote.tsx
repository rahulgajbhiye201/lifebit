import React, { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TimelineProps } from "./List";

interface AddNoteProps {
  selectedItem: TimelineProps;
  handleEdit: ({ id, date, note, isDone }: TimelineProps) => void;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNote: React.FC<AddNoteProps> = ({
  selectedItem,
  handleEdit,
  dialogOpen,
  setDialogOpen,
}) => {
  const [notes, setNotes] = useState<string>(selectedItem.note);

  useEffect(() => {
    setNotes(selectedItem.note);
  }, [selectedItem]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-1/3 dark text-foreground">
        <DialogHeader className="hidden">
          <DialogTitle>Add Notes</DialogTitle>
          <DialogDescription>Note to remember</DialogDescription>
        </DialogHeader>

        <Textarea
          className="w-full border-none focus-visible:ring-0"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <DialogFooter className="gap-0">
          <Button
            variant="link"
            className="w-full rounded-none border"
            onClick={() => {
              handleEdit({
                id: selectedItem.id,
                date: selectedItem.date,
                note: notes,
                isDone: true,
              });
              setDialogOpen(false);
            }}
          >
            <Check size={16} className="text-green-300 text-muted-foreground" />
          </Button>
          <Button
            variant="link"
            className="w-full rounded-none border"
            onClick={() => {
              handleEdit({
                id: selectedItem.id,
                date: selectedItem.date,
                note: notes,
                isDone: false,
              });
              setDialogOpen(false);
            }}
          >
            <X size={16} className="text-muted-foreground text-red-300" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;
