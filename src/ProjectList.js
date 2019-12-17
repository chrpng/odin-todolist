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
    let projects = [];
    let selectedProjectID = '';
    //
    //
    //LOOK AT THIS LINE, SET IT BACK TO localStorageTest()
    //
    //
    const localStorageTest = (function() {
        try {
            console.log('about to try to set localStorage');
            localStorage.setItem('testset', 'testset');
            localStorage.setItem('testremove', 'testremove');
            localStorage.removeItem('testremove');
            console.log('about to return true!');
            return true;
        } catch(e) {
            return false;
        }
    })();

    if(localStorageTest) {
        //[{"name":"Default","id":"1575573336754","tasks":[{"name":"work 1","description":"filler","dueDate":"","priority":false,"id":"1576284071949","done":false}]},{"name":"Personal","id":"1576083065683","tasks":[]},{"name":"Groceries","id":"1576083218212","tasks":[{"name":"task 1","description":"filler","dueDate":"2019-12-14","priority":false,"id":"1576279722670","done":true},{"name":"task 2","description":"filler","dueDate":"","priority":false,"id":"1576279725227","done":false},{"name":"task 3","description":"filler","dueDate":"2019-12-13","priority":false,"id":"1576279729574","done":false}]},{"name":"Test","id":"1576537223145","tasks":[]}]
        console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)));
        projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [
            { name: 'Default', id: '1575573336754', tasks: [{ name: 'Example Task', description: 'filler', dueDate: '', priority: false, id: '1576284071949', done: false }] }
        ];
        console.log(projects);
        //"1576537223145"
        selectedProjectID = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)) || '1575573336754';
    } else {
        console.log('local Storage Test failed');
        projects = [
            { name: 'Default', id: '1575573336754', tasks: [{ name:'work 1', description: 'filler', dueDate: '', priority: false, id: '1576284071949', done: false }] },
            { name: 'Personal', id: '1576083065683', tasks: [] },
            { name: 'Groceries', id: '1576083218212', tasks: [{ name: 'task 1', description: 'filler', dueDate: '2019-12-14', priority: false, id: '1576279722670', done: true }, { name: 'task 2', description: 'filler', dueDate: '', priority: false, id: '1576279725227', done: false }, { name: 'task 3', description: 'filler', dueDate: '2019-12-13', priority: false, id: '1576279729574', done:false }] }
        ];
        selectedProjectID = '1576083218212';
    }
    projects = projects.map(project => {
        //the 3rd parameter is only used when retrieving the projects from storage
        return projectFactory(project.name, project.id, project.tasks);
    })


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
        if(localStorageTest) {
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
        } else {
            console.log('no local storage!');
        }
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
        //getSelectedProjectIDKey,
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