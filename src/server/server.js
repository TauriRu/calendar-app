const express = require("express");
const fs = require("fs").promises;
const app = express();

app.get("/api/calendar-data", async (req, res) => {
  const path = require("path");
  const filePath = path.join(__dirname, "calendar-data.json");

  try {
    const data = await fs.readFile(filePath, "utf-8");
    const calendarData = JSON.parse(data);
    res.json(calendarData);
  } catch (error) {
    console.error("Error reading data:", error);
    res
      .status(500)
      .json({ error: "Failed to read calendar data", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the calendar app!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
