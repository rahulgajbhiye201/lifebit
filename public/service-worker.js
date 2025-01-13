const openDatabase = async () => {
  const request = indexedDB.open("LifeBit", 1);

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("myStore")) {
        db.createObjectStore("myStore", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const getAllReminders = async (db) => {
  const tx = db.transaction("myStore", "readonly");
  const store = tx.objectStore("myStore");

  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const getNextTriggerTime = (targetTime) => {
  const [targetHour, targetMinute] = targetTime.split(":").map(Number);

  const now = new Date();
  const nextTrigger = new Date();

  nextTrigger.setHours(targetHour, targetMinute, 0, 0); // Set to today's target time

  // If the target time has already passed today, schedule for tomorrow
  if (nextTrigger <= now) {
    nextTrigger.setDate(nextTrigger.getDate() + 1);
  }

  return nextTrigger.getTime() - now.getTime(); // Milliseconds until the next trigger
};

const scheduledReminders = new Set(); // Track already scheduled reminders

const scheduleNotification = (habit) => {
  const { id, reminder, name, question } = habit;

  // Skip if reminder is empty or already scheduled
  if (!reminder || scheduledReminders.has(id)) return;

  const delay = getNextTriggerTime(reminder);

  scheduledReminders.add(id); // Mark this reminder as scheduled
  console.log(delay);
  console.log(scheduledReminders);
  setTimeout(() => {
    // Trigger the notification
    self.registration.showNotification("Reminder", {
      body: `It's time for: ${name}, ${question},`,
      icon: "/icon.png", // Replace with your icon path
    });

    // Remove from scheduled reminders after triggering
    scheduledReminders.delete(id);
  }, delay);
};

const checkReminders = async () => {
  try {
    const db = await openDatabase();
    const habits = await getAllReminders(db);

    habits.forEach((habit) => {
      scheduleNotification(habit);
    });
  } catch (err) {
    console.error("Error checking reminders:", err);
  }
};

self.addEventListener("message", (event) => {
  console.log("Received message in service worker:", event.data); // Debugging message
  if (
    event.data &&
    (event.data.type === "NEW_TASK_ADDED" || event.data.type === "TASK_UPDATED")
  ) {
    console.log("New task added or task updated, rechecking reminders...");
    checkReminders();
  }
});

self.addEventListener("install", () => {
  console.log("Service Worker Installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker Activated");
});
