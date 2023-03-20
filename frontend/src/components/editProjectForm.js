import React, { useState } from 'react';
import './static/Card.css';

const ADD_PROJECT_URL = 'http://localhost:8080/projects/add';

const PopupForm = ({ card, visibility }) => {

  const [projectName, setTitle] = useState(card.projectName);
  const [projectID, setProjectID] = useState(card.projectID);
  let projectTasks = card.projectTasks;

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(ADD_PROJECT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectID, projectName, projectTasks })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form submitted successfully:', data);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
    window.location.reload(false);
  };

  const updateTaskDescription = (task, value) => {
    const newTask = {'taskID': task.taskID, 'taskName' : task.taskName, 'taskDescription' : value};
    projectTasks =  projectTasks.filter(item => item.taskID !== task.taskID);
    console.log(newTask);
    projectTasks.map(item => console.log(item))
    projectTasks.push(newTask);
  }

  const updateTaskName = (task, value) => {

  }


  if (visibility) {
    return (
      <div>
        <h2>Editing Project {projectName}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Porject title:
            <input type="text" value={projectName} onBlur={e => setTitle(e.target.value)} />
          </label>
          <label>
            projectID:
            <input type="text" value={projectID} readOnly />
          </label>

          {projectTasks.map((task) => (
            <div>
              <label>
                task ID:
                <input type="text" value={task.taskID} readOnly />
              </label>
              <label>
                task name:
                <input type="text"  onBlur={e => updateTaskName(task, e.target.value)} />
              </label>
              <label>
                taskDescription:
                <input type="text"  onBlur={e => updateTaskDescription(task, e.target.value)} />
              </label>
            </div>
          ))}



          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

  ;
};

export default PopupForm;