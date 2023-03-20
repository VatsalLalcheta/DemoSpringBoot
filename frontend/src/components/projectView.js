import React from 'react';
import Card from './card';
import { useState, useEffect } from 'react';
import PopupForm from './editProjectForm';

const GET_PROJECTS_URL = 'http://localhost:8080/projects/';
const ADD_PROJECT_URL = 'http://localhost:8080/projects/add';
const DELETE_PROJECT_URL = 'http://localhost:8080/projects/delete';
let projectTasks = []


const CardPage = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [projectName, setTitle] = useState('');
  const [projectID, setProjectID] = useState('');
  const [taskID, setTaskID] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editFormVisibility, setVisibility] = useState(false);
  const [cardToEdit, setCardToEdit] = useState({});

  useEffect(() => {
    fetch(GET_PROJECTS_URL,{    
      method: 'GET',    
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Failed to fetch data: {error.message}</div>;
  }
//   console.log(data);
  
  const handleEdit = (card) => {
    setVisibility(true);
    setCardToEdit(card);
  };

  const hadnleDelete = (card) => {
    fetch(DELETE_PROJECT_URL, {
        method: 'POST',
        headers: {'content-Type' : 'application/json'},
        body: JSON.stringify(card)
    });
    window.location.reload(false);
  }

  const handleAddTask = (event) => {
    event.preventDefault();
    projectTasks.push({"taskID" : taskID, "taskName" : taskName, "taskDescription": taskDescription})
    console.log(projectTasks)
  }



  const handleAddProject = (event) => {
    
    event.preventDefault();
    fetch(ADD_PROJECT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectID, projectName, projectTasks})
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form submitted successfully:', data);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
      window.location.reload(false);
  }

  if (editFormVisibility) {
    return (
      <div className="card-container">
        {data.map((card) => (
          <Card
            title={card.projectName}
            id={card.projectID}
            tasks = {card.projectTasks}
            onEdit={() => handleEdit(card)}
            onDelete={() => hadnleDelete(card)}
          />
        ))}
        
        <form onSubmit={handleAddProject}>
        <label>
          Porject title:
          <input type="text" value={projectName} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
        projectID:
          <input type="text" value={projectID} onChange={e => setProjectID(e.target.value)} />
        </label>
        <label>
        task ID:
          <input type="text" value={taskID} onChange={e => setTaskID(e.target.value)} />
        </label>
        <label>
        task name:
          <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)} />
        </label>
        <label>
        taskDescription:
          <input type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        <button onClick={handleAddTask}>Add Task</button>
      </form>
      
        <PopupForm card={cardToEdit} visibility={editFormVisibility}/>
      
      </div>
      
    );
  }
  return (
    <div className="card-container">
      {data.map((card) => (
        <Card
          title={card.projectName}
          id={card.projectID}
          tasks = {card.projectTasks}
          onEdit={() => handleEdit(card)}
          onDelete={() => hadnleDelete(card)}
        />
      ))}
      
      <form onSubmit={handleAddProject}>
      <label>
        Porject title:
        <input type="text" value={projectName} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
      projectID:
        <input type="text" value={projectID} />
      </label>
      <label>
      task ID:
        <input type="text" value={taskID} onChange={e => setTaskID(e.target.value)} />
      </label>
      <label>
      task name:
        <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)} />
      </label>
      <label>
      taskDescription:
        <input type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
      <button onClick={handleAddTask}>Add Task</button>
    </form>    
    </div>
    
  );
};

export default CardPage;
