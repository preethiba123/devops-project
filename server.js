// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("express").urlencoded;

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory "database" (for demo)
const pets = [
  { id: 1, name: "Buddy", type: "Dog", desc: "Playful golden retriever" },
  { id: 2, name: "Luna", type: "Cat", desc: "Curious little kitten" },
  { id: 3, name: "Oreo", type: "Rabbit", desc: "Soft and cuddly" }
];
const adoptions = [];

// serve static files from /public
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser({ extended: true }));

// API: list pets
app.get("/api/pets", (req, res) => res.json(pets));

// API: adopt a pet (POST form)
app.post("/api/adopt", (req, res) => {
  const { name, email, petId } = req.body;
  if (!name || !email || !petId) {
    return res.status(400).json({ error: "name, email and petId are required" });
  }
  const pet = pets.find(p => String(p.id) === String(petId));
  if (!pet) return res.status(404).json({ error: "pet not found" });

  const record = { id: adoptions.length + 1, name, email, pet, createdAt: new Date().toISOString() };
  adoptions.push(record);

  // send a simple success page (redirect to thank you)
  return res.redirect("/adopt.html?success=1");
});

// API: list adoptions (for admin/testing)
app.get("/api/adoptions", (req, res) => res.json(adoptions));

// default route (index.html served by static middleware)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🐾 Pet Website listening at http://localhost:${PORT}`);
});
