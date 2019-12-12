import flatpickr from 'flatpickr';

const createDOM = (root) => {    
    //Nav Section
    const nav = document.createElement('nav');

    const appTitle = document.createElement('h3');
    const appTitleHighlight = document.createElement('span');
    appTitleHighlight.innerText = 'task'
    appTitle.innerText = 'master';

    const appIcon = document.createElement('i');
    //appIcon.classList.add('fa', 'fa-edit');
    appIcon.classList.add('fas', 'fa-pen-square');
    appTitle.prepend(appIcon, appTitleHighlight);

    nav.append(appTitle);

    // Grid Container for projects and tasks
    const gridContainer = document.createElement('div')
    
    gridContainer.classList.add('grid-container');
    
    // Projects Section
    const projectsContainer = document.createElement('aside');

    const projectsHeader = document.createElement('h2');
    const projectsUl = document.createElement('ul');

    const newProjectForm = document.createElement('form');
    const newProjectInput = document.createElement('input');
    const newProjectInputBtn = document.createElement('button');

    projectsHeader.innerText = 'Projects';

    projectsUl.classList.add('projects');

    newProjectForm.classList.add('new-project-form');

    newProjectInput.setAttribute('type', 'text');
    newProjectInput.setAttribute('placeholder', 'New Project');
    newProjectInput.classList.add('new-project-input');

    newProjectInputBtn.classList.add('add-project-btn');
    newProjectInputBtn.classList.add('fa', 'fa-plus');

    newProjectForm.append(newProjectInputBtn, newProjectInput);
    projectsContainer.append(projectsHeader, projectsUl, newProjectForm);

    // Tasks Section
    const tasksContainer = document.createElement('main');
    const tasksHeader = document.createElement('h1');
    const tasksUl = document.createElement('ul');

    const newTaskForm = document.createElement('form');

    const newTaskRow1 = document.createElement('div');
    const newTaskNameInput = document.createElement('input');
    const newTaskDueDateInput = document.createElement('input');
    const newTaskDescriptionInput = document.createElement('input');

    const addTaskBtn = document.createElement('button');
    const addTaskIcon = document.createElement('i');

    const deleteProjectBtn = document.createElement('button');

    tasksHeader.innerText = 'Tasks';

    tasksUl.classList.add('tasks');

    newTaskForm.classList.add('new-task-form');

    newTaskNameInput.setAttribute('type', 'text');
    newTaskNameInput.setAttribute('placeholder', 'Add Task');
    newTaskNameInput.classList.add('new-task-name');

    newTaskDueDateInput.setAttribute('placeholder', 'Date');
    newTaskDueDateInput.classList.add('new-task-duedate');
    flatpickr(newTaskDueDateInput, {});

    newTaskRow1.classList.add('new-task-row1');
    newTaskRow1.append(newTaskNameInput, newTaskDueDateInput);

    newTaskDescriptionInput.setAttribute('type', 'textarea');
    newTaskDescriptionInput.setAttribute('placeholder', 'Description (optional)');
    newTaskDescriptionInput.classList.add('new-task-desc');

    addTaskBtn.innerText = 'Add Task';
    addTaskBtn.classList.add('add-task-btn');
    addTaskIcon.classList.add('fa', 'fa-plus');
    addTaskBtn.prepend(addTaskIcon);

    //newTaskForm.append(newTaskNameInput);
    newTaskForm.append(newTaskRow1, newTaskDescriptionInput, addTaskBtn);

    deleteProjectBtn.classList.add('delete-project-btn');
    deleteProjectBtn.innerText = 'Delete Project';
    
    //tasksContainer.append(tasksHeader, tasksUl, newTaskForm, addTaskBtn);
    tasksContainer.append(tasksHeader, tasksUl, newTaskForm, deleteProjectBtn);

    gridContainer.append(projectsContainer, tasksContainer)
    root.append(nav, gridContainer);
};

export default createDOM;