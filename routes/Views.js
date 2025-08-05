const express = require('express');
const router = express.Router();
const Container = require('../models/Container')

router.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});

//Adding an item or incrementing the click

router.post('/:id', async (req, res) => {
    const id = Number(req.params.id);

    let container = await Container.findOne();

    if (!container) {
        container = await Container.create({ items: [] });
    }


    const found = container.items.find((items) => items._id === id);
    if (found) {
        found.click++;
        console.log('added +1');
    } else {
        container.items.push({ _id: id, click: 1 });
        console.log('new object added');
    }

    await container.save();
    res.send(container.items);
})

//Getting the infos

router.get('/:id', async (req, res) => {
    let container = await Container.findOne();
    const id = Number(req.params.id);
    const result = container.items.find((items) => items._id === id);
    res.send(result)
})

module.exports = router;