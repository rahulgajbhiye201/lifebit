import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/lib/store";
import { fetchHabitData } from "@/components/features/habits/habitsSlice";

import { convertToAmPm } from "@/lib/utils";
import { Labels } from "./data/label";

// Custom Components
import Overview from "./ui/Overview";
// import Score from "./ui/Score";
import History from "./ui/History";
import HabitDelete from "../../features/habit-delete";
import HabitEdit from "../../features/habit-edit";

const Item = () => {
  const { id } = useParams();
  const idNumber = Number(id);
  const dispatch = useAppDispatch();

  const { habitData, status, error } = useSelector(
    (state: RootState) => state.habit,
  );

  // Fetch habit data on mount
  useEffect(() => {
    if (!isNaN(idNumber)) {
      dispatch(fetchHabitData(idNumber));
    }
  }, [dispatch, idNumber]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!habitData) {
    return <div>No habit data found.</div>;
  }

  return (
    <div
      className="flex w-1/2 flex-col gap-4 pt-4"
      style={{ color: habitData.color }}
    >
      {/* Toolbar */}
      <div className="flex w-full flex-row items-center justify-between gap-4 bg-muted px-4 py-1">
        <div className="flex flex-row items-center justify-center gap-1">
          {habitData.reminder ? (
            <>
              <span className="font-bold">{habitData.name}</span>
              <span>{`at ${convertToAmPm(habitData.reminder)}`},</span>
            </>
          ) : (
            <span>
              <span className="font-bold">{habitData.name}</span>
              <span>,</span>
            </span>
          )}

          <p>{`${
            Labels.find((item) => item.value === habitData.frequency)?.label ||
            ""
          }.`}</p>
        </div>

        <div>
          <HabitEdit habitData={habitData} />
          <HabitDelete habitData={habitData} />
        </div>
      </div>

      <div className="text-center">{habitData.question}</div>
      <Overview habitData={habitData} />
      <History habitData={habitData} />
      {/* <Score habitData={habitData} /> */}
    </div>
  );
};

export default Item;
