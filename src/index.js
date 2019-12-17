import './reset.css';
import './styles.css';

import createDOM from './createDOM';
import render from './render';
import ProjectList from './ProjectList';

const root = document.getElementById('content');
createDOM(root);

let projects = ProjectList.getProjects();
const projectsContainer = document.querySelector('.projects');
const id = ProjectList.getSelectedProjectID();
const tasks = ProjectList.getSelectedProject().getTasks();
const tasksContainer = document.querySelector('.tasks');

render.initialRender(projectsContainer, tasksContainer);

const submitProjectForm = (e) => {
    e.preventDefault();
    const newProjectName = newProjectInput.value;
    ProjectList.addProject(newProjectName);
    render.renderProjects(projectsContainer, tasksContainer);
    newProjectInput.value = null;
}

const submitTaskForm = (e) => {
    e.preventDefault();
    if(!newTaskName.value) {
        alert('You need a task name!');
        return;
    }
    const name = newTaskName.value;
    const dueDate = newTaskDueDate.value;
    const desc = newTaskDesc.value;
    const currentProject = ProjectList.getSelectedProject();
    currentProject.addTask(name, desc, dueDate);
    const tasks = currentProject.getTasks();
    render.renderTasks(tasks, tasksContainer);
    newTaskName.value = null;
    newTaskDueDate.value = null;
}

// const selectProjectHandler = (e) => {
//     const id = e.target.dataset.projectId;
//     ProjectList.selectProject(id);

//     render.renderSelectedProject(id);

//     const currentProject = ProjectList.getSelectedProject();
//     let tasks = currentProject.getTasks();
//     render.renderTasks(tasks, tasksContainer);
// }

const deleteProjectHandler = () => {
    const selectedProjectID = ProjectList.getSelectedProjectID();
    console.log('deleteProjectHandler: ' + selectedProjectID);
    ProjectList.deleteProject(selectedProjectID);

    const projects = ProjectList.getProjects();
    if(!projects) {
        ProjectList.selectProject(null);
    } else {
        ProjectList.selectProject(projects[0].id);
    }
    render.renderProjects(projectsContainer, tasksContainer);
}

// const attachProjectListeners = () => {
//     Array.from(projectsContainer.getElementsByTagName('li')).forEach(project => {
//         project.addEventListener('click', selectProjectHandler);
//     });
// }

// attachProjectListeners();

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