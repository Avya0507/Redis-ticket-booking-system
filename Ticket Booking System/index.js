const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

const PORT = 5000;

// ---------------- REDIS SETUP ----------------
const client = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379
  }
});

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

// ---------------- START SERVER AFTER REDIS ----------------
async function startServer() {
  try {
    await client.connect();
    console.log("Redis Connected ✅");

    // Initialize seats if not exists
    const seats = await client.get("available_seats");
    if (!seats) {
      await client.set("available_seats", 5);
      console.log("Initialized 5 seats");
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

// ---------------- ROUTES ----------------

// Check available seats
app.get("/seats", async (req, res) => {
  try {
    const seats = await client.get("available_seats");
    res.json({ available_seats: parseInt(seats) });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Book a seat
app.post("/book", async (req, res) => {
  try {
    const seats = await client.get("available_seats");

    if (parseInt(seats) > 0) {
      await client.decr("available_seats");
      res.json({ message: "Seat booked successfully 🎉" });
    } else {
      res.json({ message: "No seats available ❌" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------------- RUN ----------------
startServer();