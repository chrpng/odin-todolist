import './reset.css';
import './styles.css';

import createDOM from './createDOM';
import render from './render';
import EventHandlers from './EventHandlers';

const root = document.getElementById('content');
createDOM(root);

const projectsContainer = document.querySelector('.projects');
const tasksContainer = document.querySelector('.tasks');

const { submitProjectForm, submitTaskForm, deleteProjectHandler } = EventHandlers();

//
// Attach Event Listeners
//
const newProjectForm = document.querySelector('.new-project-form');
const newProjectInputBtn = document.createElement('button');
newProjectForm.addEventListener('submit', submitProjectForm);
newProjectInputBtn.addEventListener('click', submitProjectForm);

const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', submitTaskForm);

const deleteProjectBtn = document.querySelector('.delete-project-btn');
deleteProjectBtn.addEventListener('click', deleteProjectHandler);

//
// Initial Render
//
render.renderProjects(projectsContainer, tasksContainer);