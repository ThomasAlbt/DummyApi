const express = require("express");
const router = express.Router();
const Container = require("../models/Container");

// Vercel needs to do it himself apparently
// router.get('/', (req, res) => {
//   res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
// });

//Adding an item or incrementing the click

router.post("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    let container = await Container.findOne();

    // If no container exists, create one

    if (!container) {
      container = new Container({ items: [] });
    }

    // Try to find existing item

    let item = container.items.find((it) => it._id === id);

    if (!item) {
      // Create new item if not found

      item = {
        _id: id,

        click: 1, // start with 1 click

        timeViewed: 0, // default time
      };

      container.items.push(item);
    } else {
      // Increment click if item exists

      item.click = (item.click || 0) + 1;
    }

    await container.save();

    res.json({ message: "Item updated or created", item });
  } catch (error) {
    console.error("Error processing item:", error);

    res.status(500).json({ error: "Internal server error" });
  }
});

//Getting the infos

router.get("/:id", async (req, res) => {
  let container = await Container.findOne();
  const id = Number(req.params.id);
  const result = container.items.find((items) => items._id === id);
  res.send(result);
});

module.exports = router;
