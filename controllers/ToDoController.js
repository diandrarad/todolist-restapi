const ToDo = require('../models/todo');

module.exports = {
    createToDo: async (req, res) => {
      try {
        const { title, description } = req.body;
        const user = req.user._id;
  
        // Validate that user is provided
        if (!user) {
          return res.status(400).json({ message: 'User not provided' });
        }
  
        const todo = await ToDo.create({ title, description, user });
        res.status(201).json(todo);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },

  getAllToDos: async (req, res) => {
    try {
      const user = req.user._id;
      const todos = await ToDo.find({ user });
      res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getToDoById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user._id;

      const todo = await ToDo.findOne({ _id: id, user });
      if (!todo) {
        return res.status(404).json({ message: 'ToDo not found' });
      }

      res.status(200).json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateToDo: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const user = req.user._id;

      const todo = await ToDo.findOneAndUpdate({ _id: id, user }, { title, description }, { new: true });
      if (!todo) {
        return res.status(404).json({ message: 'ToDo not found' });
      }

      res.status(200).json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteToDo: async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user._id;

      const todo = await ToDo.findOneAndDelete({ _id: id, user });
      if (!todo) {
        return res.status(404).json({ message: 'ToDo not found' });
      }

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteAllToDos: async (req, res) => {
    try {
      const user = req.user._id;

      await ToDo.deleteMany({ user });
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
