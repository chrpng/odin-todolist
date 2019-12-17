import './reset.css';
import './styles.css';

import createDOM from './createDOM';
import render from './render';
import ProjectList from './ProjectList';

const root = document.getElementById('content');
createDOM(root);

const projectsContainer = document.querySelector('.projects');
const tasksContainer = document.querySelector('.tasks');

render.renderProjects(projectsContainer, tasksContainer);

const submitProjectForm = (e) => {
    e.preventDefault();
    ProjectList.addProject(newProjectInput.value);
    render.renderProjects(projectsContainer, tasksContainer);
    newProjectInput.value = null;
}

const submitTaskForm = (e) => {
    e.preventDefault();
    if(!newTaskName.value) {
        alert('You need a task name!');
        return;
    }
    
    let currentProject = ProjectList.getSelectedProject();
    if(!currentProject) {
        ProjectList.addProject('Default');
        currentProject = ProjectList.getSelectedProject();
    }
    currentProject.addTask(newTaskName.value, newTaskDesc.value, newTaskDueDate.value);
    render.renderTasks(tasksContainer);
    newTaskName.value = null;
    newTaskDesc.value = null;
    newTaskDueDate.value = null;
}

const deleteProjectHandler = () => {
    const selectedProjectID = ProjectList.getSelectedProjectID();
    ProjectList.deleteProject(selectedProjectID);

    const projects = ProjectList.getProjects();
    if(projects.length === 0) {
        ProjectList.selectProject('');
    } else {
        ProjectList.selectProject(projects[0].id);
    }
    render.renderProjects(projectsContainer, tasksContainer);
}

const newProjectForm = document.querySelector('.new-project-form');
const newProjectInput = document.querySelector('.new-project-input');
const newProjectInputBtn = document.createElement('button');
newProjectForm.addEventListener('submit', submitProjectForm);
newProjectInputBtn.addEventListener('click', submitProjectForm);

// const newTaskForm = document.querySelector('.new-task-form');
const newTaskName = document.querySelector('.new-task-name');
const newTaskDueDate = document.querySelector('.new-task-duedate');
const newTaskDesc = document.querySelector('.new-task-desc');

// newTaskForm.addEventListener('submit', submitTaskForm);
const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', submitTaskForm);

const deleteProjectBtn = document.querySelector('.delete-project-btn');
deleteProjectBtn.addEventListener('click', deleteProjectHandler);