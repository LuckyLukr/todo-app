const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const completed = false;

    const newTask = new Task({name, completed});

    newTask.save()
        .then(() => res.json('Task added...'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
    const name = req.body.name;
    const completed = req.body.completed;
    const task = {
        name,
        completed
    };

    Task.findByIdAndUpdate(req.params.id, task)
        .then(() => res.json('Task updated...'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted...'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;