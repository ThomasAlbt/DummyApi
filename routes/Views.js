const express = require('express');
const router = express.Router();
const Container = require('../models/Container');

// Vercel needs to do it himself apparently
// router.get('/', (req, res) => {
//   res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
// });

//Adding an item or incrementing the click

router.post('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        let container = await Container.findOne();

        if (!container) {
            return res.status(404).json({ error: 'No container found' });
        }

        let item = container.items.find((it) => it._id === id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        item.click = (item.click || 0) + 1;
        await container.save();

        res.json({ message: 'Click incremented', item });
    } catch (error) {
        console.error('Error incrementing click:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Getting the infos

router.get('/:id', async (req, res) => {
    let container = await Container.findOne();
    const id = Number(req.params.id);
    const result = container.items.find((items) => items._id === id);
    res.send(result)
})

module.exports = router;