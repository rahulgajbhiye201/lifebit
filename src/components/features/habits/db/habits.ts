import { initDB } from "../../../../lib/indexedDB";
import { IHabitData } from "@/schema";

export interface HabitData {
  id?: number; // Optional because IndexedDB can auto-generate this key
  type: string;
  name: string;
  color: string;
  question?: string;
  unit?: string;
  target?: string;
  targetType?: string;
  frequency?: string;
  reminder?: string;
  notes?: string;
  timeline?: {
    date: string;
    note: string;
    isDone: boolean;
  }[];
  order?: number;
}

// Add data to the store
export const addData = async (data: HabitData): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction("myStore", "readwrite");

    const count = await tx.store.count();
    const itemWithOrder = { ...data, order: data.order ?? count }; // Default order is item count if not provided

    await tx.store.add(itemWithOrder);
    await tx.done;

    // Notify the service worker that a new task has been added
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "NEW_TASK_ADDED",
      });
    }
  } catch (error) {
    console.error("Failed to add data:", error);
  }
};

// Get all data from the store
export const getAllData = async (): Promise<IHabitData[]> => {
  const db = await initDB();
  // Start a transaction with 'readwrite' permissions
  const tx = db.transaction("myStore", "readwrite");
  // Access the store
  const store = tx.objectStore("myStore");

  const data = await store.getAll();
  return data.sort((a, b) => (a.order || 0) - (b.order || 0)); // Sort by order
};

// Get data by id
export const getData = async (id: number): Promise<IHabitData> => {
  const db = await initDB();
  return db.get("myStore", id);
};

// Update data by id
export const updateData = async (data: IHabitData): Promise<void> => {
  try {
    // Ensure the data has an 'id' property
    if (!data.id) {
      throw new Error("Data must have an 'id' property to update.");
    }

    // Initialize the database
    const db = await initDB();

    // Start a transaction with 'readwrite' permissions
    const tx = db.transaction("myStore", "readwrite");

    // Access the store
    const store = tx.store;

    // Check if the record exists before updating
    const existingRecord = await store.get(data.id);
    if (!existingRecord) {
      throw new Error(`No record found with id: ${data.id}`);
    }

    // Merge existing data with the new data to avoid overwriting unintended fields
    const updatedData = { ...existingRecord, ...data };

    // Update the data with 'put()' which will update the object if it exists
    await store.put(updatedData);

    // Ensure the transaction is completed before proceeding
    await tx.done;

    // Notify the service worker if available
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "TASK_UPDATED",
        payload: { id: data.id }, // Optional: include metadata for the update
      });
    }

    console.log("Data updated successfully:", updatedData);
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

// Update Timeline data of habit
export const updateTimeline = async (
  id: number,
  newTimelineEntry: { date: string; note: string; isDone: boolean },
) => {
  // Open the database and start a transaction
  const db = await initDB();
  const tx = db.transaction("myStore", "readwrite");
  const store = tx.objectStore("myStore");

  try {
    // Get the record by ID within the transaction
    const data = (await store.get(id)) as HabitData | undefined;

    if (!data) {
      console.error(`Record with id ${id} not found`);
      return;
    }

    // Update the timeline array within the record
    if (!data.timeline) {
      data.timeline = [];
    }

    // Check if the date exists in the timeline array
    const existingIndex = data.timeline.findIndex(
      (entry) => entry.date === newTimelineEntry.date,
    );

    if (existingIndex === -1) {
      // If date does not exist, add the new entry
      data.timeline.push(newTimelineEntry);
    } else {
      // If date exists, update the existing entry
      data.timeline[existingIndex] = {
        ...data.timeline[existingIndex], // Keep any existing fields not being updated
        ...newTimelineEntry, // Override with new values
      };
    }
    // Save the updated record within the transaction
    await store.put(data);

    // Commit the transaction by awaiting its completion
    await tx.done;
  } catch (error) {
    console.error("Failed to update record:", error);
    tx.abort();
  } finally {
    db.close();
  }
};

// Delete data by ID
export const deleteData = async (id: number): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction("myStore", "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
