import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Check, GripVertical } from "lucide-react";

import {
  getAllData,
  updateData,
  updateTimeline,
} from "@/components/features/habits/db/habits";
import { getLastSevenDates, formatDates } from "@/lib/utils";
import { IHabitData } from "@/schema";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { CircularProgress } from "@/components/ui/circle-progress";
import AddNote from "./AddNote";

export interface TimelineProps {
  id: number;
  date: {
    dayOfWeek: string;
    dayOfMonth: number;
    month: number;
    year: number;
  };
  note: string;
  isDone: boolean;
}

interface HandleClickProps extends TimelineProps {
  event: React.MouseEvent;
}

interface Props {}

const List: React.FC<Props> = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [habitData, setHabitData] = useState<IHabitData[]>([]);
  const [selectedItem, setSelectedItem] = useState<TimelineProps>({
    id: 0,
    date: {
      dayOfWeek: "",
      dayOfMonth: 0,
      month: 0,
      year: 0,
    },
    note: "",
    isDone: false,
  }); // State to track the clicked item

  // Data Fetching
  const fetchData = async () => {
    const data = await getAllData();
    setHabitData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get the last week’s dates and format them
  const dateColumns = formatDates(getLastSevenDates());

  const handleEdit = async ({ id, date, note, isDone }: TimelineProps) => {
    const formattedDate = `${date.dayOfMonth}-${date.month}-${date.year}`;

    // Step 1: Handle the same logic to avoid refetching from DB
    setHabitData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              timeLine: [
                ...(item.timeline?.filter(
                  (entry) => entry.date !== formattedDate,
                ) || []),
                ...(isDone ? [{ date: formattedDate, note, isDone }] : []),
              ],
            }
          : item,
      ),
    );

    // Step 2: Save the updated data in DB
    await updateTimeline(id, {
      date: formattedDate,
      note,
      isDone,
    });

    // Optional: Background validation
    fetchData();
  };

  // Handle left and right click
  const handleClick = ({ event, id, date, note, isDone }: HandleClickProps) => {
    if (event.button === 0) {
      // Left click
      setDialogOpen(true);
      setSelectedItem({ id, date, note, isDone });
    } else if (event.button === 2) {
      // Right click
      handleEdit({
        id,
        date,
        note,
        isDone: !isDone, // Toggle the value of isDone
      });
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return; // Drop outside the list

    const items = Array.from(habitData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Reassign order based on the new positions
    items.forEach((item, index) => {
      item.order = index;
    });

    setHabitData(items); // Update state with reordered items

    await Promise.all(
      items.map((item) => updateData(item)), // Save each updated item
    );
  };

  return (
    <>
      <AddNote
        selectedItem={selectedItem}
        handleEdit={handleEdit}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="table">
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <TableHeader>
                <TableRow className="hover:bg-inherit">
                  {/* Empty Header to fill the layout */}
                  <TableHead></TableHead>
                  <TableHead></TableHead>

                  {/* Dates */}
                  {dateColumns.map((date) => (
                    <TableHead key={date.dayOfMonth} className="text-center">
                      <h1>{date.dayOfWeek}</h1>
                      <span>{date.dayOfMonth}</span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {habitData.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <>
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            display: snapshot.isDragging ? "table" : undefined, // Ensure table display when dragging
                          }}
                        >
                          {/* Drag Icon */}
                          <TableCell
                            {...provided.dragHandleProps}
                            className="w-5 p-0 text-left text-muted-foreground"
                          >
                            <GripVertical size={20} />
                          </TableCell>

                          {/* Name */}
                          <TableCell
                            style={{ color: item.color }}
                            className="w-1/2"
                          >
                            <div className="flex flex-row items-center gap-4">
                              <CircularProgress habitData={item} />
                              <Link
                                to={`/${item.id}`}
                                className="flex flex-col"
                              >
                                <span className="text-base">{item.name}</span>
                                <span className="text-xs">{item.question}</span>
                              </Link>
                            </div>
                          </TableCell>

                          {/* Check & Cross */}
                          {dateColumns.map((date) => {
                            const formattedDate = `${date.dayOfMonth}-${date.month}-${date.year}`;
                            const selectedItem = item.timeline?.find(
                              (entry) => entry.date === formattedDate,
                            );

                            return (
                              <TableCell
                                key={formattedDate}
                                className="place-items-center"
                              >
                                <div
                                  className="relative cursor-pointer p-2"
                                  onContextMenu={(e) => e.preventDefault()}
                                  onMouseDown={(e) =>
                                    handleClick({
                                      event: e,
                                      id: item.id,
                                      date,
                                      note: selectedItem?.note || "",
                                      isDone: selectedItem?.isDone || false,
                                    })
                                  }
                                >
                                  {selectedItem?.note && (
                                    <span
                                      className="absolute right-1 top-1 size-1 rounded-full"
                                      style={{ backgroundColor: item.color }}
                                    ></span>
                                  )}

                                  {selectedItem &&
                                  selectedItem.isDone === true ? (
                                    <Check
                                      className="size-4 align-middle text-muted-foreground"
                                      color={item.color}
                                    />
                                  ) : (
                                    <X
                                      className="size-4 align-middle text-muted-foreground"
                                      color={item.color}
                                    />
                                  )}
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>

      {/* Data not exist */}
      {habitData.length === 0 && (
        <div className="w-full text-center">No Habits Data.</div>
      )}
    </>
  );
};

export default List;
