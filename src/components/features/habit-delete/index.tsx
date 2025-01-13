import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteData } from "@/components/features/habits/db/habits";
import { IHabitData } from "@/schema";
import { useNavigate } from "react-router-dom";

import ToolbarButton from "@/components/ui/ToolbarButton";

interface DeleteItemProps {
  habitData: IHabitData;
}

const DialogContentComponent: React.FC<{
  habitData: IHabitData;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ habitData, setDialogOpen }) => {
  const navigate = useNavigate();
  console.log("hello delete dialog");
  return (
    <Button
      onClick={async () => {
        await deleteData(habitData.id || 0);
        console.log("Deleted");
        setDialogOpen(false); // Close the modal after deletion
        navigate("/");
      }}
    >
      Yes
    </Button>
  );
};

const HabitDelete: React.FC<DeleteItemProps> = ({ habitData }) => {
  return (
    <ToolbarButton
      dialogTrigger={<Trash />}
      dialogContent={({ setDialogOpen }) => (
        <DialogContentComponent
          habitData={habitData}
          setDialogOpen={setDialogOpen}
        />
      )}
      dialogTitle="Delete Habit"
      dialogDescription="Action is not reversible."
      dialogHeaderHidden={false} // Set to `false` to show the header
    />
  );
};

export default HabitDelete;
