import { Pencil } from "lucide-react";

import YesOrNo from "@/components/features/habit-add/YesOrNo";
import Measurable from "@/components/features/habit-add/Measurable";
import ToolbarButton from "@/components/ui/ToolbarButton";

import { IHabitData } from "@/schema";

interface EditItemProps {
  habitData: IHabitData;
}

const DialogContentComponent: React.FC<{
  habitData: IHabitData;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ habitData, setDialogOpen }) => {
  return habitData.type === "yesOrNo" ? (
    <YesOrNo habitData={habitData} setDialogOpen={setDialogOpen} />
  ) : (
    <Measurable habitData={habitData} setDialogOpen={setDialogOpen} />
  );
};

const HabitEdit: React.FC<EditItemProps> = ({ habitData }) => {
  return (
    <ToolbarButton
      dialogTrigger={<Pencil />}
      dialogContent={({ setDialogOpen }) => (
        <DialogContentComponent
          habitData={habitData}
          setDialogOpen={setDialogOpen}
        />
      )}
      dialogTitle="Edit Habit"
      dialogDescription="Makes changes to habit."
      dialogHeaderHidden={false}
    />
  );
};

export default HabitEdit;
