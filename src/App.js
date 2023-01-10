import { logDOM } from '@testing-library/react';
import { useState } from 'react';
import './App.css';


function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [doneTaksNumber, setDoneTaksNumber] = useState(0);
  const [idCustom, setIdCustom] = useState(1)
  const [edintingTaskId, setEdintingTaskId] = useState(0);
  const [edintingTaskIsDone, setEdintingTaskIsDone] = useState();


  function addTask() {
    const newTaskObj = {
      id: idCustom,
      title: task,
      isDone: false,
    };

    const newArr = [...tasks];
    if (newTaskObj.title.length > 0) {
      if (edintingTaskId > 0) {
        newArr.map((e) => {
          if (e.id === edintingTaskId) {
            e.title = task;
            e.isDone = edintingTaskIsDone;
            e.id = edintingTaskId
          }
          return e;
        })
        setTasks(newArr);
        setTask("");
        setEdintingTaskId(0)
      } else {
        newArr.push(newTaskObj);
        setTasks(newArr);
        setTask("");
        setIdCustom(idCustom + 1);
        setEdintingTaskId(0);
      }
    }

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
    console.log(arr)
  }

  function EditTask(para) {
    tasks.map((e) => {
      if (e.id === para) {
        setEdintingTaskId(e.id);
        setEdintingTaskIsDone(e.isDone);
        setTask(e.title)
      }
    })
  }

  function DeleteTask(para) {

    tasks.map(e => {
      if (e.id == para) {
        const newArr1 = [...tasks]
        newArr1.splice(newArr1.indexOf(e), 1)
        setTasks(newArr1);
      }
    })
    ShowDoneTotal();
  }
  console.log(tasks);

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-md-4'>
          <h1>ToDo list</h1>
          <div className='d-flex justify-content-center gap-5'>
            <div>All tasks: {tasks.length}</div>
            <div>Done tasks: {doneTaksNumber}</div>
          </div>
          <div className='d-flex gap-3'>
            <input type="text" className='form-control' placeholder='insert task' value={task} onChange={(e) => setTask(e.target.value)}></input>
            <button onClick={addTask} className="btn btn-primary">+add</button>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-4'>
          {tasks.map((e) => (
            <div className='d-flex justify-content-between mt-2 align-items-center'>
              <div className='d-flex'>
                <input type="checkbox" checked={e.isDone} onChange={() => onDoneTask(e.id)} id={e.id}></input>
                <label for={e.id} >{e.title}</label>
              </div>
              <div className='gap-3 d-flex'>
                <button className='btn btn-warning' onClick={() => EditTask(e.id)}>Edit</button>
                <button className='btn btn-danger' onClick={() => DeleteTask(e.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div >
    </div >
  );
}

export default App;
