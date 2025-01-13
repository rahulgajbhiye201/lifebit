import { initDB } from "@/lib/indexedDB";

// Save a Setting
export const setSetting = async (key: string, value: any) => {
  const db = await initDB();
  await db.put("settingsStore", { key, value });
};

// Get Settings
export const getAllSettings = async (): Promise<Record<string, any>> => {
  const db = await initDB();
  const tx = db.transaction("settingsStore", "readonly");
  const store = tx.objectStore("settingsStore");
  const allSettings: Record<string, any> = {};
  let cursor = await store.openCursor();

  while (cursor) {
    allSettings[cursor.key] = cursor.value.value; // Extract key-value pairs
    cursor = await cursor.continue();
  }

  return allSettings;
};