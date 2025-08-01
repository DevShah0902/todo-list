const projectObjects = []

const projectManager = function manageProjects() {
    const projects = []
    const projectEntries = []

    function getProjects(){
        return projects
    }

    function getProjectEntries(){
        return projectObjects.map(project => project.getEntries())
    }

    function addProject(title){
        projects.push(title)
    }

    function addProjectEntries(entries){
        projectEntries.push(entries)
    }

    function getProjectObjects(){
        return projectObjects
    }

    function addProjectObject(project){
        projectObjects.push(project)
    }

    return {
        getProjects,
        addProject,
        addProjectEntries,
        getProjectEntries,
        getProjectObjects,
        addProjectObject
    }   
}()

export {projectManager}

