const mongoose = require('mongoose');
const Task = require('./models/taskModel');

const tasks = [
  { title: "Sample Task 1", description: "Sample description 1", completed: false },
  { title: "Sample Task 2", description: "Sample description 2", completed: true }
];

mongoose.connect('mongodb://localhost:27017/yourdbname')  // replace with your DB URL
  .then(async () => {
    await Task.deleteMany({});  // clear old data
    await Task.insertMany(tasks);
    console.log('Sample data inserted');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
  });
