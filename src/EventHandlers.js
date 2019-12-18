import render from './render';
import ProjectList from './ProjectList';

const EventHandlers = function() {
    const projectsContainer = document.querySelector('.projects');
    const tasksContainer = document.querySelector('.tasks');
    //
    // Submit New Project Handler
    //
    const submitProjectForm = (e) => {
        e.preventDefault();
        const newProjectInput = document.querySelector('.new-project-input');
        
        ProjectList.addProject(newProjectInput.value);
        render.renderProjects(projectsContainer, tasksContainer);
        newProjectInput.value = null;
    }

        //
    // Submit New Task Handler
    //
    const submitTaskForm = (e) => {
        e.preventDefault();
        const newTaskName = document.querySelector('.new-task-name');
        const newTaskDueDate = document.querySelector('.new-task-duedate');
        const newTaskDesc = document.querySelector('.new-task-desc');

        if(!newTaskName.value) {
            alert('You need a task name!');
            return;
        }
        const isProject = ProjectList.isProjects();
        !isProject && ProjectList.addProject('Default');
    
        let currentProject = ProjectList.getSelectedProject();
        currentProject.addTask(newTaskName.value, newTaskDesc.value, newTaskDueDate.value);
        if(isProject) {
            render.renderTasks(tasksContainer);
        } else {
            render.renderProjects(projectsContainer, tasksContainer);
        }
        newTaskName.value = null;
        newTaskDesc.value = null;
        newTaskDueDate.value = null;
    }

    //
    // Delete Project Handler
    //
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
    return {
        submitProjectForm,
        submitTaskForm,
        deleteProjectHandler
    }
}

export default EventHandlers;