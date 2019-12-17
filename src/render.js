import { selectProjectHandler } from './EventHandlers';
import ProjectList from './ProjectList';

const render = (() => {
    const renderProjects = (container, tContainer) => {
        while(container.lastChild) { container.removeChild(container.lastChild); }
        const projects = ProjectList.getProjects();
        
        const projectsFrag = document.createDocumentFragment();
        !!projects && projects.forEach(project => {
            const projectLi = document.createElement('li');

            projectLi.dataset.projectId = project.id;
            projectLi.innerText = project.name;

            projectLi.addEventListener('click', () => {
                const id = project.id;
                ProjectList.selectProject(id);

                renderSelectedProject(id);
                renderTasks(tContainer);
            });
            projectsFrag.append(projectLi);
        })
        container.append(projectsFrag);
        
        const selectedID = ProjectList.getSelectedProjectID();
        renderSelectedProject(selectedID);
        renderTasks(tContainer);
    }

    const renderTasks = (container) => {
        while(container.lastChild) { container.removeChild(container.lastChild); }
        const hasProject = !!ProjectList.getSelectedProject();
        const tasks = hasProject && ProjectList.getSelectedProject().getTasks();

        const tasksFrag = document.createDocumentFragment();
        hasProject && tasks.forEach(task => {
            const taskLi = document.createElement('li');
            taskLi.classList.add('task-item');

            const check = document.createElement('span');
            if(task.getDone()) {
                check.classList.add('fas', 'fa-check-circle')
            } else {
                check.classList.add('far', 'fa-circle');
            }
            check.addEventListener('click', () => {
                ((el, ...cls) => {
                    cls.forEach(cl => el.classList.toggle(cl))
                })(check, 'far', 'fas', 'fa-circle', 'fa-check-circle');
                ProjectList.getSelectedProject().getTask(task.id).toggleDone();
            })

            const info = document.createElement('div');
            info.classList.add('task-info');
            
            const expandBtn = document.createElement('i');
            if(task.description) {
                expandBtn.classList.add('fas', 'fa-chevron-right', 'task-expand-btn');
                expandBtn.addEventListener('click', () => {
                    description.classList.toggle('hidden');
                    expandBtn.classList.toggle('rotate-chevron');
                })
            }

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
                renderTasks(container);
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
        renderProjects,
        renderTasks,
        renderSelectedProject
    }
})();

export default render;