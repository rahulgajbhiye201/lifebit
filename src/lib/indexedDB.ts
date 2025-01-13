import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "LifeBit";
const DB_VERSION = 1;

// Database setup function
export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create "myStore" if it doesn't exist
      if (!db.objectStoreNames.contains("myStore")) {
        const store = db.createObjectStore("myStore", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("order", "order", { unique: false });
      }

      // Create "settingsStore" if it doesn't exist
      if (!db.objectStoreNames.contains("settingsStore")) {
        db.createObjectStore("settingsStore", {
          keyPath: "key", // Use 'key' as the unique identifier
        });
      }
    },
  });
};
