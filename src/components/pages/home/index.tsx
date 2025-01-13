import List from "./ui/List";
import AddItem from "../../features/habit-add";
import Sort from "../../features/habits-sort";
import AppSettings from "../../features/settings";

const Home = () => {
  return (
    <div className="flex w-11/12 flex-col items-center justify-between gap-4 py-4 sm:w-1/2">
      {/* Toolbar */}
      <div className="flex w-full flex-row items-center justify-end bg-muted px-4 py-1">
        <AddItem />
        <Sort />
        <AppSettings />
      </div>

      <List />
    </div>
  );
};

export default Home;
