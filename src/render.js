import { selectProjectHandler } from './EventHandlers';
import ProjectList from './ProjectList';

const render = (() => {
    const initialRender = (projectsContainer, tasksContainer) => {
        renderProjects(projectsContainer, tasksContainer);
    }

    const renderProjects = (container, tContainer) => {
        while(container.lastChild) { container.removeChild(container.lastChild); }
        
        const projectsFrag = document.createDocumentFragment();
        const projects = ProjectList.getProjects();
        projects.forEach(project => {
            const projectLi = document.createElement('li');

            projectLi.dataset.projectId = project.id;
            projectLi.innerText = project.name;

            projectLi.addEventListener('click', () => {
                const id = project.id;
                ProjectList.selectProject(id);

                renderSelectedProject(id);
                const tasks = ProjectList.getSelectedProject().getTasks();
                renderTasks(tasks, tContainer);
            });
            projectsFrag.append(projectLi);
        })
        container.append(projectsFrag);
        
        const selectedID = ProjectList.getSelectedProjectID();
        renderSelectedProject(selectedID);
        const tasks = ProjectList.getSelectedProject().getTasks();
        renderTasks(tasks, tContainer);
    }

    const renderTasks = (tasks, container) => {
        while(container.lastChild) { container.removeChild(container.lastChild); }
        
        const tasksFrag = document.createDocumentFragment();
        tasks.forEach(task => {
            const taskLi = document.createElement('li');
            taskLi.classList.add('task-item');

            const check = document.createElement('span');
            if(task.done) {
                check.classList.add('fas', 'fa-check-circle')
            } else {
                check.classList.add('far', 'fa-circle');
            }
            check.addEventListener('click', () => {
                ((el, ...cls) => {
                    cls.forEach(cl => el.classList.toggle(cl))
                })(check, 'far', 'fas', 'fa-circle', 'fa-check-circle');
                console.log(ProjectList.getSelectedProject().getTask(task.id));
                console.log(ProjectList.getSelectedProject().getTask(task.id).getDone());
                ProjectList.getSelectedProject().getTask(task.id).toggleDone();
                console.log(ProjectList.getSelectedProject().getTask(task.id));
                console.log(ProjectList.getSelectedProject().getTask(task.id).getDone());
            })

            const info = document.createElement('div');
            info.classList.add('task-info');
            
            const expandBtn = document.createElement('i');
            expandBtn.classList.add('fas', 'fa-chevron-right', 'task-expand-btn');
            expandBtn.addEventListener('click', () => {
                description.classList.toggle('hidden');
                expandBtn.classList.toggle('rotate-chevron');
            })

            const name = document.createElement('span');
            name.classList.add('task-name');
            name.innerText = task.name;

            const dueDate = document.createElement('span');
            dueDate.classList.add('task-duedate');
            dueDate.innerText = task.dueDate;

            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add('fas', 'fa-times', 'task-delete-btn')
            deleteBtn.addEventListener('click', () => {
                const newProject = ProjectList.getSelectedProject();
                newProject.deleteTask(task.id);
                const newTasks = newProject.getTasks();
                renderTasks(newTasks, container);
            });
            
            info.append(expandBtn, name, dueDate, deleteBtn);

            const description = document.createElement('div');
            description.classList.add('task-description', 'hidden');
            description.innerText = task.description;

            taskLi.append(check, info, description);
            tasksFrag.append(taskLi);
        })
        container.append(tasksFrag);
    }

    const renderSelectedProject = (id) => {
        const projects = document.querySelectorAll('[data-project-id]');
        projects.forEach(project => {
            if(project.dataset.projectId === id) {
                project.classList.add('selected');
            } else {
                project.classList.remove('selected');
            }
        })
    }

    return {
        initialRender,
        renderProjects,
        renderTasks,
        renderSelectedProject
    }
})();

export default render;