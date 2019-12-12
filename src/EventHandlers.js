import render from './render';
import ProjectList from './ProjectList';

const selectProjectHandler = (e) => {
    ProjectList.selectProject(e);

    const id = ProjectList.getSelectedProjectID();
    render.renderSelectedProject(id);

    const currentProject = ProjectList.getSelectedProject();
    let tasks = currentProject.getTasks();
    render.renderTasks(tasks, tasksContainer);
}

export {
    selectProjectHandler
}