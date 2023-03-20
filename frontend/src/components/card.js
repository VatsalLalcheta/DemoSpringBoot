import React, { useState } from 'react';
import './static/Card.css';

const Card = ({ title, id, tasks, onEdit, onDelete }) => {


    return (
        <div className="project">
            <h2 className="project-id">{id}</h2>
            <h2 className="project-title">{title}</h2>
            <ul>{tasks.map((task) => (
                <li>
                <p className='project-title'>taskID: {task.taskID}<br/> taskName: {task.taskName}<br/> taskDescription: {task.taskDescription}</p>
                    
                </li>
                
            ))}</ul>
            <div className="card-footer">
                <button className="btn btn-primary" onClick={onEdit}>
                    Edit
                </button>
                <button className="btn btn-danger ml-2" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Card;

