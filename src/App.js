import { useState } from 'react';
import './App.css';


function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [doneTaksNumber, setDoneTaksNumber] = useState(0);

  function addTask() {
    const newTaskObj = {
      id: tasks.length,
      title: task,
      isDone: false,
    };

    const newArr = [...tasks];
    newArr.push(newTaskObj);

    setTasks(newArr);
    setTask("");
  }

  const onDoneTask = (id) => {
    const objList = tasks.map((val) => {
      if (val.id === id) {
        val.isDone = !val.isDone;
      }
      return val;
    })

    setTasks(objList);
    ShowDoneTotal()
  }

  function ShowDoneTotal() {
    const arr = tasks.filter((e) => e.isDone === true);
    setDoneTaksNumber(arr.length);
  }

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-md-4'>
          <h1>ToDo list</h1>
          <div>Done tasks: {doneTaksNumber}</div>
          <div className='d-flex gap-3'>
            <input type="text" className='form-control' placeholder='insert task' value={task} onChange={(e) => setTask(e.target.value)}></input>
            <button onClick={addTask} className="btn btn-primary">+add</button>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-4'>
          {tasks.map((e, index) => (
            <div className='d-flex justify-content-between mt-2 align-items-center'>
              <div className='d-flex'>
                <input type="checkbox" checked={e.isDone} onChange={() => onDoneTask(e.id)} id={index}></input>
                <label for={index} >{e.title}</label>
              </div>
              <div className='gap-3 d-flex'>
                <button className='btn btn-warning'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default App;
