const router = require('express').Router();
// use object destructuring to import our two models by name
const { LibraryCard, Reader } = require('../../models');

// GET all cards
router.get('/', async (req, res) => {
  try {
    // find all library cards and perform a JOIN to include all associated Readers
    const libraryCardData = await LibraryCard.findAll({
      include: [{ model: Reader }],
    });
    res.status(200).json(libraryCardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single card
router.get('/:id', async (req, res) => {
  try {
    const libraryCardData = await LibraryCard.findByPk(req.params.id, {
      include: [{ model: Reader }],
    });

    if (!libraryCardData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(libraryCardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a card
router.post('/', async (req, res) => {
  try {
    const locationData = await LibraryCard.create({
      // TODO: Add a comment describing where the value of `req.body.reader_id` comes from
      // The value of `req.body.reader_id` comes from the request body, which is sent by the client.
      reader_id: req.body.reader_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a card
router.delete('/:id', async (req, res) => {
  try {
    const libraryCardData = await LibraryCard.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!libraryCardData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(libraryCardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
