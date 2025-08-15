const express = require('express');
const router = express.Router();
const Container = require('../models/Container');

// Vercel needs to do it himself apparently
// router.get('/', (req, res) => {
//   res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
// });

//Adding an item or incrementing the click

router.get('/:id', async (req, res) => {
    try {
        let container = await Container.findOne();
        const id = Number(req.params.id);
        
        // Handle case where no container exists
        if (!container) {
            return res.json({ _id: id, click: 0, timeViewed: 0 });
        }
        
        const result = container.items.find((items) => items._id === id);
        
        // Handle case where item doesn't exist
        if (!result) {
            return res.json({ _id: id, click: 0, timeViewed: 0 });
        }
        
        res.json(result);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Getting the infos

router.get('/:id', async (req, res) => {
    let container = await Container.findOne();
    const id = Number(req.params.id);
    const result = container.items.find((items) => items._id === id);
    res.send(result)
})

module.exports = router;