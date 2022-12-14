import React from 'react';
import './style.css';
import BasicTable from './BasicTable.js';
import FormDialog from './FormDialog.js';
import TopBar from './TopBar.js';
import TaskForm from './TaskForm.js';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import $ from 'jquery';

import moment from 'moment';

export default function App() {
  // Used to keep track of id for update/delete
  const [formOpen, setFormOpen] = React.useState(false);
  const [count, setCount] = React.useState(2);
  // Initialize list of tasks
  const [tasks, setTasks] = React.useState([]);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState('low');
  const [editingId, setEditingId] = React.useState(1);
  const [editing, setEditing] = React.useState(false);
  const [deadline, setDeadline] = React.useState(moment());
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [uniqueTitleError, setUniqueTitleError] = React.useState(false);

  function pushTask(
    id,
    title,
    description,
    deadline,
    priority,
    isComplete,
    action
  ) {
    // takes current tasks and addes the newest one to the array
    setTasks((arr) =>
      // add the new task to the existing array
      arr.concat([
        // creates new object from the data
        addTask(id, title, description, deadline, priority, isComplete, action),
      ])
    );
    setCount(count + 1);
    toastr.success('Task added successfully!');
    console.log(tasks);
  }

  function deleteTask(id) {
    setTasks((arr) => arr.filter((x) => x.id != id));
    toastr.success('Task deleted successfully');
  }

  function openUpdate(id) {
    let taskToUpdate = tasks.find((x) => x.id == id);
    setEditingId(id);
    setEditing(true);
    setDescription(taskToUpdate.description);
    setPriority(taskToUpdate.priority);
    setDeadline(moment(taskToUpdate.deadline));
    setFormOpen(true);
  }

  function toggleComplete(id) {
    setTasks((arr) =>
      arr.map((t) => (t.id === id ? { ...t, isComplete: 'changed' } : t))
    );
  }

  function openForm() {
    toastr.success('Hi!');
  }

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  const handleClickCancel = () => {
    resetForm();
    setFormOpen(false);
  };

  const handleClickAdd = () => {
    console.log(title);
    // If title and description are valid (non-empty and unique) add the task
    if (
      title != '' &&
      description != '' &&
      tasks.findIndex((a) => a.title == title) == -1 &&
      !editing
    ) {
      pushTask(
        count,
        title,
        description,
        deadline.format('MM/DD/YYYY'),
        priority,
        false,
        'nothing'
      );
      setCount(count + 1);
      resetForm();
      setFormOpen(false);
      // If editing a task
    } else if (editing == true) {
      let updatedTask = tasks.find((a) => a.id == editingId);
      updatedTask.description = description;
      updatedTask.priority = priority;
      updatedTask.deadline = deadline.format('MM/DD/YYYY');
      resetForm();
      setFormOpen(false);
      toastr.success('Task updated successfully!');
    }
    // If title is empty or description is empty, do not add task and add errors
    else {
      if (!title) {
        setTitleError(true);
      } else {
        setTitleError(false);
      }
      if (!description) {
        setDescriptionError(true);
      } else {
        setDescriptionError(false);
      }
      if (tasks.findIndex((a) => a.title == title) != -1 && !editing) {
        setUniqueTitleError(true);
      } else {
        setUniqueTitleError(false);
      }
    }
  };

  function resetForm() {
    setTitle('');
    setDescription('');
    setPriority('low');
    setEditing(false);
    setDeadline(moment());
    setTitleError(false);
    setDescriptionError(false);
    setUniqueTitleError(false);
  }
  const handleClose = () => {
    setFormOpen(false);
  };

  function updateTask(id) {}
  return (
    <div>
      <TaskForm
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleClickCancel={handleClickCancel}
        handleClickAdd={handleClickAdd}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        editingId={editingId}
        editing={editing}
        titleError={titleError}
        descriptionError={descriptionError}
        deadline={deadline}
        setDeadline={setDeadline}
        uniqueTitleError={uniqueTitleError}
        editing={editing}
      />
      <TopBar handleClickOpen={handleClickOpen} />
      <BasicTable
        rows={tasks}
        setCount={setCount}
        count={count}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        openUpdate={openUpdate}
      />
    </div>
  );
}

function addTask(
  id,
  title,
  description,
  deadline,
  priority,
  isComplete,
  action
) {
  return { id, title, description, deadline, priority, isComplete, action };
}
