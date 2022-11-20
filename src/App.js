import React from 'react';
import './style.css';
import Task from './Task.js';
import AddNew from './AddNew.js';
import BasicTable from './BasicTable.js';
import FormDialog from './FormDialog.js';
import TopBar from './TopBar.js';
import TaskForm from './TaskForm.js';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import $ from 'jquery';

export default function App() {
  // Used to keep track of id for update/delete
  const [formOpen, setFormOpen] = React.useState(false);
  const [count, setCount] = React.useState(2);
  // Initialize list of tasks
  const [tasks, setTasks] = React.useState([
    addTask(1, 'title01', 'description01', '02/03/22', 'low', true, 'none'),
  ]);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState('low');
  /*
  let rows = [
    addTask('title01', 'description01', '02/03/22', 'low', 'true', 'none'),
  ];*/

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
    /*
    setTasks(
      copy.concat[
        addTask({ title, description, deadline, priority, isComplete, action })
      ]
    );*/
    console.log(tasks);
  }

  function deleteTask(id) {
    setTasks((arr) => arr.filter((x) => x.id != id));
    toastr.success('Task deleted successfully');
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
    setFormOpen(false);
  };

  const handleClickAdd = () => {
    console.log(title);
    pushTask(count, title, description, 'test', priority, false, 'nothing');
    setCount(count + 1);
    setFormOpen(false);
  };

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
      />
      <TopBar handleClickOpen={handleClickOpen} />
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
      <div>
        <p> Title is {title}</p>
      </div>
      <div>
        <p>You have {count} times</p>
        <button
          onClick={() =>
            /*
            setTasks(tasks.concat[addTask('title02', 'description02, 02/04/22', 'high', 'false', 'none')])
            */

            pushTask(
              count,
              'title01',
              'description02',
              '02/04/22',
              'high',
              false,
              'empty'
            )
          }
        >
          Click me
        </button>
      </div>
      <Task />
      <AddNew />
      <BasicTable
        rows={tasks}
        setCount={setCount}
        count={count}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
      <FormDialog />
    </div>
  );
}

/*
function pushTask(title, description, deadline, priority, isComplete, action) {
  setTasks(tasks.push({title, description, deadline, priority, isComplete, action }));
}
*/
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
