// const TaskFactory = (name, description = 'none', dueDate, idArg, priority = false, done = false) => {
//     const id = idArg ? idArg : String(Date.now());
//     //let done = doneArg;
//     const getDone = () => done;
//     const toggleDone = () => {
//         done = !done;
//         ProjectList.saveToStorage();
//     };
//     const togglePriority = () => priority = !priority;
//     return {
//         name,
//         description,
//         id,
//         dueDate,
//         priority,
//         getDone,
//         toggleDone,
//         togglePriority
//     };
// }

class TaskClass {
    constructor(name, description = 'none', dueDate, id, priority = false, doneArg = false) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id ? id : String(Date.now());
        let done = doneArg;
        this.getDone = () => {
            return done;
        }
        this.toggleDone = () => {
            console.log(this);
            done = !done;
            ProjectList.saveToStorage();
        }
    }
}

// function TaskClass2(name, description = 'none', dueDate, id, priority = false, doneArg = false) {
//     this.name = name;
//     this.description = description;
//     this.dueDate = dueDate;
//     this.priority = priority;
//     this.id = id ? id : String(Date.now());
//     let done = doneArg;
//     this.getDone = () => {
//         return done;
//     }
//     this.toggleDone = () => {
//         console.log(this);
//         done = !done;
//         ProjectList.saveToStorage();
//     }
//     return done; //porque does this do?
// }

const projectFactory = (name, id, tasks = []) => {
    if(!id) id = String(Date.now());
    if(tasks.length > 0) {
        tasks = tasks.map(task => {
            return new TaskClass(task.name, task.description, task.dueDate, task.id, task.priority, task.done);
            // return TaskFactory(task.name, task.description, task.dueDate, task.id, task.priority, task.done);
        })
    }
    const getTasks = () => {
        return tasks;
    }
    const getTask = (id) => {
        return tasks.find(task => task.id === id);
    }
    const addTask = (...args) => {
        const newTask = new TaskClass(...args);
        // const newTask = TaskFactory(...args);
        tasks.push(newTask);
        ProjectList.saveToStorage(); //not ideal that saveToStorage is revealed for these two saves?
    };
    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        ProjectList.saveToStorage(); //not ideal that saveToStorage is revealed for these two saves?
    }
    return {
        name,
        id,
        getTasks,
        getTask,
        addTask,
        deleteTask
    };
}

const ProjectList = (function() {
    const LOCAL_STORAGE_PROJECT_KEY = 'taskmaster.projects';
    const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'taskmaster.selectedProjectID';

    let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [
        { name: 'Work', id: '1' },
        { name: 'Personal', id: '2' },
        { name: 'Fitness', id: '3' }
    ];
    projects = projects.map(project => {
        //the 3rd parameter is only used when retrieving the projects from storage
        return projectFactory(project.name, project.id, project.tasks);
    })

    let selectedProjectID = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY));
    //let selectedProjectID = 1;

    // Local Storage functions
    function getSelectedProjectIDKey() {
        return LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY;
    }
    function getSelectedProjectID() {
        return selectedProjectID;
    }
    function getSelectedProject() {
        return projects.find(project => project.id === selectedProjectID);
    }
    function saveSelectionToStorage(id) {
        localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, JSON.stringify(id));
    }
    function saveToStorage() {
        //projects.tasks isn't normally accessible due to closure, so a new object storageProjects is created specifically for storage so the tasks can be referenced when the project is taken out of storage
        //without this step you'll just have the getTasks() function without a tasks array to reference
        const storageProjects = projects.map(project => {
            const tasks = project.getTasks();
            const storageTasks = tasks.map(task => {
                const done = task.getDone()
                return { ...task, done }
            })
            return { ...project, tasks: storageTasks }
        })
        console.log('storing...')
        console.log(storageProjects);
        localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(storageProjects));
        //console.log(JSON.stringify(storageProjects));
    }
    function getProjects() {
        return projects;
    }
    function addProject(name, id, tasks = []) {
        const newProject = projectFactory(name, id, tasks);
        projects.push(newProject);
        saveToStorage();
    }
    function deleteProject(id) {
        projects = projects.filter(project => project.id !== id);
        saveToStorage();
    }
    function selectProject(id) {
        selectedProjectID = id;
        console.log('selectedProjectID: ' + id);
        saveSelectionToStorage(id);
    }

    return {
        getSelectedProjectIDKey,
        getSelectedProjectID,
        getSelectedProject,
        saveToStorage,
        getProjects,
        addProject,
        deleteProject,
        selectProject,
    }
})();

export default ProjectList;