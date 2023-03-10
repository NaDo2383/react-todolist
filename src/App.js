
import { useState } from 'react';
import './App.css';
import Modal from './components/modal';


function App() {

  const [tasks, setTasks] = useState([]);
  const [doneTaksNumber, setDoneTaksNumber] = useState(0);
  const [edintingTaskId, setEdintingTaskId] = useState(0);
  const [edintingTaskIsDone, setEdintingTaskIsDone] = useState();
  const [modal, setModal] = useState(false);

  const inIt = {
    task: "",
    id: guid(),
    isDone: false
  }
  const [taskObj, setTaskObj] = useState(inIt)


  function addTask() {
    const newArr = [...tasks];

    if (taskObj.task.length > 0) {
      if (edintingTaskId.length > 0) {
        newArr.map((e) => {
          if (e.id === edintingTaskId) {
            e.task = taskObj.task;
            e.isDone = edintingTaskIsDone;
            e.id = edintingTaskId
          }
          return e;
        })
        setTasks(newArr);
        setEdintingTaskId(0)

      } else {
        setTaskObj({ ...taskObj, id: guid() })
        newArr.push(taskObj);
        setTasks(newArr);
      }
    }
    setTaskObj(inIt);
    handleModal();
    console.log(tasks);
  }


  const onDoneTask = (id) => {
    const objList = tasks.map((val) => {
      if (val.id === id) {
        val.isDone = !val.isDone;
        if (val.isDone) {
          setDoneTaksNumber(doneTaksNumber + 1);
        } else {
          setDoneTaksNumber(doneTaksNumber - 1);
        }
      }
      return val;
    })
    setTasks(objList);
  }

  function EditTask(para) {
    tasks.map((e) => {
      if (e.id === para) {
        setEdintingTaskId(e.id);
        setEdintingTaskIsDone(e.isDone);
        setTaskObj({ ...taskObj, task: e.task })
      }
    })
    handleModal();
  }

  function DeleteTask(para) {

    tasks.map(e => {
      if (e.id == para) {
        const newArr1 = [...tasks]
        newArr1.splice(newArr1.indexOf(e), 1)
        setTasks(newArr1);
        if (e.isDone) {
          setDoneTaksNumber(doneTaksNumber - 1);
        }
      }
    })
  }

  const handleModal = () => {
    setModal(!modal)
  }

  function guid() {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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
            {/* <input type="text" className='form-control' placeholder='insert task' value={taskObj.task} onChange={(e) => setTaskObj({ ...taskObj, task: e.target.value })}></input>
            <button onClick={addTask} className="btn btn-primary">
              +add
            </button> */}
            <button className="btn btn-primary" onClick={handleModal}>
              Modal
            </button>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-4'>
          {tasks.map((e) => (
            <div className='d-flex justify-content-between mt-2 align-items-center'>
              <div className='d-flex'>
                <input type="checkbox" checked={e.isDone} onChange={() => onDoneTask(e.id)} id={e.id}></input>
                <label for={e.id} >{e.task}</label>
              </div>
              <div className='gap-3 d-flex'>
                <button className='btn btn-warning' onClick={() => EditTask(e.id)}>Edit</button>
                <button className='btn btn-danger' onClick={() => DeleteTask(e.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          modal={modal}
          setModal={handleModal}
          taskObj={taskObj}
          setTaskObj={setTaskObj}
          addTask={addTask}
        />

      </div >
    </div >
  );
}

export default App;
