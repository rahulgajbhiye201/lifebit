import { Plus } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import YesOrNo from "@/components/features/habit-add/YesOrNo";
// import Measurable from "@/components/features/habit-add/Measurable";
import ToolbarButton from "@/components/ui/ToolbarButton";

const DialogContentComponent: React.FC<{
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setDialogOpen }) => (
  // <Tabs defaultValue="yesOrNo" className="w-full p-2">
  //   <TabsList className="grid w-full grid-cols-2">
  //     <TabsTrigger value="yesOrNo">Yes Or No</TabsTrigger>
  //     <TabsTrigger value="measurable">Measurable</TabsTrigger>
  //   </TabsList>

  //   <TabsContent value="yesOrNo" className="p-2">
  <div className="w-full p-2">
    <YesOrNo setDialogOpen={setDialogOpen} />
  </div>
  //   </TabsContent>
  //   <TabsContent value="measurable" className="p-2">
  //     <Measurable setDialogOpen={setDialogOpen} />
  //   </TabsContent>
  // </Tabs>
);

const HabitAdd = () => {
  return (
    <ToolbarButton
      dialogTrigger={<Plus />}
      dialogContent={DialogContentComponent}
      dialogTitle="Add a Habit"
      dialogDescription="Add a Habit"
      dialogHeaderHidden={true}
    />
  );
};

export default HabitAdd;
