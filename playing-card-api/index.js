const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Array storage
let cards = [
    { id: 1, suit: "Hearts", value: "Ace" },
    { id: 2, suit: "Spades", value: "King" }
];

// GET all cards
app.get("/cards", (req, res) => {
    res.json(cards);
});

// GET single card
app.get("/cards/:id", (req, res) => {
    const card = cards.find(c => c.id == req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
});

// POST new card
app.post("/cards", (req, res) => {
    const newCard = {
        id: cards.length + 1,
        suit: req.body.suit,
        value: req.body.value
    };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// PUT update card
app.put("/cards/:id", (req, res) => {
    const card = cards.find(c => c.id == req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    card.suit = req.body.suit || card.suit;
    card.value = req.body.value || card.value;

    res.json(card);
});

// DELETE card
app.delete("/cards/:id", (req, res) => {
    cards = cards.filter(c => c.id != req.params.id);
    res.json({ message: "Card deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});