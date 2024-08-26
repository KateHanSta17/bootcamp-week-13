const router = require('express').Router();
const User = require('../../models/User');

// TODO: Implement each of the three routes below using `async/await`
// TODO: Use try/catch to catch errors
// TODO: Return the appropriate HTTP status codes

// GET a user by ID
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// UPDATE a user by ID
router.put('/:id', async (req, res) => {
    try {
      const [updated] = await User.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// DELETE a user by ID
router.delete('/:id', async (req, res) => {
    try {
      const deleted = await User.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.status(200).json({ message: 'User deleted successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  