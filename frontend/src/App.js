import React, { useEffect, useState } from 'react';
import List from './components/List';
import axios from 'axios';
import { baseURL } from './utils/constant';

const App = () => {
  const [input, setInput] = useState('');
  const [task, setTask] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTask(res.data);
      console.log('Used setTask...');
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput('');
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput('');
    });
  };

  return (
    <main>
      <h1 className='title'>Cruddy Colors</h1>

      <div className='.input_holder'>
        <input
          type='text'
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type='submit' onClick={updateId ? updateTask : addTask}>
          {updateId ? 'Update Color' : 'Add a Color'}
        </button>

        <ul>
          {task.map((task) => (
            <List
              key={task._id}
              id={task._id}
              task={task.task}
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default App;
